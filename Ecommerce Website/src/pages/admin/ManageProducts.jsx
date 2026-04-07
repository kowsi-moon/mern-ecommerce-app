import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: 10,
    imageUrl: '',
    description: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, imageUrl: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', category: '', stock: 10, imageUrl: '', description: '' });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.imageUrl,
      description: product.description || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/products', payload);
      }
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', price: '', category: '', stock: 10, imageUrl: '', description: '' });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Products ({products.length})</h2>
          <button onClick={handleAddProduct} className="bg-[#2d5a4d] text-white px-5 md:px-6 py-2 md:py-2.5 rounded shadow-md flex items-center gap-2 text-sm md:text-base">
            <FiPlus /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase">Product</th>
                <th className="text-left p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase">Category</th>
                <th className="text-left p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase">Price</th>
                <th className="text-left p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase">Stock</th>
                <th className="text-center p-3 md:p-4 text-xs md:text-sm font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-all">
                  <td className="p-2 md:p-4 flex items-center gap-3">
                    <img src={item.imageUrl} className="w-12 h-12 md:w-14 md:h-14 rounded object-cover" alt="" />
                    <span className="font-semibold text-sm md:text-base text-gray-800">{item.name}</span>
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base text-gray-500">{item.category}</td>
                  <td className="p-2 md:p-4 font-bold text-sm md:text-base">₹{item.price}</td>
                  <td className="p-2 md:p-4 font-semibold text-gray-600 text-sm md:text-base">{item.stock}</td>
                  <td className="p-2 md:p-4">
                    <div className="flex justify-center gap-4">
                      <FiEdit2 className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handleEditProduct(item)} />
                      <FiTrash2 className="cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleDeleteProduct(item._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center md:justify-end">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white w-full md:w-[480px] h-full md:h-auto shadow-2xl p-6 overflow-y-auto rounded-lg">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                <input type="text" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#2d5a4d] outline-none text-sm md:text-base" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select className="w-full p-3 bg-gray-50 border rounded-lg outline-none text-sm md:text-base" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price</label>
                  <input type="number" className="w-full p-3 bg-gray-50 border rounded-lg outline-none text-sm md:text-base" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                  <input type="number" className="w-full p-3 bg-gray-50 border rounded-lg outline-none text-sm md:text-base" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Product Image</label>
                <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50 text-center relative hover:bg-gray-100 transition-all cursor-pointer">
                  {formData.imageUrl ? (
                    <div className="relative inline-block">
                      <img src={formData.imageUrl} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg" alt="" />
                      <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><FiX size={12} /></button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-4">
                      <FiUpload size={30} className="text-gray-300 mb-2" />
                      <p className="text-xs text-gray-500">Click to upload image</p>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea rows="4" className="w-full p-3 bg-gray-50 border rounded-lg outline-none resize-none text-sm md:text-base" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 border rounded-lg font-bold text-gray-500 text-sm md:text-base">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#2d5a4d] text-white rounded-lg font-bold shadow-lg hover:bg-[#1a362e] transition-all text-sm md:text-base">
                  {loading ? "Processing..." : editingId ? "Update Product" : "Add Product"}
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