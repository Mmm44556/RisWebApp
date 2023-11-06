import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { useEditedFiles } from '../../../hooks/useEdited';

const ModifiedBtn = React.memo(({ fn, theme, file, setHoverEdited, path }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [countFiles, setCountFiles] = useState(0);
  const { deleteFn, renameFn, confirm, onExited } = useEditedFiles(setConfirmModal, setCountFiles, setHoverEdited, path, file);

  const buttons = {
    Rename: renameFn,
    Delete: deleteFn,
    confirm: confirm,

  }
  const buttonText = {
    Rename: '重新命名為:',
    Delete: file.type === 'file' ? '確定刪除此檔案?' : `資料夾內還剩${countFiles}筆檔案，確定刪除此資料夾嗎?`,
  }

  return (
    <>
      <Button variant={theme} className='text-nowrap' onClick={buttons[fn]}>{fn === 'Rename' ?
        <MdDriveFileRenameOutline /> : <RiDeleteBin6Fill />}
        {fn}
      </Button>
      <Modal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onExited={onExited}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{fn}</h4>
          <p>
            {
              buttonText[fn]
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={buttons['confirm']} >Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})

export default ModifiedBtn