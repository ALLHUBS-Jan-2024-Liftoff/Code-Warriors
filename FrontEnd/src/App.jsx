import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import RootLayout from './_root/RootLayout'
import ListPage from './_root/pages/ListPage';
import CreatePage from './_root/pages/CreatePage';
import ProductDetails from './_root/pages/ProductDetails';

function App() {

  return (
        <Routes>
          <Route element={<RootLayout/>}>
            <Route index element={<ListPage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/product' element={<ProductDetails />} />
          </Route>
        </Routes>
  )
}

export default App
