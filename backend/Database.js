const { MongoClient } = require("mongodb");
require("dotenv").config();

class MongoDatabase {
  url =
    "mongodb+srv://stopwatch:stopwatch123@cluster00.jmreyfx.mongodb.net/?retryWrites=true&w=majority";
  client;

  database = "Stopwatch";

  collections = ["SavedTimes"];

  async connect() {
    try {
      this.client = await MongoClient.connect(this.url);
    } catch (err) {
      console.log(err);
    }

    this.setupCollections();
  }

  async disconnect() {
    await this.client.close();
  }

  setupCollections() {
    for (const collection of this.collections) {
      this[collection] = this.client.db(this.database).collection(collection);
    }
  }
}

exports.db = new MongoDatabase();
