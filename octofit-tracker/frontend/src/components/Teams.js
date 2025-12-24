import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${API_BASE_URL}/api/teams/`;

  useEffect(() => {
    console.log('Fetching teams from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Teams API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams API Response Data:', data);
        const teamsData = data.results || data;
        console.log('Parsed Teams Data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
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
        <p className="mt-3">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Error loading teams: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏆 Teams</h1>
      </div>
      
      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{apiUrl}</code>
      </div>

      <div className="card stats-card mb-4">
        <div className="card-body text-center">
          <h2 className="display-4">{teams.length}</h2>
          <p className="mb-0">Total Teams</p>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <h3>No Teams Found</h3>
          <p>There are currently no teams in the system.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover data-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id || index}>
                  <td><strong>{team.name || 'Unknown Team'}</strong></td>
                  <td>{team.description || 'No description'}</td>
                  <td>
                    <span className="badge bg-info badge-custom">
                      {team.members ? team.members.length : 0} members
                    </span>
                  </td>
                  <td>
                    {team.total_points !== undefined ? (
                      <span className="badge bg-success badge-custom">{team.total_points} pts</span>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teams;
