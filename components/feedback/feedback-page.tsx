"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { RecentFeedback } from "@/components/dashboard/recent-feedback"
import { FeedbackAnalysis } from "@/components/feedback/feedback-analysis"
import { FeedbackFilters } from "@/components/feedback/feedback-filters"


export function FeedbackPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showFilters, setShowFilters] = useState(false)

  const handleGenerateReport = () => {
    // In a real app, this would trigger a report generation
    alert(`Generating feedback report...`)
  }

  //This is the main page for the feedback section

  // the other pages are child of this page

  // useEffect to give a backend call to all call which employee etc

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          {/* Change name to analysis  */}
          <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
          <div className="flex items-center gap-2">
            {/* this has no utility to us so we have to remove it */}
            {/* <DateRangePicker date={date} setDate={setDate} /> */}
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleGenerateReport}>
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle>Feedback Filters</CardTitle>
              <CardDescription>Filter feedback by various criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackFilters />
            </CardContent>
          </Card>
        )}

        {/* This is the feedback tab  have to discuss whether to keep this or remove this 
        
            - if we want to keep this  can use a filter function*/}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Feedback</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Feedback</CardTitle>
                <CardDescription>View and manage all customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentFeedback />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="positive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positive Feedback</CardTitle>
                <CardDescription>Feedback with positive sentiment or high ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentFeedback />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="neutral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Neutral Feedback</CardTitle>
                <CardDescription>Feedback with neutral sentiment or average ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentFeedback />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="negative" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Negative Feedback</CardTitle>
                <CardDescription>Feedback with negative sentiment or low ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentFeedback />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Analysis</CardTitle>
                <CardDescription>Insights and trends from customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackAnalysis />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

