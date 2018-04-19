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
    let li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMsg', {
        from: 'User',
        text: $('#message-form [name=message]').val(),
    }, function (data) {
        console.log(`got it ${data}`);
    });
});