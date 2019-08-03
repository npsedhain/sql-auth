const express = require("express");
const app = express();
const config = require("./config");
const db = require("./db");
const morgan = require("morgan");

const apiRouter = require("./controllers/api.route")();

app.use(morgan("dev"));

app.use("/api", apiRouter);

app.listen(config.PORT, err => {
  if (err) {
    return console.log("\nerror occured while starting server!!!");
  }
  console.log(`\nServer listening at port ${config.PORT}...`);
});

db.connect(err => {
  if (err) {
    console.log("Error connecting to the database!!!\n", err);
  } else {
    console.log(`Database is connected...\n`);
  }
});
