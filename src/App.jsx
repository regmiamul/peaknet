import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './assets/Homepage';
import PeakNetDashboard from './PeakNetDashboard';
import Login from './assets/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<PeakNetDashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;





