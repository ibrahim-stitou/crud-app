// src/NotFounded.js
import React from 'react';
import './NotFounded.css';

function NotFounded() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/auth/login" className="back-link">Go to Login</a>
    </div>
  );
}

export default NotFounded;
