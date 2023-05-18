import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./index.css";
const index = () => {
  const [roomdata, roomsetData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1010/user");
      const newData = await response.json();
      roomsetData(newData);
    }
    fetchData();
  }, []);

  //  DELETED FUNCTION
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1010/user/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="asos">
        <div className="asos_wrapper">
          <NavLink to="/company" className="">
            <button type="button" className="btn btn-success fw-bold w-100">
              Compayn
            </button>
          </NavLink>
          <NavLink to="/complex" className="">
            <button type="button" className="btn btn-secondary fw-bold w-100">
              Complex
            </button>
          </NavLink>
          <NavLink to="/room" className="">
            <button
              type="button"
              className="text-white btn btn-warning fw-bold w-100"
            >
              Room
            </button>
          </NavLink>
          <NavLink to="/user" className="">
            <button
              type="button"
              className="text-white btn btn-info fw-bold w-100"
            >
              Users
            </button>
          </NavLink>
          <NavLink to="/bank" className="">
            <button
              type="button"
              className="text-white btn btn-danger fw-bold w-100"
            >
              Bank
            </button>
          </NavLink>

          <NavLink to="/year" className="">
            <button
              type="button"
              className="text-white btn bg-primary fw-bold w-100"
            >
              Year
            </button>
          </NavLink>
        </div>
        <div className="asos_wrap scrolll">
          <div className="user">
            <div className="user_wrapper">
              <div className="user_wrapper_div">
                <h1 className="text-white">Users</h1>
              </div>
              <div className="">
                <table className="table align-middle">
                  <thead className="fw-bold">
                    <tr className="text-white fs-5">
                      <th scope="col">#</th>
                      <th scope="col">User name</th>
                      <th scope="col">User email</th>
                      <th scope="col" className="d-flex">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white fw-normal">
                    {roomdata.length > 0 &&
                      roomdata.map((el, idx) => {
                        return (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{el.user_name}</td>
                            <td>{el.user_email}</td>
                            <td>
                              <button
                                onClick={() => handleDelete(el.id)}
                                type="button"
                                className="btn btn-link btn-sm px-3 fs-5"
                                data-ripple-color="dark"
                              >
                                ❌
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
