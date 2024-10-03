// src/SpotifyPlayer.js
import React, { useEffect, useRef, useState } from 'react';

const SpotifyPlayer = () => {
  const [token, setToken] = useState(() => localStorage.getItem('spotify_access_token') || null);
  const playerRef = useRef(null);

  // Effect to handle token extraction or redirection
  useEffect(() => {
    if (!token) {
      // Parse token from URL hash if available
      const hash = window.location.hash;
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      const tokenFromUrl = tokenMatch ? tokenMatch[1] : null;

      if (tokenFromUrl) {
        setToken(tokenFromUrl); // Set token in state
        localStorage.setItem('spotify_access_token', tokenFromUrl); // Store token in localStorage
        window.history.pushState("", document.title, window.location.pathname); // Remove token from URL
      } else {
        // Redirect to Spotify authorization
        const redirectUri = 'http://localhost:3000/SpotifyPlayer';
        const clientId = 'a6705529bad348f39e35fd7338a01bbf';
        const scopes = 'user-read-playback-state user-modify-playback-state streaming';
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
        window.location.href = authUrl; // Redirect to Spotify login if no token is found
      }
    }
  }, [token]); // Run this effect only once to handle token extraction or redirect

  // Effect to initialize player once token is set
  useEffect(() => {
    if (!token) return; // Do not initialize player if token is not available

    const initializePlayer = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      script.onload = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5,
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => console.error(message));
        player.addListener('authentication_error', ({ message }) => console.error(message));
        player.addListener('account_error', ({ message }) => console.error(message));
        player.addListener('playback_error', ({ message }) => console.error(message));

        // Player state updates
        player.addListener('player_state_changed', state => {
          console.log(state);
        });

        // Ready to play
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        player.connect();
        playerRef.current = player; // Store player instance
      };

      document.body.appendChild(script);
    };

    initializePlayer();
  }, [token]); // Initialize the player only when the token is set

  const playSong = async () => {
    if (!playerRef.current) return;

    const songUri = 'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'; // Replace with your track URI

    await playerRef.current.togglePlay(); // Toggle playback
    await playerRef.current.resume(); // Start playback if paused
    await playerRef.current.queue(songUri); // Queue a song
  };

  return (
    <div>
      <h1>Spotify Web Playback SDK</h1>
      {token ? (
        <button onClick={playSong}>Play Song</button>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
