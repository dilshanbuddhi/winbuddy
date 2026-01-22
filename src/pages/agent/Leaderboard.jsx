import React from 'react';

const Leaderboard = () => {
    const currentDate = '12/01/2026';

    // Sample data - replace with real API-fetched data
    const leaderboard = [
        { rank: 1, name: 'Sarah Johnson', totalSales: '24,500', isTop: true },
        { rank: 2, name: 'Michael Chen', totalSales: '22,300', isTop: true, highlight: true },
        { rank: 3, name: 'Emily Rodriguez', totalSales: '19,800', isTop: true },
        { rank: 4, name: 'David Kim', totalSales: '18,400' },
        { rank: 5, name: 'Jessica Taylor', totalSales: '17,200' },
        { rank: 6, name: 'Daniel Martinez', totalSales: '16,100' },
        { rank: 7, name: 'Amanda White', totalSales: '15,300' },
        { rank: 8, name: 'Christopher Lee', totalSales: '14,800' },
    ];

    const getTrophy = (rank) => {
        if (rank === 1) return '🏆'; // Gold
        if (rank === 2) return '🥈'; // Silver
        if (rank === 3) return '🥉'; // Bronze
        return '';
    };

    return (
        <div className="p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Leaderboard</h1>
                    <p className="text-slate-500 mt-1 text-sm md:text-base">
                        Top performing Agents this month: 01/01/2026 - 31/01/2026
                    </p>
                </div>
                <div className="text-slate-600 font-medium text-sm md:text-base">
                    {currentDate}
                </div>
            </div>

            {/* Leaderboard Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full max-w-3xl">
                {/* Table Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-6 py-4">
                    <div className="grid grid-cols-[40px_1fr_80px] sm:grid-cols-[60px_1fr_140px] gap-2 sm:gap-4 font-medium text-slate-600 text-xs sm:text-sm">
                        <div>Rank</div>
                        <div>Name</div>
                        <div className="text-right">Total Sales</div>
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100">
                    {leaderboard.map((agent) => (
                        <div
                            key={agent.rank}
                            className={`grid grid-cols-[40px_1fr_80px] sm:grid-cols-[60px_1fr_140px] gap-2 sm:gap-4 items-center px-3 sm:px-6 py-3 sm:py-4 transition-colors ${
                                agent.highlight
                                    ? 'bg-green-50/70'
                                    : agent.isTop
                                        ? 'bg-purple-50/30'
                                        : 'hover:bg-slate-50'
                            }`}
                        >
                            {/* Rank + Trophy */}
                            <div className="flex items-center gap-1 sm:gap-2">
                                {agent.rank <= 3 ? (
                                    <span className="text-base sm:text-xl">{getTrophy(agent.rank)}</span>
                                ) : (
                                    <span className="text-slate-500 font-medium text-sm">{agent.rank}</span>
                                )}

                                {/* Purple circle avatar placeholder - hidden on mobile */}
                                <div className="hidden sm:flex w-8 h-8 rounded-full bg-purple-500 items-center justify-center text-white text-xs font-medium">
                                    {agent.name.charAt(0)}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="font-medium text-slate-900 truncate text-sm sm:text-base">
                                {agent.name}
                            </div>

                            {/* Total Sales */}
                            <div className="text-right font-medium text-slate-900 text-xs sm:text-base">
                                Rs. {agent.totalSales}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional footer note */}
            <p className="text-slate-500 text-sm mt-6 text-center">
                Rankings are based on total sales volume for the current month
            </p>
        </div>
    );
};

export default Leaderboard;