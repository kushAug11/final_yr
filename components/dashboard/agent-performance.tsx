"use client";

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Pie Chart Data (derived from emotion_distribution)
const getSentimentData = (emotion_distribution) => [
  {
    name: "Positive",
    value: emotion_distribution?.positive || 0,
    color: "#22c55e",
  },
  { name: "Neutral", value: emotion_distribution?.neutral || 0, color: "#f59e0b" },
  { name: "Negative", value: emotion_distribution?.negative || 0, color: "#ef4444" },
];

// Bar Chart Data (single agent data)
const getAgentPerformanceData = (data) => {
  if (!data) return [];
  const { average_score, total_calls, average_duration, employee_id } = data;
  return [
    {
      name: employee_id.toString(),
      rating: average_score || 0,
      calls: total_calls || 0,
      duration: average_duration ? `${Math.floor(average_duration / 60)}m ${average_duration % 60}s` : "0m 0s",
    },
  ];
};

export function AgentPerformance({ data, agentName }) {
  const sentimentData = getSentimentData(data?.emotion_distribution);
  const performanceData = getAgentPerformanceData(data);

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Pie Chart for Sentiment Analysis */}
      <Chart className="w-full aspect-square max-h-[300px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height={200}>
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

      {/* Bar Chart for Agent Performance (Single Agent) */}

    </div>
  );
}