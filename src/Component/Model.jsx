import React from 'react';
import { HiFlag } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

function Modal({ isOpen, onClose, Data }) {
    console.log(Data)
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
                    <div className="relative p-4 w-3/4">
                        <div className="relative bg-white rounded-2xl shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl m-3 font-semibold text-gray-900 dark:text-white">Task Detail</h3>
                                <RxCross2 onClick={toggleModal} />
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <h1 className='text-blue-600 text-2xl font-bold'>{Data.Task}</h1>
                            </div>
                            <div className='flex justify-around text-gray-600'>
                                <p>Due Date</p>
                                <p>Assignee</p>
                                <p>Priority</p>
                                <p>Status</p>
                                <p>Assignby</p>
                            </div>
                            <div className='flex justify-around text-black font-bold text-lg'>
                                <p >20/2/2023</p>
                                <p>Aeiyan</p>
                                <div className='flex'>
                                    <HiFlag className='text-yellow-500 text-xl mt-1 ' />
                                    <p>Low</p>
                                </div>
                                <p className='text-sm bg-green-400 p-1 rounded text-white'>pending</p>
                                <p>Ahmed</p>
                            </div>
                            <div className='border-2 border-gray-400 h-48 mx-10 mt-10 rounded-md'  >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ex officiis tempore, incidunt nesciunt sequi nobis? Perferendis assumenda tempora, vel quia corporis error tempore repellat voluptatem saepe! Eaque, quidem similique.
                            </div>
                            <div className='mt-10 text-white'>1</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
