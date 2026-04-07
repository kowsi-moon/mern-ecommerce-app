import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { cart = [], clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation Logic
    if (['fullName', 'country', 'city', 'state'].includes(name)) {
      // Only allow alphabets and spaces
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === 'zip') {
      // Only allow numbers, max 6 digits (typical for pincodes)
      if (!/^\d*$/.test(value) || value.length > 6) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      if (!/^\d*$/.test(value) || value.length > 16) return;
    }

    if (name === 'cvv') {
      if (!/^\d*$/.test(value) || value.length > 4) return;
    }

    if (name === 'expiry') {
      // Allow numbers and forward slash, max 5 or 7 chars (MM/YY or MM/YYYY)
      if (!/^[0-9/]*$/.test(value) || value.length > 7) return;
    }

    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    const { fullName, country, city, state, zip, address } = formData;
    if (!fullName || !country || !city || !state || !zip || !address) {
      alert("Please fill all shipping fields.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { cardNumber, expiry, cvv } = paymentData;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/;
    
    if (cardNumber.length < 13) {
      alert("Invalid Card Number");
      return false;
    }
    if (!expiryRegex.test(expiry)) {
      alert("Invalid Expiry Format (MM/YY or MM/YYYY)");
      return false;
    }
    if (cvv.length < 3) {
      alert("Invalid CVV");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.isAdmin) {
        alert("Admin cannot place orders!");
        setLoading(false);
        return;
      }
      if (!user || !user.id) {
        alert("Please login first!");
        setLoading(false);
        return;
      }

      const orderDetails = {
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        })),
        shippingAddress: formData,
        totalAmount: subtotal,
        userId: user.id
      };

      const response = await axios.post("http://localhost:5000/api/orders", orderDetails);

      if (response.status === 201) {
        setIsSuccess(true);
        clearCart();
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Order Failed!");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-sm w-full transform animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-[#4ade80] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
            <CheckCircle size={56} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold text-[#1F3E35] font-serif">Order Successfully Placed</h2>
          <p className="text-gray-500 text-xs mt-4 italic">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F3E35] text-center mb-16 font-serif">Checkout</h1>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-16">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#1F3E35] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold">Shipping</span>
          </div>
          <div className="w-8 sm:w-12 h-[1px] bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#1F3E35] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold">Payment</span>
          </div>
          <div className="w-8 sm:w-12 h-[1px] bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-[#1F3E35] text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold">Review</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-16">
          {/* STEP 1: SHIPPING */}
          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-[#1F3E35] mb-8 font-serif">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                  <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" placeholder="Alphabets only" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Country</label>
                  <input name="country" type="text" value={formData.country} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Street Address</label>
                  <input name="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                  <input name="city" type="text" value={formData.city} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">State</label>
                    <input name="state" type="text" value={formData.state} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Pincode</label>
                    <input name="zip" type="text" value={formData.zip} onChange={handleInputChange} className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" placeholder="Numbers only" />
                  </div>
                </div>
              </div>
              <button onClick={() => validateStep1() && setStep(2)} className="w-full bg-[#1F3E35] text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest mt-10 hover:opacity-90 transition-all">
                Continue to Payment
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-[#1F3E35] mb-8 font-serif">Payment Details</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Card Number</label>
                  <input name="cardNumber" type="text" value={paymentData.cardNumber} onChange={handlePaymentChange} placeholder="16 Digit Number" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Expiry Date</label>
                    <input name="expiry" type="text" value={paymentData.expiry} onChange={handlePaymentChange} placeholder="MM/YY" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CVV</label>
                    <input name="cvv" type="text" value={paymentData.cvv} onChange={handlePaymentChange} placeholder="123" className="w-full bg-[#fcfcfc] border border-gray-200 rounded-lg p-4 text-sm outline-none focus:border-[#1F3E35]" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={() => setStep(1)} className="px-8 py-5 bg-gray-50 rounded-xl font-bold text-xs uppercase text-gray-500">Back</button>
                <button onClick={() => validateStep2() && setStep(3)} className="flex-1 bg-[#1F3E35] text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-[#1F3E35] mb-8 font-serif">Review Your Order</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <div>
                      <h4 className="font-bold text-sm text-[#1F3E35]">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="font-bold text-sm">₹{item.price * (item.quantity || 1)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-xl space-y-3">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#1F3E35] pt-3 border-t border-gray-200 font-serif">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button onClick={() => setStep(2)} className="px-8 py-5 bg-gray-50 rounded-xl font-bold text-xs uppercase text-gray-500">Back</button>
                <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 bg-[#1F3E35] text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-50">
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;