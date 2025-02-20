import { createBrowserRouter, Navigate } from 'react-router-dom'; 
import AppLayout from './components/Layout/AppLayout.jsx'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'; 
import Product from './pages/Products';
import Cart from './pages/Cart.jsx';

const router = createBrowserRouter([
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
        }
      ],
    },
   
  ]);
  export {router};