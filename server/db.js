var MongoClient = require("mongodb").MongoClient;

var db;

const url = "mongodb://localhost:27017/3weeks";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("3weeks");
  dbo
    .collection("tasks")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});

module.exports = db;
