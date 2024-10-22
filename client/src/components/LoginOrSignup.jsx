import React, { useState } from 'react';
import { useAuth } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

const LoginOrSignup = () => {
  const { login, loading, signup } = useAuth();
  const [userData, setUserData] = useState({ userName: '', password: '' });
  const [isFocused, setIsFocused] = useState({ userName: false, password: false });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData)
    if (isSignup) await signup(userData);
    else await login(userData);
    navigate("/dashboard")
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">{isSignup ? "Sign up" : "Login"}</h2>

        {/* userName Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.userName || userData.userName ? 'text-blue-500 -top-3' : 'text-gray-700 top-2'}`}>
            User Name
          </label>
          <input
            type="string"
            id="username"
            name='userName'
            onChange={handleChange}
            onFocus={() => setIsFocused({ ...isFocused, userName: true })}
            onBlur={() => setIsFocused({ ...isFocused, userName: userData.userName.length > 0 })}
            required
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${isFocused.userName || userData.userName ? 'border-blue-500' : 'border-gray-300'}`}
            placeholder=" "
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.password || userData.password ? 'text-blue-500 -top-3' : 'text-gray-700 top-2'}`}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            onChange={handleChange}
            onFocus={() => setIsFocused({ ...isFocused, password: true })}
            onBlur={() => setIsFocused({ ...isFocused, password: userData.password.length > 0 })}
            required
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${isFocused.password || userData.password ? 'border-blue-500' : 'border-gray-300'}`}
            placeholder=" "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isSignup ? "Sign up" : "Login"}
        </button>

        {/* Signup Redirect Button */}
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setIsSignup(!isSignup)} className="text-blue-500 hover:underline">
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>
      </form>
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default LoginOrSignup;