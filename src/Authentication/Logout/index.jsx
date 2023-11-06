import { memo, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

import { MdLogout } from 'react-icons/md';
function Logout({ normalInfo, show, LogoutModalHandle }) {
 

  return (
    <>
      <p style={{ fontSize: "1.1rem" }}
        onClick={LogoutModalHandle}
        className='mb-0 p-0' >
        <MdLogout /> 登出系統
      </p>

      <Modal show={show} onHide={LogoutModalHandle}>
        <Modal.Header >
          <Modal.Title>系統提示</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center fw-bold">
          <pre className="text-start">
            <p>登出帳號: {normalInfo.user_name}</p>
            <p>系統時間: {new Date().toLocaleString()}</p>
          </pre>
          <p>---登出後將會保留當前紀錄---</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={LogoutModalHandle}>
            關閉
          </Button>
          <Button variant="danger">
            登出
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default memo(Logout)
