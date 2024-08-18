"use client"

import { useMemo } from 'react'

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-3))",
  },
}

export function CustomLineChart({ lineChartData }) {
  const processedData = useMemo(() => {
    const today = new Date()
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const dataMap = new Map(lineChartData.map(item => [item.orderDate, item.totalRevenue]))

    return last7Days.map(date => ({
      date,
      totalRevenue: dataMap.has(date) ? Number(dataMap.get(date).toFixed(2)) : 0,
    }))
  }, [lineChartData])

  return (
    <Card className='h-96'>
      <CardHeader>
        <CardTitle>Revenue</CardTitle>
        <CardDescription>Past 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="totalRevenue"
              type="monotone"
              stroke="var(--color-totalRevenue)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalRevenue)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
