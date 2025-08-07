import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Report from './components/Report';
import About from './components/About';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">FeedBack Analysis</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/report">Report</Link>
            <Link className="nav-link" to="/about">About</Link>            
          </div>
        </div>
      </nav>
      
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/about" element={<About />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;