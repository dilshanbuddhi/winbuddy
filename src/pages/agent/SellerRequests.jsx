import React, { useState, useEffect, useCallback } from 'react';

// Dummy API simulation – replace with real fetch later
const fetchSellerRequests = () => {
  return Promise.resolve({
    sellersUsed: 1,
    maxSellers: 10,
    pendingRequests: [
      {
        id: '1',
        name: 'Harsh Silva',
        phone: '+94 77 632 4584',
        status: 'Pending',
        totalSales: '0.00',
        myCommission: '0.00',
      },
      {
        id: '2',
        name: 'Nimal Perera',
        phone: '+94 76 123 4567',
        status: 'Pending',
        totalSales: '12500.00',
        myCommission: '625.00',
      },
      {
        id: '3',
        name: 'Kamal Fernando',
        phone: '+94 71 987 6543',
        status: 'Pending',
        totalSales: '0.00',
        myCommission: '0.00',
      },
      {
        id: '4',
        name: 'Saman Kumara',
        phone: '+94 70 555 1234',
        status: 'Pending',
        totalSales: '8750.00',
        myCommission: '437.50',
      },
    ],
  });
};

const SellerRequests = () => {
  const currentDate = '12/01/2026';

  const [usage, setUsage] = useState({ sellersUsed: 0, maxSellers: 10 });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSellerRequests();
      setUsage({
        sellersUsed: data.sellersUsed,
        maxSellers: data.maxSellers,
      });
      setPendingRequests(data.pendingRequests || []);
    } catch (err) {
      console.error('Failed to load seller requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    const interval = setInterval(loadRequests, 20000);
    return () => clearInterval(interval);
  }, [loadRequests]);

  const handleConfirm = (id) => {
    // TODO: API call to confirm/approve seller
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = (id) => {
    // TODO: API call to reject/cancel seller request
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Header – same as Sellers.jsx */}
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Seller Requests</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Manage your sellers and track performance
          </p>
        </div>
        <div className="text-slate-600 font-medium text-sm md:text-base">
          {currentDate}
        </div>
      </div>

      {/* Usage Info */}
      <div className="mb-8">
        <div className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
          <p className="text-slate-700 font-medium">
            Seller Requests: <span className="font-bold text-slate-900">{pendingRequests.length}</span>
          </p>
          <p className="text-slate-500 text-sm mt-0.5">
            Pending requests waiting for approval.
          </p>
        </div>
      </div>

      {/* Same card layout as Sellers.jsx + Cancel/Confirm buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {loading ? (
          <div className="col-span-full bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
            Loading...
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
            No pending seller requests.
          </div>
        ) : (
          pendingRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
            >
              <div className="p-4 sm:p-5 md:p-6">
                {/* Header with avatar + name + phone – same as Sellers.jsx */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium shrink-0 text-sm sm:text-base">
                    {request.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate text-sm sm:text-base">
                      {request.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{request.phone}</p>
                    <span className="inline-block mt-2 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Stats – same as Sellers.jsx */}
                <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-600">Total Sales</span>
                    <span className="font-medium text-slate-900">
                      Rs. {request.totalSales}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-600">My Commission</span>
                    <span className="font-medium text-slate-900">
                      Rs. {request.myCommission}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleCancel(request.id)}
                    className="flex-1 py-2.5 sm:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirm(request.id)}
                    className="flex-1 py-2.5 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-sm"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerRequests;