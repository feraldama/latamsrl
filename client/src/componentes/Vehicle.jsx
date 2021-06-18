import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Vehicle.css";

const Vehicle = () => {
  let { id } = useParams();
  var url = "http://localhost:3001";
  useEffect(() => {
    axios.get(`${url}/vehicles/${id}`).then((data) => setData(data.data));
  }, []);
  useEffect(() => {
    axios.get(`${url}/rfids/vehicle/${id}`).then((rfid) => setRfid(rfid.data));
  }, []);
  const [data, setData] = useState([]);
  const [rfid, setRfid] = useState([]);
  console.log("rfid: ", rfid);
  return (
    <div className="container-prod">
      <div className="container-product">
        <div className="container-img">
          <img src={data.image} alt="Aqui va la imagen" />
        </div>
        <div className="container-data">
          <h1>{data.name}</h1>
          <h2>Chapa: {data.plate}</h2>
          <h3>{data.description}.</h3>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>RFID</th>
                <th>Tipo</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {rfid.rfids
                ? rfid.rfids.map((elemento) => (
                    <tr>
                      <td>{elemento.rfidNumber}</td>
                      <td>{elemento.type}</td>
                      <td>{elemento.location}</td>
                    </tr>
                  ))
                : "Sin ruedas asignadas"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Vehicle;
