const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connnected..!!"))
  .catch((err) => {
    console.log(err.message);
  });
