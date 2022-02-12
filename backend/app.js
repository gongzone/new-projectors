require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");

const userRoute = require("./routes/user-route");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoute);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
