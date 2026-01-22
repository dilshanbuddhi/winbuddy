import React from 'react';
import { Coins, Wallet } from 'lucide-react';

const SellerDashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-GB');

  // Sample data - replace with real API data later
  const stats = {
    pendingSales: '2,800.00',
    pendingCommissions: '140.00',
  };

  const tableData = [
    {
      date: '11/01/2026',
      totalSales: '24,500',
      totalCommissions: '1,225.00',
      status: 'Pending',
      depositAmount: '24,500',
      depositBefore: '14/01/2026, 3:00 PM',
    },
    {
      date: '10/01/2026',
      totalSales: '22,300',
      totalCommissions: '1,115',
      status: 'Deposited',
      depositAmount: '22,300',
      depositBefore: '13/01/2026, 3:00 PM',
    },
    {
      date: '09/01/2026',
      totalSales: '19,800',
      totalCommissions: '990',
      status: 'Deposited',
      depositAmount: '19,800',
      depositBefore: '12/01/2026, 3:00 PM',
    },
    {
      date: '08/01/2026',
      totalSales: '18,400',
      totalCommissions: '920',
      status: 'Deposited',
      depositAmount: '18,400',
      depositBefore: '11/01/2026, 3:00 PM',
    },
    {
      date: '07/01/2026',
      totalSales: '17,200',
      totalCommissions: '860',
      status: 'Deposited',
      depositAmount: '17,200',
      depositBefore: '01/01/2026, 3:00 PM',
    },
  ];

  return (
      <div className="p-2 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">Today</p>
          </div>
          <div className="text-slate-600 font-medium text-sm md:text-base">
            {currentDate}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 max-w-2xl">
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-700 font-medium">Pending Sales</h3>
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              Rs. {stats.pendingSales}
            </p>
          </div>

          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-700 font-medium">Pending Commissions</h3>
              <Coins className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              Rs. {stats.pendingCommissions}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Date</th>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Total Sales</th>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Commissions</th>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Status</th>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Deposit</th>
                <th className="px-3 sm:px-4 py-3 text-xs font-medium text-slate-600 whitespace-nowrap">Before</th>
              </tr>
              </thead>
              <tbody>
              {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-800 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 whitespace-nowrap">Rs. {row.totalSales}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 whitespace-nowrap">Rs. {row.totalCommissions}</td>
                    <td className="px-3 sm:px-4 py-3">
                    <span
                        className={`inline-block px-2 sm:px-2.5 py-1 text-xs font-medium rounded-full ${
                            row.status === 'Pending'
                                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                : 'bg-green-100 text-green-700 border border-green-200'
                        }`}
                    >
                      {row.status}
                    </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-800 whitespace-nowrap">Rs. {row.depositAmount}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-600 whitespace-nowrap">{row.depositBefore}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default SellerDashboard;

