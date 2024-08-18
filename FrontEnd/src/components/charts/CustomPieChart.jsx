"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { useEffect } from "react"
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
  productsBought: {
    label: "Products Bought",
  },
  Laptops: {
    label: "Laptops",
    color: "hsl(var(--chart-1))",
  },
  Phones: {
    label: "Phones",
    color: "hsl(var(--chart-2))",
  },
  Cameras: {
    label: "Cameras",
    color: "hsl(var(--chart-3))",
  },
  Computers: {
    label: "Computers",
    color: "hsl(var(--chart-4))",
  },
  Headphones: {
    label: "Headphones",
    color: "hsl(var(--chart-5))",
  },
  TVs: {
    label: "TVs",
    color: "hsl(var(--chart-6))",
  },
  Accessories: {
    label: "Accessories",
    color: "hsl(var(--chart-7))",
  },
};

export function CustomPieChart({chartData}) {

  const data = Object.keys(chartData).map((category) => ({
    category,
    productsBought: chartData[category],
    fill: chartConfig[category]?.color || "gray",
  }));

  const totalVisitors = data.reduce((acc, data) => acc + data.productsBought, 0);

  return (
    <Card className="flex flex-col h-96">
      <CardHeader className="items-center pb-0">
        <CardTitle>Purchases by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="productsBought"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Purchases
                        </tspan>
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
