import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. STRICT ADMIN LOGIN
    if (email === "admin@luxora.com" && password === "Luxora@2026") {
      const adminData = { 
        name: 'Admin', 
        email: email, 
        isAdmin: true 
      };
      login(adminData, "admin-token-123");
      navigate('/admin/dashboard'); 
      return;
    }

    // 2. NORMAL USER LOGIN (MongoDB)
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (res.data) {
        const userData = {
          ...res.data.user,
          isAdmin: false // Strict identification for normal users
        };
        login(userData, res.data.token);
        navigate('/'); // Redirect to Website Home
      }
    } catch (err) {
      alert("Invalid login credentials for user.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-serif font-bold text-[#0E1F1A] text-center mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-[#1F3E35] text-white py-4 rounded-md font-bold hover:bg-[#162c26] transition-all">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="font-bold text-[#1F3E35] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;