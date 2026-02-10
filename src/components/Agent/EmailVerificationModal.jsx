import { useState, useRef, useEffect } from 'react'

function EmailVerificationModal({ isOpen, onClose, onVerify, email }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
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

  const handleSubmit = () => {
    const verificationCode = code.join('')
    if (verificationCode.length === 6) {
      onVerify(verificationCode)
    }
  }

  if (!isOpen) return null

  return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl w-full max-w-lg px-8 py-10 text-center shadow-xl">

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Verify Email
          </h2>

          <p className="text-gray-500 text-sm mb-8">
            Please enter the 6 digits code that was sent to<br />
            <span className="font-medium text-gray-700">
            {email || ''}
          </span>
          </p>

          {/* OTP */}
          <div
              className="flex justify-center gap-3 mb-8"
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
                w-12
                h-12
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

          {/* Button */}
          <button
              onClick={handleSubmit}
              disabled={code.join('').length !== 6}
              className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-300
            text-white
            font-medium
            py-3
            rounded-full
            transition
            mb-4
          "
          >
            Verify
          </button>

          {/* Resend */}
          <button className="text-sm text-blue-600 hover:underline">
            Resend code
          </button>
        </div>
      </div>
  )
}

export default EmailVerificationModal
