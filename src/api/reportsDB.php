<?php

$host = 'localhost:3306';
$user = 'root';
$password = 'csumisserver';
$dbname = 'medicalreports';
$link = mysqli_connect($host,$user,$password,$dbname);

mysqli_select_db($link,$dbname)or die("無法開啟資料庫!!</BR>");;

if($link){
  // echo '資料庫連接成功';
}else {
  die(mysqli_connect_error());
}




?>