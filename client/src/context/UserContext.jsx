import React, { createContext, useContext, useEffect, useState } from 'react';
import { Axios } from '../utills/Axios';
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkAuthentication = async () => {
        try {
            const { data } = await Axios.get('/user/');
            console.log(data)
            setUser(data);
            console.log(data)
        } catch (error) {
            toast.warn(error.response?.data?.message || 'please login');
            setUser(null);
            console.log(error)
        }
    };

    useEffect(() => {
        if (!user) checkAuthentication();
    }, []);

    // Signup function
    const signup = async (userData) => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/user/signup', userData);
            setUser(data.user);
            toast.success("Signup successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Signup failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (userData) => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/user/signin', userData);
            console.log(data)
            setUser(data.user);
            toast.success("Signin successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const signout = async () => {
        try {
            setLoading(true);
            await Axios.post('/user/signout');
            setUser(null);
            toast.success("sucessfully signout!")
            // navigate("/login");
        } catch (err) {
            toast.warn("Signout failed!")
        } finally {
            setLoading(false);
        }
    };

    //////////// task

    const GetOneTask = async (id) => {
        try {
            setLoading(true);
            const { data } = await Axios.get(`/task/${id}`);
            console.log(data)
            return data.task;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'task not found');
        } finally {
            setLoading(false);
        }
    };

    // task creation function
    const CreateTask = async (data) => {
        try {
            setLoading(true);
            await Axios.post('/task/', data);
            toast.success("task sucessfully created!");
            await checkAuthentication();
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'task creation failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // task creation function
    const EditTask = async (task,id) => {
        try {
            setLoading(true);
            await Axios.put(`/task/${id}`, task);
            await checkAuthentication();
            toast.success("task edited sucessfully!");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'task editing failed');
        } finally {
            setLoading(false);
        }
    };

    // task creation function
    const DeleteTask = async (id) => {
        try {
            setLoading(true);
            await Axios.delete(`/task/${id}`);
            toast.success("task deleted sucessfully!");
            await checkAuthentication();
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'task deletion failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, signout, loading, DeleteTask, EditTask, CreateTask, GetOneTask }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};