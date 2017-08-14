function useDB()
{
  //SELECT * FROM table
  var table = "";

  //WHERE id=key                                -> format "/5"
  var key = "";

  //INSERT INTO table (column) VALUES (value)   -> format {'column1' : 'value1', 'column2' : 'value2'}
  var myArr = {'column': 'value'};

  //SELECT columns FROM table                   -> format "&column1,column2,column3"
  var columns = "";

  //WHERE crit                                  -> format "&column1=valueA AND column2=valueB"
  var crit = "";

  //GET, PUT, POST, DELETE, GETFIL(filter)      -> GET = SELECT * FROM table WHERE ID=key
  //                                            -> PUT = UPDATE table SET column1=value1, column2=value2... WHERE ID=key
  //                                            -> POST = INSERT INTO table(column1,column2...) VALUES (value1,value2...)
  //                                            -> DELETE = DELETE FROM table WHERE ID=key
  //                                            -> GETFIL = SELECT columns FROM table WHERE crit
  var method = "";

  var xhttp = new XMLHttpRequest();
  xhttp.open(method, "http://localhost/api.php/" + table + key , false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(myArr) + columns + crit);
  var response = JSON.parse(xhttp.responseText);
}