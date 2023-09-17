<?php
header('Access-Control-Allow-Origin:http://localhost/');
// $post =$_POST['folderName'];
$para = "$name\\*";
// $dir = __DIR__;
$dirArr = [$DIR, 'data',$para];
$filePath = implode('\\', $dirArr);
$arrFiles = glob($filePath, GLOB_ONLYDIR);
getDir($arrFiles, $name);

function getDir($arrFiles, $post, $dir = [])
{
    if (count($arrFiles) !== 0) {
        foreach ($arrFiles as $folder) {
            $layer = glob("$folder\\*");
            $timeStamp = date("Y-m-d", filectime($folder));
            $type = filetype($folder);
            //回傳dir結構
            $splitArr = explode('\\', $folder);
            $folder = $splitArr[count($splitArr) - 1];
            array_push($dir, array('text' => $folder, 'type' =>  $type, 'selectable' => 'false', 'tags' => [count($layer)], 'nodes' => [], 'timeStamp' => $timeStamp));


            //    nodes:[{text:'hello',  icon: 'bi bi-file-earmark-fill',dir:true}]

        }
        echo json_encode($dir, JSON_NUMERIC_CHECK);
    } else {
        // echo ("$post.資料夾不存在");
        return;
    };
};