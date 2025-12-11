import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Report from './components/Report';
import About from './components/About';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">FeedBack Analysis</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Feedback</Link>
            <Link className="nav-link" to="/report">Dasboard</Link>
          </div>
        </div>
      </nav> */}
      
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={
            <ErrorBoundary>
              <Report />
            </ErrorBoundary>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;