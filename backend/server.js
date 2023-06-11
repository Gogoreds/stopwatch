const express = require("express");
const app = express();
const savedTimes = require("./routes/savedTimes");
const cors = require("cors");
const { db } = require("./Database");

db.connect();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/savedTimes", savedTimes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
