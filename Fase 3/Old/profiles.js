var ip = "196.252.154.147";
var imgPath = "img/";
var imgPath2 = "http://localhost/img/";
var imgPath3 = "http://"+ip+"/img/";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";
var memberEmail;

function loadProfile()
{
	memberEmail = getUrlVars()["email"];
	alert("asd");
	var table = "member";                               
  var crit = "`Email` = '" + memberEmail + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }
  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(document.getElementById("email").value + ":" + document.getElementById("password").value));
  xhttp.send("&Email&" + crit);
  var response = xhttp.responseText;
  var json = JSON.parse(response);
 
 var pp = document.getElementById('profilepic');
 pp.src="\\uploads\\" + json["PicturePath"];
}