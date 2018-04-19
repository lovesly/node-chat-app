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

    socket.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome to the chat room',
    });

    socket.broadcast.emit('newMsg', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime(),
    });

    socket.on('createMsg', (data) => {
        console.log('createMsg', data);
        io.emit('newMsg', {
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime(),
        });

        // socket.broadcast.emit('newMsg', {
        //     from: data.from,
        //     text: data.text,
        //     createdAt: new Date().getTime(),
        // });
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
    });
});

server.listen(port, () => {
    console.log(`Server start to listen at port ${port}`);
});
