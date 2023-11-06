<?php
header('Access-Control-Allow-Origin:http://localhost/');
header('Content-type:application/json;charset=utf-8');
//接收json檔案
ini_set('display_errors', 'off');
$filesArr = [];
$_POST = json_decode(file_get_contents('php://input'), true);
if (is_array($_POST)) {
        $DIR = __DIR__;
        $dir = dirname($DIR);
    foreach ($_POST as $jsonKey => $ArrayKey) {
        $ext = $extension = pathinfo($ArrayKey['name'],  PATHINFO_EXTENSION);
        // echo $ArrayKey['name'] . "=>" . json_encode($ArrayKey['data']);
        if ($ext === 'txt') { //辨別是否為txt檔案
            $type = $ArrayKey['type'];
            if ($type === 'multi') { //判斷檔案為zip還是單筆
                //更改擴展名
                $folder = $ArrayKey['folder'];
                $outputFolder =  explode('\\', $ArrayKey['folder']);
                //outputFolderStr用於zip的複雜資料夾判斷是否有resource與output，沒有就創建
                $outputFolderStr =  implode('\\', $outputFolder);
                $fileName = $ArrayKey['name'];
                $basename = basename($fileName, '.txt');
                $jsonfile = $basename . '.json';
                $zipInput = "$dir\\$folder\\resource";
                $zipOutput = "$dir\\$folder\\output";
                //將資料轉成JSON存入指定資料夾
                $jsonFile = json_encode($ArrayKey['data'], JSON_UNESCAPED_UNICODE);
                $jsonpath = "$dir\\$folder\\resource\\$jsonfile";
                //判斷zip資料夾存在
                if (!file_exists($jsonpath)) {
                    mkdir($zipInput, 0777, true);
                    mkdir($zipOutput, 0777, true);
                };
                //判斷是否存在檔案
                if (!file_exists($jsonpath)) {
                    $file = fopen($jsonpath, 'w', true);
                    fwrite($file, $jsonFile);
                    array_push($filesArr, array('text' => $fileName, 'state' => 'success', 'type' => 'file', 'path' => $folder,'info'=>'格式化上傳完成'));
                    // echo ('上傳完成!' );
                } else {
                    array_push($filesArr, array('text' => $fileName, 'state' => 'exist', 'type' => 'file', 'path' => $folder,'info'=>'資料已存在'));
                    // echo '檔案已存在!';
                };
            }
        } else {
            echo '檔名不正確 or 發生不可預期的錯誤';
        }
        //處理完後所有資料放到陣列回傳
        if ($jsonKey == ((count($_POST) - 1))) {
            
            print_r(json_encode($filesArr, JSON_UNESCAPED_UNICODE));
        }
    };
};

function create($filepath, $zip, $fileName = '', $p)
{
    $filew = fopen($filepath, 'w', true);
    fwrite($filew, $zip);
}