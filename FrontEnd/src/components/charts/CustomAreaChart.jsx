"use client"

import { useMemo } from 'react'

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    totalQuantity: {
      label: "Total Quantity",
      color: "hsl(var(--chart-2))",
    },
  }

export function CustomAreaChart({ areaChartData }) {
    const processedData = useMemo(() => {
      const today = new Date()
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        return date.toISOString().split('T')[0]
      }).reverse()
  
      const dataMap = new Map(areaChartData.map(item => [item.orderDate, item.totalQuantity]))
  
      return last7Days.map(date => ({
        date,
        totalQuantity: dataMap.has(date) ? dataMap.get(date) : 0,
      }))
    }, [areaChartData])
  
    return (
      <Card className='h-96'>
        <CardHeader>
          <CardTitle>Total Quantity</CardTitle>
          <CardDescription>
            Showing total quantity for the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
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
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="totalQuantity"
                type="monotone"
                fill="var(--color-totalQuantity)"
                fillOpacity={0.4}
                stroke="var(--color-totalQuantity)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  }
