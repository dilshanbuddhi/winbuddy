import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

const SellerDashboard = () => {
  const currentDate = '12/01/2026';

  const stats = {
    pendingSales: '2,800.00',
    pendingCommissions: '140.00',
  };

  const tableData = [
    { date: '11/01/2026', totalSales: '24,500', totalCommissions: '1,225.00', status: 'Pending', depositAmount: '24,500', depositBefore: '14/01/2026, 3:00 PM' },
    { date: '10/01/2026', totalSales: '22,300', totalCommissions: '1,115.00', status: 'Deposited', depositAmount: '22,300', depositBefore: '13/01/2026, 3:00 PM' },
    { date: '09/01/2026', totalSales: '19,800', totalCommissions: '990.00', status: 'Deposited', depositAmount: '19,800', depositBefore: '12/01/2026, 3:00 PM' },
    { date: '08/01/2026', totalSales: '18,400', totalCommissions: '920.00', status: 'Deposited', depositAmount: '18,400', depositBefore: '11/01/2026, 3:00 PM' },
    { date: '07/01/2026', totalSales: '17,200', totalCommissions: '860.00', status: 'Deposited', depositAmount: '17,200', depositBefore: '10/01/2026, 3:00 PM' },
  ];

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Today</p>
        </div>
        <div className="text-slate-600 font-medium text-base md:text-lg">
          {currentDate}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-orange-500 font-semibold text-lg">Pending Sales</h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Rs. {stats.pendingSales}
              </p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600">
              <FileText className="w-7 h-7" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-orange-500 font-semibold text-lg">Pending Commissions</h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Rs. {stats.pendingCommissions}
              </p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Date</th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Total Sales</th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Total Commissions</th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Deposit Amount</th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">Deposit Before</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="px-5 py-4 text-sm text-slate-800 whitespace-nowrap font-medium">{row.date}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">Rs. {row.totalSales}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">Rs. {row.totalCommissions}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        row.status === 'Pending'
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-900 whitespace-nowrap font-medium">Rs. {row.depositAmount}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{row.depositBefore}</td>
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
