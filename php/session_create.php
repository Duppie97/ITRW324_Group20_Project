<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "324projek";

$rndDigits="";
$roomID="";
$userEmail = "jaco.vanzyl@creative-sound.net";//Kry op 'n manier van die DB af'
$roomName = $_POST["roomname"];
$sessionType =$_POST["session_type"];
$primary_instrument=$_POST["primary_instrument"];

function random_digits($length) 
{
    $length = intval($length, 10);
    $output = '';
    for ($i = 0; $i < $length; $i++)
     {
        $rndDigits = mt_rand(0, 99);
        $rndDigits.=$output;
    } 
    
}

random_digits(4);

$roomID = $userEmail.(string)$rndDigits;
//echo $roomID;

$conn = new mysqli($servername, $username, $password, $dbname);


if($conn->connect_error)
{
	die("Connection failed : ".$conn->connect_error);
}

$sql = "INSERT INTO create_session ( Room_ID,Room_name, Instrument, Room_Type)
VALUES ('".$roomID."','". $roomName."','". $primary_instrument."', '". $sessionType."')";

if ($conn->query($sql) === TRUE)
{
   // echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

mysqli_close($conn);

?>

