<?php
$root = __DIR__;
$back = dirname($root);

$path = $_GET['deletedPath'];
$path = $back."\\$path\\*";
$FileListArr = glob($path);
function deleteDir($dir,$path=""){
  //刪除單筆資料
  if(count($dir)==0) {
    $isFile = dirname($path);
    if(@unlink($isFile)){
     print_r(json_encode(array('deletedPath'=>$isFile,'state'=>'done')));
     return;
    }

  }
  //遞迴刪除全部資料夾
  foreach($dir as $value){
    if(is_dir($value)){
        $list = glob($value."\\*");
        deleteDir($list);
        // print_r($list);
        // echo '<br>';
      // echo "Folder:".$value."<br>";
      rmdir($value);
    }else{
      $done = unlink($value);
      // echo "STATE:".$done;
      // echo "File:".$value."<br>";
    }
    
  }
  //刪除完內部再刪除自身資料夾
  $exists = glob($path);
  if(count($exists)==0){
    $d = dirname($path);
    rmdir($d);
     
    print_r(json_encode(array('deletedPath'=>$d,'state'=>'done')));
  }
}
deleteDir($FileListArr,$path);