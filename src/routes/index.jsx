import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../components/DashBoard";
import Authentication from "../Authentication";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import DataList from "../pages/DataList";
// import Profile from "../pages/Profile";
import { sessionCheck, sessionCheck2 } from "./js/sessionPrefetch";
import { loginAction, registerAction, saveUserInfoAction } from "./js/actions";

const Profile = lazy(() => import("../pages/Profile"));
const Employees = lazy(() => import("../pages/Employees"));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    shouldRevalidate() {
      return false
    },
    children: [
      {
        path: 'DashBoard',
        element:
          <Suspense fallback={<h1>loading....</h1>}>
            <DashBoard />
          </Suspense>
        ,
        loader: sessionCheck,
        shouldRevalidate() {
          return false
        },
        errorElement: <h1>Please check the Internet</h1>,
        children: [
          {
            path: 'dataList',
            element: <DataList />,
            shouldRevalidate() {
              return false
            },
          },
          {
            path: 'analysis',
            element: <h1>Analysis</h1>,

          },
          {
            path: 'user/:id',
            element: <Profile />,
            action: saveUserInfoAction,
            shouldRevalidate() {
              return false
            },

          },
          {
            path: 'employees',
            element: <Employees />
          },
          {
            path: 'logout',
            element: <h1>Logout</h1>,
            action:async(req)=>{
              console.log(req)
              return null
            }
          },
        ]
      },
      {
        path: '/',
        element: <Authentication />,
        // loader: sessionCheck2,
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
    // element: <h1>this page not found</h1>,

  }

])
export { router }