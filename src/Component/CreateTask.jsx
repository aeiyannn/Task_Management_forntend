import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FaCircle } from "react-icons/fa";
import { HiFlag } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTask = () => {
  const [selectedPriority, setSelectedPriority] = useState({});
  const [selectedAssignee, setSelectedAssignee] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [assignOptions, setAssignOptions] = useState([]);
  const token = localStorage.getItem("userinfo")
  const admindata = JSON.parse(token)
  const Status_options = [
    { value: "pending", label: "Pending" },
    { value: "started", label: "Started" },
    { value: "onprogress", label: "On Progress" },
    { value: "completed", label: "Completed" },
    { value: "notcomplete", label: "Not Complete" },
  ];

  const Priotiy_options = [
    { value: "low", label: "Low" },
    { value: "normal", label: "Normal" },
    { value: "high", label: "High" },
  ];
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://taskbackend-seven.vercel.app//api/getallusers',
      headers: {
        'Authorization': admindata?.token,
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        const userdata = response.data.data;
        const filteredUserData = userdata.filter(user => user.id !== admindata.id)
        const assignOptionsData = filteredUserData.map((v) => ({
          value: v.id,
          label: v.firstName,
        }));
        setAssignOptions(assignOptionsData);;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    dueDate: yup.string().required("Due Date is required"),
    description: yup.string().required("Description is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (taskData) => {
    console.log("Submitted data:", taskData);
    console.log(selectedStatus.value)
    let data = {
      taskTitle: taskData.title,
      taskDescription: taskData.description,
      dueDate: taskData.dueDate,
      assignBy: admindata.id,
      priority: selectedPriority.value,
      taskStatus: selectedStatus.value,
      assignTo: Number(selectedAssignee.value)

    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://taskbackend-seven.vercel.app//api/addtask/${selectedAssignee.value}`,
      headers: {
        'Authorization': admindata.token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        toast.success("Task Assign Succesfully", {
          theme: "colored",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          toast.error(error.message)
          alert(error.message)
        } else {

          toast.error(error.response?.data.message, {
            theme: "colored",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
        console.log(error)
      });


    console.log(selectedPriority)
    // Handle the form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 bg-white lg:h-4/5 sm:h-full rounded-lg">
        <div className="container mx-auto m-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 m-6">
            <div className="m-2">
              <label className="text-lg font-semibold">Title</label>
              <input
                {...register("title")}
                className="w-full border-2 border-gray-300 mt-2 rounded-lg p-2  focus:outline-blue-500"
                type="text"
                placeholder="Enter Title"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div className="m-2">
              <label className="text-lg font-semibold">Due Date</label>
              <input
                {...register("dueDate")}
                className="w-full border-2 border-gray-300 mt-2 rounded-lg p-2  focus:outline-blue-500"
                type="date"
                placeholder="Enter Title"
              />
              {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
            </div>

            <div className="m-2">
              <label className="text-lg font-semibold">Priority</label>
              <Select value={selectedPriority} defaultValue={Priotiy_options[0].label} className="mt-2" options={Priotiy_options} onChange={(selectedOption) => {
                setSelectedPriority(selectedOption);
              }} />
            </div>

            <div className="m-2">
              <label className="text-lg font-semibold">Status</label>
              <Select value={selectedStatus} className="mt-2" defaultValue={Status_options[0]} options={Status_options} onChange={(selectedOption) => {
                setSelectedStatus(selectedOption);
              }} />
            </div>

            <div className="m-2 mt-3">
              <label className="text-lg font-semibold mb-2">Assignee</label>
              <p>
                <Select defaultValue={assignOptions[0]} value={selectedAssignee} className="mt-2" options={assignOptions} onChange={(selectedOption) => {
                  setSelectedAssignee(selectedOption);
                }} />

              </p>

            </div>

            <div className="m-2">
              <label className="text-lg font-semibold">Description</label>
              <input
                {...register("description")}
                className="w-full border-2 border-gray-300 mt-2 rounded-lg p-2  focus:outline-blue-500"
                type="text"
                placeholder="Enter Title"
              />
              {errors.description && <p className="text-red-500 m-0">{errors.description.message}</p>}
            </div>
          </div>
        </div>
        <div className="text-right m-2">
          <button
            type="submit"
            className="p-2 bg-blue-700 rounded-lg text-white px-10 mr-10 m-10"
          >
            Create Task
          </button>
        </div>
      </div>
      <ToastContainer />
    </form >
  );
};

export default CreateTask;
