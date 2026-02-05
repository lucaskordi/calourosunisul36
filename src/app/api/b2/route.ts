import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const path = searchParams.get('path') || "";

    const keyID = process.env.NEXT_PUBLIC_B2_KEY_ID;
    const appKey = process.env.B2_APPLICATION_KEY;
    const bucketId = process.env.NEXT_PUBLIC_B2_BUCKET_ID;

    if (!keyID || !appKey || !bucketId) {
        return NextResponse.json({ error: "Missing B2 Env Vars" }, { status: 500 });
    }

    const authHeader = 'Basic ' + Buffer.from(keyID + ':' + appKey).toString('base64');

    try {
        const authRes = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
            headers: { Authorization: authHeader }
        });

        if (!authRes.ok) {
            const errData = await authRes.json();
            return NextResponse.json({ error: "B2 Auth Failed", detail: errData }, { status: 401 });
        }

        const authData = await authRes.json();
        const downloadUrl = authData.downloadUrl;
        const apiUrl = authData.apiUrl;
        const authToken = authData.authorizationToken;

        // 1. Get List of Files/Folders
        const listRes = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names`, {
            method: 'POST',
            headers: {
                Authorization: authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bucketId,
                prefix: path ? (path.endsWith('/') ? path : `${path}/`) : "",
                delimiter: '/',
                maxFileCount: 1000
            })
        });

        const listData = await listRes.json();

        if (type === 'folders') {
            const folderPrefix = path ? (path.endsWith('/') ? path : `${path}/`) : "";
            const folders = listData.files
                .filter((file: any) => file.fileName.endsWith('/'))
                .map((file: any) => file.fileName.replace(folderPrefix, '').replace('/', ''));
            return NextResponse.json(folders);
        } else {
            // 2. Get Bucket Name (Required for friendly URL download)
            let bucketName = 'unisul36';
            try {
                const bucketsRes = await fetch(`${apiUrl}/b2api/v2/b2_list_buckets`, {
                    method: 'POST',
                    headers: { Authorization: authToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ accountId: authData.accountId })
                });
                const bucketsData = await bucketsRes.json();
                if (bucketsData && bucketsData.buckets) {
                    const bucket = bucketsData.buckets.find((b: any) => b.bucketId === bucketId);
                    if (bucket) bucketName = bucket.bucketName;
                }
            } catch (e) {
                console.warn("B2 list_buckets failed, using fallback:", bucketName);
            }

            // 3. Get Download Authorization (For Private Buckets)
            const downloadAuthRes = await fetch(`${apiUrl}/b2api/v2/b2_get_download_authorization`, {
                method: 'POST',
                headers: { Authorization: authToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bucketId,
                    fileNamePrefix: path ? (path.endsWith('/') ? path : `${path}/`) : "",
                    validDurationInSeconds: 3600 // 1 hour
                })
            });
            const downloadAuthData = await downloadAuthRes.json();
            const downloadToken = downloadAuthData.authorizationToken;

            const files = listData.files
                .filter((file: any) => !file.fileName.endsWith('/'))
                .reduce((acc: any[], file: any) => {
                    const fileNameOnly = file.fileName.split('/').pop() || "";
                    const baseName = fileNameOnly.split('.')[0];
                    if (baseName && !acc.find(f => f.title === baseName)) {
                        acc.push({
                            id: file.fileId,
                            url: `${downloadUrl}/file/${bucketName}/${file.fileName}?Authorization=${downloadToken}`,
                            title: baseName.replace(/_/g, ' ').replace(/-/g, ' '),
                            name: file.fileName,
                        });
                    }
                    return acc;
                }, []);
            return NextResponse.json(files);
        }
    } catch (err: any) {
        console.error('B2 API Error:', err);
        return NextResponse.json({
            error: err.message,
            detail: err.toString()
        }, { status: 500 });
    }
}
