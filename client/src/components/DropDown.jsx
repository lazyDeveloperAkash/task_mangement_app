'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import Loader from './Loader';
import { useAuth } from '../context/UserContext';

const DropDown = ({ taskId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [IsLoaderActive, setIsLoaderActive] = useState(false);

  const navigate = useNavigate();
  const { DeleteTask, loading } = useAuth();

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDropdownOpen]);

  const handleEdit = () => {
    navigate(`/edit/${taskId}`)
  }

  const handleDelete = async () => {
    if (window.confirm("Are you want to delete the task?")) {
      const res = await DeleteTask(taskId);
      if(res) navigate('/dashboard');
    }
    setIsDropdownOpen(!DropDown);
  }

  return (
    <div >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-gray-500 hover:text-gray-700"
      >
        <BsThreeDotsVertical />
      </button>

      {isDropdownOpen && (
        <>
          <div
            onClick={() => setIsDropdownOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          />
          <div className={`absolute right-0 min-h-8 w-32 bg-white border rounded-xl z-20 transition duration-300 ease-in-out ${IsLoaderActive && "backdrop-blur-sm bg-black bg-opacity-50"}`}>
            <button
              onClick={handleEdit}
              className="block w-full px-4 py-2 hover:bg-gray-100 rounded-xl"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-red-500 rounded-xl"
            >
              Delete
            </button>
          </div>
        </>
      )}
      {loading && <Loader/>}
    </div>
  );
}


export default DropDown