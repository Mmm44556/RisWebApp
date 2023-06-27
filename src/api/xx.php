<?php
header('Content-type:application/json;charset=utf-8');
// $x = fopen('../data/1/resource/25.json','r');
// $y = fopen('../data/1/resource/22.json','w');
// $input = file_get_contents('php://input');
// $str = fread($x,filesize('../data/1/resource/25.json'));
// $str2 = fwrite($y,$input);
// echo  json_decode($str) ;
$a=  'C:/AppServ/www/data/1/resource/125.json';
$b ='C:/AppServ/www/data/1/resource/測125.json';
echo rename($a,$b);
// fclose($x);

// echo $input;

