const express = require("express");
const cors = require("cors");

import { config } from "dotenv";
config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connnected..!!"))
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
