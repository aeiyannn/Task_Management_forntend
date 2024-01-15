import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { HiFlag } from "react-icons/hi";
import { RiDeleteBin5Line, RiLoader3Line } from "react-icons/ri";
import Modal from "./Model";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Notfound from "./Page_not_found";

export default function AllTask() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ModelData, setModeldata] = useState({});
    const [task, settask] = useState([])
    const [loading, setloading] = useState(false)
    const getData = localStorage.getItem("userinfo")
    const [err, seterr] = useState(false)
    const adminData = JSON.parse(getData)

    const OpenModel = (v) => {
        setIsModalOpen(true);
        setModeldata(v);
    };

    const updateStatus = (e, v) => {
        console.log(e.target.value)
        v.taskStatus = e.target.value
        let data = {
            "taskStatus": e.target.value
        };

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://taskmanagementbackend-production-7a9f.up.railway.app/api/updatestatus/${v.id}`,
            headers: {
                'Authorization': adminData.token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data)
                toast.success("status update", {
                    theme: "dark",
                    autoClose: "2000",
                    hideProgressBar: true
                })
                reload()
            })
            .catch((error) => {
                console.log(error)
                if (error.message === "Network Error") {
                    toast.error(error.message, {
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: true,
                    })
                }
                else if (error.response.data.message === "in valid Token") {
                    localStorage.removeItem("userinfo")
                    window.location.reload()

                }
                else {

                    toast.error(error.response?.data.message, {
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: true,
                    });
                }
            });
    }
    useEffect(() => {
        reload()

    }, [])
    const reload = () => {
        setloading(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://taskmanagementbackend-production-7a9f.up.railway.app/api/getalltask',
            headers: {
                'Authorization': adminData.token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                settask(response.data.data)
                console.log(task)
                setloading(false)
            })
            .catch((error) => {
                if (error.message === "Network Error") {
                    toast.error(error.message, {
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: true,

                    })
                    seterr(true)
                } else {

                    toast.error(error.response?.data.message, {
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: true,
                    });
                }

            });
    }

    return (
        <div>
            {loading ?
                !err ?
                    <div role="status" className="flex justify-center items-center mt-48">
                        <RiLoader3Line className="w-20 h-20 mx-3 text-blue-500 animate-spin" />
                    </div>
                    :
                    <Notfound networkerr={true} />
                :
                <div className="m-5">
                    <div className="relative overflow-x-auto  border-2 border-gray-200 rounded-lg ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-400 bg-white">
                                <tr className="border-b">
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Due Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Assignby
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Priority
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    task?.map((v, i) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th onClick={() => OpenModel(v)} scope="row" className="px-6 py-4  text-blue-500 font-bold ">
                                                    {v.taskTitle}
                                                </th>
                                                <td
                                                    className="px-6 py-4 text-black text-base font-bold font-poppins leading-6"
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        lineHeight: "21px",
                                                        letterSpacing: "-0.02em",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {v.dueDate}
                                                </td>
                                                <td
                                                    className="px-6 py-4 text-black text-base font-bold font-poppins leading-6"
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        lineHeight: "21px",
                                                        letterSpacing: "-0.02em",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {v.userInfo.firstName}
                                                </td>
                                                <td
                                                    className=" flex px-6 py-4  text-black text-base font-bold font-poppins leading-6"
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        lineHeight: "21px",
                                                        letterSpacing: "-0.02em",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    <HiFlag className={`text-xl ${v.priority === "low" ? 'text-yellow-500' : v.priority === "normal" ? 'text-green-600' : 'text-red-600'}`} />
                                                    {v.priority}
                                                </td>
                                                <td className="pl-4 py-3">
                                                    <div className="relative inline-block">
                                                        <select onChange={(e) => updateStatus(e, v)} className={`appearance-none text-center text-white text-xs rounded-sm border-2 px-2 focus:outline-none ${v.taskStatus === "pending"
                                                            ? "bg-orange-400"
                                                            : v.taskStatus === "started"
                                                                ? "bg-blue-500"
                                                                : v.taskStatus === "onprogress"
                                                                    ? "bg-yellow-500"
                                                                    : v.taskStatus === "completed"
                                                                        ? "bg-green-500"

                                                                        : "bg-red-500"
                                                            }`}>
                                                            <option
                                                                className="text-lg p-4 border"
                                                                value=""
                                                                disabled
                                                                selected
                                                                hidden
                                                            >
                                                                {v.taskStatus}
                                                            </option>
                                                            <option
                                                                className=" p-4 bg-orange-500 border hover:hidden"
                                                                value="pending" label="Pending"
                                                            >
                                                                Pending
                                                            </option>
                                                            <option
                                                                className="  p-4 bg-blue-500 border hover:hidden"
                                                                value="started" label="Started"
                                                            >
                                                                Started
                                                            </option>
                                                            <option
                                                                className="p-4 bg-yellow-500 border hover:bg-white"
                                                                value="onprogress" label="On progress"
                                                            >
                                                                On progress
                                                            </option>
                                                            <option
                                                                className="p-4 bg-green-500 border hover:bg-white"
                                                                value="completed" label="Completed"
                                                            >
                                                                Completed
                                                            </option>
                                                            <option
                                                                className="p-4 bg-red-500 border hover:bg-white"
                                                                value="notcomplete"
                                                                label="Not complete"
                                                            >
                                                                Not complete
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>

                                                <td className="pl-8 py-4  text-center ">
                                                    <RiDeleteBin5Line className="text-red-500 text-xl " />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            }
            <Modal isOpen={isModalOpen} onClose={setIsModalOpen} Data={ModelData} />
            <ToastContainer />
        </div >
    );
}
