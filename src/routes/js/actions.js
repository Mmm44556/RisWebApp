import { redirect } from "react-router-dom";

const reg = new RegExp(/[^\u4e00-\u9fa5a-zA-Z0-9]+/i);
const space = new RegExp(/\d/i);
const mail = new RegExp(/^\w+(\w+)*@\w+([.]\w+)*\.\w+([-.]\w+)*$/i);

async function loginAction({ request }) {
  //登入驗證
  const data = await request.formData();
  const loginInfo = new Map(data);
  const submission = { keeping: false }
  loginInfo.forEach((value, key) => {
    if (value == '') return { msg: '登入欄位不可空!', icon: 'rest' };
    if (key == 'password') value = btoa(value);
    submission[key] = value;
  })

  let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(submission),
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.status == '200') {
    return redirect('/DashBoard');
  }
  const result = await res.json()
  return result;
}


async function saveUserInfoAction({ request, params }) {
  const form = await request.formData();
  const UpdatedUserInfo = new Map(form);
  let UserInfoJson;
  UpdatedUserInfo.forEach((v, key, map) => {
    v.trim();
    if (key == 'user_password') map.set(key, btoa(v));
  })
  UserInfoJson = Object.fromEntries(UpdatedUserInfo);
  console.log(UserInfoJson, "profile", request);
  console.log('!!!', UserInfoJson);
  let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/user`, {
    method: request.method,
    body: JSON.stringify(UserInfoJson),
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(await res.json());

  return "noting"
}


async function registerAction({ request }) {

  const data = await request.formData();
  const dataMap = new Map(data);
  const submission = {};
  dataMap.forEach((value, key) => {
    submission[key] = value;
  })

  //send post here(api)
  if (reg.test(submission.name)) {
    return { msg: '姓名禁止@,!~<%等特殊字元!', icon: 'account' }
  }
  if (!mail.test(submission.email)) {
    return { msg: '信箱格式錯誤!', icon: 'mail' }
  }
  if (!space.test(submission.age)) {
    return { msg: '請填入年齡!', icon: 'rest' }
  }
  if (submission.gender == null) {
    return { msg: '請填選性別!', icon: 'rest' }
  }
  if (submission.password !== submission.confirmPassword) {
    return { msg: '請確認密碼是否相同!', icon: 'password' }
  }

  delete submission.password
  submission.confirmPassword = btoa(submission.confirmPassword)
  let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(submission),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    return { msg: await res.text(), icon: 'rest' }
  }

  return { msg: 'ok', info: '註冊成功，請重新登入' };


}

export { loginAction, registerAction, saveUserInfoAction }