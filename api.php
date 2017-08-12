<?php
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

$txt = file_get_contents('php://input');
$arrParam = explode('&', $txt);
$input = json_decode($arrParam[0],true);
$columns2 = $arrParam[1];



$myfile = fopen("newfile3.txt", "w") or die("Unable to open file!");
fwrite($myfile, $arrParam[1]);

// connect to the mysql database
$link = new mysqli("localhost", "root", "", "324projek");
mysqli_set_charset($link,'utf8');

if ($link->connect_error) {
    echo "<script>
  alert('Connection to the database failed.');
  window.location.href='admin/ahm/panel';
  </script>";
} 



 
// retrieve the table and key from the pathS
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;


$myfile = fopen("newfile4.txt", "w") or die("Unable to open file!");
fwrite($myfile, $key);

echo "<script>
alert('$input');
alert('$table');
alert('$key');
</script>";

 
// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
echo "<script>
alert('$columns[0]');
alert('$values[0]');
alert('$value');
</script>";

// build the SET part of the SQL command
$set = '';
$set2 = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`';
  $set2.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}

 echo "<script>
 alert('$set');
alert('$method');
</script>";


// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    $sql = "insert into `$table`($set) values ($set2)"; break;
  case 'DELETE':
    $sql = "delete from $table where Inst_Name=$key"; break;
  case 'GETFIL':
    $sql = "select `$columns2` from `$table` WHERE $columns2"); break;
}

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile, $sql);
// excecute SQL statement
$result = mysqli_query($link,$sql);



// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error());
}
 
// print results, insert id or affected row count
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$key) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}
 
// close mysql connection
mysqli_close($link);

