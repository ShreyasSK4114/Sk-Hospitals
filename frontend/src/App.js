// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';


function App() {
  return (
    <Router>
      <div className="App" style={{ margin: '20px' }}>
        <nav>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          <Link to="/login">Login</Link>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
