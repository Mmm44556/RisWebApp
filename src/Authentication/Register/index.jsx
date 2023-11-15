import React, {  useState, useEffect } from 'react';
import { Form, useActionData, useOutletContext,useLoaderData } from 'react-router-dom';
import { Form as BsForm } from 'react-bootstrap';
import { MdAccountBox, MdPassword } from "react-icons/md";
import { AiOutlineProfile, AiFillMail, AiFillEyeInvisible, AiFillEye, AiFillMedicineBox } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import style from "../../assets/scss/style.module.scss";
import AuthCheck from '../AuthCheck';

function Registered(authCheck, Navigate, setRegisterConfirm, setRegisterStatus) {
  if (authCheck?.msg == 'ok') {
    setRegisterConfirm('Login')
    setRegisterStatus(e => ({ ...e, is: true, info: authCheck?.info }))
    Navigate('Login', { replace: true })
    return
  }


}

export default function Register() {

  const authCheck = useActionData();
  const [Navigate, setRegisterConfirm, setRegisterStatus] = useOutletContext();
  //關閉錯誤提示
  useEffect(() => {
    Registered(authCheck, Navigate, setRegisterConfirm, setRegisterStatus)
  }, [authCheck])

  const genders = ["Male", "Bisexual", "Female"];
  const [TelInit, setTelInit] = useState('');
  const [visible, setVisible] = useState(false);
  const handleTelChange = (event) => {
    const value = event.target.value.replace(/[\WA-Za-z_]/, '');
    setTelInit(value)
  };

  return (
    <>
      <AuthCheck authCheck={authCheck} />
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
        <label htmlFor="Name" className="text-center">
          <MdAccountBox />
          <input id='Name' type="text" name="name"
            placeholder='Name / 名稱'
            className="w-100"
            spellCheck
            required
            maxLength="40"
          />
        </label>
        <label htmlFor="department" className="d-flex">
          <AiFillMedicineBox />
          <BsForm.Select aria-label="部門選擇"
            name="department"
            className="w-100 fw-bold" style={{ textIndent: "30px" }}>
            <optgroup label="電腦斷層組(CT)">
              <option value="CT001">放射師</option>
              <option value="CT002">CT組長</option>

            </optgroup>
            <optgroup label="磁振造影組(MRI)">
              <option value="MRI001">放射師</option>
              <option value="MRI002">MRI組長</option>
            </optgroup>
            <optgroup label="專科醫師">
              <option value="MS001">主治醫師</option>
              <option value="MS002">住院醫師</option>
            </optgroup>
          </BsForm.Select>
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
              placeholder='Password'

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
            placeholder='Re-enter'
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
            <tbody>
              <tr className={style.gender}>
                {
                  genders.map((e, index) => {
                    return (
                      <th key={index} >
                        <label
                          htmlFor={e}
                        >{e}</label>
                        <input id={e}
                          type="radio"
                          name="gender"
                          value={e}
                        />
                      </th>
                    )
                  })
                }
              </tr>
            </tbody>
         
        </div>

        <div>
          <button type="submit">註冊</button>
          <button type="reset" onClick={() => {
            setTelInit('')
          }}>重置</button>
        </div>

      </Form>
    </>
  )
}

