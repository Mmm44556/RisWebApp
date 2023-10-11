
import { redirect } from "react-router-dom";
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
  let json = await res.json();
  return json;
}
async function sessionCheck2() {
  let res = await fetch(`${process.env.REACT_APP_DEV_BASE_URL}/login`, {
    credentials: 'include',
    mode: 'cors',
  },
  )
  if (res.status == '200') return redirect('/Dashboard')
  return '';
}

export { sessionCheck, sessionCheck2 }