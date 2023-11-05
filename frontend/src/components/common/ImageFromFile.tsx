import { Loader, Image, ImageProps, Center } from '@mantine/core'
import { useState, useEffect } from 'react'
import { getBase64 } from '../../utils'

interface Props extends ImageProps {
    file: File
}

export default function ImageFromFile({ file, ...imageProps }: Props) {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        getBase64(file).then(result => setImage(result))
    }, [])

    if (!image) {
        return (
            <Center style={{ width: `${imageProps.width}px`, height: `${imageProps.height}px` }}>
                <Loader size='sm' />
            </Center>
        )
    }
    return <Image src={image} {...imageProps} />
}
