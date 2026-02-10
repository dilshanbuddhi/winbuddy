import { useState, useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

function SellerEmailVerificationModal({ isOpen, onClose, onComplete, email }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState('idle') // 'idle' | 'pending' | 'approved' | 'rejected'
  const inputRefs = useRef([])

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
    // Reset state when modal opens
    if (isOpen) {
      setCode(['', '', '', '', '', ''])
      setIsVerifying(false)
      setVerificationStatus('idle')
    }
  }, [isOpen])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pasted.length; i++) {
      if (/^\d$/.test(pasted[i])) {
        newCode[i] = pasted[i]
      }
    }

    setCode(newCode)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async () => {
    const verificationCode = code.join('')
    if (verificationCode.length === 6) {
      setIsVerifying(true)
      setVerificationStatus('pending')

      // Simulate API call and agent verification process
      // In real implementation, this would call your backend API
      try {
        // Simulating the waiting period for agent verification
        await new Promise(resolve => setTimeout(resolve, 3000))

        // After successful verification
        setVerificationStatus('approved')

        // Wait a moment to show success before completing
        await new Promise(resolve => setTimeout(resolve, 1500))
        onComplete()
      } catch (error) {
        setVerificationStatus('rejected')
        setIsVerifying(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg px-6 sm:px-8 py-8 sm:py-10 text-center shadow-xl">

        {/* Loading/Waiting State */}
        {verificationStatus === 'pending' && (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Waiting for Agent Verification
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while your agent verifies your registration.<br />
              This may take a few moments...
            </p>
            <div className="mt-6 flex justify-center gap-1">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        {/* Approved State */}
        {verificationStatus === 'approved' && (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Verification Successful!
            </h2>
            <p className="text-gray-500 text-sm">
              Your account has been verified. Redirecting...
            </p>
          </div>
        )}

        {/* Rejected State */}
        {verificationStatus === 'rejected' && (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Verification Failed
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Your verification was not approved. Please try again or contact support.
            </p>
            <button
              onClick={() => {
                setVerificationStatus('idle')
                setCode(['', '', '', '', '', ''])
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Initial/Idle State - OTP Input */}
        {verificationStatus === 'idle' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verify Email
            </h2>

            <p className="text-gray-500 text-sm mb-6 sm:mb-8">
              Please enter the 6 digits code that was sent to<br />
              <span className="font-medium text-gray-700">
                {email || ''}
              </span>
            </p>

            {/* OTP */}
            <div
              className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="
                    w-10 sm:w-12
                    h-10 sm:h-12
                    text-center
                    text-lg
                    font-semibold
                    border
                    border-gray-300
                    rounded-lg
                    focus:border-blue-500
                    focus:ring-1
                    focus:ring-blue-500
                    outline-none
                  "
                  inputMode="numeric"
                />
              ))}
            </div>

            {/* Resend code */}
            <p className="text-gray-500 text-sm mb-6 sm:mb-8">
              Didn't receive a code?{' '}
              <button className="text-blue-600 font-medium hover:underline">
                Resend
              </button>
            </p>

            {/* Verify button */}
            <button
              onClick={handleSubmit}
              disabled={code.some(d => !d) || isVerifying}
              className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Verify
            </button>

            {/* Cancel button */}
            <button
              onClick={onClose}
              className="block w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SellerEmailVerificationModal

