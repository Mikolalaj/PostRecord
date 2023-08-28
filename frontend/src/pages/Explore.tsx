import { Stack, Title, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSetRecoilState } from 'recoil'
import AlbumsListing from '../components/explore/AlbumsListing'
import Search from '../components/explore/Search'
import { albumsParams } from '../hooks/album/useAlbums'

function Explore() {
    const setAlbumsParams = useSetRecoilState(albumsParams)

    const form = useForm({
        initialValues: {
            query: '',
        },
    })

    const sortByOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'mostPopular', label: 'Most popular' },
        { value: 'leastPopular', label: 'Least popular' },
    ]

    return (
        <>
            <Stack spacing='lg'>
                <Title>Explore</Title>
                <form
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
                    <Select
                        // style={{ position: 'relative', top: '-45px', alignSelf: 'end' }}
                        label='Sort by'
                        value={sortByOptions[0].value}
                        // onChange={value => {
                        //     setAlbumsParams(a => {
                        //         return { ...a, get: value ? parseInt(value) : 5 }
                        //     })
                        // }}
                        data={sortByOptions}
                        w={100}
                    />
                </form>
            </Stack>
            <AlbumsListing />
        </>
    )
}

export default Explore
