

/**
 * 用戶資料存取服務模塊
 * 從Controller獲取資料
 * 從Modal將資料過濾進行較驗，再傳回Controller
 */
class EmployeeService {
  #userRepository;
  constructor(UserRepository) {
    this.#userRepository = UserRepository;
  }


  browse = async (query) => {
    try {
      let { page, per_page } = query;
      per_page = Number(per_page);
      page = Number(page) * per_page;
      //查詢當前頁
      const result = await this.#userRepository.browse(page, per_page);
      return { data: result, status: 200 };
    } catch (error) {
      return { msg: error, status: 500 };
    }
  }

  /**
* 更新個人資料
 @param { object } userInfo
* @return {Promise.<object>}
*/
  edit = async (userInfo) => {

    try {
      const { body, session, sessionID, user } = userInfo;
      console.log("user:", user)
      console.log("body:", body)
      const updateUserData = { ...user, ...body };
      console.log("updateUserData:",updateUserData)
      const result = await this.#userRepository.edit(body, updateUserData, sessionID);

      // if (result.status === 200) {
      //   session.user = updateUserData;
      // }
      return { msg: result, status: 200 };

    } catch (error) {
      return { msg: error, status: 500 };
    }
  }


  /**
  *修改用戶資料
  @param { object } userInfo
 * @return {Promise.<object>}
 */
  update = async (userInfo, params) => {
    try {
      
      const userSessionData = await this.#userRepository.read(params.id);
      delete userInfo.position_id;
     //合併新、舊資料
      const newUserInfo = { ...JSON.parse(userSessionData.data), ...userInfo }

      const result = await this.#userRepository.update(userInfo, JSON.stringify(newUserInfo));
      return { status: 200, msg: result };
    } catch (error) {
      
      return { msg: error, status: 409 };;
    }

  }

  add = async (userInfo) => {
    try {
      const result = await this.#userRepository.createUser(userInfo);

      return { msg: result, status: 200 };
    } catch (error) {
      return { msg: error, status: 500 };
    }
  }

  delete = async (user_id)=>{
    try {

      const result = await this.#userRepository.delete(user_id);

      return { msg: result, status: 200 };
    } catch (error) {
      return { msg: error, status: 409 };
    }
  }

}


module.exports = EmployeeService;