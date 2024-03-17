import { Avatar, Group, Select, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchAlbum, useSearchLocalAlbums, useSearchSpotifyAlbums } from 'hooks/album/useAlbums'
import { forwardRef, useState } from 'react'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'>, SearchAlbum {}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { image, albumTitle, artist, albumId, ...others }: ItemProps,
    ref
) {
    return (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />
                <div>
                    <Text size='sm'>{albumTitle}</Text>
                    <Text size='xs' opacity={0.65}>
                        {artist}
                    </Text>
                </div>
            </Group>
        </div>
    )
})

interface Props {
    albumsType: 'spotify' | 'local'
    setAlbumId?: (albumId: string) => void
    value?: string
    onChange?: (value: string) => void
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    error?: string
}

export default function AlbumSearch({ albumsType, setAlbumId, onChange, value, ...props }: Props) {
    const [selectedAlbum, setSelectedAlbum] = useState<boolean>(false)

    const [search, setSearch] = useState('')
    const [debounced] = useDebouncedValue(search, 250)
    const useAlbums = albumsType === 'spotify' ? useSearchSpotifyAlbums : useSearchLocalAlbums
    const { data } = useAlbums(debounced)

    const getSelectData = (album: SearchAlbum) => {
        return { label: album.albumTitle, value: album.albumId, ...album }
    }

    const albumsRaw = data.map(album => getSelectData(album))
    const albumsRawUnique = albumsRaw.filter((album, index, self) => self.findIndex(a => a.albumTitle === album.albumTitle) === index)
    const albums = selectedAlbum ? [] : albumsRawUnique

    return (
        <Select
            searchable
            label='Album'
            placeholder='Start typing to find your album...'
            nothingFound={!selectedAlbum && 'No albums found'}
            itemComponent={SelectItem}
            data={albums}
            onSearchChange={value => {
                setSelectedAlbum(false)
                setSearch(value)
            }}
            onChange={albumId => {
                if (albumId) {
                    onChange?.(albumId)
                    setSelectedAlbum(true)
                    setAlbumId?.(albumId)
                }
            }}
            filter={() => true}
            searchValue={search}
            value={value}
            limit={8}
            required={albumsType === 'local'}
            {...props}
        />
    )
}
