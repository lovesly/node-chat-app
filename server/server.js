const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIO(server);
const { generateMsg } = require('./utils/message');

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat room'));

    socket.broadcast.emit('newMsg', generateMsg('Admin', 'New user joined'));

    socket.on('createMsg', (data, cb) => {
        console.log('createMsg', data);
        io.emit('newMsg', generateMsg(data.from, data.text));
        cb('This is from the server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
    });
});

server.listen(port, () => {
    console.log(`Server start to listen at port ${port}`);
});
