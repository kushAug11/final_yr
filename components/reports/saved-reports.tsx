"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Trash2 } from "lucide-react"

interface SavedReport {
  id: string
  name: string
  type: "weekly" | "monthly" | "quarterly" | "custom"
  format: "pdf" | "excel" | "csv"
  date: string
  size: string
}

const savedReports: SavedReport[] = [
  {
    id: "r1",
    name: "Weekly Agent Performance Report",
    type: "weekly",
    format: "pdf",
    date: "2023-11-28",
    size: "1.2 MB",
  },
  {
    id: "r2",
    name: "Monthly Feedback Summary",
    type: "monthly",
    format: "excel",
    date: "2023-11-01",
    size: "3.5 MB",
  },
  {
    id: "r3",
    name: "Q3 Call Analytics Report",
    type: "quarterly",
    format: "pdf",
    date: "2023-10-01",
    size: "4.8 MB",
  },
  {
    id: "r4",
    name: "Customer Sentiment Analysis",
    type: "custom",
    format: "pdf",
    date: "2023-11-15",
    size: "2.1 MB",
  },
  {
    id: "r5",
    name: "Agent Performance Comparison",
    type: "weekly",
    format: "excel",
    date: "2023-11-21",
    size: "1.8 MB",
  },
  {
    id: "r6",
    name: "Technical Support Team Report",
    type: "monthly",
    format: "csv",
    date: "2023-11-01",
    size: "0.9 MB",
  },
  {
    id: "r7",
    name: "Keyword Analysis Report",
    type: "custom",
    format: "pdf",
    date: "2023-11-10",
    size: "1.5 MB",
  },
]

export function SavedReports() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{report.format.toUpperCase()}</Badge>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.size}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

