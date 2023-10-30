import { useState, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFetcher } from 'react-router-dom';
import style from '../../scss/styles.module.scss'
function EditModal({ setNormalInfo, type, edit }) {

  const fetcher = useFetcher();
  const { func, header, body, footer } = description(type, fetcher);
  const [show, setShow] = useState(false);
  const handleModalShow = () => setShow(v => !v);
  const resetButton = () => {
    handleModalShow();
    return setNormalInfo();

  }
  return (
    <>
      <Button variant="light" className='fw-bold' type='reset'
        onClick={handleModalShow}
        disabled={!edit}
      >
        {func}
      </Button>
      <Modal show={show} onHide={handleModalShow} animation={false} centered className='text-center'>
        <Modal.Header
          className='border border-0 justify-content-center '>
          <Modal.Title className='fw-bold' >{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer className='border border-0'>
          <Button variant="secondary" onClick={handleModalShow}>
            取消
          </Button>
          <Button variant="danger" onClick={resetButton}>
            {footer}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}
function description(type, fetcher) {
  switch (type) {
    case 'resetPassword':
      return {
        func: "重設密碼",
        header: "確定修改密碼?",
        body: <>
          <fetcher.Form className={style.normalInfo}>
            <div className="vstack gap-2">
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

          </fetcher.Form>
        </>,
        footer: "確定"
      }
    case 'reset':
      return {
        func: "重置",
        header: "確定移除當前變更?",
        body: <>你的任何變更都將遺失<sub>。</sub></>,
        footer: "重設變更"
      }
    case 'submit':
      return {
        func: "保存",
        header: "確定保存當前變更?",
        body: <>你的保存<sub>。</sub></>,
        footer: "重設保存"
      }
  }
}

export default memo(EditModal);