import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteVehicle,
  getVehicle,
  postVehicle,
  putVehicle,
} from "../redux/actions/actionsVehicle";
import { getCategory } from "../redux/actions/actionsCategory";
import axios from "axios";
import Swal from "sweetalert2";

const CrudVehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.reducerVehicle.vehicles);

  // console.log("vehicles: ", vehicles);

  useEffect(() => {
    dispatch(getVehicle());
  }, [dispatch]);

  const categories = useSelector((state) => state.reducerCategory.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  //const [categoria, setCategoria] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [imageVehicle, setImageVehicle] = useState(null);

  const [vehicleSeleccionado, setVehicleSeleccionado] = useState({
    id: "",
    plate: "",
    name: "",
    description: "",
    images: "",
    active: false,
    categories: "",
    categoryId: "",
  });

  // console.log("vehicleSeleccionado: ", vehicleSeleccionado);

  const seleccionarVehicle = (elemento, caso) => {
    setVehicleSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name == "image2") {
      setImageVehicle(e.target.files[0]);
      console.log("e HandleChange: ", e.target);
      console.log("imageVehicle: ", imageVehicle);
      console.log("vehicleSeleccionado: ", vehicleSeleccionado);
    }
    if (name === "active" && value === "true") {
      value = true;
    } else if (name === "active" && value === "false") {
      value = false;
    }
    if (imageVehicle) {
      setVehicleSeleccionado((prevState) => ({
        ...prevState,
        ["image"]: `http://192.168.0.27:8887/${imageVehicle.name}`,
      }));
    }
    setVehicleSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("vehicelSelec: ", e.target);
  };

  const editar = async () => {
    if (imageVehicle) {
      if (imageVehicle.type === "image/jpeg") {
        // Create an object of formData
        const formData = new FormData();

        // console.log("entra editar imageVehicle: ", imageVehicle);
        // console.log("entra editar imageVehicleName: ", imageVehicle.name);
        // Update the formData object
        formData.append("myFile", imageVehicle, imageVehicle.name);

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // console.log("formData: ", formData);
        // axios.post("http://192.168.0.27:3001/rfids/xls", formData);
        axios.post("http://192.168.0.27:3001/vehicles/image", formData);
        // await Swal.fire("Realizado!", "Imagen Insertada con Éxito!", "success");
        // window.location.reload(true);
      } else {
        Swal.fire("Alerta!", "Debe seleccionar un archivo IMAGEN!", "error");
      }
    }

    // if (imageVehicle) {
    //   console.log("entra editar imageVehicle: ", imageVehicle);
    //   // Create an object of formData
    //   const formData = new FormData();

    //   // Update the formData object
    //   console.log("imageVehicle.name: ", imageVehicle.name);
    //   formData.append("myFile", imageVehicle, imageVehicle.name);

    //   // Details of the uploaded file
    //   // console.log(imageVehicle);

    //   // Request made to the backend api
    //   // Send formData object
    //   console.log("formData: ", formData);
    //   axios.post("http://192.168.0.27:3001/vehicles/image", formData);
    // }

    dispatch(putVehicle(vehicleSeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    dispatch(deleteVehicle(vehicleSeleccionado.id));
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setVehicleSeleccionado(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    dispatch(postVehicle(vehicleSeleccionado));
    setModalInsertar(false);
  };

  return (
    <div className="App">
      <h2>Lista de Vehiculos</h2>
      <br />
      <button className="btn btn-success" onClick={() => abrirModalInsertar()}>
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Patente</th>
            <th>Imagen</th>
            <th>Categoria</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.name}</td>
              <td>{elemento.description}</td>
              <td>{elemento.plate}</td>
              {/* <td>{elemento.image}</td> */}
              <td width="30%">
                <img
                  src={elemento.image}
                  alt="Aqui va la imagen"
                  width="40%"
                  height="auto"
                />
              </td>
              <td>
                <span>{elemento.category ? elemento.category.name : ""}</span>
              </td>
              <td>{elemento.active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarVehicle(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarVehicle(elemento, "Eliminar")}
                >
                  Eliminar
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Vehiculo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={vehicleSeleccionado && vehicleSeleccionado.id}
            />
            <br />

            <label>Vehiculo</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={vehicleSeleccionado && vehicleSeleccionado.name}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={vehicleSeleccionado && vehicleSeleccionado.description}
              onChange={handleChange}
            />
            <br />

            <label>Patente</label>
            <input
              className="form-control"
              type="text"
              name="plate"
              value={vehicleSeleccionado && vehicleSeleccionado.plate}
              onChange={handleChange}
            />
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={vehicleSeleccionado && vehicleSeleccionado.image}
              onChange={handleChange}
            />
            <input name="image2" type="file" onChange={handleChange} />
            {/* <button onClick={this.onFileUpload}>Subir!</button> */}
            <br />

            <label>Categoria</label>
            <select
              name="categoryId"
              onChange={handleChange}
              value={vehicleSeleccionado && vehicleSeleccionado.categoryId}
            >
              <option>Selecciona una categoría...</option>
              {categories.map((cat) => (
                <option type="checkbox" name="categoryId" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <br />

            <label>Activo</label>
            <select
              name="active"
              value={vehicleSeleccionado && vehicleSeleccionado.active}
              onChange={handleChange}
            >
              <option value="">Seleccione disponibilidad...</option>
              <option value={new Boolean(1)}>Activo</option>
              <option value={new Boolean(0)}>Inactivo</option>
            </select>

            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿ Estás Seguro que deseas eliminar el vehiculo{' "'}
          {vehicleSeleccionado && vehicleSeleccionado.name}
          {'" ?'}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Vehiculo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Vehiculo</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={vehicleSeleccionado ? vehicleSeleccionado.name : ""}
              onChange={handleChange}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={vehicleSeleccionado ? vehicleSeleccionado.description : ""}
              onChange={handleChange}
            />
            <br />

            <label>Patente</label>
            <input
              className="form-control"
              type="text"
              name="plate"
              value={vehicleSeleccionado ? vehicleSeleccionado.plate : ""}
              onChange={handleChange}
            />
            <br />

            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={vehicleSeleccionado ? vehicleSeleccionado.image : ""}
              onChange={handleChange}
            />
            <br />

            <label>Categoria</label>
            <select
              name="categoryId"
              value={vehicleSeleccionado ? vehicleSeleccionado.categoryId : ""}
              onChange={handleChange}
            >
              <option>Selecciona una categoría...</option>
              {categories.map((cat) => (
                <option type="checkbox" name="categoryId" value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default CrudVehicles;
