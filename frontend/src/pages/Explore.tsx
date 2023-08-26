import { Stack, Title } from '@mantine/core'
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
                </form>
            </Stack>
            <AlbumsListing />
        </>
    )
}

export default Explore
