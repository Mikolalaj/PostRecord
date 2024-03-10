import { Stack, Title, Select, Flex } from '@mantine/core'
import { useForm } from '@mantine/form'
import AlbumsListing from '../components/explore/AlbumsListing'
import Search from '../components/explore/Search'
import { OrderBy, TableDataParams } from 'types'
import { useState } from 'react'

function Explore() {
    const [params, setParams] = useState<TableDataParams>({
        get: 15,
        skip: 0,
        orderBy: 'newest',
        query: '',
    })

    const form = useForm({
        initialValues: {
            query: '',
        },
    })

    const sortByOptions: Array<{ value: OrderBy; label: string }> = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'mostPopular', label: 'Most popular' },
        { value: 'leastPopular', label: 'Least popular' },
    ]

    return (
        <>
            <Stack spacing='lg'>
                <Title>Explore</Title>
                <Flex align='center' gap='xl'>
                    <form
                        style={{ width: '100%' }}
                        onSubmit={form.onSubmit(values =>
                            setParams(a => {
                                return { ...a, query: values.query }
                            })
                        )}
                    >
                        <Search
                            placeholder='Search albums'
                            {...form.getInputProps('query')}
                            onSubmit={form.onSubmit(values =>
                                setParams(a => {
                                    return { ...a, query: values.query }
                                })
                            )}
                        />
                    </form>
                    <Select
                        value={params.orderBy}
                        onChange={(value: OrderBy | null) => {
                            setParams(a => {
                                return { ...a, orderBy: value === null ? 'newest' : value }
                            })
                        }}
                        data={sortByOptions}
                        w={150}
                    />
                </Flex>
            </Stack>
            <AlbumsListing params={params} setParams={setParams} />
        </>
    )
}

export default Explore
