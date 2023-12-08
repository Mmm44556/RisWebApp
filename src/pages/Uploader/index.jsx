import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button, Container, Col, Row, Form, CloseButton } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { FaPlus } from "react-icons/fa";
import FilesForm from './FilesForm';
import styled from 'styled-components';
import { Additional } from './FilesForm';
import { CiFileOn } from "react-icons/ci";

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
const OverflowCol = styled(Col)`
  height:35cqh;
  overflow-y: auto;
  resize:vertical;
  scroll-behavior: smooth; 
  position: relative;
  border-bottom:1.3px solid rgb(197 197 197);
  margin-bottom:1.5rem;
/* 定制滚动条的样式 */
::-webkit-scrollbar {
  width: 12px; /* 宽度 */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* 滚动条上的拖动手柄的颜色 */
  border-radius: 6px; /* 圆角 */
}

::-webkit-scrollbar-track {
  background-color: #eee; /* 滚动条轨道的颜色 */
}

/* 悬停在滚动条上时的样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 禁用浏览器自带的外观效果（部分浏览器有效） */

  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #888 #eee; /* Firefox */
`

function uploadFiles(files, uploadForm, setFiles) {



  const uploadPromises = files.map((file) => {


    const formData = new FormData();
    formData.append(`file`, file, file.name);
    formData.append(`private`, uploadForm);
    setFiles(v => {
      if (v.length === 0) {
        return [...v, file];
      }
      let a = v.filter(e => {

        if (e.name !== file.name) {
          return e;
        }

        return
      });

      return [...v, ...a];
    });
    return fetch(`${import.meta.env.VITE_VAR_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
  });

  return uploadPromises;
  // try {




  // } catch (error) {
  //   console.log('ERROR:', error);
  // }


}


function Uploader() {

  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({});
  //是否添加額外補充
  const [additional, setAdditional] = useState(false);

  // useEffect(() => {
  //   console.log('@@@@')
  //   return () => {
  //     console.log('@@@@')
  //   }
  // }, [])


  return (
    <>
      <Form

        onSubmit={(e) => {
          e.preventDefault();
          // const { normalInfo, medicalInfo, restInfo } = queryClient.getQueryData(['userCtx']);
          // const uploadForm = { ...form, UID: normalInfo.uuid, owner: normalInfo.user_name };
          // const jsonStr = JSON.stringify(uploadForm);

          // const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
          // console.log(jsonBlob)


          // uploadFiles(files, jsonBlob);
        }}
        onChange={({ target }) => {
          if (target.name === 'description') {
            setForm(v => {
              v[target.name] = target.value;
              return v;
            })
          }
          return
        }}
      >
        <Container>
          <Row>
            <Row>
              <OverflowCol md={12}
                className='overflow-auto '>
                <FileDropZone
                  files={files}
                  form={form}
                  setFiles={setFiles} />

              </OverflowCol>
            </Row>
            <Row>
              <Col md={12}>
                <FilesForm setForm={setForm} setAdditional={setAdditional} />
              </Col>
              {
                additional ? <Additional /> : null
              }

            </Row>
            <Row>
              <Col className='d-flex justify-content-end'>
                <Button
                  variant="danger"
                  size="md"
                  className="ms-4 mt-2"
                  onClick={() => {
                    if (confirm('確定清除檔案區?')) {
                      setFiles([]);
                    };
                  }}>
                  清除文件區
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type='submit'
                  className="ms-4 mt-2">
                  上傳
                </Button>
              </Col>
            </Row>

          </Row>

        </Container>
      </Form>
    </>
  );
}


function FileDropZone({ files, setFiles, form }) {
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
    const jsonStr = JSON.stringify(uploadForm);
    const jsonBlob = new Blob([jsonStr], { type: 'application/json' });
    const uploadPromises = uploadFiles(droppedFiles, jsonBlob, setFiles);
    // setFiles(droppedFiles);
    Promise.allSettled(uploadPromises).then(res => {

      let resMap = res.map(e => {
        return e.status
      })
      // console.log(resMap, droppedFiles)
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
          {files.map((file, index) => (
            <li key={index} id={index} className=' d-flex'>
              <CiFileOn className='' />
              <span>
                {file.name}
              </span>

              <CloseButton
                className='fs-5 align-top'
                aria-label="cancel"
                onClick={() => setFiles(v => (v.filter((e, idx) => (idx !== index))))}
              />
            </li>
          ))}
        </ul>
      </ScrollBar>



    </>

  );
};


export default Uploader;