var ip = "196.252.154.147";
var imgPath = "img/";
var imgPath2 = "http://localhost/img/";
var imgPath3 = "http://"+ip+"/img/";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";
var roomName;
var x="";
var roomID; 
var name;
  x =Math.floor((Math.random()*1000)+1);

window.onload = function(){
    $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
      this.src=imgPath+id+"-g.png";
      this.width=100;
      this.style.paddingRight="10px";
      this.style.paddingBottom="20px";
      this.title = id;
  });
}

  function opklik()
  {
    validate();
    window.location.href="http://localhost/session?room_name=" + roomName;

  }

function validate()
{

  roomName = document.getElementById("name").value;
  roomName = roomName.replace('&','and');
  //localStorage.setItem("roomname",roomName);
   roomID =x + localStorage.getItem("emailid");

var roomType = document.getElementById("session_type").value;
//var vidAuth = document.getElementById("");


  //SELECT * FROM table
  var table = "create_session";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = {'Room_Name': roomName, 'Room_ID' : roomID, 'Room_Type' : roomType };

  //SELECT columns FROM table                   -> format "&column1,column2,column3"
  var columns = "";

  //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
  var crit = "";

  //GET, PUT, POST, DELETE, GETFIL(filter)      -> GET = SELECT * FROM table WHERE ID=key
  //                                            -> PUT = UPDATE table SET column1=value1, column2=value2... WHERE ID=key
  //                                            -> POST = INSERT INTO table(column1,column2...) VALUES (value1,value2...)
  //                                            -> DELETE = DELETE FROM table WHERE ID=key
  //                                            -> GETFIL = SELECT columns FROM table WHERE crit
  var method = "POST";

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
}
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
  //var response = JSON.parse(xhttp.responseText);


  activeMember();
  $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
    var val = document.getElementById(id).value;
    if(val==='true')
    {
      instruments(id);
    }
  });
  
}

function instruments(id,x)
{
      var xhttp = new XMLHttpRequest();
      var table = "session_instruments";
      var myArr = {'Room_ID': roomID,'Inst_Needed': id};
      var method = "POST";

     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }
      xhttp.open(method, apiPath + table, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(myArr));  

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function activeMember()
{
  checkName(localStorage.getItem("emailid"));
  var table = "members_active";
  var key = "";
  var myArr = {'Room_Num': roomID, 'Member_Name' : name, 'Member_Email'  : localStorage.getItem("emailid") };
  var columns = "";
  var crit = "";
  var method = "POST";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
  alert('a');
}

function checkName(id)
{
  
  var table = "member";
  var key = "";
  var myArr = null;
  var columns = "Name";
  var crit = "Email='"+id+"'";
  var method = "GETFIL";
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    apiPath = apiPath2;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
  var res = JSON.parse(xhttp.responseText);

  name = res['Name'];

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeImage(id) {
        if (document.getElementById(id).src == imgPath2 + id + "-h.png"||document.getElementById(id).src == imgPath3 + id + "-g.png") 
        {
            document.getElementById(id).src = imgPath + id + ".png";
            document.getElementById(id).value = "true";
        }
        else if(document.getElementById(id).src == imgPath3 + id + ".png")
        {
            document.getElementById(id).src = imgPath + id + "-g.png";
            document.getElementById(id).value = "false";
        }
        else
        {
            document.getElementById(id).src = imgPath + id + "-h.png";
            document.getElementById(id).value = "false";
        }
    }

function hoverImage(id) {
        if (document.getElementById(id).src == imgPath2 + id + "-g.png") 
        {
            document.getElementById(id).src = imgPath + id + "-h.png";
        }
        
    }   

function hoverOff(id) {

        if (document.getElementById(id).src == imgPath2 + id + "-h.png") 
        {
            document.getElementById(id).src = imgPath + id + "-g.png";
        }
        
    } 



$( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
    var val = document.getElementById(id).value;
    if(val==='true')
    {
      validateInstruments(id, i);
      i = i + 1;
    }
  });

$( document ).ready(function() {
  $( '.gallery' ).each( function ( ) {
    var id = ($(this).attr('id'));
      this.src=imgPath+id+"-g.png";
      this.width=100;
      this.style.paddingRight="10px";
      this.style.paddingBottom="20px";
      this.title = id;
  });
});
