const firestoreDB = require('../mysql/firebase');
const firestore = require('firebase/firestore');

const { addDoc } = firestore;


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
* @property {string} ext 檔案類型(.txt)
* @property {object} state 額外描述
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
   * 
   * @param {File} file
   */
  addNewDoc = async (file) => {

    return
  }


}


class FilesRepository extends IFilesRepository {
  constructor() {
    super();
    this.connectDB();
  }
  addNewDoc = async (file) => {

    return
  }

}




module.exports = FilesRepository;