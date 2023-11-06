<?php
header('Access-Control-Allow-Origin:http://localhost/');
// require_once 'reportsDB.php';
$name = mb_convert_encoding($_POST["folderName"], "UTF-8", "auto");
$dir = __DIR__;
$DIR = dirname($dir);
$path = "$DIR\\data\\$name";
if (!file_exists($path)) {

  //創建自訂名稱的folder到data資料夾
  mkdir($path);
  //在當前folder創建ouput存放python結果
  mkdir($path . '/output');
  mkdir($path . '/resource');
  // echo '資料夾創建成功';
  sleep(3);
  require($dir . '\\folders.php');

  //創建自訂名稱的table
  // $createTable = "CREATE TABLE `medicalreports`.`'$name'` (`ID` INT(255) UNSIGNED  AUTO_INCREMENT , `folder` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,`filename` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `size` DOUBLE(10,4) NULL DEFAULT NULL  ,`uploader` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,`date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,`path` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,`outputpath` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,PRIMARY KEY (`ID`)) ENGINE = InnoDB";
  // mysqli_query($link,$createTable);
} else {
  // echo '資料夾已存在';
  require($dir . '\\folders.php');
}