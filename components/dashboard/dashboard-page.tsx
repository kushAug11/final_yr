"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentFeedback } from "@/components/dashboard/recent-feedback"
import { AgentPerformance } from "@/components/dashboard/agent-performance"
import { DateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useTheme } from "next-themes"

export function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { theme } = useTheme()

  const handleGenerateReport = (period: "weekly" | "monthly") => {
    // In a real app, this would trigger a report generation
    alert(`Generating ${period} report...`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <DateRangePicker date={date} setDate={setDate} />
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => handleGenerateReport("weekly")}>
              <Download className="h-3.5 w-3.5" />
              <span>Weekly Report</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => handleGenerateReport("monthly")}>
              <Download className="h-3.5 w-3.5" />
              <span>Monthly Report</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.3/5</div>
                  <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72%</div>
                  <p className="text-xs text-muted-foreground">+4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8m 42s</div>
                  <p className="text-xs text-muted-foreground">-30s from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Feedback Overview</CardTitle>
                  <CardDescription>Customer satisfaction and sentiment trends over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                  <CardDescription>Breakdown of customer sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <AgentPerformance />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Compare performance metrics across all agents</CardDescription>
              </CardHeader>
              <CardContent>
                <AgentPerformance />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest customer feedback and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentFeedback />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

