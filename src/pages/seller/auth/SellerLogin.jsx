import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function SellerLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    navigate('/seller/sales')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-3">
      <div className="bg-white rounded-2xl p-4 sm:p-8 md:p-22 w-full max-w-md">
        <div className="flex justify-center">
          <img
            src="/evoplay.svg"
            alt="EvoPlay Logo"
            className="h-40 sm:h-60 w-auto object-contain"
          />
        </div>

        <div className="-mt-12 sm:-mt-24">
          <h3 className="text-xl sm:text-2xl font-semibold text-center text-[#414759] mt-4 sm:mt-6">
            Welcome
          </h3>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#414759] mb-6 sm:mb-8 mt-2">
            Log In to Seller Portal
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to="/seller/forgot-password" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-normal -mt-3 sm:-mt-5">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 sm:mt-6 text-center sm:text-right text-gray-600 text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/seller/register" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SellerLogin

