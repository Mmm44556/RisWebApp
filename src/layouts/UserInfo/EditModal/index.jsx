import { useState, memo, useRef, useEffect } from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { fetcherState } from '../hooks/userToKey';
import style from '../../../assets/scss/style.module.scss'
function EditModal({ setNormalInfo, type, edit, fetcher, userState, setShowToast, setToastDetail, showToast }) {
  const location = useLocation();
  const formRef = useRef();

  const [hasLength, setHasLength] = useState(false);
  const { func, header, body, footer } = description(type, formRef, fetcher, setHasLength);
  const [show, setShow] = useState(false);

  const handleModalShow = () => setShow(v => !v);
  const resetButton = () => {
    handleModalShow();
    setShowToast(v => !v);
    setToastDetail({ detail: '重置成功!', theme: 'Warning', spinner: "", timeStamp: new Date().toLocaleTimeString() })
    return setNormalInfo();

  }


  return (
    <>
      <Button variant="light" className='fw-bold'
        type={type == "submit" ? 'button' : 'reset'}
        onClick={handleModalShow}
        disabled={!edit}
      >
        {func}
      </Button>
      <Modal show={show}
        onHide={handleModalShow}
        animation={false} centered
        className='text-center'
        onShow={type == 'reset' ? () => null : () => {
          Object.values(formRef.current).forEach(v => {
            if (v.localName == 'input') { //判斷是否是Input標籤
              if (v.value.length == 0) {
                setHasLength(true)
                return
              }
            } else {
              return;
            };
          })
        }}
      >
        <Modal.Header
          className='border border-0 justify-content-center '>
          <Modal.Title className='fw-bold' >{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className='border border-0'>
          <Button variant="secondary" onClick={handleModalShow}>
            取消
          </Button>
          <Button variant="danger" onClick={type == 'reset' ? resetButton : (() => {

            if (formRef.current[0].value == userState.normalInfo['user_password']) {

              fetcher.submit({ ...userState.normalInfo, user_password: formRef.current[1].value }, {
                action: location.pathname,
                method: 'PATCH'
              })
              setShowToast(true);
              setToastDetail({ detail: '修改成功!', theme: 'success', spinner: fetcherState[fetcher.state], timeStamp: new Date().toLocaleTimeString() })
              return
            }

            setShowToast(v => !v);
            setToastDetail({ detail: '密碼錯誤!', theme: 'danger', spinner: "", timeStamp: new Date().toLocaleTimeString() })


          })}
            type={type}
            disabled={showToast || hasLength}
          >
            {footer}
          </Button>

        </Modal.Footer>
      </Modal>

    </>
  )

}
function description(type, formRef, fetcher, setHasLength) {

  switch (type) {
    case 'submit':
      //如果輸入長度為0關閉確認按鈕
      const enabledConfirmButton = () => {
        if (formRef.current[0].value.length !== 0 && formRef.current[1].value.length !== 0) {
          setHasLength(false)
        } else {
          setHasLength(true)
        }
      }
      return {
        func: "重設密碼",
        header: "確定修改密碼?",
        body: <fetcher.Form
          ref={formRef}
          onInput={enabledConfirmButton}
        >
          <div
            className={`${style.normalInfo} vstack gap-2`}>
            <p>
              <h5 className='d-inline fw-bold me-2'>舊密碼:</h5>
              <input type="password" name="oldPassword"
                className="w-50"
                required
                minLength="0"
                maxLength="12"
                placeholder='password' />
            </p>
            <p>
              <h5 className='d-inline fw-bold me-2'>新密碼:</h5>

              <input type="password" name="newPassword"
                className="w-50"
                required
                minLength="0"
                maxLength="12"
                placeholder='password' />
            </p>
          </div>
        </fetcher.Form>,
        footer: "確定"
      }
    case 'reset':
      return {
        func: "重置",
        header: "確定移除當前變更?",
        body: <>你的任何變更都將遺失<sub>。</sub></>,
        footer: "重設變更"
      }
  }
}

export default memo(EditModal);