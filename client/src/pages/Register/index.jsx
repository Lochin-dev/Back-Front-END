import React, { useState } from "react";
import "./index.css";

const index = () => {
  const [Value, setValue] = useState({});

  const onValue = (e) => {
    setValue(e.target.value);
  };
  const selectedValue = Value;
  console.log(selectedValue);

  const getUserInfo = async (e) => {
    e.preventDefault();
    let { user_name, user_email, user_password } = e.target;
    if (selectedValue === "Admin") {
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
      alert(data?.msg);
      user_name.value = "";
      user_email.value = "";
      user_password.value = "";
      if (data?.token) {
        localStorage.setItem("token", data.token)((location.href = "/company"));
      }
    } else {
      let data = await fetch("http://localhost:1010/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          user_name: user_name.value,
          user_email: user_email.value,
          user_password: user_password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => data);

      alert(data?.msg);
      user_name.value = "";
      user_email.value = "";
      user_password.value = "";
      if (data?.token) {
        localStorage.setItem("token", data.token)((location.href = "/home"));
      }
    }
  };

  return (
    <div className="bg-secondary vh-100 register">
      <div className="container d-flex justify-content-center">
        <div className="login shadow-lg p-5 mb-5 bg-body rounded">
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
            <select
              className="select_reg form-select text-white bg-primary w-50 mb-4"
              aria-label="Default select example"
              onChange={onValue}
            >
              <option className="select_option" value={"User"}>
                User
              </option>
              <option className="select_option" value={"Admin"}>
                Admin
              </option>
            </select>

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
