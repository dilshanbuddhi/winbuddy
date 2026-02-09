import React, { useState } from 'react';
import { Save, Camera, Landmark, KeyRound, MapPin, X } from 'lucide-react';

const SellerAccount = () => {
  const currentDate = new Date().toLocaleDateString('en-GB');
  const [openModal, setOpenModal] = useState(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [addressForm, setAddressForm] = useState({ address: '', district: '' });
  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    branch: '',
  });

  const closeModal = () => {
    setOpenModal(null);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setAddressForm({ address: '', district: '' });
    setBankForm({ bankName: '', accountHolderName: '', accountNumber: '', branch: '' });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // TODO: API call
    closeModal();
  };
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // TODO: API call
    closeModal();
  };
  const handleBankSubmit = (e) => {
    e.preventDefault();
    // TODO: API call
    closeModal();
  };

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Account</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Manage your profile information and settings
          </p>
        </div>
        <div className="text-slate-600 font-medium text-base md:text-lg">
          {currentDate}
        </div>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Profile Picture</h3>
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
              NG
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white shadow-md transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
            <input
              type="text"
              defaultValue="Nalaka Gunawardana"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john.anderson@example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="077 433 4568"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Seller ID</label>
            <input
              type="text"
              defaultValue="B-1026"
              disabled
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-slate-500 text-xs mt-1">Your Seller ID cannot be changed</p>
          </div>

          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Account Settings Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Account Settings</h2>
        <div className="space-y-3 max-w-md">
          <button
            type="button"
            onClick={() => setOpenModal('bank')}
            className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <Landmark className="w-5 h-5" />
            Add Bank Account
          </button>
          <button
            type="button"
            onClick={() => setOpenModal('password')}
            className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <KeyRound className="w-5 h-5" />
            Change Password
          </button>
          <button
            type="button"
            onClick={() => setOpenModal('address')}
            className="w-full flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <MapPin className="w-5 h-5" />
            Change Address
          </button>
        </div>
      </div>

      {/* Modal backdrop and container */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Change Password Modal */}
            {openModal === 'password' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handlePasswordSubmit} className="p-6">
                  <p className="text-slate-600 text-sm mb-5">
                    Enter your current password and choose a new one.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* New Address Modal */}
            {openModal === 'address' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">New Address</h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddressSubmit} className="p-6">
                  <p className="text-slate-600 text-sm mb-5">Enter a new address below.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={addressForm.address}
                        onChange={(e) =>
                          setAddressForm((p) => ({ ...p, address: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        District
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={addressForm.district}
                          onChange={(e) =>
                            setAddressForm((p) => ({ ...p, district: e.target.value }))
                          }
                          className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Select or enter district"
                        />
                        {addressForm.district ? (
                          <button
                            type="button"
                            onClick={() => setAddressForm((p) => ({ ...p, district: '' }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            ▼
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Add Bank Account Modal */}
            {openModal === 'bank' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">Add Bank Account</h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleBankSubmit} className="p-6">
                  <p className="text-slate-600 text-sm mb-5">
                    Enter your bank account details below.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={bankForm.bankName}
                        onChange={(e) =>
                          setBankForm((p) => ({ ...p, bankName: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Commercial Bank"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={bankForm.accountHolderName}
                        onChange={(e) =>
                          setBankForm((p) => ({ ...p, accountHolderName: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Name as per bank record"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={bankForm.accountNumber}
                        onChange={(e) =>
                          setBankForm((p) => ({ ...p, accountNumber: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Branch <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={bankForm.branch}
                        onChange={(e) =>
                          setBankForm((p) => ({ ...p, branch: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Branch name"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerAccount;
