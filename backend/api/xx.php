<?php
$root = __DIR__;
$back = dirname($root);

// $path = $_POST['deletedPath'];
$path = '\\data\\a\\*';
$list = glob($back.$path );
foreach ($list as $key => $value) {
  echo $value;
  if(is_file($value)){
    unlink($value);
    echo 'file~~<br>';
  }else{
    rmdir($value);
    echo 'not file<br>';
  }
}
// if(is_file($list)){
//   echo 'file';
// }else{
//   echo 'not a file';
// }
// if(unlink($back.'\\data\\a\\foo.txt'))
// 		echo "成功刪除檔案"."<br>";
// 	else
// 		echo "刪除檔案失敗"."<br>";
// if(rmdir($back.'\\data\\a')){
//   echo 'work';
// }else{
//   echo 'failed <br>';
// }
// if(is_dir($back.'\\data\\a')){
//   echo 'is dir';
// }else{
//   echo 'failed';
// }
// foreach($list as $filename)
//   if(@unlink($filename)){
//     echo 'deleted';
//   }
//   echo  basename($filename)." size ".filesize($filename). $filename."<br>";
// print_r($list);