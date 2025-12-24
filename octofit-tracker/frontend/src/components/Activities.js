import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${API_BASE_URL}/api/activities/`;

  useEffect(() => {
    console.log('Fetching activities from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Activities API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities API Response Data:', data);
        const activitiesData = data.results || data;
        console.log('Parsed Activities Data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
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
        <p className="mt-3">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Error loading activities: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏃 Activities</h1>
      </div>
      
      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{apiUrl}</code>
      </div>

      <div className="card stats-card mb-4">
        <div className="card-body text-center">
          <h2 className="display-4">{activities.length}</h2>
          <p className="mb-0">Total Activities</p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏃</div>
          <h3>No Activities Found</h3>
          <p>There are currently no activities logged.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover data-table">
            <thead>
              <tr>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td><strong>{activity.activity_type || 'Unknown Activity'}</strong></td>
                  <td>
                    {activity.duration ? (
                      <span className="badge bg-primary badge-custom">{activity.duration} min</span>
                    ) : 'N/A'}
                  </td>
                  <td>{activity.distance ? `${activity.distance} km` : 'N/A'}</td>
                  <td>
                    {activity.calories_burned ? (
                      <span className="badge bg-warning text-dark badge-custom">{activity.calories_burned} cal</span>
                    ) : 'N/A'}
                  </td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                  <td>{activity.user ? (activity.user.username || activity.user) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
