import React, {useState, useEffect, useContext} from 'react'
import { CartContext } from "@/components/shared/CartContext"

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
const [quantities, setQuantities] = useState(
  data.reduce((acc, product) => {
    acc[product.productId] = 1; // Initial quantity for each product
    return acc;
  }, {})
);
const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

function fetchData() {
  axios.get('http://localhost:8080/product/').then((response) => {
    setData(response.data)
    console.log(response.data)
  })
}

const handleChange = (productId, event) => {
  setQuantities(prevQuantities => ({
    ...prevQuantities,
    [productId]: parseInt(event.target.value, 10),
  }));
};

const { addToCart } = useContext(CartContext);


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
              <p className='text-xl font-bold'>Price: {product.price}</p>
              <div key={product.productId} style={{ marginBottom: '1rem' }}>
              <label htmlFor={`quantity-${product.productId}`}>Quantity:</label>
                  <select
                    id={`quantity-${product.productId}`}
                    value={quantities[product.productId]}
                    onChange={(e) => handleChange(product.productId, e)}>
                    {quantityOptions.map(quantity => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                <p>Selected Quantity: {quantities[product.productId]}</p>
              </div>                 
            </CardContent>
            <CardFooter className="flex justify-between">
              
                <Button className='w-full h-6' onClick = {() => addToCart(product , quantities[product.productId] )}>Add to cart</Button>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    
  )
}

export default ListPage