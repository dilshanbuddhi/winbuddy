import React, { useMemo, useRef } from 'react';

const SellerLeaderboard = () => {
  const currentDate = new Date().toLocaleDateString('en-GB');
  const dateRange = '01/01/2026 - 31/01/2026';

  const currentUser = {
    rank: 34,
    name: 'Harsha Silva',
    totalSales: '14,800',
  };

  const currentUserRowRef = useRef(null);

  const leaderboardEntries = useMemo(() => {
    const firstNames = [
      'Sarah',
      'Michael',
      'Emily',
      'David',
      'Jessica',
      'Daniel',
      'Amanda',
      'Christopher',
      'Olivia',
      'Ethan',
      'Sophia',
      'James',
      'Isabella',
      'Liam',
      'Mia',
    ];
    const lastNames = [
      'Johnson',
      'Chen',
      'Rodriguez',
      'Kim',
      'Taylor',
      'Martinez',
      'White',
      'Lee',
      'Brown',
      'Singh',
      'Garcia',
      'Wong',
      'Davis',
      'Patel',
      'Thompson',
    ];

    const entries = Array.from({ length: 60 }, (_, index) => {
      const rank = index + 1;
      const name = `${firstNames[index % firstNames.length]} ${
        lastNames[(index * 3) % lastNames.length]
      }`;
      const totalSales = Math.max(13700, 24500 - rank * 180);

      return {
        rank,
        name,
        totalSales: totalSales.toLocaleString('en-US'),
      };
    });

    entries[currentUser.rank - 1] = {
      rank: currentUser.rank,
      name: currentUser.name,
      totalSales: currentUser.totalSales,
      isCurrentUser: true,
    };

    return entries;
  }, [currentUser.name, currentUser.rank, currentUser.totalSales]);

  const getRankIconSrc = (rank) => {
    if (rank === 1) return '/first.svg';
    if (rank === 2) return '/second.svg';
    if (rank === 3) return '/third.svg';
    return null;
  };

  const handleJumpToRank = () => {
    if (currentUserRowRef.current) {
      currentUserRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="text-slate-500 text-sm">Your Rank</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              #{currentUser.rank}
            </span>
            <span className="text-slate-700 font-medium truncate">{currentUser.name}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleJumpToRank}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
        >
          Jump to my rank
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-auto max-h-[520px]">
          <table className="w-full text-left min-w-[520px]">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
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
              {leaderboardEntries.map((seller, index) => (
                <tr
                  key={`${seller.rank}-${seller.name}`}
                  ref={seller.isCurrentUser ? currentUserRowRef : null}
                  className={`border-b border-slate-100 last:border-0 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  } ${
                    seller.isCurrentUser
                      ? 'bg-gradient-to-r from-emerald-50 via-emerald-100/60 to-emerald-50 ring-2 ring-emerald-400 shadow-[inset_6px_0_0_0_rgba(16,185,129,0.8)] animate-pulse-subtle'
                      : ''
                  } hover:bg-slate-50/80 transition-all duration-200`}
                >
                  <td className="px-5 py-4 w-24">
                    {getRankIconSrc(seller.rank) ? (
                      <img
                        src={getRankIconSrc(seller.rank)}
                        alt={`Rank ${seller.rank}`}
                        className="w-7 h-7"
                      />
                    ) : (
                      <span className={`${seller.isCurrentUser ? 'text-emerald-700 font-bold' : 'text-slate-700 font-medium'} tabular-nums`}>
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
                      <span className="font-medium text-slate-900 flex items-center gap-2">
                        {seller.name}
                        {seller.isCurrentUser ? (
                          <span className="text-[11px] uppercase tracking-wide bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                            You
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap text-right">
                    Rs. {seller.totalSales}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 z-10">
              <tr className="border-t-2 border-emerald-400 bg-gradient-to-r from-emerald-100 via-emerald-200/70 to-emerald-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <td className="px-5 py-4 w-24">
                  <span className="font-bold text-emerald-800 tabular-nums text-lg">
                    #{currentUser.rank}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-emerald-400 ring-offset-2">
                      {currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <span className="font-bold text-slate-900 flex items-center gap-2">
                      {currentUser.name}
                      <span className="text-[11px] uppercase tracking-wide bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-full shadow-sm">
                        You
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 font-bold text-emerald-800 whitespace-nowrap text-right text-lg">
                  Rs. {currentUser.totalSales}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerLeaderboard;