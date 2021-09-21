const express = require("express");
// const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
// const { SECRET_KEY } = process.env;

require("./db.js");
// require("./config/passport.js");

const server = express();

server.name = "API";

// server.use(
//   require("express-session")({
//     secret: SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.27:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

// server.use(passport.initialize());
// server.use(passport.session());

server.use((req, _res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

module.exports = server;
