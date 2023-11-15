

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

  /**
  * 更新用戶個人資料
   @param { object } userInfo
 * @return {Promise.<object>}
 */
Update = async (userInfo) => {

  try {
    const { body, session, sessionID, user } = userInfo;
    const updateUserData = { ...user, ...body };
    const result = await this.#userRepository.updateUser(body, updateUserData, sessionID);
    if (result.status === 200) { 
      session.user = updateUserData;
    }
    console.log(result)

    return result;

  } catch (error) {
    return error;
  }
}
    
}


module.exports = EmployeeService;