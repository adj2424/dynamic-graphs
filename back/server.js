const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const dataRouter = require('./routes');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/data', dataRouter);

const server = http.createServer(app);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log(`Connected to MongoDB at ${process.env.MONGO_DB}`))
  .catch(error => console.log(error));

// server running on this port
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
