

/**
 * 資料查詢參數
 * @typedef {object} Query 檔案查詢物件
 * @property {string} query.page 頁數
 * @property {string} query.perPage 每頁資料
 * @property {number} query.delay 延遲回傳(second)
 */

/**
 * @typedef {Object} QueryResult 檔案查詢結果物件
 * @property {number} page
 * @property {number} per_page
 * @property {number} total
 * @property {number} total_page
 * @property {array} data
 */
class documentHandler {
  /**
   * @function 獲取檔案資料，依據查詢物件返回結果
   * @param {Query} query 
   * @return {QueryResult} 
   */
  getDoc(query) {
    return
  }

  save() {

  }
  download() {

  }
  delete() {

  }
}





class DocumentManager extends documentHandler {

  constructor() {
    super()
  }

}


/**檔案追蹤的詳細描述
 * @typedef {object} Description 
 * @property {string} description.name - 名稱  
 * @property {string} description.event 發生事件 
 * @property {string} description.identifier 唯一識別符  
 * @property {string} description.department 部門 
 * @property {string} description.location  檔案位置
 * @property {string} description.timeStamp  檔案生命週期
 * @property {object} description.own  創建人詳細資訊
*/
/**
 * @class 寫入、讀取檔案日誌
 */
class LogHandler {
  /**
   * @param {Description} description  檔案詳細描述
   */
  constructor(description) {
    this.description = description;

  }
  writeLog() {
  }
  readLog() {
  }
}