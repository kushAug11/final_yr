"use client"

import { Chart, ChartContainer } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sentimentTrendData = [
  {
    date: "Week 1",
    positive: 65,
    neutral: 25,
    negative: 10,
  },
  {
    date: "Week 2",
    positive: 68,
    neutral: 22,
    negative: 10,
  },
  {
    date: "Week 3",
    positive: 70,
    neutral: 20,
    negative: 10,
  },
  {
    date: "Week 4",
    positive: 72,
    neutral: 18,
    negative: 10,
  },
  {
    date: "Week 5",
    positive: 75,
    neutral: 15,
    negative: 10,
  },
  {
    date: "Week 6",
    positive: 78,
    neutral: 14,
    negative: 8,
  },
  {
    date: "Week 7",
    positive: 80,
    neutral: 12,
    negative: 8,
  },
  {
    date: "Week 8",
    positive: 82,
    neutral: 10,
    negative: 8,
  },
]

const ratingDistributionData = [
  {
    rating: "1 Star",
    count: 15,
  },
  {
    rating: "2 Stars",
    count: 30,
  },
  {
    rating: "3 Stars",
    count: 120,
  },
  {
    rating: "4 Stars",
    count: 450,
  },
  {
    rating: "5 Stars",
    count: 670,
  },
]

const commonKeywordsData = [
  {
    keyword: "Helpful",
    count: 245,
  },
  {
    keyword: "Quick",
    count: 210,
  },
  {
    keyword: "Professional",
    count: 180,
  },
  {
    keyword: "Knowledgeable",
    count: 165,
  },
  {
    keyword: "Friendly",
    count: 150,
  },
  {
    keyword: "Resolved",
    count: 140,
  },
  {
    keyword: "Wait time",
    count: 95,
  },
  {
    keyword: "Frustrating",
    count: 75,
  },
]

export function FeedbackAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trend</CardTitle>
            <CardDescription>Sentiment distribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart className="w-full aspect-[4/3]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={sentimentTrendData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="#22c55e" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="neutral" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Distribution of customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart className="w-full aspect-[4/3]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={ratingDistributionData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Keywords</CardTitle>
          <CardDescription>Most frequently mentioned keywords in feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart className="w-full aspect-[5/1]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={commonKeywordsData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="keyword" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </CardContent>
      </Card>
    </div>
  )
}

