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

      {/* Added horizontal scroll container for mobile responsiveness */}
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
                    <button onClick={() => { setEditingId(p._id); setFormData(p); setShowModal(true); }} className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"><FiEdit /></button>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded-full"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-white w-full sm:w-[500px] h-full shadow-2xl p-6 md:p-8 overflow-y-auto rounded-none sm:rounded-l-[30px] animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8 border-b pb-5">
              <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:text-black transition-all"><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pb-24">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
                <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#2d5a4d] transition-all" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Books">Books</option>
                  <option value="Sports">Sports</option>
                  <option value="Toys">Toys</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Price (₹)</label>
                  <input type="number" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Stock Count</label>
                  <input type="number" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <input 
                  type="checkbox" 
                  id="bestSeller" 
                  className="w-5 h-5 accent-[#2d5a4d] cursor-pointer" 
                  checked={formData.isBestSeller} 
                  onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})} 
                />
                <label htmlFor="bestSeller" className="text-sm font-bold text-emerald-900 cursor-pointer">Mark as Best Seller</label>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Product Image</label>
                <div className="group border-2 border-dashed border-gray-200 rounded-[30px] p-6 bg-gray-50 text-center relative hover:bg-gray-100 hover:border-[#2d5a4d] transition-all cursor-pointer">
                  {formData.imageUrl ? (
                    <div className="relative inline-block">
                      <img src={formData.imageUrl} className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-2xl" alt="Preview" />
                      <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-xl hover:scale-110 transition-transform"><FiX size={12} /></button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform"><FiUpload size={24} className="text-[#2d5a4d]" /></div>
                      <p className="text-sm font-bold text-gray-500">Click to Choose Image</p>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
                <textarea rows="4" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="fixed bottom-0 right-0 w-full sm:w-[500px] bg-white p-4 md:p-6 border-t flex flex-row gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-4 bg-[#2d5a4d] text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-[#1a362e] active:scale-95 transition-all">
                  {loading ? "..." : editingId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;