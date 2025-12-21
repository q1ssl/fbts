import React, { useState } from 'react';
import api from '../../api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing connection...');
    
    try {
      // Test a simple API call first
      const result = await fetch('http://localhost:8000/api/method/ping', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (result.ok) {
        const data = await result.json();
        setTestResult(`✅ Connection successful: ${JSON.stringify(data)}`);
      } else {
        setTestResult(`❌ Connection failed: ${result.status} ${result.statusText}`);
      }
    } catch (error) {
      setTestResult(`🚨 Connection error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setTestResult('Testing login...');
    
    try {
      const result = await api.login('amit@q1ssl.com', 'password');
      setTestResult(`Login result: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setTestResult(`Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>API Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ 
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Connection
        </button>
        
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Login
        </button>
      </div>
      
      {testResult && (
        <div style={{
          padding: '15px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '5px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          fontSize: '12px'
        }}>
          {testResult}
        </div>
      )}
    </div>
  );
};

export default ApiTest;