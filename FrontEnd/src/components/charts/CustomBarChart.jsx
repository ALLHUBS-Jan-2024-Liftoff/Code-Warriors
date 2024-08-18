"use client"

import { useMemo } from 'react';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  averageCost: {
    label: "Average Cost",
    color: "hsl(var(--chart-1))",
  },
};

export function CustomBarChart({ barChartData }) {
  const processedData = useMemo(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dataMap = new Map(barChartData.map(item => [item.orderDate, item.averageCost]));

    return last7Days.map(date => ({
      date,
      averageCost: dataMap.has(date) ? Number(dataMap.get(date).toFixed(2)) : 0,
    }));
  }, [barChartData]);

  return (
    <Card className='h-96'>
      <CardHeader>
        <CardTitle>Average Order Cost</CardTitle>
        <CardDescription>Past 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={processedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="averageCost" fill="var(--color-averageCost)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}