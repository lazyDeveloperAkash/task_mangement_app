import React from 'react'

const DashBoardSkeleton = () => {
    return (
        <div className="relative">
            <ul className="flex flex-col items-center gap-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col gap-2 mx-auto px-6 py-4 shadow-md rounded-lg overflow-hidden w-[70%] animate-pulse"
                    >
                        <div className="flex justify-between items-center">
                            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="px-2 py-1 bg-gray-300 rounded-2xl max-w-32 w-20 h-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default DashBoardSkeleton