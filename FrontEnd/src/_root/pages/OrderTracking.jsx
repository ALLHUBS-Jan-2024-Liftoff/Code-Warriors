import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from "@/services/apiClient";
import { useNavigate, useLocation } from 'react-router-dom';

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



const OrderTracking = () => {
    
    const [orderId, setOrderId] = useState('');
    const [orderDetailsList, setOrderDetailsList] = useState([]);    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const { userId } = useParams();
    const navigate = useNavigate();   


    const handleSearchBox =(e) =>{
        setOrderId(e.target.value);
        

    }
   
    const handleSearch = (e) => {

        e.preventDefault();
        
        setLoading(true);
        setError(null);         
        setTimeout(() => {  
            
              
              const matchedOrderDetailsDto = orderDetailsList.find(orderDetailsDto =>
                 orderDetailsDto.orderId === orderId);
             

            if (matchedOrderDetailsDto != null && orderId === matchedOrderDetailsDto.orderId ) {           
              
               navigate(`/order-details/${orderId}`);                 
               setError(null);

            } else {
                
                setError('Order not found. Please check the order ID and try again!.');
            }
            setLoading(false);
        }, 1000); 
    };

    useEffect(()=>{ 
        
        const fetchOrders = async () => {
        try {
          
          const response = await apiClient.get(`orders/trackOrder/${userId}`); 
         
          if(response.data.length > 0){
            setOrderDetailsList(response.data);
          }else{
            setError("No Orders Found");
          }                   
          
        } catch (error) {
          console.error('Error fetching the orders:', error);
        }
      };
  
      fetchOrders();
    }, []);

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div className="container mx-auto p-6">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl text-center font-bold mb-4">Order Tracking</h2>
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex justify-center">
                    <input
                        type="text"                        
                        placeholder="Enter Order ID"
                        value={orderId}
                        onChange={(e) => handleSearchBox(e)}
                        className="border border-gray-300 p-2 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
                    >
                        Track
                    </button>
                </div>
            </form>

            {loading && <div className="text-center text-lg font-bold py-4">Loading...</div>}

            {error && <div className="text-center text-red-500 font-bold py-4">{error}</div>}
           


{orderDetailsList.length > 0 && ( <Tabs defaultValue="all">

        <TabsContent value="all">
        
            <Card className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>All ORDERS</CardTitle>                
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    
                    <TableHead className="font-bold text-black">S.No </TableHead>
                    <TableHead className="font-bold text-black">Order ID</TableHead>                   
                    <TableHead className="font-bold text-black">Order Status</TableHead>
                    <TableHead className="font-bold text-black hidden md:table-cell">Order Items</TableHead>
                    <TableHead className="font-bold text-black hidden md:table-cell">Total Amount</TableHead>
                                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                  
                {orderDetailsList.map((orderDetailsDto,index) => (
                    <TableRow key={index} className="hover:bg-gray-100 cursor-pointer">
                    
                    <TableCell className="font-medium">
                     {index+1}
                    </TableCell>                    

                    <TableCell className="font-medium">
                     {orderDetailsDto.orderId}
                    </TableCell> 
                    <TableCell className="font-medium">
                     {orderDetailsDto.status}
                    </TableCell> 

                    <TableCell className="font-medium hidden md:table-cell">
                        {orderDetailsDto.orderDto.map((order, idx) => (
                            <li key={idx}>                                
                                <span>{order.productName} (x{order.quantity})</span>
                            </li>
                        ))}                  
                
                    </TableCell>
                    
                    <TableCell className="font-medium">
                    {(orderDetailsDto.total).toFixed(2)}
                    </TableCell>
                   
                    </TableRow>
                    
                ))}
                    
                </TableBody>

                </Table>                                                          
                
            </CardContent> 

      </Card>
        </TabsContent>

        </Tabs> )}
        </div>
        </div>
        </main>
    );
};

export default OrderTracking;
