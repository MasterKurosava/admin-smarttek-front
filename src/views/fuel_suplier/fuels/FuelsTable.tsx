import { useMemo, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import { Button, Pagination, Select } from '@/components/ui'
import { DebouncedInput, fuzzyFilter } from '@/utils/helpers/functions'
import { Option } from '@/@types/share/share'
import { injectReducer, useAppDispatch, useAppSelector } from '@/store'
import reducer, { fetchFuelPoints } from "../../../store/slices/fuel_suplier/fuelPointsSlice"
import { FuellingPoint } from '@/@types/organization/fuellingPoint'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

injectReducer('fuelPoints', reducer)

const FuelPointsTable = () => {
    const dispatch = useAppDispatch()
	const points = useAppSelector((state) => state.fuelPoints)
    // const locations = useAppSelector((state) => state.orgLocations)

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [totalData, setTotalData] = useState(0)
    const [data, setData] = useState(points)
    const [addModal, setAddModal] = useState(false)
    const [attachModal, setAttachModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentPoint, setCurrentPoint] = useState()
    const [attachingPoint, setAttachPoint] = useState(0)

    useEffect(()=>{
        // dispatch(fetchLocations())
        dispatch(fetchFuelPoints())
    },[])

    useEffect(()=>{
        const processedPoints = points.map((point:any )=>({
            ...point,
            fullCords: point.long + " " + point.lat,
            // location: locations.find(l=>l.id == point.location_id)?.name
    }))
        setData(processedPoints)
        setTotalData(processedPoints.length)
    },[points])

    // const onAttachPoint = (id:number) =>{
    //     setAttachModal(true)
    //     setAttachPoint(id)
    // }

    // const onDeletePoint = (point: any) =>{
    //     setDeleteModal(true)
    //     setCurrentPoint(point)
    // }

    const columns = useMemo<ColumnDef<FuellingPoint>[]>(
        () => [
            { header: 'ID', accessorKey: 'id' },
            { header: 'Название', accessorKey: 'name' },
            { header: 'Координаты', accessorKey: 'fullCords' },
            { header: 'Локация', accessorKey:'location'},
            { header: 'Начало работы', accessorKey: 'start_time' },
            { header: 'Конец работы', accessorKey: 'end_time' },
            { 
                header: '', 
                accessorKey: 'attachButton',
                cell: (row: any) => {
                    row = row.row.original;
                    return <Button size="sm" variant="twoTone" color="blue-600" onClick={()=>onAttachPoint(row.id)}>Прикрепить машину</Button>
                }
            },
            { 
                header: '', 
                accessorKey: 'deleteButton',
                cell: (row: any) => {
                    row = row.row.original;
                    // return <Button size="sm" variant="solid" color="red-600" onClick={()=>onDeletePoint(row)}>Удалить</Button>
                }
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DebouncedInput
                    value={globalFilter ?? ''}
                    className="p-2 font-lg shadow border border-block"
                    placeholder="Поиск по стобцам..."
                    onChange={(value) => setGlobalFilter(String(value))}
                />
                <Button className="mb-2 ml-2" variant="solid" color="green-600" onClick={()=>setAddModal(true)}>
                    Добавить заправку
                </Button>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
            {/* <AddPointForm isOpen={addModal} setIsOpen={setAddModal}/> */}
            {/* <AttachPointForm isOpen={attachModal} setIsOpen={setAttachModal} fuelPointId={attachingPoint}/> */}
            {/* <DeletePointForm isOpen={deleteModal} setIsOpen={setDeleteModal} currentPoint={currentPoint}/> */}
        </>
    )
}



export default FuelPointsTable