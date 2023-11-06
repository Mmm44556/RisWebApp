
import { redirect, defer } from "react-router-dom";
import { decodeBase64 } from "./decodeJson";
async function sessionCheck() {
  try {
    let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/login`
      , {
        credentials: 'include',
        mode: 'cors',
      },
    )
    if (res.status == '401') {
      alert('登入已逾時，請重新登入!');
      return redirect('/login')
    }
    if (res.status == '200') {
      let DataBase64Encode = await res.text();
      const dataDecodeJson = decodeBase64(DataBase64Encode);
      return defer(dataDecodeJson);
    }
  } catch (error) {
    console.log(error)
    redirect('/login')
  }

}

async function sessionCheck2() {
  let res = await fetch(`${import.meta.env.VITE_VAR_BASE_URL}/login`, {
    credentials: 'include',
    mode: 'cors',
  },
  )
  if (res.status == '200') return redirect('/DashBoard/dataList')
  return '';
}

export { sessionCheck, sessionCheck2 }