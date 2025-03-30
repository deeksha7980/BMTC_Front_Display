const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static('public'));  // ✅ This serves frontend files

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let currentStop = "Waiting for update...";

// Listen for button press events from the driver
io.on('connection', (socket) => {
    console.log('A driver connected');

    socket.on('updateStop', (stopName) => {
        currentStop = stopName;
        io.emit('displayStop', currentStop);
    });

    socket.on('disconnect', () => {
        console.log('Driver disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚍 Server running at http://localhost:${PORT}`);
});
