// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Patients from './views/Patients';
import Doctors from './views/Doctors';
import Nurses from './views/Nurses';
import Workers from './views/Workers';

function App() {
  return (
    <Router>
      <div className="App" style={{ margin: '20px' }}>
        <nav style={{ margin: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/patients" style={{ marginRight: '10px' }}>Patients</Link>
          <Link to="/doctors" style={{ marginRight: '10px' }}>Doctors</Link>
          <Link to="/nurses" style={{ marginRight: '10px' }}>Nurses</Link>
          <Link to="/workers" style={{ marginRight: '10px' }}>Workers</Link>
        </nav>
        <hr />
        <Routes>
          <Route 
            path="/" 
            element={
              <header>
                <h1>Welcome to <strong>SK Hospitals</strong>!</h1>
                <p>Use the links above to Register or Login.</p>
              </header>
            } 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/workers" element={<Workers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
