import React from 'react';
import Header from "../Header/Header";

const ProfileSalary = () => {
  return (
<>
<Header/>
    <div className="w-full max-w-5xl mt-4 mx-auto bg-white p-6 border border-gray-200 rounded">
      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Cost to Company (CTC) */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Cost to Company (CTC)
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
              0.00
            </div>
          </div>

          {/* Salary Currency */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Salary Currency
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
              INR
            </div>
          </div>

          {/* Salary Mode */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Salary Mode
            </div>
            <div className="relative">
              <select className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 appearance-none cursor-pointer">
                <option value=""></option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* UAN No. */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              UAN No.
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* PF Acc.No. */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              PF Acc.No.
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payroll Cost Center */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Payroll Cost Center
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* PAN Number */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              PAN Number
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* Provident Fund Account */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Provident Fund Account
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* Aadhaar No. */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Aadhaar No.
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* Driving License */}
          <div>
            <div className="text-sm text-gray-700 mb-2 flex items-center">
              Driving License
              <span className="ml-1 text-red-500">*</span>
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 flex items-center">
              4335
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details Section */}
      <div className="mt-10">
        <h3 className="text-base font-medium text-gray-900 mb-6">Bank Details</h3>
        
        <div className="grid grid-cols-2 gap-16">
          {/* Account Holder Name */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Account Holder Name
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* Pay Method */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Pay Method
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
     </>
  );
};

export default ProfileSalary;