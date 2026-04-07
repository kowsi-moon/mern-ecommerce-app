import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Input changes-ah handle panna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Backend API endpoint (Unga server URL check pannikonga)
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      
      if (res.data) {
        alert("Account Created Successfully! Log in now.");
        navigate('/login'); // Signup aanathum login page-ku pogum
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-serif font-bold text-[#0E1F1A] text-center mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">Join LUXORA today</p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Full Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#0E1F1A] mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#F9F9F8] border border-gray-200 rounded-md p-3 outline-none focus:border-[#1F3E35]" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1F3E35] text-white py-4 rounded-md font-bold hover:bg-[#162c26] transition-all disabled:bg-gray-400"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-bold text-[#1F3E35] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;