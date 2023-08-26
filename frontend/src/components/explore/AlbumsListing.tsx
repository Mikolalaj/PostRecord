import { Pagination, SimpleGrid, Select, Flex } from '@mantine/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { albumsParams, useAlbums } from '../../hooks/album/useAlbums'
import QueryRenderer from '../common/QueryRenderer'
import AlbumCard from './AlbumCard'

function AlbumsListing() {
    const { get, skip } = useRecoilValue(albumsParams)
    const setAlbumsParams = useSetRecoilState(albumsParams)

    const pagination = [
        { value: '5', label: '5' },
        { value: '15', label: '15' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
    ]
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
                        <Flex align='center' direction='column'>
                            <Pagination page={activePage} onChange={setPage} total={Math.ceil(data.total / get)} />
                            <Select
                                style={{ position: 'relative', top: '-45px', alignSelf: 'end' }}
                                label='Show'
                                value={get.toString()}
                                onChange={value => {
                                    setAlbumsParams(a => {
                                        return { ...a, get: value ? parseInt(value) : 5 }
                                    })
                                }}
                                data={pagination}
                                w={100}
                            />
                        </Flex>
                    </>
                )
            }}
        />
    )
}

export default AlbumsListing
