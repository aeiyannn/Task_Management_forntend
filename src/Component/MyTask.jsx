import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { HiFlag } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Model";
import axios from "axios";

export default function MyTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModelData, setModeldata] = useState({});
  const [task, settask] = useState([])
  const getData = localStorage.getItem("userinfo")
  const userData = JSON.parse(getData)
  const OpenModel = (v) => {
    setIsModalOpen(true);
    setModeldata(v);
  };
  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:2000/api/mytask/${userData.id}`,
      headers: {
        'Authorization': userData.token
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        settask(response.data.data)
        console.log(task)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  return (
    <div>
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
                      <th scope="row" className="px-6 py-4  text-blue-500 font-bold ">
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
                        {v.sender.firstName}
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
                          <select className="appearance-none text-center text-xs bg-yellow-400 w-20 rounded-sm border-2 px-2 focus:outline-none">
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
                              className=" p-4 bg-white border hover:hidden"
                              value="role1"
                            >
                              Pending
                            </option>
                            <option
                              className="  p-4 bg-white border hover:hidden"
                              value="role2"
                            >
                              Started
                            </option>
                            <option
                              className="p-4 bg-white border hover:bg-white"
                              value="role3"
                            >
                              On progress
                            </option>
                            <option
                              className="p-4 bg-white border hover:bg-white"
                              value="role3"
                            >
                              Completed
                            </option>
                            <option
                              className="p-4 bg-white border hover:bg-white"
                              value="role3"
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

      <div></div>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} Data={ModelData} />
    </div >
  );
}
