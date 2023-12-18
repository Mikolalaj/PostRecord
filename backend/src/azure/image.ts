import { BlockBlobClient, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'

const accountName = process.env.AZURE_STORAGE_NAME
const accountKey = process.env.AZURE_STORAGE_KEY
if (!accountName) throw Error('Azure Storage account name not found')
if (!accountKey) throw Error('Azure Storage account key not found')

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)

const baseUrl = `https://${accountName}.blob.core.windows.net`
const containerName = `records`

const blobServiceClient = new BlobServiceClient(`${baseUrl}`, sharedKeyCredential)
const containerClient = blobServiceClient.getContainerClient(containerName)

export async function uploadBlobFromPath(blobName: string, filePath: string): Promise<void> {
    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName)
    await blockBlobClient.uploadFile(filePath)
}
