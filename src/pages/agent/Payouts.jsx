import React, { useState } from 'react';

const Payouts = () => {
  const [activeTab, setActiveTab] = useState('seller'); // default to Seller Payouts

  const currentDate = '12/01/2026';
  const period = 'This Month: 01/01/2026 - 31/01/2026';

  // Data changes depending on tab
  const getData = () => {
    if (activeTab === 'my') {
      return {
        title: 'My Payouts',
        totalSales: '42,450.00',
        totalCommissions: '2,122.50',
        history: [
          { period: '01/12/2025 - 31/12/2025', date: '10/01/2026', amount: '1,240.00', status: 'Pending' },
          { period: '01/11/2025 - 30/11/2025', date: '10/12/2025', amount: '890.50', status: 'Paid' },
          // ... more
        ],
      };
    } else {
      return {
        title: 'Seller Payouts',
        totalSales: '347,250.00',
        totalCommissions: '17,362.50',
        history: [
          { period: '01/12/2025 - 31/12/2025', date: '10/01/2026', amount: '1,240.00', status: 'Paid' },
          { period: '01/11/2025 - 30/11/2025', date: '10/12/2025', amount: '890.50', status: 'Paid' },
          { period: '01/10/2025 - 31/10/2025', date: '10/11/2025', amount: '2,100.00', status: 'Paid' },
          { period: '01/09/2025 - 30/09/2025', date: '10/10/2025', amount: '2,100.00', status: 'Paid' },
          { period: '01/08/2025 - 31/08/2025', date: '10/09/2025', amount: '2,100.00', status: 'Paid' },
        ],
      };
    }
  };

  const data = getData();

  return (
      <div className="p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">{data.title}</h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">{period}</p>
          </div>
          <div className="text-slate-600 font-medium text-sm md:text-base">
            {currentDate}
          </div>
        </div>

        {/* Segmented Tabs (checkbox-like switch) */}
        <div className="mb-8">
          <div className="inline-flex bg-slate-100 rounded-full p-1.5">
            <button
                onClick={() => setActiveTab('my')}
                className={`px-6 py-2.5 text-sm md:text-base font-medium rounded-full transition-all ${
                    activeTab === 'my'
                        ? 'bg-blue-600 shadow-sm text-slate-900'
                        : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              My Payouts
            </button>
            <button
                onClick={() => setActiveTab('seller')}
                className={`px-6 py-2.5 text-sm md:text-base font-medium rounded-full transition-all ${
                    activeTab === 'seller'
                        ? 'bg-white shadow-sm text-slate-900'
                        : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              Seller Payouts
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-10">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 font-medium">Total Sellers Sales</h3>
              <span className="text-green-600 text-2xl">₹</span> {/* or sales icon */}
            </div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900">
              Rs. {data.totalSales}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-600 font-medium">
                {activeTab === 'my' ? 'Total My Commissions' : 'Total My Commissions'}
              </h3>
              <span className="text-green-600 text-2xl">₹</span> {/* or commission icon */}
            </div>
            <p className="text-3xl md:text-4xl font-bold text-slate-900">
              Rs. {data.totalCommissions}
            </p>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Payout History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-slate-600">Payout Period</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-600">Payout Date</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-600">Payout Amount</th>
                <th className="px-6 py-4 text-sm font-medium text-slate-600">Status</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
              {data.history.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800">{item.period}</td>
                    <td className="px-6 py-4 text-sm text-slate-800">{item.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      Rs. {item.amount}
                    </td>
                    <td className="px-6 py-4">
                    <span
                        className={`inline-block px-3.5 py-1 text-xs font-medium rounded-full ${
                            item.status === 'Pending'
                                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                : 'bg-green-100 text-green-700 border border-green-200'
                        }`}
                    >
                      {item.status}
                    </span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Payouts;