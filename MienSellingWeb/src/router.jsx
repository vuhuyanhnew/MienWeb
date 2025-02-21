import { createBrowserRouter, Navigate, createHashRouter } from 'react-router-dom'; 
import AppLayout from './components/Layout/AppLayout.jsx'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'; 
import Product from './pages/Products';
import Cart from './pages/Cart.jsx';
import Contact from './pages/Contact.jsx';
import Checkout from './pages/Checkout.jsx';
const router = createHashRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true, 
          element: <Navigate to="/home" replace />
        },
        {
          path: 'home',
          element: <HomePage />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'product/:id',  
          element: <ProductDetail />
        },
        {
          path: 'cart',  
          element: <Cart />
        },
        {
          path: 'contact',  
          element: <Contact />
        },
        {
          path: 'checkout',   
          element: <Checkout />
        }
      ],
    }, {basename: '/'}
   
  ]);
  export {router};