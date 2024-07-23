import React from 'react'
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

  // Sample product data
const products = [
  {
    id: 1,
    name: 'Mac Book',
    imageUrl: 'https://i5.walmartimages.com/asr/7fc4c11c-6d65-4240-b390-ab776fb82171.15567f6644e83dc7597c024523be4264.jpeg',
    price: '$999.99',
  },
  {
    id: 2,
    name: 'iPhone',
    imageUrl: 'https://th.bing.com/th/id/OIP.VVI4zwfN-uw7qvq8o_DY3wAAAA?rs=1&pid=ImgDetMain',
    price: '$499.99',
  },
  {
    id: 3,
    name: 'AirPods',
    imageUrl: 'https://cdn.macrumors.com/article-new/2019/10/airpodsprodesigncase.jpg?retina',
    price: '$199.99',
  },
  {
    id: 1,
    name: 'AirPods Max',
    imageUrl: 'https://th.bing.com/th/id/OIP.SOKCpzEwAjedh7QdXcvQ6AAAAA?rs=1&pid=ImgDetMain',
    price: '$999.99',
  },
  {
    id: 2,
    name: 'Desktop',
    imageUrl: 'https://i5.walmartimages.com/asr/e5577ed9-bbb3-405b-8ae2-7adab5ecd608_1.8554861ff8b294cc2b1038b59c950879.jpeg',
    price: '$499.99',
  },
  {
    id: 3,
    name: 'Headphones',
    imageUrl: 'https://via.placeholder.com/250',
    price: '$199.99',
  },
  {
    id: 2,
    name: 'Phone',
    imageUrl: 'https://via.placeholder.com/250',
    price: '$499.99',
  },
  {
    id: 3,
    name: 'Headphones',
    imageUrl: 'https://via.placeholder.com/250',
    price: '$199.99',
  },
  {
    id: 2,
    name: 'Phone',
    imageUrl: 'https://via.placeholder.com/250',
    price: '$499.99',
  },
  {
    id: 3,
    name: 'Headphones',
    imageUrl: 'https://via.placeholder.com/250',
    price: '$199.99',
  },
];


const [data, setData] = useState([])

function fetchData() {
  axios.get('http://localhost:8080/product/').then((response) => {
    setData(response.data)
    console.log(response.data)
  })
}


  return (
    <div className='flex'>
      <SideBar />
      <div className='h-full w-full grid grid-cols-5 gap-6 p-4'>
        {products.map(product => (
          <Card key={product.id} className="w-[250px] h-96">
            <CardContent>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-contain my-4"
              />
              <p className='text-lg font-medium'>{product.name}</p>
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