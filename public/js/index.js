/* eslint-disable */
var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMsg = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMsgHieght = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight();
    // funny logic
    if (clientHeight + scrollTop + newMsgHieght + lastMsgHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMsg', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a');    
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
    scrollToBottom();

    // var li = $('<li></li>');
    // li.text(`${data.from} ${formattedTime}: ${data.text}`);
    // $('#messages').append(li);
});

socket.on('newLocationMsg', function(data) {
    var formattedTime = moment(data.createdAt).format('h:mm a');  
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: data.url,
        from: data.from,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
    scrollToBottom();

    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    // li.text(`${data.from} ${formattedTime}: `);
    // a.attr('href', data.url);
    // li.append(a);
    // $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = $('[name=message]');
    socket.emit('createMsg', {
        from: 'User',
        text: messageTextbox.val(),
    }, function () {
        messageTextbox.val('');
        messageTextbox.focus();
    });
});

var locationBtn = $('#send-location');
locationBtn.click(function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');
    setTimeout(function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            locationBtn.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMsg', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }, function () {
            locationBtn.removeAttr('disabled').text('Send location');        
            alert('Unable to fetch location');
        });
    }, 1000);
});