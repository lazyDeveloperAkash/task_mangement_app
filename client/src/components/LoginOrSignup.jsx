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
          <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.userName || userData.userName ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
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
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${isFocused.userName || userData.userName ? 'border-blue-500' : 'border-gray-300'}`}
            placeholder=" "
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className={`bg-white px-2 absolute left-3 transition-all duration-200 ${isFocused.password || userData.password ? 'text-[#3998c0] -top-3' : 'text-gray-700 top-2'}`}>
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
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] transition-all duration-200 ${isFocused.password || userData.password ? 'border-[#3998c0]' : 'border-gray-300'}`}
            placeholder=" "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3998c0] text-white py-2 rounded-md hover:bg-[#3998c0] transition duration-200"
        >
          {isSignup ? "Sign up" : "Login"}
        </button>

        {/* Signup Redirect Button */}
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setIsSignup(!isSignup)} className="text-[#3998c0] hover:underline">
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