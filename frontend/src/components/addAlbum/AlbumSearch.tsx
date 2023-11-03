import { Autocomplete, Avatar, Group, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { forwardRef, useState } from 'react'
import { SearchAlbum, useSearchAlbums } from '../../hooks/album/useAlbums'
import { useSetRecoilState } from 'recoil'
import { spotifyAlbumIdState } from '../../hooks/album/useSpotifyAlbum'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'>, SearchAlbum {}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { image, albumTitle, artist, spotifyId, ...others }: ItemProps,
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

export default function AlbumSearch() {
    const setAlbumId = useSetRecoilState(spotifyAlbumIdState)
    const [selectedAlbum, setSelectedAlbum] = useState<string>('')

    const [search, setSearch] = useState('')
    const [debounced] = useDebouncedValue(search, 250)
    const { data } = useSearchAlbums(debounced)

    const getSelectData = (album: SearchAlbum) => {
        return { value: album.albumTitle, ...album }
    }

    const albumsRaw = data.map(album => getSelectData(album))
    const albumsRawUnique = albumsRaw.filter((album, index, self) => self.findIndex(a => a.albumTitle === album.albumTitle) === index)
    const albums = selectedAlbum ? [] : albumsRawUnique

    const getSpotifyId = (albumTitle: string) => {
        const album = albums.find(album => album.albumTitle === albumTitle)
        return album ? album.spotifyId : ''
    }
    return (
        <Autocomplete
            label='Album title'
            placeholder='Start typing to find your album...'
            nothingFound={!selectedAlbum && 'No albums found'}
            itemComponent={SelectItem}
            data={albums}
            onChange={value => {
                setSelectedAlbum('')
                setSearch(value || '')
            }}
            onItemSubmit={value => {
                setSelectedAlbum(value.value)
                setAlbumId(getSpotifyId(value.value))
            }}
            filter={() => true}
            value={search}
            limit={8}
        />
    )
}
