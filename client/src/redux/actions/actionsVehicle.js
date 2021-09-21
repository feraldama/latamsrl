import axios from "axios";

const url = "http://192.168.0.27:3001";

export const getVehicle = () => (dispatch) => {
  axios.get(`${url}/vehicles`).then((data) => {
    dispatch({
      type: "GET_VEHICLE",
      payload: data.data,
    });
  });
};

export const postVehicle = (vehicleSeleccionado) => (dispatch) => {
  axios
    .post(`${url}/vehicles`, {
      name: vehicleSeleccionado.name,
      description: vehicleSeleccionado.description,
      plate: vehicleSeleccionado.plate,
      image: vehicleSeleccionado.image,
      active: vehicleSeleccionado.active,
      categories: vehicleSeleccionado.categoryId,
    })
    .then((data) => {
      dispatch({
        type: "POST_VEHICLE",
        payload: data.data,
      });
    });
};

export const putVehicle = (vehicleSeleccionado) => (dispatch) => {
  // console.log("ACTIONS vehicleSeleccionado: ", vehicleSeleccionado);
  axios
    .put(`${url}/vehicles/${vehicleSeleccionado.id}`, {
      name: vehicleSeleccionado.name,
      description: vehicleSeleccionado.description,
      plate: vehicleSeleccionado.plate,
      image: vehicleSeleccionado.image,
      active: vehicleSeleccionado.active,
      categoryId: vehicleSeleccionado.categoryId,
    })
    .then((data) => {
      dispatch({
        type: "PUT_VEHICLE",
        payload: data.data,
      });
    });
};

export const deleteVehicle = (id) => (dispatch) => {
  axios.delete(`${url}/vehicles/${id}`).then((data) => {
    dispatch({
      type: "DELETE_VEHICLE",
      payload: data.data,
    });
  });
};
