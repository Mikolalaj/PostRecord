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
