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
const CONCURRENCY = 10;

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

async function uploadFile(filePath, b2Path) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const uploadUrlResponse = await b2.getUploadUrl({ bucketId: BUCKET_ID });
        const { uploadUrl, authorizationToken } = uploadUrlResponse.data;

        await b2.uploadFile({
            uploadUrl,
            uploadAuthToken: authorizationToken,
            fileName: b2Path,
            data: fileBuffer,
        });

        console.log(`Uploaded: ${b2Path}`);
    } catch (err) {
        console.error(`Error uploading ${filePath}:`, err.message);
    }
}

async function processFile(fullPath, b2Prefix) {
    const file = path.basename(fullPath);
    const ext = path.extname(file).toLowerCase();

    // Only process images
    if (!['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) return;

    const webpName = path.basename(file, ext) + '.webp';
    const tempId = Math.random().toString(36).slice(2);
    const webpPath = path.join('temp_webp', `${tempId}_${webpName}`);

    if (!fs.existsSync('temp_webp')) fs.mkdirSync('temp_webp');

    try {
        if (ext === '.heic') {
            // Fallback for HEIC using 'sips' on macOS
            const tempJpg = path.join('temp_webp', `${tempId}_temp.jpg`);
            try {
                execSync(`sips -s format jpeg "${fullPath}" --out "${tempJpg}"`, { stdio: 'ignore' });
                await sharp(tempJpg)
                    .rotate()
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                fs.unlinkSync(tempJpg);
            } catch (sipsErr) {
                console.error(`HEIC conversion failed for ${file}:`, sipsErr.message);
                return;
            }
        } else {
            await sharp(fullPath)
                .rotate()
                .webp({ quality: 80 })
                .toFile(webpPath);
        }

        await uploadFile(webpPath, `${b2Prefix}/${webpName}`);
        if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);
    } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
    }
}

async function processDir(srcDir, b2Prefix) {
    if (!fs.existsSync(srcDir)) return;

    const allFiles = [];
    function walk(dir) {
        if (!fs.existsSync(dir)) return;
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else {
                allFiles.push(fullPath);
            }
        }
    }
    walk(srcDir);

    console.log(`Processing ${allFiles.length} items in ${srcDir}...`);
    for (let i = 0; i < allFiles.length; i += CONCURRENCY) {
        const chunk = allFiles.slice(i, i + CONCURRENCY);
        await Promise.all(chunk.map(file => processFile(file, b2Prefix)));
    }
}

async function run() {
    console.log('Starting recursive image processing with HEIC fallback...');
    try {
        await b2.authorize();
    } catch (err) {
        console.error('B2 Authorization failed.', err.message);
        process.exit(1);
    }

    // 1. Atlética - Happy Hour
    console.log('--- Processing Atlética: Happy Hour ---');
    await processDir('./public/happyhour', 'atletica/happy-hour');

    // 2. Atlética - VII JuMed
    console.log('--- Processing Atlética: VII JuMed ---');
    await processDir('./public/viijumed', 'atletica/vii-jumed');

    // 3. Voluntariado - Ações
    console.log('--- Processing Voluntariado: Ações ---');
    const acoesDir = './public/Ações';
    if (fs.existsSync(acoesDir)) {
        const subDirs = fs.readdirSync(acoesDir).filter(f => {
            try {
                return fs.statSync(path.join(acoesDir, f)).isDirectory();
            } catch (e) {
                return false;
            }
        });
        for (const dir of subDirs) {
            const normalizedB2Name = slugify(dir);
            console.log(`Processing action: ${dir}`);
            await processDir(path.join(acoesDir, dir), `voluntariado/${normalizedB2Name}`);
        }
    }

    console.log('All done!');
    if (fs.existsSync('temp_webp')) fs.rmSync('temp_webp', { recursive: true, force: true });
}

run();
