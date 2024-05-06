import { Menu, Text, useMantineTheme, ActionIcon, NumberInput } from '@mantine/core'
import { IconTrash, IconDots, IconCurrencyDollar, IconCurrencyDollarOff, IconPencilDollar } from '@tabler/icons-react'
import { useSetSalePrice, useRemoveFromCollection, useRemoveFromSale } from 'hooks/album/useCollection'
import { openConfirmModal } from '@mantine/modals'
import { useRef } from 'react'

type Props = {
    isHidden: boolean
    price: number | null
    pressing: {
        id: string
        name: string
    }
    album: {
        id: string
        title: string
    }
}

export default function CollectionOptions({ isHidden, price, pressing, album }: Props) {
    const theme = useMantineTheme()
    const ref = useRef<HTMLInputElement>(null)
    const removeFromCollection = useRemoveFromCollection()
    const removeFromSale = useRemoveFromSale()
    const setSalePrice = useSetSalePrice()

    const openRemoveFromCollectionModal = () => {
        openConfirmModal({
            title: 'Please confirm your action',
            children: <Text size='sm'>Are you sure you want to remove this pressing from your collection?</Text>,
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => removeFromCollection.mutate({ pressingId: pressing.id, albumId: album.id }),
            centered: true,
        })
    }

    const openRemoveFromSaleModal = () => {
        openConfirmModal({
            title: 'Please confirm your action',
            children: (
                <Text size='sm'>
                    Pressing &quot;{pressing.name}&quot; for the album &quot;{album.title}&quot; is currently on sale for ${price}. Are
                    you sure you want to remove it from sale?
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => removeFromSale.mutate({ pressingId: pressing.id }),
            centered: true,
        })
    }

    const openSetPriceModal = () => {
        openConfirmModal({
            title: 'Please confirm your action',
            children: (
                <>
                    <Text size='sm'>
                        {price
                            ? `Pressing "${pressing.name}" of the album "${album.title}" is currently on sale for $${price}. Update the price below.`
                            : `Are you sure you want to sell the pressing "${pressing.name}" of the album "${album.title}"? Set the price below.`}
                    </Text>
                    <NumberInput
                        ref={ref}
                        icon={<IconCurrencyDollar stroke={1.5} size={19} />}
                        mt='lg'
                        type='number'
                        placeholder='Enter price'
                        defaultValue={price || undefined}
                        required
                        min={1}
                        step={0.01}
                        precision={2}
                        hideControls
                        removeTrailingZeros
                    />
                </>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => {
                const newPrice = ref.current?.value
                if (newPrice) {
                    setSalePrice.mutate({ pressingId: pressing.id, price: parseFloat(newPrice) })
                }
            },
            centered: true,
        })
    }

    return (
        <div style={{ visibility: isHidden ? 'hidden' : 'visible' }}>
            <Menu withArrow position='bottom' withinPortal>
                <Menu.Target>
                    <ActionIcon variant='light' color='primary' radius='xl'>
                        <IconDots stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    {price ? (
                        <>
                            <Menu.Item
                                icon={<IconPencilDollar stroke={1.5} size={19} color={theme.colors.blue[6]} />}
                                onClick={openSetPriceModal}
                            >
                                Change price
                            </Menu.Item>
                            <Menu.Item
                                icon={<IconCurrencyDollarOff stroke={1.5} size={19} color={theme.colors.gray[7]} />}
                                onClick={openRemoveFromSaleModal}
                            >
                                Remove from sale
                            </Menu.Item>
                        </>
                    ) : (
                        <Menu.Item
                            icon={<IconCurrencyDollar stroke={1.5} size={19} color={theme.colors.green[6]} />}
                            onClick={openSetPriceModal}
                        >
                            Set price for sell
                        </Menu.Item>
                    )}
                    <Menu.Item color='red' icon={<IconTrash stroke={1.5} size={19} />} onClick={openRemoveFromCollectionModal}>
                        Remove from collection
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}
