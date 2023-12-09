
const firestoreDB = require('../mysql/firebase');
const firestore = require('firebase/firestore');

const moment = require('moment');
const { addDoc, collection, doc, setDoc, query, where, getDoc, getDocs ,getCountFromServer} = firestore;


/**
* 檔案物件
* @typedef {object} File
* @property {string} UID 上傳者uid
* @property {string} owner 上傳者名稱
* @property {string} title  病例號
* @property {string} patient 病患姓名
* @property {string} department 部門(內科、外科、骨科、放射科)
* @property {string} type 檔案類型(門診、健檢、急診、住院、體檢)
* @property {string} parts 檢查部位
(Liver、Chest、Kidney、Spleen、Liver Transplant) 
* @property {string} inspection  檢查方法(CT、MRI)
* @property {object} description 額外描述
* @property {object} state.proposal 狀態:
完成、未完成、醫師提出是否回覆
* @property {object} state.review 是否被列入覆閱工作
* @property {array} group 訪問權限
* @property {object} date 額外描述
* @property {object} date.created 創建時間
* @property {string} date.deadline 剩餘時間
* @property {string} date.update 更新時間
*/




class IFilesRepository {

  connectDB() {
    return this._firestoreDB = firestoreDB;
  }

  /**
   * 新增報告
   * @param {array} readAllFile 要新增的資料陣列 
   * @param {*} privateInfo 上傳者資訊描述
   */
  addNewDoc = async (readAllFile, privateInfo) => {

  }
  /**
   * 瀏覽各部門報告描述
   */
  browseDocs = async () => {

    

  }

}


class FilesRepository extends IFilesRepository {
  constructor() {
    super();
    this.connectDB();
  }


  browseDocs = async () => {
    //查詢所有部門報告數量
    const result = ['INTERNAL', 'SURGERY', 'ORTHOPEDICS', 'RADIOLOGY', "PROPOSAL", "REVIEWS", "PRECESS"].map(async(e)=>{
      const depart = firestore.collection(firestoreDB, e);
      const num = (await getCountFromServer(depart)).data().count;
      return {[e]:num};
    })
    return result
  }


  addNewDoc = async (readAllFile, privateInfo) => {
    const { permission } = privateInfo;
    let time = privateInfo.deadline ?? "";
    if (Object.hasOwn(privateInfo, 'deadline')) {
      delete privateInfo.deadline;
    }


    const responses = readAllFile.map(async (e) => {
      const group = permission ? ["editor", "visitor"] : ["editor"];
      const a = privateInfo.department == "RADIOLOGY" ? { ...e } : e;
      //預設屬性
      const mergePrivateInfo = {
        ...privateInfo,
        state: {
          proposal: false,
          review: false
        },
        group,
        date: {
          deadline: time,
          update: "",
          created: moment().format("YYYY-MM-DDThh:mm:ss")
        }
      }
      const department = await addDoc(collection(firestoreDB, privateInfo.department), { ...mergePrivateInfo });
      //拿到描述文件的hash ID
      const data = doc(firestoreDB, 'data', department.id);
      //透過hash id 存入另個data collection
      const dataCollections = await setDoc(data, { a });

      return dataCollections;
    });
    return responses;
  }


}




module.exports = FilesRepository;