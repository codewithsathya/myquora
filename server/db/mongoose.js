const mongoose = require("mongoose");
const connection = mongoose.createConnection(
  "mongodb://localhost:27017/quora_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = connection;
