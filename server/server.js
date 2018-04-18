const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newEmail', {
        from: 'zz@outlook.com',
        text: 'screw you',
        createAt: 123,
    });

    socket.emit('newMsg', {
        from: 'zz',
        text: 'die in hell, plz',
        createdAt: 123,
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
    });

    socket.on('createEmail', (data) => {
        console.log('createEmail', data);
    });

    socket.on('createMsg', (data) => {
        console.log('createMsg', data);
    });
});

server.listen(port, () => {
    console.log(`Server start to listen at port ${port}`);
});
