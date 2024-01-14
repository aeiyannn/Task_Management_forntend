import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTask from "../Component/CreateTask";
import MyTask from "../Component/MyTask";
import Notfound from "../Component/Page_not_found";
import Login from "../Component/Login";
import Signup from "../Component/Signup";
import Main from "../Component/Main";

export default function dkorNavigation() {
  const role = localStorage.getItem("userinfo");
  const roleCheck = JSON.parse(role);

  const Admin_Route = [
    {
      path: "/",
      element: <CreateTask />,
    },
    {
      path: "/ViewTask",
      element: <MyTask />,
    },
  ];
  const User_Route = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/task",
      element: <MyTask />,
    },
    {
      path: "/main",
      element: <Main />,
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          {roleCheck?.role === "admin"
            ? Admin_Route.map((v, i) => {
                return <Route path={v.path} element={v.element} />;
              })
            : User_Route.map((v, i) => {
                return <Route path={v.path} element={v.element} />;
              })}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
