function Sellers() {
  const sellers = [
    { id: 1, name: 'John Doe', phone: '072 123 4567', sales: 45, revenue: 'Rs. 4,500' },
    { id: 2, name: 'Jane Smith', phone: '077 234 5678', sales: 38, revenue: 'Rs. 3,800' },
    { id: 3, name: 'Mike Johnson', phone: '071 345 6789', sales: 32, revenue: 'Rs. 3,200' },
    { id: 4, name: 'Sarah Williams', phone: '076 456 7890', sales: 28, revenue: 'Rs. 2,800' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sellers</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
          + Add Seller
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Sales</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{seller.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{seller.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{seller.sales}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{seller.revenue}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium mr-4">View</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Remove</button>
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

export default Sellers
