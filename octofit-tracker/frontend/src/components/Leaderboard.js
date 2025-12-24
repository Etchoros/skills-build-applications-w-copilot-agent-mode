import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${API_BASE_URL}/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching leaderboard from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        console.log('Leaderboard API Response Status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard API Response Data:', data);
        const leaderboardData = data.results || data;
        console.log('Parsed Leaderboard Data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
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
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-custom" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Error loading leaderboard: {error}</p>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-primary';
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏅 Leaderboard</h1>
      </div>
      
      <div className="api-info">
        <strong>API Endpoint:</strong> <code>{apiUrl}</code>
      </div>

      <div className="card stats-card mb-4">
        <div className="card-body text-center">
          <h2 className="display-4">{leaderboard.length}</h2>
          <p className="mb-0">Total Entries</p>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏅</div>
          <h3>No Leaderboard Entries</h3>
          <p>The leaderboard is empty. Start competing to see rankings!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Points</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    <span className={`badge ${getRankBadge(entry.rank || index + 1)} badge-custom`}>
                      #{entry.rank || index + 1}
                    </span>
                  </td>
                  <td><strong>{entry.user ? (entry.user.username || entry.user) : 'N/A'}</strong></td>
                  <td>{entry.team ? (entry.team.name || entry.team) : 'No team'}</td>
                  <td>
                    {entry.total_points !== undefined ? (
                      <span className="badge bg-success badge-custom">{entry.total_points} pts</span>
                    ) : 'N/A'}
                  </td>
                  <td>{entry.period || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
