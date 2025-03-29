"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const sentimentData = [
  { name: "Positive", value: 72, color: "#22c55e" },
  { name: "Neutral", value: 18, color: "#f59e0b" },
  { name: "Negative", value: 10, color: "#ef4444" },
]

const agentData = [
  {
    name: "Sarah",
    rating: 4.8,
    calls: 156,
  },
  {
    name: "Michael",
    rating: 4.6,
    calls: 142,
  },
  {
    name: "Jessica",
    rating: 4.5,
    calls: 128,
  },
  {
    name: "David",
    rating: 4.3,
    calls: 112,
  },
  {
    name: "Emily",
    rating: 4.2,
    calls: 98,
  },
]

export function AgentPerformance() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Chart className="w-full aspect-square max-h-[300px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="border-none shadow-md"
                    items={[
                      {
                        label: "Sentiment",
                        value: (value) => `${value}%`,
                      },
                    ]}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartLegend className="justify-center mt-4">
          {sentimentData.map((item) => (
            <ChartLegendItem key={item.name} name={item.name} color={item.color} />
          ))}
        </ChartLegend>
      </Chart>

      <Chart className="w-full aspect-[4/3] max-h-[300px] mt-4">
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={agentData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#888888"
                fontSize={12}
                domain={[0, 5]}
                tickCount={6}
              />
              <Bar dataKey="rating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="border-none shadow-md"
                    items={[
                      {
                        label: "Rating",
                        value: (value) => `${value.toFixed(1)}/5`,
                        color: "#3b82f6",
                      },
                      {
                        label: "Calls",
                        value: (value) => `${value}`,
                        color: "#64748b",
                      },
                    ]}
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Chart>
    </div>
  )
}

