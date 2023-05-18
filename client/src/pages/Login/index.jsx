import React, { useState } from "react";
import "./login.css";

const index = () => {
  const getUserInfo = async (e) => {
    e.preventDefault();
    let { user_name, user_email, user_password } = e.target;
    let data = await fetch("http://localhost:1010/postadmin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        admin_name: user_name.value,
        admin_email: user_email.value,
        admin_password: user_password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    console.log(data?.msg);
    alert(data?.msg);
    user_name.value = "";
    user_email.value = "";
    user_password.value = "";
    if (data?.token) {
      localStorage.setItem("token", data.token)((location.href = "/company"));
    }
  };
  return (
    <div className="bg-secondary registerr">
      <div className="container d-flex justify-content-center">
        <div className="loginn shadow-lg p-5 mb-5 bg-body rounded">
          <form className="w-50 " onSubmit={(e) => getUserInfo(e)}>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example1"
                className="form-control bg-light"
                placeholder="User name"
                name="user_name"
              />
              <label className="" htmlFor="form2Example1">
                User name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example1"
                className="form-control bg-light"
                placeholder="Email address"
                name="user_email"
              />
              <label className="" htmlFor="form2Example1">
                Email address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example2"
                className="form-control bg-light"
                placeholder="Password"
                name="user_password"
              />
              <label className="" htmlFor="form2Example2">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 text-senter text-center my-0 mx-auto"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
