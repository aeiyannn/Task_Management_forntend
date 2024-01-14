import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles.css";
import taskLogo from "../Image/tasklogo.png";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { RiLoader3Line } from "react-icons/ri";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  role: yup.string().required("Role is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().max(8).min(8).required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const signup = (userdata) => {
    // Handle signup logic here
    console.log(userdata);
    setloading(true)

    let data = {
      firstName: userdata.fullName,
      lastName: userdata.fullName,
      email: userdata.email,
      password: userdata.password,
      userType: userdata.role
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://taskmanagementbackend-production-7a9f.up.railway.app/api/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        toast.success("Your Account Created", {
          theme: "colored",

        })
        setTimeout(() => {
          navigate('/login')
        }, 1000)

      })

      .catch((error) => {
        if (error.message === "Network Error") {
          toast.error(error.message, {
            theme: "colored",
            autoClose: 2000,
            hideProgressBar: true,
          })
        } else {

          toast.error(error.response?.data.message, {
            theme: "colored",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
        setloading(false)
      });
  };

  return (
    <div className="bg-container flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-8 rounded-md w-full md:w-2/3 m-2 lg:w-2/6">
        <div className="flex items-center justify-center">
          <img src={taskLogo} alt="" />
          <h1 className="text-3xl font-bold ml-2">Taska</h1>
        </div>
        <div>
          <h1 className="text-gray-500 text-2xl font-bold text-center m-3">
            Welcome to Taska!👋🏻
          </h1>
        </div>
        <form onSubmit={handleSubmit(signup)}>
          <div>
            <input
              {...register("fullName")}
              className={`border-2 my-2 p-2 border-gray-300 w-full rounded-lg ${errors.fullName ? "border-red-500" : ""
                }`}
              type="text"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <select
              {...register("role")}
              className={`border-2 my-2 p-2 border-gray-300 w-full rounded-lg px-2 focus:outline-none ${errors.role ? "border-red-500" : ""
                }`}
            >
              <option selected="selected" value="" disabled hidden>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role.message}</p>}
          </div>
          <div>
            <input
              {...register("email")}
              className={`border-2 my-2 p-2 border-gray-300 w-full rounded-lg ${errors.email ? "border-red-500" : ""
                }`}
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <div className={`border-2 my-2 p-2 border-gray-300 w-full rounded-lg flex justify-between ${errors.password ? "border-red-500" : ""
              }`}>
              <input
                {...register("password")}
                className='w-4/5 focus:outline-none'
                type="password"
                placeholder="Password"
              />
              <LuEye className="text-gray-500 text-xl" />

            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="text-center my-4">
            {loading ?
              <div
                style={{ backgroundColor: "#B4C4FF" }}
                className="mb-4 w-full p-2 rounded-lg text-white text-center flex justify-center items-center"
              >
                <div role="status" className="text-center">
                  <RiLoader3Line className="w-8 h-8 text-white animate-spin" />
                </div>
              </div>
              : <button
                style={{ backgroundColor: "#666CFF" }}
                className="mb-4 w-full p-3 rounded-lg text-white font-semibold"
                type="submit"
              >
                SignUp
              </button>
            }
            <p className="text-gray-400">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer">
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div >
      <ToastContainer />
    </div >
  );
}
