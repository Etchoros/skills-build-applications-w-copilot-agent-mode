import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${API_BASE_URL}/api/workouts/`;

  useEffect(() => {
    console.log('Fetching workouts from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Workouts API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts API Response Data:', data);
        const workoutsData = data.results || data;
        console.log('Parsed Workouts Data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
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
        <p className="mt-3">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Error loading workouts: {error}</p>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return 'bg-secondary';
    const lower = difficulty.toLowerCase();
    if (lower === 'easy' || lower === 'beginner') return 'bg-success';
    if (lower === 'medium' || lower === 'intermediate') return 'bg-warning text-dark';
    if (lower === 'hard' || lower === 'advanced') return 'bg-danger';
    return 'bg-info';
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">💪 Workouts</h1>
      </div>
      
      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{apiUrl}</code>
      </div>

      <div className="card stats-card mb-4">
        <div className="card-body text-center">
          <h2 className="display-4">{workouts.length}</h2>
          <p className="mb-0">Total Workouts</p>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💪</div>
          <h3>No Workouts Found</h3>
          <p>There are currently no workout plans available.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover data-table">
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Exercises</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.id || index}>
                  <td><strong>{workout.name || 'Unknown Workout'}</strong></td>
                  <td>
                    {workout.workout_type ? (
                      <span className="badge bg-info badge-custom">{workout.workout_type}</span>
                    ) : 'N/A'}
                  </td>
                  <td>
                    {workout.difficulty ? (
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)} badge-custom`}>
                        {workout.difficulty}
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td>
                    {workout.duration ? (
                      <span className="badge bg-primary badge-custom">{workout.duration} min</span>
                    ) : 'N/A'}
                  </td>
                  <td>
                    {workout.exercises ? (
                      <span className="badge bg-secondary badge-custom">{workout.exercises.length} exercises</span>
                    ) : 'N/A'}
                  </td>
                  <td>{workout.description || 'No description available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Workouts;
