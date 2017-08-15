var ip = "196.252.154.147";
var apiPath = "http://localhost/api.php/";
var apiPath2 = "http://"+ip+"/api.php/";
var tb;
var id ;
var room;
var inst;
var gnre;
var table;
var mytable;
var arr=[];
localStorage.setItem("currInst", 'triangle');



$( document ).ready(function() {

    fill("");
});

function filter()
{

    var e = document.getElementById("filter_choice");
    var strUser = e.options[e.selectedIndex].value;
    fill(" AND " + strUser + " LIKE '%" + document.getElementById("filter_answer").value + "%'");
}

function fill(criteria)
{
    mytable = document.getElementById("table");
    while(mytable.rows.length > 1) {
        mytable.deleteRow(1);
    }

    
    var count = 1;
    
      var table = "session_instruments";
      var key = "";
      var myArr = null;
      var columns = "*";
      var crit = "Inst_Needed='"+localStorage.getItem("currInst") + "'" ;
      var method = "GETFIL";
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        apiPath = apiPath2;
        }

      var xhttp = new XMLHttpRequest();
      xhttp.open(method, apiPath + table + key , false);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);

      if(xhttp.responseText != '')
        var res = JSON.parse("["+xhttp.responseText+"]");

    for(var i = 0; i < res.length; i++)
    {

      arr[i] = res[i]["Room_ID"];

    }

    
 
    for(var k = 0; k < i; k++)
    {
      var table = "create_session";
      var key = "";
      var myArr = null;
      var columns = "*";
      var crit = "Room_ID="+arr[k] + criteria;
      var method = "GETFIL";
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            apiPath = apiPath2;
          }

      var xhttp = new XMLHttpRequest();
      xhttp.open(method, apiPath + table + key , false);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
      if(xhttp.responseText != "")
      {
        var res2 = JSON.parse(xhttp.responseText);
        var row = mytable.insertRow(k+1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);

        cel1.innerHTML = k+1;
        cel2.innerHTML = res2["Room_Name"];
        cel3.innerHTML = localStorage.getItem("currInst");
        cel4.innerHTML = res2["Room_Type"];
      }
      

        
    }
     activateClick();
}

function activateClick()
{
    tb = document.getElementById('table');
    for(var i = 1 ; i< tb.rows.length;i++)
    {
    tb.rows[i].onclick=function()
        {
            var table = "member";
              var key = "";
              var myArr = null;
              var columns = "Name";
              var crit = "Email='"+localStorage.getItem('emailid')+"'";
              var method = "GETFIL";
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                apiPath = apiPath2;
              }

              var xhttp = new XMLHttpRequest();
              xhttp.open(method, apiPath + table + key , false);
              xhttp.setRequestHeader("Content-type", "application/json");
              xhttp.send(JSON.stringify(myArr) + '&' + columns + '&' + crit);
              var res = JSON.parse(xhttp.responseText);

              var name = res['Name'];

            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            room = this.cells[1].innerHTML;
            inst = this.cells[2].innerHTML;
            gnre = this.cells[3].innerHTML;

            var xhttp = new XMLHttpRequest();
              var table = "user_instrument";
              var myArr = {'Room_Num' : arr[id],'Member_Email': localStorage.getItem('emailid'),'Member_Name': name};
              var method = "POST";

             if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            apiPath = apiPath2;
          }
              xhttp.open(method, apiPath + table, true);
              xhttp.setRequestHeader("Content-type", "application/json");
              xhttp.send(JSON.stringify(myArr)); 

              window.location.href="http://localhost/session?room_name=" + room + "&room_id=" + arr[id];
        }
    }

}

