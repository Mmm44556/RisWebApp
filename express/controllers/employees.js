
/**
 *  處理用戶資料存取Controller
 */
class EmployeeController {
  constructor(userService) {
    this._userService = userService;

  }

  browse = async (req, res) => {
    // const {}
    console.log(req)
    res.send('123')
  }
  read = async (req, res) => {

  }

  /**
* 處理用戶更新並返回更新結果
* @return {Promise.<object>} 
*/
  edit = async (req, res) => {
    const { body, session, sessionID, user } = req;

    const result = await this._userService.Update({ body, session, sessionID, user });
    res.status(result.status).send(result.msg)
  }


  add = async (req, res) => {

  }

  delete = async (req, res) => {

  }







}

module.exports = EmployeeController;