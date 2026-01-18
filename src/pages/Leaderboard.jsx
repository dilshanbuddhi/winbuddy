function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'John Doe', sales: 45, revenue: 'Rs. 4,500', badge: '🥇' },
    { rank: 2, name: 'Jane Smith', sales: 38, revenue: 'Rs. 3,800', badge: '🥈' },
    { rank: 3, name: 'Mike Johnson', sales: 32, revenue: 'Rs. 3,200', badge: '🥉' },
    { rank: 4, name: 'Sarah Williams', sales: 28, revenue: 'Rs. 2,800', badge: '' },
    { rank: 5, name: 'David Brown', sales: 25, revenue: 'Rs. 2,500', badge: '' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Leaderboard</h1>

      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl p-8 mb-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Top Performer This Month</h2>
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-3xl font-bold mb-2">{leaders[0].name}</h3>
        <p className="text-xl">{leaders[0].sales} Sales - {leaders[0].revenue}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Rankings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className={`p-6 flex items-center justify-between hover:bg-gray-50 transition ${
                leader.rank <= 3 ? 'bg-yellow-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                  {leader.badge || `#${leader.rank}`}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{leader.name}</h3>
                  <p className="text-sm text-gray-600">{leader.sales} sales</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">{leader.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
