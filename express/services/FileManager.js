

class FileManagerService {
  #filesRepository;
  constructor(filesRepository) {
    this.#filesRepository = filesRepository;
  }

  addNewDoc = async (file) => {
    console.log('file_service')
    this.#filesRepository.addNewDoc();
    return;
  }

  save() {

  }
  download() {

  }
  delete() {

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

module.exports = FileManagerService;