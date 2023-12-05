import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Button, Modal, Container, Col, Row, Form } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import FilesForm from './FilesForm';
import styled from 'styled-components';

const ScrollBar = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth; 
  cursor: pointer;
  position: relative;
  border: 2px dashed #aaa;
  border-radius: 5px;
  padding: 20px 0px;
  text-align: center;
  margin: 20px;
  max-height: 50cqh;


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


function Uploader() {
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target, files)
          console.log(form)
        }}
      >
        <Container>
          <Row>
            <Col
              lg={4} md={4} sm={12}
            >
              <Row>
                <Col md={12} className='overflow-auto p-0'>
                  <FileDropZone files={files} setFiles={setFiles} />
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6}>
              <FilesForm setForm={setForm} />
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
}


function FileDropZone({ files, setFiles }) {
  const fileInputRef = useRef(null);

  //處理拖曳資料
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };
  //防止預設行為(拖曳後會打開檔案上傳功能)
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //處理點擊上傳
  const handleFileInputChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };
  //點擊拖曳區觸發隱藏input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        className="ms-4"
        onClick={() => setFiles([])}
      >清除資料</Button>
      <ScrollBar
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleUploadClick}

      >
        {
          files.length > 0 ? null : <p className='position-relative d-inline fs-5\'>
            <span className='fs-5 fw-bold'>
              拖拽文件到此區域或點擊上傳<br />
              <FaPlus style={{ fontSize: '2cqw' }} />
            </span>
          </p>
        }

        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </ScrollBar>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        multiple
      />
    </>

  );
};


export default Uploader;