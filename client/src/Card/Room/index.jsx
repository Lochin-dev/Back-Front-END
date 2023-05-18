import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./index.css";
const index = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  // ####################################################################

  const handleSelectChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  const postComplex = async (e) => {
    e.preventDefault();

    const selectedItem = dataId.find((item) => item.id === selectedItemId);
    console.log(selectedItem?.id);

    let { room_num, room_price, room_kv } = e.target;

    let data = await fetch("http://localhost:1010/home", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        home_num: room_num.value,
        home_price: room_price.value,
        home_kv: room_kv.value,
        complex_id: selectedItem?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    alert(data?.msg);
    room_num.value = "";
    room_price.value = "";
    room_kv.value = "";
    const response = await fetch("http://localhost:1010/home");
    const newData = await response.json();
    roomsetData(newData);
  };

  const [roomdata, roomsetData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:1010/home")
      .then((response) => response.json())
      .then((result) => {
        roomsetData(result);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [dataId, setDataId] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1010/complex");
      const newData = await response.json();
      setDataId(newData);
    }
    fetchData();
  }, []);
  //  DELETED FUNCTION
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1010/home/${id}`);
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
          <div className="room">
            <div className="room_wrapper">
              <div className="room_wrapper_div">
                <form
                  onSubmit={(e) => postComplex(e)}
                  className="room_from"
                  action="#"
                >
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entr room of number"
                    name="room_num"
                  />

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entr price"
                    name="room_price"
                  />

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Entr house size /kv"
                    name="room_kv"
                  />
                  <select
                    value={selectedItemId}
                    onChange={handleSelectChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Complex name</option>
                    {dataId.length > 0 &&
                      dataId.map((el, id) => {
                        return (
                          <option key={id} value={el.id}>
                            {el.complex_title}
                          </option>
                        );
                      })}
                  </select>

                  <button className="btn bg-info text-white fw-bold">
                    Create
                  </button>
                </form>
              </div>
              <div className="scrolll">
                <table className="table align-middle">
                  <thead className="fw-bold">
                    <tr className="text-white fs-5">
                      <th scope="col">#</th>
                      <th scope="col">Number of rooms</th>
                      <th scope="col">House price</th>
                      <th scope="col">House size</th>
                      <th scope="col" className="d-flex">
                        <span>Edite</span>/<th>Delete</th>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white fw-normal">
                    {roomdata.length > 0 &&
                      roomdata.map((el, idx) => {
                        return (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{el.home_num}</td>
                            <td>{el.home_price}</td>
                            <td>{el.home_kv} kv</td>
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
