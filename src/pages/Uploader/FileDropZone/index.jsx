import { memo, useRef } from 'react';
import { CloseButton } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { FaPlus } from "react-icons/fa";
import { CiFileOn } from 'react-icons/ci';
import { preProcessFiles } from '../filesAction';
import { createToast, updateToast } from '@utils/SystemToastify';

import styled from 'styled-components';
const ScrollBar = styled.div`
  position: relative;
  border: 2px dashed #aaa;
  border-radius: 5px;
  padding: 20px 0px;
  text-align: center;
  margin: 20px;

  ul{
    list-style:none;
    padding:0px 2rem;
    text-align:start;

    li{
      svg{
        font-size:1.8rem;
      }
      span{
      font-size:1.3rem;
      flex-grow: 3;
      }
      border:1px solid #aaa;
      border-radius:5px;
      padding:10px;
      margin-bottom:1rem;
    }
  }

`

function FileDropZone({ files, setFiles, form, setResponse }) {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();


  //處理拖曳資料
  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files);

    if (droppedFiles.length > 50) {
      alert('檔案數量過大，請勿超過50筆資料!')
      return;
    }


    const { normalInfo, medicalInfo, restInfo } = queryClient.getQueryData(['userCtx']);
    const uploadForm = { ...form, UID: normalInfo.uuid, owner: normalInfo.user_name };
    console.log(uploadForm.title)
    const jsonStr = JSON.stringify(uploadForm);

    const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
    const uploadPromises = preProcessFiles(droppedFiles, jsonBlob, uploadForm);

    let id = createToast('資料格式化...', {
      isLoading: true,
      theme: "dark"
    })

    Promise.allSettled(uploadPromises).then(result => {
      let resMap = result.map((res) => {
        if (res.status === 'fulfilled') {
          // Promise 成功解析时，返回解析结果
          return res.value.json();
        } else {
          // Promise 被拒绝时，返回拒绝原因
          return Promise.reject(res.reason);
        }
      })
      return Promise.all(resMap);
    }).then(e => {
      //格式化結束後，可開始上傳
      setFiles(droppedFiles);
      setResponse(e)
      updateToast(id, {
        render: '格式化完成! 可開始進行上傳。',
        isLoading: false,
        type: 'success',
        theme: 'dark',
        autoClose: 5000
      })
    })



  };
  //防止預設行為(拖曳後會打開檔案上傳功能)
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //處理點擊上傳
  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 10) {
      return;
    }
    setFiles(selectedFiles);
  };
  //點擊拖曳區觸發隱藏input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>

      <ScrollBar
        onDrop={handleDrop}
        onDragOver={handleDragOver}


      >
        {
          files.length > 0 ? null : <p className='position-relative d-inline fs-5'>
            <a href="#"
              className='fs-4 fw-bold text-decoration-none'
              onClick={handleUploadClick}>
              拖拽文件到此區域或點擊上傳</a><br />
            <FaPlus style={{ fontSize: '2cqw' }} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              multiple
            />
          </p>
        }

        <ul>
          {files.map((e, index) => (
            <li key={index} id={index} className=' d-flex'>
              <CiFileOn />
              <span>
                {e.name}
              </span>

              <CloseButton
                className='fs-5 align-top'
                aria-label="cancel"
                onClick={() => {

                  setResponse(v => (v.filter((e, idx) => (idx !== index))));
                  setFiles(v => (v.filter((e, idx) => (idx !== index))));
                }
                }
              />
            </li>
          ))}
        </ul>
      </ScrollBar>



    </>

  );
};

export default memo(FileDropZone);