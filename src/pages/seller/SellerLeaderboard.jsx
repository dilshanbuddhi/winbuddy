import React from 'react';

const SellerLeaderboard = () => {
  const currentDate = new Date().toLocaleDateString('en-GB');
  const dateRange = '01/01/2026 - 31/01/2026';

  const topSellers = [
    { rank: 1, name: 'Sarah Johnson', totalSales: '24,500' },
    { rank: 2, name: 'Michael Chen', totalSales: '22,300' },
    { rank: 3, name: 'Emily Rodriguez', totalSales: '19,800' },
    { rank: 4, name: 'David Kim', totalSales: '18,400' },
    { rank: 5, name: 'Jessica Taylor', totalSales: '17,200' },
    { rank: 6, name: 'Daniel Martinez', totalSales: '16,100' },
    { rank: 7, name: 'Amanda White', totalSales: '15,300' },
    { rank: 8, name: 'Christopher Lee', totalSales: '14,800' },
  ];

  const currentUser = {
    rank: 34,
    name: 'Harsha Silva',
    totalSales: '14,800',
  };

  const getRankIconSrc = (rank) => {
    if (rank === 1) return '/first.svg';
    if (rank === 2) return '/second.svg';
    if (rank === 3) return '/third.svg';
    return null;
  };

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Top performing Sellers this month: {dateRange}
          </p>
        </div>
        <div className="text-slate-600 font-medium text-base md:text-lg">
          {currentDate}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[320px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap w-24">
                  Rank
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                  Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap text-right">
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((seller, index) => (
                <tr
                  key={seller.rank}
                  className={`border-b border-slate-100 last:border-0 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  } hover:bg-slate-50/80 transition-colors`}
                >
                  <td className="px-5 py-4 w-24">
                    {getRankIconSrc(seller.rank) ? (
                      <img
                        src={getRankIconSrc(seller.rank)}
                        alt={`Rank ${seller.rank}`}
                        className="w-7 h-7"
                      />
                    ) : (
                      <span className="text-slate-700 font-medium tabular-nums">
                        {seller.rank}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                        {seller.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-900">{seller.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap text-right">
                    Rs. {seller.totalSales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current user's rank - aligned with table columns */}
        <div className="border-t border-slate-200 bg-slate-50/40">
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ backgroundColor: '#D4FFDE', borderColor: '#00A63E' }}
          >
            <div className="w-24 shrink-0">
              <span className="font-bold text-slate-900 tabular-nums">{currentUser.rank}</span>
            </div>
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <span className="font-bold text-slate-900 truncate">{currentUser.name} (You)</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-bold text-slate-900 whitespace-nowrap">
                Rs. {currentUser.totalSales}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLeaderboard;