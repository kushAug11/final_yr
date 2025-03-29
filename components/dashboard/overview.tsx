"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    satisfaction: 4.2,
    sentiment: 68,
  },
  {
    name: "Feb",
    satisfaction: 4.3,
    sentiment: 70,
  },
  {
    name: "Mar",
    satisfaction: 4.1,
    sentiment: 65,
  },
  {
    name: "Apr",
    satisfaction: 4.4,
    sentiment: 72,
  },
  {
    name: "May",
    satisfaction: 4.5,
    sentiment: 75,
  },
  {
    name: "Jun",
    satisfaction: 4.6,
    sentiment: 78,
  },
  {
    name: "Jul",
    satisfaction: 4.7,
    sentiment: 82,
  },
  {
    name: "Aug",
    satisfaction: 4.5,
    sentiment: 76,
  },
  {
    name: "Sep",
    satisfaction: 4.3,
    sentiment: 74,
  },
  {
    name: "Oct",
    satisfaction: 4.4,
    sentiment: 75,
  },
  {
    name: "Nov",
    satisfaction: 4.5,
    sentiment: 78,
  },
  {
    name: "Dec",
    satisfaction: 4.7,
    sentiment: 82,
  },
]

export function Overview() {
  return (
    <Chart className="w-full aspect-[4/3] md:aspect-[2/1]">
      <ChartLegend className="justify-center mb-4">
        <ChartLegendItem name="Satisfaction (1-5)" color="#0ea5e9" />
        <ChartLegendItem name="Positive Sentiment (%)" color="#22c55e" />
      </ChartLegend>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              domain={[0, 5]}
              tickCount={6}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="#888888"
              fontSize={12}
              domain={[0, 100]}
              tickCount={6}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="satisfaction"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.2}
              activeDot={{ r: 6 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="sentiment"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.2}
              activeDot={{ r: 6 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="border-none shadow-md"
                  items={[
                    {
                      label: "Satisfaction",
                      value: (value) => `${value.toFixed(1)}/5`,
                      color: "#0ea5e9",
                    },
                    {
                      label: "Positive Sentiment",
                      value: (value) => `${value}%`,
                      color: "#22c55e",
                    },
                  ]}
                />
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Chart>
  )
}

