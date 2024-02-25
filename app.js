require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const userRouter = require("./routes/userRoute");
var methodOverride = require("method-override");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connect DB successfuly");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRouter);
