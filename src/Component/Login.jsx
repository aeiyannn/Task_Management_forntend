import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import logo from "../Image/tasklogo.png";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoader3Line } from "react-icons/ri";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().max(8).min(8).required("Password is required"),
});

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const login = (userData) => {
    let data = {
      email: userData.email,
      password: userData.password
    }
    setloading(true)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://taskmanagementbackend-production-7a9f.up.railway.app/api/auth/login',
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data.data);

        toast.success("Login succesfully", {
          theme: "colored",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setTimeout(() => {
          localStorage.setItem("userinfo", JSON.stringify(response.data.data));
          onLogin(navigate)
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
  }

  const [showpassword, Setshowpassword] = useState(false)
  return (
    <div className="bg-container flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-8 rounded-md w-full md:w-2/3 m-2 lg:w-1/3">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" />
          <h1 className="text-3xl font-bold ml-2">Taska</h1>
        </div>
        <div>
          <h1 className="text-gray-500 text-2xl font-bold text-center m-3">
            Welcome to Taska!👋🏻
          </h1>
        </div>
        <form onSubmit={handleSubmit(login)}>
          <div>
            <input
              {...register("email")}
              className={`border-2 my-2 p-2 border-gray-300 focus:outline-none  w-full rounded-lg ${errors.email ? "border-red-500" : ""
                }`}
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className={`border-2 my-2 p-2 border-gray-300 w-full rounded-lg flex justify-between ${errors.password ? "border-red-500" : ""
              }`}>
              <input
                {...register("password")}
                className={`w-4/5 focus:outline-none `}
                type={showpassword ? "text" : "password"}
                placeholder="Password"
              /><div onClick={() => Setshowpassword(!showpassword)} >
                {
                  showpassword ?
                    <LuEye className="text-gray-500 text-xl" /> :
                    <FaRegEyeSlash className="text-gray-500 text-xl" />
                }

              </div>
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
                LOGIN
              </button>
            }

            <p className="text-gray-400">
              Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-400 cursor-pointer">Signup</span>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
