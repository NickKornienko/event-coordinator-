require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { initializeDatabase } = require("./db/db");
const authRoutes = require("./auth/auth.routes");
const dbRoutes = require("./db/db.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});

app.use("/api", authRoutes);
app.use("/api", dbRoutes);

initializeDatabase()
  .then(({ User }) => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
