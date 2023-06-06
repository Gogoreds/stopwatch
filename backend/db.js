const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Could not connect to MongoDB..."));
db.once("open", function () {
  console.log("Connected to MongoDB...");
});

module.exports = db;
