require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");

// routes import
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");

// error handler import
const errorHandler = require("./middlewares/error-handler");

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

// error-handle middleware
app.use(errorHandler);

start();
