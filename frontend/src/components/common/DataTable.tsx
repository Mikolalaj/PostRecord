import { ActionIcon, Button, Center, Group, Pagination, Table } from '@mantine/core'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { tableDataParams } from 'atoms'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { MyError } from 'types'
import QueryRenderer from './QueryRenderer'
import { useHover } from '@mantine/hooks'

interface TableData<T> {
    data: Array<T>
    total: number
}

type Props<T> = {
    dataQuery: () => UseQueryResult<TableData<T>, AxiosError<MyError>>
    headers: Array<string>
    renderRow: (record: T) => JSX.Element
    itemName: string
    onAdd?: () => void
    onDelete?: (record: T) => void
    onEdit?: (record: T) => void
}

export default function DataTable<T>({ dataQuery, headers, renderRow, itemName, onAdd, onDelete, onEdit }: Props<T>) {
    const [params, setParams] = useRecoilState(tableDataParams)

    useEffect(() => {
        setParams({ get: 10, skip: 0, query: '', orderBy: 'newest' })
    }, [])

    return (
        <>
            <Group position='right'>
                <Button variant='light' mt='lg' size='xs' onClick={onAdd} leftIcon={<IconPlus size={15} />}>
                    Add new {itemName}
                </Button>
            </Group>
            <QueryRenderer
                queries={[dataQuery()]}
                render={({ data, total }) => {
                    if (!params) return null
                    const { get, skip } = params
                    const activePage = (skip || 0) / (get || 5) + 1

                    return (
                        <>
                            <Table highlightOnHover>
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((record, index) => (
                                        <Row key={index} record={record} renderRow={renderRow} onEdit={onEdit} onDelete={onDelete} />
                                    ))}
                                </tbody>
                            </Table>
                            <Center mt='lg'>
                                <Pagination
                                    page={activePage}
                                    onChange={(page: number) => {
                                        setParams({ ...params, skip: (page - 1) * (get || 5) })
                                    }}
                                    total={Math.ceil(total / get)}
                                />
                            </Center>
                        </>
                    )
                }}
            />
        </>
    )
}

interface RowProps<T> {
    record: T
    renderRow: (record: T) => JSX.Element
    onEdit?: (record: T) => void
    onDelete?: (record: T) => void
}

function Row<T>({ record, renderRow, onEdit, onDelete }: RowProps<T>) {
    const { hovered, ref } = useHover<HTMLTableRowElement>()
    return (
        <tr ref={ref} style={{ height: 75, maxHeight: 75 }}>
            {renderRow(record)}
            <td style={{ width: '15%' }}>
                <Group position='center' spacing='lg' style={{ visibility: !hovered ? 'hidden' : undefined }}>
                    {onEdit && <ActionButton title='Edit' color='blue' icon={IconEdit} onClick={() => onEdit(record)} />}
                    {onDelete && <ActionButton title='Delete' color='red' icon={IconTrash} onClick={() => onDelete(record)} />}
                </Group>
            </td>
        </tr>
    )
}

interface ActionButtonProps {
    title: string
    color: string
    icon: React.FC<{ size: number }>
    onClick: () => void
}

function ActionButton({ title, color, icon: Icon, onClick }: ActionButtonProps) {
    return (
        <ActionIcon title={title} size='lg' radius='xl' color={color} variant='light' onClick={onClick}>
            <Icon size={18} />
        </ActionIcon>
    )
}
