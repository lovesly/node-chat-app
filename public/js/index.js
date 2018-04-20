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
    var li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMsg', function(data) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);
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

var locationBtn = $('#send-location');
locationBtn.click(function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function () {
        alert('Unable to fetch location');
    });
});