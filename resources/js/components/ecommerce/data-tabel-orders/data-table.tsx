"use client"

import * as React from "react"
import { ColumnDef, VisibilityState, flexRender } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart } from "lucide-react"
import { useOrdersTable } from "./data-table-features"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  initialVisibility?: VisibilityState
  showSearch?: boolean
  showPagination?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialVisibility = {},
  showSearch = true,
  showPagination = true,
}: DataTableProps<TData, TValue>) {
  const { table, globalFilter, setGlobalFilter } = useOrdersTable({
    data,
    columns,
    initialVisibility,
  })

  return (
    <div className="space-y-4">
      {/* Search Bar - Hanya tampil jika showSearch = true */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Input
            placeholder="Cari order ID, customer, atau status..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <div className="text-xs text-muted-foreground">
            Menampilkan {table.getRowModel().rows.length} dari {data.length} pesanan
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-6 py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-gray-50">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <ShoppingCart className="h-10 w-10 text-gray-300 mb-3" />
                    <p className="font-medium text-gray-700">No orders found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls - Hanya tampil jika showPagination = true */}
      {showPagination && (
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="text-sm text-gray-500">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}