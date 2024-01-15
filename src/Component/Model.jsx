import React from 'react';
import { HiFlag } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

function Modal({ isOpen, onClose, Data }) {
    if (!isOpen) return null;

    const toggleModal = () => {
        onClose(false); // Set the state to close the modal
    };

    return (
        <div>
            {/* Main modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                    onClick={toggleModal}
                >
                    <div className="relative p-4 w-full md:w-3/4">
                        <div
                            className="relative bg-white rounded-2xl shadow dark:bg-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl m-3 font-semibold text-gray-900 dark:text-white">
                                    Task Detail
                                </h3>
                                <RxCross2 onClick={toggleModal} />
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <h1 className="text-blue-600 text-2xl font-bold">
                                    {Data.Task}
                                </h1>
                            </div>
                            <div className="flex flex-col md:flex-row justify-around text-gray-600">
                                <div className="mb-2 md:mb-0">
                                    <p className="font-bold">Due Date</p>
                                    <p>{Data.dueDate}</p>
                                </div>
                                <div className="mb-2 md:mb-0">
                                    <p className="font-bold">Assignee</p>
                                    <p>You</p>
                                </div>
                                <div className="mb-2 md:mb-0">
                                    <p className="font-bold">Priority</p>
                                    <div className="flex items-center">
                                        <HiFlag
                                            className={`${Data.priority === 'low'
                                                ? 'text-yellow-500'
                                                : Data.priority === 'normal'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                } text-xl mt-1`}
                                        />
                                        <p>{Data.priority}</p>
                                    </div>
                                </div>
                                <div className="mb-2 md:mb-0">
                                    <p className="font-bold">Status</p>
                                    <p
                                        className={`text-sm ${Data.taskStatus === 'pending'
                                            ? 'bg-orange-400'
                                            : Data.taskStatus === 'started'
                                                ? 'bg-blue-500'
                                                : Data.taskStatus === 'onprogress'
                                                    ? 'bg-yellow-500'
                                                    : Data.taskStatus === 'completed'
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                            } p-1 rounded text-white`}
                                    >
                                        {Data.taskStatus}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold">Assigner</p>
                                    <p>{Data.sender.firstName}</p>
                                </div>
                            </div>
                            <div className="border-2 border-gray-400 h-48 mx-4 mt-4 md:mx-10 md:mt-10 rounded-md p-5 overflow-auto">
                                {Data.taskDescription}
                            </div>
                            <div className="mt-10 text-white">1</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
