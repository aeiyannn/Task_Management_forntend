import { useEffect, useState } from "react";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import React from "react";
import logo from "../Image/tasklogo.png";
import Login from "./Login";
import booklogo from "../Image/book.png";
import MyTask from "./MyTask";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router";
import AllTask from "./AllTask";

const Main = () => {
  const [open, setOpen] = useState(true);
  const [content, Setcontent] = useState("myTask");
  const getrole = localStorage.getItem("userinfo")
  const role = JSON.parse(getrole)
  console.log(getrole)


  const logout = () => {
    localStorage.removeItem('userinfo')
    window.location.reload()

  }

  return (
    <div>
      <div className="flex ">
        {/* Side Nav start */}
        <div
          className={` ${open ? "w-60" : "w-20 "
            } bg-white h-screen p-5  pt-8  duration-300 transition-all  fixed left-0 top-0`}
        >
          <div className="flex items-center justify-center">
            <img src={logo} alt="" />
            <h1 className={open ? "text-3xl font-bold ml-2" : "hidden"}>
              Taska
            </h1>
          </div>

          {role?.userType === "admin" ? (
            <ul className="pt-6">
              <li
                onClick={() => Setcontent("myTask")}
                className={
                  "flex  rounded-md p-2   cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 hover:bg-gray-200 mt-5 "
                }
              >
                <img src={booklogo} className="text-3xl" />
                <span
                  className={`${!open && "hidden"} flex items-center  text-xl  `}
                >
                  Task
                </span>
              </li>
              <li
                onClick={() => Setcontent("createTask")}
                className={
                  "flex  rounded-md p-2   cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4  hover:bg-gray-200 mt-5 "
                }
              >
                <FaUserCheck className="text-3xl" />
                <span
                  className={`${!open && "hidden"} flex items-center  text-xl  `}
                >
                  Create Task
                </span>
              </li>
            </ul>
          ) : (
            <ul>
              <li
                onClick={() => Setcontent("myTask")}
                className={
                  "flex  rounded-md p-2   cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 hover:bg-gray-200 mt-5 "
                }
              >
                <img src={booklogo} className="text-3xl" />
                <span
                  className={`${!open && "hidden"} flex items-center  text-xl  `}
                >
                  Task
                </span>
              </li>
            </ul>
          )}



        </div>
        {/* Side Nav end */}
        {/* Side Content start */}
        <div
          style={{
            marginLeft: `${open ? "250px" : "90px"}`,
            minHeight: "100vh",
          }}
          className={`flex-1 overflow-y-auto bg-gray-200`}
        >
          <div className="flex p-2 w-full  bg-white justify-between">
            <div className="flex">
              <GiHamburgerMenu
                onClick={() => setOpen(!open)}
                className="  text-black text-3xl font-medium"
              />
              <h1 className="text-3xl  ml-2 text-black ">Task</h1>
            </div>
            <div>
              <p onClick={() => logout()} className="bg-blue-600 px-6 py-2  text-white rounded-lg text-sm ">
                LogOut
              </p>
            </div>
          </div>
          <div>
            {

              content === "myTask" ?
                role.userType === "admin" ?
                  <AllTask />
                  :
                  <MyTask />
                :
                <CreateTask />
            }
          </div>
        </div>
        {/* Side Content end */}
      </div>
    </div>
  );
};
export default Main;
