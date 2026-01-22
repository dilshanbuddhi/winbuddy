import React, { useState } from 'react';

const AddCustomerModal = ({ isOpen, onClose, phoneNumber, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (customerName.trim()) {
      onSubmit(customerName, phoneNumber);
      setCustomerName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Add Customer</h2>
        <p className="text-slate-600 mb-4">
          Would you like to add a customer for the phone number:{' '}
          <span className="font-semibold text-slate-800">{phoneNumber}</span>
        </p>
        <div className="mb-4">
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-800 text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Sales = () => {
  const [phoneNumber, setPhoneNumber] = useState('072 365 8989');
  const [isCheckPerformed, setIsCheckPerformed] = useState(false);
  const [customerFound, setCustomerFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  const pricePerUnit = 50;

  const handleCheck = () => {
    setIsCheckPerformed(true);
    // Replace with real API call later
    setCustomerFound(phoneNumber.trim().endsWith('1'));
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddCustomer = (customerName, phone) => {
    // Handle customer submission logic here
    console.log('Adding customer:', customerName, 'Phone:', phone);
    // You can add API call here to save the customer
  };

  const currentDate = '12/01/2026';

  return (
      <div className="p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Sales</h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">Submit sales</p>
          </div>
          <div className="text-slate-600 font-medium text-sm md:text-base">
            {currentDate}
          </div>
        </div>

        {/* Card – responsive width */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 w-full max-w-sm">
          <div className="space-y-5">
            {/* Phone Number */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 072 365 8989"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-800 text-sm"
                />
                <button
                    onClick={handleCheck}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-colors"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Customer not found */}
            {isCheckPerformed && !customerFound && (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center font-medium text-sm animate-in fade-in duration-200">
                    Customer not found
                  </div>
                  <button
                    onClick={() => setIsAddCustomerModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                    Add Customer
                  </button>
                </div>
            )}

            {/* Customer found */}
            {isCheckPerformed && customerFound && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-center font-medium text-sm">
                  Customer found: Example Name
                </div>
            )}

            {/* Quantity */}
            <div className="pt-1">
              <label className="block text-slate-700 text-sm font-medium mb-2.5">
                Number of Gold Coin Packages
              </label>
              <div className="flex items-center gap-2.5">
                <button
                    onClick={handleDecrement}
                    className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold shadow-sm"
                >
                  −
                </button>

                <div className="flex-1 border border-slate-300 rounded-xl py-3 text-center font-bold text-xl text-slate-800 bg-white">
                  {quantity}
                </div>

                <button
                    onClick={handleIncrement}
                    className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="text-center py-3">
            <span className="text-3xl font-bold text-slate-900">
              Rs. {quantity * pricePerUnit}
            </span>
            </div>

            {/* Submit */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-base transition-all shadow-md shadow-blue-500/20">
              Submit
            </button>
          </div>
        </div>

        {/* Add Customer Modal */}
        <AddCustomerModal
          isOpen={isAddCustomerModalOpen}
          onClose={() => setIsAddCustomerModalOpen(false)}
          phoneNumber={phoneNumber}
          onSubmit={handleAddCustomer}
        />
      </div>
  );
};

export default Sales;