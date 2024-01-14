import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "../Component/Login";
import Signup from "../Component/Signup";
import Notfound from "../Component/Page_not_found";
import Main from "../Component/Main";
export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userinfo");
    if (isUserLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (navigate) => {
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace="true" />
              )
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <Main /> : <Navigate to="/login" replace="true" />
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
