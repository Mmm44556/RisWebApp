<?php
header('Access-Control-Allow-Origin:http://localhost/');
header('Content-type:application/json;charset=utf-8');
//階層式搜索
//    nodes:[{text:'hello',  icon: 'bi bi-file-earmark-fill',dir:true}]
// $post = '123\\new\\resource\\201608';
$post = $_POST['folderName'];
// $post = 'data\\123';
$para = "$post\\*";
$dir = __DIR__;
$subDir = dirname($dir);
$dirArr = [$subDir, '\\', $para];
$path = implode('', $dirArr);
$files =  glob($path);

print_r(preorder($files));
function preorder($arr, $a = [])
{
    if (count($arr) !== 0) {

        foreach ($arr as $key => $files) {
            $layer = glob("$files\\*");
            $name = dirname($files);
            if (filetype($files) === 'dir') {
                // print_r($layer);
                $timeStamp = date("Y-m-d", filectime($files));
                $type = filetype($files);

                $splitArr = explode('\\', $files);
                $folder = $splitArr[count($splitArr) - 1];
                $filtFolder = str_replace('/', '', $folder);
                array_push($a, array('text' => $folder, 'type' => $type, 'timeStamp' => $timeStamp, 'tags' => [count($layer)], 'nodes' => [], 'filename' => $filtFolder));

                if ($key === (count($arr) - 1)) {
                    print_r(json_encode($a));
                }
                // preorder($layer);
            } else {
                $fileTimeStamp = date("Y-m-d", filemtime($files));
                $fileType = filetype($files);
                $fileSize = filesize($files) / 1024;
                $splitArr = explode('\\', $files);
                $file = $splitArr[count($splitArr) - 1];
                array_push($a, array('text' => $file, 'selectable' => true, 'type' => $fileType, 'timeStamp' => $fileTimeStamp, 'size' => round($fileSize, 3), 'icon' => 'bi bi-file-earmark-fill', 'state' => array(), 'filename' => $file));
                // print_r($files);echo '|檔案|<br>';
                
                // print_r(json_encode(array('text' => $file, 'selectable' => true, 'type' => $fileType, 'timeStamp' => $fileTimeStamp, 'size' => round($fileSize, 3), 'icon' => 'bi bi-file-earmark-fill', 'state' => array(), 'filename' => $file),JSON_UNESCAPED_UNICODE)) ;
                if ($key === (count($arr) - 1)) {
                    print_r(json_encode($a));
                }
            }
        }
    } else {
        return json_encode(array(array('text' => 'No such files in here!', 'nodes' => 'n', 'type' => 0,)));
        // echo "no files in this directory!!";
        // return error_reporting(E_ERROR);

    }
}
