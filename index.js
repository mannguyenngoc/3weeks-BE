const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const exportToExcel = require('./excelExport');

const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const url = "mongodb://localhost:27017/3weeks";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");

const todoRoutes = require("./server/routes/todo.route");

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log("Error: ", error);
  });

app.use(cors());

app.use("/api/todo", todoRoutes);

app.get("/export", async (req, res) => {
  await exportToExcel();
  
  setTimeout(() => {
    res.download(__dirname + '/Excel.xlsx')
  }, 100);
});
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
