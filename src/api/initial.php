<?php
header('Access-Control-Allow-Origin:http://localhost/');
header('Access-Control-Request-Method:GET');
header('Content-type:application/json;charset=utf-8');

$dir = __DIR__;
$subDir = dirname($dir);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $POST = $_POST['dir'];
    $POST = "$POST\\*";
} else {
    $POST = 'data\\*';
}
$initialArr = [$subDir, $POST];
$path = implode('\\', $initialArr);
$files =  glob($path);
$ar = [];
// print_r($files);
if (count($files) !== 0) { //查詢檔案路徑
    foreach ($files as $key => $path) {
        $final = explode('\\', $path);
        // print_r($path);
        $timeStamp = date("Y-m-d", filectime($path));
        $type = filetype($path);
        $p = (count($final) - 1);
        array_push($ar, array('text' => strval($final[$p]), 'icon' => '', 'type' => $type, 'nodes' => [], 'timeStamp' => $timeStamp, 'filename' => strval($final[$p])));
        if ($key === (count($files) - 1)) { //查詢完成才回傳結構
            print_r(json_encode($ar, JSON_NUMERIC_CHECK));
        }
    }
} else {
    echo json_encode([array('type' => 'empty', 'selectable' => true)]);
};
