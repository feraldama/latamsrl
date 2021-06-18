import React from "react";
import { Link } from "react-router-dom";
import "./VehicleCard.css";

const VehicleCard = ({ id, name, plate, image }) => {
  return (
    <div className="container-card">
      <div className="container-card-img">
        <Link to={`/vehicles/${id}`}>
          <img src={image} alt="Aqui va la imagen" width="100%" height="auto" />
        </Link>
      </div>
      <div className="container-card-body">
        <h2 className="card-title">{name}</h2>
        <h2 className="card-text">Chapa: {plate}</h2>
      </div>
    </div>
  );
};
export default VehicleCard;
