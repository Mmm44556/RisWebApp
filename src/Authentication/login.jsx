import React, { useMemo, } from 'react';
import { Form, useActionData, useOutletContext,useLoaderData } from 'react-router-dom';
import { MdAccountBox, MdPassword } from "react-icons/md";
import { AiFillMail } from "react-icons/ai";
import style from './style.module.scss';

export default function Login() {
  const s = useLoaderData();
  console.log(s)
  return (
    <>

      <Form method="post" action="/Login" className={style.login}>
        <p className='text-center fs-4 fw-bold' >Radiology File System</p>

        <label htmlFor="email" className="text-center">
          <AiFillMail/>
          <input id='email' type="email" name="email" placeholder='Email'
            className="w-100"
            spellCheck

            required
            maxLength="40" />
        </label>

        <label htmlFor="password" className="text-center">
          <MdPassword  />
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
