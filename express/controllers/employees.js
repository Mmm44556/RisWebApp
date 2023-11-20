
/**
 *  處理用戶資料存取Controller
 */
class EmployeeController {
  constructor(userService) {
    this._userService = userService;

  }

  /**
   * 
   * 瀏覽系統內部所有用戶
   */
  browse = async (req, res) => {
    const { query } = req;
    const result = await this._userService.browse(query);

    res.status(result.status).send(result)
  }
  read = async (req, res) => {

  }

  /**
*修改用戶資料
* @return {Promise.<object>} 
*/
  update = async (req, res) => {
    const { body } = req;
    const result =await this._userService.update(body);
    console.log(result)
    res.status(result.status).send(result.msg);
  }

  /**
* 處理用戶更新並返回更新結果
* @return {Promise.<object>} 
*/
  edit = async (req, res) => {
    const { body, session, sessionID, user } = req;

    const result = await this._userService.edit({ body, session, sessionID, user });
    res.status(result.status).send(result.msg)
  }


  add = async (req, res) => {

  }

  delete = async (req, res) => {

  }







}

module.exports = EmployeeController;