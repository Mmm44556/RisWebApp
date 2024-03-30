import { useEffect, useState } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { MdAccountBox, MdPassword } from "react-icons/md";
import style from "../../assets/scss/style.module.scss";
export default function Login() {
  const response = useActionData();
  const navigator = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (response?.msg == 'ok') {
      navigator('/DashBoard/dataList',{replace:true});
      setIsSubmitting(false);
    }
    if(response?.msg=="err"){
      setIsSubmitting(false);
    }
  }, [response])
  return (
    <>

      <Form method="post"
        onSubmit={() => setIsSubmitting(true)}
        action="/sign-in" className={`${style.login} d-flex flex-column gap-2`}>
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

        <div >
          <button
            disabled={isSubmitting}
            type="submit">
              {
              isSubmitting ? "登入中..." : '登入'
              }
            </button>
        </div>

      </Form>
    </>
  )
}
