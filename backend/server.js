const express = require("express");
const initializeDatabase = require("./db/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the Event Management App server!");
});

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
