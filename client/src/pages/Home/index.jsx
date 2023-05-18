import React, { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

const index = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.href = "/";
    }
  });

  const [companydata, companysetData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:1010/company");
      const newData = await response.json();
      companysetData(newData);
    }
    fetchData();
  }, []);

  //  api_company
  const [complexdata, complexsetData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    fetchData(selectedId);
  }, [selectedId]);

  const fetchData = async (selectedId) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/api_company/${selectedId}`
      );
      complexsetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedId(selectedValue);
  };

  // API_Bank
  const [bankdata, banksetData] = useState([]);
  useEffect(() => {
    fetchDataC(selectedId);
  }, [selectedId]);

  const fetchDataC = async (selectedId) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/api_bank/${selectedId}`
      );
      banksetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //    GET ONE  BANK
  const [onedataB, onesetDataB] = useState([]);
  const [selectedIdBank, setSelectedIdBank] = useState(null);
  useEffect(() => {
    fetchDataOneB(selectedIdBank);
  }, [selectedIdBank]);

  const fetchDataOneB = async (selectedIdBank) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/bank/${selectedIdBank}`
      );
      onesetDataB(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeBank = (event) => {
    const selectedValue = event.target.value;
    setSelectedIdBank(selectedValue);
  };

  //  GET ONE COMPANY
  const [onedata, onesetData] = useState([]);
  useEffect(() => {
    fetchDataOne(selectedId);
  }, [selectedId]);

  const fetchDataOne = async (selectedId) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/company/${selectedId}`
      );
      onesetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // API_Cpmplex
  const [homedata, homesetData] = useState([]);
  const [selectedIdCom, setSelectedIdCom] = useState(null);
  useEffect(() => {
    fetchDataCom(selectedIdCom);
  }, [selectedIdCom]);

  const fetchDataCom = async (selectedIdCom) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/api_complex/${selectedIdCom}`
      );
      homesetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCom = (event) => {
    const selectedValue = event.target.value;
    setSelectedIdCom(selectedValue);
  };

  //  GET ONE COMPLEX
  const [onedataC, onesetDataC] = useState([]);
  useEffect(() => {
    fetchDataOneC(selectedIdCom);
  }, [selectedIdCom]);
  const fetchDataOneC = async (selectedIdCom) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/complex/${selectedIdCom}`
      );
      onesetDataC(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // API_Home
  const [yeardata, yearsetData] = useState([]);
  const [selectedIdHom, setSelectedIdHom] = useState(null);
  useEffect(() => {
    fetchDataHom(selectedIdHom);
  }, [selectedIdHom]);

  const fetchDataHom = async (selectedIdHom) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/api_home/${selectedIdHom}`
      );
      yearsetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeHom = (event) => {
    const selectedValue = event.target.value;
    setSelectedIdHom(selectedValue);
  };

  //  GET ONE HOME
  const [onedataH, onesetDataH] = useState([]);
  useEffect(() => {
    fetchDataOneH(selectedIdHom);
  }, [selectedIdHom]);
  const fetchDataOneH = async (selectedIdHom) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/home/${selectedIdHom}`
      );
      onesetDataH(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //    GET ONE  YEAR
  const [onedataY, onesetDataY] = useState([]);
  const [selectedIdYear, setSelectedIdYear] = useState(null);
  useEffect(() => {
    fetchDataOneY(selectedIdYear);
  }, [selectedIdYear]);

  const fetchDataOneY = async (selectedIdYear) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/year/${selectedIdYear}`
      );
      onesetDataY(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // API shoppings #########################################

  const [shopdata, shopsetData] = useState([]);
  const [selectedIdShop, setSelectedIdShop] = useState(null);
  useEffect(() => {
    fetchDataShop(selectedIdShop);
  }, [selectedIdShop]);

  const fetchDataShop = async (selectedIdShop) => {
    try {
      const response = await axios.get(
        `http://localhost:1010/shopping/${selectedIdShop}`
      );
      shopsetData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeShop = (event) => {
    const selectedValue = event.target.value;
    setSelectedIdShop(selectedValue);
    const selectedValueY = event.target.value;
    setSelectedIdYear(selectedValueY);
  };

  return (
    <div className="">
      <div className="container home">
        <div className="home_wrapper shadow-lg p-3 mb-5 bg-secondary rounded">
          <div className="home_wrapper_wrap">
            <p className="home_wrapper_wrap_text ">Bulding company:</p>
            <select
              onChange={handleChange}
              className="form-select text-dark "
              aria-label="Default select example"
            >
              <option>Tanlang</option>
              {companydata.length > 0 &&
                companydata.map((el, id) => {
                  return (
                    <option key={id} value={el.id}>
                      {el.company_title}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="home_wrapper_wrap">
            <p className="home_wrapper_wrap_text ">Complex:</p>
            <select
              onChange={handleChangeCom}
              className="form-select text-dark"
              aria-label="Default select example"
            >
              <option value="">Complex name</option>
              {complexdata.length > 0 &&
                complexdata.map((el, id) => {
                  return (
                    <option key={id} value={el.id}>
                      {el.complex_title}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="home_wrapper_wrap">
            <p className="home_wrapper_wrap_text ">Numben of rooms:</p>
            <select
              onChange={handleChangeHom}
              className="form-select text-dark"
              aria-label="Default select example"
            >
              <option value="">Number</option>
              {homedata.length > 0 &&
                homedata.map((el, id) => {
                  return (
                    <option key={id} value={el.id}>
                      {el.home_num}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="home_wrapper_wrap">
            <p className="home_wrapper_wrap_text ">Bank:</p>
            <select
              onChange={handleChangeBank}
              className="form-select text-dark"
              aria-label="Default select example"
            >
              <option value="">Bank name</option>
              {bankdata.length > 0 &&
                bankdata.map((el, id) => {
                  return (
                    <option key={id} value={el.id}>
                      {el.bank_title}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="home_wrapper_wrap">
            <p className="home_wrapper_wrap_text ">Mortgege duration:</p>
            <select
              onChange={handleChangeShop}
              className="form-select text-dark"
              aria-label="Default select example"
            >
              <option value="">Years</option>
              {yeardata.length > 0 &&
                yeardata.map((el, id) => {
                  return (
                    <option key={id} value={el.id}>
                      {el.year_num}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <h1>Assalomu alaykum</h1>
        <div className="home_wrapp d-flex justify-content-between align-items-sen">
          <div className="home_div ">
            {onedata.length > 0 &&
              onedata.map((el, id) => {
                return (
                  <h1 key={id} className="home_div_title">
                    Kompanya: {el.company_title}
                  </h1>
                );
              })}

            {onedataC.length > 0 &&
              onedataC.map((el, id) => {
                return (
                  <div key={id} className="">
                    <h2 className="home_div_com">
                      Complex: {el.complex_title}
                    </h2>
                    <p className="home_div_adres fs-4">
                      Adres: {el.complex_adres}
                    </p>
                  </div>
                );
              })}
            {onedataH.length > 0 &&
              onedataH.map((el, id) => {
                return (
                  <div key={id} className="">
                    <h3 className="home_div_room">Hona soni: {el.home_num}</h3>
                    <p className="home_div_text fs-4">
                      {el.home_kv} Metr kvadrat
                    </p>
                    <h3 className="home_div_room">
                      Uy narxi : {el.home_price}
                    </h3>
                  </div>
                );
              })}
          </div>
          {onedataB.length > 0 &&
            onedataB.map((el, id) => {
              return (
                <div key={id} className="home_div">
                  <h1 className="home_div_title">Bank: {el.bank_title}</h1>
                  <h2 className="home_div_sum">Bank sum: {el.bank_price}</h2>
                  {onedataY.length > 0 &&
                    onedataY.map((el, id) => {
                      return (
                        <h3 key={id} className="home_div_yil">
                          To'lash muddati: {el.year_num} yil
                        </h3>
                      );
                    })}

                  <h2 className="home_div_foiz">Boshlang'ich to'lov: 17%</h2>
                </div>
              );
            })}

          {shopdata.length > 0 &&
            shopdata.map((el, id) => {
              return (
                <div className="home_div" key={id}>
                  <h1 className="home_div_title">Calculator</h1>
                  <p className="qolgan fs-3">
                    Boshlang'ich to'lov: {el.bosh_tolov}
                  </p>
                  <p className="qolgan fs-3">Qolgam summasi: {el.qolgani}</p>
                  <h3 className="home_div_room">
                    Oylik to'lov: {el.oylik_tolov}
                  </h3>
                  <p className="home_div_text fs-4">
                    Bank haqqi: {el.bank_haqi}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default index;
