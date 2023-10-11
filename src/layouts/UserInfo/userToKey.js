import {Fragment } from 'react'
const userToKeys = {
  normalInfo: (param) => {
    let userArr = [];
    param = new Map(Object.entries(param));
    param.delete("role_uid");
    const key = {
      user_name: '名稱',
      user_mail: '信箱',
      user_sex: '性別',
      user_age: '年齡',
      user_phone: '電話'
    };
    param.forEach((v, k) => {
      userArr.push(<Fragment key={k}>
        <tr >
          <td className='p-3 fs-5'>{key[k]}</td>
          <td className='p-3' >{v}</td>
        </tr>
      </Fragment>)
    })
    return userArr;
  },
  medicalInfo: (param) => {
    let userArr = [];
    param = new Map(Object.entries(param));
    const key = {
      department_name: '部門',
      position_name: '職稱',
      user_reports: '報告量'
    }
    param.forEach((v, k) => {
      userArr.push(<Fragment key={k}>
        <tr >
          <td className='p-3 fs-5'>{key[k]}</td>
          <td className='p-3' >{v}</td>
        </tr>
      </Fragment>)
    })
    return userArr;
  },
  restInfo:(param) => {
      let userArr = [];
      param = new Map(Object.entries(param));
      const key = {
        user_register_time: '註冊時間',
        lastTimeLogin:'上次登入時間'
      }
      param.forEach((v, k) => {
        if (k == 'user_register_time') v = new Date(v).toUTCString();
        userArr.push(<Fragment key={k}>
          <tr >
            <td className='p-3 fs-5'>{key[k]}</td>
            <td className='p-3' >{v}</td>
          </tr>
        </Fragment>)
      })
      return userArr;
    }
}

export { userToKeys }
