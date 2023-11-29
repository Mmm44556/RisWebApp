
function userInitial(user = '') {

  //初始化用於處理登入

  let { user_name, user_sex, user_age, user_phone, user_mail, role_uid, user_register_time, department_name, position_name, lastTimeLogin, user_id,
  } = user;


  let normalInfo = { user_name, user_sex, user_age, user_mail, user_phone, role_uid, user_id};
  let medicalInfo = { department_name, position_name };
  let restInfo = { user_register_time, lastTimeLogin };

  if (Object.hasOwn(user, 'user_password')) {
    normalInfo.user_password = atob(user.user_password);
  }
  if (Object.hasOwn(user, 'uuid')) {
    normalInfo.uuid = user.uuid;
  }

  const initial = { normalInfo, medicalInfo, restInfo }


  return initial
}

export default userInitial 