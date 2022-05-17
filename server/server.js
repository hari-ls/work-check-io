// import express
const express = require("express");
const app = express();

// define port
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
