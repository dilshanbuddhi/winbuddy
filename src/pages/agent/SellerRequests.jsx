import React, { useState, useEffect, useCallback } from 'react';
import { User, Phone } from 'lucide-react';

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
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '/');

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

  const handleConfirm = (id) => {
    // TODO: API call to confirm/approve seller
    console.log('Confirming seller request:', id);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = (id) => {
    // TODO: API call to reject/cancel seller request
    console.log('Cancelling seller request:', id);
    setPendingRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Seller Requests</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Manage incoming seller applications and track performance
          </p>
        </div>
        <div className="text-slate-600 font-medium text-base sm:text-lg whitespace-nowrap">
          {currentDate}
        </div>
      </div>

      {/* Usage Info Card */}
      <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-5 w-full">
        <p className="font-medium text-slate-800 text-lg">
          Sellers Used:{' '}
          <span className="text-blue-600">
            {usage.sellersUsed} / {usage.maxSellers}
          </span>
        </p>
        <p className="text-slate-500 text-sm mt-1.5">
          You can add up to {usage.maxSellers} sellers in your current plan.
        </p>
      </div>

      {/* Pending Requests */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Pending Requests ({pendingRequests.length})
        </h2>

        {loading ? (
          <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
            Loading seller requests...
          </div>
        ) : pendingRequests.length === 0 ? (
          <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
            No pending seller requests at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  {/* Avatar + Info */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl shrink-0">
                      {request.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-lg truncate">
                        {request.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-slate-600 text-sm">
                        <Phone className="w-4 h-4" />
                        <span className="break-all sm:break-normal">{request.phone}</span>
                      </div>

                      <span className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-sm font-medium border border-orange-200/60">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                        {request.status}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-5 py-4 border-t border-slate-100 bg-slate-50/40 -mx-5 md:-mx-6 px-5 md:px-6 mt-2">
                    <div>
                      <p className="text-slate-500 text-xs md:text-sm">Total Sales</p>
                      <p className="font-semibold text-slate-900 text-base md:text-lg mt-0.5">
                        Rs. {Number(request.totalSales).toLocaleString('en-US')}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs md:text-sm">My Commission</p>
                      <p className="font-semibold text-slate-900 text-base md:text-lg mt-0.5">
                        Rs. {Number(request.myCommission).toLocaleString('en-US')}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-6 flex gap-3">
                    <button
                      onClick={() => handleCancel(request.id)}
                      className="flex-1 py-3 px-5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 active:bg-slate-100 transition-colors text-sm md:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleConfirm(request.id)}
                      className="flex-1 py-3 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium transition-colors shadow-sm text-sm md:text-base"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerRequests;