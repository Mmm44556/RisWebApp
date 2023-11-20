

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
      return { current: result,status:200 };
    } catch (error) {
      return {msg:error,status:500};
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
      const updateUserData = { ...user, ...body };
      const result = await this.#userRepository.edit(body, updateUserData, sessionID);
      if (result.status === 200) {
        session.user = updateUserData;
      }
      return result;

    } catch (error) {
      return error;
    }
  }


  /**
  *修改用戶資料
  @param { object } userInfo
 * @return {Promise.<object>}
 */
  update = async (userInfo) => {
try {
  const { user_id,role_uid } = userInfo;
  const userSessionData = await this.#userRepository.read(user_id);
  delete userInfo.position_id;

  const newUserInfo = { ...JSON.parse(userSessionData.data), ...userInfo }
  // console.log(newUserInfo)
  const result = await this.#userRepository.update(userInfo, JSON.stringify(newUserInfo));
  return result;
} catch (error) {
  return error;
}
    
  }



}


module.exports = EmployeeService;