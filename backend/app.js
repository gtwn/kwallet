const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const func = require('./routes/func');

const app = express();

mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    'mongodb+srv://gtwn:' + process.env.MONGO_ATLAS_PW + '@cluster0-aarl2.mongodb.net/node-angular' ,
    {useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use('/api/func', func);
module.exports = app;
