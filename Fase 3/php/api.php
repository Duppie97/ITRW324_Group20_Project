<?php
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

$txt = file_get_contents('php://input');
$arrParam = explode('&', $txt);
$input = json_decode($arrParam[0],true);
if ( ! isset($arrParam[1])) {
   $arrParam[1] = null;
}
$columns2 = $arrParam[1];
if ( ! isset($arrParam[2])) {
   $arrParam[2] = null;
}
$filter = $arrParam[2];



$myfile = fopen("newfile3.txt", "w") or die("Unable to open file!");
fwrite($myfile, $arrParam[1]);

// connect to the mysql database
$link = new mysqli("localhost", "root", "", "324projek");
mysqli_set_charset($link,'utf8');

 
// retrieve the table and key from the pathS
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;


$myfile2 = fopen("newfile4.txt", "w") or die("Unable to open file!");
fwrite($myfile2, $key);
 
// escape the columns and values from the input object
if ( ! isset($input)) {
   $input = array ("" => "");
}
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($link) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));


// build the SET part of the SQL command
$set = '';
$set2 = '';
$set3 = '';
for ($i=0;$i<count($columns);$i++) {
  $s1 = ($i>0?',':'').'`'.$columns[$i].'`';
  $s2 = ($values[$i]===null?'NULL':'"'.$values[$i].'",');
  $set.= $s1;
  $set2.= $s2;
  $set3.= $s1."=".$s2;
}

$set2 = rtrim($set2,',');
$set3 = rtrim($set3,',');

// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $sql = "select * from `$table` ".($filter?" WHERE $filter":''); break;
  case 'PUT':
    $sql = "update `$table` set $set3 where $filter"; break;
  case 'POST':
    $sql = "insert into `$table`($set) values ($set2)"; break;
  case 'DELETE':
    $sql = "delete from $table where $filter"; break;
  case 'GETFIL':
    $sql = "select $columns2 from `$table` WHERE $filter"; break;
}

$myfile3 = fopen("newfile.txt", "w") or die("Unable to open file!");
fwrite($myfile3, $sql);
// excecute SQL statement
$result = mysqli_query($link,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($link));
}

// print results, insert id or affected row count
if ($method == 'GET' || $method == 'GETFIL') {
  if (!$filter) echo '[';
  for ($i=0;$i<mysqli_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
  }
  if (!$filter) echo ']';
} elseif ($method == 'POST') {
  echo mysqli_insert_id($link);
} else {
  echo mysqli_affected_rows($link);
}
 
// close mysql connection
mysqli_close($link);

