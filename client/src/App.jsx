import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import DashBoard from './components/DashBoard';
import LoginOrSignup from './components/LoginOrSignup';
import CreateTask from './components/CreateTask';
import EditEntryForm from './components/EditEntryForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Athentication/ProtectedRoute';
import RedirectIfLoggedIn from './components/Athentication/RedirectIfLoggedIn';


const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <Router>
        {location.pathname === "/" ? "" : <Navbar />}
        <Routes>
          <Route path="/" element={<RedirectIfLoggedIn><LoginOrSignup /></RedirectIfLoggedIn>} />

          {/* Protect the dashboard and task management routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditEntryForm /></ProtectedRoute>} />

          {/* Redirect any unknown paths to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
