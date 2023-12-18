import { ActionIcon, FileInput, FileInputProps, Flex, Image } from '@mantine/core'
import { IconArrowBack, IconPhoto } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { getBase64FromFile } from '../../utils'

interface Props extends FileInputProps<false> {
    firstInput?: React.ReactNode
    secondInput?: React.ReactNode
    background?: string
}

export default function ImageInput({ firstInput, secondInput, background, ...rest }: Props) {
    const [value, setValue] = useState<File | undefined>(undefined)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        if (typeof rest.value === 'string') {
            setImagePreview(rest.value)
        }
    }, [rest.value])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onChange: onChangeForm, value: valueForm, ...props } = rest

    return (
        <Flex mt='lg' mb='xs' direction='row'>
            <Image
                src={imagePreview}
                width={200}
                height={200}
                fit='contain'
                imageProps={
                    background
                        ? { style: { objectFit: 'contain', padding: '5px', height: '200px', width: '200px', backgroundColor: background } }
                        : {}
                }
            />
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
                            getBase64FromFile(value, result => setImagePreview(result))
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
