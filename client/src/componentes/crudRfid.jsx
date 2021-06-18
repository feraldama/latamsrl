import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRfid,
  getRfid,
  postRfid,
  putRfid,
} from "../redux/actions/actionsRfid";
import { getVehicle } from "../redux/actions/actionsVehicle";

const CrudRfid = () => {
  const dispatch = useDispatch();
  const rfids = useSelector((state) => state.reducerRfid.rfids);

  console.log("rfids: ", rfids);

  useEffect(() => {
    dispatch(getRfid());
  }, [dispatch]);

  const vehicles = useSelector((state) => state.reducerVehicle.vehicles);

  useEffect(() => {
    dispatch(getVehicle());
  }, [dispatch]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [rfidSeleccionado, setRfidSeleccionado] = useState({
    id: "",
    rfidNumber: "",
    brand: "",
    invoiceNumber: "",
    invoiceDate: "",
    company: false,
    measure: "",
    type: "",
    location: "",
    recapNumber: false,
    vehicleId: "",
    active: "",
  });

  console.log("rfidSeleccionado: ", rfidSeleccionado);

  const seleccionarRfid = (elemento, caso) => {
    setRfidSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name === "active" && value === "true") {
      value = true;
    } else if (name === "active" && value === "false") {
      value = false;
    }
    setRfidSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = () => {
    dispatch(putRfid(rfidSeleccionado));
    setModalEditar(false);
  };

  const eliminar = () => {
    dispatch(deleteRfid(rfidSeleccionado.id));
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setRfidSeleccionado(null);
    setModalInsertar(true);
  };

  const insertar = () => {
    dispatch(postRfid(rfidSeleccionado));
    setModalInsertar(false);
  };

  return (
    <div className="App">
      <h2>Lista de RFIDs</h2>
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
            <th>RFID</th>
            <th>Marca</th>
            <th>Factura Nro.</th>
            <th>Factura Fecha</th>
            <th>Compañia</th>
            <th>Medida</th>
            <th>Tipo</th>
            <th>Ubicación</th>
            <th>Nro. Recapado</th>
            <th>Vehiculo Chapa</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {rfids.map((elemento) => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.rfidNumber}</td>
              <td>{elemento.brand}</td>
              <td>{elemento.invoiceNumber}</td>
              <td>{elemento.invoiceDate}</td>
              <td>{elemento.company}</td>
              <td>{elemento.measure}</td>
              <td>{elemento.type}</td>
              <td>{elemento.location}</td>
              <td>{elemento.recapNumber}</td>
              <td>
                <span>{elemento.vehicle ? elemento.vehicle.plate : ""}</span>
              </td>
              <td>{elemento.active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarRfid(elemento, "Editar")}
                >
                  Editar
                </button>{" "}
                {"   "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarRfid(elemento, "Eliminar")}
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
            <h3>Editar RFID</h3>
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
              value={rfidSeleccionado && rfidSeleccionado.id}
            />
            <br />

            <label>RFID</label>
            <input
              className="form-control"
              type="text"
              name="rfidNumber"
              value={rfidSeleccionado && rfidSeleccionado.rfidNumber}
              onChange={handleChange}
            />
            <br />

            <label>Marca</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={rfidSeleccionado && rfidSeleccionado.brand}
              onChange={handleChange}
            />
            <br />

            <label>Factura Nro.</label>
            <input
              className="form-control"
              type="text"
              name="invoiceNumber"
              value={rfidSeleccionado && rfidSeleccionado.invoiceNumber}
              onChange={handleChange}
            />
            <br />

            <label>Factura Fecha</label>
            <input
              className="form-control"
              type="date"
              name="invoiceDate"
              value={rfidSeleccionado && rfidSeleccionado.invoiceDate}
              onChange={handleChange}
            />
            <br />

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={rfidSeleccionado && rfidSeleccionado.company}
              onChange={handleChange}
            />
            <br />

            <label>Medida</label>
            <select
              name="measure"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.measure}
            >
              <option>Selecciona una medida...</option>
              <option type="checkbox" name="measure" value="295">
                295
              </option>
              <option type="checkbox" name="measure" value="315">
                315
              </option>
            </select>
            <br />

            <label>Tipo</label>
            <select
              name="type"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.type}
            >
              <option>Selecciona un tipo...</option>
              <option type="checkbox" name="type" value="Lisa">
                Lisa
              </option>
              <option type="checkbox" name="type" value="Traccion">
                Traccion
              </option>
            </select>
            <br />

            <label>Ubicación</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={rfidSeleccionado && rfidSeleccionado.location}
              onChange={handleChange}
            />
            <br />

            <label>Nro. Recapado</label>
            <input
              className="form-control"
              type="text"
              name="recapNumber"
              value={rfidSeleccionado && rfidSeleccionado.recapNumber}
              onChange={handleChange}
            />
            <br />

            <label>Vehiculo Chapa</label>
            <select
              name="vehicleId"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.vehicleId}
            >
              <option>Selecciona una chapa...</option>
              {vehicles.map((cat) => (
                <option type="checkbox" name="vehicleId" value={cat.id}>
                  {cat.plate}
                </option>
              ))}
            </select>
            <br />

            <label>Activo</label>
            <select
              name="active"
              value={rfidSeleccionado && rfidSeleccionado.active}
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
          ¿ Estás Seguro que deseas eliminar el RFID{' "'}
          {rfidSeleccionado && rfidSeleccionado.rfidNumber}
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
            <h3>Insertar RFID</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>RFID</label>
            <input
              className="form-control"
              type="text"
              name="rfidNumber"
              value={rfidSeleccionado ? rfidSeleccionado.rfidNumber : ""}
              onChange={handleChange}
            />
            <br />

            <label>Marca</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={rfidSeleccionado && rfidSeleccionado.brand}
              onChange={handleChange}
            />
            <br />

            <label>Factura Nro.</label>
            <input
              className="form-control"
              type="text"
              name="invoiceNumber"
              value={rfidSeleccionado && rfidSeleccionado.invoiceNumber}
              onChange={handleChange}
            />
            <br />

            <label>Factura Fecha</label>
            <input
              className="form-control"
              type="date"
              name="invoiceDate"
              value={rfidSeleccionado && rfidSeleccionado.invoiceDate}
              onChange={handleChange}
            />
            <br />

            <label>Compañia</label>
            <input
              className="form-control"
              type="text"
              name="company"
              value={rfidSeleccionado && rfidSeleccionado.company}
              onChange={handleChange}
            />
            <br />

            <label>Medida</label>
            <select
              name="measure"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.measure}
            >
              <option>Selecciona una medida...</option>
              <option type="checkbox" name="measure" value="295">
                295
              </option>
              <option type="checkbox" name="measure" value="315">
                315
              </option>
            </select>
            <br />

            <label>Tipo</label>
            <select
              name="type"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.type}
            >
              <option>Selecciona un tipo...</option>
              <option type="checkbox" name="type" value="Lisa">
                Lisa
              </option>
              <option type="checkbox" name="type" value="Traccion">
                Traccion
              </option>
            </select>
            <br />

            <label>Ubicación</label>
            <input
              className="form-control"
              type="text"
              name="location"
              value={rfidSeleccionado && rfidSeleccionado.location}
              onChange={handleChange}
            />
            <br />

            <label>Nro. Recapado</label>
            <input
              className="form-control"
              type="text"
              name="recapNumber"
              value={rfidSeleccionado && rfidSeleccionado.recapNumber}
              onChange={handleChange}
            />
            <br />

            <label>Vehiculo Chapa</label>
            <select
              name="vehicleId"
              onChange={handleChange}
              value={rfidSeleccionado && rfidSeleccionado.vehicleId}
            >
              <option>Selecciona una chapa...</option>
              {vehicles.map((cat) => (
                <option type="checkbox" name="vehicleId" value={cat.id}>
                  {cat.plate}
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
export default CrudRfid;
