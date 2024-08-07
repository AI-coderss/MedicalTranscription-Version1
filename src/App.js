import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <div className="main-content">
        <h1>MEDICAL TRANSCRIPTION</h1>
        {[
          'Personal History',
          'Chief Complaint',
          'Present Illness',
          'Medication History',
          'Past History',
          'Family History',
          'Required Lab Tests and Procedures'
        ].map((label) => (
          <div className="section" key={label}>
            <label>{label}:</label>
            <textarea></textarea>
          </div>
        ))}
      </div>
      <div className="sidebar">
        <h2>Medical Voice Transcription</h2>
        {['Start Recording', 'Stop Recording', 'New Recording', 'Case Analysis'].map((action) => (
          <button className="button" key={action}>{action}</button>
        ))}
        <div className="footer">
          Pioneering in patient Service
        </div>
      </div>
    </div>
  );
};

export default App;
