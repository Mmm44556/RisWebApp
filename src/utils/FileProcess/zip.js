
const JSZip = require("jszip");
export default function (zipFiles) {
  return new Promise((resolve, reject) => {

    let reader = new FileReader();

    reader.onload = function (e) {

      //非同步讀取zip
      JSZip.loadAsync(e.target.result).then(async function (zip) {

        //回傳zip物件，將values轉為陣列
        let obj = Object.values(zip.files)
        //dir的blob也會存在，過濾掉dir的blob
        let noDirArr = obj.filter((file) => !file.dir)
        let arr=[]
        //解壓zip後轉成blob再生成FILE物件給FileReader讀取文件內容
        for (let i = 0; i < noDirArr.length; i++) {
          let GeneratedBlob = await zip.files[noDirArr[i].name].async('blob')
          let FILE = new File([GeneratedBlob], noDirArr[i].name, { type: 'text/plain'})
          arr.push(FILE)
        }
        resolve(arr)
      }).catch(function (err) {
        alert('請選擇資料夾!')
        console.error(` 不屬於zip檔案or不支持加密zip!`);
        zipFiles.target.value = "";
      })
      //     reader.onerror = function (err) {
      //         console.error(`壓縮檔讀取失敗，請確保資料夾檔案正確!${err}`);
      // }


    }
    reader.readAsArrayBuffer(zipFiles[0]);
  })
}