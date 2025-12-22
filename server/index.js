const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

const auth = require("./middleware/auth");
const authRouter = require("./router/auth");
const productRouter = require("./router/products");
const logsRouter = require("./router/logs");

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
app.use("/api", authRouter);
app.use("/api", auth, productRouter);
app.use("/api", auth, logsRouter);

app.listen(8000, () => {
  console.log("this server is running on port no 8000");
});
