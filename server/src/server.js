import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// var routes = require("./api/routes");
// routes(app);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, function() {
  console.log("Server started on port: " + port);
});
