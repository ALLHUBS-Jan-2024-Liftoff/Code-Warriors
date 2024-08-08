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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useParams } from 'react-router-dom'


const ListPage = () => {

const { searchTerm } = useParams();

const navigate = useNavigate();

function goToProductDetails(productId) {
  navigate(`/product/${productId}`)
}

let { user } = useContext(AuthContext)

const [data, setData] = useState([])
const [quantities, setQuantities] = useState({})

const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

function handleAddToCart(product , quantity) {
  if(user) {
    addToCart(product, quantity)
    
  } else {
    localStorage.setItem('pendingCartItem', JSON.stringify({ product, quantity }));
    navigate('/user_auth')
  }
}
function fetchData() {
  axios.post('http://localhost:8080/product/search', {keyword: searchTerm}).then((response) => {
    setData(response.data)
    console.log(response.data)
  })
}

useEffect(() => {
  fetchData();
}, [])


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
    <div className='flex flex-col items-center w-full'>
      <div className='w-full h-14 flex items-center pl-6'>
        <h1 className='text-xl font-semibold'><span className='text-muted-foreground'>Search results for </span>"{searchTerm}"</h1>
      </div>
      <div className='flex w-full'>
        <SideBar />
        <div className='h-full w-full grid grid-cols-3 gap-6 p-4 pt-0'>
          {data.map(product => (
            <Card key={product.productId} className="h-[62vh] flex flex-col rounded-xs">
              <CardContent className='pb-2'>
                <img 
                  src={product.imageUrl} 
                  alt={product.productName} 
                  className="w-full h-56 object-contain my-4"
                />
                <p className='text-xl font-semibold'>{product.productName}</p>
                <p className='text-lg font-semibold'>${product.price}</p>
                <div key={product.productId} style={{ marginBottom: '1rem' }}>
                  <Select onChange={(e) => handleChange(product.productId, e)}>
                    <SelectTrigger className="w-[120px] ml-auto">
                      <SelectValue placeholder="Quantity: 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {quantityOptions.map(quantity => (
                        <SelectItem key={quantity} value={quantity}>{quantity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>                 
              </CardContent>
              <Button className='mb-2 w-3/4 mx-auto h-8' onClick = {() => handleAddToCart(product , quantities[product.productId] )}>Add to cart</Button>
              <Button variant="secondary" className='border border-2 mb-2 w-3/4 mx-auto h-8' onClick={() => goToProductDetails(product.productId)}>View item</Button>
            </Card>
          ))}
          
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    
  )
}

export default ListPage