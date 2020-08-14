const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB Config
require('./config/db');

const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);

const poll = require('./routes/poll');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.use('/poll', poll);

// Socket Ayarları
io.on('connection', (socket) => {
    socket.on("sendVote", (vote) => {
        socket.broadcast.emit("getVote", vote);
    });
});

const port = 3000;

// Start server
http.listen(port, () => console.log(`Server started on port ${port}`));
            