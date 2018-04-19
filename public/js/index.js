/* eslint-disable */
var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMsg', function(data) {
    console.log(data);
});
