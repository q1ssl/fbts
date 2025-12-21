import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchLeaveBalance } from '../../Home/dashboardApi';
import api from '../../../api';
import Header from '../../Header/Header';
import { 
  Search, Filter, Clock, X, 
  ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
  Users, Building, AlertCircle 
} from 'lucide-react';

const TeamLeavereq = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [teamLeaveRequests, setTeamLeaveRequests] = useState([]);
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
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Sort states
  const [sortBy, setSortBy] = useState('fromDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Current user ID and approver email
  const currentUserId = localStorage.getItem('employee_id') || 'FI-00001';
  const leaveApprover = localStorage.getItem('user_email') || 
                      localStorage.getItem('email') || 
                      "abdul@gmail.com";

  // Transform API data to match component structure
  const transformApiData = (apiData) => {
    console.log('Transforming team API data:', apiData);
    
    if (!apiData || !Array.isArray(apiData)) {
      console.warn('Invalid team API data structure:', typeof apiData);
      return [];
    }
    
    return apiData.map((item, index) => {
      // Log first item structure for debugging
      if (index === 0) {
        console.log('Sample team API item structure:', Object.keys(item));
      }
      
      return {
        id: item.name || item.id || `REQ-${index}`,
        employeeName: item.employee_name || item.employeeName || 'Unknown',
        status: item.status || 'Unknown',
        employeeId: item.employee || item.employeeId || 'Unknown',
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

  // Get unique values for filters from API data
  const uniqueDepartments = useMemo(() => {
    return [...new Set(teamLeaveRequests.map(item => item.department))].sort();
  }, [teamLeaveRequests]);

  const uniqueRequestTypes = useMemo(() => {
    return [...new Set(teamLeaveRequests.map(item => item.requestType))].sort();
  }, [teamLeaveRequests]);

  // Dashboard statistics
  const dashboardStats = useMemo(() => {
    return {
      submitted: teamLeaveRequests.filter(r => r.status === 'Submitted').length,
      pending: teamLeaveRequests.filter(r => r.status === 'Pending').length,
      approved: teamLeaveRequests.filter(r => r.status === 'Approved').length,
      rejected: teamLeaveRequests.filter(r => r.status === 'Rejected').length,
      total: teamLeaveRequests.length
    };
  }, [teamLeaveRequests]);

  useEffect(() => {
    const loadTeamLeaveData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching team leave data for approver:', leaveApprover);
        
        // Fetch both team leave requests and leave balance in parallel
        const [teamRequestsResponse, leaveBalanceResponse] = await Promise.all([
          // Direct API call with leave_approver parameter
          api.post("/api/method/fbts.api.leave_request.get_leave_applications", {
            leave_approver: leaveApprover
          }),
          fetchLeaveBalance(currentUserId)
        ]);
        
        console.log('Team Requests Response:', teamRequestsResponse.data);
        console.log('Leave Balance Response:', leaveBalanceResponse);
        
        // Extract data from API response
        const teamRequestsData = teamRequestsResponse.data.message || [];
        const transformedRequests = transformApiData(teamRequestsData);
        
        console.log('Transformed Team Requests:', transformedRequests);
        
        setTeamLeaveRequests(transformedRequests);
        
        // Convert leave balance object to array
        const converted = Object.entries(leaveBalanceResponse || {}).map(([type, total]) => ({
          leave_type: type,
          total: total,
        }));
        setLeaveData(converted);
        
      } catch (error) {
        console.error("Error fetching team leave data:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          approver: leaveApprover
        });
        
        setError(error.message || 'Failed to fetch team leave data');
        setTeamLeaveRequests([]);
        setLeaveData([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeamLeaveData();
  }, [currentUserId, leaveApprover]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...teamLeaveRequests];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.employeeName.toLowerCase().includes(search) ||
        item.employeeId.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.department.toLowerCase().includes(search) ||
        item.requestType.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter(item => item.department === departmentFilter);
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
        case 'employeeName':
          aVal = a.employeeName.toLowerCase();
          bVal = b.employeeName.toLowerCase();
          break;
        case 'status':
          aVal = a.status.toLowerCase();
          bVal = b.status.toLowerCase();
          break;
        case 'employeeId':
          aVal = a.employeeId.toLowerCase();
          bVal = b.employeeId.toLowerCase();
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
  }, [teamLeaveRequests, searchTerm, statusFilter, departmentFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

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
    setDepartmentFilter('all');
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

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(item => item.id)));
    }
  };

  const handleBulkAccept = () => {
    console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
    setSelectedRows(new Set());
  };

  const handleBulkReject = () => {
    console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
    setSelectedRows(new Set());
  };

  const activeFiltersCount = [
    statusFilter !== 'all',
    departmentFilter !== 'all', 
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
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Team Leave Data</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Approver: {leaveApprover}</p>
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
      </div>
    );
  }

  return (
    <>
      <Header/>
      {/* Manager's Visual Analytics Dashboard */}
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
                
                {/* Header with Key Metrics */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Team Leave Analytics Dashboard</h2>
                      <p className="text-sm opacity-90">Visual insights for team leave management</p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">
                          {dashboardStats.submitted + dashboardStats.pending}
                        </div>
                        <div className="text-xs opacity-90">Requires Action</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {dashboardStats.approved}
                        </div>
                        <div className="text-xs opacity-90">Approved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {dashboardStats.total > 0 ? Math.round((dashboardStats.approved / dashboardStats.total) * 100) : 0}%
                        </div>
                        <div className="text-xs opacity-90">Approval Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  
                  {/* Status Distribution Chart */}
                  <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Request Status Distribution</h3>
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

                  {/* Department Analysis */}
                  <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Department Workload</h3>
                    <div className="space-y-3">
                      {uniqueDepartments.length > 0 ? uniqueDepartments.map((dept, index) => {
                        const deptRequests = teamLeaveRequests.filter(r => r.department === dept).length;
                        const maxRequests = Math.max(...uniqueDepartments.map(d => 
                          teamLeaveRequests.filter(r => r.department === d).length));
                        const percentage = maxRequests > 0 ? (deptRequests / maxRequests) * 100 : 0;
                        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
                        
                        return (
                          <div key={index} className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{dept}</span>
                              <span className="text-xs font-bold text-gray-800">{deptRequests}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      }) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-gray-500">No department data available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Leave Type Analysis */}
                  <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Type Distribution</h3>
                    <div className="space-y-3">
                      {uniqueRequestTypes.length > 0 ? uniqueRequestTypes.map((type, index) => {
                        const typeCount = teamLeaveRequests.filter(r => r.requestType === type).length;
                        const percentage = teamLeaveRequests.length > 0 ? (typeCount / teamLeaveRequests.length) * 100 : 0;
                        const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        
                        return (
                          <div key={index} className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{type}</span>
                              <span className="text-xs font-bold text-gray-800">{typeCount}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}%</div>
                          </div>
                        );
                      }) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-gray-500">No leave type data available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Team Leave Requests Table Section */}
      <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            {/* Top Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-900">Team Leave Requests</h1>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Approver: {leaveApprover}
                </span>
              </div>
              
              {/* Always Visible Search Bar */}
              <div className="flex items-center gap-3">
                <div className="w-72 relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search by employee name, ID, department, leave type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                
                <Link 
                  to="/dashboard/leaverequest"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
                >
                  <Plus className="w-3 h-3" />
                  Add Request
                </Link>
              </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
                <div className="text-xs text-blue-700">
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
                        ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
                        : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
                    }`}
                  >
                    <Filter className="w-2.5 h-2.5" />
                    <span className="font-medium">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium">
                        {activeFiltersCount}
                      </span>
                    )}
                    {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                  </button>

                  <div className="h-4 w-px bg-gray-300"></div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Team Requests</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-600">
                    {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${dashboardStats.total} total requests`}
                  </span>
                  <Calendar className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilter && (
                <div className="px-3 py-3 bg-white border-t border-gray-100">
                  <div className="space-y-3">
                    {/* Filter Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {/* Status Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Status</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Department Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Building className="w-3 h-3 text-gray-400" />
                          Department
                        </label>
                        <select
                          value={departmentFilter}
                          onChange={(e) => setDepartmentFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Departments</option>
                          {uniqueDepartments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
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
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
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
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
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
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
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
                          className="px-2 py-1 text-xs text-white bg-pink-600 hover:bg-pink-700 rounded transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Actions Bar - Shows when items are selected */}
            {selectedRows.size > 0 && (
              <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-pink-800">
                      {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setSelectedRows(new Set())}
                      className="text-xs text-pink-600 hover:text-pink-800 underline"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleBulkAccept}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accept ({selectedRows.size})
                    </button>
                    <button
                      onClick={handleBulkReject}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject ({selectedRows.size})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-6 p-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 focus:ring-pink-500"
                        style={{ accentColor: '#ec4899' }}
                      />
                    </th>
                    <th 
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('employeeId')}
                    >
                      <div className="flex items-center gap-1">
                        Employee ID
                        {getSortIcon('employeeId')}
                      </div>
                    </th>
                    <th 
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('employeeName')}
                    >
                      <div className="flex items-center gap-1">
                        Employee Name
                        {getSortIcon('employeeName')}
                      </div>
                    </th>
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
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">From Date</div>
                    </th>
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">To Date</div>
                    </th>
                    <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedRows.has(item.id) ? 'bg-pink-50' : ''
                      }`}
                      style={{ 
                        borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
                        borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
                      }}
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          className="rounded border-gray-300 focus:ring-pink-500"
                          style={{ accentColor: '#ec4899' }}
                        />
                      </td>
                      <td className="p-2">
                        <span className="text-gray-900 text-xs">{item.employeeId}</span>
                      </td>
                      <td className="p-2">
                        <div>
                          <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
                          <div className="text-xs text-gray-500 mt-0.5">{item.department}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div>
                          <span className="text-gray-600 text-xs font-mono">{item.id}</span>
                          <div className="text-xs text-gray-500">{item.duration}</div>
                        </div>
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
                        <div className="text-xs text-gray-500 max-w-xs truncate" title={item.reason}>
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
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            className="text-gray-400 hover:text-green-600 rounded transition-colors" 
                            title="Accept Leave Request"
                            onClick={() => console.log('Accept Leave Request:', item.id)}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-red-600 rounded transition-colors" 
                            title="Reject Leave Request"
                            onClick={() => console.log('Reject Leave Request:', item.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
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
                      : 'No team leave requests available for this approver'
                    }
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Checking requests for approver: {leaveApprover}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">Show:</span>
                {[20, 100, 500, 2500].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
                      itemsPerPage === size
                        ? 'text-white border-pink-600 bg-pink-600 shadow-md'
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
                                ? 'text-white border-pink-600 bg-pink-600 shadow-md'
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

export default TeamLeavereq;