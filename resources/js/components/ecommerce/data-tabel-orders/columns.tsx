// resources/js/components/ecommerce/data-table-orders/columns.tsx
"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Link } from "@inertiajs/react"
import { ArrowUpDown, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/utils"

export type Order = {
  id: number | string
  order_number?: string | null
  customer_name?: string | null
  shipping_name?: string | null
  user?: { name?: string } | null
  created_at?: string | null
  status: string
  total_amount?: number | null
  total?: number | null
}

interface ColumnProps {
  getStatusStyle?: (status: string) => string
  getStatusIcon?: (status: string) => React.ReactNode
}

export const getOrderColumns = ({
  getStatusStyle,
  getStatusIcon,
}: ColumnProps = {}): ColumnDef<Order>[] => [
  {
    accessorKey: "order_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-indigo-600">
        #{row.original.order_number || row.original.id}
      </span>
    ),
  },
  {
    id: "customer",
    accessorFn: (row) =>
      row.customer_name || row.shipping_name || row.user?.name || "Customer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900 block">
        {row.getValue("customer")}
      </span>
    ),
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return (
        <span className="text-gray-600 font-medium">
          {date
            ? new Date(date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) || ""
      const style = getStatusStyle ? getStatusStyle(status) : "bg-yellow-100 text-yellow-800 border-yellow-200"
      const icon = getStatusIcon ? getStatusIcon(status) : null

      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm ${style}`}>
          {icon}
          <span className="capitalize ml-1">{status}</span>
        </span>
      )
    },
  },
  {
    id: "total_amount",
    accessorFn: (row) => row.total_amount || row.total || 0,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Amount
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-gray-900">
        {formatRupiah(Number(row.getValue("total_amount")))}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="text-right uppercase tracking-wider text-xs">Actions</div>
    ),
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="text-right">
          <Link
            href={`/seller/orders/${order.id}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-xs font-semibold text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-200 transition-all opacity-0 group-hover:opacity-100"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Manage
            <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-50" />
          </Link>
        </div>
      )
    },
  },
]