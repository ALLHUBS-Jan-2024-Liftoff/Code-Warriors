"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  totalQuantity: {
    label: "Total Products Sold",
    color: "hsl(var(--chart-6))",
  },
  totalRevenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-1))",
  },
}

export function InteractiveChart({ areaChartData, lineChartData }) {
  const processedData = React.useMemo(() => {
    const today = new Date()
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const quantityMap = new Map(areaChartData.map(item => [item.orderDate, item.totalQuantity]))
    const revenueMap = new Map(lineChartData.map(item => [item.orderDate, item.totalRevenue]))

    return last7Days.map(date => ({
      date,
      totalQuantity: quantityMap.has(date) ? quantityMap.get(date) : 0,
      totalRevenue: revenueMap.has(date) ? Number(revenueMap.get(date).toFixed(2)) : 0,
    }))
  }, [areaChartData, lineChartData])

  return (
    <Card className='h-96'>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Revenue - Products sold</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={processedData}>
            <defs>
              <linearGradient id="fillQuantity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalQuantity)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalQuantity)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalRevenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalRevenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              yAxisId="left"
              dataKey="totalQuantity"
              type="monotone"
              fill="var(--color-totalQuantity)"
              stroke="var(--color-totalQuantity)"
            />
            <Area
              yAxisId="right"
              dataKey="totalRevenue"
              type="monotone"
              fill="var(--color-totalRevenue)"
              stroke="var(--color-totalRevenue)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}