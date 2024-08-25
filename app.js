const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require("./middlewares/error");
require('dotenv').config();

const app = express();

//db connection
mongoose
      .set('strictQuery', true)
      .connect(process.env.DB_URL)
      .then(() => console.log('Server connected'))
      .catch(() => console.log("Could't connect whit the database"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes 
app.use('/api/auth', require('./routes/auth'));

//to get delete and update user info
app.use('/api/users', require('./routes/user'));

app.use('/api/events', require('./routes/events'));

//Error handler leave it as the last piece of middleware
app.use(errorHandler);

//port connection
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server Running')
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

