import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import DropDown from './DropDown';
import DashBoardSkeleton from './skeleton/DashBoardSkeleton';

const DashBoard = () => {
    const { user, signout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/");
    }, [user])

    console.log(user)

    const handleLogout = async () => {
        await signout();
    };
    return (
        <div className="relative mb-6">
            {!user && <DashBoardSkeleton />}
            {user && user.tasks.length === 0 ?
                <div className='w-full h-[70vh] flex items-center justify-center'>
                    <h1 className='text-xl'>Please Create a new task!</h1>
                </div>
                :
                <ul className="flex flex-col items-center gap-8">
                    {user && user.tasks.map((task, idx) => (
                        <div
                            key={idx}
                            className="relative flex flex-col gap-2 mx-auto px-6 py-2 shadow-md leading-relaxed rounded-lg overflow-hidden w-[70%]"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">{task.title}</h2>
                                <DropDown taskId={task._id} />
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className={`px-2 py-1 rounded-2xl bg-[#3998c0] max-w-28 flex items-center justify-center`}>
                                    <p className="text-xs text-white">{task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}</p>
                                </div>
                                <div className={`px-2 py-1 rounded-2xl ${task.status === "Completed" ? "bg-green-700" : (task.status === "Progress" ? "bg-yellow-400" : "bg-red-600")} max-w-28 flex items-center justify-center`}>
                                    <p className="text-xs text-white">{task.status}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 opacity-80">{task.description}</p>
                        </div>
                    ))}
                </ul>
            }
        </div>
    )
}

export default DashBoard