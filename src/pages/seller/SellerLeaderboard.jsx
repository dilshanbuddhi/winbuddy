import React, { useState, useMemo, useRef } from 'react';
import DateTimeDisplay from '../../components/DateTimeDisplay.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SellerLeaderboard = () => {
  const dateRange = '01/01/2026 - 31/01/2026';
  const [showAll, setShowAll] = useState(false);

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

  const displayedEntries = showAll ? leaderboardEntries : leaderboardEntries.slice(0, 20);

  const getRankIconSrc = (rank) => {
    if (rank === 1) return '/first.svg';
    if (rank === 2) return '/second.svg';
    if (rank === 3) return '/third.svg';
    return null;
  };

  const handleJumpToRank = () => {
    setShowAll(true);
    setTimeout(() => {
      if (currentUserRowRef.current) {
        currentUserRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
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
        <DateTimeDisplay />
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

      <div className="flex justify-start">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-[850px]">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap w-28 text-center">
                    Rank
                  </th>
                  <th className="px-3 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">
                    Name
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap text-right">
                    Total Sales
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedEntries.map((seller, index) => (
                  <tr
                    key={`${seller.rank}-${seller.name}`}
                    ref={seller.isCurrentUser ? currentUserRowRef : null}
                    className={`border-b border-slate-200 last:border-0 ${
                      seller.isCurrentUser
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-4 w-28 text-center">
                      {getRankIconSrc(seller.rank) ? (
                        <div className="flex justify-center">
                          <img
                            src={getRankIconSrc(seller.rank)}
                            alt={`Rank ${seller.rank}`}
                            className="w-7 h-7"
                          />
                        </div>
                      ) : (
                        <span className="text-slate-700 font-medium tabular-nums">
                          {seller.rank}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4">
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
                    <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap text-right">
                      Rs. {seller.totalSales}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 z-10">
                <tr className="border-t border-emerald-200">
                  <td className="px-4 py-4 w-28 text-center" style={{ backgroundColor: '#D4FFDE' }}>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {currentUser.rank}
                    </span>
                  </td>
                  <td className="px-3 py-4" style={{ backgroundColor: '#D4FFDE' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                        {currentUser.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <span className="font-bold text-slate-900 flex items-center gap-2">
                        {currentUser.name}
                        <span className="text-[11px] uppercase tracking-wide bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                          You
                        </span>
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-4 font-bold text-slate-900 whitespace-nowrap text-right"
                    style={{ backgroundColor: '#D4FFDE' }}
                  >
                    Rs. {currentUser.totalSales}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {leaderboardEntries.length > 20 && (
            <div className="border-t border-slate-200 p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <span className="font-medium text-slate-700">{displayedEntries.length}</span>
                  <span>of</span>
                  <span className="font-medium text-slate-700">{leaderboardEntries.length}</span>
                  <span>ranks shown</span>
                </div>
                <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(displayedEntries.length / leaderboardEntries.length) * 100}%` }}
                  />
                </div>
                {!showAll ? (
                  <button
                    onClick={() => setShowAll(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Show {leaderboardEntries.length - 20} More Ranks
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAll(false)}
                    className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Show Top 20 Only
                    <ChevronUp className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerLeaderboard;