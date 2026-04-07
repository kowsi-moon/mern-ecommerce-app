import React, { useState, useEffect } from 'react'; // 
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; //
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext";

// Layouts & Pages
import StoreLayout from './components/Layouts/StoreLayout';
import AdminLayout from './components/Layouts/AdminLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails'; 
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Checkout from './pages/Checkout';

function App() {
  // --- 1. STATE DEFINITION ---
  const [products, setProducts] = useState([]);

  // --- 2. FETCH PRODUCTS FROM BACKEND ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* --- STOREFRONT ROUTES --- */}
          <Route path="/" element={<StoreLayout><Home products={products} /></StoreLayout>} />
          
          {/*  Pass products to Shop page */}
          <Route path="/shop" element={<StoreLayout><Shop products={products} /></StoreLayout>} /> 
          
          <Route path="/product/:id" element={<StoreLayout><ProductDetails /></StoreLayout>} /> 
          <Route path="/cart" element={<StoreLayout><Cart /></StoreLayout>} />
          <Route path="/checkout" element={<StoreLayout><Checkout /></StoreLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---  ADMIN PANEL ROUTES --- */}
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;