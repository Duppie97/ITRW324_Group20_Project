
var connection = new RTCMultiConnection();



window.onbeforeunload = function(e){
hangup();
}

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
var rn = getUrlVars()["room_name"];
document.getElementById('roomName').innerHTML = rn;

//localStorage.getItem("roomname");

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


var predefinedRoomId = getUrlVars()["room_id"];

connection.openOrJoin(predefinedRoomId);

function joinScreen()
{

	window.location = 'http://localhost/session';
}
