import React from "react";
import { Route } from "react-router-dom";
import Nav from "./componentes/Nav.jsx";
import FilterCategories from "./componentes/FilterCategories.jsx";
import Catalogo from "./componentes/Catalogo.jsx";
import Vehicle from "./componentes/Vehicle.jsx";
import FilterVehicles from "./componentes/FilterVehicles";
import Searched from "./componentes/SearchedVehicles.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Nav onSearch="onSearch" />} />
      <Route path="/vehicles" render={() => <Nav onSearch="onSearch" />} />
      <Route exact path="/" component={FilterCategories} />
      <Route exact path="/" component={Catalogo} />
      <Route exact path="/vehicles/:id" component={Vehicle} />
      <Route path="/vehicles/category/:id" component={FilterVehicles} />
      <Route path="/vehicles/search/:id" component={Searched} />
    </div>
  );
}

export default App;
