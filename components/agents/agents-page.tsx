"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentsList } from "@/components/agents/agents-list"
import { AgentPerformance } from "@/components/dashboard/agent-performance"
import { AgentFeedbackHistory } from "@/components/agents/agent-feedback-history"
import { DateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function AgentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const handleGenerateReport = () => {
    // In a real app, this would trigger a report generation
    alert(`Generating agent performance report...`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <div className="flex items-center gap-2">
            <DateRangePicker date={date} setDate={setDate} />
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleGenerateReport}>
              <Download className="h-3.5 w-3.5" />
              <span>Export Report</span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Add Agent</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>Enter the details of the new agent to add them to the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Agent name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" placeholder="agent@example.com" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Input id="department" placeholder="Department" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Agent</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Agent Directory</CardTitle>
              <CardDescription>Select an agent to view their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <AgentsList onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>
                {selectedAgent
                  ? `Performance metrics for ${selectedAgent}`
                  : "Select an agent to view their performance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedAgent ? (
                <Tabs defaultValue="metrics" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4.6/5</div>
                          <p className="text-xs text-muted-foreground">+0.3 from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">142</div>
                          <p className="text-xs text-muted-foreground">+12 from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">6m 18s</div>
                          <p className="text-xs text-muted-foreground">-45s from last month</p>
                        </CardContent>
                      </Card>
                    </div>
                    <AgentPerformance />
                  </TabsContent>
                  <TabsContent value="feedback">
                    <AgentFeedbackHistory agentName={selectedAgent} />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Select an agent from the list to view their performance details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

