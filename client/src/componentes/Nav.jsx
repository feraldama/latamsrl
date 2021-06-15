import React from "react";
import Logo from "../img/logosrl.webp";
import SearchBar from "./SearchBar.jsx";
import "./Nav.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="nav-container">
      <div className="img-container">
        <div className="nolink">
          <Link to="/">
            <div>
              <img
                id="logoLATAM"
                src={Logo}
                width="160"
                height="65"
                alt="Logo LATAM"
              />
              <h1 className="titulo">
                <strong>Latino</strong>América
              </h1>
            </div>
          </Link>
        </div>{" "}
      </div>
      <div className="search-bar">
        <SearchBar handleChange={(e) => console.log(e.target.value)} />
      </div>
    </nav>
  );
};