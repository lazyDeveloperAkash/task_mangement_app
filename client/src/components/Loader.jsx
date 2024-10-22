import React from 'react'

const Loader = () => {
    return (
        <div className="fixed flex justify-center items-center min-h-screen inset-0 z-50">
            <div className="w-10 h-10 border-4 border-t-[#3998c0] border-gray-200 rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader