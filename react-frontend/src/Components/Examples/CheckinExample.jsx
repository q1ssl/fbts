import React, { useState } from 'react';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';

const CheckinExample = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleCheckin = async () => {
    if (!user?.employee_id) {
      setMessage('❌ Employee ID not found');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Using the new frappe-js-sdk API service
      const result = await api.createCheckin(
        user.employee_id,
        22.5738752, // latitude
        88.3785728  // longitude
      );

      if (result.success) {
        const data = result.data;
        setMessage(`✅ ${data.message?.log_type || 'Check-in'} successful! Ref: ${data.message?.name || 'N/A'}`);
      } else {
        setMessage(`❌ Check-in failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Check-in error:', error);
      setMessage('🚨 Error during check-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handleCheckin} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Checking in...' : 'Check In'}
      </button>
      
      {message && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CheckinExample;