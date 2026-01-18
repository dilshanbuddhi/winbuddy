import { useState } from 'react'

function Sales() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showNewSaleModal, setShowNewSaleModal] = useState(false)

  const handleCheck = () => {
    // Simulate user lookup
    if (phoneNumber) {
      setSearchResult({
        name: 'Harsha Silva',
        phone: phoneNumber
      })
    }
  }

  const handleSubmit = () => {
    // Handle sale submission
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowSuccessModal(false)
      setShowNewSaleModal(false)
      // Reset form
      setPhoneNumber('')
      setSearchResult(null)
      setQuantity(1)
    }, 2000)
  }

  const handleNewSale = () => {
    setShowNewSaleModal(true)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const totalPrice = quantity * 100

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
        <button
          onClick={handleNewSale}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>New Sale</span>
        </button>
      </div>

      {/* Submit Sales Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Sales</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex space-x-3">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="072 365 8989"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <button
                onClick={handleCheck}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
              >
                Check
              </button>
            </div>
          </div>

          {searchResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {searchResult.name}
                  </h3>
                  <p className="text-gray-600">{searchResult.phone}</p>
                </div>
                <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-6 py-2 rounded-lg border border-blue-200 transition duration-200">
                  Add User
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Gold Coin Packages
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decrementQuantity}
                    className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-700 font-bold text-2xl rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center text-xl font-bold px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-700 font-bold text-2xl rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-blue-600">
                    Rs. {totalPrice.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center transform animate-bounce">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Purchase Successful!
            </h3>
            <p className="text-gray-600">
              The sale has been recorded successfully.
            </p>
          </div>
        </div>
      )}

      {/* New Sale Modal */}
      {showNewSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">New Sale</h2>
              <button
                onClick={() => setShowNewSaleModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex space-x-3">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="072 365 8989"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                  <button
                    onClick={handleCheck}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                  >
                    Check
                  </button>
                </div>
              </div>

              {searchResult && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {searchResult.name}
                      </h3>
                      <p className="text-gray-600">{searchResult.phone}</p>
                    </div>
                    <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-6 py-2 rounded-lg border border-blue-200 transition duration-200">
                      Add User
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Gold Coin Packages
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={decrementQuantity}
                        className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-700 font-bold text-2xl rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center text-xl font-bold px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <button
                        onClick={incrementQuantity}
                        className="w-12 h-12 bg-white hover:bg-gray-100 text-gray-700 font-bold text-2xl rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-blue-600">
                        Rs. {totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sales
