import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './auth/Signup';
import Login from './auth/login';
import UserDashboard from './components/UserDashboard/UserDashboard';
import CalendarBooking from './components/UserDashboard/Calendar';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminLayout from "./components/AdminDashboard/AdminLayout";
import Mana


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard Layout with Nested Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route path="calendar" element={<CalendarBooking />} />
        
          <Route index element={<CalendarBooking />} />
        </Route>

         <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="" element={<AdminDashboard />} />
       
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
