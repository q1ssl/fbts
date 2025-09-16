import React from 'react';
import Header from "../Header/Header";

const ProfileAttendance = () => {
  return (
    <> 
    <Header/>
    <div className="w-full mt-4 max-w-5xl mx-auto bg-white p-6">
      <div className="grid grid-cols-2 gap-16">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Attendance Device ID */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Attendance Device ID (Biometric/RF tag ID)
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-400"></div>
          </div>

          {/* Approvers Section */}
          <div className="mt-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">Approvers</h3>
            
            {/* Expense Approver */}
            <div className="mb-4">
              <div className="text-sm text-gray-700 mb-2">
                Expense Approver
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
                akash@gmail.com
              </div>
            </div>

            {/* Leave Approver */}
            <div>
              <div className="text-sm text-gray-700 mb-2">
                Leave Approver
              </div>
              <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
                abdul@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Holiday List */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Holiday List
            </div>
            <div className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded text-gray-800 flex items-center">
              Vinco Sales And Services Pvt Ltd
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Applicable Holiday List
            </div>
          </div>

          {/* Default Shift */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Default Shift
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded"></div>
          </div>

          {/* Shift Request Approver */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Shift Request Approver
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
              ajay@gmail.com
            </div>
          </div>

          {/* Regularise Approver */}
          <div>
            <div className="text-sm text-gray-700 mb-2">
              Regularise Approver
            </div>
            <div className="w-full h-10 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center">
              ajit@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
     </>
  );
};

export default ProfileAttendance;