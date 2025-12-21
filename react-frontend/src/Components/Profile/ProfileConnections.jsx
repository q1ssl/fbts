import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';

export default function ActivityConnectionsPage() {
  const [activityExpanded, setActivityExpanded] = useState(true);
  const [connectionsExpanded, setConnectionsExpanded] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2025');

  const months = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate calendar dates for each month
  const generateCalendarDates = (year) => {
    const monthData = {
      'SEP': { year: parseInt(year) - 1, month: 8, days: 30 },
      'OCT': { year: parseInt(year) - 1, month: 9, days: 31 },
      'NOV': { year: parseInt(year) - 1, month: 10, days: 30 },
      'DEC': { year: parseInt(year) - 1, month: 11, days: 31 },
      'JAN': { year: parseInt(year), month: 0, days: 31 },
      'FEB': { year: parseInt(year), month: 1, days: 28 },
      'MAR': { year: parseInt(year), month: 2, days: 31 },
      'APR': { year: parseInt(year), month: 3, days: 30 },
      'MAY': { year: parseInt(year), month: 4, days: 31 },
      'JUN': { year: parseInt(year), month: 5, days: 30 },
      'JUL': { year: parseInt(year), month: 6, days: 31 },
      'AUG': { year: parseInt(year), month: 7, days: 31 }
    };

    const calendar = [];
    dayLabels.forEach(dayLabel => {
      const row = [];
      months.forEach(monthKey => {
        const monthInfo = monthData[monthKey];
        const monthDates = [];
        
        for (let date = 1; date <= monthInfo.days; date++) {
          const dateObj = new Date(monthInfo.year, monthInfo.month, date);
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          
          if (dayName === dayLabel) {
            monthDates.push(date);
          }
        }
        row.push(monthDates);
      });
      calendar.push(row);
    });
    
    return calendar;
  };

  const calendarData = generateCalendarDates(selectedYear);

  return (
    <div className="max-w-7xl mx-auto bg-white p-6">
      {/* Activity Section */}
      <div className="mb-8">
        <button
          onClick={() => setActivityExpanded(!activityExpanded)}
          className="flex items-center text-lg font-medium text-gray-900 mb-4"
        >
          Activity
          {activityExpanded ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </button>

        {activityExpanded && (
          <div className="bg-white">
            {/* Year Selector */}
            <div className="mb-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>

            {/* Calendar Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <td className="w-12 py-2"></td>
                    {months.map((month) => (
                      <td key={month} className="text-xs font-medium text-gray-600 text-center py-2 px-4 min-w-20">
                        {month}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayLabels.map((day, dayIndex) => (
                    <tr key={day} className="border-t border-gray-100">
                      <td className="text-xs font-medium text-gray-600 py-3 pr-4 text-left">
                        {day}
                      </td>
                      {calendarData[dayIndex].map((monthDates, monthIndex) => (
                        <td key={`${day}-${months[monthIndex]}`} className="py-3 px-4">
                          <div className="flex flex-wrap gap-0.5">
                            {monthDates.map((date, dateIndex) => (
                              <div
                                key={dateIndex}
                                className="w-2 h-2 bg-gray-300 text-xs flex items-center justify-center"
                                title={`${months[monthIndex]} ${date}`}
                              >
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              This is based on the attendance of this Employee
            </p>
          </div>
        )}
      </div>

      {/* Connections Section */}
      <div>
        <button
          onClick={() => setConnectionsExpanded(!connectionsExpanded)}
          className="flex items-center text-lg font-medium text-gray-900 mb-6"
        >
          Connections
          {connectionsExpanded ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </button>

        {connectionsExpanded && (
          <div className="grid grid-cols-3 gap-12">
            {/* Attendance Column */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Attendance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      10
                    </span>
                    <span className="text-sm text-gray-700">Attendance</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      1
                    </span>
                    <span className="text-sm text-gray-700">Attendance Request</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      72
                    </span>
                    <span className="text-sm text-gray-700">Employee Checkin</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Leave Column */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Leave</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      15
                    </span>
                    <span className="text-sm text-gray-700">Leave Application</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      11
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded mr-3">
                      4
                    </span>
                    <span className="text-sm text-gray-700">Leave Allocation</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Leave Policy Assignment</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lifecycle Column */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Lifecycle</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Employee Onboarding</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Employee Transfer</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Employee Promotion</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}