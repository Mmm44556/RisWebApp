import React, { useEffect } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { MdAccountBox, MdPassword } from "react-icons/md";
import style from "../../assets/scss/style.module.scss";

export default function Login() {
  const LoginState = useActionData();
  useEffect(() => {
    if (LoginState?.msg) alert(LoginState.msg)

  }, [LoginState])
  return (
    <>

      <Form method="post" action="/Login" className={style.login}>
        <p className='text-center fs-4 fw-bold' >Radiology File System</p>

        <label htmlFor="name" className="text-center">
          <MdAccountBox />
          <input id='name' type="text" name="name" placeholder='Name'
            className="w-100"
            spellCheck

            required
            maxLength="40" />
        </label>

        <label htmlFor="password" className="text-center">
          <MdPassword />
          <input id='password' type="password" name="password"
            className="w-100"
            required
            minLength="0"
            maxLength="12"
            placeholder='password' />
        </label>


        <div className='text-end'>
          <input type="checkbox" id="keeping" name="keeping" style={{ height: '15px' }} />
          <label htmlFor="keeping" style={{ fontSize: '18px', marginLeft: '7px' }}>保持登入</label>
        </div>

        <div>
          <button type="submit">登入</button>
        </div>

      </Form>
    </>
  )
}
