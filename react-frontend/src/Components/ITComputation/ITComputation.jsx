import React, { useState } from 'react';
import { Mail, Send, Loader2, CheckCircle, AlertCircle, ArrowLeft, Key } from 'lucide-react';

const ITCompensation = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [validatingOtp, setValidatingOtp] = useState(false);
  const [generateResponse, setGenerateResponse] = useState(null);
  const [validateResponse, setValidateResponse] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1 for generate, 2 for validate

  const handleReset = () => {
    setEmail('');
    setOtp('');
    setGenerateResponse(null);
    setValidateResponse(null);
    setError(null);
    setStep(1);
  };

  const handleBackToGenerate = () => {
    setOtp('');
    setValidateResponse(null);
    setError(null);
    setStep(1);
  };

  const handleGenerateOTP = async () => {
    if (!email) {
        setError('Please enter an email address');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address');
        return;
    }

    setLoading(true);
    setError(null);
    setGenerateResponse(null); // Fixed: was setResponse(null)

    try {
        const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_id: email
        })
        });

        const data = await apiResponse.json();

        if (apiResponse.ok) {
        setGenerateResponse(data);
        setStep(2); // Move to validation step
        } else {
        setError(data.message || 'Failed to generate OTP');
        }
    } catch (err) {
        setError('Network error. Please check your connection and try again.');
        console.error('API Error:', err);
    } finally {
        setLoading(false);
    }
  };

  const handleValidateOTP = async () => {
    if (!otp) {
        setError('Please enter the OTP');
        return;
    }

    if (otp.length < 4) {
        setError('Please enter a valid OTP');
        return;
    }

    setValidatingOtp(true);
    setError(null);
    setValidateResponse(null);

    try {
        const apiResponse = await fetch('https://fbts.flamingohrms.com/api/method/fbts.api.auth.validate_otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_id: email,
            otp: otp
        })
        });

        const data = await apiResponse.json();

        if (apiResponse.ok) {
        setValidateResponse(data);
        } else {
        setError(data.message || 'Failed to validate OTP');
        }
    } catch (err) {
        setError('Network error. Please check your connection and try again.');
        console.error('API Error:', err);
    } finally {
        setValidatingOtp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-pink-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {step === 1 ? (
              <Mail className="text-pink-600" size={24} />
            ) : (
              <Key className="text-pink-600" size={24} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 1 ? 'Generate OTP' : 'Validate OTP'}
          </h1>
          <p className="text-gray-600">
            {step === 1 
              ? 'Enter your email address to receive an OTP' 
              : `Enter the OTP sent to ${email}`
            }
          </p>
        </div>

        {step === 1 ? (
          // Generate OTP Step
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerateOTP()}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              onClick={handleGenerateOTP}
              disabled={loading || !email}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating OTP...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Generate OTP
                </>
              )}
            </button>
          </div>
        ) : (
          // Validate OTP Step
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors text-center text-lg tracking-widest"
                  disabled={validatingOtp}
                  onKeyPress={(e) => e.key === 'Enter' && handleValidateOTP()}
                  maxLength={6}
                />
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBackToGenerate}
                disabled={validatingOtp}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              
              <button
                onClick={handleValidateOTP}
                disabled={validatingOtp || !otp}
                className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {validatingOtp ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Validating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} />
                    Validate OTP
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle size={18} />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1 text-sm">{error}</p>
          </div>
        )}

        {generateResponse && step === 2 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle size={18} />
              <span className="font-medium">OTP Generated Successfully</span>
            </div>
            <div className="text-sm text-green-700">
              <p className="mb-1">OTP has been sent to your email. Please check your inbox and enter the code above.</p>
              <details className="mt-2">
                <summary className="font-medium cursor-pointer hover:text-green-800">▶ View API Response</summary>
                <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto mt-2">
                  {JSON.stringify(generateResponse, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {validateResponse && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle size={18} />
              <span className="font-medium">OTP Validated Successfully!</span>
            </div>
            <div className="text-sm text-green-700">
              <p className="font-medium mb-1">Validation Response:</p>
              <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(validateResponse, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {(generateResponse || validateResponse || error) && (
          <button
            onClick={handleReset}
            className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Start Over
          </button>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            {step === 1 
              ? 'API: fbts.flamingohrms.com/api/method/fbts.api.auth.generate_otp'
              : 'API: fbts.flamingohrms.com/api/method/fbts.api.auth.validate_otp'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ITCompensation;