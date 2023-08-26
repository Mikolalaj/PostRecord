import { Center, Pagination, SimpleGrid } from '@mantine/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { albumsParams, useAlbums } from '../../hooks/album/useAlbums'
import QueryRenderer from '../common/QueryRenderer'
import AlbumCard from './AlbumCard'

function AlbumsListing() {
    const { get, skip } = useRecoilValue(albumsParams)
    const setAlbumsParams = useSetRecoilState(albumsParams)

    const activePage = (skip || 0) / (get || 5) + 1
    console.log(activePage)
    const setPage = (page: number) => {
        setAlbumsParams(a => {
            return { ...a, skip: (page - 1) * (get || 5) }
        })
    }

    return (
        <QueryRenderer
            queries={[useAlbums()]}
            render={data => {
                console.log(data)
                return (
                    <>
                        <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg'>
                            {data.albums.map(album => (
                                <AlbumCard {...album} key={album.id} />
                            ))}
                        </SimpleGrid>
                        <Center>
                            <Pagination page={activePage} onChange={setPage} total={Math.ceil(data.total / (get || 5))} />
                        </Center>
                    </>
                )
            }}
        />
    )
}

export default AlbumsListing
