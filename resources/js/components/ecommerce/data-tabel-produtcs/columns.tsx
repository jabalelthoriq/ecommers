
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Link } from "@inertiajs/react" // Atau dari 'next/link' jika menggunakan Next.js
import { Package, Edit, Trash, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupiah } from "@/lib/utils"

export type Product = {
  id: string | number
  name: string
  slug: string
  price: number
  stock: number
  image?: string | null
}

interface ColumnProps {
  onDelete: (slug: string) => void
}

export const getProductColumns = ({ onDelete }: ColumnProps): ColumnDef<Product>[] => [
  {
    accessorKey: "image",
    header: () => <span className="uppercase tracking-wider text-xs">Product Image</span>,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
              <Package className="h-8 w-8" />
            </div>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-indigo-600">
        {formatRupiah(Number(row.getValue("price")))}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent uppercase tracking-wider text-xs font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const stock = Number(row.getValue("stock"))
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            stock > 10
              ? "bg-green-100 text-green-800"
              : stock > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stock} in stock
        </span>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right uppercase tracking-wider text-xs">Actions</div>,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/seller/products/${product.slug}/edit`}
            className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600 shadow-sm transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(product.slug)}
            className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      )
    },
  },
]