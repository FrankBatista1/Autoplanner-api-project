const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


//db connection
mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('Server connected'))
      .catch(() => console.log("Could't connect whit the database"))

//middlewares
const errorHandler = require('./middlewares/error')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes 
app.use('/api/auth', require('./routes/auth'));

//check and delete users for production purposes - could be used by admin
app.use('/api/users', require('./routes/user'));
// app.use('/api/calendar'), require(('./routes/calendar'));

//Error handler leave it as the last piece of middleware
app.use(errorHandler)

//port connection
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Server Running')
})



