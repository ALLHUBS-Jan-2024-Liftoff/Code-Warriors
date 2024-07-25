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
import AdminSignIn from './_auth/AdminSignIn';
import AdminSignUp from './_auth/AdminSignUp';
import UserSignIn from './_auth/UserSignIn';
import UserSignUp from './_auth/UserSignUp';


function App() {

  return (
        <Routes>
          <Route element={<RootLayout/>}>
            <Route index element={<Hero />} />
            <Route path='/results' element={<Results />} />
            <Route path='/product' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<Orders />} />
            <Route path='all_products' element={<AllProducts />} />
            <Route path='create_product' element={<CreateProduct />} />
            <Route path='edit_product' element={<EditProduct />} />
            <Route path='analytics' element={<Analytics />} />
          </Route>
          <Route path='admin_sign_in' element={<AdminSignIn />} />
          <Route path='admin_sign_up' element={<AdminSignUp />} />
          <Route path='user_sign_in' element={<UserSignIn />} />
          <Route path='user_sign_up' element={<UserSignUp />} />
        </Routes>
  )
}

export default App
