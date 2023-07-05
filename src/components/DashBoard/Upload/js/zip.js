let ZipButtion = document.getElementById('zip');


ZipButtion.addEventListener('change', (fileInput) => {
    $('#filesTree').treeview('uncheckAll', { silent: true });

    //獲取zip的data-zip
    // let zipsdata = fileInput.target.files[0];
    // console.log(zipsdata)


    let reader = new FileReader();
    reader.onload = function (e) {

        //非同步讀取zip
        JSZip.loadAsync(e.target.result).then(function (zip) {
            //回傳zip物件，將values轉為陣列
            let obj = Object.values(zip.files)
            // console.log(e.target.result)



            //dir的blob也會存在，過濾掉dir的blob
            let noDirArr = obj.filter(blob => {
                let filename = blob.name.split('/');
                let length = filename.length;
                let extReg = /.txt$/i;
                //將txt檔案匹配出來
                return extReg.test(filename[length - 1])

            })

            // console.log(noDirArr)
            let zipArr = [];
            let uploadPath = Array.from(breadPath.children);
            uploadPath = pathProcess(uploadPath);
            let pa = uploadPath.split('\\');
            pa.pop();
            pa = pa.join('/');
            // console.log(pa);
            noDirArr.map((file, index, zipLength) => {
                zip.files[file.name].async('string')
                    .then((fileStr) => {

                        // let lastindex = fileSplit[fileSplit.length - 1];
                        // //將解壓的檔案進行處理
                        let ZipFilesJson = dataProcess(fileStr, file.name, pa);
                        // //將資料放入陣列形成json格式
                        zipArr.push(ZipFilesJson);
                        // console.log(zipArr)
                        $('.filesInfo').removeClass('visually-hidden')
                        $('.closeInfo').removeClass('visually-hidden')
                        $('.filesContent').addClass('show');
                        let copy = structuredClone(zipArr);
                        showInfo(copy)
                        if (index + 1 === zipLength.length) {
                            //把成功處理的資料拿出來
                            
                            let newZipArr = zipArr.filter(v => v.state === 'ready');

                            newZipArr.forEach((e, index, arr) => {

                                let strArr = e.name.split('/');
                                let len = strArr.length;
                                // console.log(strArr)
                                if (len === 1) {
                                    strArr.unshift('resource');
                                } else {
                                    let name = strArr.pop();
                                    strArr.push('resource', name);


                                }
                                // console.log(strArr)
                                let file = strArr.pop();
                                let outpath = structuredClone(strArr);
                                let outLength = outpath.length;



                                if (outLength === 1) {
                                    outpath.shift();
                                    outpath.push('output');

                                } else {
                                    outpath.pop();
                                    outpath.push('output');
                                }
                                // console.log(file, outpath);

                                e.nestedFolder = strArr.toString().replaceAll(',', '/');
                                e.output = outpath.toString().replaceAll(',', '/');
                                e['name'] = file;
                                e['type'] = 'zip';



                            })


                            // console.log(newZipArr);
                           

                            // uploadArrow = uploadPath.replaceAll('\\', '>');

                            postData(newZipArr)
                                .then(r => {
                                      
                                        let json =JSON.parse(r)
                                        json.forEach((e,index,arr)=>{
                                            arr[index].text = e.path
                                        })
                                        console.log(json)
                                        uploadFileDone(json)

                                    fileInput.target.value = "";
                                }).finally(()=>{
                                    
                     
                                })


                        }

                    })




            })





        }).catch(function (err) {
            alert('請選擇資料夾!')
            console.error(` 不屬於zip檔案or不支持加密zip!`);
            fileInput.target.value = "";
        })
        //     reader.onerror = function (err) {
        //         console.error(`壓縮檔讀取失敗，請確保資料夾檔案正確!${err}`);
        // }


    }
    let zipFile = structuredClone(fileInput.target.files[0]);

    reader.readAsArrayBuffer(zipFile);

})










// files.onchange = function () {
        //     let filesArray = Array.from(files.files);
        //     //獲取fileList,將其轉為陣列
        //     console.log(filesArray)
        //     // filesArray.forEach((blob) => {
        //     //     let reader = new FileReader();
        //     //     reader.readAsText(blob);

        //     //     return reader.onload = () => {
        //     //         document.querySelector('body').classList.toggle('toggle-sidebar')//控制開合
        //     //         const originData = reader.result;
        //     //         let fileName = blob.name;
        //     //         let jsonObj = dataProcess(originData);
        //     //         // keywordShow();

        //     //         // contentShow();
        //     //         let str_obj = JSON.stringify(jsonObj);
        //     //         let json = new Blob([str_obj], {
        //     //             type: "application/json;charset = utf-8",
        //     //         });

        //     //         // console.log(jsonObj)
        //     //         // postData(json, fileName);//發送json檔案到後端
        //     //         //  clearOldData(); //每次下載完都要呼叫清理舊資料的函式
        //     //     }

        //     // })

        //     //非同步發送(POST)資料到後端
        //     async function postData(json, fileName) {
        //         //接收到json(blob物件)、fileName(檔案名稱)

        //         let formData = new FormData();
        //         //創建表單物件，透過append(key,value,檔案名稱)形式將檔案放入表單
        //         formData.append('file', json, fileName);

        //         try {
        //             const response = await fetch('http://localhost/index.php', {
        //                 method: 'POST',
        //                 body: formData
        //             })
        //             // console.log(formData.get('file'))
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }

        // //JSON按鈕動態增加(尚未撰寫,暫放)
        // // json_file.href = URL.createObjectURL(json);
        // // json_file.download = 'abc';

        // // //資料處理函式
        // function dataProcess(originData) {
        //     const splitKeyWord = "\r\n";
        //     //切割用keyword 需要調整從這邊弄
        //     const reg = /^\w[a-zA-z]+\:|.*AJCC.*|.*ajcc.*/mg;
        //     // 正則表達式 選取對象
        //     // 於開頭的 "任意文字:" (含大小寫) or 任何含AJCC的行
        //     let section = originData.split(reg);
        //     // 先切段落
        //     let keyword = ""; //用於儲存段落關鍵字
        //     let contentArray = ""; //用於儲存段落內容
        //     let jsonObject = { "data": [] }; //最後要輸出出去的json物件
        //     let updateArray = [];
        //     let processedData = "";
        //     let contentShowSave = [];
        //     //json檔案宣告
        //     let outputData = "";
        //     let sentenceSave = [];
        //     let structureSave = [];
        //     keyword = originData.match(reg); //先抓出段落關鍵字
        //     section = originData.split(reg); //再把各段落切出來
        //     section = section.filter(v => v); //去除空值
        //     for (let i = 0; i < section.length; i++) {
        //         contentArray = section[i].split(splitKeyWord);
        //         for (let j = 0; j < contentArray.length; j++) {
        //             if (contentArray[j] === " ") { //去除切割完陣列的空白值
        //                 contentArray[j] = ""; //轉換成空值 之後一起去除
        //             }
        //         }
        //         contentArray = contentArray.filter(v => v); //去除空值
        //         contentShowSave[i] = contentArray;
        //         let objContent = {
        //             "Type": keyword[i],
        //             "Sentences":
        //                 contentArray
        //         };
        //         updateArray.push(objContent); //先push到陣列裡
        //         jsonObject.data = updateArray; //再把整個陣列丟進object裡
        //     }
        //     // console.log(JSON.stringify(jsonObject));

        //     return jsonObject;

        // }