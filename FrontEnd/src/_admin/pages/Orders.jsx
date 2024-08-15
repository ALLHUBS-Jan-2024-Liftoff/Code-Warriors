import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
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
import apiClient from '@/services/apiClient';
import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from "@/components/ui/alert-dialog"


const STATUS_ENUM = ['NEW', 'PROCESSING', 'SHIPPED', 'DELIVERED'];



const Orders = () => {

  const[userOrders,setUserOrders] = useState([]);
  const[orderDetails, setOrderDetails] = useState([]);
  const[orderTrackingId, setOrderTrackingId] =useState([]);  
  const [shippingAddress ,setShippingAddress] = useState([]);
  const [billingAddress ,setBillingAddress] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const[email, setEmail]= useState([]);
  const[phone, setPhone]= useState([]);
  const [selectedRow, setSelectedRow] = useState(null); 
  
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const cardRef1 = useRef();
  const cardRef2 = useRef();

  const exportPDF = (cardRef, filename) => {
    const input = cardRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${filename}.pdf`);
    });
};
const [adminOrderDto, setAdminOrderDto] = useState({
  orderStatus: '',
  workOrderDate: ''    
});

  
  const handleInputChange = (id, field, value) => {
    setAdminOrderDto(prevState => ({
      ...prevState,
      [field]: value
    }));
    setUserOrders(userOrders.map(order =>
      order.orderId === id ? { ...order, [field]: value } : order
    ));
    console.log("userOrser done");
};
  const handleOrderIdClick= (orderId) =>{
    setOrderDetails([]);
    setTotalPrice(0);      
    fetchOrderDetails(orderId);
  };

  const fetchOrderDetails = async(orderId) =>{

    try {     
      const response = await apiClient.get(`orders/track/${orderId}`);    
      
      setOrderDetails(response.data.orderDto);
      setShippingAddress(response.data.addressDto.shippingAddress);
      setBillingAddress(response.data.addressDto.billingAddress);
      setOrderTrackingId(orderId);

      const date = new Date(response.data.orderDate); 
      const formattedDate = date.toLocaleDateString('en-US', options); 
      setOrderDate(formattedDate); 
      setCustomerName(response.data.customerName);       
      setTotalPrice(response.data.total);
      setEmail(response.data.email);
      setPhone(response.data.phone);

    } catch (error) {
      console.error('Error fetching the order details:', error);
    }
  };
 
  const handleUpdate= async(orderId )=>{
    try {
     
      setSelectedRow(orderId);      
      const response = await apiClient.put(`/orders/updateStatus/${orderId}`, adminOrderDto,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUpdateSuccess(orderId); // Set success state to true if update is successful
      } else {
        setUpdateSuccess(null);
      }
        
      } catch (error) {
        console.error('Update failed:', error);
        setUpdateSuccess(null);
      }
      finally {
        setLoading(false);
      }

  };

  

   useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Inside fetch orders");
        const response = await apiClient.get('orders/all');       
         const data = response.data.map(item => {
                    return {
                        ...item,
                        workOrderDate: new Date(item.workOrderDate).toISOString().split('T')[0] // Convert date to YYYY-MM-DD
                    };
                });       
        setUserOrders(data);        
        fetchOrderDetails(response.data[0].orderId);
        
        
      } catch (error) {
        console.error('Error fetching the orders:', error);
      }
    };

    fetchOrders();
  }, []);
  
  return (
    <main className=" grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className=" grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            
            <Tabs defaultValue="week">
              <div className="flex items-center">
               
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                    onClick={() => exportPDF(cardRef1, 'Order_Summary_1')}
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card ref={cardRef1} x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                        <TableHead>Order ID</TableHead>                          
                          <TableHead>Customer</TableHead>                          
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                           Order Date
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                           WorkOrder Date
                          </TableHead>
                          <TableHead >Amount</TableHead>
                          <TableHead >Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {userOrders.map((order,index) => (
                          <TableRow key={index}>

                              <TableCell className="font-medium">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Link onClick = {()=>handleOrderIdClick(order.orderId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    {order.orderId}
                                  </Link>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='rounded-none p-0 border-none max-h-screen overflow-y-scroll'>
                                <div ref={cardRef2}>
                                  <Card 
                                    className="rounded-none overflow-hidden" x-chunk="dashboard-05-chunk-4"
                                  >
                                    <CardHeader  className="flex flex-row items-start bg-muted/50">
                                      <div className="grid gap-0.5">
                                        <CardTitle className="group flex items-center gap-2 text-lg">
                                          Order : {orderTrackingId}
                                          <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                          >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                          </Button>
                                        </CardTitle>
                                        <CardDescription>                  
                                          Date: {orderDate}</CardDescription>
                                      </div>
                                      <div className="ml-auto flex items-center gap-1">
                                      
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                              <MoreVertical className="h-3.5 w-3.5" />
                                              <span className="sr-only">More</span>
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">                      
                                            <DropdownMenuItem onClick={() => exportPDF(cardRef2, 'Order_Details_2')}>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="p-6 text-sm">
                                      <div className="grid gap-3">
                                        <div className="font-semibold">Order Details</div>
                                        <ul className="grid gap-3">
                                          {orderDetails.map((item) => (
                                              <li key={item.orderId} className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                  {item.productName} (x{item.quantity})</span>
                                                <span>${(item.price * item.quantity)}</span>
                                              </li>
                                            ))}                  
                                        </ul>
                                        <Separator className="my-2" />
                                        <ul className="grid gap-3">
                                          
                                          <li className="flex items-center justify-between font-semibold">
                                            <span className="text-muted-foreground">Total</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <Separator className="my-4" />
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                          <div className="font-semibold">Shipping Information</div>
                                          <address className="grid gap-0.5 not-italic text-muted-foreground">
                                            <span>{shippingAddress.fullName}</span>
                                            <span>{shippingAddress.addressLine}</span>
                                            <span>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</span>
                                            <span>{shippingAddress.country}</span>
                                          </address>
                                        </div>
                                        <div className="grid auto-rows-max gap-3">
                                        <div className="font-semibold">Billing Information</div>
                                          <address className="grid gap-0.5 not-italic text-muted-foreground">
                                            <span>{billingAddress.fullName}</span>
                                            <span>{billingAddress.addressLine}</span>
                                            <span>{billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}</span>
                                            <span>{billingAddress.country}</span>
                                          </address>
                                        </div>                  
                                      </div>
                                      <Separator className="my-4" />
                                      <div className="grid gap-3">
                                        <div className="font-semibold">Customer Information</div>
                                        <dl className="grid gap-3">
                                          <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Customer</dt>
                                            <dd>{customerName}</dd>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Email</dt>
                                            <dd>
                                              <a href="mailto:">{email}</a>
                                            </dd>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Phone</dt>
                                            <dd>
                                              <a href="tel:">+1 {phone}</a>
                                            </dd>
                                          </div>
                                        </dl>
                                      </div>
                                      <AlertDialogFooter className='pt-4'>
                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                      </AlertDialogFooter>
                                    </CardContent>
                                  </Card>
                                </div>
                                </AlertDialogContent>
                              </AlertDialog>
                              </TableCell>                    
                              <TableCell className="font-medium">
                              {order.customerName.toUpperCase()}
                              </TableCell>                    

                              <TableCell className="font-medium">                              
                              <select value={order.orderStatus}
                                 onChange={(e) => handleInputChange(order.orderId,'orderStatus', e.target.value)}
                               className="border border-gray-300 rounded px-1 py-1" >               
                                {STATUS_ENUM.map((status) => (
                                   <option key={status} value={status}>
                                       {status}
                                  </option>
                                   ))}
                              </select>
                              </TableCell> 

                              <TableCell className="font-medium">
                              {format(new Date(order.orderDate), 'MM/dd/yyyy')}
                              
                              </TableCell> 
                              <TableCell>
                              <input
                                type="date"
                                className="border rounded-sm sm:text-sm"                                
                                value={order.workOrderDate}
                                onChange={(e) => handleInputChange(order.orderId,'workOrderDate', e.target.value)}
                            />
                            
                             </TableCell> 
                              <TableCell className="font-medium">
                              {Math.round(order.total)}
                              </TableCell> 
                              <TableCell className="font-medium">
                               
                                <Button
                                      onClick={()=>handleUpdate(order.orderId)}
                                      className={`px-2 py-0 rounded text-white font-bold transition-colors duration-300
                                        ${loading && selectedRow === order.orderId ? 'bg-gray-500 cursor-not-allowed' :
                                          updateSuccess === order.orderId ? 'bg-green-500 hover:bg-green-600' :
                                          'bg-black hover:bg-gray-800'}`}
                                      disabled={loading && selectedRow === order.orderId} // Disable button when loading for the selected row
                                    >
                                      {loading && selectedRow === order.orderId? 'Updating...' : 
                                       updateSuccess === order.orderId ? 'Success!' : 
                                       'Update'}
                                    </Button>                                
                                </TableCell>                 

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
        </main>
  )
}

export default Orders

