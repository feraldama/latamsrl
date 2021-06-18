const server = require("express").Router();
const { Op } = require("sequelize");
const { Vehicle, Rfid } = require("../db.js");

// Obtener todos los rfid
server.get("/", (_req, res, next) => {
  Rfid.findAll({ include: [Vehicle] }) //Busco todos los rfids
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

server.get("/actives", (_req, res, next) => {
  Rfid.findAll({ where: { active: true }, include: [Vehicle] }) //Busco solo los rfids marcados como activos
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

// Obtener las reviews de un vehiculo
// server.get("/:id/review", (req, res, next) => {
//   const { id } = req.params;
//   Vehicle.findByPk(id)
//     .then((vehicle) => {
//       if (!vehicle) res.status(400).send("No se encontro el Vehiculo");
//       else {
//         vehicle
//           .getReviews({ include: [Vehicle, User] })
//           .then((items) => res.status(200).send(items))
//           .catch(next);
//       }
//     })
//     .catch(next);
// });

// Modificar un rfid
server.put("/:id", (req, res, next) => {
  console.log("req.body BACK: ", req.body);
  Rfid.findByPk(req.params.id, { include: [Vehicle] }) // Busco el vehiculo por clave primaria (id)
    .then((currentRfidData) => {
      console.log("currentVehicleData: ", currentRfidData);
      if (!currentRfidData)
        return res.status(400).send("El registro no existe");
      let categories = [];
      if (req.body.vehicleId) {
        // req.body.categories.forEach((category) => {
        categories.push(parseInt(req.body.vehicleId, 10));
        // });
      }
      const {
        rfidNumber = currentRfidData.rfidNumber,
        brand = currentRfidData.brand,
        invoiceNumber = currentRfidData.invoiceNumber,
        invoiceDate = currentRfidData.invoiceDate,
        company = currentRfidData.company,
        measure = currentRfidData.measure,
        type = currentRfidData.type,
        location = currentRfidData.location,
        recapNumber = currentRfidData.recapNumber,
        vehicleId = currentRfidData.vehicleId,
        active = currentRfidData.plate,
      } = req.body;
      // currentVehicleData.categories.forEach((category) => {
      // currentVehicleData
      //   .removeCategory(category.dataValues.id)
      //   .catch((err) => console.error(err));
      // });
      // categories.forEach((category) => {
      currentRfidData
        .setVehicle(req.body.vehicleId)
        .catch((err) => console.error(err));
      // });
      Rfid.update(
        {
          rfidNumber,
          brand,
          invoiceNumber,
          invoiceDate,
          company,
          measure,
          type,
          location,
          recapNumber,
          vehicleId,
          active,
        },
        { where: { id: req.params.id } }
      )
        .then(
          () => (prod = Rfid.findByPk(req.params.id, { include: [Vehicle] }))
        )
        .then((vehi) => res.status(200).send(vehi))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

// Crear/Agregar un vehiculo
server.post("/", (req, res, next) => {
  const {
    rfidNumber,
    brand,
    invoiceNumber,
    invoiceDate,
    company,
    measure,
    type,
    location,
    recapNumber,
    vehicleId,
  } = req.body;
  Rfid.create({
    rfidNumber,
    brand,
    invoiceNumber,
    invoiceDate,
    company,
    measure,
    type,
    location,
    recapNumber,
  })
    .then((rfid) => {
      rfid.setVehicle(vehicleId).then((newData) => {
        Rfid.findByPk(rfid.dataValues.id, { include: [Vehicle] }).then(
          (rfidVehicle) => {
            res.status(201).send(rfidVehicle);
          }
        );
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error);
    });
});

// Obtener los rfid ELIMINADOS
server.get("/deleted", (req, res, next) => {
  Rfid.findAll({ where: { active: false }, include: [Vehicle] })
    .then((rfids) => {
      res.send(rfids);
    })
    .catch(next);
});

// Obtener los vehiculos pertenecientes a X categoria
server.get("/vehicle/:id", (req, res, next) => {
  Vehicle.findByPk(req.params.id, { include: [Rfid] }).then((data) =>
    res.status(200).send(data)
  );
});

// Obtener un rfid en base a ID
server.get("/:id", (req, res, next) => {
  Rfid.findByPk(req.params.id, { include: [Vehicle] })
    .then((rfid) => {
      if (!rfid) res.status(400).send("No existe el rfid");
      else res.status(200).send(rfid);
    })
    .catch(next);
});

// Obtener vehiculo segun keyword de busqueda
server.get("/search/:id", (req, res, next) => {
  const query = req.params.id;
  Rfid.findAll({
    where: {
      [Op.or]: {
        rfidNumber: {
          [Op.like]: `%${query}%`,
        },
        brand: {
          [Op.like]: `%${query}%`,
        },
        type: {
          [Op.like]: `%${query}%`,
        },
      },
    },
    include: [Vehicle],
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

// Eliminar un rfid
server.delete("/:id", (req, res, next) => {
  Rfid.findByPk(req.params.id)
    .then((rfid) => {
      if (!rfid) return res.status(400).send("El registro no existe");
      Rfid.update({ active: false }, { where: { id: req.params.id } })
        .then(() => (rf = Rfid.findByPk(req.params.id)))
        .then((rf) => res.status(200).send(rf))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});
module.exports = server;
