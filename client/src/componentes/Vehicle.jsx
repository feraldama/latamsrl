import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Vehicle.css";

export default () => {
  let { id } = useParams();
  var url = "http://localhost:3001";
  useEffect(() => {
    axios.get(`${url}/vehicles/${id}`).then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);

  return (
    <div className="container-prod">
      <div className="container-product">
        <div className="container-img">
          <img src={data.image} alt="Aqui va la imagen" />
        </div>
        <div className="container-data">
          <h1>{data.name}</h1>
          <h2>Chapa: {data.plate}</h2>
          <p>{data.description}.</p>
        </div>
      </div>
    </div>
  );
};
