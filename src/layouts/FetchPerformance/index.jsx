import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { AiOutlineCheck } from "react-icons/ai";
import style from '../scss/styles.module.scss';
const FetchPerformance = ({ showToast, createDetail, toggleShow }) => {
  const [fadeOut, setFadeOut] = useState(style.toast);
  //設定fadeOut
  useEffect(() => {
    const classTimer = setTimeout(() => setFadeOut(style.fadeOut), 1500);

    return () => {
      clearTimeout(classTimer);
      setFadeOut(style.toast);
    }
  }, [showToast])


  return (
    <Toast
      onMouseEnter={() => setFadeOut(style.toast)}
      onMouseLeave={() => setFadeOut(style.fadeOut)}
      show={showToast}
      onClose={toggleShow}
      bg={createDetail.theme.toLowerCase()}
      className={`${fadeOut}`}>
      <Toast.Header>
        {createDetail.spinner ? <Spinner animation="border" variant={createDetail.theme} style={{ width: '1rem', height: '1rem' }} /> : <AiOutlineCheck />}
        <strong className="me-auto">
          系統提示-
          <span>{createDetail.detail}</span>
        </strong>

        <small>{createDetail.timeStamp}</small>
      </Toast.Header>
      {/* <Toast.Body>{createDetail.detail}</Toast.Body> */}
    </Toast>
  );
}
export default FetchPerformance

