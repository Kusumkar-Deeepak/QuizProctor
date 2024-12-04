import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './Context/AdminContext'; // Import the AdminProvider
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';  // Assuming you have this file
import AdminSignup from './pages/AdminSignup';  // Assuming you have this file
import AdminDashboard from './pages/AdminDashboard'; // Assuming you have this file

function App() {
  return (
    <AdminProvider>  {/* Wrap the Router with AdminProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminSignup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add route for admin dashboard */}
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
