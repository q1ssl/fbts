// // import React, { useState, useEffect } from 'react';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   return (
// //     <>
// //    <Header/>
// //     <div className="leave-balance-container">
// //       <h2 className="leave-balance-title">Leave Balance</h2>

// //       {loading ? (
// //         <div className="loading">Loading leave balances...</div>
// //       ) : leaveData.length > 0 ? (
// //         <div className="leave-balance-items">
// //           {leaveData.map((leave, index) => (
// //             <div key={index} className="leave-balance-item">
// //               <span className="leave-type">{leave.leave_type}</span>
// //               <span className="leave-count">{leave.total}</span>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="no-records">No leave data available</div>
// //       )}
// //     </div>
// //      </>
// //   );
// // };

// // export default MyLeave;






// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Link } from 'react-router-dom';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';
// // import { 
// //   Search, Filter, Clock, X, 
// //   ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
// //   Users, Building, AlertCircle 
// // } from 'lucide-react';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // Table state management
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Filter states
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [departmentFilter, setDepartmentFilter] = useState('all');
// //   const [priorityFilter, setPriorityFilter] = useState('all');
// //   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
// //   const [dateFilter, setDateFilter] = useState('all');
  
// //   // Sort states
// //   const [sortBy, setSortBy] = useState('fromDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   // Mock data for attendance requests
// //   const mockData = [
// //     {
// //       id: 'HR-ARQ-25-07-001',
// //       employeeName: 'Developer Daiyan',
// //       status: 'Submitted',
// //       employeeId: 'FI-00001',
// //       department: 'Engineering',
// //       reason: 'Sick Leave',
// //       requestType: 'Sick Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-002',
// //       employeeName: 'Sarah Wilson',
// //       status: 'Approved',
// //       employeeId: 'FI-00002',
// //       department: 'Marketing',
// //       reason: 'Medical Appointment',
// //       requestType: 'Casual Leave',
// //       priority: 'Medium',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-20',
// //       duration: '4 hours'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-003',
// //       employeeName: 'John Smith',
// //       status: 'Pending',
// //       employeeId: 'FI-00003',
// //       department: 'Sales',
// //       reason: 'Personal Emergency',
// //       requestType: 'Earned Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-21',
// //       duration: '1 day'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-004',
// //       employeeName: 'Emma Johnson',
// //       status: 'Rejected',
// //       employeeId: 'FI-00004',
// //       department: 'HR',
// //       reason: 'Vacation Request',
// //       requestType: 'Privilege Leave',
// //       priority: 'Low',
// //       fromDate: '2025-08-19',
// //       toDate: '2025-08-25',
// //       duration: '7 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-005',
// //       employeeName: 'Michael Brown',
// //       status: 'Submitted',
// //       employeeId: 'FI-00005',
// //       department: 'Finance',
// //       reason: 'Family Event',
// //       requestType: 'Compensatory Off',
// //       priority: 'Medium',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-23',
// //       duration: '3 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-006',
// //       employeeName: 'Lisa Davis',
// //       status: 'Approved',
// //       employeeId: 'FI-00006',
// //       department: 'Engineering',
// //       reason: 'Maternity Leave',
// //       requestType: 'Maternity Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-18',
// //       toDate: '2025-11-15',
// //       duration: '90 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-007',
// //       employeeName: 'Robert Garcia',
// //       status: 'Pending',
// //       employeeId: 'FI-00007',
// //       department: 'Operations',
// //       reason: 'Extended Leave',
// //       requestType: 'Leave Without Pay',
// //       priority: 'Low',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-24',
// //       duration: '5 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-008',
// //       employeeName: 'Jennifer Lee',
// //       status: 'Submitted',
// //       employeeId: 'FI-00008',
// //       department: 'Marketing',
// //       reason: 'Personal Work',
// //       requestType: 'Casual Leave',
// //       priority: 'Medium',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     }
// //   ];

// //   // Get unique values for filters
// //   const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
// //   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   // Filter and sort data
// //   const filteredData = useMemo(() => {
// //     let result = [...mockData];

// //     // Search filter
// //     if (searchTerm) {
// //       const search = searchTerm.toLowerCase();
// //       result = result.filter(item =>
// //         item.employeeName.toLowerCase().includes(search) ||
// //         item.employeeId.toLowerCase().includes(search) ||
// //         item.id.toLowerCase().includes(search) ||
// //         item.department.toLowerCase().includes(search) ||
// //         item.requestType.toLowerCase().includes(search)
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       result = result.filter(item => item.status === statusFilter);
// //     }

// //     // Department filter
// //     if (departmentFilter !== 'all') {
// //       result = result.filter(item => item.department === departmentFilter);
// //     }

// //     // Priority filter
// //     if (priorityFilter !== 'all') {
// //       result = result.filter(item => item.priority === priorityFilter);
// //     }

// //     // Request type filter
// //     if (requestTypeFilter !== 'all') {
// //       result = result.filter(item => item.requestType === requestTypeFilter);
// //     }

// //     // Date filter
// //     if (dateFilter !== 'all') {
// //       const now = new Date();
// //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
// //       result = result.filter(item => {
// //         const itemDate = new Date(item.fromDate);
// //         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
// //         switch (dateFilter) {
// //           case 'today': return daysDiff === 0;
// //           case 'yesterday': return daysDiff === 1;
// //           case 'last7days': return daysDiff <= 7;
// //           case 'last30days': return daysDiff <= 30;
// //           case 'thisweek':
// //             const startOfWeek = new Date(today);
// //             startOfWeek.setDate(today.getDate() - today.getDay());
// //             return itemDate >= startOfWeek;
// //           case 'thismonth':
// //             return itemDate.getMonth() === today.getMonth() && 
// //                    itemDate.getFullYear() === today.getFullYear();
// //           default: return true;
// //         }
// //       });
// //     }

// //     // Sort
// //     result.sort((a, b) => {
// //       let aVal, bVal;
      
// //       switch (sortBy) {
// //         case 'employeeName':
// //           aVal = a.employeeName.toLowerCase();
// //           bVal = b.employeeName.toLowerCase();
// //           break;
// //         case 'status':
// //           aVal = a.status.toLowerCase();
// //           bVal = b.status.toLowerCase();
// //           break;
// //         case 'employeeId':
// //           aVal = a.employeeId.toLowerCase();
// //           bVal = b.employeeId.toLowerCase();
// //           break;
// //         case 'fromDate':
// //           aVal = new Date(a.fromDate);
// //           bVal = new Date(b.fromDate);
// //           break;
// //         default:
// //           aVal = a[sortBy];
// //           bVal = b[sortBy];
// //       }

// //       if (sortOrder === 'asc') {
// //         return aVal > bVal ? 1 : -1;
// //       } else {
// //         return aVal < bVal ? 1 : -1;
// //       }
// //     });

// //     return result;
// //   }, [searchTerm, statusFilter, departmentFilter, priorityFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
// //       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
// //       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
// //       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const getPriorityColor = (priority) => {
// //     switch (priority) {
// //       case 'High': return 'bg-red-100 text-red-700 border-red-200';
// //       case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
// //       case 'Low': return 'bg-green-100 text-green-700 border-green-200';
// //       default: return 'bg-gray-100 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const handleSort = (column) => {
// //     if (sortBy === column) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //     } else {
// //       setSortBy(column);
// //       setSortOrder('asc');
// //     }
// //   };

// //   const getSortIcon = (column) => {
// //     if (sortBy !== column) return null;
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="w-3 h-3" /> : 
// //       <ChevronDown className="w-3 h-3" />;
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setStatusFilter('all');
// //     setDepartmentFilter('all');
// //     setPriorityFilter('all');
// //     setRequestTypeFilter('all');
// //     setDateFilter('all');
// //     setCurrentPage(1);
// //   };

// //   const toggleRowSelection = (id) => {
// //     const newSelected = new Set(selectedRows);
// //     if (newSelected.has(id)) {
// //       newSelected.delete(id);
// //     } else {
// //       newSelected.add(id);
// //     }
// //     setSelectedRows(newSelected);
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
// //       setSelectedRows(new Set());
// //     } else {
// //       setSelectedRows(new Set(paginatedData.map(item => item.id)));
// //     }
// //   };

// //   const handleBulkAccept = () => {
// //     console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const handleBulkReject = () => {
// //     console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const activeFiltersCount = [
// //     statusFilter !== 'all',
// //     departmentFilter !== 'all', 
// //     priorityFilter !== 'all',
// //     requestTypeFilter !== 'all',
// //     dateFilter !== 'all',
// //     searchTerm.length > 0
// //   ].filter(Boolean).length;

// //   return (
// //     <>
// //       <Header/>
// //       {/* Leave Balance Section */}
// //       <div className="leave-balance-container">
// //         <h2 className="leave-balance-title">Leave Balance</h2>

// //         {loading ? (
// //           <div className="loading">Loading leave balances...</div>
// //         ) : leaveData.length > 0 ? (
// //           <div className="leave-balance-items">
// //             {leaveData.map((leave, index) => (
// //               <div key={index} className="leave-balance-item">
// //                 <span className="leave-type">{leave.leave_type}</span>
// //                 <span className="leave-count">{leave.total}</span>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="no-records">No leave data available</div>
// //         )}
// //       </div>

// //       {/* Attendance Requests Table Section */}
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
// //             {/* Top Header */}
// //             <div className="flex items-center justify-between p-3 border-b border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <h1 className="text-lg font-semibold text-gray-900">My Attendance Requests</h1>
// //               </div>
              
// //               {/* Always Visible Search Bar */}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-72 relative">
// //                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by employee name, ID, department, leave type..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
// //                     style={{ focusRingColor: '#ec4899' }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
// //                     >
// //                       <X className="w-2 h-2" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <Link 
// //                   to="/dashboard/regularise"
// //                   className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
// //                 >
// //                   <Plus className="w-3 h-3" />
// //                   Add Request
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Search Results Info */}
// //             {searchTerm && (
// //               <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
// //                 <div className="text-xs text-blue-700">
// //                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
// //                 </div>
// //               </div>
// //             )}

// //             {/* Filter Section */}
// //             <div className="border-b border-gray-200">
// //               {/* Filter Toggle Bar */}
// //               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={() => setShowFilter(!showFilter)}
// //                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
// //                       showFilter 
// //                         ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
// //                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
// //                     }`}
// //                     style={{ 
// //                       borderColor: showFilter ? '#ec4899' : undefined,
// //                       color: showFilter ? '#ec4899' : undefined,
// //                       backgroundColor: showFilter ? '#fdf2f8' : undefined
// //                     }}
// //                   >
// //                     <Filter className="w-2.5 h-2.5" />
// //                     <span className="font-medium">Filters</span>
// //                     {activeFiltersCount > 0 && (
// //                       <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
// //                         {activeFiltersCount}
// //                       </span>
// //                     )}
// //                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
// //                   </button>

// //                   <div className="h-4 w-px bg-gray-300"></div>

// //                   <div className="flex items-center gap-1.5">
// //                     <Clock className="w-3 h-3 text-gray-400" />
// //                     <span className="text-xs text-gray-600">Leave Requests</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="text-xs text-gray-600">
// //                     {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
// //                   </span>
// //                   <Calendar className="w-3 h-3 text-gray-400" />
// //                 </div>
// //               </div>

// //               {/* Advanced Filters Panel */}
// //               {showFilter && (
// //                 <div className="px-3 py-3 bg-white border-t border-gray-100">
// //                   <div className="space-y-3">
// //                     {/* Filter Grid */}
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
// //                       {/* Status Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Status
// //                         </label>
// //                         <select
// //                           value={statusFilter}
// //                           onChange={(e) => setStatusFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Status</option>
// //                           <option value="Submitted">Submitted</option>
// //                           <option value="Approved">Approved</option>
// //                           <option value="Pending">Pending</option>
// //                           <option value="Rejected">Rejected</option>
// //                         </select>
// //                       </div>

// //                       {/* Department Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Building className="w-3 h-3 text-gray-400" />
// //                           Department
// //                         </label>
// //                         <select
// //                           value={departmentFilter}
// //                           onChange={(e) => setDepartmentFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Departments</option>
// //                           {uniqueDepartments.map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Priority Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Priority
// //                         </label>
// //                         <select
// //                           value={priorityFilter}
// //                           onChange={(e) => setPriorityFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Priorities</option>
// //                           <option value="High">High</option>
// //                           <option value="Medium">Medium</option>
// //                           <option value="Low">Low</option>
// //                         </select>
// //                       </div>

// //                       {/* Request Type Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Users className="w-3 h-3 text-gray-400" />
// //                           Leave Type
// //                         </label>
// //                         <select
// //                           value={requestTypeFilter}
// //                           onChange={(e) => setRequestTypeFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Types</option>
// //                           {uniqueRequestTypes.map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Date Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Calendar className="w-3 h-3 text-gray-400" />
// //                           From Date Range
// //                         </label>
// //                         <select
// //                           value={dateFilter}
// //                           onChange={(e) => setDateFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Dates</option>
// //                           <option value="today">Today</option>
// //                           <option value="yesterday">Yesterday</option>
// //                           <option value="thisweek">This Week</option>
// //                           <option value="last7days">Last 7 Days</option>
// //                           <option value="thismonth">This Month</option>
// //                           <option value="last30days">Last 30 Days</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Filter Actions */}
// //                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
// //                       <div className="text-xs text-gray-500">
// //                         {activeFiltersCount > 0 ? (
// //                           <span className="flex items-center gap-1">
// //                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
// //                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
// //                           </span>
// //                         ) : (
// //                           'No filters applied'
// //                         )}
// //                       </div>
// //                       <div className="flex items-center gap-1.5">
// //                         <button
// //                           onClick={clearAllFilters}
// //                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
// //                         >
// //                           Clear All
// //                         </button>
// //                         <button
// //                           onClick={() => setShowFilter(false)}
// //                           className="px-2 py-1 text-xs text-white rounded transition-colors"
// //                           style={{ backgroundColor: '#ec4899' }}
// //                         >
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Bulk Actions Bar - Shows when items are selected */}
// //             {selectedRows.size > 0 && (
// //               <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xs font-medium text-pink-800">
// //                       {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
// //                     </span>
// //                     <button
// //                       onClick={() => setSelectedRows(new Set())}
// //                       className="text-xs text-pink-600 hover:text-pink-800 underline"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={handleBulkAccept}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
// //                     >
// //                       <Check className="w-4 h-4" />
// //                       Accept ({selectedRows.size})
// //                     </button>
// //                     <button
// //                       onClick={handleBulkReject}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
// //                     >
// //                       <XCircle className="w-4 h-4" />
// //                       Reject ({selectedRows.size})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="w-6 p-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
// //                         onChange={toggleSelectAll}
// //                         className="rounded border-gray-300 focus:ring-pink-500"
// //                         style={{ accentColor: '#ec4899' }}
// //                       />
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeId')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee ID
// //                         {getSortIcon('employeeId')}
// //                       </div>
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeName')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee Name
// //                         {getSortIcon('employeeName')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Status
// //                         {getSortIcon('status')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">From Date</div>
// //                     </th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">To Date</div>
// //                     </th>
// //                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {paginatedData.map((item) => (
// //                     <tr 
// //                       key={item.id} 
// //                       className={`hover:bg-gray-50 transition-colors ${
// //                         selectedRows.has(item.id) ? 'bg-pink-50' : ''
// //                       }`}
// //                       style={{ 
// //                         borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
// //                         borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
// //                       }}
// //                     >
// //                       <td className="p-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedRows.has(item.id)}
// //                           onChange={() => toggleRowSelection(item.id)}
// //                           className="rounded border-gray-300 focus:ring-pink-500"
// //                           style={{ accentColor: '#ec4899' }}
// //                         />
// //                       </td>
// //                       <td className="p-2">
// //                         <span className="text-gray-900 text-xs">{item.employeeId}</span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
// //                           <div className="flex items-center gap-1 mt-0.5">
// //                             <span className="text-xs text-gray-500">{item.department}</span>
// //                             <span className="text-xs text-gray-300">•</span>
// //                             <span className={`px-1 py-0.5 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
// //                               {item.priority}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="text-gray-600 text-xs font-mono">{item.id}</span>
// //                           <div className="text-xs text-gray-500">{item.duration}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <span 
// //                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
// //                           style={{ 
// //                             borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             color: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
// //                           }}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
// //                         <div className="text-xs text-gray-500">{item.duration}</div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.fromDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.fromDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.toDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.toDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="flex items-center justify-center gap-1">
// //                           <button 
// //                             className="text-gray-400 hover:text-green-600 rounded transition-colors" 
// //                             title="Accept Leave Request"
// //                             onClick={() => console.log('Accept Leave Request:', item.id)}
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </button>
// //                           <button 
// //                             className="text-gray-400 hover:text-red-600 rounded transition-colors" 
// //                             title="Reject Leave Request"
// //                             onClick={() => console.log('Reject Leave Request:', item.id)}
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>

// //               {/* Empty State */}
// //               {paginatedData.length === 0 && (
// //                 <div className="text-center py-8">
// //                   <Search className="mx-auto h-8 w-8 text-gray-400" />
// //                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {activeFiltersCount > 0 || searchTerm 
// //                       ? 'Try adjusting your search or filter criteria'
// //                       : 'No leave requests available'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-600">Show:</span>
// //                 {[20, 100, 500, 2500].map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => {
// //                       setItemsPerPage(size);
// //                       setCurrentPage(1);
// //                     }}
// //                     className={`px-1.5 py-0.5 text-xs rounded transition-colors border ${
// //                       itemsPerPage === size
// //                         ? 'text-white font-medium border-pink-500'
// //                         : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
// //                     }`}
// //                     style={{
// //                       backgroundColor: itemsPerPage === size ? '#ec4899' : 'transparent'
// //                     }}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-600">
// //                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
// //                 </span>
                
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Prev
// //                     </button>
                    
// //                     <div className="flex items-center gap-0.5">
// //                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                         const page = i + 1;
// //                         return (
// //                           <button
// //                             key={page}
// //                             onClick={() => setCurrentPage(page)}
// //                             className={`px-1.5 py-0.5 text-xs rounded transition-colors border ${
// //                               currentPage === page
// //                                 ? 'text-white font-medium border-pink-500'
// //                                 : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
// //                             }`}
// //                             style={{
// //                               backgroundColor: currentPage === page ? '#ec4899' : 'transparent'
// //                             }}
// //                           >
// //                             {page}
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
                    
// //                     <button
// //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MyLeave;





// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Link } from 'react-router-dom';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';
// // import { 
// //   Search, Filter, Clock, X, 
// //   ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
// //   Users, Building, AlertCircle 
// // } from 'lucide-react';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // Table state management
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Filter states
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [departmentFilter, setDepartmentFilter] = useState('all');
// //   const [priorityFilter, setPriorityFilter] = useState('all');
// //   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
// //   const [dateFilter, setDateFilter] = useState('all');
  
// //   // Sort states
// //   const [sortBy, setSortBy] = useState('fromDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   // Mock data for attendance requests
// //   const mockData = [
// //     {
// //       id: 'HR-ARQ-25-07-001',
// //       employeeName: 'Developer Daiyan',
// //       status: 'Submitted',
// //       employeeId: 'FI-00001',
// //       department: 'Engineering',
// //       reason: 'Sick Leave',
// //       requestType: 'Sick Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-002',
// //       employeeName: 'Sarah Wilson',
// //       status: 'Approved',
// //       employeeId: 'FI-00002',
// //       department: 'Marketing',
// //       reason: 'Medical Appointment',
// //       requestType: 'Casual Leave',
// //       priority: 'Medium',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-20',
// //       duration: '4 hours'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-003',
// //       employeeName: 'John Smith',
// //       status: 'Pending',
// //       employeeId: 'FI-00003',
// //       department: 'Sales',
// //       reason: 'Personal Emergency',
// //       requestType: 'Earned Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-21',
// //       duration: '1 day'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-004',
// //       employeeName: 'Emma Johnson',
// //       status: 'Rejected',
// //       employeeId: 'FI-00004',
// //       department: 'HR',
// //       reason: 'Vacation Request',
// //       requestType: 'Privilege Leave',
// //       priority: 'Low',
// //       fromDate: '2025-08-19',
// //       toDate: '2025-08-25',
// //       duration: '7 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-005',
// //       employeeName: 'Michael Brown',
// //       status: 'Submitted',
// //       employeeId: 'FI-00005',
// //       department: 'Finance',
// //       reason: 'Family Event',
// //       requestType: 'Compensatory Off',
// //       priority: 'Medium',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-23',
// //       duration: '3 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-006',
// //       employeeName: 'Lisa Davis',
// //       status: 'Approved',
// //       employeeId: 'FI-00006',
// //       department: 'Engineering',
// //       reason: 'Maternity Leave',
// //       requestType: 'Maternity Leave',
// //       priority: 'High',
// //       fromDate: '2025-08-18',
// //       toDate: '2025-11-15',
// //       duration: '90 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-007',
// //       employeeName: 'Robert Garcia',
// //       status: 'Pending',
// //       employeeId: 'FI-00007',
// //       department: 'Operations',
// //       reason: 'Extended Leave',
// //       requestType: 'Leave Without Pay',
// //       priority: 'Low',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-24',
// //       duration: '5 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-008',
// //       employeeName: 'Jennifer Lee',
// //       status: 'Submitted',
// //       employeeId: 'FI-00008',
// //       department: 'Marketing',
// //       reason: 'Personal Work',
// //       requestType: 'Casual Leave',
// //       priority: 'Medium',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     }
// //   ];

// //   // Get unique values for filters
// //   const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
// //   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   // Filter and sort data
// //   const filteredData = useMemo(() => {
// //     let result = [...mockData];

// //     // Search filter
// //     if (searchTerm) {
// //       const search = searchTerm.toLowerCase();
// //       result = result.filter(item =>
// //         item.employeeName.toLowerCase().includes(search) ||
// //         item.employeeId.toLowerCase().includes(search) ||
// //         item.id.toLowerCase().includes(search) ||
// //         item.department.toLowerCase().includes(search) ||
// //         item.requestType.toLowerCase().includes(search)
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       result = result.filter(item => item.status === statusFilter);
// //     }

// //     // Department filter
// //     if (departmentFilter !== 'all') {
// //       result = result.filter(item => item.department === departmentFilter);
// //     }

// //     // Priority filter
// //     if (priorityFilter !== 'all') {
// //       result = result.filter(item => item.priority === priorityFilter);
// //     }

// //     // Request type filter
// //     if (requestTypeFilter !== 'all') {
// //       result = result.filter(item => item.requestType === requestTypeFilter);
// //     }

// //     // Date filter
// //     if (dateFilter !== 'all') {
// //       const now = new Date();
// //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
// //       result = result.filter(item => {
// //         const itemDate = new Date(item.fromDate);
// //         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
// //         switch (dateFilter) {
// //           case 'today': return daysDiff === 0;
// //           case 'yesterday': return daysDiff === 1;
// //           case 'last7days': return daysDiff <= 7;
// //           case 'last30days': return daysDiff <= 30;
// //           case 'thisweek':
// //             const startOfWeek = new Date(today);
// //             startOfWeek.setDate(today.getDate() - today.getDay());
// //             return itemDate >= startOfWeek;
// //           case 'thismonth':
// //             return itemDate.getMonth() === today.getMonth() && 
// //                    itemDate.getFullYear() === today.getFullYear();
// //           default: return true;
// //         }
// //       });
// //     }

// //     // Sort
// //     result.sort((a, b) => {
// //       let aVal, bVal;
      
// //       switch (sortBy) {
// //         case 'employeeName':
// //           aVal = a.employeeName.toLowerCase();
// //           bVal = b.employeeName.toLowerCase();
// //           break;
// //         case 'status':
// //           aVal = a.status.toLowerCase();
// //           bVal = b.status.toLowerCase();
// //           break;
// //         case 'employeeId':
// //           aVal = a.employeeId.toLowerCase();
// //           bVal = b.employeeId.toLowerCase();
// //           break;
// //         case 'fromDate':
// //           aVal = new Date(a.fromDate);
// //           bVal = new Date(b.fromDate);
// //           break;
// //         default:
// //           aVal = a[sortBy];
// //           bVal = b[sortBy];
// //       }

// //       if (sortOrder === 'asc') {
// //         return aVal > bVal ? 1 : -1;
// //       } else {
// //         return aVal < bVal ? 1 : -1;
// //       }
// //     });

// //     return result;
// //   }, [searchTerm, statusFilter, departmentFilter, priorityFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
// //       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
// //       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
// //       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const getPriorityColor = (priority) => {
// //     switch (priority) {
// //       case 'High': return 'bg-red-100 text-red-700 border-red-200';
// //       case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
// //       case 'Low': return 'bg-green-100 text-green-700 border-green-200';
// //       default: return 'bg-gray-100 text-gray-700 border-gray-200';
// //     }
// //   };

// //   const handleSort = (column) => {
// //     if (sortBy === column) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //     } else {
// //       setSortBy(column);
// //       setSortOrder('asc');
// //     }
// //   };

// //   const getSortIcon = (column) => {
// //     if (sortBy !== column) return null;
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="w-3 h-3" /> : 
// //       <ChevronDown className="w-3 h-3" />;
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setStatusFilter('all');
// //     setDepartmentFilter('all');
// //     setPriorityFilter('all');
// //     setRequestTypeFilter('all');
// //     setDateFilter('all');
// //     setCurrentPage(1);
// //   };

// //   const toggleRowSelection = (id) => {
// //     const newSelected = new Set(selectedRows);
// //     if (newSelected.has(id)) {
// //       newSelected.delete(id);
// //     } else {
// //       newSelected.add(id);
// //     }
// //     setSelectedRows(newSelected);
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
// //       setSelectedRows(new Set());
// //     } else {
// //       setSelectedRows(new Set(paginatedData.map(item => item.id)));
// //     }
// //   };

// //   const handleBulkAccept = () => {
// //     console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const handleBulkReject = () => {
// //     console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const activeFiltersCount = [
// //     statusFilter !== 'all',
// //     departmentFilter !== 'all', 
// //     priorityFilter !== 'all',
// //     requestTypeFilter !== 'all',
// //     dateFilter !== 'all',
// //     searchTerm.length > 0
// //   ].filter(Boolean).length;

// //   return (
// //     <>
// //       <Header/>
// //       {/* Leave Balance Section */}
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto mb-6">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '400px' }}>
            
// //             {loading ? (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="animate-pulse text-center">
// //                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
// //                   <div className="h-3 bg-gray-300 rounded w-32 mb-2 mx-auto"></div>
// //                   <div className="h-2 bg-gray-200 rounded w-24 mx-auto"></div>
// //                 </div>
// //               </div>
// //             ) : leaveData.length > 0 ? (
// //               <div className="h-full flex">
                
// //                 {/* Left Panel - Summary */}
// //                 <div className="w-80 bg-gradient-to-br from-slate-50 to-blue-50 p-6 border-r border-gray-100">
// //                   <div className="mb-6">
// //                     <h2 className="text-xl font-bold text-gray-800 mb-1">Leave Balance</h2>
// //                     <p className="text-sm text-gray-600">Your available time off</p>
// //                   </div>

// //                   {/* Total Circle */}
// //                   <div className="flex flex-col items-center mb-6">
// //                     <div className="relative w-32 h-32 mb-3">
// //                       <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
// //                         <circle
// //                           cx="50"
// //                           cy="50"
// //                           r="45"
// //                           stroke="#e5e7eb"
// //                           strokeWidth="8"
// //                           fill="transparent"
// //                         />
// //                         <circle
// //                           cx="50"
// //                           cy="50"
// //                           r="45"
// //                           stroke="url(#gradient)"
// //                           strokeWidth="8"
// //                           fill="transparent"
// //                           strokeDasharray={`${Math.min((leaveData.reduce((sum, leave) => sum + leave.total, 0) / 50) * 283, 283)} 283`}
// //                           strokeLinecap="round"
// //                         />
// //                         <defs>
// //                           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
// //                             <stop offset="0%" stopColor="#3b82f6" />
// //                             <stop offset="100%" stopColor="#8b5cf6" />
// //                           </linearGradient>
// //                         </defs>
// //                       </svg>
// //                       <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                         <span className="text-2xl font-bold text-gray-800">
// //                           {leaveData.reduce((sum, leave) => sum + leave.total, 0)}
// //                         </span>
// //                         <span className="text-xs text-gray-600">Total Days</span>
// //                       </div>
// //                     </div>
// //                     <div className="text-center">
// //                       <div className="text-sm font-medium text-gray-700">
// //                         {leaveData.length} Leave Types Available
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Quick Stats */}
// //                   <div className="space-y-3">
// //                     <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
// //                       <div className="flex items-center space-x-3">
// //                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                         <span className="text-sm font-medium text-gray-700">Available This Month</span>
// //                       </div>
// //                       <span className="text-sm font-bold text-gray-800">
// //                         {leaveData.reduce((sum, leave) => sum + leave.total, 0)} days
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
// //                       <div className="flex items-center space-x-3">
// //                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
// //                         <span className="text-sm font-medium text-gray-700">Pending Requests</span>
// //                       </div>
// //                       <span className="text-sm font-bold text-gray-800">
// //                         {mockData.filter(request => request.status === 'Pending').length}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
// //                       <div className="flex items-center space-x-3">
// //                         <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
// //                         <span className="text-sm font-medium text-gray-700">Used This Year</span>
// //                       </div>
// //                       <span className="text-sm font-bold text-gray-800">
// //                         {mockData.filter(request => request.status === 'Approved').length} days
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Right Panel - Detailed View */}
// //                 <div className="flex-1 p-6">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <h3 className="text-lg font-semibold text-gray-800">Leave Types Breakdown</h3>
// //                     <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
// //                       Updated Today
// //                     </div>
// //                   </div>

// //                   {/* Leave Type Cards */}
// //                   <div className="grid grid-cols-2 gap-4 h-72 overflow-y-auto">
// //                     {leaveData.map((leave, index) => {
// //                       const maxValue = Math.max(...leaveData.map(item => item.total));
// //                       const percentage = maxValue > 0 ? (leave.total / maxValue) * 100 : 0;
                      
// //                       const colorPalettes = [
// //                         { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af' },
// //                         { main: '#10b981', light: '#d1fae5', dark: '#047857' },
// //                         { main: '#f59e0b', light: '#fef3c7', dark: '#d97706' },
// //                         { main: '#ef4444', light: '#fee2e2', dark: '#dc2626' },
// //                         { main: '#8b5cf6', light: '#ede9fe', dark: '#7c3aed' },
// //                         { main: '#06b6d4', light: '#cffafe', dark: '#0891b2' },
// //                         { main: '#84cc16', light: '#ecfccb', dark: '#65a30d' }
// //                       ];
                      
// //                       const colors = colorPalettes[index % colorPalettes.length];
                      
// //                       return (
// //                         <div 
// //                           key={index} 
// //                           className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
// //                           style={{ backgroundColor: colors.light }}
// //                         >
// //                           {/* Header */}
// //                           <div className="flex items-center justify-between mb-3">
// //                             <div 
// //                               className="w-3 h-3 rounded-full"
// //                               style={{ backgroundColor: colors.main }}
// //                             ></div>
// //                             <div className="text-right">
// //                               <div 
// //                                 className="text-xl font-bold"
// //                                 style={{ color: colors.dark }}
// //                               >
// //                                 {leave.total}
// //                               </div>
// //                               <div className="text-xs text-gray-600">
// //                                 {leave.total === 1 ? 'day' : 'days'}
// //                               </div>
// //                             </div>
// //                           </div>

// //                           {/* Leave Type Name */}
// //                           <div className="mb-3">
// //                             <h4 
// //                               className="font-medium text-sm truncate"
// //                               style={{ color: colors.dark }}
// //                               title={leave.leave_type}
// //                             >
// //                               {leave.leave_type}
// //                             </h4>
// //                           </div>

// //                           {/* Mini Bar Chart */}
// //                           <div className="space-y-1">
// //                             <div className="flex items-center justify-between text-xs">
// //                               <span className="text-gray-600">Usage</span>
// //                               <span style={{ color: colors.dark }}>{percentage.toFixed(0)}%</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-1.5">
// //                               <div 
// //                                 className="h-1.5 rounded-full transition-all duration-700 ease-out"
// //                                 style={{ 
// //                                   width: `${Math.max(percentage, 8)}%`,
// //                                   backgroundColor: colors.main
// //                                 }}
// //                               ></div>
// //                             </div>
// //                           </div>

// //                           {/* Availability Status */}
// //                           <div className="mt-3 flex items-center space-x-1">
// //                             <div 
// //                               className="w-1.5 h-1.5 rounded-full"
// //                               style={{ backgroundColor: leave.total > 5 ? '#10b981' : leave.total > 2 ? '#f59e0b' : '#ef4444' }}
// //                             ></div>
// //                             <span className="text-xs text-gray-600">
// //                               {leave.total > 5 ? 'High' : leave.total > 2 ? 'Medium' : 'Low'} availability
// //                             </span>
// //                           </div>
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //               </div>
// //             ) : (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
// //                     <Calendar className="w-8 h-8 text-gray-400" />
// //                   </div>
// //                   <div className="text-lg font-medium text-gray-600 mb-2">No Leave Data Available</div>
// //                   <div className="text-sm text-gray-500">Your leave balances will appear here once loaded</div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //       {/* Leave Requests Table Section */}
// //       <div className="max-w-7xl mx-auto">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
// //             {/* Top Header */}
// //             <div className="flex items-center justify-between p-3 border-b border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
// //               </div>
              
// //               {/* Always Visible Search Bar */}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-72 relative">
// //                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by employee name, ID, department, leave type..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
// //                     style={{ focusRingColor: '#ec4899' }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
// //                     >
// //                       <X className="w-2 h-2" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <Link 
// //                   to="/dashboard/leaverequest"
// //                   className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
// //                 >
// //                   <Plus className="w-3 h-3" />
// //                   Add Request
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Search Results Info */}
// //             {searchTerm && (
// //               <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
// //                 <div className="text-xs text-blue-700">
// //                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
// //                 </div>
// //               </div>
// //             )}

// //             {/* Filter Section */}
// //             <div className="border-b border-gray-200">
// //               {/* Filter Toggle Bar */}
// //               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={() => setShowFilter(!showFilter)}
// //                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
// //                       showFilter 
// //                         ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
// //                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
// //                     }`}
// //                     style={{ 
// //                       borderColor: showFilter ? '#ec4899' : undefined,
// //                       color: showFilter ? '#ec4899' : undefined,
// //                       backgroundColor: showFilter ? '#fdf2f8' : undefined
// //                     }}
// //                   >
// //                     <Filter className="w-2.5 h-2.5" />
// //                     <span className="font-medium">Filters</span>
// //                     {activeFiltersCount > 0 && (
// //                       <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
// //                         {activeFiltersCount}
// //                       </span>
// //                     )}
// //                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
// //                   </button>

// //                   <div className="h-4 w-px bg-gray-300"></div>

// //                   <div className="flex items-center gap-1.5">
// //                     <Clock className="w-3 h-3 text-gray-400" />
// //                     <span className="text-xs text-gray-600">Leave Requests</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="text-xs text-gray-600">
// //                     {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
// //                   </span>
// //                   <Calendar className="w-3 h-3 text-gray-400" />
// //                 </div>
// //               </div>

// //               {/* Advanced Filters Panel */}
// //               {showFilter && (
// //                 <div className="px-3 py-3 bg-white border-t border-gray-100">
// //                   <div className="space-y-3">
// //                     {/* Filter Grid */}
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
// //                       {/* Status Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Status
// //                         </label>
// //                         <select
// //                           value={statusFilter}
// //                           onChange={(e) => setStatusFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Status</option>
// //                           <option value="Submitted">Submitted</option>
// //                           <option value="Approved">Approved</option>
// //                           <option value="Pending">Pending</option>
// //                           <option value="Rejected">Rejected</option>
// //                         </select>
// //                       </div>

// //                       {/* Department Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Building className="w-3 h-3 text-gray-400" />
// //                           Department
// //                         </label>
// //                         <select
// //                           value={departmentFilter}
// //                           onChange={(e) => setDepartmentFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Departments</option>
// //                           {uniqueDepartments.map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Priority Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Priority
// //                         </label>
// //                         <select
// //                           value={priorityFilter}
// //                           onChange={(e) => setPriorityFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Priorities</option>
// //                           <option value="High">High</option>
// //                           <option value="Medium">Medium</option>
// //                           <option value="Low">Low</option>
// //                         </select>
// //                       </div>

// //                       {/* Request Type Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Users className="w-3 h-3 text-gray-400" />
// //                           Leave Type
// //                         </label>
// //                         <select
// //                           value={requestTypeFilter}
// //                           onChange={(e) => setRequestTypeFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Types</option>
// //                           {uniqueRequestTypes.map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Date Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Calendar className="w-3 h-3 text-gray-400" />
// //                           From Date Range
// //                         </label>
// //                         <select
// //                           value={dateFilter}
// //                           onChange={(e) => setDateFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Dates</option>
// //                           <option value="today">Today</option>
// //                           <option value="yesterday">Yesterday</option>
// //                           <option value="thisweek">This Week</option>
// //                           <option value="last7days">Last 7 Days</option>
// //                           <option value="thismonth">This Month</option>
// //                           <option value="last30days">Last 30 Days</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Filter Actions */}
// //                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
// //                       <div className="text-xs text-gray-500">
// //                         {activeFiltersCount > 0 ? (
// //                           <span className="flex items-center gap-1">
// //                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
// //                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
// //                           </span>
// //                         ) : (
// //                           'No filters applied'
// //                         )}
// //                       </div>
// //                       <div className="flex items-center gap-1.5">
// //                         <button
// //                           onClick={clearAllFilters}
// //                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
// //                         >
// //                           Clear All
// //                         </button>
// //                         <button
// //                           onClick={() => setShowFilter(false)}
// //                           className="px-2 py-1 text-xs text-white rounded transition-colors"
// //                           style={{ backgroundColor: '#ec4899' }}
// //                         >
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Bulk Actions Bar - Shows when items are selected */}
// //             {selectedRows.size > 0 && (
// //               <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xs font-medium text-pink-800">
// //                       {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
// //                     </span>
// //                     <button
// //                       onClick={() => setSelectedRows(new Set())}
// //                       className="text-xs text-pink-600 hover:text-pink-800 underline"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={handleBulkAccept}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
// //                     >
// //                       <Check className="w-4 h-4" />
// //                       Accept ({selectedRows.size})
// //                     </button>
// //                     <button
// //                       onClick={handleBulkReject}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
// //                     >
// //                       <XCircle className="w-4 h-4" />
// //                       Reject ({selectedRows.size})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="w-6 p-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
// //                         onChange={toggleSelectAll}
// //                         className="rounded border-gray-300 focus:ring-pink-500"
// //                         style={{ accentColor: '#ec4899' }}
// //                       />
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeId')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee ID
// //                         {getSortIcon('employeeId')}
// //                       </div>
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeName')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee Name
// //                         {getSortIcon('employeeName')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Status
// //                         {getSortIcon('status')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">From Date</div>
// //                     </th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">To Date</div>
// //                     </th>
// //                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {paginatedData.map((item) => (
// //                     <tr 
// //                       key={item.id} 
// //                       className={`hover:bg-gray-50 transition-colors ${
// //                         selectedRows.has(item.id) ? 'bg-pink-50' : ''
// //                       }`}
// //                       style={{ 
// //                         borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
// //                         borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
// //                       }}
// //                     >
// //                       <td className="p-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedRows.has(item.id)}
// //                           onChange={() => toggleRowSelection(item.id)}
// //                           className="rounded border-gray-300 focus:ring-pink-500"
// //                           style={{ accentColor: '#ec4899' }}
// //                         />
// //                       </td>
// //                       <td className="p-2">
// //                         <span className="text-gray-900 text-xs">{item.employeeId}</span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
// //                           <div className="flex items-center gap-1 mt-0.5">
// //                             <span className="text-xs text-gray-500">{item.department}</span>
// //                             <span className="text-xs text-gray-300">•</span>
// //                             <span className={`px-1 py-0.5 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
// //                               {item.priority}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="text-gray-600 text-xs font-mono">{item.id}</span>
// //                           <div className="text-xs text-gray-500">{item.duration}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <span 
// //                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
// //                           style={{ 
// //                             borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             color: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
// //                           }}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
// //                         <div className="text-xs text-gray-500">{item.duration}</div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.fromDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.fromDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.toDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.toDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="flex items-center justify-center gap-1">
// //                           <button 
// //                             className="text-gray-400 hover:text-green-600 rounded transition-colors" 
// //                             title="Accept Leave Request"
// //                             onClick={() => console.log('Accept Leave Request:', item.id)}
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </button>
// //                           <button 
// //                             className="text-gray-400 hover:text-red-600 rounded transition-colors" 
// //                             title="Reject Leave Request"
// //                             onClick={() => console.log('Reject Leave Request:', item.id)}
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>

// //               {/* Empty State */}
// //               {paginatedData.length === 0 && (
// //                 <div className="text-center py-8">
// //                   <Search className="mx-auto h-8 w-8 text-gray-400" />
// //                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {activeFiltersCount > 0 || searchTerm 
// //                       ? 'Try adjusting your search or filter criteria'
// //                       : 'No leave requests available'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-600">Show:</span>
// //                 {[20, 100, 500, 2500].map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => {
// //                       setItemsPerPage(size);
// //                       setCurrentPage(1);
// //                     }}
// //                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                       itemsPerPage === size
// //                         ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-600">
// //                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
// //                 </span>
                
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Prev
// //                     </button>
                    
// //                     <div className="flex items-center gap-0.5">
// //                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                         const page = i + 1;
// //                         return (
// //                           <button
// //                             key={page}
// //                             onClick={() => setCurrentPage(page)}
// //                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                               currentPage === page
// //                                 ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                             }`}
// //                           >
// //                             {page}
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
                    
// //                     <button
// //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MyLeave;








































































































































// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Link } from 'react-router-dom';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';
// // import { 
// //   Search, Filter, Clock, X, 
// //   ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
// //   Users, Building, AlertCircle 
// // } from 'lucide-react';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // Table state management
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Filter states
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [departmentFilter, setDepartmentFilter] = useState('all');
// //   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
// //   const [dateFilter, setDateFilter] = useState('all');
  
// //   // Sort states
// //   const [sortBy, setSortBy] = useState('fromDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   // Mock data for attendance requests
// //   const mockData = [
// //     {
// //       id: 'HR-ARQ-25-07-001',
// //       employeeName: 'Developer Daiyan',
// //       status: 'Submitted',
// //       employeeId: 'FI-00001',
// //       department: 'Engineering',
// //       reason: 'Sick Leave',
// //       requestType: 'Sick Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-002',
// //       employeeName: 'Sarah Wilson',
// //       status: 'Approved',
// //       employeeId: 'FI-00002',
// //       department: 'Marketing',
// //       reason: 'Medical Appointment',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-20',
// //       duration: '4 hours'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-003',
// //       employeeName: 'John Smith',
// //       status: 'Pending',
// //       employeeId: 'FI-00003',
// //       department: 'Sales',
// //       reason: 'Personal Emergency',
// //       requestType: 'Earned Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-21',
// //       duration: '1 day'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-004',
// //       employeeName: 'Emma Johnson',
// //       status: 'Rejected',
// //       employeeId: 'FI-00004',
// //       department: 'HR',
// //       reason: 'Vacation Request',
// //       requestType: 'Privilege Leave',
// //       fromDate: '2025-08-19',
// //       toDate: '2025-08-25',
// //       duration: '7 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-005',
// //       employeeName: 'Michael Brown',
// //       status: 'Submitted',
// //       employeeId: 'FI-00005',
// //       department: 'Finance',
// //       reason: 'Family Event',
// //       requestType: 'Compensatory Off',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-23',
// //       duration: '3 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-006',
// //       employeeName: 'Lisa Davis',
// //       status: 'Approved',
// //       employeeId: 'FI-00006',
// //       department: 'Engineering',
// //       reason: 'Maternity Leave',
// //       requestType: 'Maternity Leave',
// //       fromDate: '2025-08-18',
// //       toDate: '2025-11-15',
// //       duration: '90 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-007',
// //       employeeName: 'Robert Garcia',
// //       status: 'Pending',
// //       employeeId: 'FI-00007',
// //       department: 'Operations',
// //       reason: 'Extended Leave',
// //       requestType: 'Leave Without Pay',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-24',
// //       duration: '5 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-008',
// //       employeeName: 'Jennifer Lee',
// //       status: 'Submitted',
// //       employeeId: 'FI-00008',
// //       department: 'Marketing',
// //       reason: 'Personal Work',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     }
// //   ];

// //   // Get unique values for filters
// //   const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
// //   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   // Filter and sort data
// //   const filteredData = useMemo(() => {
// //     let result = [...mockData];

// //     // Search filter
// //     if (searchTerm) {
// //       const search = searchTerm.toLowerCase();
// //       result = result.filter(item =>
// //         item.employeeName.toLowerCase().includes(search) ||
// //         item.employeeId.toLowerCase().includes(search) ||
// //         item.id.toLowerCase().includes(search) ||
// //         item.department.toLowerCase().includes(search) ||
// //         item.requestType.toLowerCase().includes(search)
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       result = result.filter(item => item.status === statusFilter);
// //     }

// //     // Department filter
// //     if (departmentFilter !== 'all') {
// //       result = result.filter(item => item.department === departmentFilter);
// //     }

// //     // Request type filter
// //     if (requestTypeFilter !== 'all') {
// //       result = result.filter(item => item.requestType === requestTypeFilter);
// //     }

// //     // Date filter
// //     if (dateFilter !== 'all') {
// //       const now = new Date();
// //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
// //       result = result.filter(item => {
// //         const itemDate = new Date(item.fromDate);
// //         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
// //         switch (dateFilter) {
// //           case 'today': return daysDiff === 0;
// //           case 'yesterday': return daysDiff === 1;
// //           case 'last7days': return daysDiff <= 7;
// //           case 'last30days': return daysDiff <= 30;
// //           case 'thisweek':
// //             const startOfWeek = new Date(today);
// //             startOfWeek.setDate(today.getDate() - today.getDay());
// //             return itemDate >= startOfWeek;
// //           case 'thismonth':
// //             return itemDate.getMonth() === today.getMonth() && 
// //                    itemDate.getFullYear() === today.getFullYear();
// //           default: return true;
// //         }
// //       });
// //     }

// //     // Sort
// //     result.sort((a, b) => {
// //       let aVal, bVal;
      
// //       switch (sortBy) {
// //         case 'employeeName':
// //           aVal = a.employeeName.toLowerCase();
// //           bVal = b.employeeName.toLowerCase();
// //           break;
// //         case 'status':
// //           aVal = a.status.toLowerCase();
// //           bVal = b.status.toLowerCase();
// //           break;
// //         case 'employeeId':
// //           aVal = a.employeeId.toLowerCase();
// //           bVal = b.employeeId.toLowerCase();
// //           break;
// //         case 'fromDate':
// //           aVal = new Date(a.fromDate);
// //           bVal = new Date(b.fromDate);
// //           break;
// //         default:
// //           aVal = a[sortBy];
// //           bVal = b[sortBy];
// //       }

// //       if (sortOrder === 'asc') {
// //         return aVal > bVal ? 1 : -1;
// //       } else {
// //         return aVal < bVal ? 1 : -1;
// //       }
// //     });

// //     return result;
// //   }, [searchTerm, statusFilter, departmentFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
// //       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
// //       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
// //       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const handleSort = (column) => {
// //     if (sortBy === column) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //     } else {
// //       setSortBy(column);
// //       setSortOrder('asc');
// //     }
// //   };

// //   const getSortIcon = (column) => {
// //     if (sortBy !== column) return null;
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="w-3 h-3" /> : 
// //       <ChevronDown className="w-3 h-3" />;
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setStatusFilter('all');
// //     setDepartmentFilter('all');
// //     setRequestTypeFilter('all');
// //     setDateFilter('all');
// //     setCurrentPage(1);
// //   };

// //   const toggleRowSelection = (id) => {
// //     const newSelected = new Set(selectedRows);
// //     if (newSelected.has(id)) {
// //       newSelected.delete(id);
// //     } else {
// //       newSelected.add(id);
// //     }
// //     setSelectedRows(newSelected);
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
// //       setSelectedRows(new Set());
// //     } else {
// //       setSelectedRows(new Set(paginatedData.map(item => item.id)));
// //     }
// //   };

// //   const handleBulkAccept = () => {
// //     console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const handleBulkReject = () => {
// //     console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const activeFiltersCount = [
// //     statusFilter !== 'all',
// //     departmentFilter !== 'all', 
// //     requestTypeFilter !== 'all',
// //     dateFilter !== 'all',
// //     searchTerm.length > 0
// //   ].filter(Boolean).length;

// //   return (
// //     <>
// //       <Header/>
// //       {/* Manager's Visual Analytics Dashboard */}
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto mb-6">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '600px' }}>
            
// //             {loading ? (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="animate-pulse text-center">
// //                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
// //                   <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
// //                   <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="h-full flex flex-col">
                
// //                 {/* Header with Key Metrics */}
// //                 <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-5">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <h2 className="text-xl font-bold mb-1">Leave Analytics Dashboard</h2>
// //                       <p className="text-sm opacity-90">Visual insights for team leave management</p>
// //                     </div>
// //                     <div className="flex items-center space-x-6">
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-yellow-400">{mockData.filter(r => r.status === 'Submitted' || r.status === 'Pending').length}</div>
// //                         <div className="text-xs opacity-90">Requires Action</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-green-400">{mockData.filter(r => r.status === 'Approved').length}</div>
// //                         <div className="text-xs opacity-90">Approved Today</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-blue-400">{Math.round((mockData.filter(r => r.status === 'Approved').length / mockData.length) * 100)}%</div>
// //                         <div className="text-xs opacity-90">Approval Rate</div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Main Dashboard Content */}
// //                 <div className="flex-1 p-5 grid grid-cols-12 gap-4">
                  
// //                   {/* Status Distribution Chart */}
// //                   <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Request Status Distribution</h3>
// //                     <div className="relative h-40">
// //                       {/* Donut Chart */}
// //                       <div className="absolute inset-0 flex items-center justify-center">
// //                         <div className="relative">
// //                           <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
// //                             {/* Background circle */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                            
// //                             {/* Submitted (Blue) */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
// //                               strokeDasharray={`${(mockData.filter(r => r.status === 'Submitted').length / mockData.length) * 283} 283`}
// //                               strokeDashoffset="0"/>
                            
// //                             {/* Pending (Orange) */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
// //                               strokeDasharray={`${(mockData.filter(r => r.status === 'Pending').length / mockData.length) * 283} 283`}
// //                               strokeDashoffset={`-${(mockData.filter(r => r.status === 'Submitted').length / mockData.length) * 283}`}/>
                            
// //                             {/* Approved (Green) */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
// //                               strokeDasharray={`${(mockData.filter(r => r.status === 'Approved').length / mockData.length) * 283} 283`}
// //                               strokeDashoffset={`-${((mockData.filter(r => r.status === 'Submitted').length + mockData.filter(r => r.status === 'Pending').length) / mockData.length) * 283}`}/>
// //                           </svg>
                          
// //                           <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                             <span className="text-lg font-bold text-gray-800">{mockData.length}</span>
// //                             <span className="text-xs text-gray-600">Total</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     {/* Legend */}
// //                     <div className="grid grid-cols-2 gap-2 mt-4">
// //                       {[
// //                         { label: 'Submitted', count: mockData.filter(r => r.status === 'Submitted').length, color: 'bg-blue-500' },
// //                         { label: 'Pending', count: mockData.filter(r => r.status === 'Pending').length, color: 'bg-orange-500' },
// //                         { label: 'Approved', count: mockData.filter(r => r.status === 'Approved').length, color: 'bg-green-500' },
// //                         { label: 'Rejected', count: mockData.filter(r => r.status === 'Rejected').length, color: 'bg-red-500' }
// //                       ].map((item, index) => (
// //                         <div key={index} className="flex items-center space-x-2">
// //                           <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
// //                           <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Department Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Department Workload</h3>
// //                     <div className="space-y-3">
// //                       {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept, index) => {
// //                         const deptRequests = mockData.filter(r => r.department === dept).length;
// //                         const maxRequests = Math.max(...['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map(d => 
// //                           mockData.filter(r => r.department === d).length));
// //                         const percentage = maxRequests > 0 ? (deptRequests / maxRequests) * 100 : 0;
// //                         const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{dept}</span>
// //                               <span className="text-xs font-bold text-gray-800">{deptRequests}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Leave Type Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Type Distribution</h3>
// //                     <div className="space-y-3">
// //                       {uniqueRequestTypes.map((type, index) => {
// //                         const typeCount = mockData.filter(r => r.requestType === type).length;
// //                         const percentage = (typeCount / mockData.length) * 100;
// //                         const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{type}</span>
// //                               <span className="text-xs font-bold text-gray-800">{typeCount}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                             <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}%</div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Timeline View */}
// //                   <div className="col-span-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Timeline (Next 7 Days)</h3>
// //                     <div className="relative h-48">
// //                       {/* Timeline Grid */}
// //                       <div className="absolute inset-0">
// //                         {/* Date Headers */}
// //                         <div className="flex border-b border-gray-200 pb-2 mb-3">
// //                           {Array.from({length: 7}, (_, i) => {
// //                             const date = new Date();
// //                             date.setDate(date.getDate() + i);
// //                             return (
// //                               <div key={i} className="flex-1 text-center">
// //                                 <div className="text-xs font-medium text-gray-700">
// //                                   {date.toLocaleDateString('en-US', { weekday: 'short' })}
// //                                 </div>
// //                                 <div className="text-xs text-gray-500">
// //                                   {date.getDate()}
// //                                 </div>
// //                               </div>
// //                             );
// //                           })}
// //                         </div>
                        
// //                         {/* Timeline Bars */}
// //                         <div className="space-y-2">
// //                           {mockData.filter(r => r.status === 'Approved').slice(0, 6).map((request, index) => {
// //                             const startDate = new Date(request.fromDate);
// //                             const today = new Date();
// //                             const daysFromToday = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
// //                             const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400'];
                            
// //                             if (daysFromToday >= 0 && daysFromToday < 7) {
// //                               return (
// //                                 <div key={index} className="flex items-center h-6">
// //                                   <div className="w-16 text-xs text-gray-600 truncate">{request.employeeName.split(' ')[0]}</div>
// //                                   <div className="flex-1 relative">
// //                                     <div 
// //                                       className={`absolute h-4 ${colors[index % colors.length]} rounded opacity-75 flex items-center px-1`}
// //                                       style={{ 
// //                                         left: `${(daysFromToday / 7) * 100}%`, 
// //                                         width: `${Math.min((parseInt(request.duration) / 7) * 100, 20)}%` 
// //                                       }}
// //                                     >
// //                                       <span className="text-xs text-white font-medium truncate">{request.requestType}</span>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               );
// //                             }
// //                             return null;
// //                           })}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Quick Actions Panel */}
// //                   <div className="col-span-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Smart Actions</h3>
// //                     <div className="space-y-2">
// //                       <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-xs font-medium shadow-sm">
// //                         🚀 Auto-Approve Requests ({mockData.filter(r => r.status === 'Submitted').length})
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-xs font-medium shadow-sm">
// //                         📊 Generate Team Report
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-xs font-medium shadow-sm">
// //                         🔔 Setup Smart Alerts
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-xs font-medium shadow-sm">
// //                         📅 Conflict Detection
// //                       </button>
// //                     </div>
                    
// //                     {/* AI Insights */}
// //                     <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
// //                       <div className="flex items-start space-x-2">
// //                         <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
// //                         <div>
// //                           <div className="text-xs font-medium text-gray-800">AI Insight</div>
// //                           <div className="text-xs text-gray-600">Engineering team has 40% more requests this week. Consider workload balancing.</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                 </div>

// //               </div>
// //             )}
// //           </div>
// //         </div>

// //       {/* Leave Requests Table Section */}
// //       <div className="max-w-7xl mx-auto">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
// //             {/* Top Header */}
// //             <div className="flex items-center justify-between p-3 border-b border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
// //               </div>
              
// //               {/* Always Visible Search Bar */}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-72 relative">
// //                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by employee name, ID, department, leave type..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
// //                     style={{ focusRingColor: '#ec4899' }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
// //                     >
// //                       <X className="w-2 h-2" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <Link 
// //                   to="/dashboard/leaverequest"
// //                   className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
// //                 >
// //                   <Plus className="w-3 h-3" />
// //                   Add Request
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Search Results Info */}
// //             {searchTerm && (
// //               <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
// //                 <div className="text-xs text-blue-700">
// //                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
// //                 </div>
// //               </div>
// //             )}

// //             {/* Filter Section */}
// //             <div className="border-b border-gray-200">
// //               {/* Filter Toggle Bar */}
// //               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={() => setShowFilter(!showFilter)}
// //                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
// //                       showFilter 
// //                         ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
// //                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
// //                     }`}
// //                     style={{ 
// //                       borderColor: showFilter ? '#ec4899' : undefined,
// //                       color: showFilter ? '#ec4899' : undefined,
// //                       backgroundColor: showFilter ? '#fdf2f8' : undefined
// //                     }}
// //                   >
// //                     <Filter className="w-2.5 h-2.5" />
// //                     <span className="font-medium">Filters</span>
// //                     {activeFiltersCount > 0 && (
// //                       <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
// //                         {activeFiltersCount}
// //                       </span>
// //                     )}
// //                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
// //                   </button>

// //                   <div className="h-4 w-px bg-gray-300"></div>

// //                   <div className="flex items-center gap-1.5">
// //                     <Clock className="w-3 h-3 text-gray-400" />
// //                     <span className="text-xs text-gray-600">Leave Requests</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="text-xs text-gray-600">
// //                     {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
// //                   </span>
// //                   <Calendar className="w-3 h-3 text-gray-400" />
// //                 </div>
// //               </div>

// //               {/* Advanced Filters Panel */}
// //               {showFilter && (
// //                 <div className="px-3 py-3 bg-white border-t border-gray-100">
// //                   <div className="space-y-3">
// //                     {/* Filter Grid */}
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                       {/* Status Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Status
// //                         </label>
// //                         <select
// //                           value={statusFilter}
// //                           onChange={(e) => setStatusFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Status</option>
// //                           <option value="Submitted">Submitted</option>
// //                           <option value="Approved">Approved</option>
// //                           <option value="Pending">Pending</option>
// //                           <option value="Rejected">Rejected</option>
// //                         </select>
// //                       </div>

// //                       {/* Department Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Building className="w-3 h-3 text-gray-400" />
// //                           Department
// //                         </label>
// //                         <select
// //                           value={departmentFilter}
// //                           onChange={(e) => setDepartmentFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Departments</option>
// //                           {uniqueDepartments.map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Request Type Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Users className="w-3 h-3 text-gray-400" />
// //                           Leave Type
// //                         </label>
// //                         <select
// //                           value={requestTypeFilter}
// //                           onChange={(e) => setRequestTypeFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Types</option>
// //                           {uniqueRequestTypes.map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Date Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Calendar className="w-3 h-3 text-gray-400" />
// //                           From Date Range
// //                         </label>
// //                         <select
// //                           value={dateFilter}
// //                           onChange={(e) => setDateFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Dates</option>
// //                           <option value="today">Today</option>
// //                           <option value="yesterday">Yesterday</option>
// //                           <option value="thisweek">This Week</option>
// //                           <option value="last7days">Last 7 Days</option>
// //                           <option value="thismonth">This Month</option>
// //                           <option value="last30days">Last 30 Days</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Filter Actions */}
// //                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
// //                       <div className="text-xs text-gray-500">
// //                         {activeFiltersCount > 0 ? (
// //                           <span className="flex items-center gap-1">
// //                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
// //                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
// //                           </span>
// //                         ) : (
// //                           'No filters applied'
// //                         )}
// //                       </div>
// //                       <div className="flex items-center gap-1.5">
// //                         <button
// //                           onClick={clearAllFilters}
// //                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
// //                         >
// //                           Clear All
// //                         </button>
// //                         <button
// //                           onClick={() => setShowFilter(false)}
// //                           className="px-2 py-1 text-xs text-white rounded transition-colors"
// //                           style={{ backgroundColor: '#ec4899' }}
// //                         >
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Bulk Actions Bar - Shows when items are selected */}
// //             {selectedRows.size > 0 && (
// //               <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xs font-medium text-pink-800">
// //                       {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
// //                     </span>
// //                     <button
// //                       onClick={() => setSelectedRows(new Set())}
// //                       className="text-xs text-pink-600 hover:text-pink-800 underline"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={handleBulkAccept}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
// //                     >
// //                       <Check className="w-4 h-4" />
// //                       Accept ({selectedRows.size})
// //                     </button>
// //                     <button
// //                       onClick={handleBulkReject}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
// //                     >
// //                       <XCircle className="w-4 h-4" />
// //                       Reject ({selectedRows.size})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="w-6 p-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
// //                         onChange={toggleSelectAll}
// //                         className="rounded border-gray-300 focus:ring-pink-500"
// //                         style={{ accentColor: '#ec4899' }}
// //                       />
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeId')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee ID
// //                         {getSortIcon('employeeId')}
// //                       </div>
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeName')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee Name
// //                         {getSortIcon('employeeName')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Status
// //                         {getSortIcon('status')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">From Date</div>
// //                     </th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">To Date</div>
// //                     </th>
// //                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {paginatedData.map((item) => (
// //                     <tr 
// //                       key={item.id} 
// //                       className={`hover:bg-gray-50 transition-colors ${
// //                         selectedRows.has(item.id) ? 'bg-pink-50' : ''
// //                       }`}
// //                       style={{ 
// //                         borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
// //                         borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
// //                       }}
// //                     >
// //                       <td className="p-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedRows.has(item.id)}
// //                           onChange={() => toggleRowSelection(item.id)}
// //                           className="rounded border-gray-300 focus:ring-pink-500"
// //                           style={{ accentColor: '#ec4899' }}
// //                         />
// //                       </td>
// //                       <td className="p-2">
// //                         <span className="text-gray-900 text-xs">{item.employeeId}</span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
// //                           <div className="text-xs text-gray-500 mt-0.5">{item.department}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="text-gray-600 text-xs font-mono">{item.id}</span>
// //                           <div className="text-xs text-gray-500">{item.duration}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <span 
// //                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
// //                           style={{ 
// //                             borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             color: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
// //                           }}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
// //                         <div className="text-xs text-gray-500">{item.duration}</div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.fromDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.fromDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.toDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.toDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="flex items-center justify-center gap-1">
// //                           <button 
// //                             className="text-gray-400 hover:text-green-600 rounded transition-colors" 
// //                             title="Accept Leave Request"
// //                             onClick={() => console.log('Accept Leave Request:', item.id)}
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </button>
// //                           <button 
// //                             className="text-gray-400 hover:text-red-600 rounded transition-colors" 
// //                             title="Reject Leave Request"
// //                             onClick={() => console.log('Reject Leave Request:', item.id)}
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>

// //               {/* Empty State */}
// //               {paginatedData.length === 0 && (
// //                 <div className="text-center py-8">
// //                   <Search className="mx-auto h-8 w-8 text-gray-400" />
// //                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {activeFiltersCount > 0 || searchTerm 
// //                       ? 'Try adjusting your search or filter criteria'
// //                       : 'No leave requests available'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-600">Show:</span>
// //                 {[20, 100, 500, 2500].map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => {
// //                       setItemsPerPage(size);
// //                       setCurrentPage(1);
// //                     }}
// //                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                       itemsPerPage === size
// //                         ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-600">
// //                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
// //                 </span>
                
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Prev
// //                     </button>
                    
// //                     <div className="flex items-center gap-0.5">
// //                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                         const page = i + 1;
// //                         return (
// //                           <button
// //                             key={page}
// //                             onClick={() => setCurrentPage(page)}
// //                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                               currentPage === page
// //                                 ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                             }`}
// //                           >
// //                             {page}
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
                    
// //                     <button
// //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MyLeave;






























// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Link } from 'react-router-dom';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';
// // import { 
// //   Search, Filter, Clock, X, 
// //   ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
// //   Users, Building, AlertCircle 
// // } from 'lucide-react';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // Table state management
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Filter states
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [departmentFilter, setDepartmentFilter] = useState('all');
// //   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
// //   const [dateFilter, setDateFilter] = useState('all');
  
// //   // Sort states
// //   const [sortBy, setSortBy] = useState('fromDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   // Mock data for attendance requests
// //   const mockData = [
// //     {
// //       id: 'HR-ARQ-25-07-001',
// //       employeeName: 'Developer Daiyan',
// //       status: 'Submitted',
// //       employeeId: 'FI-00001',
// //       department: 'Engineering',
// //       reason: 'Sick Leave',
// //       requestType: 'Sick Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-002',
// //       employeeName: 'Sarah Wilson',
// //       status: 'Approved',
// //       employeeId: 'FI-00002',
// //       department: 'Marketing',
// //       reason: 'Medical Appointment',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-20',
// //       duration: '4 hours'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-003',
// //       employeeName: 'John Smith',
// //       status: 'Pending',
// //       employeeId: 'FI-00003',
// //       department: 'Sales',
// //       reason: 'Personal Emergency',
// //       requestType: 'Earned Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-21',
// //       duration: '1 day'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-004',
// //       employeeName: 'Emma Johnson',
// //       status: 'Rejected',
// //       employeeId: 'FI-00004',
// //       department: 'HR',
// //       reason: 'Vacation Request',
// //       requestType: 'Privilege Leave',
// //       fromDate: '2025-08-19',
// //       toDate: '2025-08-25',
// //       duration: '7 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-005',
// //       employeeName: 'Michael Brown',
// //       status: 'Submitted',
// //       employeeId: 'FI-00005',
// //       department: 'Finance',
// //       reason: 'Family Event',
// //       requestType: 'Compensatory Off',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-23',
// //       duration: '3 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-006',
// //       employeeName: 'Lisa Davis',
// //       status: 'Approved',
// //       employeeId: 'FI-00006',
// //       department: 'Engineering',
// //       reason: 'Maternity Leave',
// //       requestType: 'Maternity Leave',
// //       fromDate: '2025-08-18',
// //       toDate: '2025-11-15',
// //       duration: '90 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-007',
// //       employeeName: 'Robert Garcia',
// //       status: 'Pending',
// //       employeeId: 'FI-00007',
// //       department: 'Operations',
// //       reason: 'Extended Leave',
// //       requestType: 'Leave Without Pay',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-24',
// //       duration: '5 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-008',
// //       employeeName: 'Jennifer Lee',
// //       status: 'Submitted',
// //       employeeId: 'FI-00008',
// //       department: 'Marketing',
// //       reason: 'Personal Work',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     }
// //   ];

// //   // Get unique values for filters
// //   const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
// //   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   // Filter and sort data
// //   const filteredData = useMemo(() => {
// //     let result = [...mockData];

// //     // Search filter
// //     if (searchTerm) {
// //       const search = searchTerm.toLowerCase();
// //       result = result.filter(item =>
// //         item.employeeName.toLowerCase().includes(search) ||
// //         item.employeeId.toLowerCase().includes(search) ||
// //         item.id.toLowerCase().includes(search) ||
// //         item.department.toLowerCase().includes(search) ||
// //         item.requestType.toLowerCase().includes(search)
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       result = result.filter(item => item.status === statusFilter);
// //     }

// //     // Department filter
// //     if (departmentFilter !== 'all') {
// //       result = result.filter(item => item.department === departmentFilter);
// //     }

// //     // Request type filter
// //     if (requestTypeFilter !== 'all') {
// //       result = result.filter(item => item.requestType === requestTypeFilter);
// //     }

// //     // Date filter
// //     if (dateFilter !== 'all') {
// //       const now = new Date();
// //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
// //       result = result.filter(item => {
// //         const itemDate = new Date(item.fromDate);
// //         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
// //         switch (dateFilter) {
// //           case 'today': return daysDiff === 0;
// //           case 'yesterday': return daysDiff === 1;
// //           case 'last7days': return daysDiff <= 7;
// //           case 'last30days': return daysDiff <= 30;
// //           case 'thisweek':
// //             const startOfWeek = new Date(today);
// //             startOfWeek.setDate(today.getDate() - today.getDay());
// //             return itemDate >= startOfWeek;
// //           case 'thismonth':
// //             return itemDate.getMonth() === today.getMonth() && 
// //                    itemDate.getFullYear() === today.getFullYear();
// //           default: return true;
// //         }
// //       });
// //     }

// //     // Sort
// //     result.sort((a, b) => {
// //       let aVal, bVal;
      
// //       switch (sortBy) {
// //         case 'employeeName':
// //           aVal = a.employeeName.toLowerCase();
// //           bVal = b.employeeName.toLowerCase();
// //           break;
// //         case 'status':
// //           aVal = a.status.toLowerCase();
// //           bVal = b.status.toLowerCase();
// //           break;
// //         case 'employeeId':
// //           aVal = a.employeeId.toLowerCase();
// //           bVal = b.employeeId.toLowerCase();
// //           break;
// //         case 'fromDate':
// //           aVal = new Date(a.fromDate);
// //           bVal = new Date(b.fromDate);
// //           break;
// //         default:
// //           aVal = a[sortBy];
// //           bVal = b[sortBy];
// //       }

// //       if (sortOrder === 'asc') {
// //         return aVal > bVal ? 1 : -1;
// //       } else {
// //         return aVal < bVal ? 1 : -1;
// //       }
// //     });

// //     return result;
// //   }, [searchTerm, statusFilter, departmentFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
// //       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
// //       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
// //       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const handleSort = (column) => {
// //     if (sortBy === column) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //     } else {
// //       setSortBy(column);
// //       setSortOrder('asc');
// //     }
// //   };

// //   const getSortIcon = (column) => {
// //     if (sortBy !== column) return null;
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="w-3 h-3" /> : 
// //       <ChevronDown className="w-3 h-3" />;
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setStatusFilter('all');
// //     setDepartmentFilter('all');
// //     setRequestTypeFilter('all');
// //     setDateFilter('all');
// //     setCurrentPage(1);
// //   };

// //   const toggleRowSelection = (id) => {
// //     const newSelected = new Set(selectedRows);
// //     if (newSelected.has(id)) {
// //       newSelected.delete(id);
// //     } else {
// //       newSelected.add(id);
// //     }
// //     setSelectedRows(newSelected);
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
// //       setSelectedRows(new Set());
// //     } else {
// //       setSelectedRows(new Set(paginatedData.map(item => item.id)));
// //     }
// //   };

// //   const handleBulkAccept = () => {
// //     console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const handleBulkReject = () => {
// //     console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const activeFiltersCount = [
// //     statusFilter !== 'all',
// //     departmentFilter !== 'all', 
// //     requestTypeFilter !== 'all',
// //     dateFilter !== 'all',
// //     searchTerm.length > 0
// //   ].filter(Boolean).length;

// //   return (
// //     <>
// //       <Header/>
     
// //       <div className="min-h-screen bg-gray-50 p-4">
// //          {/* Manager's Visual Analytics Dashboard */}
// //         <div className="max-w-7xl mx-auto mb-6">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '600px' }}>
            
// //             {loading ? (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="animate-pulse text-center">
// //                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
// //                   <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
// //                   <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="h-full flex flex-col">
                
// //                 {/* Header with Key Metrics */}
// //                 <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-5">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <h2 className="text-xl font-bold mb-1">Leave Analytics Dashboard</h2>
// //                       <p className="text-sm opacity-90">Visual insights for team leave management</p>
// //                     </div>
// //                     <div className="flex items-center space-x-6">
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-yellow-400">{mockData.filter(r => r.status === 'Submitted' || r.status === 'Pending').length}</div>
// //                         <div className="text-xs opacity-90">Requires Action</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-green-400">{mockData.filter(r => r.status === 'Approved').length}</div>
// //                         <div className="text-xs opacity-90">Approved Today</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-blue-400">{Math.round((mockData.filter(r => r.status === 'Approved').length / mockData.length) * 100)}%</div>
// //                         <div className="text-xs opacity-90">Approval Rate</div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Main Dashboard Content */}
// //                 <div className="flex-1 p-5 grid grid-cols-12 gap-4">
                  
// //                   {/* Status Distribution Chart - FIXED DONUT CHART */}
// //                   <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Request Status Distribution</h3>
// //                     <div className="relative h-40">
// //                       {/* Donut Chart */}
// //                       <div className="absolute inset-0 flex items-center justify-center">
// //                         <div className="relative">
// //                           <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
// //                             {/* Background circle */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                            
// //                             {/* Calculate percentages and cumulative offsets */}
// //                             {(() => {
// //                               const submitted = mockData.filter(r => r.status === 'Submitted').length;
// //                               const pending = mockData.filter(r => r.status === 'Pending').length;
// //                               const approved = mockData.filter(r => r.status === 'Approved').length;
// //                               const rejected = mockData.filter(r => r.status === 'Rejected').length;
// //                               const total = mockData.length;
                              
// //                               const submittedPercent = submitted / total;
// //                               const pendingPercent = pending / total;
// //                               const approvedPercent = approved / total;
// //                               const rejectedPercent = rejected / total;
                              
// //                               const circumference = 283; // 2 * π * 45
                              
// //                               const submittedLength = submittedPercent * circumference;
// //                               const pendingLength = pendingPercent * circumference;
// //                               const approvedLength = approvedPercent * circumference;
// //                               const rejectedLength = rejectedPercent * circumference;
                              
// //                               let offset = 0;
                              
// //                               return (
// //                                 <>
// //                                   {/* Submitted (Blue) */}
// //                                   {submitted > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
// //                                       strokeDasharray={`${submittedLength} ${circumference}`}
// //                                       strokeDashoffset={-offset}/>
// //                                   )}
                                  
// //                                   {/* Pending (Orange) */}
// //                                   {pending > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
// //                                       strokeDasharray={`${pendingLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += submittedLength)}/>
// //                                   )}
                                  
// //                                   {/* Approved (Green) */}
// //                                   {approved > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
// //                                       strokeDasharray={`${approvedLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += pendingLength)}/>
// //                                   )}
                                  
// //                                   {/* Rejected (Red) - This was missing! */}
// //                                   {rejected > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
// //                                       strokeDasharray={`${rejectedLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += approvedLength)}/>
// //                                   )}
// //                                 </>
// //                               );
// //                             })()}
// //                           </svg>
                          
// //                           <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                             <span className="text-lg font-bold text-gray-800">{mockData.length}</span>
// //                             <span className="text-xs text-gray-600">Total</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     {/* Legend */}
// //                     <div className="grid grid-cols-2 gap-2 mt-4">
// //                       {[
// //                         { label: 'Submitted', count: mockData.filter(r => r.status === 'Submitted').length, color: 'bg-blue-500' },
// //                         { label: 'Pending', count: mockData.filter(r => r.status === 'Pending').length, color: 'bg-orange-500' },
// //                         { label: 'Approved', count: mockData.filter(r => r.status === 'Approved').length, color: 'bg-green-500' },
// //                         { label: 'Rejected', count: mockData.filter(r => r.status === 'Rejected').length, color: 'bg-red-500' }
// //                       ].map((item, index) => (
// //                         <div key={index} className="flex items-center space-x-2">
// //                           <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
// //                           <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Department Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Department Workload</h3>
// //                     <div className="space-y-3">
// //                       {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept, index) => {
// //                         const deptRequests = mockData.filter(r => r.department === dept).length;
// //                         const maxRequests = Math.max(...['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map(d => 
// //                           mockData.filter(r => r.department === d).length));
// //                         const percentage = maxRequests > 0 ? (deptRequests / maxRequests) * 100 : 0;
// //                         const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{dept}</span>
// //                               <span className="text-xs font-bold text-gray-800">{deptRequests}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Leave Type Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Type Distribution</h3>
// //                     <div className="space-y-3">
// //                       {uniqueRequestTypes.map((type, index) => {
// //                         const typeCount = mockData.filter(r => r.requestType === type).length;
// //                         const percentage = (typeCount / mockData.length) * 100;
// //                         const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{type}</span>
// //                               <span className="text-xs font-bold text-gray-800">{typeCount}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                             <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}%</div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Timeline View */}
// //                   <div className="col-span-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Timeline (Next 7 Days)</h3>
// //                     <div className="relative h-48">
// //                       {/* Timeline Grid */}
// //                       <div className="absolute inset-0">
// //                         {/* Date Headers */}
// //                         <div className="flex border-b border-gray-200 pb-2 mb-3">
// //                           {Array.from({length: 7}, (_, i) => {
// //                             const date = new Date();
// //                             date.setDate(date.getDate() + i);
// //                             return (
// //                               <div key={i} className="flex-1 text-center">
// //                                 <div className="text-xs font-medium text-gray-700">
// //                                   {date.toLocaleDateString('en-US', { weekday: 'short' })}
// //                                 </div>
// //                                 <div className="text-xs text-gray-500">
// //                                   {date.getDate()}
// //                                 </div>
// //                               </div>
// //                             );
// //                           })}
// //                         </div>
                        
// //                         {/* Timeline Bars */}
// //                         <div className="space-y-2">
// //                           {mockData.filter(r => r.status === 'Approved').slice(0, 6).map((request, index) => {
// //                             const startDate = new Date(request.fromDate);
// //                             const today = new Date();
// //                             const daysFromToday = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
// //                             const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400'];
                            
// //                             if (daysFromToday >= 0 && daysFromToday < 7) {
// //                               return (
// //                                 <div key={index} className="flex items-center h-6">
// //                                   <div className="w-16 text-xs text-gray-600 truncate">{request.employeeName.split(' ')[0]}</div>
// //                                   <div className="flex-1 relative">
// //                                     <div 
// //                                       className={`absolute h-4 ${colors[index % colors.length]} rounded opacity-75 flex items-center px-1`}
// //                                       style={{ 
// //                                         left: `${(daysFromToday / 7) * 100}%`, 
// //                                         width: `${Math.min((parseInt(request.duration) / 7) * 100, 20)}%` 
// //                                       }}
// //                                     >
// //                                       <span className="text-xs text-white font-medium truncate">{request.requestType}</span>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               );
// //                             }
// //                             return null;
// //                           })}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Quick Actions Panel */}
// //                   <div className="col-span-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Smart Actions</h3>
// //                     <div className="space-y-2">
// //                       <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-xs font-medium shadow-sm">
// //                         🚀 Auto-Approve Requests ({mockData.filter(r => r.status === 'Submitted').length})
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-xs font-medium shadow-sm">
// //                         📊 Generate Team Report
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-xs font-medium shadow-sm">
// //                         🔔 Setup Smart Alerts
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-xs font-medium shadow-sm">
// //                         📅 Conflict Detection
// //                       </button>
// //                     </div>
                    
// //                     {/* AI Insights */}
// //                     <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
// //                       <div className="flex items-start space-x-2">
// //                         <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
// //                         <div>
// //                           <div className="text-xs font-medium text-gray-800">AI Insight</div>
// //                           <div className="text-xs text-gray-600">Engineering team has 40% more requests this week. Consider workload balancing.</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                 </div>

// //               </div>
// //             )}
// //           </div>
// //         </div>

// //       {/* Leave Requests Table Section */}
// //       <div className="max-w-7xl mx-auto">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
// //             {/* Top Header */}
// //             <div className="flex items-center justify-between p-3 border-b border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
// //               </div>
              
// //               {/* Always Visible Search Bar */}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-72 relative">
// //                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by employee name, ID, department, leave type..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
// //                     style={{ focusRingColor: '#ec4899' }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
// //                     >
// //                       <X className="w-2 h-2" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <Link 
// //                   to="/dashboard/leaverequest"
// //                   className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
// //                 >
// //                   <Plus className="w-3 h-3" />
// //                   Add Request
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Search Results Info */}
// //             {searchTerm && (
// //               <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
// //                 <div className="text-xs text-blue-700">
// //                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
// //                 </div>
// //               </div>
// //             )}

// //             {/* Filter Section */}
// //             <div className="border-b border-gray-200">
// //               {/* Filter Toggle Bar */}
// //               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={() => setShowFilter(!showFilter)}
// //                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
// //                       showFilter 
// //                         ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
// //                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
// //                     }`}
// //                     style={{ 
// //                       borderColor: showFilter ? '#ec4899' : undefined,
// //                       color: showFilter ? '#ec4899' : undefined,
// //                       backgroundColor: showFilter ? '#fdf2f8' : undefined
// //                     }}
// //                   >
// //                     <Filter className="w-2.5 h-2.5" />
// //                     <span className="font-medium">Filters</span>
// //                     {activeFiltersCount > 0 && (
// //                       <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
// //                         {activeFiltersCount}
// //                       </span>
// //                     )}
// //                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
// //                   </button>

// //                   <div className="h-4 w-px bg-gray-300"></div>

// //                   <div className="flex items-center gap-1.5">
// //                     <Clock className="w-3 h-3 text-gray-400" />
// //                     <span className="text-xs text-gray-600">Leave Requests</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="text-xs text-gray-600">
// //                     {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
// //                   </span>
// //                   <Calendar className="w-3 h-3 text-gray-400" />
// //                 </div>
// //               </div>

// //               {/* Advanced Filters Panel */}
// //               {showFilter && (
// //                 <div className="px-3 py-3 bg-white border-t border-gray-100">
// //                   <div className="space-y-3">
// //                     {/* Filter Grid */}
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                       {/* Status Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Status
// //                         </label>
// //                         <select
// //                           value={statusFilter}
// //                           onChange={(e) => setStatusFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Status</option>
// //                           <option value="Submitted">Submitted</option>
// //                           <option value="Approved">Approved</option>
// //                           <option value="Pending">Pending</option>
// //                           <option value="Rejected">Rejected</option>
// //                         </select>
// //                       </div>

// //                       {/* Department Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Building className="w-3 h-3 text-gray-400" />
// //                           Department
// //                         </label>
// //                         <select
// //                           value={departmentFilter}
// //                           onChange={(e) => setDepartmentFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Departments</option>
// //                           {uniqueDepartments.map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Request Type Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Users className="w-3 h-3 text-gray-400" />
// //                           Leave Type
// //                         </label>
// //                         <select
// //                           value={requestTypeFilter}
// //                           onChange={(e) => setRequestTypeFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Types</option>
// //                           {uniqueRequestTypes.map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Date Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Calendar className="w-3 h-3 text-gray-400" />
// //                           From Date Range
// //                         </label>
// //                         <select
// //                           value={dateFilter}
// //                           onChange={(e) => setDateFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Dates</option>
// //                           <option value="today">Today</option>
// //                           <option value="yesterday">Yesterday</option>
// //                           <option value="thisweek">This Week</option>
// //                           <option value="last7days">Last 7 Days</option>
// //                           <option value="thismonth">This Month</option>
// //                           <option value="last30days">Last 30 Days</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Filter Actions */}
// //                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
// //                       <div className="text-xs text-gray-500">
// //                         {activeFiltersCount > 0 ? (
// //                           <span className="flex items-center gap-1">
// //                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
// //                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
// //                           </span>
// //                         ) : (
// //                           'No filters applied'
// //                         )}
// //                       </div>
// //                       <div className="flex items-center gap-1.5">
// //                         <button
// //                           onClick={clearAllFilters}
// //                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
// //                         >
// //                           Clear All
// //                         </button>
// //                         <button
// //                           onClick={() => setShowFilter(false)}
// //                           className="px-2 py-1 text-xs text-white rounded transition-colors"
// //                           style={{ backgroundColor: '#ec4899' }}
// //                         >
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Bulk Actions Bar - Shows when items are selected */}
// //             {selectedRows.size > 0 && (
// //               <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xs font-medium text-pink-800">
// //                       {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
// //                     </span>
// //                     <button
// //                       onClick={() => setSelectedRows(new Set())}
// //                       className="text-xs text-pink-600 hover:text-pink-800 underline"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={handleBulkAccept}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
// //                     >
// //                       <Check className="w-4 h-4" />
// //                       Accept ({selectedRows.size})
// //                     </button>
// //                     <button
// //                       onClick={handleBulkReject}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
// //                     >
// //                       <XCircle className="w-4 h-4" />
// //                       Reject ({selectedRows.size})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="w-6 p-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
// //                         onChange={toggleSelectAll}
// //                         className="rounded border-gray-300 focus:ring-pink-500"
// //                         style={{ accentColor: '#ec4899' }}
// //                       />
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeId')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee ID
// //                         {getSortIcon('employeeId')}
// //                       </div>
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeName')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee Name
// //                         {getSortIcon('employeeName')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Status
// //                         {getSortIcon('status')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">From Date</div>
// //                     </th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">To Date</div>
// //                     </th>
// //                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {paginatedData.map((item) => (
// //                     <tr 
// //                       key={item.id} 
// //                       className={`hover:bg-gray-50 transition-colors ${
// //                         selectedRows.has(item.id) ? 'bg-pink-50' : ''
// //                       }`}
// //                       style={{ 
// //                         borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
// //                         borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
// //                       }}
// //                     >
// //                       <td className="p-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedRows.has(item.id)}
// //                           onChange={() => toggleRowSelection(item.id)}
// //                           className="rounded border-gray-300 focus:ring-pink-500"
// //                           style={{ accentColor: '#ec4899' }}
// //                         />
// //                       </td>
// //                       <td className="p-2">
// //                         <span className="text-gray-900 text-xs">{item.employeeId}</span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
// //                           <div className="text-xs text-gray-500 mt-0.5">{item.department}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="text-gray-600 text-xs font-mono">{item.id}</span>
// //                           <div className="text-xs text-gray-500">{item.duration}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <span 
// //                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
// //                           style={{ 
// //                             borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             color: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
// //                           }}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
// //                         <div className="text-xs text-gray-500">{item.duration}</div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.fromDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.fromDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.toDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.toDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="flex items-center justify-center gap-1">
// //                           <button 
// //                             className="text-gray-400 hover:text-green-600 rounded transition-colors" 
// //                             title="Accept Leave Request"
// //                             onClick={() => console.log('Accept Leave Request:', item.id)}
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </button>
// //                           <button 
// //                             className="text-gray-400 hover:text-red-600 rounded transition-colors" 
// //                             title="Reject Leave Request"
// //                             onClick={() => console.log('Reject Leave Request:', item.id)}
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>

// //               {/* Empty State */}
// //               {paginatedData.length === 0 && (
// //                 <div className="text-center py-8">
// //                   <Search className="mx-auto h-8 w-8 text-gray-400" />
// //                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {activeFiltersCount > 0 || searchTerm 
// //                       ? 'Try adjusting your search or filter criteria'
// //                       : 'No leave requests available'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-600">Show:</span>
// //                 {[20, 100, 500, 2500].map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => {
// //                       setItemsPerPage(size);
// //                       setCurrentPage(1);
// //                     }}
// //                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                       itemsPerPage === size
// //                         ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-600">
// //                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
// //                 </span>
                
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Prev
// //                     </button>
                    
// //                     <div className="flex items-center gap-0.5">
// //                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                         const page = i + 1;
// //                         return (
// //                           <button
// //                             key={page}
// //                             onClick={() => setCurrentPage(page)}
// //                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                               currentPage === page
// //                                 ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                             }`}
// //                           >
// //                             {page}
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
                    
// //                     <button
// //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MyLeave;













// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Link } from 'react-router-dom';
// // import './MyLeave.css';
// // import { fetchLeaveBalance } from '../Home/dashboardApi';
// // import Header from '../Header/Header';
// // import { 
// //   Search, Filter, Clock, X, 
// //   ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
// //   Users, Building, AlertCircle 
// // } from 'lucide-react';

// // const MyLeave = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // Table state management
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [itemsPerPage, setItemsPerPage] = useState(20);
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Filter states
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('all');
// //   const [departmentFilter, setDepartmentFilter] = useState('all');
// //   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
// //   const [dateFilter, setDateFilter] = useState('all');
  
// //   // Sort states
// //   const [sortBy, setSortBy] = useState('fromDate');
// //   const [sortOrder, setSortOrder] = useState('desc');

// //   // Mock data for attendance requests
// //   const mockData = [
// //     {
// //       id: 'HR-ARQ-25-07-001',
// //       employeeName: 'Developer Daiyan',
// //       status: 'Submitted',
// //       employeeId: 'FI-00001',
// //       department: 'Engineering',
// //       reason: 'Sick Leave',
// //       requestType: 'Sick Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-002',
// //       employeeName: 'Sarah Wilson',
// //       status: 'Approved',
// //       employeeId: 'FI-00002',
// //       department: 'Marketing',
// //       reason: 'Medical Appointment',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-20',
// //       duration: '4 hours'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-003',
// //       employeeName: 'John Smith',
// //       status: 'Pending',
// //       employeeId: 'FI-00003',
// //       department: 'Sales',
// //       reason: 'Personal Emergency',
// //       requestType: 'Earned Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-21',
// //       duration: '1 day'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-004',
// //       employeeName: 'Emma Johnson',
// //       status: 'Rejected',
// //       employeeId: 'FI-00004',
// //       department: 'HR',
// //       reason: 'Vacation Request',
// //       requestType: 'Privilege Leave',
// //       fromDate: '2025-08-19',
// //       toDate: '2025-08-25',
// //       duration: '7 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-005',
// //       employeeName: 'Michael Brown',
// //       status: 'Submitted',
// //       employeeId: 'FI-00005',
// //       department: 'Finance',
// //       reason: 'Family Event',
// //       requestType: 'Compensatory Off',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-23',
// //       duration: '3 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-006',
// //       employeeName: 'Lisa Davis',
// //       status: 'Approved',
// //       employeeId: 'FI-00006',
// //       department: 'Engineering',
// //       reason: 'Maternity Leave',
// //       requestType: 'Maternity Leave',
// //       fromDate: '2025-08-18',
// //       toDate: '2025-11-15',
// //       duration: '90 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-007',
// //       employeeName: 'Robert Garcia',
// //       status: 'Pending',
// //       employeeId: 'FI-00007',
// //       department: 'Operations',
// //       reason: 'Extended Leave',
// //       requestType: 'Leave Without Pay',
// //       fromDate: '2025-08-20',
// //       toDate: '2025-08-24',
// //       duration: '5 days'
// //     },
// //     {
// //       id: 'HR-ARQ-25-07-008',
// //       employeeName: 'Jennifer Lee',
// //       status: 'Submitted',
// //       employeeId: 'FI-00008',
// //       department: 'Marketing',
// //       reason: 'Personal Work',
// //       requestType: 'Casual Leave',
// //       fromDate: '2025-08-21',
// //       toDate: '2025-08-22',
// //       duration: '2 days'
// //     }
// //   ];

// //   // Get unique values for filters
// //   const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
// //   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

// //   useEffect(() => {
// //     const employeeId = localStorage.getItem('employee_id');
// //     if (!employeeId) {
// //       console.error("❌ Employee ID not found in localStorage.");
// //       setLoading(false);
// //       return;
// //     }

// //     const loadLeaves = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchLeaveBalance(employeeId);
// //         console.log("✅ Leave Balance Response:", data);

// //         // Convert object to array
// //         const converted = Object.entries(data).map(([type, total]) => ({
// //           leave_type: type,
// //           total: total,
// //         }));

// //         setLeaveData(converted);
// //       } catch (error) {
// //         console.error("❌ Error fetching leave data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadLeaves();
// //   }, []);

// //   // Filter and sort data
// //   const filteredData = useMemo(() => {
// //     let result = [...mockData];

// //     // Search filter
// //     if (searchTerm) {
// //       const search = searchTerm.toLowerCase();
// //       result = result.filter(item =>
// //         item.employeeName.toLowerCase().includes(search) ||
// //         item.employeeId.toLowerCase().includes(search) ||
// //         item.id.toLowerCase().includes(search) ||
// //         item.department.toLowerCase().includes(search) ||
// //         item.requestType.toLowerCase().includes(search)
// //       );
// //     }

// //     // Status filter
// //     if (statusFilter !== 'all') {
// //       result = result.filter(item => item.status === statusFilter);
// //     }

// //     // Department filter
// //     if (departmentFilter !== 'all') {
// //       result = result.filter(item => item.department === departmentFilter);
// //     }

// //     // Request type filter
// //     if (requestTypeFilter !== 'all') {
// //       result = result.filter(item => item.requestType === requestTypeFilter);
// //     }

// //     // Date filter
// //     if (dateFilter !== 'all') {
// //       const now = new Date();
// //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
// //       result = result.filter(item => {
// //         const itemDate = new Date(item.fromDate);
// //         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
// //         switch (dateFilter) {
// //           case 'today': return daysDiff === 0;
// //           case 'yesterday': return daysDiff === 1;
// //           case 'last7days': return daysDiff <= 7;
// //           case 'last30days': return daysDiff <= 30;
// //           case 'thisweek':
// //             const startOfWeek = new Date(today);
// //             startOfWeek.setDate(today.getDate() - today.getDay());
// //             return itemDate >= startOfWeek;
// //           case 'thismonth':
// //             return itemDate.getMonth() === today.getMonth() && 
// //                    itemDate.getFullYear() === today.getFullYear();
// //           default: return true;
// //         }
// //       });
// //     }

// //     // Sort
// //     result.sort((a, b) => {
// //       let aVal, bVal;
      
// //       switch (sortBy) {
// //         case 'employeeName':
// //           aVal = a.employeeName.toLowerCase();
// //           bVal = b.employeeName.toLowerCase();
// //           break;
// //         case 'status':
// //           aVal = a.status.toLowerCase();
// //           bVal = b.status.toLowerCase();
// //           break;
// //         case 'employeeId':
// //           aVal = a.employeeId.toLowerCase();
// //           bVal = b.employeeId.toLowerCase();
// //           break;
// //         case 'fromDate':
// //           aVal = new Date(a.fromDate);
// //           bVal = new Date(b.fromDate);
// //           break;
// //         default:
// //           aVal = a[sortBy];
// //           bVal = b[sortBy];
// //       }

// //       if (sortOrder === 'asc') {
// //         return aVal > bVal ? 1 : -1;
// //       } else {
// //         return aVal < bVal ? 1 : -1;
// //       }
// //     });

// //     return result;
// //   }, [searchTerm, statusFilter, departmentFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

// //   // Pagination
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
// //       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
// //       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
// //       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const handleSort = (column) => {
// //     if (sortBy === column) {
// //       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
// //     } else {
// //       setSortBy(column);
// //       setSortOrder('asc');
// //     }
// //   };

// //   const getSortIcon = (column) => {
// //     if (sortBy !== column) return null;
// //     return sortOrder === 'asc' ? 
// //       <ChevronUp className="w-3 h-3" /> : 
// //       <ChevronDown className="w-3 h-3" />;
// //   };

// //   const clearAllFilters = () => {
// //     setSearchTerm('');
// //     setStatusFilter('all');
// //     setDepartmentFilter('all');
// //     setRequestTypeFilter('all');
// //     setDateFilter('all');
// //     setCurrentPage(1);
// //   };

// //   const toggleRowSelection = (id) => {
// //     const newSelected = new Set(selectedRows);
// //     if (newSelected.has(id)) {
// //       newSelected.delete(id);
// //     } else {
// //       newSelected.add(id);
// //     }
// //     setSelectedRows(newSelected);
// //   };

// //   const toggleSelectAll = () => {
// //     if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
// //       setSelectedRows(new Set());
// //     } else {
// //       setSelectedRows(new Set(paginatedData.map(item => item.id)));
// //     }
// //   };

// //   const handleBulkAccept = () => {
// //     console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const handleBulkReject = () => {
// //     console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
// //     setSelectedRows(new Set());
// //   };

// //   const activeFiltersCount = [
// //     statusFilter !== 'all',
// //     departmentFilter !== 'all', 
// //     requestTypeFilter !== 'all',
// //     dateFilter !== 'all',
// //     searchTerm.length > 0
// //   ].filter(Boolean).length;

// //   return (
// //     <>
// //       <Header/>
// //       {/* Manager's Visual Analytics Dashboard */}
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-7xl mx-auto mb-6">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '450px' }}>
            
// //             {loading ? (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="animate-pulse text-center">
// //                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
// //                   <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
// //                   <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="h-full flex flex-col">
                
// //                 {/* Header with Key Metrics */}
// //                 <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-5">
// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <h2 className="text-xl font-bold mb-1">Leave Analytics Dashboard</h2>
// //                       <p className="text-sm opacity-90">Visual insights for team leave management</p>
// //                     </div>
// //                     <div className="flex items-center space-x-6">
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-yellow-400">{mockData.filter(r => r.status === 'Submitted' || r.status === 'Pending').length}</div>
// //                         <div className="text-xs opacity-90">Requires Action</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-green-400">{mockData.filter(r => r.status === 'Approved').length}</div>
// //                         <div className="text-xs opacity-90">Approved Today</div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="text-2xl font-bold text-blue-400">{Math.round((mockData.filter(r => r.status === 'Approved').length / mockData.length) * 100)}%</div>
// //                         <div className="text-xs opacity-90">Approval Rate</div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Main Dashboard Content */}
// //                 <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  
// //                   {/* Status Distribution Chart - FIXED DONUT CHART */}
// //                   <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Request Status Distribution</h3>
// //                     <div className="relative h-32">
// //                       {/* Donut Chart */}
// //                       <div className="absolute inset-0 flex items-center justify-center">
// //                         <div className="relative">
// //                           <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
// //                             {/* Background circle */}
// //                             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                            
// //                             {/* Calculate percentages and cumulative offsets */}
// //                             {(() => {
// //                               const submitted = mockData.filter(r => r.status === 'Submitted').length;
// //                               const pending = mockData.filter(r => r.status === 'Pending').length;
// //                               const approved = mockData.filter(r => r.status === 'Approved').length;
// //                               const rejected = mockData.filter(r => r.status === 'Rejected').length;
// //                               const total = mockData.length;
                              
// //                               const submittedPercent = submitted / total;
// //                               const pendingPercent = pending / total;
// //                               const approvedPercent = approved / total;
// //                               const rejectedPercent = rejected / total;
                              
// //                               const circumference = 283; // 2 * π * 45
                              
// //                               const submittedLength = submittedPercent * circumference;
// //                               const pendingLength = pendingPercent * circumference;
// //                               const approvedLength = approvedPercent * circumference;
// //                               const rejectedLength = rejectedPercent * circumference;
                              
// //                               let offset = 0;
                              
// //                               return (
// //                                 <>
// //                                   {/* Submitted (Blue) */}
// //                                   {submitted > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
// //                                       strokeDasharray={`${submittedLength} ${circumference}`}
// //                                       strokeDashoffset={-offset}/>
// //                                   )}
                                  
// //                                   {/* Pending (Orange) */}
// //                                   {pending > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
// //                                       strokeDasharray={`${pendingLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += submittedLength)}/>
// //                                   )}
                                  
// //                                   {/* Approved (Green) */}
// //                                   {approved > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
// //                                       strokeDasharray={`${approvedLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += pendingLength)}/>
// //                                   )}
                                  
// //                                   {/* Rejected (Red) - This was missing! */}
// //                                   {rejected > 0 && (
// //                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
// //                                       strokeDasharray={`${rejectedLength} ${circumference}`}
// //                                       strokeDashoffset={-(offset += approvedLength)}/>
// //                                   )}
// //                                 </>
// //                               );
// //                             })()}
// //                           </svg>
                          
// //                           <div className="absolute inset-0 flex flex-col items-center justify-center">
// //                             <span className="text-base font-bold text-gray-800">{mockData.length}</span>
// //                             <span className="text-xs text-gray-600">Total</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     {/* Legend */}
// //                     <div className="grid grid-cols-2 gap-2 mt-4">
// //                       {[
// //                         { label: 'Submitted', count: mockData.filter(r => r.status === 'Submitted').length, color: 'bg-blue-500' },
// //                         { label: 'Pending', count: mockData.filter(r => r.status === 'Pending').length, color: 'bg-orange-500' },
// //                         { label: 'Approved', count: mockData.filter(r => r.status === 'Approved').length, color: 'bg-green-500' },
// //                         { label: 'Rejected', count: mockData.filter(r => r.status === 'Rejected').length, color: 'bg-red-500' }
// //                       ].map((item, index) => (
// //                         <div key={index} className="flex items-center space-x-2">
// //                           <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
// //                           <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Department Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Department Workload</h3>
// //                     <div className="space-y-3">
// //                       {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept, index) => {
// //                         const deptRequests = mockData.filter(r => r.department === dept).length;
// //                         const maxRequests = Math.max(...['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map(d => 
// //                           mockData.filter(r => r.department === d).length));
// //                         const percentage = maxRequests > 0 ? (deptRequests / maxRequests) * 100 : 0;
// //                         const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{dept}</span>
// //                               <span className="text-xs font-bold text-gray-800">{deptRequests}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Leave Type Analysis */}
// //                   <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Type Distribution</h3>
// //                     <div className="space-y-3">
// //                       {uniqueRequestTypes.map((type, index) => {
// //                         const typeCount = mockData.filter(r => r.requestType === type).length;
// //                         const percentage = (typeCount / mockData.length) * 100;
// //                         const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        
// //                         return (
// //                           <div key={index} className="relative">
// //                             <div className="flex items-center justify-between mb-1">
// //                               <span className="text-xs font-medium text-gray-700">{type}</span>
// //                               <span className="text-xs font-bold text-gray-800">{typeCount}</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
// //                                 style={{ width: `${Math.max(percentage, 5)}%` }}
// //                               ></div>
// //                             </div>
// //                             <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}%</div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   {/* Timeline View */}
// //                   <div className="col-span-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-3 border border-gray-200">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Timeline (Next 7 Days)</h3>
// //                     <div className="relative h-36">
// //                       {/* Timeline Grid */}
// //                       <div className="absolute inset-0">
// //                         {/* Date Headers */}
// //                         <div className="flex border-b border-gray-200 pb-2 mb-3">
// //                           {Array.from({length: 7}, (_, i) => {
// //                             const date = new Date();
// //                             date.setDate(date.getDate() + i);
// //                             return (
// //                               <div key={i} className="flex-1 text-center">
// //                                 <div className="text-xs font-medium text-gray-700">
// //                                   {date.toLocaleDateString('en-US', { weekday: 'short' })}
// //                                 </div>
// //                                 <div className="text-xs text-gray-500">
// //                                   {date.getDate()}
// //                                 </div>
// //                               </div>
// //                             );
// //                           })}
// //                         </div>
                        
// //                         {/* Timeline Bars */}
// //                         <div className="space-y-2">
// //                           {mockData.filter(r => r.status === 'Approved').slice(0, 6).map((request, index) => {
// //                             const startDate = new Date(request.fromDate);
// //                             const today = new Date();
// //                             const daysFromToday = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
// //                             const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400'];
                            
// //                             if (daysFromToday >= 0 && daysFromToday < 7) {
// //                               return (
// //                                 <div key={index} className="flex items-center h-6">
// //                                   <div className="w-16 text-xs text-gray-600 truncate">{request.employeeName.split(' ')[0]}</div>
// //                                   <div className="flex-1 relative">
// //                                     <div 
// //                                       className={`absolute h-4 ${colors[index % colors.length]} rounded opacity-75 flex items-center px-1`}
// //                                       style={{ 
// //                                         left: `${(daysFromToday / 7) * 100}%`, 
// //                                         width: `${Math.min((parseInt(request.duration) / 7) * 100, 20)}%` 
// //                                       }}
// //                                     >
// //                                       <span className="text-xs text-white font-medium truncate">{request.requestType}</span>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               );
// //                             }
// //                             return null;
// //                           })}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Quick Actions Panel */}
// //                   <div className="col-span-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border border-orange-100">
// //                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Smart Actions</h3>
// //                     <div className="space-y-2">
// //                       <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-xs font-medium shadow-sm">
// //                         🚀 Auto-Approve Requests ({mockData.filter(r => r.status === 'Submitted').length})
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-xs font-medium shadow-sm">
// //                         📊 Generate Team Report
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-xs font-medium shadow-sm">
// //                         🔔 Setup Smart Alerts
// //                       </button>
// //                       <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-xs font-medium shadow-sm">
// //                         📅 Conflict Detection
// //                       </button>
// //                     </div>
                    
// //                     {/* AI Insights */}
// //                     <div className="mt-4 p-3 bg-white rounded-lg border border-orange-200">
// //                       <div className="flex items-start space-x-2">
// //                         <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
// //                         <div>
// //                           <div className="text-xs font-medium text-gray-800">AI Insight</div>
// //                           <div className="text-xs text-gray-600">Engineering team has 40% more requests this week. Consider workload balancing.</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                 </div>

// //               </div>
// //             )}
// //           </div>
// //         </div>

// //       {/* Leave Requests Table Section */}
// //       <div className="max-w-7xl mx-auto">
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
// //             {/* Top Header */}
// //             <div className="flex items-center justify-between p-3 border-b border-gray-200">
// //               <div className="flex items-center gap-4">
// //                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
// //               </div>
              
// //               {/* Always Visible Search Bar */}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-72 relative">
// //                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by employee name, ID, department, leave type..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
// //                     style={{ focusRingColor: '#ec4899' }}
// //                   />
// //                   {searchTerm && (
// //                     <button
// //                       onClick={() => setSearchTerm('')}
// //                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
// //                     >
// //                       <X className="w-2 h-2" />
// //                     </button>
// //                   )}
// //                 </div>
                
// //                 <Link 
// //                   to="/dashboard/leaverequest"
// //                   className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
// //                 >
// //                   <Plus className="w-3 h-3" />
// //                   Add Request
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Search Results Info */}
// //             {searchTerm && (
// //               <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
// //                 <div className="text-xs text-blue-700">
// //                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
// //                 </div>
// //               </div>
// //             )}

// //             {/* Filter Section */}
// //             <div className="border-b border-gray-200">
// //               {/* Filter Toggle Bar */}
// //               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <button
// //                     onClick={() => setShowFilter(!showFilter)}
// //                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
// //                       showFilter 
// //                         ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
// //                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
// //                     }`}
// //                     style={{ 
// //                       borderColor: showFilter ? '#ec4899' : undefined,
// //                       color: showFilter ? '#ec4899' : undefined,
// //                       backgroundColor: showFilter ? '#fdf2f8' : undefined
// //                     }}
// //                   >
// //                     <Filter className="w-2.5 h-2.5" />
// //                     <span className="font-medium">Filters</span>
// //                     {activeFiltersCount > 0 && (
// //                       <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
// //                         {activeFiltersCount}
// //                       </span>
// //                     )}
// //                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
// //                   </button>

// //                   <div className="h-4 w-px bg-gray-300"></div>

// //                   <div className="flex items-center gap-1.5">
// //                     <Clock className="w-3 h-3 text-gray-400" />
// //                     <span className="text-xs text-gray-600">Leave Requests</span>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="text-xs text-gray-600">
// //                     {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
// //                   </span>
// //                   <Calendar className="w-3 h-3 text-gray-400" />
// //                 </div>
// //               </div>

// //               {/* Advanced Filters Panel */}
// //               {showFilter && (
// //                 <div className="px-3 py-3 bg-white border-t border-gray-100">
// //                   <div className="space-y-3">
// //                     {/* Filter Grid */}
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                       {/* Status Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <AlertCircle className="w-3 h-3 text-gray-400" />
// //                           Status
// //                         </label>
// //                         <select
// //                           value={statusFilter}
// //                           onChange={(e) => setStatusFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Status</option>
// //                           <option value="Submitted">Submitted</option>
// //                           <option value="Approved">Approved</option>
// //                           <option value="Pending">Pending</option>
// //                           <option value="Rejected">Rejected</option>
// //                         </select>
// //                       </div>

// //                       {/* Department Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Building className="w-3 h-3 text-gray-400" />
// //                           Department
// //                         </label>
// //                         <select
// //                           value={departmentFilter}
// //                           onChange={(e) => setDepartmentFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Departments</option>
// //                           {uniqueDepartments.map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Request Type Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Users className="w-3 h-3 text-gray-400" />
// //                           Leave Type
// //                         </label>
// //                         <select
// //                           value={requestTypeFilter}
// //                           onChange={(e) => setRequestTypeFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Types</option>
// //                           {uniqueRequestTypes.map(type => (
// //                             <option key={type} value={type}>{type}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       {/* Date Filter */}
// //                       <div className="space-y-1">
// //                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
// //                           <Calendar className="w-3 h-3 text-gray-400" />
// //                           From Date Range
// //                         </label>
// //                         <select
// //                           value={dateFilter}
// //                           onChange={(e) => setDateFilter(e.target.value)}
// //                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
// //                         >
// //                           <option value="all">All Dates</option>
// //                           <option value="today">Today</option>
// //                           <option value="yesterday">Yesterday</option>
// //                           <option value="thisweek">This Week</option>
// //                           <option value="last7days">Last 7 Days</option>
// //                           <option value="thismonth">This Month</option>
// //                           <option value="last30days">Last 30 Days</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {/* Filter Actions */}
// //                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
// //                       <div className="text-xs text-gray-500">
// //                         {activeFiltersCount > 0 ? (
// //                           <span className="flex items-center gap-1">
// //                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
// //                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
// //                           </span>
// //                         ) : (
// //                           'No filters applied'
// //                         )}
// //                       </div>
// //                       <div className="flex items-center gap-1.5">
// //                         <button
// //                           onClick={clearAllFilters}
// //                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
// //                         >
// //                           Clear All
// //                         </button>
// //                         <button
// //                           onClick={() => setShowFilter(false)}
// //                           className="px-2 py-1 text-xs text-white rounded transition-colors"
// //                           style={{ backgroundColor: '#ec4899' }}
// //                         >
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Bulk Actions Bar - Shows when items are selected */}
// //             {selectedRows.size > 0 && (
// //               <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-xs font-medium text-pink-800">
// //                       {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
// //                     </span>
// //                     <button
// //                       onClick={() => setSelectedRows(new Set())}
// //                       className="text-xs text-pink-600 hover:text-pink-800 underline"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={handleBulkAccept}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
// //                     >
// //                       <Check className="w-4 h-4" />
// //                       Accept ({selectedRows.size})
// //                     </button>
// //                     <button
// //                       onClick={handleBulkReject}
// //                       className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
// //                     >
// //                       <XCircle className="w-4 h-4" />
// //                       Reject ({selectedRows.size})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="w-6 p-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
// //                         onChange={toggleSelectAll}
// //                         className="rounded border-gray-300 focus:ring-pink-500"
// //                         style={{ accentColor: '#ec4899' }}
// //                       />
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeId')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee ID
// //                         {getSortIcon('employeeId')}
// //                       </div>
// //                     </th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('employeeName')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Employee Name
// //                         {getSortIcon('employeeName')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
// //                     <th 
// //                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       <div className="flex items-center gap-1">
// //                         Status
// //                         {getSortIcon('status')}
// //                       </div>
// //                     </th>
// //                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">From Date</div>
// //                     </th>
// //                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
// //                       <Calendar className="w-3 h-3 mx-auto" />
// //                       <div className="text-xs mt-0.5">To Date</div>
// //                     </th>
// //                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {paginatedData.map((item) => (
// //                     <tr 
// //                       key={item.id} 
// //                       className={`hover:bg-gray-50 transition-colors ${
// //                         selectedRows.has(item.id) ? 'bg-pink-50' : ''
// //                       }`}
// //                       style={{ 
// //                         borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
// //                         borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
// //                       }}
// //                     >
// //                       <td className="p-2">
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedRows.has(item.id)}
// //                           onChange={() => toggleRowSelection(item.id)}
// //                           className="rounded border-gray-300 focus:ring-pink-500"
// //                           style={{ accentColor: '#ec4899' }}
// //                         />
// //                       </td>
// //                       <td className="p-2">
// //                         <span className="text-gray-900 text-xs">{item.employeeId}</span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
// //                           <div className="text-xs text-gray-500 mt-0.5">{item.department}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div>
// //                           <span className="text-gray-600 text-xs font-mono">{item.id}</span>
// //                           <div className="text-xs text-gray-500">{item.duration}</div>
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <span 
// //                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
// //                           style={{ 
// //                             borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             color: item.status === 'Submitted' ? '#ec4899' : undefined,
// //                             backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
// //                           }}
// //                         >
// //                           {item.status}
// //                         </span>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
// //                         <div className="text-xs text-gray-500">{item.duration}</div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.fromDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.fromDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2 text-center">
// //                         <div className="text-xs text-gray-600 font-medium">
// //                           {new Date(item.toDate).toLocaleDateString('en-US', { 
// //                             month: 'short', 
// //                             day: 'numeric' 
// //                           })}
// //                         </div>
// //                         <div className="text-xs text-gray-400">
// //                           {new Date(item.toDate).getFullYear()}
// //                         </div>
// //                       </td>
// //                       <td className="p-2">
// //                         <div className="flex items-center justify-center gap-1">
// //                           <button 
// //                             className="text-gray-400 hover:text-green-600 rounded transition-colors" 
// //                             title="Accept Leave Request"
// //                             onClick={() => console.log('Accept Leave Request:', item.id)}
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </button>
// //                           <button 
// //                             className="text-gray-400 hover:text-red-600 rounded transition-colors" 
// //                             title="Reject Leave Request"
// //                             onClick={() => console.log('Reject Leave Request:', item.id)}
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>

// //               {/* Empty State */}
// //               {paginatedData.length === 0 && (
// //                 <div className="text-center py-8">
// //                   <Search className="mx-auto h-8 w-8 text-gray-400" />
// //                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
// //                   <p className="mt-1 text-xs text-gray-500">
// //                     {activeFiltersCount > 0 || searchTerm 
// //                       ? 'Try adjusting your search or filter criteria'
// //                       : 'No leave requests available'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
// //               <div className="flex items-center gap-1">
// //                 <span className="text-xs text-gray-600">Show:</span>
// //                 {[20, 100, 500, 2500].map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => {
// //                       setItemsPerPage(size);
// //                       setCurrentPage(1);
// //                     }}
// //                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                       itemsPerPage === size
// //                         ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <span className="text-xs text-gray-600">
// //                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
// //                 </span>
                
// //                 {totalPages > 1 && (
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Prev
// //                     </button>
                    
// //                     <div className="flex items-center gap-0.5">
// //                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                         const page = i + 1;
// //                         return (
// //                           <button
// //                             key={page}
// //                             onClick={() => setCurrentPage(page)}
// //                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
// //                               currentPage === page
// //                                 ? 'text-white border-pink-600 bg-pink-600 shadow-md'
// //                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
// //                             }`}
// //                           >
// //                             {page}
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
                    
// //                     <button
// //                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       Next
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default MyLeave;






















// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Search, Filter, Clock, X,
//   ChevronDown, ChevronUp, Plus, XCircle, Calendar,
//   Users, Building, AlertCircle, User, TrendingUp, Award
// } from 'lucide-react';

// const MyLeave = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   // Table state management
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [showFilter, setShowFilter] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);
 
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
 
//   // Sort states
//   const [sortBy, setSortBy] = useState('fromDate');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Current user ID (in real app, this would come from authentication)
//   const currentUserId = 'FI-00001';

//   // Mock data for attendance requests - ALL requests
//   const allMockData = [
//     {
//       id: 'HR-ARQ-25-07-001',
//       employeeName: 'Developer Daiyan',
//       status: 'Submitted',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Sick Leave',
//       requestType: 'Sick Leave',
//       fromDate: '2025-08-21',
//       toDate: '2025-08-22',
//       duration: '2 days'
//     },
//     {
//       id: 'HR-ARQ-25-07-002',
//       employeeName: 'Developer Daiyan',
//       status: 'Approved',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Medical Appointment',
//       requestType: 'Casual Leave',
//       fromDate: '2025-08-15',
//       toDate: '2025-08-15',
//       duration: '4 hours'
//     },
//     {
//       id: 'HR-ARQ-25-07-003',
//       employeeName: 'Developer Daiyan',
//       status: 'Pending',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Personal Work',
//       requestType: 'Earned Leave',
//       fromDate: '2025-08-25',
//       toDate: '2025-08-25',
//       duration: '1 day'
//     },
//     {
//       id: 'HR-ARQ-25-07-004',
//       employeeName: 'Developer Daiyan',
//       status: 'Rejected',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Vacation Request',
//       requestType: 'Privilege Leave',
//       fromDate: '2025-08-10',
//       toDate: '2025-08-12',
//       duration: '3 days'
//     },
//     {
//       id: 'HR-ARQ-25-07-005',
//       employeeName: 'Developer Daiyan',
//       status: 'Approved',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Family Event',
//       requestType: 'Compensatory Off',
//       fromDate: '2025-07-28',
//       toDate: '2025-07-28',
//       duration: '1 day'
//     },
//     {
//       id: 'HR-ARQ-25-07-006',
//       employeeName: 'Developer Daiyan',
//       status: 'Approved',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Medical Checkup',
//       requestType: 'Sick Leave',
//       fromDate: '2025-07-20',
//       toDate: '2025-07-20',
//       duration: '4 hours'
//     },
//     {
//       id: 'HR-ARQ-25-07-007',
//       employeeName: 'Developer Daiyan',
//       status: 'Approved',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Personal Work',
//       requestType: 'Casual Leave',
//       fromDate: '2025-07-15',
//       toDate: '2025-07-16',
//       duration: '2 days'
//     },
//     {
//       id: 'HR-ARQ-25-07-008',
//       employeeName: 'Developer Daiyan',
//       status: 'Approved',
//       employeeId: 'FI-00001',
//       department: 'Engineering',
//       reason: 'Wedding Function',
//       requestType: 'Earned Leave',
//       fromDate: '2025-07-05',
//       toDate: '2025-07-07',
//       duration: '3 days'
//     }
//   ];

//   // Filter to show only current user's requests
//   const mockData = allMockData.filter(item => item.employeeId === currentUserId);

//   // Mock leave balance data for current user
//   const userLeaveBalance = [
//     { type: 'Sick Leave', remaining: 8, total: 12 },
//     { type: 'Casual Leave', remaining: 5, total: 10 },
//     { type: 'Earned Leave', remaining: 15, total: 20 },
//     { type: 'Privilege Leave', remaining: 2, total: 5 },
//     { type: 'Compensatory Off', remaining: 3, total: 6 }
//   ];

//   // Get unique values for filters
//   const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

//   useEffect(() => {
//     const employeeId = localStorage.getItem('employee_id') || currentUserId;
    
//     const loadLeaves = async () => {
//       try {
//         setLoading(true);
//         // Simulate API call
//         setTimeout(() => {
//           setLeaveData(userLeaveBalance);
//           setLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("❌ Error fetching leave data:", error);
//         setLoading(false);
//       }
//     };

//     loadLeaves();
//   }, []);

//   // Filter and sort data
//   const filteredData = useMemo(() => {
//     let result = [...mockData];

//     // Search filter
//     if (searchTerm) {
//       const search = searchTerm.toLowerCase();
//       result = result.filter(item =>
//         item.id.toLowerCase().includes(search) ||
//         item.requestType.toLowerCase().includes(search) ||
//         item.reason.toLowerCase().includes(search)
//       );
//     }

//     // Status filter
//     if (statusFilter !== 'all') {
//       result = result.filter(item => item.status === statusFilter);
//     }

//     // Request type filter
//     if (requestTypeFilter !== 'all') {
//       result = result.filter(item => item.requestType === requestTypeFilter);
//     }

//     // Date filter
//     if (dateFilter !== 'all') {
//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
     
//       result = result.filter(item => {
//         const itemDate = new Date(item.fromDate);
//         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
       
//         switch (dateFilter) {
//           case 'today': return daysDiff === 0;
//           case 'yesterday': return daysDiff === 1;
//           case 'last7days': return daysDiff <= 7;
//           case 'last30days': return daysDiff <= 30;
//           case 'thisweek':
//             const startOfWeek = new Date(today);
//             startOfWeek.setDate(today.getDate() - today.getDay());
//             return itemDate >= startOfWeek;
//           case 'thismonth':
//             return itemDate.getMonth() === today.getMonth() &&
//                    itemDate.getFullYear() === today.getFullYear();
//           default: return true;
//         }
//       });
//     }

//     // Sort
//     result.sort((a, b) => {
//       let aVal, bVal;
     
//       switch (sortBy) {
//         case 'status':
//           aVal = a.status.toLowerCase();
//           bVal = b.status.toLowerCase();
//           break;
//         case 'fromDate':
//           aVal = new Date(a.fromDate);
//           bVal = new Date(b.fromDate);
//           break;
//         default:
//           aVal = a[sortBy];
//           bVal = b[sortBy];
//       }

//       if (sortOrder === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return result;
//   }, [searchTerm, statusFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Helper functions
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
//       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
//       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
//       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
//       default: return 'text-gray-600 bg-gray-50 border-gray-200';
//     }
//   };

//   const handleSort = (column) => {
//     if (sortBy === column) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(column);
//       setSortOrder('asc');
//     }
//   };

//   const getSortIcon = (column) => {
//     if (sortBy !== column) return null;
//     return sortOrder === 'asc' ?
//       <ChevronUp className="w-3 h-3" /> :
//       <ChevronDown className="w-3 h-3" />;
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('all');
//     setRequestTypeFilter('all');
//     setDateFilter('all');
//     setCurrentPage(1);
//   };

//   const toggleRowSelection = (id) => {
//     const newSelected = new Set(selectedRows);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedRows(newSelected);
//   };

//   const handleCancelRequest = (requestId) => {
//     console.log('Cancel Leave Request:', requestId);
//     // Here you would make an API call to cancel the request
//   };

//   const activeFiltersCount = [
//     statusFilter !== 'all',
//     requestTypeFilter !== 'all',
//     dateFilter !== 'all',
//     searchTerm.length > 0
//   ].filter(Boolean).length;

//   return (
//     <>
//       {/* User's Personal Leave Dashboard */}
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-7xl mx-auto mb-6">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '450px' }}>
           
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="animate-pulse text-center">
//                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
//                   <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
//                   <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
//                 </div>
//               </div>
//             ) : (
//               <div className="h-full flex flex-col">
               
//                 {/* Header with User Info */}
//                 <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-5">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-xl font-bold mb-1">My Leave Dashboard</h2>
//                       <p className="text-sm opacity-90">Personal leave overview and request management</p>
//                     </div>
//                     <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
//                       <User className="w-5 h-5" />
//                       <div>
//                         <div className="text-sm font-medium">Developer Daiyan</div>
//                         <div className="text-xs opacity-75">ID: FI-00001</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main Dashboard Content */}
//                 <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                 
//                   {/* My Request Status Distribution */}
//                   <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">My Request Status</h3>
//                     <div className="relative h-32">
//                       {/* Donut Chart */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="relative">
//                           <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
//                             {/* Background circle */}
//                             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                           
//                             {/* Calculate percentages and cumulative offsets */}
//                             {(() => {
//                               const submitted = mockData.filter(r => r.status === 'Submitted').length;
//                               const pending = mockData.filter(r => r.status === 'Pending').length;
//                               const approved = mockData.filter(r => r.status === 'Approved').length;
//                               const rejected = mockData.filter(r => r.status === 'Rejected').length;
//                               const total = mockData.length;
                             
//                               if (total === 0) return null;
                              
//                               const submittedPercent = submitted / total;
//                               const pendingPercent = pending / total;
//                               const approvedPercent = approved / total;
//                               const rejectedPercent = rejected / total;
                             
//                               const circumference = 283; // 2 * π * 45
                             
//                               const submittedLength = submittedPercent * circumference;
//                               const pendingLength = pendingPercent * circumference;
//                               const approvedLength = approvedPercent * circumference;
//                               const rejectedLength = rejectedPercent * circumference;
                             
//                               let offset = 0;
                             
//                               return (
//                                 <>
//                                   {/* Submitted (Blue) */}
//                                   {submitted > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
//                                       strokeDasharray={`${submittedLength} ${circumference}`}
//                                       strokeDashoffset={-offset}/>
//                                   )}
                                 
//                                   {/* Pending (Orange) */}
//                                   {pending > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
//                                       strokeDasharray={`${pendingLength} ${circumference}`}
//                                       strokeDashoffset={-(offset += submittedLength)}/>
//                                   )}
                                 
//                                   {/* Approved (Green) */}
//                                   {approved > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
//                                       strokeDasharray={`${approvedLength} ${circumference}`}
//                                       strokeDashoffset={-(offset += pendingLength)}/>
//                                   )}
                                 
//                                   {/* Rejected (Red) */}
//                                   {rejected > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
//                                       strokeDasharray={`${rejectedLength} ${circumference}`}
//                                       strokeDashoffset={-(offset += approvedLength)}/>
//                                   )}
//                                 </>
//                               );
//                             })()}
//                           </svg>
                         
//                           <div className="absolute inset-0 flex flex-col items-center justify-center">
//                             <span className="text-base font-bold text-gray-800">{mockData.length}</span>
//                             <span className="text-xs text-gray-600">Total</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                   
//                     {/* Legend */}
//                     <div className="grid grid-cols-2 gap-2 mt-4">
//                       {[
//                         { label: 'Submitted', count: mockData.filter(r => r.status === 'Submitted').length, color: 'bg-blue-500' },
//                         { label: 'Pending', count: mockData.filter(r => r.status === 'Pending').length, color: 'bg-orange-500' },
//                         { label: 'Approved', count: mockData.filter(r => r.status === 'Approved').length, color: 'bg-green-500' },
//                         { label: 'Rejected', count: mockData.filter(r => r.status === 'Rejected').length, color: 'bg-red-500' }
//                       ].map((item, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                           <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Leave Balance Overview */}
//                   <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Balance</h3>
//                     <div className="space-y-3">
//                       {userLeaveBalance.map((leave, index) => {
//                         const percentage = (leave.remaining / leave.total) * 100;
//                         const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
//                         const isLow = percentage < 30;
                       
//                         return (
//                           <div key={index} className="relative">
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="text-xs font-medium text-gray-700">{leave.type}</span>
//                               <div className="flex items-center gap-1">
//                                 <span className={`text-xs font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
//                                   {leave.remaining}
//                                 </span>
//                                 <span className="text-xs text-gray-500">/ {leave.total}</span>
//                                 {isLow && <AlertCircle className="w-3 h-3 text-red-500" />}
//                               </div>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <div
//                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500 ${isLow ? 'bg-red-500' : ''}`}
//                                 style={{ width: `${Math.max(percentage, 5)}%` }}
//                               ></div>
//                             </div>
//                             <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}% remaining</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Monthly Leave Trends */}
//                   <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">My Leave Trends</h3>
//                     <div className="space-y-3">
//                       {[
//                         { month: 'July 2025', taken: 5, avg: 2.5 },
//                         { month: 'August 2025', taken: 3, avg: 2.5 },
//                         { month: 'Upcoming', taken: 1, avg: 2.5 }
//                       ].map((trend, index) => {
//                         const isHigh = trend.taken > trend.avg * 1.5;
//                         const isUpcoming = trend.month === 'Upcoming';
//                         const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500'];
                       
//                         return (
//                           <div key={index} className="relative">
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="text-xs font-medium text-gray-700">{trend.month}</span>
//                               <div className="flex items-center gap-1">
//                                 <span className={`text-xs font-bold ${isHigh ? 'text-orange-600' : 'text-gray-800'}`}>
//                                   {trend.taken} {isUpcoming ? 'planned' : 'days'}
//                                 </span>
//                                 {isHigh && !isUpcoming && <TrendingUp className="w-3 h-3 text-orange-500" />}
//                                 {isUpcoming && <Calendar className="w-3 h-3 text-purple-500" />}
//                               </div>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <div
//                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500 ${isUpcoming ? 'bg-purple-500' : ''}`}
//                                 style={{ width: `${Math.max((trend.taken / 10) * 100, 5)}%` }}
//                               ></div>
//                             </div>
//                             <div className="text-xs text-gray-600 mt-1">
//                               {isUpcoming ? 'Scheduled leaves' : `Avg: ${trend.avg} days/month`}
//                             </div>
//                           </div>
//                         );
//                       })}
                      
//                       {/* Quick Stats */}
//                       <div className="mt-4 p-2 bg-white rounded-lg border border-purple-200">
//                         <div className="flex items-center justify-between">
//                           <div className="text-center">
//                             <div className="text-lg font-bold text-purple-600">{mockData.filter(r => r.status === 'Approved').length}</div>
//                             <div className="text-xs text-gray-600">Approved</div>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-lg font-bold text-blue-600">
//                               {mockData.reduce((sum, r) => {
//                                 if (r.status === 'Approved') {
//                                   return sum + parseFloat(r.duration.split(' ')[0]);
//                                 }
//                                 return sum;
//                               }, 0)}
//                             </div>
//                             <div className="text-xs text-gray-600">Days Used</div>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-lg font-bold text-green-600">
//                               {userLeaveBalance.reduce((sum, leave) => sum + leave.remaining, 0)}
//                             </div>
//                             <div className="text-xs text-gray-600">Remaining</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                 </div>

//               </div>
//             )}
//           </div>
//         </div>

//       {/* My Leave Requests Table Section */}
//       <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
//             {/* Top Header */}
//             <div className="flex items-center justify-between p-3 border-b border-gray-200">
//               <div className="flex items-center gap-4">
//                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
//               </div>
             
//               {/* Always Visible Search Bar */}
//               <div className="flex items-center gap-3">
//                 <div className="w-72 relative">
//                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
//                   <input
//                     type="text"
//                     placeholder="Search by request ID, leave type, reason..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
//                     style={{ focusRingColor: '#8b5cf6' }}
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
//                     >
//                       <X className="w-2 h-2" />
//                     </button>
//                   )}
//                 </div>
               
//                 <button
//                   onClick={() => console.log('Navigate to leave request form')}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1"
//                 >
//                   <Plus className="w-3 h-3" />
//                   New Request
//                 </button>
//               </div>
//             </div>

//             {/* Search Results Info */}
//             {searchTerm && (
//               <div className="px-3 py-1.5 bg-purple-50 border-b border-gray-200">
//                 <div className="text-xs text-purple-700">
//                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
//                 </div>
//               </div>
//             )}

//             {/* Filter Section */}
//             <div className="border-b border-gray-200">
//               {/* Filter Toggle Bar */}
//               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setShowFilter(!showFilter)}
//                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
//                       showFilter
//                         ? 'border-purple-500 text-purple-600 bg-purple-50 shadow-sm'
//                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
//                     }`}
//                   >
//                     <Filter className="w-2.5 h-2.5" />
//                     <span className="font-medium">Filters</span>
//                     {activeFiltersCount > 0 && (
//                       <span className="px-1 py-0.5 bg-purple-600 text-white text-xs rounded-full font-medium">
//                         {activeFiltersCount}
//                       </span>
//                     )}
//                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
//                   </button>

//                   <div className="h-4 w-px bg-gray-300"></div>

//                   <div className="flex items-center gap-1.5">
//                     <User className="w-3 h-3 text-gray-400" />
//                     <span className="text-xs text-gray-600">My Requests</span>
//                   </div>
//                 </div>
               
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-xs text-gray-600">
//                     {mockData.length} total requests
//                   </span>
//                   <Calendar className="w-3 h-3 text-gray-400" />
//                 </div>
//               </div>

//               {/* Advanced Filters Panel */}
//               {showFilter && (
//                 <div className="px-3 py-3 bg-white border-t border-gray-100">
//                   <div className="space-y-3">
//                     {/* Filter Grid */}
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {/* Status Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <AlertCircle className="w-3 h-3 text-gray-400" />
//                           Status
//                         </label>
//                         <select
//                           value={statusFilter}
//                           onChange={(e) => setStatusFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Status</option>
//                           <option value="Submitted">Submitted</option>
//                           <option value="Approved">Approved</option>
//                           <option value="Pending">Pending</option>
//                           <option value="Rejected">Rejected</option>
//                         </select>
//                       </div>

//                       {/* Request Type Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <Users className="w-3 h-3 text-gray-400" />
//                           Leave Type
//                         </label>
//                         <select
//                           value={requestTypeFilter}
//                           onChange={(e) => setRequestTypeFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Types</option>
//                           {uniqueRequestTypes.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Date Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <Calendar className="w-3 h-3 text-gray-400" />
//                           From Date Range
//                         </label>
//                         <select
//                           value={dateFilter}
//                           onChange={(e) => setDateFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Dates</option>
//                           <option value="today">Today</option>
//                           <option value="yesterday">Yesterday</option>
//                           <option value="thisweek">This Week</option>
//                           <option value="last7days">Last 7 Days</option>
//                           <option value="thismonth">This Month</option>
//                           <option value="last30days">Last 30 Days</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Filter Actions */}
//                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                       <div className="text-xs text-gray-500">
//                         {activeFiltersCount > 0 ? (
//                           <span className="flex items-center gap-1">
//                             <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
//                           </span>
//                         ) : (
//                           'No filters applied'
//                         )}
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <button
//                           onClick={clearAllFilters}
//                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
//                         >
//                           Clear All
//                         </button>
//                         <button
//                           onClick={() => setShowFilter(false)}
//                           className="px-2 py-1 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded transition-colors"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
//                     <th
//                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('status')}
//                     >
//                       <div className="flex items-center gap-1">
//                         Status
//                         {getSortIcon('status')}
//                       </div>
//                     </th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Reason</th>
//                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
//                       <Calendar className="w-3 h-3 mx-auto" />
//                       <div className="text-xs mt-0.5">From Date</div>
//                     </th>
//                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
//                       <Calendar className="w-3 h-3 mx-auto" />
//                       <div className="text-xs mt-0.5">To Date</div>
//                     </th>
//                     <th className="w-16 p-2 text-center text-xs font-medium text-gray-600">Duration</th>
//                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedData.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-2">
//                         <span className="text-gray-600 text-xs font-mono">{item.id}</span>
//                       </td>
//                       <td className="p-2">
//                         <span
//                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-xs text-gray-600">{item.reason}</div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">
//                           {new Date(item.fromDate).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {new Date(item.fromDate).getFullYear()}
//                         </div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">
//                           {new Date(item.toDate).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {new Date(item.toDate).getFullYear()}
//                         </div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">{item.duration}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="flex items-center justify-center">
//                           {(item.status === 'Submitted' || item.status === 'Pending') && (
//                             <button
//                               className="text-gray-400 hover:text-red-600 rounded transition-colors"
//                               title="Cancel Request"
//                               onClick={() => handleCancelRequest(item.id)}
//                             >
//                               <XCircle className="w-4 h-4" />
//                             </button>
//                           )}
//                           {(item.status === 'Approved' || item.status === 'Rejected') && (
//                             <span className="text-xs text-gray-400">-</span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Empty State */}
//               {paginatedData.length === 0 && (
//                 <div className="text-center py-8">
//                   <Search className="mx-auto h-8 w-8 text-gray-400" />
//                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
//                   <p className="mt-1 text-xs text-gray-500">
//                     {activeFiltersCount > 0 || searchTerm
//                       ? 'Try adjusting your search or filter criteria'
//                       : 'No leave requests available'
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
//               <div className="flex items-center gap-1">
//                 <span className="text-xs text-gray-600">Show:</span>
//                 {[20, 100, 500].map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => {
//                       setItemsPerPage(size);
//                       setCurrentPage(1);
//                     }}
//                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
//                       itemsPerPage === size
//                         ? 'text-white border-purple-600 bg-purple-600 shadow-md'
//                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
             
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-600">
//                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
//                 </span>
               
//                 {totalPages > 1 && (
//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Prev
//                     </button>
                   
//                     <div className="flex items-center gap-0.5">
//                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const page = i + 1;
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => setCurrentPage(page)}
//                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
//                               currentPage === page
//                                 ? 'text-white border-purple-600 bg-purple-600 shadow-md'
//                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       })}
//                     </div>
                   
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyLeave;





// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Search, Filter, Clock, X,
//   ChevronDown, ChevronUp, Plus, XCircle, Calendar,
//   Users, Building, AlertCircle, User, TrendingUp, Award
// } from 'lucide-react';
// import { fetchEmployeeLeaveList, fetchLeaveBalance } from '../Home/dashboardApi';
// import Header from '../Header/Header';

// const MyLeave = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   // Table state management
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [showFilter, setShowFilter] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);
 
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [requestTypeFilter, setRequestTypeFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
 
//   // Sort states
//   const [sortBy, setSortBy] = useState('fromDate');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Current user ID
//   const currentUserId = localStorage.getItem('employee_id') || 'FI-00001';

//   // Transform API data to match component structure
//   const transformApiData = (apiData) => {
//     if (!apiData || !Array.isArray(apiData)) return [];
    
//     return apiData.map((item, index) => ({
//       id: item.name || `REQ-${index}`,
//       employeeName: item.employee_name || 'Unknown',
//       status: item.status || 'Unknown',
//       employeeId: item.employee || currentUserId,
//       department: item.department || 'Unknown',
//       reason: item.description || item.reason || 'No reason provided',
//       requestType: item.leave_type || 'Unknown',
//       fromDate: item.from_date || new Date().toISOString().split('T')[0],
//       toDate: item.to_date || new Date().toISOString().split('T')[0],
//       duration: item.total_leave_days ? `${item.total_leave_days} days` : '1 day'
//     }));
//   };

//   // Transform leave balance data
//   const transformLeaveBalance = (balanceData) => {
//     if (!balanceData || typeof balanceData !== 'object') return [];
    
//     return Object.entries(balanceData).map(([type, remaining]) => ({
//       type: type,
//       remaining: remaining,
//       total: remaining + Math.floor(remaining * 0.3) // Estimate total based on remaining (adjust as needed)
//     }));
//   };

//   // Get unique values for filters from API data
//   const uniqueRequestTypes = useMemo(() => {
//     return [...new Set(leaveRequests.map(item => item.requestType))].sort();
//   }, [leaveRequests]);

//   useEffect(() => {
//     const loadLeaveData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         console.log('Fetching leave data for employee:', currentUserId);
        
//         // Fetch both leave requests and leave balance in parallel
//         const [leaveRequestsResponse, leaveBalanceResponse] = await Promise.all([
//           fetchEmployeeLeaveList(currentUserId),
//           fetchLeaveBalance(currentUserId)
//         ]);
        
//         console.log('Leave Requests Response:', leaveRequestsResponse);
//         console.log('Leave Balance Response:', leaveBalanceResponse);
        
//         const transformedRequests = transformApiData(leaveRequestsResponse);
//         const transformedBalance = transformLeaveBalance(leaveBalanceResponse);
        
//         console.log('Transformed Requests:', transformedRequests);
//         console.log('Transformed Balance:', transformedBalance);
        
//         setLeaveRequests(transformedRequests);
//         setLeaveData(transformedBalance);
        
//       } catch (error) {
//         console.error("❌ Error fetching leave data:", error);
//         setError(error.message || 'Failed to fetch leave data');
//         setLeaveRequests([]);
//         setLeaveData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadLeaveData();
//   }, [currentUserId]);

//   // Filter and sort data
//   const filteredData = useMemo(() => {
//     let result = [...leaveRequests];

//     // Search filter
//     if (searchTerm) {
//       const search = searchTerm.toLowerCase();
//       result = result.filter(item =>
//         item.id.toLowerCase().includes(search) ||
//         item.requestType.toLowerCase().includes(search) ||
//         item.reason.toLowerCase().includes(search)
//       );
//     }

//     // Status filter
//     if (statusFilter !== 'all') {
//       result = result.filter(item => item.status === statusFilter);
//     }

//     // Request type filter
//     if (requestTypeFilter !== 'all') {
//       result = result.filter(item => item.requestType === requestTypeFilter);
//     }

//     // Date filter
//     if (dateFilter !== 'all') {
//       const now = new Date();
//       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
     
//       result = result.filter(item => {
//         const itemDate = new Date(item.fromDate);
//         const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
       
//         switch (dateFilter) {
//           case 'today': return daysDiff === 0;
//           case 'yesterday': return daysDiff === 1;
//           case 'last7days': return daysDiff <= 7;
//           case 'last30days': return daysDiff <= 30;
//           case 'thisweek':
//             const startOfWeek = new Date(today);
//             startOfWeek.setDate(today.getDate() - today.getDay());
//             return itemDate >= startOfWeek;
//           case 'thismonth':
//             return itemDate.getMonth() === today.getMonth() &&
//                    itemDate.getFullYear() === today.getFullYear();
//           default: return true;
//         }
//       });
//     }

//     // Sort
//     result.sort((a, b) => {
//       let aVal, bVal;
     
//       switch (sortBy) {
//         case 'status':
//           aVal = a.status.toLowerCase();
//           bVal = b.status.toLowerCase();
//           break;
//         case 'fromDate':
//           aVal = new Date(a.fromDate);
//           bVal = new Date(b.fromDate);
//           break;
//         default:
//           aVal = a[sortBy];
//           bVal = b[sortBy];
//       }

//       if (sortOrder === 'asc') {
//         return aVal > bVal ? 1 : -1;
//       } else {
//         return aVal < bVal ? 1 : -1;
//       }
//     });

//     return result;
//   }, [leaveRequests, searchTerm, statusFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

//   // Dashboard statistics
//   const dashboardStats = useMemo(() => {
//     return {
//       submitted: leaveRequests.filter(r => r.status === 'Submitted').length,
//       pending: leaveRequests.filter(r => r.status === 'Pending').length,
//       approved: leaveRequests.filter(r => r.status === 'Approved').length,
//       rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
//       total: leaveRequests.length
//     };
//   }, [leaveRequests]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   // Helper functions
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
//       case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
//       case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
//       case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
//       default: return 'text-gray-600 bg-gray-50 border-gray-200';
//     }
//   };

//   const handleSort = (column) => {
//     if (sortBy === column) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(column);
//       setSortOrder('asc');
//     }
//   };

//   const getSortIcon = (column) => {
//     if (sortBy !== column) return null;
//     return sortOrder === 'asc' ?
//       <ChevronUp className="w-3 h-3" /> :
//       <ChevronDown className="w-3 h-3" />;
//   };

//   const clearAllFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('all');
//     setRequestTypeFilter('all');
//     setDateFilter('all');
//     setCurrentPage(1);
//   };

//   const toggleRowSelection = (id) => {
//     const newSelected = new Set(selectedRows);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedRows(newSelected);
//   };

//   const handleCancelRequest = (requestId) => {
//     console.log('Cancel Leave Request:', requestId);
//     // Implement API call to cancel request
//   };

//   const activeFiltersCount = [
//     statusFilter !== 'all',
//     requestTypeFilter !== 'all',
//     dateFilter !== 'all',
//     searchTerm.length > 0
//   ].filter(Boolean).length;

//   // Error handling
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <Header />
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
//             <div className="text-center">
//               <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//               <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Leave Data</h2>
//               <p className="text-gray-600 mb-4">{error}</p>
//               <button 
//                 onClick={() => window.location.reload()} 
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {/* User's Personal Leave Dashboard */}
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-7xl mx-auto mb-6">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '450px' }}>
           
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="animate-pulse text-center">
//                   <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
//                   <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
//                   <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
//                 </div>
//               </div>
//             ) : (
//               <div className="h-full flex flex-col">
               
//                 {/* Header with User Info */}
//                 <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-5">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h2 className="text-xl font-bold mb-1">My Leave Dashboard</h2>
//                       <p className="text-sm opacity-90">Personal leave overview and request management</p>
//                     </div>
//                     <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
//                       <User className="w-5 h-5" />
//                       <div>
//                         <div className="text-sm font-medium">
//                           {leaveRequests[0]?.employeeName || 'Employee'}
//                         </div>
//                         <div className="text-xs opacity-75">ID: {currentUserId}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main Dashboard Content */}
//                 <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                 
//                   {/* Request Status Distribution */}
//                   <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">My Request Status</h3>
//                     <div className="relative h-32">
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="relative">
//                           <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
//                             <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                           
//                             {/* Status distribution arcs */}
//                             {(() => {
//                               const { submitted, pending, approved, rejected, total } = dashboardStats;
//                               if (total === 0) return null;
                              
//                               const circumference = 283;
//                               let offset = 0;
                              
//                               return (
//                                 <>
//                                   {submitted > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
//                                       strokeDasharray={`${(submitted / total) * circumference} ${circumference}`}
//                                       strokeDashoffset={-offset}/>
//                                   )}
//                                   {pending > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
//                                       strokeDasharray={`${(pending / total) * circumference} ${circumference}`}
//                                       strokeDashoffset={-(offset += (submitted / total) * circumference)}/>
//                                   )}
//                                   {approved > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
//                                       strokeDasharray={`${(approved / total) * circumference} ${circumference}`}
//                                       strokeDashoffset={-(offset += (pending / total) * circumference)}/>
//                                   )}
//                                   {rejected > 0 && (
//                                     <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
//                                       strokeDasharray={`${(rejected / total) * circumference} ${circumference}`}
//                                       strokeDashoffset={-(offset += (approved / total) * circumference)}/>
//                                   )}
//                                 </>
//                               );
//                             })()}
//                           </svg>
                         
//                           <div className="absolute inset-0 flex flex-col items-center justify-center">
//                             <span className="text-base font-bold text-gray-800">{dashboardStats.total}</span>
//                             <span className="text-xs text-gray-600">Total</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                   
//                     {/* Legend */}
//                     <div className="grid grid-cols-2 gap-2 mt-4">
//                       {[
//                         { label: 'Submitted', count: dashboardStats.submitted, color: 'bg-blue-500' },
//                         { label: 'Pending', count: dashboardStats.pending, color: 'bg-orange-500' },
//                         { label: 'Approved', count: dashboardStats.approved, color: 'bg-green-500' },
//                         { label: 'Rejected', count: dashboardStats.rejected, color: 'bg-red-500' }
//                       ].map((item, index) => (
//                         <div key={index} className="flex items-center space-x-2">
//                           <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                           <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Leave Balance Overview */}
//                   <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Balance</h3>
//                     <div className="space-y-3">
//                       {leaveData.length > 0 ? leaveData.map((leave, index) => {
//                         const percentage = leave.total > 0 ? (leave.remaining / leave.total) * 100 : 0;
//                         const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
//                         const isLow = percentage < 30;
                       
//                         return (
//                           <div key={index} className="relative">
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="text-xs font-medium text-gray-700">{leave.type}</span>
//                               <div className="flex items-center gap-1">
//                                 <span className={`text-xs font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
//                                   {leave.remaining}
//                                 </span>
//                                 <span className="text-xs text-gray-500">/ {leave.total}</span>
//                                 {isLow && <AlertCircle className="w-3 h-3 text-red-500" />}
//                               </div>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <div
//                                 className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500 ${isLow ? 'bg-red-500' : ''}`}
//                                 style={{ width: `${Math.max(percentage, 5)}%` }}
//                               ></div>
//                             </div>
//                             <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}% remaining</div>
//                           </div>
//                         );
//                       }) : (
//                         <div className="text-center py-4">
//                           <p className="text-xs text-gray-500">No leave balance data available</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Leave Statistics */}
//                   <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Statistics</h3>
                    
//                     <div className="grid grid-cols-3 gap-2 mb-4">
//                       <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
//                         <div className="text-lg font-bold text-purple-600">{dashboardStats.approved}</div>
//                         <div className="text-xs text-gray-600">Approved</div>
//                       </div>
//                       <div className="text-center p-2 bg-white rounded-lg border border-blue-200">
//                         <div className="text-lg font-bold text-blue-600">
//                           {leaveRequests.reduce((sum, r) => {
//                             if (r.status === 'Approved') {
//                               return sum + parseFloat(r.duration.split(' ')[0]);
//                             }
//                             return sum;
//                           }, 0)}
//                         </div>
//                         <div className="text-xs text-gray-600">Days Used</div>
//                       </div>
//                       <div className="text-center p-2 bg-white rounded-lg border border-green-200">
//                         <div className="text-lg font-bold text-green-600">
//                           {leaveData.reduce((sum, leave) => sum + leave.remaining, 0)}
//                         </div>
//                         <div className="text-xs text-gray-600">Remaining</div>
//                       </div>
//                     </div>

//                     {/* Recent Activity */}
//                     <div className="space-y-2">
//                       <h4 className="text-xs font-semibold text-gray-700">Recent Activity</h4>
//                       {leaveRequests.slice(0, 3).map((request, index) => (
//                         <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
//                           <div>
//                             <div className="text-xs font-medium text-gray-800">{request.requestType}</div>
//                             <div className="text-xs text-gray-500">{request.duration}</div>
//                           </div>
//                           <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
//                             {request.status}
//                           </span>
//                         </div>
//                       ))}
//                       {leaveRequests.length === 0 && (
//                         <div className="text-center py-2">
//                           <p className="text-xs text-gray-500">No recent activity</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* My Leave Requests Table Section */}
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
//             {/* Top Header */}
//             <div className="flex items-center justify-between p-3 border-b border-gray-200">
//               <div className="flex items-center gap-4">
//                 <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
//               </div>
             
//               {/* Always Visible Search Bar */}
//               <div className="flex items-center gap-3">
//                 <div className="w-72 relative">
//                   <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
//                   <input
//                     type="text"
//                     placeholder="Search by request ID, leave type, reason..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
//                     style={{ focusRingColor: '#8b5cf6' }}
//                   />
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
//                     >
//                       <X className="w-2 h-2" />
//                     </button>
//                   )}
//                 </div>
               
//                 <button
//                   onClick={() => console.log('Navigate to leave request form')}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1"
//                 >
//                   <Plus className="w-3 h-3" />
//                   New Request
//                 </button>
//               </div>
//             </div>

//             {/* Search Results Info */}
//             {searchTerm && (
//               <div className="px-3 py-1.5 bg-purple-50 border-b border-gray-200">
//                 <div className="text-xs text-purple-700">
//                   Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
//                 </div>
//               </div>
//             )}

//             {/* Filter Section */}
//             <div className="border-b border-gray-200">
//               {/* Filter Toggle Bar */}
//               <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setShowFilter(!showFilter)}
//                     className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
//                       showFilter
//                         ? 'border-purple-500 text-purple-600 bg-purple-50 shadow-sm'
//                         : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
//                     }`}
//                   >
//                     <Filter className="w-2.5 h-2.5" />
//                     <span className="font-medium">Filters</span>
//                     {activeFiltersCount > 0 && (
//                       <span className="px-1 py-0.5 bg-purple-600 text-white text-xs rounded-full font-medium">
//                         {activeFiltersCount}
//                       </span>
//                     )}
//                     {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
//                   </button>

//                   <div className="h-4 w-px bg-gray-300"></div>

//                   <div className="flex items-center gap-1.5">
//                     <User className="w-3 h-3 text-gray-400" />
//                     <span className="text-xs text-gray-600">My Requests</span>
//                   </div>
//                 </div>
               
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-xs text-gray-600">
//                     {dashboardStats.total} total requests
//                   </span>
//                   <Calendar className="w-3 h-3 text-gray-400" />
//                 </div>
//               </div>

//               {/* Advanced Filters Panel */}
//               {showFilter && (
//                 <div className="px-3 py-3 bg-white border-t border-gray-100">
//                   <div className="space-y-3">
//                     {/* Filter Grid */}
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       {/* Status Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <AlertCircle className="w-3 h-3 text-gray-400" />
//                           Status
//                         </label>
//                         <select
//                           value={statusFilter}
//                           onChange={(e) => setStatusFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Status</option>
//                           <option value="Submitted">Submitted</option>
//                           <option value="Approved">Approved</option>
//                           <option value="Pending">Pending</option>
//                           <option value="Rejected">Rejected</option>
//                         </select>
//                       </div>

//                       {/* Request Type Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <Users className="w-3 h-3 text-gray-400" />
//                           Leave Type
//                         </label>
//                         <select
//                           value={requestTypeFilter}
//                           onChange={(e) => setRequestTypeFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Types</option>
//                           {uniqueRequestTypes.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Date Filter */}
//                       <div className="space-y-1">
//                         <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
//                           <Calendar className="w-3 h-3 text-gray-400" />
//                           From Date Range
//                         </label>
//                         <select
//                           value={dateFilter}
//                           onChange={(e) => setDateFilter(e.target.value)}
//                           className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                         >
//                           <option value="all">All Dates</option>
//                           <option value="today">Today</option>
//                           <option value="yesterday">Yesterday</option>
//                           <option value="thisweek">This Week</option>
//                           <option value="last7days">Last 7 Days</option>
//                           <option value="thismonth">This Month</option>
//                           <option value="last30days">Last 30 Days</option>
//                         </select>
//                       </div>
//                     </div>

//                     {/* Filter Actions */}
//                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                       <div className="text-xs text-gray-500">
//                         {activeFiltersCount > 0 ? (
//                           <span className="flex items-center gap-1">
//                             <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//                             {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
//                           </span>
//                         ) : (
//                           'No filters applied'
//                         )}
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <button
//                           onClick={clearAllFilters}
//                           className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
//                         >
//                           Clear All
//                         </button>
//                         <button
//                           onClick={() => setShowFilter(false)}
//                           className="px-2 py-1 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded transition-colors"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
//                     <th
//                       className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
//                       onClick={() => handleSort('status')}
//                     >
//                       <div className="flex items-center gap-1">
//                         Status
//                         {getSortIcon('status')}
//                       </div>
//                     </th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
//                     <th className="text-left p-2 text-xs font-medium text-gray-600">Reason</th>
//                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
//                       <Calendar className="w-3 h-3 mx-auto" />
//                       <div className="text-xs mt-0.5">From Date</div>
//                     </th>
//                     <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
//                       <Calendar className="w-3 h-3 mx-auto" />
//                       <div className="text-xs mt-0.5">To Date</div>
//                     </th>
//                     <th className="w-16 p-2 text-center text-xs font-medium text-gray-600">Duration</th>
//                     <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {paginatedData.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-2">
//                         <span className="text-gray-600 text-xs font-mono">{item.id}</span>
//                       </td>
//                       <td className="p-2">
//                         <span
//                           className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="text-xs text-gray-600">{item.reason}</div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">
//                           {new Date(item.fromDate).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {new Date(item.fromDate).getFullYear()}
//                         </div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">
//                           {new Date(item.toDate).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric'
//                           })}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {new Date(item.toDate).getFullYear()}
//                         </div>
//                       </td>
//                       <td className="p-2 text-center">
//                         <div className="text-xs text-gray-600 font-medium">{item.duration}</div>
//                       </td>
//                       <td className="p-2">
//                         <div className="flex items-center justify-center">
//                           {(item.status === 'Submitted' || item.status === 'Pending') && (
//                             <button
//                               className="text-gray-400 hover:text-red-600 rounded transition-colors"
//                               title="Cancel Request"
//                               onClick={() => handleCancelRequest(item.id)}
//                             >
//                               <XCircle className="w-4 h-4" />
//                             </button>
//                           )}
//                           {(item.status === 'Approved' || item.status === 'Rejected') && (
//                             <span className="text-xs text-gray-400">-</span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Empty State */}
//               {paginatedData.length === 0 && (
//                 <div className="text-center py-8">
//                   <Search className="mx-auto h-8 w-8 text-gray-400" />
//                   <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
//                   <p className="mt-1 text-xs text-gray-500">
//                     {activeFiltersCount > 0 || searchTerm
//                       ? 'Try adjusting your search or filter criteria'
//                       : 'No leave requests available'
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
//               <div className="flex items-center gap-1">
//                 <span className="text-xs text-gray-600">Show:</span>
//                 {[20, 100, 500].map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => {
//                       setItemsPerPage(size);
//                       setCurrentPage(1);
//                     }}
//                     className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
//                       itemsPerPage === size
//                         ? 'text-white border-purple-600 bg-purple-600 shadow-md'
//                         : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
             
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-gray-600">
//                   Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
//                 </span>
               
//                 {totalPages > 1 && (
//                   <div className="flex items-center gap-1">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Prev
//                     </button>
                   
//                     <div className="flex items-center gap-0.5">
//                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const page = i + 1;
//                         return (
//                           <button
//                             key={page}
//                             onClick={() => setCurrentPage(page)}
//                             className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
//                               currentPage === page
//                                 ? 'text-white border-purple-600 bg-purple-600 shadow-md'
//                                 : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         );
//                       })}
//                     </div>
                   
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyLeave;





import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Filter, Clock, X,
  ChevronDown, ChevronUp, Plus, XCircle, Calendar,
  Users, Building, AlertCircle, User, TrendingUp, Award
} from 'lucide-react';
import { fetchEmployeeLeaveList, fetchLeaveBalance } from '../Home/dashboardApi';
import Header from '../Header/Header';

const MyLeave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Table state management
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilter, setShowFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
 
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
 
  // Sort states
  const [sortBy, setSortBy] = useState('fromDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Current user ID
  const currentUserId = localStorage.getItem('employee_id') || 'FI-00001';

  // Transform API data to match component structure
  const transformApiData = (apiData) => {
    console.log('Transforming API data:', apiData);
    
    if (!apiData || !Array.isArray(apiData)) {
      console.warn('Invalid API data structure:', typeof apiData);
      return [];
    }
    
    return apiData.map((item, index) => {
      // Log first item structure for debugging
      if (index === 0) {
        console.log('Sample API item structure:', Object.keys(item));
      }
      
      return {
        id: item.name || item.id || `REQ-${index}`,
        employeeName: item.employee_name || item.employeeName || 'Unknown',
        status: item.status || 'Unknown',
        employeeId: item.employee || item.employeeId || currentUserId,
        department: item.department || 'Unknown',
        reason: item.description || item.reason || item.leave_reason || 'No reason provided',
        requestType: item.leave_type || item.leaveType || item.type || 'Unknown',
        fromDate: item.from_date || item.fromDate || item.start_date || new Date().toISOString().split('T')[0],
        toDate: item.to_date || item.toDate || item.end_date || new Date().toISOString().split('T')[0],
        duration: item.total_leave_days ? `${item.total_leave_days} days` : 
                  item.duration || 
                  (item.days ? `${item.days} days` : '1 day')
      };
    });
  };

  // Transform leave balance data
  const transformLeaveBalance = (balanceData) => {
    console.log('Transforming leave balance data:', balanceData);
    
    if (!balanceData || typeof balanceData !== 'object') {
      console.warn('Invalid leave balance data structure');
      return [];
    }
    
    // Handle different possible API response structures
    if (Array.isArray(balanceData)) {
      // If API returns an array
      return balanceData.map(item => ({
        type: item.leave_type || item.type || 'Unknown',
        remaining: item.remaining || item.balance || 0,
        total: item.total || item.allocated || (item.remaining || 0) + (item.used || 0)
      }));
    } else {
      // If API returns an object with leave types as keys
      return Object.entries(balanceData).map(([type, value]) => {
        // Handle different value structures
        if (typeof value === 'object' && value !== null) {
          return {
            type: type,
            remaining: value.remaining || value.balance || 0,
            total: value.total || value.allocated || 0
          };
        } else {
          // If value is just a number (remaining balance)
          return {
            type: type,
            remaining: value || 0,
            total: (value || 0) + Math.floor((value || 0) * 0.3) // Estimate total
          };
        }
      });
    }
  };

  // Get unique values for filters from API data
  const uniqueRequestTypes = useMemo(() => {
    return [...new Set(leaveRequests.map(item => item.requestType))].sort();
  }, [leaveRequests]);

  // Dashboard statistics
  const dashboardStats = useMemo(() => {
    return {
      submitted: leaveRequests.filter(r => r.status === 'Submitted').length,
      pending: leaveRequests.filter(r => r.status === 'Pending').length,
      approved: leaveRequests.filter(r => r.status === 'Approved').length,
      rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
      total: leaveRequests.length
    };
  }, [leaveRequests]);

  useEffect(() => {
    const loadLeaveData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching leave data for employee:', currentUserId);
        
        // Check if we have the required employee ID
        if (!currentUserId) {
          throw new Error('Employee ID not found. Please log in again.');
        }
        
        // Fetch both leave requests and leave balance in parallel
        const [leaveRequestsResponse, leaveBalanceResponse] = await Promise.all([
          fetchEmployeeLeaveList(currentUserId),
          fetchLeaveBalance(currentUserId)
        ]);
        
        console.log('Leave Requests Response:', leaveRequestsResponse);
        console.log('Leave Balance Response:', leaveBalanceResponse);
        
        // Validate responses
        if (!Array.isArray(leaveRequestsResponse)) {
          console.warn('Leave requests response is not an array:', typeof leaveRequestsResponse);
        }
        
        if (!leaveBalanceResponse || typeof leaveBalanceResponse !== 'object') {
          console.warn('Leave balance response is not an object:', typeof leaveBalanceResponse);
        }
        
        const transformedRequests = transformApiData(leaveRequestsResponse);
        const transformedBalance = transformLeaveBalance(leaveBalanceResponse);
        
        console.log('Transformed Requests:', transformedRequests);
        console.log('Transformed Balance:', transformedBalance);
        
        setLeaveRequests(transformedRequests);
        setLeaveData(transformedBalance);
        
      } catch (error) {
        console.error("Error fetching leave data:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          employeeId: currentUserId
        });
        
        setError(error.message || 'Failed to fetch leave data');
        setLeaveRequests([]);
        setLeaveData([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaveData();
  }, [currentUserId]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...leaveRequests];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(search) ||
        item.requestType.toLowerCase().includes(search) ||
        item.reason.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Request type filter
    if (requestTypeFilter !== 'all') {
      result = result.filter(item => item.requestType === requestTypeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
     
      result = result.filter(item => {
        const itemDate = new Date(item.fromDate);
        const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
       
        switch (dateFilter) {
          case 'today': return daysDiff === 0;
          case 'yesterday': return daysDiff === 1;
          case 'last7days': return daysDiff <= 7;
          case 'last30days': return daysDiff <= 30;
          case 'thisweek':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            return itemDate >= startOfWeek;
          case 'thismonth':
            return itemDate.getMonth() === today.getMonth() &&
                   itemDate.getFullYear() === today.getFullYear();
          default: return true;
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      let aVal, bVal;
     
      switch (sortBy) {
        case 'status':
          aVal = a.status.toLowerCase();
          bVal = b.status.toLowerCase();
          break;
        case 'fromDate':
          aVal = new Date(a.fromDate);
          bVal = new Date(b.fromDate);
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [leaveRequests, searchTerm, statusFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ?
      <ChevronUp className="w-3 h-3" /> :
      <ChevronDown className="w-3 h-3" />;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setRequestTypeFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleCancelRequest = (requestId) => {
    console.log('Cancel Leave Request:', requestId);
    // TODO: Implement API call to cancel request
  };

  const activeFiltersCount = [
    statusFilter !== 'all',
    requestTypeFilter !== 'all',
    dateFilter !== 'all',
    searchTerm.length > 0
  ].filter(Boolean).length;

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Leave Data</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* User's Personal Leave Dashboard */}
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '450px' }}>
           
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
                  <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
               
                {/* Header with User Info */}
                <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">My Leave Dashboard</h2>
                      <p className="text-sm opacity-90">Personal leave overview and request management</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <User className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-medium">
                          {leaveRequests[0]?.employeeName || 'Employee'}
                        </div>
                        <div className="text-xs opacity-75">ID: {currentUserId}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                 
                  {/* Request Status Distribution */}
                  <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">My Request Status</h3>
                    <div className="relative h-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                           
                            {/* Status distribution arcs */}
                            {(() => {
                              const { submitted, pending, approved, rejected, total } = dashboardStats;
                              if (total === 0) return null;
                              
                              const circumference = 283;
                              let offset = 0;
                              
                              return (
                                <>
                                  {submitted > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
                                      strokeDasharray={`${(submitted / total) * circumference} ${circumference}`}
                                      strokeDashoffset={-offset}/>
                                  )}
                                  {pending > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
                                      strokeDasharray={`${(pending / total) * circumference} ${circumference}`}
                                      strokeDashoffset={-(offset += (submitted / total) * circumference)}/>
                                  )}
                                  {approved > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
                                      strokeDasharray={`${(approved / total) * circumference} ${circumference}`}
                                      strokeDashoffset={-(offset += (pending / total) * circumference)}/>
                                  )}
                                  {rejected > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
                                      strokeDasharray={`${(rejected / total) * circumference} ${circumference}`}
                                      strokeDashoffset={-(offset += (approved / total) * circumference)}/>
                                  )}
                                </>
                              );
                            })()}
                          </svg>
                         
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-base font-bold text-gray-800">{dashboardStats.total}</span>
                            <span className="text-xs text-gray-600">Total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[
                        { label: 'Submitted', count: dashboardStats.submitted, color: 'bg-blue-500' },
                        { label: 'Pending', count: dashboardStats.pending, color: 'bg-orange-500' },
                        { label: 'Approved', count: dashboardStats.approved, color: 'bg-green-500' },
                        { label: 'Rejected', count: dashboardStats.rejected, color: 'bg-red-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leave Balance Overview */}
                  <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Balance</h3>
                    <div className="space-y-3">
                      {leaveData.length > 0 ? leaveData.map((leave, index) => {
                        const percentage = leave.total > 0 ? (leave.remaining / leave.total) * 100 : 0;
                        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
                        const isLow = percentage < 30;
                       
                        return (
                          <div key={index} className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{leave.type}</span>
                              <div className="flex items-center gap-1">
                                <span className={`text-xs font-bold ${isLow ? 'text-red-600' : 'text-gray-800'}`}>
                                  {leave.remaining}
                                </span>
                                <span className="text-xs text-gray-500">/ {leave.total}</span>
                                {isLow && <AlertCircle className="w-3 h-3 text-red-500" />}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500 ${isLow ? 'bg-red-500' : ''}`}
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}% remaining</div>
                          </div>
                        );
                      }) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-gray-500">No leave balance data available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Leave Statistics */}
                  <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Statistics</h3>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-white rounded-lg border border-purple-200">
                        <div className="text-lg font-bold text-purple-600">{dashboardStats.approved}</div>
                        <div className="text-xs text-gray-600">Approved</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-blue-200">
                        <div className="text-lg font-bold text-blue-600">
                          {leaveRequests.reduce((sum, r) => {
                            if (r.status === 'Approved') {
                              return sum + parseFloat(r.duration.split(' ')[0]);
                            }
                            return sum;
                          }, 0)}
                        </div>
                        <div className="text-xs text-gray-600">Days Used</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-green-200">
                        <div className="text-lg font-bold text-green-600">
                          {leaveData.reduce((sum, leave) => sum + leave.remaining, 0)}
                        </div>
                        <div className="text-xs text-gray-600">Remaining</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700">Recent Activity</h4>
                      {leaveRequests.slice(0, 3).map((request, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div>
                            <div className="text-xs font-medium text-gray-800">{request.requestType}</div>
                            <div className="text-xs text-gray-500">{request.duration}</div>
                          </div>
                          <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                      {leaveRequests.length === 0 && (
                        <div className="text-center py-2">
                          <p className="text-xs text-gray-500">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* My Leave Requests Table Section */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            {/* Top Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
              </div>
             
              {/* Always Visible Search Bar */}
              <div className="flex items-center gap-3">
                <div className="w-72 relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search by request ID, leave type, reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-purple-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  )}
                </div>
               
                <button
                  onClick={() => console.log('Navigate to leave request form')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  New Request
                </button>
              </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="px-3 py-1.5 bg-purple-50 border-b border-gray-200">
                <div className="text-xs text-purple-700">
                  Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
                </div>
              </div>
            )}

            {/* Filter Section */}
            <div className="border-b border-gray-200">
              {/* Filter Toggle Bar */}
              <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
                      showFilter
                        ? 'border-purple-500 text-purple-600 bg-purple-50 shadow-sm'
                        : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
                    }`}
                  >
                    <Filter className="w-2.5 h-2.5" />
                    <span className="font-medium">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="px-1 py-0.5 bg-purple-600 text-white text-xs rounded-full font-medium">
                        {activeFiltersCount}
                      </span>
                    )}
                    {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                  </button>

                  <div className="h-4 w-px bg-gray-300"></div>

                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">My Requests</span>
                  </div>
                </div>
               
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-600">
                    {dashboardStats.total} total requests
                  </span>
                  <Calendar className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilter && (
                <div className="px-3 py-3 bg-white border-t border-gray-100">
                  <div className="space-y-3">
                    {/* Filter Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {/* Status Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                          <option value="all">All Status</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Request Type Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Users className="w-3 h-3 text-gray-400" />
                          Leave Type
                        </label>
                        <select
                          value={requestTypeFilter}
                          onChange={(e) => setRequestTypeFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                          <option value="all">All Types</option>
                          {uniqueRequestTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      {/* Date Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          From Date Range
                        </label>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                          <option value="all">All Dates</option>
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="thisweek">This Week</option>
                          <option value="last7days">Last 7 Days</option>
                          <option value="thismonth">This Month</option>
                          <option value="last30days">Last 30 Days</option>
                        </select>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        {activeFiltersCount > 0 ? (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                          </span>
                        ) : (
                          'No filters applied'
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={clearAllFilters}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => setShowFilter(false)}
                          className="px-2 py-1 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
                    <th
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
                    <th className="text-left p-2 text-xs font-medium text-gray-600">Reason</th>
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">From Date</div>
                    </th>
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">To Date</div>
                    </th>
                    <th className="w-16 p-2 text-center text-xs font-medium text-gray-600">Duration</th>
                    <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-2">
                        <span className="text-gray-600 text-xs font-mono">{item.id}</span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-xs text-gray-600 max-w-xs truncate" title={item.reason}>
                          {item.reason}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">
                          {new Date(item.fromDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.fromDate).getFullYear()}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">
                          {new Date(item.toDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.toDate).getFullYear()}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">{item.duration}</div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center justify-center">
                          {(item.status === 'Submitted' || item.status === 'Pending') && (
                            <button
                              className="text-gray-400 hover:text-red-600 rounded transition-colors"
                              title="Cancel Request"
                              onClick={() => handleCancelRequest(item.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          {(item.status === 'Approved' || item.status === 'Rejected') && (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {paginatedData.length === 0 && (
                <div className="text-center py-8">
                  <Search className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {activeFiltersCount > 0 || searchTerm
                      ? 'Try adjusting your search or filter criteria'
                      : 'No leave requests available'
                    }
                  </p>
                  <button
                    onClick={() => console.log('Navigate to create leave request')}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                  >
                    Create Your First Request
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">Show:</span>
                {[20, 100, 500].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
                      itemsPerPage === size
                        ? 'text-white border-purple-600 bg-purple-600 shadow-md'
                        : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
             
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </span>
               
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                   
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
                              currentPage === page
                                ? 'text-white border-purple-600 bg-purple-600 shadow-md'
                                : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                   
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLeave;