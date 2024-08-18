import { CustomBarChart } from '@/components/charts/CustomBarChart'
import { CustomLineChart } from '@/components/charts/CustomLineChart'
import { CustomPieChart } from '@/components/charts/CustomPieChart'
import { CustomRadarChart } from '@/components/charts/CustomRadarChart'
import { InteractiveChart } from '@/components/charts/InteractiveChart'
import { CustomAreaChart } from '@/components/charts/CustomAreaChart'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const Analytics = () => {

    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [areaChartData, setAreaChartData] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/api/order-items/category-chart").then((response) => {
        setPieChartData(response.data);
        console.log(response.data)
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/orders/average-cost-last-7-days").then((response) => {
        setBarChartData(response.data);
        console.log(response.data)
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/orders/revenue/last7days").then((response) => {
        setLineChartData(response.data);
        console.log(response.data)
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:8080/orders/products-sold/last7days").then((response) => {
        setAreaChartData(response.data);
        console.log(response.data)
      });
    }, []);
    
  return (
    <main className="grid lg:grid-cols-2 xl:grid-cols-3 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className='md:col-span-1'>
            <CustomPieChart chartData={pieChartData} />
        </div>
        <div className='cols-span-2 md:col-span-1'>
            <CustomBarChart barChartData={barChartData}/>
        </div>
        <div className='cols-span-2 md:col-span-1'>
            <CustomLineChart lineChartData={lineChartData}/>
        </div>
        <div className='cols-span-2 md:col-span-1'>
            <CustomAreaChart areaChartData={areaChartData}/>
        </div>
        <div className='cols-span-2 md:col-span-2'>
            <InteractiveChart lineChartData={lineChartData} areaChartData={areaChartData}/>
        </div>
    </main>
  )
}

export default Analytics