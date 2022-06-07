const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require("./middlewares/error");
require('dotenv').config();

const app = express();

let corsOptions = {
  origin: 'https://autoplanner.netlify.app',
  optionsSuccessStatus: 200
}


//db connection
mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('Server connected'))
      .catch(() => console.log("Could't connect whit the database"))

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes 
app.use('/api/auth',cors(corsOptions), require('./routes/auth'));

//to get delete and update user info
app.use('/api/users',cors(corsOptions), require('./routes/user'));

app.use('/api/events',cors(corsOptions), require('./routes/events'));

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

