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
        </Routes>
  )
}

export default App
