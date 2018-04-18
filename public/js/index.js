/* eslint-disable */
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createEmail', {
        to: 'sly@outlook.com',
        text: 'I miss you',
    });
    socket.emit('createMsg', {
        from: 'c',
        text: 'let\'s do it',
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(data) {
    console.log('New email');
    console.log(data.from);
    console.log(data.text);
});

socket.on('newMsg', function(data) {
    console.log(data);
});
