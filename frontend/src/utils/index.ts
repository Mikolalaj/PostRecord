import { TableDataParams } from 'atoms'

export function getBase64FromFile(file: File, onSuccess: (base64: string) => void) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            onSuccess(reader.result)
        }
    }
    reader.onerror = error => {
        console.log('Error: ', error)
    }
}

export function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
            }
        }
        reader.onerror = error => {
            console.log('Error: ', error)
            reject(error)
        }
    })
}

export function getFilterParams(params: TableDataParams | null) {
    if (!params) return {}
    return {
        get: params.get,
        skip: params.skip,
        orderBy: params.orderBy,
        query: params.query !== '' ? params.query : null,
    }
}

export function getFilterParamsKeys(name: string, params: TableDataParams | null) {
    if (!params) return [name]
    return [name, params.get, params.skip, params.query, params.orderBy]
}
