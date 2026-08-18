
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  TableOptions,
} from "@tanstack/react-table"

interface UseProductTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  initialPageSize?: number
}

export function useProductTable<TData, TValue>({
  data,
  columns,
  initialPageSize = 10,
}: UseProductTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const tableOptions: TableOptions<TData> = {
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  }

  const table = useReactTable(tableOptions)

  return {
    table,
    searchTerm: (table.getColumn("name")?.getFilterValue() as string) ?? "",
    setSearchTerm: (value: string) => table.getColumn("name")?.setFilterValue(value),
  }
}