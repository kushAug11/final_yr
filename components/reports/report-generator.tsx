"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileText } from "lucide-react"

export function ReportGenerator() {
  const [reportType, setReportType] = useState("weekly")

  return (
    <div className="space-y-6">

      {/* Report Type */}
      {/* <div className="space-y-2">
        <h3 className="text-lg font-medium">Report Type</h3>
        <RadioGroup defaultValue="weekly" className="flex space-x-4" onValueChange={setReportType} value={reportType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly Report</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly Report</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="quarterly" id="quarterly" />
            <Label htmlFor="quarterly">Quarterly Report</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom Date Range</Label>
          </div>
        </RadioGroup>
      </div> */}

      {/* <Separator /> */}
{/* Report Content */}
      {/* <div className="space-y-2">
        <h3 className="text-lg font-medium">Report Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="agent-performance" defaultChecked />
              <Label htmlFor="agent-performance">Agent Performance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="call-metrics" defaultChecked />
              <Label htmlFor="call-metrics">Call Metrics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sentiment-analysis" defaultChecked />
              <Label htmlFor="sentiment-analysis">Sentiment Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="feedback-summary" defaultChecked />
              <Label htmlFor="feedback-summary">Feedback Summary</Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="trend-analysis" />
              <Label htmlFor="trend-analysis">Trend Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="keyword-analysis" />
              <Label htmlFor="keyword-analysis">Keyword Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="customer-satisfaction" />
              <Label htmlFor="customer-satisfaction">Customer Satisfaction</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="raw-data" />
              <Label htmlFor="raw-data">Include Raw Data</Label>
            </div>
          </div>
        </div>
      </div> */}

      {/* <Separator /> */}

{/* Filters */}
      {/* <div className="space-y-2">
        <h3 className="text-lg font-medium">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="agent-filter">Agent</Label>
            <Select>
              <SelectTrigger id="agent-filter">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Brown</SelectItem>
                <SelectItem value="jessica">Jessica Lee</SelectItem>
                <SelectItem value="david">David Wilson</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div className="space-y-2">
            <Label htmlFor="department-filter">Department</Label>
            <Select>
              <SelectTrigger id="department-filter">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="customer">Customer Service</SelectItem>
                <SelectItem value="billing">Billing Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="format-filter">Report Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="format-filter">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div> */}

      <Separator />

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Report Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              placeholder="Enter report name"
              defaultValue={`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${new Date().toLocaleDateString()}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-description">Description (Optional)</Label>
            <Input id="report-description" placeholder="Enter report description" />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Save Template
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
    </div>
  )
}

