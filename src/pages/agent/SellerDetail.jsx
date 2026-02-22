import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2 } from 'lucide-react';
import DateTimeDisplay from '../../components/DateTimeDisplay.jsx';

// Dummy data per seller – replace with API call (e.g. fetchSellerDetail(sellerId))
const getSellerDetail = (sellerId) => {
  const details = {
    '1': {
      name: 'Harsh Silva',
      phone: '+94 77 632 4584',
      status: 'Seller Blocked',
      isBlocked: true,
      pendingSales: '2,800.00',
      pendingMyCommissions: '140.00',
      tableData: [
        { date: '11/01/2026', totalSales: '24,500', totalCommissions: '1,225.00', status: 'Pending', depositAmount: '24,500', depositBefore: '14/01/2026, 3.00 PM' },
        { date: '10/01/2026', totalSales: '22,300', totalCommissions: '1,115.00', status: 'Deposited', depositAmount: '22,300', depositBefore: '13/01/2026, 3.00 PM' },
        { date: '09/01/2026', totalSales: '19,800', totalCommissions: '990.00', status: 'Deposited', depositAmount: '19,800', depositBefore: '12/01/2026, 3.00 PM' },
        { date: '08/01/2026', totalSales: '18,400', totalCommissions: '920.00', status: 'Deposited', depositAmount: '18,400', depositBefore: '11/01/2026, 3.00 PM' },
        { date: '07/01/2026', totalSales: '17,200', totalCommissions: '860.00', status: 'Deposited', depositAmount: '17,200', depositBefore: '10/01/2026, 3.00 PM' },
      ],
    },
    '2': {
      name: 'Kasun C.',
      phone: '+94 76 589 4678',
      status: 'Active',
      isBlocked: false,
      pendingSales: '1,200.00',
      pendingMyCommissions: '60.00',
      tableData: [
        { date: '11/01/2026', totalSales: '12,000', totalCommissions: '600.00', status: 'Pending', depositAmount: '12,000', depositBefore: '14/01/2026, 3.00 PM' },
        { date: '10/01/2026', totalSales: '10,500', totalCommissions: '525.00', status: 'Deposited', depositAmount: '10,500', depositBefore: '13/01/2026, 3.00 PM' },
      ],
    },
    '3': {
      name: 'Supun K.',
      phone: '+94 77 117 8320',
      status: 'Active',
      isBlocked: false,
      pendingSales: '0.00',
      pendingMyCommissions: '0.00',
      tableData: [
        { date: '09/01/2026', totalSales: '1,000', totalCommissions: '50.00', status: 'Deposited', depositAmount: '1,000', depositBefore: '12/01/2026, 3.00 PM' },
      ],
    },
  };
  return details[sellerId] || null;
};

const SellerDetail = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with API call – e.g. fetchSellerDetail(sellerId)
    const timer = setTimeout(() => {
      setSeller(getSellerDetail(sellerId));
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [sellerId]);

  if (loading) {
    return (
      <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50 items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
        <p className="text-slate-600 mb-4">Seller not found.</p>
        <button
          type="button"
          onClick={() => navigate('/agent/sellers')}
          className="text-blue-600 font-medium hover:underline"
        >
          Back to Sellers
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      {/* Header: date right, name + phone + status + Today */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 gap-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{seller.name}</h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                seller.isBlocked
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {seller.status}
            </span>
          </div>
          <p className="text-slate-600 mt-1">{seller.phone}</p>
          <p className="text-slate-500 text-sm mt-0.5">Today</p>
        </div>
        <DateTimeDisplay />
      </div>

      {/* Summary Cards – same style as Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-orange-500 font-semibold text-lg">Pending Sales</h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Rs. {seller.pendingSales}
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
              <h3 className="text-orange-500 font-semibold text-lg">Pending My Commissions</h3>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                Rs. {seller.pendingMyCommissions}
              </p>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales/Commission Table – same as Dashboard */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead className="bg-slate-50 border-b border-slate-200">
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
              {seller.tableData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-100 last:border-0 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  } hover:bg-slate-50 transition-colors`}
                >
                  <td className="px-5 py-4 text-sm text-slate-800 whitespace-nowrap font-medium">
                    {row.date}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Rs. {row.totalSales}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Rs. {row.totalCommissions}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${
                        row.status === 'Pending'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-900 whitespace-nowrap font-medium">
                    Rs. {row.depositAmount}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {row.depositBefore}
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

export default SellerDetail;
