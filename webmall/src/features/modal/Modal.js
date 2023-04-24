/**
 * @Description Modal Component
 * @author GYX xiao sb
 * @date 2023/4/24
 */

import React from 'react'

const Modal = ({ isOpen, onClose, onConfirm, description, title, isNotice }) => {
    if (!isOpen) {
        return null
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="relative bg-white dark:bg-green-700 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p>{description}</p>
                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    {!isNotice &&
                        <button
                            className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={onClose}
                        >
                            No, later
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal