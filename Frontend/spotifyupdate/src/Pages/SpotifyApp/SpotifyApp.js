// src/components/SpotifyData.js

import React, { useEffect, useState } from 'react';

const SpotifyApp = () => {
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your own Client ID and Client Secret
  const client_id = 'a6705529bad348f39e35fd7338a01bbf';
  const client_secret = 'bce78193c0f4459488a11a5823de5f97';

  const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
  };

  const fetchTrack = async (trackId) => {
    const token = await getAccessToken();
    
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch track data');
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const trackId = '3n3Ppam7vgaVa1iaRUc9Lp'; // Replace with any valid track ID
    fetchTrack(trackId)
      .then(data => {
        setTrackData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if trackData is available before accessing its properties
  if (!trackData) {
    return <div>No track data available.</div>;
  }

  return (
    <div>
      <h2>{trackData.name}</h2>
      <p><strong>Artist:</strong> {trackData.artists[0]?.name}</p>
      <p><strong>Album:</strong> {trackData.album.name}</p>
      <p><strong>Release Date:</strong> {trackData.album.release_date}</p>
      <p><strong>Duration:</strong> {(trackData.duration_ms / 1000).toFixed(0)} seconds</p>
      <img src={trackData.album.images[0]?.url} alt={trackData.album.name} style={{ width: '200px' }} />
    </div>
  );
};

export default SpotifyApp;
