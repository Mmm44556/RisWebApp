
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Authentication from "@authentication";
import Login from "@authentication/Login";
import Register from "@authentication/Register";
import DashBoard from '@components/DashBoard';
import Employees from '@pages/Employees';
import { sessionCheck } from "./js/sessionPrefetch";
import { loginAction, registerAction, saveUserInfoAction } from "./js/actions";



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
        element:<DashBoard/>,
        children: [
          {
            path: 'dataList',
            lazy: async () => {
              let DataList = await import("@pages/dataList");
              return { Component: DataList.default }
            },

            children: [
              {
                path: '',
                lazy: async () => {
                  let { Root } = await import("@pages/dataList");
                  return { Component: Root }
                },
              },
              {
                path: 'type/*',
                lazy: async () => {
                  let Type = await import("@pages/dataList/Type");
                  return { Component: Type.default }
                },
              }
            ]
          },
          {
            path: 'uploader/*',
            lazy: async () => {
              let Uploader = await import("@pages/Uploader");
              return { Component: Uploader.default }
            },

          },
          {
            path: 'analysis',
            lazy: async () => {
              let Analysis = await import("@pages/Analysis");
              return { Component: Analysis.default }
            },

          },
          {
            path: 'user/:id',
            lazy: async () => {
              let Profile = await import("@pages/Profile");
              return { Component: Profile.default }
            },
            action: saveUserInfoAction,
            shouldRevalidate() {
              return false
            },

          },
          {
            path: 'employees/*',
            element: <Employees/>,
            action: registerAction
          },
          {
            path: 'notifications',
            async lazy() {
              let Notifications = await import("@pages/Notifications");
              return {
                Component: Notifications.default
              }
            },
          }
        ]
      },
      {
        path: '/',
        element: <Authentication />,
        loader: sessionCheck,
        errorElement: <h1>請確保網路連線正常!</h1>,
        children: [
          {
            path: 'sign-up/*',
            element: <Register />,
            action: registerAction,
            errorElement: <h1>網路連接失敗，請確保網路是否正常!</h1>

          },
          {
            path: 'sign-in/*',
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