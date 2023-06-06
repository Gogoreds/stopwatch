const express = require("express");
const app = express();
const savedTimes = require("./routes/savedTimes");

app.use(express.json());
app.use("/api/savedTimes", savedTimes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
