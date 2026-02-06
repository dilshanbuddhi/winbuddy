import React from 'react';
import { Medal } from 'lucide-react';

const Leaderboard = () => {
  const currentDate = '12/01/2026';
  const dateRange = '01/01/2026 - 31/01/2026';

  const topAgents = [
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
    name: 'Harsh Silva',
    totalSales: '14,800',
  };

  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-amber-500';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber-700';
    return '';
  };

  return (
    <div className="p-5 md:p-6 lg:p-8 flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Top performing Agents this month: {dateRange}
          </p>
        </div>
        <div className="text-slate-600 font-medium text-base md:text-lg">
          {currentDate}
        </div>
      </div>

      {/* Leaderboard Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[320px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap w-20">
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
              {topAgents.map((agent, index) => (
                <tr
                  key={agent.rank}
                  className={`border-b border-slate-100 last:border-0 ${
                    index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  } hover:bg-slate-50/80 transition-colors`}
                >
                  <td className="px-5 py-4">
                    {agent.rank <= 3 ? (
                      <span className="inline-flex items-center justify-center">
                        <Medal
                          className={`w-7 h-7 ${getMedalColor(agent.rank)}`}
                          strokeWidth={2}
                          fill="currentColor"
                        />
                      </span>
                    ) : (
                      <span className="text-slate-700 font-medium">{agent.rank}</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                        {agent.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-900">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-slate-900 whitespace-nowrap">
                    Rs. {agent.totalSales}
                  </td>
                </tr>
              ))}
              {/* Current user's rank - highlighted row */}
              <tr className="bg-emerald-50 border-t-2 border-emerald-100 hover:bg-emerald-100/80 transition-colors">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {currentUser.rank}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                      {currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <span className="font-medium text-slate-900">{currentUser.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right font-medium text-slate-900 whitespace-nowrap">
                  Rs. {currentUser.totalSales}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
