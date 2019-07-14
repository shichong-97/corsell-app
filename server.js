const express = require("express");
const app = express();

// console.log that your server is up and running
app.listen(3456, function() {
  console.log("Listening on port 3456");
});

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
  return {};
});
