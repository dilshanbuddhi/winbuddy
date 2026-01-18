function Payouts() {
  const payouts = [
    { id: 1, seller: 'John Doe', amount: 'Rs. 4,500', date: '2024-01-15', status: 'Completed' },
    { id: 2, seller: 'Jane Smith', amount: 'Rs. 3,800', date: '2024-01-14', status: 'Pending' },
    { id: 3, seller: 'Mike Johnson', amount: 'Rs. 3,200', date: '2024-01-13', status: 'Completed' },
    { id: 4, seller: 'Sarah Williams', amount: 'Rs. 2,800', date: '2024-01-12', status: 'Pending' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payouts</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
          Process Pending
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-1">Total Paid Out</p>
          <p className="text-3xl font-bold text-green-600">Rs. 123,400</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-orange-600">Rs. 12,500</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-blue-600">Rs. 45,200</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Seller</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{payout.seller}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{payout.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payout.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payout.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {payout.status === 'Pending' ? (
                      <button className="text-green-600 hover:text-green-700 font-medium">
                        Process
                      </button>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Payouts
