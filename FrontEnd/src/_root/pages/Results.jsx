import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NavLink } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import SideBar from '@/components/shared/Sidebar'

const ListPage = () => {

const [data, setData] = useState([])

function fetchData() {
  axios.get('http://localhost:8080/product/').then((response) => {
    setData(response.data)
    console.log(response.data)
  })
}

useEffect(() => {
  fetchData();
}, [])

  return (
    <div className='flex w-full'>
      <SideBar />
      <div className='h-full w-full grid grid-cols-5 gap-6 p-4'>
        {data.map(product => (
          <Card key={product.productId} className="w-[250px] h-96">
            <CardContent>
              <img 
                src={product.imageUrl} 
                alt={product.productName} 
                className="w-full h-48 object-contain my-4"
              />
              <p className='text-lg font-medium'>{product.description}</p>
              <p className='text-2xl font-bold'>{product.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <NavLink  to="/product">
                <Button className='w-full h-8'>Add to cart</Button>
              </NavLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    
  )
}

export default ListPage