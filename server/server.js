const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMsg, generateLocationMsg } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMsg', (data, cb) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(data.text)) {
            io.to(user.room).emit('newMsg', generateMsg(user.name, data.text));
        }
        cb();
    });

    socket.on('createLocationMsg', (data) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMsg', generateLocationMsg(user.name, data.latitude, data.longitude));
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from client');
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('udateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMsg('Admin', `${user.name} has left.`));
        }
    });

    socket.on('join', (data, cb) => {
        if (!isRealString(data.name) || !isRealString(data.room)) {
            return cb('Name and room are required');
        }
        socket.join(data.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, data.name, data.room);

        io.to(data.room).emit('udateUserList', users.getUserList(data.room));
        socket.emit('newMsg', generateMsg('Admin', 'Welcome to the chat room'));
        socket.broadcast.to(data.room).emit('newMsg', generateMsg('Admin', `${data.name} joined the room.`));
        // socket.leave();
        cb();
    });
});

server.listen(port, () => {
    console.log(`Server start to listen at port ${port}`);
});
