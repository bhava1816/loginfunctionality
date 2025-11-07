let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
require("dotenv").config();

let databaseconnection = require("./Router/Database");
let mainfunction = require("./Router/Routes");

const path = require("path");

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Connect to DB
databaseconnection();

// 2. API routes FIRST
app.use("/", mainfunction);

// 3. Serve React build folder
app.use(express.static(path.join(__dirname, "./client/build")));

// 4. Wildcard route for React (Express 5 compatible)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
