
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../components/DashBoard";
import Authentication from "../Authentication";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import DataList from "../pages/DataList";
import Profile from "../pages/Profile";
import { sessionCheck, sessionCheck2 } from "./js/sessionPrefetch";
import { loginAction, registerAction } from "./js/actions";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/DashBoard',
        element: <DashBoard />,
        id: "auth",
        loader: sessionCheck,
        errorElement: <h1>Please check the Internet</h1>,
        children: [
          {
            path: 'dataList',
            element: <DataList />,

          },
          {
            path: 'analysis',
            element: <h1>Analysis</h1>,

          },
          {
            path: 'user/:id',
            element: <Profile />,
            action: async ({ request, params }) => {
              const form = await request.formData();
              const UpdatedUserInfo = new Map(form);
              // UpdatedUserInfo.set("id", params.id);
              let UserInfoJson;
              UpdatedUserInfo.forEach((v, key, map) => {
                v.trim();
                UserInfoJson = Object.fromEntries(map);
              })
              console.log(UserInfoJson)
              // console.log('!!!',UserInfoJson);
              // let res = await fetch(`${process.env.REACT_APP_DEV_BASE_URL}/user`, {
              //   method: 'PUT',
              //   body: JSON.stringify(UserInfoJson),
              //   credentials: 'include',
              //   mode: 'cors',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              // })
              
              return "noting"
            },
            shouldRevalidate(){
              return false
            },

          },
          {
            path: 'employees',
            element: <h1>Employees</h1>
          },
          {
            path: 'logout',
            element: <h1>Logout</h1>
          },
        ]
      },
      {
        path: '/',
        element: <Authentication />,
        loader: sessionCheck2,
        errorElement: <h1>請確保網路連線正常!</h1>,
        children: [
          {
            path: 'Register',
            element: <Register />,
            action: registerAction,
            errorElement: <h1>網路連接失敗，請確保網路是否正常!</h1>

          },
          {
            path: 'Login',
            element: <Login />,
            action: loginAction,
            errorElement: <h1>網路連接失敗，請確保網路是否正常!</h1>,

          }
        ]
      },
    ]
  },

  {
    path: "*",
    element: <h1>this page not found</h1>,

  }

])
export { router }