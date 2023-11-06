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
import reducer, { fetchCompanies } from "../../../store/slices/admin/companySlice"
import { Car } from '@/@types/organization/car'
import AttachCarUserForm from './AttachCompanyUserForm'
import DeleteCarForm from './DeleteCompany'
import { Company } from '@/@types/admin/company'
import AddCompanyForm from './AddCompany'
import AttachCompanyUserForm from './AttachCompanyUserForm'


const { Tr, Th, Td, THead, TBody, Sorter } = Table

const pageSizeOption = [
    { value: 10, label: '10 / стр' },
    { value: 20, label: '20 / стр' },
    { value: 30, label: '30 / стр' },
    { value: 40, label: '40 / стр' },
    { value: 50, label: '50 / стр' },
]

injectReducer('adminCompanies', reducer)

const CompanyTable = () => {
    const dispatch = useAppDispatch()
	const companies = useAppSelector((state) => state.adminCompanies)

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [totalData, setTotalData] = useState(0)
    const [data, setData] = useState(companies)
    const [addModal, setAddModal] = useState(false)
    const [attachModal, setAttachModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentСompany, setCurrentСompany] = useState()
    const [attachingСompany, setAttachСompany] = useState(0)

    useEffect(()=>{
        dispatch(fetchCompanies())
    },[])

    useEffect(()=>{
        setData(companies)
        setTotalData(companies.length)
    },[companies])

    const onAttachСompany = (id:number) =>{
        setAttachModal(true)
        setAttachСompany(id)
    }

    const onDeleteCompany = (company: any) =>{
        setDeleteModal(true)
        setCurrentСompany(company)
    }

    const columns: ColumnDef<Company>[] = [
        { header: 'ID', accessorKey: 'id' },
        { 
          header: 'Название', 
          accessorKey: 'related.name', 
        },
        { 
          header: 'Баланс (тг)', 
          accessorKey: 'balance',
          cell: (row:any) => {
            row = row.row.original
            return row.related.balance ? row.related.balance + ' тг' : '0 тг';
          },
        },
        { 
          header: 'Тип организации', 
          accessorKey: 'company_type',
          cell: (row:any) => {
            row = row.row.original
            return row.type === 'organization' ? 'Организация' : 'Поставщик топлива';
          },
        },
        { 
            header: 'Основатель', 
            accessorKey: 'owner',
            // cell: (row:any) => {
            //   row = row.row.original
            //   return row.type === 'organization' ? 'Организация' : 'Поставщик топлива';
            // },
          },
        { 
          header: 'Время создания', 
          accessorKey: 'create_time',
          cell: (row:any) => {
            row = row.row.original
            const createdAt = new Date(row.created_at);
            return createdAt.toLocaleString(); // Преобразовать время в удобный для чтения формат
          },
        },
        { 
            header: 'Назначить основателя', 
            accessorKey: 'attachButton',
            cell: (row: any) => {
                row = row.row.original;
                return <Button size="sm" variant="twoTone" color="blue-600" onClick={()=>onAttachСompany(row.id)}>Выбрать</Button>
            }
        },
        { 
            header: 'Назначить баланс', 
            accessorKey: 'attachButton',
            // cell: (row: any) => {
            //     row = row.row.original;
            //     return <Button size="sm" variant="twoTone" color="blue-600" onClick={()=>onAttachСompany(row.id)}>Удалить ос</Button>
            // }
        },
        { 
            header: '', 
            accessorKey: 'deleteButton',
            cell: (row: any) => {
                row = row.row.original;
                return <Button size="sm" variant="solid" color="red-600" onClick={()=>onDeleteCompany(row)}>Удалить</Button>
            }
        },
    ];


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
                    Добавить компанию
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
            <AddCompanyForm isOpen={addModal} setIsOpen={setAddModal}/>
            <AttachCompanyUserForm isOpen={attachModal} setIsOpen={setAttachModal} companyId={attachingСompany}/>
            <DeleteCarForm isOpen={deleteModal} setIsOpen={setDeleteModal} currentCompany={currentСompany}/>
        </>
    )
}

export default CompanyTable