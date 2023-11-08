import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
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
import { data100 } from '../../data'
import type { Person } from '../../data'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import { Button, Pagination, Select } from '@/components/ui'
import { DebouncedInput, fuzzyFilter } from '@/utils/helpers/functions'
import { Option } from '@/@types/share/share'
import { injectReducer, useAppDispatch, useAppSelector } from '@/store'
import reducer, { fetchUsers } from "../../../store/slices/org/usersSlice"
import { User } from '@/@types/auth'
import AttachUserCarForm from './AttachUserCarForm'
import { getUserCars } from '@/services/organization/CarsServise'


interface Car {
    registration_number: string;
    registration_letters: string;
    region: string;
}

interface AttachUserFormProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    userId: number
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const UserCarsList: React.FC<AttachUserFormProps> = ({ isOpen, setIsOpen,userId }) => {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [totalData, setTotalData] = useState(0)
    const [cars, setCars] = useState<Car[]>([]);
    const [data, setData] = useState(cars);

    useEffect(() => {
        if (userId) {
            (async () => {
                try {
                    const response: any = await getUserCars(userId);
                    setCars(response.data.data.cars);
                } catch (error) {
                    console.error('Failed to fetch user cars:', error);
                }
            })();
        }
    }, [userId]);

    useEffect(()=>{
        const processedCars = cars.map((car: Car) => {
            return {
                ...car,
                combinedRegistration: `${car.registration_number}${car.registration_letters}${car.region}`
            }
        });
        setData(processedCars);
        setTotalData(processedCars.length);
    }, [cars]);

    
    

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const columns = useMemo<ColumnDef<Car>[]>(
        () => [
            { header: 'ID', accessorKey: 'id' },
            { header: 'Номер', accessorKey: 'combinedRegistration' },
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
        <div>
            <Dialog
                isOpen={isOpen}
                style={{
                    content: {
                        marginTop: 10,
                    },
                }}
                width={"90%"}
                contentClassName="pb-0 px-0"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
            <div style={{padding:20}}>
                <div className="px-6 pb-6">
                    <h5 className="mb-4">Список машин пользователя</h5>
                </div>
                <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Поиск по стобцам..."
                onChange={(value) => setGlobalFilter(String(value))}
                />
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
                </div>
            </Dialog>
        </div>
    )
}

export default UserCarsList