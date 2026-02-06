import React, { useState } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

const Payouts = () => {
  const [activeTab, setActiveTab] = useState('my');

  const currentDate = '12/01/2026';
  const period = 'This Month: 01/01/2026 - 31/01/2026';

  const getData = () => {
    if (activeTab === 'my') {
      return {
        totalSales: '42,450.00',
        totalCommissions: '2,122.50',
        history: [
          { period: '01/12/2025 - 31/12/2025', date: '10/01/2026', amount: '1,240.00', status: 'Pending' },
          { period: '01/11/2025 - 30/11/2025', date: '10/12/2025', amount: '890.50', status: 'Paid' },
          { period: '01/10/2025 - 31/10/2025', date: '10/11/2025', amount: '2,100.00', status: 'Paid' },
          { period: '01/09/2025 - 30/09/2025', date: '10/10/2025', amount: '2,100.00', status: 'Paid' },
          { period: '01/08/2025 - 31/08/2025', date: '10/09/2025', amount: '2,100.00', status: 'Paid' },
        ],
      };
    }
    return {
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
  };

  const data = getData();

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      {/* Header: title + date */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Payouts</h1>
        <div className="text-slate-600 font-medium text-base md:text-lg">
          {currentDate}
        </div>
      </div>

      {/* Tabs: My Payouts | Seller Payouts */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('my')}
          className={`px-6 py-3 text-sm font-medium rounded-xl transition-colors ${
            activeTab === 'my'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          My Payouts
        </button>
        <button
          onClick={() => setActiveTab('seller')}
          className={`px-6 py-3 text-sm font-medium rounded-xl transition-colors ${
            activeTab === 'seller'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          Seller Payouts
        </button>
      </div>

      <p className="text-slate-600 text-sm mb-6">{period}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-slate-700 font-medium text-base">Total Sales</h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                Rs. {data.totalSales}
              </p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600">
              <FileText className="w-7 h-7" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-slate-700 font-medium text-base">Total Commissions</h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                Rs. {data.totalCommissions}
              </p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">Payout History</h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Payout Period
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Payout Date
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Payout Amount
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.history.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-100 last:border-0 transition-colors ${
                    index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  } hover:bg-slate-50/80`}
                >
                  <td className="px-5 py-4 text-sm text-slate-800 whitespace-nowrap">
                    {item.period}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-800 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Rs. {item.amount}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${
                        item.status === 'Pending'
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
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
