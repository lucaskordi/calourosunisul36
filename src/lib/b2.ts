import B2 from 'backblaze-b2';

let b2: B2 | null = null;
let isAuthorized = false;
let downloadUrl = "";

async function authorize() {
    if (isAuthorized && b2) return b2;

    b2 = new B2({
        applicationKeyId: '0055d90ea3f3f580000000008',
        applicationKey: 'K005iYLqDC9PpnUl2CvfQrRccKGqSXM',
    });

    try {
        const authResponse = await b2.authorize();
        downloadUrl = authResponse.data.downloadUrl;
        isAuthorized = true;
        return b2;
    } catch (err: any) {
        console.error("B2 Authorization Failed:", err.message, err.response?.data);
        throw err;
    }
}

export async function getFiles(folder: string) {
    const b2Instance = await authorize();

    const response = await b2Instance.listFileNames({
        bucketId: process.env.NEXT_PUBLIC_B2_BUCKET_ID!,
        prefix: folder.endsWith('/') ? folder : `${folder}/`,
        delimiter: '/',
        startFileName: '',
        maxFileCount: 1000,
    });

    const bucketResponse = await b2Instance.listBuckets();
    const bucketName = bucketResponse.data.buckets.find((b: any) => b.bucketId === process.env.NEXT_PUBLIC_B2_BUCKET_ID!)?.bucketName;

    return response.data.files.map((file: any) => ({
        id: file.fileId,
        url: `${downloadUrl}/file/${bucketName}/${file.fileName}`,
        name: file.fileName,
    }));
}

export async function getFolders(prefix: string = "") {
    const b2Instance = await authorize();
    const response = await b2Instance.listFileNames({
        bucketId: process.env.NEXT_PUBLIC_B2_BUCKET_ID!,
        prefix,
        delimiter: '/',
        startFileName: '',
        maxFileCount: 1000,
    });

    return response.data.files
        .filter((file: any) => file.fileName.endsWith('/'))
        .map((file: any) => file.fileName.replace(prefix, '').replace('/', ''));
}
