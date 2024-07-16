import { CustomBarChart } from '@/components/charts/CustomBarChart'
import { CustomLineChart } from '@/components/charts/CustomLineChart'
import { CustomPieChart } from '@/components/charts/CustomPieChart'
import { CustomRadarChart } from '@/components/charts/CustomRadarChart'
import { InteractiveChart } from '@/components/charts/InteractiveChart'
import React from 'react'

const Analytics = () => {
    
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className='col-span-1'>
            <CustomPieChart />
        </div>
        <div className='col-span-2'>
            <InteractiveChart />
        </div>
        <div className='col-span-1'>
            <CustomBarChart />
        </div>
        <div className='col-span-1'>
            <CustomRadarChart />
        </div>
        <div className='col-span-1'>
            <CustomLineChart />
        </div>
    </main>
  )
}

export default Analytics