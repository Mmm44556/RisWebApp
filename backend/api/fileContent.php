<?php
    header('Access-Control-Allow-Origin:http://localhost');
    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Request-Method:GET,POST');
    $folder = $_GET['path'];
    $fileName = $_GET['name'];
    $DIR = __DIR__;
    $dir = dirname($DIR).DIRECTORY_SEPARATOR;
    $path = "$dir$folder/$fileName";
    $strPath =  str_replace('\\','/',$path) ;
    $json = file_get_contents('php://input');
    if($_SERVER['REQUEST_METHOD']=='GET'){
        //讀取檔案
        $fileStr = fopen($strPath,'r');
        $result =  fread($fileStr,filesize($strPath));
        echo $result;
        
    }else{
        //重命名檔案
        if(isset($_GET['rename'])){
            $reName = $_GET['rename'];
            $writeFile2 = fopen($strPath,'w');
            $str2 = fwrite($writeFile2,$json);
            fclose($writeFile2);
            $newPath =str_replace('\\','/',"$dir$folder/$reName");
            $result = rename($strPath,$newPath);
            // echo ("$strPath,$newPath");
            //讀取修改後檔案
            $fileStr2 = fopen($newPath,'r');
            $modifiedFile =  fread($fileStr2,filesize($newPath));
            // echo "$modifiedFile";
            $readModified = fclose($fileStr2);
            

            // echo("修改後檔案:$modifiedFile,路徑:$folder,名字:$fileName,新:$reName,");
        }else{
        //原始檔案
            $writeFile = fopen($strPath,'w');
            $str2 = fwrite($writeFile,$json);
            fclose($writeFile);
            $readFile = fopen($strPath,'r');
            $result = fread($readFile,filesize($strPath));
            // echo $result;
           
            
        }
    
    }
?>