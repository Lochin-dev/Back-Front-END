import React from "react";
import { Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Company from "../Card/Company";
import Complex from "../Card/Complex";
import Room from "../Card/Room";
import User from "../Card/User";
import Bank from "../Card/Bank";
import Year from "../Card/Year";
import Register from "../pages/Register/index";

const index = () => {
  let location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="company" element={<Company />} />
          <Route path="complex" element={<Complex />} />
          <Route path="room" element={<Room />} />
          <Route path="user" element={<User />} />
          <Route path="bank" element={<Bank />} />
          <Route path="year" element={<Year />} />
        </Routes>
      </div>
    </>
  );
};

export default index;
