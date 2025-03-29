"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type Feedback = {
  id: string
  callId: string
  agent: string
  customer: string
  rating: number
  sentiment: "positive" | "neutral" | "negative"
  comment: string
  date: string
  duration: string
}

const data: Feedback[] = [
  {
    id: "f1",
    callId: "CALL-1234",
    agent: "Sarah Johnson",
    customer: "John Smith",
    rating: 5,
    sentiment: "positive",
    comment: "Very helpful and resolved my issue quickly.",
    date: "2023-11-28",
    duration: "5m 23s",
  },
  {
    id: "f2",
    callId: "CALL-1235",
    agent: "Michael Brown",
    customer: "Emma Wilson",
    rating: 4,
    sentiment: "positive",
    comment: "Good service but took a bit longer than expected.",
    date: "2023-11-28",
    duration: "8m 12s",
  },
  {
    id: "f3",
    callId: "CALL-1236",
    agent: "Jessica Lee",
    customer: "Robert Taylor",
    rating: 3,
    sentiment: "neutral",
    comment: "Average experience, issue was resolved.",
    date: "2023-11-27",
    duration: "12m 05s",
  },
  {
    id: "f4",
    callId: "CALL-1237",
    agent: "David Wilson",
    customer: "Olivia Martin",
    rating: 2,
    sentiment: "negative",
    comment: "Had to repeat my issue multiple times, frustrating.",
    date: "2023-11-27",
    duration: "15m 47s",
  },
  {
    id: "f5",
    callId: "CALL-1238",
    agent: "Emily Davis",
    customer: "James Johnson",
    rating: 5,
    sentiment: "positive",
    comment: "Excellent service, very knowledgeable agent.",
    date: "2023-11-26",
    duration: "4m 32s",
  },
  {
    id: "f6",
    callId: "CALL-1239",
    agent: "Sarah Johnson",
    customer: "Sophia Brown",
    rating: 4,
    sentiment: "positive",
    comment: "Quick resolution to my problem.",
    date: "2023-11-26",
    duration: "6m 18s",
  },
  {
    id: "f7",
    callId: "CALL-1240",
    agent: "Michael Brown",
    customer: "William Davis",
    rating: 1,
    sentiment: "negative",
    comment: "Very unhelpful, issue still not resolved.",
    date: "2023-11-25",
    duration: "22m 09s",
  },
  {
    id: "f8",
    callId: "CALL-1241",
    agent: "Jessica Lee",
    customer: "Ava Wilson",
    rating: 5,
    sentiment: "positive",
    comment: "Perfect service, thank you!",
    date: "2023-11-25",
    duration: "3m 45s",
  },
  {
    id: "f9",
    callId: "CALL-1242",
    agent: "David Wilson",
    customer: "Mia Taylor",
    rating: 3,
    sentiment: "neutral",
    comment: "Okay service, but could be improved.",
    date: "2023-11-24",
    duration: "9m 27s",
  },
  {
    id: "f10",
    callId: "CALL-1243",
    agent: "Emily Davis",
    customer: "Ethan Martin",
    rating: 4,
    sentiment: "positive",
    comment: "Good experience overall.",
    date: "2023-11-24",
    duration: "7m 14s",
  },
]

export const columns: ColumnDef<Feedback>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "callId",
    header: "Call ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("callId")}</div>,
  },
  {
    accessorKey: "agent",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Agent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("agent")}</div>,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const rating = Number.parseFloat(row.getValue("rating"))
      return <div className="font-medium">{rating}/5</div>
    },
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("sentiment") as string
      return (
        <Badge variant={sentiment === "positive" ? "success" : sentiment === "neutral" ? "warning" : "destructive"}>
          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.getValue("comment") as string
      return <div className="max-w-[300px] truncate">{comment}</div>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const feedback = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(feedback.id)}>
              Copy feedback ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Listen to recording</DropdownMenuItem>
            <DropdownMenuItem>Flag for review</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function RecentFeedback() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by agent..."
          value={(table.getColumn("agent")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("agent")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

