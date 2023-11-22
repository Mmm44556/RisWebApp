import { reducer } from './userReducer';
function useLogin(user = '') {


  //初始化用於處理登入

  
  let { user_name, user_sex, user_age, user_phone, user_mail, role_uid, user_register_time, department_name, position_name, lastTimeLogin, user_id, user_password
  } = user;
  user_password = atob(user_password)

  let normalInfo = { user_name, user_sex, user_age, user_mail, user_phone, role_uid, user_id, user_password };
  let medicalInfo = { department_name, position_name };
  let restInfo = { user_register_time, lastTimeLogin };
  const initial = { normalInfo, medicalInfo, restInfo }


  return [initial, reducer]
}

export { useLogin }