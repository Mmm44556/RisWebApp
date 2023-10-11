import React, { useMemo, useState, memo, useEffect } from 'react';
import { Form, useActionData, useOutletContext } from 'react-router-dom';
import { MdAccountBox, MdPassword } from "react-icons/md";
import { AiOutlineProfile, AiFillMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import style from "../../scss/style.module.scss";
import Table from 'react-bootstrap/Table';
import AuthCheck from '../AuthCheck';
export default function Register() {
  const authCheck = useActionData();
  const [authCheckMsg, setAuthenCheck1] = useState(authCheck);
  const [Navigate, setRegisterConfirm, setRegisterStatus] = useOutletContext();
  //關閉錯誤提示
  useEffect(() => {
    setAuthenCheck1(authCheckMsg)
    if (authCheckMsg?.msg == 'ok') {
      setRegisterConfirm('Login')
      setRegisterStatus(e => ({ ...e, is: true, info: authCheckMsg?.info }))
      Navigate('Login', { replace: true })
      return
    }
  }, [authCheckMsg])

  const genderProps = useMemo(() => (
    [
      {
        sex: "Male"
      },
      {
        sex: "Bisexual"
      },
      {
        sex: "Female"
      }
    ]
  ), [])
  const [genders, setGenders] = useState(() => genderProps);
  const [TelInit, setTelInit] = useState('');
  const [visible, setVisible] = useState(false);
  const handleTelChange = (event) => {
    const value = event.target.value.replace(/[\WA-Za-z_]/, '');
    setTelInit(value)
  };
  return (
    <>
      <AuthCheck authCheckMsg={authCheckMsg} />
      <Form method="post" action="/Register" className={style.login}
        onKeyDown={(e) => {
          if (e.key !== undefined) {
            e.code = e.key;
          } else if (e.keyIdentifier !== undefined) {
            e.code = e.keyIdentifier;
          } else if (e.keyCode !== undefined) {
            e.code = e.keyCode;
          }
          if (/\s/.test(e.code)) {
            e.preventDefault()
          }
        }}
      >
        <p className='text-center fs-4 fw-bold' >
          Register
          <AiOutlineProfile className="fs-3" />
        </p>
        <label htmlFor="LastName" className="text-center">
          <MdAccountBox />
          <input id='LastName' type="text" name="LastName"
            placeholder='Last name / 姓氏'
            className="w-100"
            spellCheck
            required
            maxLength="40"
          />
        </label>
        <label htmlFor="FirstName" className="text-center">
          <MdAccountBox />
          <input id='FirstName' type="text" name="FirstName" placeholder='First name / 姓名'
            className="w-100"
            spellCheck
            required
            maxLength="40"
          />
        </label>

        <label htmlFor="email" className="text-center">
          <AiFillMail />
          <input id='email' type="text" name="email" placeholder='Email'
            className="w-100"
            required
            maxLength="40"

          />
        </label>
        <div style={{ display: 'grid', position: 'relative' }}>
          <label htmlFor="password" className="text-center">
            <MdPassword />
            <input id='password' type={visible ? 'text' : 'password'} name="password"
              className="w-100"
              required
              autoComplete='current-password'
              minLength="5"
              maxLength="12"
              placeholder='password'

            />

          </label>
          <span onClick={() => setVisible(!visible)} style={{ position: 'absolute', right: '0%', zIndex: '6', cursor: 'pointer' }} >
            {visible ? <AiFillEye style={{ border: 'none' }} /> : <AiFillEyeInvisible style={{ border: 'none' }} />}
          </span>
        </div>

        <label htmlFor="confirmPassword" className="text-center">
          <MdPassword />
          <input id='confirmPassword' type='password' name="confirmPassword"
            className="w-100"
            required
            autoComplete='off'
            minLength="5"
            maxLength="12"
            placeholder='re-enter'
          />
        </label>

        <label htmlFor="phone" className="text-center">
          <BsFillTelephoneFill />
          <input id='phone' type='tel' name="phone"
            className="w-100"
            required
            minLength="9"
            maxLength="9"
            placeholder='+886-xxxxxxxxx'
            value={TelInit}
            onInput={handleTelChange} />
        </label>

        <div className="d-flex" >

          <input id='age' type='number' name="age"
            style={{ width: '50%', height: "75%", marginRight: '10px' }}
            pattern="\d*"
            min="20"
            max="70"
            placeholder='age'
          />

          <Table bordered size="sm" responsive="xl" style={{ 'cursor': 'pointer' }}>
            <tbody>
              <tr className={style.gender}>
                {
                  genders.map((e, index) => {
                    return (
                      <th key={index} >
                        <label
                          htmlFor={e.sex}
                        >{e.sex}</label>

                        <input id={e.sex}
                          type="radio"
                          name="gender"
                          value={e.sex}

                        />
                      </th>
                    )
                  })
                }
              </tr>
            </tbody>
          </Table>
        </div>

        <div>
          <button type="submit">註冊</button>
          <button type="reset" onClick={() => {
            setTelInit('')
            setAuthenCheck1(false)
          }}>重置</button>
        </div>

      </Form>
    </>
  )
}

