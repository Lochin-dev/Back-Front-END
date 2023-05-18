import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "./index.css";
const index = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.href = "/";
    }
  });

  // ===================================

  const [formData, setFormData] = useState({
    textInput: "",
    fileInput: null,
  });

  const handleInputChange = async (event) => {
    const { name, value, type, files } = event.target;
    const updatedFormData = { ...formData };

    // Matn kiritish inputining qiymatini o'zgartirish
    if (type === "text") {
      updatedFormData.textInput = value;
    }

    // Fayl tanlash inputining qiymatini o'zgartirish
    if (type === "file") {
      updatedFormData.fileInput = files[0];
    }

    setFormData(updatedFormData);
  };
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form submit qilganda ishlatiladigan ma'lumotlar
    const { textInput, fileInput } = formData;
    const data1 = new FormData();
    data1.append("file", fileInput);
    data1.append("upload_preset", "test_home_image");
    const respons = await fetch(
      "https://api.cloudinary.com/v1_1/dm16fzmqd/image/upload",
      {
        method: "POST",
        body: data1,
      }
    );
    const data2 = await respons.json();
    let img = data2.secure_url;
    console.log(img);
    // +++++++++++++++++++++++++++++++++++++++
    console.log(textInput);
    let data = await fetch("http://localhost:1010/company", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        company_title: textInput,
        company_img: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
    alert(data?.msg);

    const response = await fetch("http://localhost:1010/company");
    const newData = await response.json();
    setData(newData);
    setFormData({
      textInput: "",
      fileInput: null,
    });
  };
  // ===================================

  const fetchData = () => {
    fetch("http://localhost:1010/company")
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
      await axios.delete(`http://localhost:1010/company/${id}`);
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
          <div className="company">
            <div className="company_wrapper">
              <div className="company_wrapper_div">
                <form
                  onSubmit={handleSubmit}
                  className="company_from"
                  action="#"
                >
                  <input
                    type="text"
                    name="textInput"
                    value={formData.textInput}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Entr Company name"
                  />

                  <input
                    type="file"
                    name="fileInput"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Company img"
                  />
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
                      <th scope="col">Company name</th>
                      <th scope="col">Image</th>
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
                            <td>{el.company_title}</td>
                            <td>
                              <img
                                style={{ borderRadius: "50%" }}
                                width={50}
                                src={el.company_img}
                                alt="company"
                              />
                            </td>
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
