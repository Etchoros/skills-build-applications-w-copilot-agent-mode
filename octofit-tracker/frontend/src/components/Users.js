import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${API_BASE_URL}/api/users/`;

  useEffect(() => {
    console.log('Fetching users from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Users API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users API Response Data:', data);
        const usersData = data.results || data;
        console.log('Parsed Users Data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Error loading users: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">👥 Users</h1>
      </div>
      
      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{apiUrl}</code>
      </div>

      <div className="card stats-card mb-4">
        <div className="card-body text-center">
          <h2 className="display-4">{users.length}</h2>
          <p className="mb-0">Total Users</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <h3>No Users Found</h3>
          <p>There are currently no users in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>Goals</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td><strong>{user.username || user.name || 'Unknown User'}</strong></td>
                  <td>{user.email || 'N/A'}</td>
                  <td>
                    {user.fitness_level ? (
                      <span className="badge bg-success badge-custom">{user.fitness_level}</span>
                    ) : 'N/A'}
                  </td>
                  <td>{user.goals || 'No goals set'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
