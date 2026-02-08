import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sellers = () => {
  const navigate = useNavigate();
  const currentDate = '12/01/2026';

  // Sample data – replace with real data from API
  const sellers = [
    {
      id: '1',
      name: 'Harsh Silva',
      phone: '+94 77 632 4594',
      status: 'Blocked',
      totalSales: '15,250.00',
      myCommission: '762.50',
      isBlocked: true,
      note: 'Delayed deposit\nPlease contact seller',
    },
    {
      id: '2',
      name: 'Kasun C.',
      phone: '+94 76 589 4678',
      status: 'Active',
      totalSales: '32,100.00',
      myCommission: '1,605.00',
      isBlocked: false,
    },
    {
      id: '3',
      name: 'Supun K.',
      phone: '+94 77 117 8320',
      status: 'Active',
      totalSales: '1,000.00',
      myCommission: '50.00',
      isBlocked: false,
    },
  ];

  const usedSellers = sellers.length;
  const maxSellers = 10;

  return (
      <div className="p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Sellers</h1>
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
              Sellers Used: <span className="font-bold text-slate-900">{usedSellers}</span> / {maxSellers}
            </p>
            <p className="text-slate-500 text-sm mt-0.5">
              You can add up to {maxSellers} sellers.
            </p>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {sellers.map((seller) => (
              <div
                  key={seller.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/agent/sellers/${seller.id}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/agent/sellers/${seller.id}`)}
                  className={`rounded-xl sm:rounded-2xl border shadow-sm overflow-hidden transition-all cursor-pointer hover:shadow-md ${
                      seller.isBlocked
                          ? 'border-orange-300'
                          : 'bg-white border-slate-200'
                  }`}
                  style={seller.isBlocked ? { backgroundColor: '#FFEDD4' } : undefined}
              >
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Header with avatar placeholder + name + phone */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium shrink-0 text-sm sm:text-base">
                      {seller.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate text-sm sm:text-base">
                        {seller.name}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm mt-0.5">{seller.phone}</p>

                      <span
                          className={`inline-block mt-2 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                              seller.isBlocked
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : 'bg-green-100 text-green-700 border border-green-200'
                          }`}
                      >
                    {seller.status}
                  </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-600">Total Sales</span>
                      <span className="font-medium text-slate-900">
                    Rs. {seller.totalSales}
                  </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-600">My Commission</span>
                      <span className="font-medium text-slate-900">
                    Rs. {seller.myCommission}
                  </span>
                    </div>
                  </div>

                  {/* Blocked note */}
                  {seller.isBlocked && (
                      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-orange-200">
                        <p className="text-red-600 text-xs sm:text-sm font-medium">
                          {seller.note}
                        </p>
                      </div>
                  )}
                </div>
              </div>
          ))}

        </div>
      </div>
  );
};

export default Sellers;