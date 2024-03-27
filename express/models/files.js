
const firestoreDB = require('../mysql/firebase');
const firestore = require('firebase/firestore');

const moment = require('moment');
const { addDoc, collection, doc, setDoc, query, where, getDoc, startAfter, getDocs, orderBy, getCountFromServer, limit } = firestore;


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
   * 瀏覽各部門報告描述
   */
  browseDocs = async () => {

  }
  /**
   * 新增報告
   * @param {array} readAllFile 要新增的資料陣列 
   * @param {*} privateInfo 上傳者資訊描述
   */
  addNewDoc = async (readAllFile, privateInfo) => {

  }
  /**
   * 讀取部門報告
   * @param {string} type 部門類型
   */
  readDoc = async (type) => {

  }

}


class FilesRepository extends IFilesRepository {
  constructor() {
    super();
    this.connectDB();
  }


  browseDocs = async () => {
    //查詢所有部門報告數量
    const result = ['INTERNAL', 'SURGERY', 'ORTHOPEDICS', 'RADIOLOGY', "PROPOSAL", "REVIEWS", "PRECESS"].map(async (e) => {
      const depart = firestore.collection(firestoreDB, e);
      const num = (await getCountFromServer(depart)).data().count;

      return { [e]: num };
    })
    return result
  }


  addNewDoc = async (readAllFile, privateInfo, reports) => {
    const { permission } = privateInfo;
    let time = privateInfo.deadline ?? "";
    if (Object.hasOwn(privateInfo, 'deadline')) {
      delete privateInfo.deadline;
    }
    const group = permission ? ["editor", "visitor"] : ["editor"];
    // const data = privateInfo.department == "RADIOLOGY" ? { ...e } : e;
    //預設屬性
    const mergePrivateInfo = {
      ...privateInfo,
      group,
      date: {
        deadline: time,
        update: "",
        created: moment().format("YYYY-MM-DDThh:mm:ss")
      }
    }
    // console.log(reportName)
    const department = await addDoc(collection(firestoreDB, privateInfo.department), { ...mergePrivateInfo });
    const docRef = doc(firestoreDB, privateInfo.department, department.id);
    const subCollection = collection(docRef, 'data');
    const responses = readAllFile.map(async (e, idx) => {
      await addDoc(subCollection,
        {
          e,
          name: reports[idx].name,
          state: {
            proposal: false,
            review: false
          },
        })
      //拿到描述文件的hash ID
      // const DepartmentFiledData = doc(firestoreDB, 'data', department.id);
      //保存描述文件的hash id 存入另個data collection作為UID
      // const dataCollections = await setDoc(DepartmentFiledData, { data });
      // console.log(dataCollections, DepartmentFiledData)
      return '';
    });
    return responses;
  }

  readDoc = async (type, id) => {

    try {

      if (id) {
        const reports = [];
        //查詢該筆檔案的全部報告
        const currentReportDocRef = doc(firestoreDB, type, id);
        const reportCollection = await getDocs(collection(currentReportDocRef, 'data'));
        for (const report of reportCollection.docs) {
          reports.push({ ...report.data(), fileId: report.id });
        }
        return { status: 200, data: reports }
        // const lastVisible = await getDoc(doc(firestoreDB, type, id));

        // const next2 = query(collection(firestoreDB, type),
        //   orderBy('date.created', 'asc'),
        //   startAfter(lastVisible),
        //   limit(10)
        // );
        // const nextDocsSnapShots = await getDocs(next2);
        // nextDocsSnapShots.forEach(e => {
        //   const data = e.data();
        //   nextDocs.push({ data, fileId: e.id });
        // });
        // return { status: 200, data: nextDocs };

      } else {
        const docs = [];
        let departmentDocs = query(collection(firestoreDB, type),
          orderBy('date.created', 'asc'),
          limit(10),
        );
        const docsSnapShots = await getDocs(departmentDocs);
        for (const e of docsSnapShots.docs) {
          const data = e.data();
          docs.push({ data, fileId: e.id, reports: [] });
        }

        return { status: 200, data: docs };






      }

    } catch (error) {
      console.log(error);
      return { status: 500, data: error };
    }

    // const lastVisible = docsSnapShots.docs[docsSnapShots.docs.length - 1];

    // const next = query(collection(firestoreDB, type),
    //   orderBy('date.created', 'asc'),
    //   startAfter(lastVisible),
    //   limit(10)
    // );
    // console.log('第二頁:')

    // const nextSnapShots = (await getDocs(next));
    // nextSnapShots.forEach(e => {
    //   console.log(e.data(),e.id);
    // })
    return;
  }

}




module.exports = FilesRepository;