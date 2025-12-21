import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Clock, X, 
  ChevronDown, ChevronUp, Plus, Eye, Check, XCircle, Calendar, 
  Users, Building, AlertCircle 
} from 'lucide-react';

const RegulariseRequest = () => {
  // State management
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilter, setShowFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Sort states
  const [sortBy, setSortBy] = useState('dateSubmitted');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data
  const mockData = [
    {
      id: 'HR-ARQ-25-07-001',
      employeeName: 'Developer Daiyan',
      status: 'Submitted',
      employeeId: 'FI-00001',
      department: 'Engineering',
      reason: 'Sick Leave',
      requestType: 'Medical Leave',
      priority: 'High',
      dateSubmitted: '2025-08-21',
      duration: '2 days'
    },
    {
      id: 'HR-ARQ-25-07-002',
      employeeName: 'Sarah Wilson',
      status: 'Approved',
      employeeId: 'FI-00002',
      department: 'Marketing',
      reason: 'Medical Appointment',
      requestType: 'Personal Leave',
      priority: 'Medium',
      dateSubmitted: '2025-08-20',
      duration: '4 hours'
    },
    {
      id: 'HR-ARQ-25-07-003',
      employeeName: 'John Smith',
      status: 'Pending',
      employeeId: 'FI-00003',
      department: 'Sales',
      reason: 'Personal Emergency',
      requestType: 'Emergency Leave',
      priority: 'High',
      dateSubmitted: '2025-08-21',
      duration: '1 day'
    },
    {
      id: 'HR-ARQ-25-07-004',
      employeeName: 'Emma Johnson',
      status: 'Rejected',
      employeeId: 'FI-00004',
      department: 'HR',
      reason: 'Vacation Request',
      requestType: 'Annual Leave',
      priority: 'Low',
      dateSubmitted: '2025-08-19',
      duration: '7 days'
    },
    {
      id: 'HR-ARQ-25-07-005',
      employeeName: 'Michael Brown',
      status: 'Submitted',
      employeeId: 'FI-00005',
      department: 'Finance',
      reason: 'Family Event',
      requestType: 'Personal Leave',
      priority: 'Medium',
      dateSubmitted: '2025-08-21',
      duration: '3 days'
    },
    {
      id: 'HR-ARQ-25-07-006',
      employeeName: 'Lisa Davis',
      status: 'Approved',
      employeeId: 'FI-00006',
      department: 'Engineering',
      reason: 'Maternity Leave',
      requestType: 'Maternity Leave',
      priority: 'High',
      dateSubmitted: '2025-08-18',
      duration: '90 days'
    },
    {
      id: 'HR-ARQ-25-07-007',
      employeeName: 'Robert Garcia',
      status: 'Pending',
      employeeId: 'FI-00007',
      department: 'Operations',
      reason: 'Training Program',
      requestType: 'Training Leave',
      priority: 'Low',
      dateSubmitted: '2025-08-20',
      duration: '5 days'
    },
    {
      id: 'HR-ARQ-25-07-008',
      employeeName: 'Jennifer Lee',
      status: 'Submitted',
      employeeId: 'FI-00008',
      department: 'Marketing',
      reason: 'Conference Attendance',
      requestType: 'Training Leave',
      priority: 'Medium',
      dateSubmitted: '2025-08-21',
      duration: '2 days'
    }
  ];

  // Get unique values for filters
  const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
  const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();
  
  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...mockData];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.employeeName.toLowerCase().includes(search) ||
        item.employeeId.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.department.toLowerCase().includes(search) ||
        item.reason.toLowerCase().includes(search) ||
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

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(item => item.priority === priorityFilter);
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
        const itemDate = new Date(item.dateSubmitted);
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
        case 'dateSubmitted':
          aVal = new Date(a.dateSubmitted);
          bVal = new Date(b.dateSubmitted);
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
  }, [searchTerm, statusFilter, departmentFilter, priorityFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
    setPriorityFilter('all');
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
    console.log('Bulk Accept:', Array.from(selectedRows));
    // Here you would typically call an API to approve selected requests
    setSelectedRows(new Set()); // Clear selection after action
  };

  const handleBulkReject = () => {
    console.log('Bulk Reject:', Array.from(selectedRows));
    // Here you would typically call an API to reject selected requests
    setSelectedRows(new Set()); // Clear selection after action
  };

  const activeFiltersCount = [
    statusFilter !== 'all',
    departmentFilter !== 'all', 
    priorityFilter !== 'all',
    requestTypeFilter !== 'all',
    dateFilter !== 'all',
    searchTerm.length > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
          {/* Top Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-900">HR-ARQ-25-07-001</h1>
            </div>
            
            {/* Always Visible Search Bar */}
            <div className="flex items-center gap-3">
              <div className="w-72 relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ focusRingColor: '#ec4899' }}
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
                to="/dashboard/regularise"
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
                  style={{ 
                    borderColor: showFilter ? '#ec4899' : undefined,
                    color: showFilter ? '#ec4899' : undefined,
                    backgroundColor: showFilter ? '#fdf2f8' : undefined
                  }}
                >
                  <Filter className="w-2.5 h-2.5" />
                  <span className="font-medium">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
                      {activeFiltersCount}
                    </span>
                  )}
                  {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                </button>

                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">Attendance Requests</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-600">
                  {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
                </span>
                <Calendar className="w-3 h-3 text-gray-400" />
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilter && (
              <div className="px-3 py-3 bg-white border-t border-gray-100">
                <div className="space-y-3">
                  {/* Filter Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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

                    {/* Priority Filter */}
                    <div className="space-y-1">
                      <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                        <AlertCircle className="w-3 h-3 text-gray-400" />
                        Priority
                      </label>
                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                      >
                        <option value="all">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    {/* Request Type Filter */}
                    <div className="space-y-1">
                      <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                        <Users className="w-3 h-3 text-gray-400" />
                        Request Type
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
                        Date Range
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
                        className="px-2 py-1 text-xs text-white rounded transition-colors"
                        style={{ backgroundColor: '#ec4899' }}
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
                    <Check className="w-2.5 h-2.5" />
                    Accept ({selectedRows.size})
                  </button>
                  <button
                    onClick={handleBulkReject}
                    className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
                  >
                    <XCircle className="w-2.5 h-2.5" />
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
                  <th className="text-left p-2 text-xs font-medium text-gray-600">Reason</th>
                  <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                    <Calendar className="w-3 h-3 mx-auto" />
                    <div className="text-xs mt-0.5">Date</div>
                  </th>
                  <th className="w-16 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
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
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">{item.department}</span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className={`px-1 py-0.5 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
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
                        style={{ 
                          borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
                          color: item.status === 'Submitted' ? '#ec4899' : undefined,
                          backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
                      <div className="text-xs text-gray-500">{item.reason}</div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="text-xs text-gray-600 font-medium">
                        {new Date(item.dateSubmitted).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(item.dateSubmitted).getFullYear()}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center justify-center gap-0.5">
                        <button 
                          className="p-0.5 text-gray-400 hover:text-blue-600 rounded transition-colors" 
                          title="View Details"
                          onClick={() => console.log('View:', item.id)}
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button 
                          className="p-0.5 text-gray-400 hover:text-green-600 rounded transition-colors" 
                          title="Accept Request"
                          onClick={() => console.log('Accept:', item.id)}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button 
                          className="p-0.5 text-gray-400 hover:text-red-600 rounded transition-colors" 
                          title="Reject Request"
                          onClick={() => console.log('Reject:', item.id)}
                        >
                          <XCircle className="w-3 h-3" />
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
                    : 'No attendance requests available'
                  }
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
                  className={`px-1.5 py-0.5 text-xs rounded transition-colors border ${
                    itemsPerPage === size
                      ? 'text-white font-medium border-pink-500'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                  }`}
                  style={{
                    backgroundColor: itemsPerPage === size ? '#ec4899' : 'transparent'
                  }}
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
                          className={`px-1.5 py-0.5 text-xs rounded transition-colors border ${
                            currentPage === page
                              ? 'text-white font-medium border-pink-500'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-300'
                          }`}
                          style={{
                            backgroundColor: currentPage === page ? '#ec4899' : 'transparent'
                          }}
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
  );
};

export default RegulariseRequest;

