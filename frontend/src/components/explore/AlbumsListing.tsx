import { Pagination, SimpleGrid, Select, Flex } from '@mantine/core'
import { useAlbums } from '../../hooks/album/useAlbums'
import QueryRenderer from '../common/QueryRenderer'
import AlbumCard from './AlbumCard'
import { TableDataParams } from 'types'

type Props = {
    params: TableDataParams
    setParams: (params: TableDataParams | ((oldParams: TableDataParams) => TableDataParams)) => void
}

function AlbumsListing({ params, setParams }: Props) {
    const { get, skip } = params

    const pagination = [
        { value: '5', label: '5' },
        { value: '15', label: '15' },
        { value: '20', label: '20' },
        { value: '30', label: '30' },
    ]
    const activePage = (skip || 0) / (get || 5) + 1

    const setPage = (page: number) => {
        setParams(a => {
            return { ...a, skip: (page - 1) * (get || 5) }
        })
    }

    return (
        <QueryRenderer
            queries={[useAlbums(params)]}
            render={({ data, total }) => {
                return (
                    <>
                        <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg' style={{ gap: '20px 31px' }}>
                            {data.map(album => (
                                <AlbumCard {...album} key={album.id} />
                            ))}
                        </SimpleGrid>
                        <Flex align='center' direction='column'>
                            <Pagination page={activePage} onChange={setPage} total={Math.ceil(total / get)} />
                            <Select
                                style={{ position: 'relative', top: '-45px', alignSelf: 'end' }}
                                label='Show'
                                value={get.toString()}
                                onChange={value => {
                                    setParams(a => {
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
