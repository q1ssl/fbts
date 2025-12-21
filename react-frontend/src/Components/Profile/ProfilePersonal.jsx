import React, { useState } from 'react';
import Header from '../Header/Header';

const ProfilePersonal = () => {
  const [healthInsuranceOpen, setHealthInsuranceOpen] = useState(false);

  return (
    <> 
    <Header/> 
    <div className="w-full max-w-5xl mt-4 mx-auto bg-white p-6">
      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Marital Status */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Marital Status
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

          {/* Family Background */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Family Background
            </div>
            <textarea 
              className="w-full h-32 px-3 py-2 bg-gray-100 border border-gray-300 rounded resize-none"
              placeholder=""
            />
            <div className="text-xs text-gray-500 mt-1">
              Here you can maintain family details like name and occupation of parent, spouse and children
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Blood Group */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Blood Group
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

          {/* Health Details */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Health Details
            </div>
            <textarea 
              className="w-full h-32 px-3 py-2 bg-gray-100 border border-gray-300 rounded resize-none"
              placeholder=""
            />
            <div className="text-xs text-gray-500 mt-1">
              Here you can maintain height, weight, allergies, medical concerns etc
            </div>
          </div>
        </div>
      </div>

      {/* Health Insurance Section */}
      <div className="mt-8">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setHealthInsuranceOpen(!healthInsuranceOpen)}
        >
          <h3 className="text-base font-medium text-gray-900">Health Insurance</h3>
          <svg 
            className={`w-4 h-4 ml-2 transform transition-transform ${healthInsuranceOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Passport Details Section */}
      <div className="mt-8">
        <h3 className="text-base font-medium text-gray-900 mb-6">Passport Details</h3>
        
        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6">
            {/* Passport Number */}
            <div>
              <div className="text-sm text-gray-700 mb-2">
                Passport Number
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
            </div>

            {/* Valid Upto */}
            <div>
              <div className="text-sm text-gray-700 mb-2">
                Valid Upto
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Date of Issue */}
            <div>
              <div className="text-sm text-gray-700 mb-2">
                Date of Issue
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
            </div>

            {/* Place of Issue */}
            <div>
              <div className="text-sm text-gray-700 mb-2">
                Place of Issue
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePersonal