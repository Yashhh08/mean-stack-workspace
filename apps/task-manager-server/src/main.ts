const express = require("express");
require("./configs/mongoose");
const cors = require("cors");
const userRouter = require("./controller/user");
const taskRouter = require("./controller/task");

import { config } from "dotenv";
config();


const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
