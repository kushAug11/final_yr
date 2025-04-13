"use client"

import { useState, useEffect } from "react"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllCallsSummary } from "@/lib/HelperFunction"

// Feedback type adjusted for database data
export type Feedback = {
  id: string
  callId: string
  agent: string
  customer: string
  rating: number
  comment: string
  date: string
  duration: string
  audioFilename: string
}

// Columns definition with sentiment removed and adjusted for database data
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
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Agent
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("agent")}</div>,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rating = Number.parseFloat(row.getValue("rating"));
      return <div className="font-medium">{rating.toFixed(2)}/5</div>;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.getValue("comment") as string;
      return <div className="max-w-[300px] truncate">{comment}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
      const feedback = row.original;
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
            <DropdownMenuItem onClick={() => console.log(`Generate report for call ${feedback.callId}`)}>
              Generate Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(`Listen to audio: ${feedback.audioFilename}`)}>
              Listen to Audio Files
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]

export function RecentFeedback() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Feedback[]>([])

  // Fetch data from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const callsData = await getAllCallsSummary();
        console.log("API Response:", callsData); // Debug the response

        // Handle different possible response structures
        let callsArray = Array.isArray(callsData) ? callsData : callsData?.calls || [];

        if (!Array.isArray(callsArray)) {
          console.error("Expected an array of calls, got:", callsArray);
          setData([]);
          return;
        }

        const formattedData: Feedback[] = callsArray.map((call: any) => {
          // Convert duration from seconds to mm:ss format
          const minutes = Math.floor(call.call_duration / 60);
          const seconds = call.call_duration % 60;
          const duration = `${minutes}m ${seconds.toString().padStart(2, "0")}s`;

          // Generate a date (since not provided, use current date or placeholder)
          const date = new Date().toISOString().split("T")[0]; // Placeholder: current date

          // Generate comment based on rating
          const rating = call.numerical_score;
          let comment = "";
          if (rating > 4) {
            // Positive comments
            const positiveComments = [
              "Great service, very helpful!",
              "Excellent support, issue resolved quickly.",
              "Very satisfied with the agent.",
              "Outstanding experience!"
            ];
            comment = positiveComments[Math.floor(Math.random() * positiveComments.length)];
          } else if (rating > 3) {
            // Neutral comments
            const neutralComments = [
              "Satisfactory experience.",
              "Issue resolved adequately.",
              "Service was okay, met expectations.",
              "Good effort, could improve."
            ];
            comment = neutralComments[Math.floor(Math.random() * neutralComments.length)];
          } else {
            // Negative comments
            const negativeComments = [
              "Needs improvement.",
              "Unsatisfactory service.",
              "Issue not fully resolved.",
              "Disappointing experience."
            ];
            comment = negativeComments[Math.floor(Math.random() * negativeComments.length)];
          }

          return {
            id: `f${call.call_id}`,
            callId: `CALL-${call.call_id}`,
            agent: `Agent ${call.employee_unique_id}`, // Placeholder: use employee ID
            customer: "Unknown", // Placeholder: no customer data
            rating: call.numerical_score,
            comment, // Use generated comment
            date,
            duration,
            audioFilename: call.audio_filename,
          };
        });
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch calls data:", error);
        setData([]); // Set empty array on error to prevent table crash
      }
    }
    fetchData();
  }, []);

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
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
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
    </div>
  )
}