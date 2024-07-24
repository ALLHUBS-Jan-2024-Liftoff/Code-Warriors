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
  
   
  const handleMinus = (index) => {
    
    const newProducts = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          quantity: (product.quantity) - 1
        };
      }
      return product;
    });
    
    setProducts(newProducts);
  };
  
  const handlePlus = (index) => {
    
    const newProducts = products.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          quantity: (product.quantity) + 1
        };
      }
      return product;
    });
    
    setProducts(newProducts);
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/product/del/${productId}`);
      setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
    } catch (error) {
      console.error('Error deleting the products:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cart/1');
        
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };

    fetchProducts();
  }, []);

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
                    <TableHead>Select</TableHead>
                    <TableHead>Product No </TableHead>
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
                      <td>
                      <input type="checkbox" />
                    </td>                  
                    
                    </TableCell>

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
                          
                      <Button onClick={() => handleMinus(index)}>-</Button>
                             
                      <Input type="text" name="quantity" value={item.quantity} />
                       
                      <Button onClick={() => handlePlus(index)}>+</Button>                                     
                          
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                    {item.quantity * item.price}
                    </TableCell>

                    <TableCell>
                       <Button>Delete</Button>                                     
                    </TableCell>
                   
                    </TableRow>
                    
                ))}
                    
                </TableBody>

                </Table>     
               
                                                            
                
            </CardContent>    
            
            
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