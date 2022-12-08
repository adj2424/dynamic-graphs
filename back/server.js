const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log(`Connected to MongoDB at ${process.env.MONGO_DB}`))
  .catch(error => console.log(error));

mongoose.set('strictQuery', true);

const client = process.env.CLIENT_PORT.split(',');
const io = new Server(server, {
  cors: {
    // react front end must run on these ports
    origin: client,
    methods: ['GET', 'POST']
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
