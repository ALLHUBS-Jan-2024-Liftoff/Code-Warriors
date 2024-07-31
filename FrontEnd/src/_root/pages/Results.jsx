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
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {

const navigate = useNavigate();

let { user } = useContext(AuthContext)

const [data, setData] = useState([])
const [quantities, setQuantities] = useState({})

const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

function handleAddToCart(product , quantity) {
  if(user) {
    addToCart(product, quantity)
    navigate('/cart')
  } else {
    localStorage.setItem('pendingCartItem', JSON.stringify({ product, quantity }));
    navigate('/user_auth')
  }
}


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

useEffect(() => {
  if (data.length > 0) {
    setQuantities(
      data.reduce((acc, product) => {
        acc[product.productId] = 1; // Initial quantity for each product
        return acc;
      }, {})
    );
  }
}, [data]);

  return (
    <div className='flex w-full'>
      <SideBar />
      <div className='h-full w-full grid grid-cols-4 gap-6 p-4'>
        {data.map(product => (
          <Card key={product.productId} className="h-96 flex flex-col">
            <CardContent>
              <img 
                src={product.imageUrl} 
                alt={product.productName} 
                className="w-full h-24 object-contain my-4"
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
            <Button className='mt-auto mb-4 w-3/4 mx-auto h-8' onClick = {() => handleAddToCart(product , quantities[product.productId] )}>Add to cart</Button>
          </Card>
        ))}
      </div>
    </div>
    
  )
}

export default ListPage