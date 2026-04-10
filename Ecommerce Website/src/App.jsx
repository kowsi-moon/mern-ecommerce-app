import React, { useState, useEffect } from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'; 
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext";
import { Toaster } from 'react-hot-toast';

// Layouts
import StoreLayout from './components/Layouts/StoreLayout';
import AdminLayout from './components/Layouts/AdminLayout';

// Base Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails'; 
import Checkout from './pages/Checkout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';

// Fixed Imports
import Category from './pages/Category';
import Deal from './pages/Deal';          
import About from './pages/About';        
import Profile from './pages/Profile';
import ManageAddress from './pages/ManageAddress';

function App() {
  const [products, setProducts] = useState([]);

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
        {/* Move Toaster here so it works on all pages but doesn't break Routes */}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* --- STOREFRONT ROUTES --- */}
          <Route path="/" element={<StoreLayout><Home products={products} /></StoreLayout>} />
          <Route path="/shop" element={<StoreLayout><Shop products={products} /></StoreLayout>} /> 
          
          <Route path="/category" element={<StoreLayout><Category /></StoreLayout>} />
          <Route path="/deals" element={<StoreLayout><Deal /></StoreLayout>} />
          <Route path="/about" element={<StoreLayout><About /></StoreLayout>} />
          
          <Route path="/profile" element={<StoreLayout><Profile /></StoreLayout>} />
          <Route path="/manage-address" element={<StoreLayout><ManageAddress /></StoreLayout>} />
          
          <Route path="/product/:id" element={<StoreLayout><ProductDetails /></StoreLayout>} /> 
          <Route path="/cart" element={<StoreLayout><Cart /></StoreLayout>} />
          <Route path="/checkout" element={<StoreLayout><Checkout /></StoreLayout>} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- ADMIN PANEL ROUTES --- */}
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><ManageProducts /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;