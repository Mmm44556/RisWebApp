import { useCallback, useMemo } from 'react';
import { reducer } from './userReducer';
function useLogin(user='') {
  //初始化用於處理登入
  const {user_name,user_sex,user_age,user_phone,user_mail,role_uid } = user
  const profile = { user_name, user_sex, user_age, user_mail, user_phone, role_uid }
  const initial = useMemo(() => profile, [user])
  const reducers = useCallback(reducer, [initial]);
 
  return [initial, reducers]
}
export { useLogin }