import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

const EditEntryForm = () => {
    const { id } = useParams();
    const { loading, EditTask, GetOneTask } = useAuth();
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getTaskData = async () => {
            const res = await GetOneTask(id);
            setTask({
                title: res.title,
                description: res.description,
                status: res.status,
                dueDate: res.dueDate
            });
        }
        getTaskData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await EditTask(task,id);
        console.log(res)
        if (res) navigate("/dashboard");
    }

    return (
        <div className="max-w-[70%] mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Journal</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    name="title" // Added name attribute
                    value={task?.title}
                    placeholder="Task name"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-[#3998c0]"
                />
                <div className="w-full mt-5 flex justify-between items-center">
                    <div className='w-[60%]'>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={task?.status}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#3998c0] focus:border-[#3998c0] sm:text-sm"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Progress">Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">Due date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-[#3998c0] cursor-pointer"
                            required
                        />
                    </div>
                </div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    placeholder="About task."
                    onChange={handleChange}
                    value={task?.description}
                    required
                    rows={5}
                    className="w-full p-2 border rounded resize-none h-auto overflow-hidden focus:outline-[#3998c0]"
                />
                <button
                    type="submit"
                    className={`w-full p-2 bg-[#3998c0] text-white rounded hover:bg-[#2d799a] ${loading && "cursor-not-allowed"}`}
                    disabled={loading}
                >
                    {loading ? 'Editing Task...' : 'Edit Task'}
                </button>
            </form>
            {loading && <Loader/>}
        </div>
    )
}

export default EditEntryForm;
