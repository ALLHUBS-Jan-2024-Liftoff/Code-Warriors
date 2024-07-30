import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Cart = () => {

  const [products, setProducts] = useState([]);
  const[cartTotal, setCartTotal] = useState(0.0);
  const [updateDone, setUpdateDone] = useState(false);   
  
  const handleMinus = (productId) => {
    
    const newProducts = products.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
    
    setProducts(newProducts);
    const updatedItem = newProducts.find(item => item.productId === productId);
    updateQuantity(updatedItem.productId,updatedItem.quantity );
  };
  
  const handlePlus = (productId) => {
    
    const newProducts = products.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    
    setProducts(newProducts);
    const updatedItem = newProducts.find(item => item.productId === productId);
    updateQuantity(updatedItem.productId,updatedItem.quantity );

  };



  const deleteProduct = async (productId) => {
    try {        
        const [response1, response2] = await Promise.all([
        axios.delete(`http://localhost:8080/cart/delete/${productId}`, {
          headers: {
            'userId': 1
          }       
        }), 
        axios.get('http://localhost:8080/cart/total/1'),  
      ]);     
      setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
      setCartTotal(response2.data);     
      setUpdateDone(prev => !prev);

    } catch (error) {
      console.error('Error deleting the products:', error);
    }
  };

    
 const updateQuantity = async (productId,quantityToUpdate) => {
      try{
            const [response1, response2] = await Promise.all([
            axios.put(`http://localhost:8080/cart/updateQuantity/${productId}`,{
              'userId': 1,
              'quantity': quantityToUpdate  
            },{ 
              headers:{
                'userId': 1,
                'quantity': quantityToUpdate  
              }                         
            }), 
            axios.get('http://localhost:8080/cart/total/1'), 
          ]);        
        
          setCartTotal(response2.data);
          setUpdateDone(prev => !prev);
              
      } catch (error) {
        console.error('Error updating the products:', error);
      }

 };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://localhost:8080/cart/1'),  // Replace with your first API URL
          axios.get('http://localhost:8080/cart/total/1'),  // Replace with your second API URL
        ]);
       
        setProducts(response1.data); 
        setCartTotal(response2.data); 
        
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, [updateDone]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
        
        <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>CART SUMMARY</CardTitle>                
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    
                    <TableHead>S.No </TableHead>
                    <TableHead>Product Name</TableHead>                   
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Quantity</TableHead>
                    <TableHead className="hidden md:table-cell">Sub Total</TableHead>
                    
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  
                {products.map((item,index) => (
                    <TableRow  className="hover:bg-gray-100 cursor-pointer">
                    
                    <TableCell className="font-medium">
                     {index+1}
                    </TableCell>                    

                    <TableCell className="font-medium">
                     {item.productName}
                    </TableCell> 
                    <TableCell className="font-medium">
                     {item.price}
                    </TableCell> 

                    <TableCell className="hidden md:table-cell">                      
                          
                    <div class="flex flex-row h-10 w-20 rounded-lg relative bg-transparent mt-1">

                       <Button onClick={() => handleMinus(item.productId)} 
                       class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                         −
                       </Button>
                      <Input type="number" class="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-800  outline-none" 
                      name="quantity" 
                       value={item.quantity} ></Input>
                        <Button onClick={() => handlePlus(item.productId)} class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                         +
                         </Button>   
                    </div>                                 
                          
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                    {item.quantity * item.price}
                    </TableCell>

                    <TableCell>
                       <Button onClick={() => deleteProduct(item.productId)}>Delete</Button>                                     
                    </TableCell>
                   
                    </TableRow>
                    
                ))}
                    
                </TableBody>

                </Table>     
               
                                                            
                
            </CardContent> 

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-center font-medium text-gray-900" >
                    <p>Total : ${cartTotal}</p>                   
                  </div>
                  <p className="flex items-center justify-center mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#" 
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Proceed To Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{'  '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
            
            
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
                </div>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </main>
  )

  
}



export default Cart