import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

// Get the API base URL from environment variable or default to localhost
const getApiBaseUrl = () => {
  const codespace_name = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace_name) {
    return `https://${codespace_name}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

// Export the API URL for use in components
export const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL);

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              🏋️ OctoFit Tracker
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <Routes>
            <Route path="/" element={
              <div>
                <div className="card welcome-card">
                  <div className="card-body text-center">
                    <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead mb-4">Your complete fitness tracking solution</p>
                    <ul className="feature-list text-start d-inline-block">
                      <li>Track your fitness activities and progress</li>
                      <li>Join teams and compete with friends</li>
                      <li>View leaderboards and rankings</li>
                      <li>Access personalized workout plans</li>
                      <li>Monitor your fitness goals</li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">API Information</h5>
                    <p className="mb-0"><strong>Base URL:</strong> <code>{API_BASE_URL}</code></p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
