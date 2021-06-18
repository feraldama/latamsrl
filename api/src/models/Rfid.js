const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("rfid", {
    rfidNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    measure: {
      type: DataTypes.ENUM("295", "315"),
      allowNull: false,
      defaultValue: "295",
    },
    type: {
      type: DataTypes.ENUM("Lisa", "Traccion"),
      allowNull: false,
      defaultValue: "Lisa",
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recapNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
