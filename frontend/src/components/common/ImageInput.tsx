import { ActionIcon, FileInput, FileInputProps, Flex, Image } from '@mantine/core'
import { IconArrowBack, IconPhoto } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface Props extends FileInputProps<false> {
    firstInput?: React.ReactNode
    secondInput?: React.ReactNode
}

export default function ImageInput({ firstInput, secondInput, ...rest }: Props) {
    const [value, setValue] = useState<File | undefined>(undefined)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        if (typeof rest.value === 'string') {
            setImagePreview(rest.value)
        }
    }, [rest.value])

    function getBase64(file: File) {
        console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setImagePreview(reader.result)
            }
        }
        reader.onerror = error => {
            console.log('Error: ', error)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onChange: onChangeForm, value: valueForm, ...props } = rest
    
    return (
        <Flex mt='lg' mb='xs' direction='row'>
            <Image src={imagePreview} width={200} height={200} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    marginLeft: '20px',
                    flexGrow: 1,
                    minWidth: 0,
                }}
            >
                {firstInput}
                {secondInput}
                <FileInput
                    value={value}
                    onChange={value => {
                        if (onChangeForm) {
                            onChangeForm(value)
                        }
                        if (value) {
                            setValue(value)
                            getBase64(value)
                        }
                    }}
                    icon={<IconPhoto size={14} />}
                    accept='image/png,image/jpeg'
                    rightSection={
                        <ActionIcon
                            variant='subtle'
                            color='gray'
                            onClick={() => {
                                setImagePreview(null)
                            }}
                        >
                            <IconArrowBack size={14} />
                        </ActionIcon>
                    }
                    rightSectionWidth={40}
                    {...props}
                />
            </div>
        </Flex>
    )
}
