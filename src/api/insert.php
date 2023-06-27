<?php
header('Access-Control-Allow-Origin:http://localhost/');
  require_once 'reportsDB.php';
  #獲取文件名稱及擴展名稱，將txt擴展名改成json擴展名
  
    $filename = $_FILES['txt']['name'];
    $path = $_POST['path'];
    $size = ($_FILES['txt']['size'] / 1024);
    $db = $_POST['DBName'];
    $folder = &$db;
    $extension = pathinfo($filename,  PATHINFO_EXTENSION);
    $basename = basename($filename,'.'.$extension);
    $jsonfile = $basename . '.json';
    $jsonpath = $db . '/' . $jsonfile;
    $outputpath = "'./data/'"."'$folder' "." '/output/' "." '$jsonfile'";
    $cc = str_replace("'","",$outputpath);
    $outputph = str_replace(" ","",$cc);
# 檢查檔案是否上傳成功
if ($_FILES['txt']['error'] === UPLOAD_ERR_OK){
  echo '檔案名稱: ' . $_FILES['txt']['name'] . '<br/>';
  echo '檔案類型: ' . $_FILES['txt']['type'] . '<br/>';
  echo '檔案大小: ' . ($_FILES['txt']['size'] / 1024) . ' KB<br/>';
  echo '暫存名稱: ' . $_FILES['txt']['tmp_name'] . '<br/>';
   
  # 檢查檔案是否已經存在
  
  if (file_exists('./data/' . $jsonpath )){
    echo '檔案已存在。';
  } else {
    $file = $_FILES['txt']['tmp_name'];
    # 將檔案移至指定位置
    $dest = './data/' . $jsonpath ;
    move_uploaded_file( $file, $dest);
    

      //將上傳的檔案插入表中
      $sql  = "INSERT INTO `'$db'` (`ID`, `folder`, `filename`,`size`,`uploader`,`date`,`path`,`outputpath`) VALUES (NULL, '$folder','$jsonfile','$size',NULL,current_timestamp() ,'$dest',NULL)";
      $res = mysqli_query($link,$sql);

      //判斷上傳資料庫結果
      if($res){
      callPython( $dest,$outputph,$db);
      }else{
        echo '上傳失敗';
      }
   
      
      
      

      
    
  }
} else {
  echo '錯誤代碼：' . $_FILES['file']['error'] . '<br/>';
}

function callPython($inputph,$outputph,$db){ 
//   // 外部程序路径
$inputpath =escapeshellarg($inputph);
$outputpath =escapeshellarg($outputph);
$DB = escapeshellarg($db);
$cmd = "C:\Users\Administrator\AppData\Local\Programs\Python\Python310\python.exe ./classification.py $inputpath $outputpath $DB";
// // 执行外部程序
$result =exec($cmd, $output, $return_var);

// 检查是否有错误
if ($return_var !== 0) {
    echo "外部程序出错：",$return_var;

  }
// 输出外部程序的输出
echo implode("\n", $output);

};

  
?>