import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Link,
  Image,
  Table,
  ChevronDown,
  ChevronRight,
  Edit
} from 'lucide-react';
import Header from '../Header/Header';

export default function BioCoverLetterEditor() {
  const [bioText, setBioText] = useState('');
  const [fontStyle, setFontStyle] = useState('Normal');
  const [fontSize, setFontSize] = useState('---');
  const [tableOption, setTableOption] = useState('Table');
  const [educationExpanded, setEducationExpanded] = useState(false);
  const [workExpanded, setWorkExpanded] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  
  // State for managing rows
  const [educationRows, setEducationRows] = useState([]);
  const [workRows, setWorkRows] = useState([]);
  const [historyRows, setHistoryRows] = useState([]);

  const handleTextareaChange = (e) => {
    setBioText(e.target.value);
  };

  const addEducationRow = () => {
    const newRow = {
      id: Date.now(),
      schoolUniversity: 'School/University',
      qualification: 'Qualification',
      level: 'Graduate',
      yearOfPassing: 'Year of Passing',
      classPercentage: 'Class / Percentage',
      majorSubjects: 'Major/Optional Subjects'
    };
    setEducationRows([...educationRows, newRow]);
  };

  const updateEducationRow = (id, field, value) => {
    setEducationRows(educationRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const addWorkRow = () => {
    const newRow = {
      id: Date.now(),
      company: '',
      designation: '',
      salary: '₹ 0.00',
      address: ''
    };
    setWorkRows([...workRows, newRow]);
  };

  const updateWorkRow = (id, field, value) => {
    setWorkRows(workRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const addHistoryRow = () => {
    const newRow = {
      id: Date.now(),
      branch: '',
      department: '',
      designation: '',
      fromDate: '',
      toDate: ''
    };
    setHistoryRows([...historyRows, newRow]);
  };

  const updateHistoryRow = (id, field, value) => {
    setHistoryRows(historyRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <>
    <Header/>
    <div className="max-w-6xl mx-auto mt-4 bg-white p-6">
      {/* Header */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Bio / Cover Letter</h2>

      {/* Rich Text Editor Toolbar */}
      <div className="border border-gray-300 rounded-t-md">
        <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
          {/* Font Style Dropdown */}
          <select 
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white min-w-20"
          >
            <option value="Normal">Normal</option>
            <option value="Heading 1">Heading 1</option>
            <option value="Heading 2">Heading 2</option>
            <option value="Heading 3">Heading 3</option>
          </select>

          {/* Font Size Dropdown */}
          <select 
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white min-w-16"
          >
            <option value="---">---</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="20">20</option>
          </select>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Text Formatting Buttons */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Bold className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Italic className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Underline className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Strikethrough className="h-4 w-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Text Color Button */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
          </button>

          {/* Background Color Button */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <div className="w-4 h-4 bg-yellow-300 border border-gray-400"></div>
          </button>

          {/* Quote Button */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <span className="text-lg">"</span>
          </button>

          {/* Code Button */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <span className="text-sm font-mono">&lt;/&gt;</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Insert Buttons */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs">¶</span>
            </div>
          </button>

          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Link className="h-4 w-4" />
          </button>

          <button className="p-1.5 hover:bg-gray-200 rounded">
            <Image className="h-4 w-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* List Buttons */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <List className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <ListOrdered className="h-4 w-4" />
          </button>

          {/* Indent Buttons */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <div className="w-4 h-4 flex items-center justify-center">
              <span className="text-xs">⇤</span>
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Alignment Buttons */}
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <AlignLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <AlignCenter className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-200 rounded">
            <AlignRight className="h-4 w-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Table Dropdown */}
          <select 
            value={tableOption}
            onChange={(e) => setTableOption(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm bg-white min-w-20"
          >
            <option value="Table">Table</option>
            <option value="Insert Table">Insert Table</option>
            <option value="Table Properties">Table Properties</option>
          </select>
        </div>

        {/* Text Editor Area */}
        <div className="relative">
          <textarea
            value={bioText}
            onChange={handleTextareaChange}
            className="w-full h-64 p-4 resize-none border-0 focus:outline-none"
            placeholder="Start typing..."
          />
         
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-sm text-gray-500 mt-2 mb-8">
        Short biography for website and other publications.
      </p>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Educational Qualification */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => setEducationExpanded(!educationExpanded)}
            className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-700 mb-4"
          >
            {educationExpanded ? (
              <ChevronDown className="h-5 w-5 mr-2" />
            ) : (
              <ChevronRight className="h-5 w-5 mr-2" />
            )}
            Educational Qualification
          </button>
          
          {educationExpanded && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">Education</p>
              
              {/* Table */}
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="w-12 p-3 text-left">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">No.</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">School/University</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Qualification</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Level</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Year of P...</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Class / P...</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Major/Optional Subjects</th>
                      <th className="w-12 p-3 text-center text-sm font-medium text-gray-700">⚙</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationRows.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="p-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                              <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                                <div className="w-2 h-2 border border-gray-300"></div>
                                <div className="w-2 h-1 border-t border-gray-300 ml-1"></div>
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm">No Data</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      educationRows.map((row, index) => (
                        <tr key={row.id} className="border-b border-gray-100">
                          <td className="p-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="p-3 text-sm text-gray-900">{index + 1}</td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.schoolUniversity}
                              onChange={(e) => updateEducationRow(row.id, 'schoolUniversity', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.qualification}
                              onChange={(e) => updateEducationRow(row.id, 'qualification', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <select 
                              value={row.level}
                              onChange={(e) => updateEducationRow(row.id, 'level', e.target.value)}
                              className="text-sm text-gray-900 bg-transparent border-none focus:outline-none"
                            >
                              <option value="Graduate">Graduate</option>
                              <option value="Post Graduate">Post Graduate</option>
                              <option value="Doctorate">Doctorate</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.yearOfPassing}
                              onChange={(e) => updateEducationRow(row.id, 'yearOfPassing', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.classPercentage}
                              onChange={(e) => updateEducationRow(row.id, 'classPercentage', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.majorSubjects}
                              onChange={(e) => updateEducationRow(row.id, 'majorSubjects', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={addEducationRow}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Add Row
              </button>
            </div>
          )}
        </div>

        {/* Previous Work Experience */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => setWorkExpanded(!workExpanded)}
            className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-700 mb-4"
          >
            {workExpanded ? (
              <ChevronDown className="h-5 w-5 mr-2" />
            ) : (
              <ChevronRight className="h-5 w-5 mr-2" />
            )}
            Previous Work Experience
          </button>
          
          {workExpanded && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">External Work History</p>
              
              {/* Table */}
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="w-12 p-3 text-left">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">No.</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Company</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Designation</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Salary</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Address</th>
                      <th className="w-12 p-3 text-center text-sm font-medium text-gray-700">⚙</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workRows.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                              <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                                <div className="w-2 h-2 border border-gray-300"></div>
                                <div className="w-2 h-1 border-t border-gray-300 ml-1"></div>
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm">No Data</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      workRows.map((row, index) => (
                        <tr key={row.id} className="border-b border-gray-100">
                          <td className="p-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="p-3 text-sm text-gray-900">{index + 1}</td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.company}
                              onChange={(e) => updateWorkRow(row.id, 'company', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Company"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.designation}
                              onChange={(e) => updateWorkRow(row.id, 'designation', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Designation"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.salary}
                              onChange={(e) => updateWorkRow(row.id, 'salary', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.address}
                              onChange={(e) => updateWorkRow(row.id, 'address', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Address"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={addWorkRow}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Add Row
              </button>
            </div>
          )}
        </div>

        {/* History In Company */}
        <div className="pb-6">
          <button
            onClick={() => setHistoryExpanded(!historyExpanded)}
            className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-700 mb-4"
          >
            {historyExpanded ? (
              <ChevronDown className="h-5 w-5 mr-2" />
            ) : (
              <ChevronRight className="h-5 w-5 mr-2" />
            )}
            History In Company
          </button>
          
          {historyExpanded && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">Internal Work History</p>
              
              {/* Table */}
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="w-12 p-3 text-left">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">No.</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Branch</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Department</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">Designation</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">From Date</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-700">To Date</th>
                      <th className="w-12 p-3 text-center text-sm font-medium text-gray-700">⚙</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRows.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-12 text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                              <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                                <div className="w-2 h-2 border border-gray-300"></div>
                                <div className="w-2 h-1 border-t border-gray-300 ml-1"></div>
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm">No Data</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      historyRows.map((row, index) => (
                        <tr key={row.id} className="border-b border-gray-100">
                          <td className="p-3">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="p-3 text-sm text-gray-900">{index + 1}</td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.branch}
                              onChange={(e) => updateHistoryRow(row.id, 'branch', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Branch"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.department}
                              onChange={(e) => updateHistoryRow(row.id, 'department', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Department"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.designation}
                              onChange={(e) => updateHistoryRow(row.id, 'designation', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                              placeholder="Designation"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="date"
                              value={row.fromDate}
                              onChange={(e) => updateHistoryRow(row.id, 'fromDate', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="date"
                              value={row.toDate}
                              onChange={(e) => updateHistoryRow(row.id, 'toDate', e.target.value)}
                              className="w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <button 
                onClick={addHistoryRow}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Add Row
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save
        </button>
      </div>
    </div>
     </>
  );
}