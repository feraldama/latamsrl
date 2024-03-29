import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogo.css";
import VehicleCard from "./VehicleCard.jsx";

const Catalogo = () => {
  useEffect(() => {
    axios
      .get("http://181.127.189.247:3001/vehicles/actives")
      .then((data) => setData(data.data));
  }, []);
  const [data, setData] = useState([]);
  return (
    <div className="container">
      {data.map((t) => (
        <VehicleCard id={t.id} name={t.name} plate={t.plate} image={t.image} />
      ))}
    </div>
  );
};
export default Catalogo;
