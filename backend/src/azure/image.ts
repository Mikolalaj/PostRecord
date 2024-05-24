import { BlockBlobClient, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'

const accountName = process.env.AZURE_STORAGE_NAME
const accountKey = process.env.AZURE_STORAGE_KEY
if (!accountName) throw Error('Azure Storage account name not found')
if (!accountKey) throw Error('Azure Storage account key not found')

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)

const baseUrl = `https://${accountName}.blob.core.windows.net`
const recordsContainerName = `records`
const usersContainerName = `users`

const blobServiceClient = new BlobServiceClient(`${baseUrl}`, sharedKeyCredential)
const recordsContainerClient = blobServiceClient.getContainerClient(recordsContainerName)
const usersContainerClient = blobServiceClient.getContainerClient(usersContainerName)

export async function uploadBlobFromPath(blobName: string, filePath: string): Promise<void> {
    const blockBlobClient: BlockBlobClient = recordsContainerClient.getBlockBlobClient(blobName)
    await blockBlobClient.uploadFile(filePath)
}

export async function uploadBlobFromBuffer(blobName: string, buffer: Buffer): Promise<string> {
    const blockBlobClient: BlockBlobClient = usersContainerClient.getBlockBlobClient(blobName)
    const response = await blockBlobClient.uploadData(buffer)
    return response._response.request.url
}

//iterate over all blobs with a fiven prefix and delete them
export async function deleteBlob(prefix: string): Promise<void> {
    const containerClient = usersContainerClient
    for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        await containerClient.deleteBlob(blob.name)
    }
}
