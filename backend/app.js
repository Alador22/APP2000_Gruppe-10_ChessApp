const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

/*app.post("/api/users/login", (req, res) => {
  const { name, password } = req.body;
  // Noe logikk inn her
  if (name === "admin" && password === "password") {
    res.send("Login successful");
  } else {
    res.status(401).send("Login failed");
  }
});*/
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://alador:killer431@cluster0.en1kinu.mongodb.net/database?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
