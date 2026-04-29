import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit, FiTrash2, FiX, FiUpload } from 'react-icons/fi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'Sports', price: '', stock: '', 
    description: '', imageUrl: '', isBestSeller: false
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products ({products.length})</h1>
        <button 
          onClick={() => { 
            setEditingId(null); 
            setFormData({name:'', category:'Sports', price:'', stock:'', description:'', imageUrl:'', isBestSeller:false}); 
            setShowModal(true); 
          }}
          className="w-full sm:w-auto bg-[#2d5a4d] text-white px-6 py-3 rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-emerald-100"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 uppercase text-xs font-bold text-gray-400">Product</th>
              <th className="p-4 uppercase text-xs font-bold text-gray-400">Category</th>
              <th className="p-4 uppercase text-xs font-bold text-gray-400">Price</th>
              <th className="p-4 uppercase text-xs font-bold text-gray-400">Stock</th>
              <th className="p-4 text-center uppercase text-xs font-bold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.imageUrl} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" alt="" />
                  <span className="font-semibold text-gray-700 truncate max-w-[150px]">{p.name}</span>
                </td>
                <td className="p-4 text-gray-500">{p.category}</td>
                <td className="p-4 font-bold text-gray-800">₹{p.price}</td>
                <td className="p-4 text-gray-600">{p.stock}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-1">
                    <button 
                      onClick={() => { setEditingId(p._id); setFormData(p); setShowModal(true); }} 
                      className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                    >
                      <FiEdit />
                    </button>

                    {/*  FIXED DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                    >
                      <FiTrash2 />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal unchanged */}
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full sm:w-[500px] h-full shadow-2xl p-6 md:p-8 overflow-y-auto rounded-none sm:rounded-l-[30px]">
            {/* (rest unchanged) */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;