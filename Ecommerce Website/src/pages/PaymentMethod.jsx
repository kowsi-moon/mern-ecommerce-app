import React, { useState } from 'react';
import { FiPlus, FiCreditCard, FiTrash2, FiX } from 'react-icons/fi';

const PaymentMethod = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      holder: 'John Doe',
      expiry: '12/26'
    }
  ]);

  const [newCard, setNewCard] = useState({
    holder: '',
    number: '',
    expiry: ''
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    // Logic to mask number and add to list
    const cardEntry = {
      id: Date.now(),
      type: 'Visa', // Dynamic detection can be added later
      last4: newCard.number.slice(-4),
      holder: newCard.holder,
      expiry: newCard.expiry
    };
    setCards([cardEntry, ...cards]);
    setShowAddForm(false);
    setNewCard({ holder: '', number: '', expiry: '' });
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-gray-500 text-sm">Manage your cards and billing</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all active:scale-95"
        >
          {showAddForm ? <FiX /> : <FiPlus />}
          {showAddForm ? 'Cancel' : 'Add'}
        </button>
      </div>

      {/* --- ADD NEW CARD FORM --- */}
      {showAddForm && (
        <div className="bg-gray-50 border border-gray-100 rounded-[32px] p-8 mb-8 animate-slide-down">
          <h3 className="text-lg font-bold text-gray-900 mb-6">New Payment Method</h3>
          
          <form onSubmit={handleAddCard} className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Cardholder Name</label>
              <input 
                type="text"
                placeholder="John Doe"
                required
                value={newCard.holder}
                onChange={(e) => setNewCard({...newCard, holder: e.target.value})}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Card Number</label>
              <input 
                type="text"
                placeholder="4242 4242 4242 4242"
                maxLength="16"
                required
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Expiry</label>
              <input 
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                required
                value={newCard.expiry}
                onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button 
                type="submit"
                className="bg-black text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
              >
                Save Card
              </button>
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 font-semibold hover:text-black transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- SAVED CARDS LIST --- */}
      <div className="space-y-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div 
              key={card.id}
              className="group flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[24px] hover:border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                  <FiCreditCard className="text-gray-400 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {card.type} •••• {card.last4}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {card.holder} • Exp {card.expiry}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => deleteCard(card.id)}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                title="Remove Card"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[32px]">
            <p className="text-gray-400">No payment methods saved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;