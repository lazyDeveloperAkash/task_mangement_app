import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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

// Layout component to conditionally show Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      {children}
    </>
  );
};

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
        <Layout>
          <Routes>
            <Route path="/" element={<RedirectIfLoggedIn><LoginOrSignup /></RedirectIfLoggedIn>} />
            
            {/* Protect the dashboard and task management routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditEntryForm /></ProtectedRoute>} />
            
            {/* Redirect any unknown paths to login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
