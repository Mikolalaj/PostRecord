import { ActionIcon, Button, Center, Group, Pagination, Table, Text } from '@mantine/core'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { MyError, TableDataParams } from 'types'
import QueryRenderer from './QueryRenderer'
import { useHover } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'

interface TableRow {
    id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

interface TableData<T extends TableRow> {
    data: Array<T>
    total: number
}

type Props<T extends TableRow> = {
    dataQuery: (params: TableDataParams) => UseQueryResult<TableData<T>, AxiosError<MyError>>
    deleteMutation?: () => UseMutationResult<unknown, AxiosError<MyError>, string, unknown>
    headers: Array<string>
    renderRow: (record: T) => JSX.Element
    itemName: string
    nameKey: keyof T
    onAdd?: () => void
    onEdit?: (record: T) => void
}

function DataTable<T extends TableRow>({ dataQuery, headers, renderRow, itemName, nameKey, onAdd, deleteMutation, onEdit }: Props<T>) {
    const [params, setParams] = useState<TableDataParams>({ get: 10, skip: 0, query: '', orderBy: 'newest' })
    const deleteMutationCalled = deleteMutation?.()
    const onDelete = deleteMutationCalled ? (id: string) => deleteMutationCalled?.mutate(id) : undefined

    return (
        <>
            <Group position='right'>
                <Button variant='light' mt='lg' size='xs' onClick={onAdd} leftIcon={<IconPlus size={15} />}>
                    Add new {itemName}
                </Button>
            </Group>
            <QueryRenderer
                queries={[dataQuery(params)]}
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
                                        <Row
                                            key={index}
                                            itemName={itemName}
                                            nameKey={nameKey}
                                            record={record}
                                            renderRow={renderRow}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                        />
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

export default DataTable

interface RowProps<T extends TableRow> {
    record: T
    itemName: string
    nameKey: keyof T
    renderRow: (record: T) => JSX.Element
    onEdit?: (record: T) => void
    onDelete?: (id: string) => void
}

function Row<T extends TableRow>({ record, itemName, nameKey, renderRow, onEdit, onDelete }: RowProps<T>) {
    const { hovered, ref } = useHover<HTMLTableRowElement>()

    const openDeleteModal = () =>
        openConfirmModal({
            title: `Delete ${itemName}`,
            centered: true,
            children: (
                <Text size='sm'>
                    Are you sure you want to delete {itemName} &quot;
                    <Text component='span' fw={700}>
                        {record[nameKey]}
                    </Text>
                    &quot;? This action is destructive and you will have to contact support to restore your data.
                </Text>
            ),
            // eslint-disable-next-line quotes
            labels: { confirm: `Delete ${itemName}`, cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onConfirm: () => onDelete?.(record.id),
        })

    return (
        <>
            <tr ref={ref} style={{ height: 75, maxHeight: 75 }}>
                {renderRow(record)}
                <td style={{ width: '15%' }}>
                    <Group position='center' spacing='lg' style={{ visibility: !hovered ? 'hidden' : undefined }}>
                        {onEdit && <ActionButton title='Edit' color='blue' icon={IconEdit} onClick={() => onEdit(record)} />}
                        {onDelete && <ActionButton title='Delete' color='red' icon={IconTrash} onClick={openDeleteModal} />}
                    </Group>
                </td>
            </tr>
        </>
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
