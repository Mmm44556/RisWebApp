
import { redirect } from "react-router-dom";
import { decodeBase64 } from "./decodeJson";
async function sessionCheck() { 

  let res = await fetch(`${process.env.REACT_APP_DEV_BASE_URL}/login`
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
    return dataDecodeJson;
  }
  }

async function sessionCheck2() {
  let res = await fetch(`${process.env.REACT_APP_DEV_BASE_URL}/login`, {
    credentials: 'include',
    mode: 'cors',
  },
  )
  if (res.status == '200') return redirect('/Dashboard/dataList')
  return '';
}

export { sessionCheck, sessionCheck2 }