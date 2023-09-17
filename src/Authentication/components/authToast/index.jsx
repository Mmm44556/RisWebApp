import { memo } from 'react';
import { MdAccountBox, MdPassword } from "react-icons/md";
import { AiFillMail } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import style from '../../style.module.scss'
function AuthenToast({ authenCheck }) {
  const icons = {
    'account': <MdAccountBox />,
    'password': <MdPassword />,
    'mail': <AiFillMail />,
    'rest': <RxCross2 />

  }
  return (
    <>
      {
        authenCheck ? <div
          aria-live="polite"
          aria-atomic="true"
          className={style.authCheck}
        > <p>
            {icons[authenCheck.icon]}
            {authenCheck.msg}
          </p>
        </div> : null
      }
    </>
  );
}


export default memo(AuthenToast);