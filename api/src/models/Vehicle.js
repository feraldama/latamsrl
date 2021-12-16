const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("vehicle", {
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "Vehiculo sin descripcion",
    },
    // wheel: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // stock: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    image: {
      type: DataTypes.STRING,
      defaultValue: "http://181.127.189.247:8081/Vehiculos/camionDefecto.png",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
