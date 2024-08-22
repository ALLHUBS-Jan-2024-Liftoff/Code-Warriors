import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import RootLayout from './_root/RootLayout'
import AdminLayout from './_admin/AdminLayout'
import Results from './_root/pages/Results';
import Product from './_root/pages/Product';
import Orders from './_admin/pages/Orders'
import AllProducts from './_admin/pages/AllProducts'
import ProductDetails from './_admin/pages/ProductDetails'
import Analytics from './_admin/pages/Analytics'
import Cart from './_root/pages/Cart';
import Hero from './_root/pages/Hero';
import CreateProduct from './_admin/pages/CreateProduct';
import EditProduct from './_admin/pages/EditProduct';
import UserAuthPage from './_auth/UserAuthPage';
import AdminAuthPage from './_auth/AdminAuthPage';
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import UserPrivateRoute from './utils/UserPrivateRoute';
import OrderSummary from './_root/pages/OrderSummary';
import OrderConfirmation from './_root/pages/OrderConfirmation';
import OrderDetails from './_root/pages/OrderDetails';
import OrderTracking from './_root/pages/OrderTracking';
import GenerativeAIChatbot from './components/chat/GenerativeAIChatbot';

function App() {

  return (
        <Routes>
          <Route element={<RootLayout/>}>
            <Route index element={<Hero />} />
            <Route path='/results/:searchTerm' element={<Results />} />
            <Route path='/product/:productId' element={<Product />} />
            
            <Route element={<UserPrivateRoute />}>
              <Route path='/cart' element={<Cart />} />    
                       
              <Route path='/orderSummary/:orderId' element={<OrderSummary/>}/>
              
              <Route path='/order-confirmation/:orderId' element={<OrderConfirmation/>} />
              <Route path='/order-details/:orderTrackingId' element={<OrderDetails/>} />
              <Route path='/order-tracking/:userId' element={<OrderTracking/>}/>
              <Route path='/generativeAIChatbot' element ={<GenerativeAIChatbot/>}/>
            </Route>
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/admin' element={<AdminLayout/>}>
              <Route index element={<Orders />} />
              <Route path='all_products' element={<AllProducts />} />
              <Route path='create_product' element={<CreateProduct />} />
              <Route path='edit_product' element={<EditProduct />} />
              <Route path='analytics' element={<Analytics />} />
            </Route>
          </Route>
          <Route path='admin_auth' element={<AdminAuthPage />} />
          <Route path='user_auth' element={<UserAuthPage />} />
        </Routes>
  )
}

export default App
