import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, createRoutesFromElements, redirect, json } from "react-router-dom";
import App from "../App";
import Test from "../Authentication/test";
import Login from "../Authentication/login";
import Register from "../Authentication/register";
const reg = new RegExp(/[^\u4e00-\u9fa5a-zA-Z0-9]+/i);
const space = new RegExp(/\d/i);
const mail = new RegExp(/^\w+(\w+)*@\w+([.]\w+)*\.\w+([-.]\w+)*$/i);

async function sessionCheck(params) {

    let res = await fetch('http://localhost:3301/login'
      , {
        credentials: 'include',
        mode: 'cors',
      },
    )
  if (res.status == '403') {
    return redirect('/login')

  };
  if(res.status=='200') return redirect('/Dashboard')
    // return await res.json();
    
  


  
 
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
    // loader: sessionCheck,
    children: [
      {
        path: 'Register',
        element: <Register />,
        action: async ({ request }) => {
          const data = await request.formData();
          const dataMap = new Map(data);
          const submission={};
          dataMap.forEach((value,key)=>{
            submission[key] = value;
          })
          
          const name = submission.LastName.concat(submission.FirstName);
          //send post here(api)
          if (reg.test(name)) {
            return { name, msg: '姓名禁止@,!~<%等特殊字元!', icon: 'account' }
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
          let res = await fetch('http://localhost:3301/users/register', {
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
        },
        errorElement: <h1>網路連接失敗，請確保網路是否正常!</h1>

      },
      {

        path: 'Login',
        element: <Login />,
        action: async ({ request }) => {
          const data = await request.formData();
          const loginInfo = new Map(data);
          const submission = {keeping:false}
          loginInfo.forEach((value,key)=>{
            if (value == '') return { msg: '登入欄位不可空!', icon: 'rest' };
            if( key == 'password') value = btoa(value);
            submission[key] = value;
          })
          
          let res = await fetch('http://localhost:3301/login', {
            method: 'POST',
            body: JSON.stringify(submission),
            credentials: 'include',
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          
            
          })
          if (res.status == '200') {
            return redirect('/DashBoard');
          }
          
          return await res.json()
        },
        
        errorElement: <h1>網路連接失敗，請確保網路是否正常!</h1>,
      
      }
    ]
  },
  {
    path: '/DashBoard',
    element: <App />,

  },
  {
    path: "*",
    element: <h1>this page not found</h1>,
    
  }

])
export { router }