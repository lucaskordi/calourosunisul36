import B2 from 'backblaze-b2';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config({ path: '.env.local' });

const b2 = new B2({
    applicationKeyId: process.env.NEXT_PUBLIC_B2_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY,
});

const BUCKET_ID = process.env.NEXT_PUBLIC_B2_BUCKET_ID;
const CONCURRENCY = 1;

function slugify(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

// Shared upload data to avoid repeated API calls
let uploadAuthData = null;

async function getUploadAuth() {
    if (uploadAuthData) return uploadAuthData;
    try {
        const response = await b2.getUploadUrl({ bucketId: BUCKET_ID });
        uploadAuthData = response.data;
        return uploadAuthData;
    } catch (err) {
        console.error("Failed to get B2 upload URL:", err.message);
        throw err;
    }
}


// Cache for existing files to avoid re-uploading
let existingFiles = new Set();
let totalFilesToProcess = 0;
let processedCount = 0;

async function refreshAuth() {
    console.log('Refreshing B2 Auth...');
    try {
        await b2.authorize();
        uploadAuthData = null; // Clear upload URL cache
    } catch (err) {
        console.error('Failed to refresh auth:', err.message);
    }
}

async function loadExistingFiles(prefix) {
    console.log(`Checking existing files in ${prefix}...`);
    try {
        let nextFileName = null;
        do {
            const response = await b2.listFileNames({
                bucketId: BUCKET_ID,
                prefix: prefix,
                startFileName: nextFileName,
                maxFileCount: 1000,
            });
            response.data.files.forEach(f => existingFiles.add(f.fileName));
            nextFileName = response.data.nextFileName;
        } while (nextFileName);
        console.log(`Found ${existingFiles.size} existing files.`);
    } catch (err) {
        console.error('Error listing files:', err.message);
    }
}

async function uploadFile(filePath, b2Path, retryCount = 0) {
    // Skip if already exists
    if (existingFiles.has(b2Path)) {
        processedCount++;
        // console.log(`Skipping (exists): ${b2Path}`); // Too verbose
        return;
    }

    try {
        const fileBuffer = fs.readFileSync(filePath);
        const { uploadUrl, authorizationToken } = await getUploadAuth();

        await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: b2Path,
            data: fileBuffer,
        });

        processedCount++;
        const percent = ((processedCount / totalFilesToProcess) * 100).toFixed(1);
        console.log(`[${percent}%] (${processedCount}/${totalFilesToProcess}) Uploaded: ${b2Path}`);

    } catch (err) {
        if (retryCount < 5) { // Increased retries
            // console.warn(`Error uploading ${b2Path} (Attempt ${retryCount + 1}):`, err.message);

            // Critical errors: Refresh Auth and Upload URL
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                await refreshAuth();
            }

            // Backoff
            const delay = 2000 * (retryCount + 1) + Math.random() * 1000;
            await new Promise(r => setTimeout(r, delay));
            return uploadFile(filePath, b2Path, retryCount + 1);
        }
        console.error(`FAILED: ${b2Path} - ${err.message}`);
    }
}

// ... (processFile remains mostly same, just calling uploadFile) ...

async function run() {
    console.log('Starting Smart Upload with Progress...');
    await refreshAuth();

    // 0. Pre-scan existing files to allow skip
    await loadExistingFiles('voluntariado/');
    await loadExistingFiles('atletica/');

    // 1. Gather all files first to calculate total
    console.log('Scanning local files...');
    let allTasks = [];

    function collectTasks(srcDir, b2Prefix) {
        if (!fs.existsSync(srcDir)) return;
        const list = fs.readdirSync(srcDir);
        for (const file of list) {
            const fullPath = path.join(srcDir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                collectTasks(fullPath, `${b2Prefix}/${slugify(file)}`); // Recursive slugify logic adapted
            } else {
                const ext = path.extname(file).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
                    // Determine destination path same as processFile logic
                    const webpName = path.basename(file, ext) + '.webp';
                    const b2Path = `${b2Prefix}/${webpName}`;
                    allTasks.push({ fullPath, b2Path });
                }
            }
        }
    }

    // Logic for specific folders matching original loop
    // Voluntariado
    const acoesDir = './public/Ações';
    if (fs.existsSync(acoesDir)) {
        const subDirs = fs.readdirSync(acoesDir).filter(f => fs.statSync(path.join(acoesDir, f)).isDirectory());
        for (const dir of subDirs) {
            collectTasks(path.join(acoesDir, dir), `voluntariado/${slugify(dir)}`);
        }
    }
    // Happy Hour & JuMed
    // processDir logic was flattened, so we manually collect
    function collectSimpleDir(src, prefix) {
        if (!fs.existsSync(src)) return;
        function walk(dir) {
            const list = fs.readdirSync(dir);
            for (const file of list) {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) walk(fullPath);
                else {
                    const ext = path.extname(file).toLowerCase();
                    if (['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
                        const webpName = path.basename(file, ext) + '.webp';
                        allTasks.push({ fullPath, b2Path: `${prefix}/${path.basename(file, ext)}.webp` }); // Simplified flat mapping? No, original preserved structure? 
                        // Wait, original processDir walked recursively but flattened B2 prefix? 
                        // Original: await processDir('./public/happyhour', 'atletica/happy-hour');
                        // Function processDir(srcDir, b2Prefix) -> processFile(fullPath, b2Prefix)
                        // -> uploadFile(..., `${b2Prefix}/${webpName}`)
                        // It put ALL files in srcDir (recursive) into b2Prefix root.
                        // My collection logic above was recursive structure...
                        // Let's stick to EXACT original logic:
                        // "atletica/happy-hour/img1.webp", "atletica/happy-hour/subdir/img2.webp" ? 
                        // No, processFile did: path.basename(file)... `${b2Prefix}/${webpName}`
                        // So it FLATTENED the structure into one B2 folder.
                    }
                }
            }
        }
        walk(src);
    }

    // Correct collection for legacy flat folders:
    collectSimpleDir('./public/happyhour', 'atletica/happy-hour');
    collectSimpleDir('./public/viijumed', 'atletica/vii-jumed');

    totalFilesToProcess = allTasks.length;
    console.log(`Total images to process: ${totalFilesToProcess}`);

    // Run queue
    for (let i = 0; i < allTasks.length; i += CONCURRENCY) {
        const chunk = allTasks.slice(i, i + CONCURRENCY);
        await Promise.all(chunk.map(task => processFileWrapper(task.fullPath, task.b2Path)));
    }

    console.log('All done!');
    if (fs.existsSync('temp_webp')) fs.rmSync('temp_webp', { recursive: true, force: true });
}

async function processFileWrapper(fullPath, b2Path) {
    // If exists, skip early
    if (existingFiles.has(b2Path)) {
        processedCount++;
        return;
    }

    // Convert logic (borrowed from original processFile)
    const file = path.basename(fullPath);
    const ext = path.extname(file).toLowerCase();
    const tempId = Math.random().toString(36).slice(2);
    const webpPath = path.join('temp_webp', `${tempId}_${path.basename(file, ext)}.webp`);

    if (!fs.existsSync('temp_webp')) fs.mkdirSync('temp_webp');

    try {
        if (ext === '.heic') {
            const tempJpg = path.join('temp_webp', `${tempId}_temp.jpg`);
            execSync(`sips -s format jpeg "${fullPath}" --out "${tempJpg}"`, { stdio: 'ignore' });
            await sharp(tempJpg).rotate().webp({ quality: 80 }).toFile(webpPath);
            fs.unlinkSync(tempJpg);
        } else {
            await sharp(fullPath).rotate().webp({ quality: 80 }).toFile(webpPath);
        }
        await uploadFile(webpPath, b2Path);
        if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);
    } catch (err) {
        console.error(`Conversion error ${file}:`, err.message);
        processedCount++; // count failed as processed to keep progress moving?
    }
}

run();
