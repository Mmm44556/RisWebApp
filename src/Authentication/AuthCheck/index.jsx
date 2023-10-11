import { memo } from 'react';
import { MdAccountBox, MdPassword } from "react-icons/md";
import { AiFillMail } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import style from "../../scss/style.module.scss";
function AuthCheck({ authCheckMsg }) {
  const icons = {
    'account': <MdAccountBox />,
    'password': <MdPassword />,
    'mail': <AiFillMail />,
    'rest': <RxCross2 />

  }
  return (
    <>
      {
        authCheckMsg ? <div
          aria-live="polite"
          aria-atomic="true"
          className={style.authCheck}
        > <p>
            {icons[authCheckMsg.icon]}
            {authCheckMsg.msg}
          </p>
        </div> : null
      }
    </>
  );
}


export default memo(AuthCheck);