import { ActionIcon, FileInput, Flex, Image } from '@mantine/core'
import { IconArrowBack, IconPhoto } from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
    label: string
    placeholder: string
    defaultValue?: string
    onChange: (image: string) => void
    firstInput?: React.ReactNode
    secondInput?: React.ReactNode
}

export default function PhotoInput({ label, placeholder, onChange, firstInput, secondInput, defaultValue }: Props) {
    const [value, setValue] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    function getBase64(file: File) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            if (typeof reader.result === 'string') {
                setImagePreview(reader.result)
                onChange(reader.result)
            }
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }
    return (
        <Flex mt='lg' mb='xs' direction='row'>
            <Image src={imagePreview || defaultValue} width={200} height={200} />
            <Flex ml='lg' w='100%' direction='column' justify='space-between'>
                {firstInput}
                {secondInput}
                <FileInput
                    value={value}
                    onChange={value => {
                        setValue(value)
                        if (value) {
                            getBase64(value)
                        }
                    }}
                    label={label}
                    placeholder={placeholder}
                    icon={<IconPhoto size={14} />}
                    accept='image/png,image/jpeg'
                    rightSection={
                        <ActionIcon
                            variant='subtle'
                            color='gray'
                            onClick={() => {
                                setValue(null)
                                setImagePreview(null)
                            }}
                        >
                            <IconArrowBack size={14} />
                        </ActionIcon>
                    }
                    rightSectionWidth={40}
                />
            </Flex>
        </Flex>
    )
}
