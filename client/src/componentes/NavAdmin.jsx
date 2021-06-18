import React from "react";
import Logo from "../img/logosrl.webp";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";
import { Link } from "react-router-dom";

const NavAdmin = () => {
  return (
    <nav className="nav-container">
      <div className="img-container">
        <div className="nolink">
          <Link to="/">
            <span className="navbar-brand">
              <img id="logoHenry" src={Logo} width="160" height="65" alt="" />
              <h1 className="titulo">
                <strong>Latino</strong>América
              </h1>
            </span>
          </Link>
        </div>{" "}
      </div>
      <Link to="/admin/categories">
        <button class="button-cart2">Lista de Categorias</button>
      </Link>
      <Link to="/admin/vehicles">
        <button class="button-cart2">Lista de Vehiculos</button>
      </Link>
      <Link to="/admin/rfids">
        <button class="button-cart2">Lista de RFIDs</button>
      </Link>
    </nav>
  );
};

export default NavAdmin;
