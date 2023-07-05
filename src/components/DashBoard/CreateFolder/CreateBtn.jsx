import {  useRef, useState,useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AiOutlinePlus, AiOutlineFolderAdd } from "react-icons/ai";

import { createFolder } from '../Upload/js/fetchData';
import style from '../css/style.module.scss'

export const CreateBtn = ({ refetch }) => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(() => !showA);
  const folderName = useRef('');

  //拿到input值發送請求
  const createNewFolder = useCallback(() => {
    if (!folderName.current.value)return;
    const strName = String(folderName.current.value).trim();
    const url = 'createFolders.php';
    createFolder(url, strName).then(r=>console.log(r));
    folderName.current.value = "";
    refetch()
  }, [folderName])
  //Enter發送請求
  const keyDown = (e)=>{
    if (e.keyCode === 13) {
      createNewFolder()
      setShowA(false)
      refetch()
    };
    return
  }
  return (
    <div className='position-relative '>
      <Button variant="light" onClick={toggleShowA} className="mb-2" >
        <AiOutlinePlus />New Folder
      </Button>
      <Toast show={showA} onClose={toggleShowA} className={style.folderToast}>
        <Toast.Body>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-sm" className={style.submitBtn} onClick={createNewFolder} >
              <AiOutlineFolderAdd className='fs-3' />
            </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              className='folderFocus'
              onBlur={() => setShowA(false)}
              ref={folderName}
              onKeyDown={keyDown}
            />

          </InputGroup>
        </Toast.Body>
      </Toast>
    </div>
  )
}