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

	if(memberEmail == localStorage.getItem("emailid"))
	{
		
		var ubtnp = document.createElement("button");
		var refNode = document.getElementById("name");
		ubtnp.setAttribute("class","button");
		ubtnp.setAttribute("onclick","up()");
		ubtnp.innerHTML="Upload an image";

		var update = document.createElement("button");
		update.setAttribute("class","button");
		update.setAttribute("onclick","update()");
		update.setAttribute("style","float: right;");
		update.innerHTML="Update Status";

		refNode.parentNode.insertBefore(ubtnp, refNode.nextSibling);
		refNode.parentNode.insertBefore(update, refNode.nextSibling);
	}

	var table = "member";                               
  var crit = "`Email` = '" + memberEmail + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }

  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send("&*&" + crit);
  var response = xhttp.responseText;
  var json = JSON.parse(response);
 
 //var pp = document.getElementById('profilepic');

 var txt = json["Name"]+"\'s Information<hr><br>Status:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + json["Status"] + "<br><br>Email:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + json["Email"] +"<br><br>Band Status:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + json["Band_Stat"] + "<br><br>Current Instrument:&nbsp&nbsp " + json["Current_Inst"];
 var txt3 = "<br><br>Total Sessions:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + json["Total_Sessions"] + "<br><br>Commendations:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp " + json["Commendations"];
 document.getElementById("profilepic").src="uploads\\" + json["PicturePath"];
 document.getElementById("name").innerHTML=json["Name"] + " " + json["Surname"];

var txt2 = "<br><br>Instruments list:<br>";


	var table = "user_instrument";                               
  var crit = "`Email` = '" + memberEmail + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }

  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send("&*&" + crit);
  var response = xhttp.responseText;
  var json = JSON.parse("[" + response + "]");


  for(i=0;i<json.length;i++)
  {
  	txt2 = txt2+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+json[i]["Instrument"]+"<br><br>";
  }

 document.getElementById("info").innerHTML=txt + txt3 + txt2;

var table = "uploads";                               
  var crit = "`Email` = '" + memberEmail + "'";
  var method = "GETFIL";
  var xhttp = new XMLHttpRequest();
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }

  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send("&*&" + crit);
  var response = xhttp.responseText;
  var json = JSON.parse("[" + response + "]");

  var frm = document.getElementById("join");
  for(i=0;i<json.length;i++)
  {
  	var pnl = document.createElement("div");
  	var oImg = document.createElement("img");
  	var txt = document.createElement("h2");
  	var tag = document.createElement("h2");
  	var date = document.createElement("h2");
  	var hr = document.createElement("hr");
  	var hr2 = document.createElement("hr");

  	pnl.setAttribute('class','form3');
  	frm.appendChild(hr2);
  	frm.appendChild(pnl);

  	txt.setAttribute('style',"color:black;font-size: 30px");
  	tag.setAttribute('style',"color:black;font-size: 20px");
  	date.setAttribute('style',"color:black;font-weight: bold;font-size: 30px");

  	txt.innerHTML = json[i]["Caption"];
  	tag.innerHTML = json[i]["Tag"];
  	date.innerHTML = json[i]["Date"];

  	pnl.appendChild(date);
  	pnl.appendChild(hr);
  	pnl.appendChild(txt);
  	oImg.setAttribute('src',"uploads\\"+json[i]["FileName"]);
  	oImg.setAttribute('width', '650px');

	

  	pnl.appendChild(oImg);
  	pnl.appendChild(tag);
  	 
  }
 
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}

function up()
{
	window.location.href="http://localhost/uploadImg";
}

function update()
{
	var table = "member";
  var myArr = {'Status': window.prompt("Enter your new status","No Status")};
  var method = "PUT";
  var crit = "`Email` = '" + localStorage.getItem("emailid") + "'";
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send(JSON.stringify(myArr)+ "&&" + crit);

 

  
  window.location.reload();
	
}
