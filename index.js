'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const {connect, connection} = require("mongoose");
const xkcdRouter = require("./routers/xkcd-router");
const initializeMongoDatabaseConnection = async () => {
  try {
    await connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`);
    connection.on("error", error => console.error(error));
  } catch (error) {
    console.error(error);
  }
};
initializeMongoDatabaseConnection().then(() => console.log("MongoDB connection established"));

app.get('/', (req, res) => {
  res.json('XKCD API is up and running!')
});

app.use('/xkcs', xkcdRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});