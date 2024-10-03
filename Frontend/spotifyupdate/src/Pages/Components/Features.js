import React from 'react';
import './features.css';

const Features = () => {
  return (
    <div className="features-section">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Unlimited Music Streaming</h3>
          <p>Access millions of songs from various genres and artists worldwide.</p>
        </div>
        <div className="feature-card">
          <h3>Personalized Playlists</h3>
          <p>Create and curate playlists based on your preferences and mood.</p>
        </div>
        <div className="feature-card">
          <h3>Offline Listening</h3>
          <p>Download your favorite tracks and listen to them without an internet connection.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
