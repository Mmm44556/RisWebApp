import { Fragment } from 'react';

const regex = /^\w+(\w+)*@\w+([.]\w+)*\.\w+([-.]\w+)*$/;

const fetcherState = {
  idle: false,
  submitting: true,
  loading: true,

}

function InputComponent(key, v, edit) {

  const editToKeys = {
    user_name: <>
      <input defaultValue={v}
        data-edit={edit}
        readOnly={!edit}
        name="name"
        type="text"
        pattern="[\u4e00-\u9fa5aA-z_a-z_0-9]{1,40}"
        spellCheck
        required
        maxLength="40"
        minLength="1" 
        key={'name'} /><p /></>,
    user_mail: <>
      <input defaultValue={v}
        data-edit={edit}
        readOnly={!edit}
        required
        maxLength="40"
        pattern={regex}
        type="email"
        name="mail" 
        key={"email"}/><p /></>,
    user_sex:
      <select name="sex" data-edit={edit} disabled={!edit} key={"sex"}>
        <option defaultValue={v}>{v}</option>
        <option defaultValue="Male">Male</option>
        <option defaultValue="Female">Female</option>
        <option defaultValue="Bisexual">Bisexual</option>
      </select>,
    user_age: <>
      <input defaultValue={v}
        data-edit={edit}
        readOnly={!edit}
        name="age"
        type="number"
        required
        min="20"
        max="70"
        key={'age'}
      /></>,
    user_phone: <>
      <input defaultValue={v}
        data-edit={edit}
        readOnly={!edit}
        name="phone"
        type="tel"
        required
        pattern="[0-9]{9,10}"
        minLength="9"
        maxLength="10"
        key={"phone"}
      /><p /></>
  }
  return editToKeys[key]
}
const userToKeys = {
  normalInfo: (param, edit) => {
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
    const keys = ['user_id', 'user_password', 'user_oldPassword', 'user_newPassword'];
    param.forEach((v, k) => {
      if (keys.includes(k)) return;
      userArr.push(<Fragment key={k}>
        <tr >
          <td className='p-3 fs-5'>{key[k]}</td>
          <td className='p-3' >
            {InputComponent(k, v, edit)}
          </td>
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
      reports: '報告量'
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
  restInfo: (param) => {
    let userArr = [];
    param = new Map(Object.entries(param));
    const key = {
      user_register_time: '註冊時間',
      lastTimeLogin: '上次登入時間'
    }
    param.forEach((v, k) => {
      if (k == 'user_register_time') v = new Date(v).toLocaleString();
      userArr.push(<Fragment key={k}>
        <td className='p-3 fs-5'>{key[k]}</td>
        <td className='p-3 ' >{v}</td>
      </Fragment>)
    })
    return userArr;
  }
}



export { userToKeys, fetcherState }
