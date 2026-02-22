import { useState, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable Forgot Password flow:
 * 1. Email input → Send code
 * 2. Code verification modal (6 digits)
 * 3. New password modal
 */
function PasswordResetFlow({ portalName, loginPath, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'code' | 'password'
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const codeInputRefs = useRef([]);

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    // TODO: API call to send verification code to email
    setStep('code');
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const onlyDigit = value.replace(/\D/g, '');
    const newCode = [...code];
    newCode[index] = onlyDigit;
    setCode(newCode);
    if (onlyDigit && index < 5) codeInputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }
    // TODO: API call to verify code
    setStep('password');
  };

  const handleResendCode = (e) => {
    e.preventDefault();
    setError('');
    // TODO: API call to resend code
    setCode(['', '', '', '', '', '']);
    codeInputRefs.current[0]?.focus();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // TODO: API call to reset password
    onBackToLogin?.();
  };

  const handleCancel = () => {
    setStep('code');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <img src="/evoplay.svg" alt="EvoPlay Logo" className="h-32 sm:h-40 w-auto object-contain" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[#414759] mt-6 mb-2">
          Password Reset
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your email to receive a verification code
        </p>

        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Code
            </button>
          </form>
        )}

        {/* Code Verification Modal */}
        {step === 'code' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Password Reset</h3>
              <p className="text-gray-500 text-sm mb-6">
                Please enter the 6 digit code that was sent to {email}.
              </p>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (codeInputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Verify
                </button>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Resend code
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep('email'); setCode(['', '', '', '', '', '']); setError(''); }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Use different email
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* New Password Modal */}
        {step === 'password' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Password Reset</h3>
              </div>
              <form onSubmit={handleResetPassword} className="p-6">
                <p className="text-gray-500 text-sm mb-6">
                  Enter a new password below to reset your password.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                <div className="mt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full py-3 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to {portalName} Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default PasswordResetFlow;
