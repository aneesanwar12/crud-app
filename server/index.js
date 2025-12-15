const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./router/userRouter");
const logsRouter = require("./router/logRouter");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", logsRouter);

app.listen(8000, () => {
  console.log("this server is running on port no 8000");
});
