import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './auth/Signup';
import Login from './auth/login';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserOverview from './components/UserDashboard/Calendar';
import MyAppointments from './components/UserDashboard/MyAppointments';

import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminLayout from './components/AdminDashboard/AdminLayout';
import ManageAppointments from './components/AdminDashboard/ManageAppointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<UserOverview />} />
          <Route path="calendar" element={<UserOverview />} />
          <Route path="appointments" element={<MyAppointments />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<ManageAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
