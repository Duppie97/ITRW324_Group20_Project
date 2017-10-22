
var connection = new RTCMultiConnection();

var table = "member";

            //WHERE id=key                                -> format "/5"
            //var key = localStorage.getItem("emailid");

            //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
            var myArr = {'': ''};

            //SELECT columns FROM table                   -> format "&column1,column2,column3"
            var columns = "";

            //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
            var crit = "&`Email`='" + localStorage.getItem("emailid") + "'";

            //GET, PUT, POST, DELETE, GETFIL(filter)      -> GET = SELECT * FROM table WHERE ID=key
            //                                            -> PUT = UPDATE table SET column1=value1, column2=value2... WHERE ID=key
            //                                            -> POST = INSERT INTO table(column1,column2...) VALUES (value1,value2...)
            //                                            -> DELETE = DELETE FROM table WHERE ID=key
            //                                            -> GETFIL = SELECT columns FROM table WHERE crit
            var method = "GETFIL";

            var xhttp = new XMLHttpRequest();
            xhttp.open(method, "http://localhost/api.php/" + table  , false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send("&*" +columns + crit);
            alert(xhttp.responseText);
			var response = "[" + xhttp.responseText + "]";
			var responses = JSON.parse(xhttp.responseText);
            var count = responses["Total_Sessions"];
            var icount = parseInt(count) + 1;


var keys = localStorage.getItem("emailid");
  var tables = "member";
  var myArrs = {'Total_Sessions': icount};
  var methods = "PUT";
  var crits = "`Email` = '" + localStorage.getItem("emailid") + "'";
  var xhttp = new XMLHttpRequest();
  xhttp.open(methods, "http://localhost/api.php/" + tables, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send(JSON.stringify(myArrs)+ "&&" + crits);

  localStorage.setItem("emailid",document.getElementById("email").value);
  localStorage.setItem("passwordid",document.getElementById("password").value);

  var response = xhttp.responseText;

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
