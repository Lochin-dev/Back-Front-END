import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./index.css";
const index = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.href = "/";
    }
  });

  const [selectedItemId, setSelectedItemId] = useState("");

  const handleSelectChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  const [dataId, setDataId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1010/company");
      const newData = await response.json();
      setDataId(newData);
    }
    fetchData();
  }, []);

  // ####################################################################

  const postComplex = async (e) => {
    e.preventDefault();

    const selectedItem = dataId.find((item) => item.id === selectedItemId);

    let { complex_title, complex_adres } = e.target;

    let data = await fetch("http://localhost:1010/complex", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        complex_title: complex_title.value,
        complex_adres: complex_adres.value,
        company_id: selectedItem?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    alert(data?.msg);
    complex_title.value = "";
    complex_adres.value = "";
    const response = await fetch("http://localhost:1010/complex");
    const newData = await response.json();
    comsetData(newData);
  };

  const [comdata, comsetData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:1010/complex")
      .then((response) => response.json())
      .then((result) => {
        comsetData(result);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  //  DELETED FUNCTION
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1010/complex/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // ###################################################################################

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
          <div className="complex">
            <div className="complex_wrapper">
              <div className="complex_wrapper_div">
                <form
                  onSubmit={(e) => postComplex(e)}
                  className="complex_from"
                  action="#"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entr Complex name"
                    name="complex_title"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entr Complex adres"
                    name="complex_adres"
                  />

                  <select
                    value={selectedItemId}
                    onChange={handleSelectChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Company name</option>
                    {dataId.length > 0 &&
                      dataId.map((el, id) => {
                        return (
                          <option key={id} value={el.id}>
                            {el.company_title}
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
                      <th scope="col">Complex name</th>
                      <th scope="col">Complex adres</th>
                      <th scope="col" className="d-flex">
                        <span>Edite</span>/<span>Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white fw-normal">
                    {comdata.length > 0 &&
                      comdata.map((el, id) => {
                        return (
                          <tr key={id}>
                            <th scope="row">{id + 1}</th>
                            <td>{el.complex_title}</td>
                            <td>{el.complex_adres}</td>
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
