import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import PeakNetDashboard from './PeakNetDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<PeakNetDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;





