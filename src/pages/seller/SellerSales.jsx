import React, { useState } from 'react';
import DateTimeDisplay from '../../components/DateTimeDisplay.jsx';

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
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const SellerSales = () => {
  const [phoneNumber, setPhoneNumber] = useState('072 365 8989');
  const [isCheckPerformed, setIsCheckPerformed] = useState(false);
  const [customerFound, setCustomerFound] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);

  const pricePerUnit = 20;

  const normalizePhone = (phone) => phone.replace(/\s|-/g, '').trim();
  const KNOWN_PHONE = '0782960721';
  const KNOWN_NAME = 'buddhi dilshan';

  const onPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setIsCheckPerformed(false);
    setCustomerFound(false);
    setCustomerName('');
  };

  const handleCheck = () => {
    setIsCheckPerformed(true);
    const normalized = normalizePhone(phoneNumber);
    if (normalized === KNOWN_PHONE) {
      setCustomerFound(true);
      setCustomerName(KNOWN_NAME);
    } else {
      setCustomerFound(false);
      setCustomerName('');
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddCustomer = (customerName, phone) => {
    console.log('Adding customer:', customerName, 'Phone:', phone);
  };

  const canSubmit = isCheckPerformed && customerFound && !isPurchaseSuccess;
  const isCheckDisabled = !phoneNumber.trim();

  const handleSubmit = () => {
    setIsPurchaseSuccess(true);
  };

  const handleNewSale = () => {
    setIsPurchaseSuccess(false);
    setQuantity(1);
    setIsCheckPerformed(false);
    setCustomerFound(false);
    setCustomerName('');
    setPhoneNumber('');
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Sales</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Submit sales</p>
        </div>
        <DateTimeDisplay />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 w-full max-w-sm">
        <div className="space-y-5">
          <div>
            <label className="block text-slate-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={onPhoneChange}
                placeholder="e.g. 072 365 8989"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-slate-800 text-sm"
              />
              <button
                type="button"
                onClick={handleCheck}
                disabled={isCheckDisabled}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:text-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-400 disabled:opacity-90 text-white px-5 py-2.5 sm:py-3 rounded-xl font-medium text-sm transition-colors"
              >
                Check
              </button>
            </div>
          </div>

          {isCheckPerformed && customerFound && (
            <div>
              <input
                type="text"
                value={customerName}
                readOnly
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-green-300 bg-green-50/50 rounded-xl text-slate-800 text-sm"
                placeholder="Customer name"
              />
            </div>
          )}

          {isCheckPerformed && !customerFound && (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center font-medium text-sm">
                Customer not found
              </div>
              <button
                type="button"
                onClick={() => setIsAddCustomerModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
              >
                Add Customer
              </button>
            </div>
          )}

          <div className="pt-1">
            <label className="block text-slate-700 text-sm font-medium mb-2.5">
              Number of Gold Coin Packages
            </label>
            <div className="flex items-stretch gap-2.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] inline-flex items-center justify-center rounded-lg bg-slate-300 text-slate-700 hover:bg-slate-400 disabled:bg-slate-400 disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-slate-400 transition-colors shadow-sm select-none text-2xl font-bold leading-none p-0"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <div className="flex-1 min-w-0 flex items-center justify-center border border-slate-300 rounded-xl font-bold text-xl text-slate-800 bg-white h-11">
                {quantity}
              </div>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] inline-flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm select-none text-2xl font-bold leading-none p-0"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-center py-3">
            <span className="text-3xl font-bold text-slate-900">
              Rs. {quantity * pricePerUnit}
            </span>
          </div>

          {isPurchaseSuccess ? (
            <div className="space-y-3">
              <div className="w-full py-3.5 rounded-xl font-semibold text-base text-center bg-green-500 hover:bg-green-600 text-white shadow-md pointer-events-none">
                Purchase Successful!
              </div>
              <button
                type="button"
                onClick={handleNewSale}
                className="w-full py-3.5 rounded-xl font-semibold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-colors"
              >
                New Sale
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full py-3 rounded-xl font-semibold text-base transition-all shadow-md disabled:bg-slate-400 disabled:text-white disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-slate-400 disabled:opacity-90 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        phoneNumber={phoneNumber}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
};

export default SellerSales;
