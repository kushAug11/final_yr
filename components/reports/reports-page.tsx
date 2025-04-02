"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { FileText, BarChart, PieChart, TrendingUp, Users } from "lucide-react"
import { ReportGenerator } from "@/components/reports/report-generator"
import { SavedReports } from "@/components/reports/saved-reports"

export function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <div className="flex items-center gap-2">
            <DateRangePicker date={date} setDate={setDate} />
          </div>
        </div>

        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
            {/* <TabsTrigger value="saved">Saved Reports</TabsTrigger> */}
          </TabsList>
          <TabsContent value="generate" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* AgentPerformance */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agent Performance</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Detailed performance metrics for all agents or individual agents.</div>
                </CardContent>
               <CardFooter>
                  {/* <Button className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate
                  </Button> */}
                </CardFooter>
              </Card>

{/* FeedBack Summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Feedback Summary</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Summary of all feedback with sentiment analysis and ratings.</div>
                </CardContent>
                <CardFooter>
                  {/* <Button className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate
                  </Button> */}
                </CardFooter>
              </Card>

{/* Sentiment Trends */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentiment Trends</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Analysis of sentiment trends over time with key insights.</div>
                </CardContent>
                <CardFooter>
                  {/* <Button className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate
                  </Button> */}
                </CardFooter>
              </Card>

{/* Call Analytics */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Call Analytics</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Detailed analysis of call durations, volumes, and outcomes.</div>
                </CardContent>
                <CardFooter>
                  {/* <Button className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate
                  </Button> */}
                </CardFooter>
              </Card>
            </div>

{/* Report generator */}
            <Card>
              <CardHeader>
                <CardTitle>Report Generator</CardTitle>
                <CardDescription>Create a  report by selecting the data you want to include</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportGenerator />
              </CardContent>
            </Card>

          </TabsContent>
          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Access your previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <SavedReports />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

