


var x="";
for(i=0;i<=2+1;i++)
{
  var x =Math.floor((Math.random()*1000)+1);
  alert(x);
}








function validate()
{
  
  var roomName = document.getElementById("name").value;
var roomID =x;

var instrument = document.getElementById("primary_instrument").value;

var roomType = document.getElementById("session_type").value;
//var vidAuth = document.getElementById("");


  //SELECT * FROM table
  var table = "create_session";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = {'Room_Name': roomName, 'Room_ID' : x, 'Instrument' : instrument, 'Room_Type' : roomType };

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

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, "http://localhost/api.php/" + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
  //var response = JSON.parse(xhttp.responseText);
  alert(xhttp.responseText);
  instruments();
}

function instruments()
{

}