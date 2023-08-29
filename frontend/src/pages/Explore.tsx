import { Stack, Title, Select, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRecoilState } from 'recoil'
import AlbumsListing from '../components/explore/AlbumsListing'
import Search from '../components/explore/Search'
import { OrderBy, albumsParams as albumsParamsState } from '../hooks/album/useAlbums'

function Explore() {
    const [albumsParams, setAlbumsParams] = useRecoilState(albumsParamsState)

    const form = useForm({
        initialValues: {
            query: '',
        },
    })

    const sortByOptions: Array<{ value: OrderBy; label: string }> = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        //{ value: 'mostPopular', label: 'Most popular' },
        //{ value: 'leastPopular', label: 'Least popular' },
    ]

    return (
        <>
            <Stack spacing='lg'>
                <Title>Explore</Title>
                <Flex align='center' gap='xl'>
                    <form
                        style={{ width: '100%' }}
                        onSubmit={form.onSubmit(values =>
                            setAlbumsParams(a => {
                                return { ...a, query: values.query }
                            })
                        )}
                    >
                        <Search
                            placeholder='Search albums'
                            {...form.getInputProps('query')}
                            onSubmit={form.onSubmit(values =>
                                setAlbumsParams(a => {
                                    return { ...a, query: values.query }
                                })
                            )}
                        />
                    </form>
                    <Select
                        value={albumsParams.orderBy}
                        onChange={(value: OrderBy | null) => {
                            setAlbumsParams(a => {
                                return { ...a, orderBy: value === null ? 'newest' : value }
                            })
                        }}
                        data={sortByOptions}
                        w={150}
                    />
                </Flex>
            </Stack>
            <AlbumsListing />
        </>
    )
}

export default Explore
