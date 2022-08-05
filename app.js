const express = require("express");
const helmet = require("helmet");
//const dotenv = require("dotenv").config();
const path = require("path");
const userRoutes = require("./routes/user");
const refugeRoutes = require("./routes/refuge");
const chienRoutes = require("./routes/chien");
const statutsRoutes = require("./routes/dogStatut");

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/", userRoutes);
app.use("/api/", refugeRoutes);
app.use("/api/", chienRoutes);
app.use("/api/", statutsRoutes);

module.exports = app;
