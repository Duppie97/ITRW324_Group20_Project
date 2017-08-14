
var connection = new RTCMultiConnection();



window.onbeforeunload = function(e){
hangup();
}

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';



document.getElementById('roomName').innerHTML = localStorage.getItem("roomname");

// all below lines are optional; however recommended.

connection.session = {
    audio: true,
    video: true
};

//$("p").text("Hello world!");

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

connection.onstream = function(event) {
    document.body.appendChild( event.mediaElement );
};

var predefinedRoomId = prompt('Please enter room-id', 'xyzxyzxyz');

connection.openOrJoin(predefinedRoomId);

function joinScreen()
{

	window.location = 'localhost/session.html';
}
