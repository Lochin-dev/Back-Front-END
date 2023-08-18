import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "./index.css";
const index = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const handleSelectChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  const [dataId, setDataId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1010/home");
      const newData = await response.json();
      setDataId(newData);
    }
    fetchData();
  }, []);

  // ####################################################################
  const postYear = async (e) => {
    e.preventDefault();

    const selectedItem = dataId.find((item) => item.id === selectedItemId);

    let { year_num } = e.target;
    let data = await fetch("http://localhost:1010/year", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        year_num: year_num.value,
        home_id: selectedItem?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    alert(data?.msg);
    year_num.value = "";

    const response = await fetch("http://localhost:1010/year");
    const newData = await response.json();
    setData(newData);
  };
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:1010/year")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1010/year/${id}`);
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

        <div className="asos_wrap">
          <div className="year">
            <div className="year_wrapper">
              <div className="year_wrapper_div">
                <form
                  onSubmit={(e) => {
                    postYear(e);
                  }}
                  className="year_from"
                  action="#"
                >
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entr Year name"
                    name="year_num"
                  />

                  <select
                    value={selectedItemId}
                    onChange={handleSelectChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Xona soni</option>
                    {dataId.length > 0 &&
                      dataId.map((el, id) => {
                        return (
                          <option key={id} value={el.id}>
                            {el.home_num}
                          </option>
                        );
                      })}
                  </select>
                  <button
                    type="submit"
                    className="btn bg-info text-white fw-bold"
                  >
                    Create
                  </button>
                </form>
              </div>

              <div className="scrolll">
                <table className="table align-middle">
                  <thead className="fw-bold">
                    <tr className="text-white fs-5">
                      <th scope="col">#</th>
                      <th scope="col">Year name</th>
                      <th scope="col">Year ID</th>
                      <th scope="col" className="d-flex">
                        <span>Edite</span>/<span>Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white fw-normal">
                    {data.length > 0 &&
                      data.map((el, id) => {
                        return (
                          <tr name="tr_data" key={id}>
                            <th scope="row" value={el.id}>
                              {id + 1}
                            </th>
                            <td>{el.year_num}</td>
                            <td>{el.id}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-link btn-sm px-3"
                                data-ripple-color="dark"
                              >
                                <i className="fas fa-pencil-square fs-4 text-info"></i>
                              </button>

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
