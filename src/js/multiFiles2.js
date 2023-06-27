const openBtn = document.querySelector('.openInfo');
const closeBtn = document.querySelector('.closeInfo');
const breadPath = document.querySelector('.dirCrumb');
const uploadInfo = document.querySelector('.text');
const uploader = document.querySelector('.uploader')

//全局監聽檔案上傳事件


// $('#infoTree').treeview('addNode', [0, { node: { text: '123' } }])
uploader.addEventListener('change', function (event) {
    $('#filesTree').treeview('uncheckAll', { silent: true });
    event.stopImmediatePropagation();
    // let dataset =event.target.dataset.item;

    if (event.target && (event.target.matches(`input[id="directory"]`) || event.target.matches(`input[id="multi"]`)) && breadPath.children.length >= 2) {

        const files = event.target.files;





        let filesArray = Array.from(files);
        // console.log(filesArray)
        //存放處理完後的資料當作json傳輸(包括切割失敗的)
        let objArry = [];
        // console.log('處理前:', filesArray);
        //獲取fileList,將其轉為陣列
        filesArray.forEach((blob, index, array) => {
            let fileName = blob.name;



            let filesLength = array.length;
            let reader = new FileReader();
            reader.readAsText(blob);

            reader.onload = () => {
                let result = reader.result;
                let pathAr = Array.from(breadPath.children);
                let finalPath = pathProcess(pathAr);


                if (finalPath == undefined) return;
                let obj = dataProcess(result, fileName, finalPath);
                objArry.push(obj);
            }

            reader.onerror = () => {
                console.log('<!請確保檔案類型正確!>', reader.error);
            }


            //判斷資料處理結束觸發
            if (index + 1 === filesLength) {
                reader.onloadend = () => {
                    let objArryCopy = structuredClone(objArry);
                    //複製一份上傳的files作為上傳資訊
                    showInfo(objArryCopy);

                    //把格式化失敗的檔案回傳出來
                    let errorFiles = objArry.filter(e => {
                        if (e.state == 'error') {
                            e.text = e.name;
                            delete e.name;
                            return e;

                        }
                    })


                    //json陣列中如果有undefined資料就攔截，如果報告不符合格式資料會屬於undefined
                    let Arrystate = objArry.some(data => data.state === 'ready');

                    if (Arrystate) {
                        //把處理成功的檔案過濾出來
                        let newObjArry = objArry.filter(work => work.state === 'ready');
                        // console.log(newObjArry);
                        newObjArry.forEach((e) => {
                            e['type'] = 'multi';
                        })

                        // console.log(newObjArry)

                        let result = postData(newObjArry);
                        // console.log('處理完:', newObjArry)
                        result.then((r) => {
                            //將上傳路徑與當前路徑匹配，再去新增展示區節點
                            let currentPath = Array.from(breadPath.children);
                            let uploadPath = Array.from(breadPath.children);
                            uploadPath = pathProcess(uploadPath);
                            uploadArrow = uploadPath.replaceAll('\\', '>');
                            // console.log(uploadPath)
                            currentPath.forEach((e, index, arr) => arr[index] = e.innerHTML);
                            currentPath = currentPath.join('>');
                            let mat = `^${uploadArrow}$`;
                            let reg = new RegExp(mat);

                            //選到上傳的resource資料夾後重置新增節點
                            if (reg.test(currentPath)) {
                                let checkFiles = getLayer(uploadPath);

                                checkFiles.then((r) => {
                                    $('#filesTree').treeview('deleteChildrenNode', 0);
                                    r.forEach((e) => {
                                        $('#filesTree').treeview('addNode', [0, { node: template(e) }]);
                                    });
                                });


                            };
                            //回傳上傳結果
                            let result = JSON.parse(r);
                            let includeErr = result.concat(errorFiles);
                            $('.filesInfo').removeClass('visually-hidden')
                            $('.closeInfo').removeClass('visually-hidden')
                            $('.filesContent').addClass('show');
                            setTimeout(() => {
                                uploadFileDone(includeErr)
                            }, 1500);

                        }).finally(() => {
                            // console.log('done')
                            event.target.value = '';
                        })
                        event.target.value = '';
                    } else {
                        //展示格式化錯誤訊息
                        $('.filesInfo').removeClass('visually-hidden')
                        $('.closeInfo').removeClass('visually-hidden')
                        $('.filesContent').addClass('show');

                        // console.log('檔案上傳失敗，請確保格式內容!');

                        uploadFileDone(errorFiles);
                        setTimeout(() => {
                            uploadInfo.innerHTML = '資料處理結束<i class="bi bi-check-lg" ></i>';
                        }, 1000);
                        event.target.value = '';
                        // uploadInfo.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                        //     <span class="visually-hidden">Loading...</span>
                        //   </div>資料處理中...`;
                    }


                };
            };
        });

    } else if (event.target.matches(`input[id="zip"]`)) {
        event.target.value = '';
        return;
    } else {
        alert('請選擇資料夾');
        event.target.value = '';
        return;
    };
});

openBtn.addEventListener('click', () => {

    $('.filesInfo').toggleClass('visually-hidden')
    $('.closeInfo').toggleClass('visually-hidden')
    $('.filesContent').removeClass('show');
    uploadInfo.innerHTML = ''
})
closeBtn.addEventListener('click', () => {

    $('.filesInfo').addClass('visually-hidden')
    $('.closeInfo').addClass('visually-hidden')
    $('#infoTree').treeview({ nodes: [] });

})

//上傳資訊狀態`<i class="bi bi-check-square-fill"></i>` 
function showInfo(filesInfoArry) {
    filesInfoArry.forEach((e, index, arr) => {
        return (arr[index] = {
            text: `
        <div class="container-fluid "><div class="row  "><div class="col-md-9" style="font-Size:14px">
                <i class="bi bi-file-earmark-fill text-primary px-1"></i>${e.name}</div>
                <div class="col-md-3">${e.state == 'ready' ? `<div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`: `<i class="bi bi-x-square-fill stooltip"  
              ><span class="tooltiptext">格式化失敗，  請確保內容正確</span></i>`}</div>
            </div>
        </div>`,
            path: e.folder

        })
    })
    $('#infoTree').treeview({
        data: filesInfoArry,
        showIcon: false,
        Indent: false,
        showexpandIcon: false,
    })

    uploadInfo.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>資料處理中...`;

}

//資料上傳完成狀態
function uploadFileDone(result) {
    // data-toggle="tooltip" title="Title Here"
    result.forEach((e, index, arr) => {
        return (arr[index] = {
            text: `
        <div class="container-fluid "><div class="row  "><div class="col-md-9 "style="font-Size:14px" >
                <i class="bi bi-file-earmark-fill text-primary px-1"></i>${e.text}</div>
                <div class="col-md-3">${e.state == 'success' ? `<i class="bi bi-check-square-fill stooltip"
                ><span class="tooltiptext">上傳完成</span></i>`
                    : e.state == 'exist' ? `<i class="bi bi-exclamation-triangle-fill stooltip"><span class="tooltiptext">檔案已存在</span></i>` : `<i class="bi bi-x-square-fill stooltip"  
                ><span class="tooltiptext">格式化失敗，請確保內容正確</span></i>`}</div>
            </div>
        </div>`,
            path: e.path,
            selectable: false,


        })
    })
    $('#infoTree').treeview({
        data: result,
        showIcon: false,
        Indent: false,
        showexpandIcon: false,

    })
    uploadInfo.innerHTML = '資料處理結束<i class="bi bi-check-lg" ></i>';

}



//----------------資料處理開始-----------------------//



//json檔案宣告
function dataProcess(originData = "", filename = "", folderName = "") {

    try {
        //用於儲存段落關鍵字
        let keyword = "";
        // 正則表達式 選取對象，於開頭的 "任意文字:" (含大小寫) or 任何含AJCC的行
        const reg2 = /^.*imp.*\:|.*ajcc.*|.*findings.*|.*impression.*:/img;
        //再把各段落切出來
        let section = originData.split(reg2);
        //最後要輸出出去的json物件
        let jsonObject = { "name": filename, "data": [], 'state': 'ready', 'folder': folderName };
        //先抓出段落關鍵字
        keyword = originData.match(reg2);
        //將keyword反轉，防止文件有額外說明
        keyword.reverse();
        section.forEach((item, index, arr) => {
            arr[index] = item.split('\r\n');
        })
        //將非換行字元提出
        let r = /^\s*$/;
        section.forEach((item, index, arr) => {
            arr[index] = item.filter((item2) => {
                if (!(r.test(item2))) return item2;
            })
            jsonObject.data.push({ "Type": 'additonal', "Sentences": arr[index] });
        });
        keyword.forEach((e, index, arr) => {
            let i = arr.length - index;
            // console.log(i)
            jsonObject.data[i].Type = e;
        })
        return jsonObject;
    } catch (e) {
        console.log(`${filename}資料處理失敗，請確保格式內容!`);
        return { name: filename, state: 'error' };
    }

}

//----------------資料處理結束-----------------------//




//上傳json檔案
async function postData(Json) {
    try {
        const response = await fetch('../api/json.php', {
            method: 'POST',
            body: JSON.stringify(Json),
            headers: {
                'Content-Type': "application/json; charset=UTF-8",
            }
        })
        return response.text();
    } catch (error) {
        console.log(error);
    }
}

//處理路徑
function pathProcess(path) {

    if (path.length <= 2) {
        if (path.length == 1) {
            // alert('請選定資料夾2')
            return;
        } else {
            path.forEach((e, index, arr) => {
                arr[index] = e.innerHTML;

            })
            path.push('resource');

            return path.join('\\');
        }
    } else {
        path.forEach((e, index, arr) => {
            arr[index] = e.innerHTML;
            //路徑遇到output||resource會結束路徑組合，再把resource放到最後一個
            if (arr[index] == 'output' || arr[index] == 'resource') {
                let len = ((arr.length) - 1);
                arr.pop();
                return;
            };
        })
        path.push('resource');
        return path.join('\\');
    }


}
