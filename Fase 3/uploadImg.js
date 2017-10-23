var ip = "196.252.154.147";
var imgPath = "img/";
var imgPath2 = "http://localhost/img/";
var imgPath3 = "http://"+ip+"/img/";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";
var file="";
function upload()
{

	alert(file);
if(file != "")
{
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");

	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	var dt = (curr_date + "-" + m_names[curr_month] + "-" + curr_year);

	var table = "uploads";
  var myArr = {'Email': localStorage.getItem("emailid"), 'FileName': file,'Caption': document.getElementById("caption").value,'Tag': document.getElementById("tag").value, 'Date': dt};
  var method = "POST";
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, apiPath + table , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("emailid") + ":" + localStorage.getItem("passwordid")));
  xhttp.send(JSON.stringify(myArr));

alert("Image uploaded");
	$.get("somepage.php");
	alert("ok");
  window.location.href="http://localhost/profile?email=" + localStorage.getItem("emailid");
}
else
{
alert("Select an image");
}
}

$('#subImage').change( function(event) {
    file = $("#subImage")[0].files[0].name;
    alert(file);
});