import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import EmailVerificationModal from '../../../components/EmailVerificationModal.jsx'

function Register() {
  const navigate = useNavigate()
  const [showVerification, setShowVerification] = useState(false)
  const [showFrontIdUpload, setShowFrontIdUpload] = useState(false)
  const [showBackIdUpload, setShowBackIdUpload] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [frontIdImage, setFrontIdImage] = useState(null)
  const [backIdImage, setBackIdImage] = useState(null)
  const [frontIdPreview, setFrontIdPreview] = useState(null)
  const [backIdPreview, setBackIdPreview] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setShowVerification(true)
    }
  }

  const handleVerification = (code) => {
    console.log('Verification code:', code)
    // Handle verification logic here
    setShowVerification(false)
    setShowFrontIdUpload(true)
  }

  const handleFrontIdUpload = (file) => {
    setFrontIdImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFrontIdPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleFrontIdConfirm = () => {
    setShowFrontIdUpload(false)
    setShowBackIdUpload(true)
  }

  const handleBackIdUpload = (file) => {
    setBackIdImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setBackIdPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleBackIdConfirm = () => {
    setShowBackIdUpload(false)
    // Navigate to dashboard after all steps complete
    navigate('/agent/dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl p-4 w-full max-w-md sm:max-w-lg">
        <div className="flex justify-center -mb-6 -mt-10">
          <img 
            src="/evoplay.svg"
            alt="EvoPlay Logo" 
            className="h-60 w-auto object-contain"
          />
        </div>


        <form onSubmit={handleSubmit} className="space-y-5 -mt-26" >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

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
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
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
                  className={`w-full px-3 py-2 pr-12 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 pr-12 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-left text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign In
          </Link>
        </p>
      </div>

      <EmailVerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerification}
        email={formData.email}
      />

      {/* Front ID Upload Modal */}
      {showFrontIdUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg px-8 py-10 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Upload Front of ID
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Please upload a clear photo of the front of your ID card
            </p>

            {frontIdPreview ? (
              <div className="mb-6">
                <img
                  src={frontIdPreview}
                  alt="Front ID Preview"
                  className="max-h-48 mx-auto rounded-lg border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFrontIdImage(null)
                    setFrontIdPreview(null)
                  }}
                  className="mt-3 text-sm text-red-500 hover:text-red-700"
                >
                  Remove & Upload Again
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <input
                  type="file"
                  accept="image/*"
                  id="frontId"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleFrontIdUpload(e.target.files[0])
                    }
                  }}
                />
                <label
                  htmlFor="frontId"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-400 text-sm mt-1">or drag and drop</span>
                </label>
              </div>
            )}

            <button
              onClick={handleFrontIdConfirm}
              disabled={!frontIdPreview}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Back ID Upload Modal */}
      {showBackIdUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg px-8 py-10 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Upload Back of ID
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Please upload a clear photo of the back of your ID card
            </p>

            {backIdPreview ? (
              <div className="mb-6">
                <img
                  src={backIdPreview}
                  alt="Back ID Preview"
                  className="max-h-48 mx-auto rounded-lg border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setBackIdImage(null)
                    setBackIdPreview(null)
                  }}
                  className="mt-3 text-sm text-red-500 hover:text-red-700"
                >
                  Remove & Upload Again
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <input
                  type="file"
                  accept="image/*"
                  id="backId"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleBackIdUpload(e.target.files[0])
                    }
                  }}
                />
                <label
                  htmlFor="backId"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-400 text-sm mt-1">or drag and drop</span>
                </label>
              </div>
            )}

            <button
              onClick={handleBackIdConfirm}
              disabled={!backIdPreview}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition"
            >
              Complete Registration
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
