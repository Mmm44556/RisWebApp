<?php
header('Access-Control-Allow-Origin:http://localhost/');
header('Content-type:application/json;charset=utf-8');
//接收json檔案
ini_set('display_errors', 'off');
$filesArr = [];
$_POST = json_decode(file_get_contents('php://input'), true);
if (is_array($_POST)) {
    foreach ($_POST as $jsonKey => $Arraykey) {
        $ext = $extension = pathinfo($Arraykey['name'],  PATHINFO_EXTENSION);
        // echo $Arraykey['name'] . "=>" . json_encode($Arraykey['data']);
        if ($ext === 'txt') { //辨別是否為txt檔案
            $type = $Arraykey['type'];
            if ($type === 'multi') { //判斷檔案為zip還是單筆
                //更改擴展名
                $folder = $Arraykey['folder'];
                $outputFolder =  explode('\\', $Arraykey['folder']);
                array_pop($outputFolder);
                array_push($outputFolder, 'output');
                //outputFolderStr用於zip的複雜資料夾判斷是否有resource與output，沒有就創建
                $outputFolderStr =  implode('\\', $outputFolder);
                $fileName = $Arraykey['name'];
                $basename = basename($fileName, '.txt');
                $jsonfile = $basename . '.json';
                $DIR = __DIR__;
                $dir = dirname($DIR);
                $zipInput = "$dir\\$folder";
                $zipOutput = "$dir\\$outputFolderStr";
                //將資料轉成JSON存入指定資料夾
                $jsonFile = json_encode($Arraykey['data'], JSON_UNESCAPED_UNICODE);
                $jsonpath = "$dir\\$folder\\$jsonfile";
                //判斷zip資料夾存在
                if (!file_exists($jsonpath)) {
                    mkdir($zipInput, 0777, true);
                    mkdir($zipOutput, 0777, true);
                };
                //判斷單多筆檔案
                if (!file_exists($jsonpath)) {
                    $file = fopen($jsonpath, 'w', true);
                    fwrite($file, $jsonFile);
                    array_push($filesArr, array('text' => $fileName, 'state' => 'success', 'type' => 'file', 'path' => $folder));
                    // echo ('上傳完成!' );
                } else {
                    array_push($filesArr, array('text' => $fileName, 'state' => 'exist', 'type' => 'file', 'path' => $folder));
                    // echo '檔案已存在!';
                };
            } else { //處理zip
                $zipFolder = $Arraykey['folder'];
                $zipFileName = $Arraykey['name'];
                $zipNested =  $Arraykey['nestedFolder'];
                $p = "$zipFolder/$zipNested";
                $output = $Arraykey['output'];
                $dir  = __DIR__;
                $DIR = dirname($dir);
                $basename = basename($zipFileName, '.txt');
                $jsonfile = $basename . '.json';
                $zipResource = "$DIR/$zipFolder/$zipNested";
                $zipOutput = "$DIR/$zipFolder/$output";
                $filepath  = "$zipResource/$jsonfile";

                if (!(file_exists($zipResource) && file_exists($zipOutput))) {
                    //創建resource,output(zip如果有換檔案路徑會多創建一次不過沒影響)
                    mkdir($zipOutput, 0777, true);
                    mkdir($zipResource, 0777, true);
                    $zip = json_encode($Arraykey['data'], JSON_UNESCAPED_UNICODE);
                    create($filepath, $zip, $jsonfile, $p);
                    array_push($filesArr, array('text' => $zipFileName, 'state' => 'success', 'type' => 'file', 'path' => $p));
                } else {

                    if (!file_exists($filepath)) {
                        $zip1 = json_encode($Arraykey['data'], JSON_UNESCAPED_UNICODE);
                        create($filepath, $zip1, $jsonfile, $p);
                        array_push($filesArr, array('text' => $zipFileName, 'state' => 'success', 'type' => 'file', 'path' => $p));
                    } else {
                        array_push($filesArr, array('text' => $zipFileName, 'state' => 'exist', 'type' => 'file', 'path' => $p));
                        // echo '檔案已存在!';
                    }
                }
            };
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
    // print_r(json_encode(array('text' => $fileName, 'state' => 'success', 'type' => 'file', 'path' => $p), JSON_UNESCAPED_UNICODE));
    // echo '上傳完成!';
}
