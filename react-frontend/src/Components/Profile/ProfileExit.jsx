import { useState } from 'react';
import Header from '../Header/Header';

export default function EmployeeExitForm() {
  const [activeTab, setActiveTab] = useState('Exit');
  const [leaveEncashed, setLeaveEncashed] = useState('');

  return (
    <>
    <Header/>
    <div className="max-w-7xl mt-4 mx-auto bg-white min-h-screen">
      {/* Navigation Tabs */}
    

      {/* Form Content */}
      <div className="p-8">
        {/* Top Row - 3 columns */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Resignation Letter Date
            </label>
            <input
              type="text"
              className="w-full h-10 px-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Exit Interview Held On
            </label>
            <input
              type="text"
              className="w-full h-10 px-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Leave Encashed?
            </label>
            <select
              value={leaveEncashed}
              onChange={(e) => setLeaveEncashed(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded bg-white appearance-none"
            >
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Bottom Row - 2 columns + empty */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Relieving Date
            </label>
            <input
              type="text"
              className="w-full h-10 px-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              New Workplace
            </label>
            <input
              type="text"
              className="w-full h-10 px-3 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div></div>
        </div>

        {/* Feedback Section */}
        <div>
          <h2 className="text-lg text-gray-900 font-normal mb-8">Feedback</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Reason for Leaving
              </label>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Feedback
              </label>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}