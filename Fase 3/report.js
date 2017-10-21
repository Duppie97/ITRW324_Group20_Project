var rptUserMail;
var ip = "196.252.154.147";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";

function report()
{

	rptUserMail = document.getElementById("report_text").value;
	
	get_report();
	
}

function get_report()
{

  //SELECT * FROM table
  var table = "member";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = null;
  //SELECT columns FROM table                   -> format "&column1,column2,column3"
  var columns = "&Reports";

  //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
  var crit = "&`Email`='" + rptUserMail + "'";

  var method = "GETFIL";
var xhttp = new XMLHttpRequest();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  }
  xhttp.open(method, apiPath + table, false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(columns + crit);
  	
  
  var response = JSON.parse(xhttp.responseText);
  //alert(response["Reports"]);
  
  if(response["Reports"] ==10)
  {
  	alert("The user is already reported and action has been taken");
  }else
  {
  	var rsp= parseInt(response["Reports"]);
  	var newV = increment_report(rsp);
  	alert(newV);
  	readIn_report(newV);
  }
}

function increment_report(v)
{
	return v=v+1;

}

function readIn_report(v)
{
	//SELECT * FROM table
  var table = "member";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = {"Reports": v};

  //SELECT columns FROM table                   -> format "&column1,column2,column3"
  var columns = "&";

  //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
  var crit = "&`Email`='" + rptUserMail + "'";

  //GET, PUT, POST, DELETE, GETFIL(filter)      -> GET = SELECT * FROM table WHERE ID=key
  //                                            -> PUT = UPDATE table SET column1=value1, column2=value2... WHERE ID=key
  //                                            -> POST = INSERT INTO table(column1,column2...) VALUES (value1,value2...)
  //                                            -> DELETE = DELETE FROM table WHERE ID=key
  //                                            -> GETFIL = SELECT columns FROM table WHERE crit
  var method = "PUT";
  
	var xhttp = new XMLHttpRequest();

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     apiPath = apiPath2;
  	}
	  xhttp.open(method, apiPath + table, false);
	  xhttp.setRequestHeader("Content-type", "application/json");
	  xhttp.send(JSON.stringify(myArr) +columns + crit);
	  	
	  
	  var response = JSON.parse(xhttp.responseText);
}

