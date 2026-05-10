import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Confirmation from './pages/Confirmation';
import BeautyMatch from './pages/BeautyMatch';
import MoodBoard from './pages/MoodBoard';
import MySalon from './pages/MySalon';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/match" element={<BeautyMatch />} />
          <Route path="/mood-board" element={<MoodBoard />} />
          <Route path="/my-salon" element={<ProtectedRoute><MySalon /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
