import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SpotifyApp from './Pages/SpotifyApp/SpotifyApp';
import SpotifyPlayer from './Pages/SpotifyPlayer/SpotifyPlayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SpotifyApp" element={<SpotifyApp />} />
        <Route path="/SpotifyPlayer" element={<SpotifyPlayer />} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
