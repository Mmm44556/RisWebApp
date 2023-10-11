import { useContext, memo } from 'react';
import { IsUploadedFiles } from '../../../context';
import { AiFillFileAdd, AiFillFolderAdd, AiFillFileZip } from "react-icons/ai";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import style from '../../../scss/style.module.scss';


function onChange(file, path, dispatch, str) {

  return (fileList) => {
    fileList.stopPropagation()
    const work = new Worker(new URL('../../../utils/FileProcess/multiFiles.js', import.meta.url))
    if (window.Worker) {
      const postFiles = {
        fileList: fileList.target.files,
        file,
        path,

      }
      work.postMessage(postFiles)
      work.onmessage = ({ data: { errorFiles, originFiles, readyFiles, upload } }) => {
        fileList.target.value = "";
        dispatch({ type: 'loading', files: upload, sum: upload.length, errorFiles })
        // work.terminate()
      }
    }
  }

}


const Uploader = ({ file, path }) => {
  const dispatch = useContext(IsUploadedFiles)

  return (<>
    <Accordion className={style.accordion}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={style.uploaderDropDown}>
          <Button variant="light" >Upload</Button>
          </Accordion.Header>
        <Accordion.Body className='p-0'>
          <div onChange={onChange(file, path, dispatch)} >
            <label htmlFor="file">
              <AiFillFileAdd/>Files
              <input type="file" id="file" multiple accept='text/plain' />
            </label>
            <label htmlFor="folder" >
             <AiFillFolderAdd/> Folder
              <input type="file" id="folder" directory="" webkitdirectory="" multiple accept='text/plain' />
            </label>
            <label htmlFor="zip" >
              <AiFillFileZip/>Zip
              <input type="file" id="zip" accept="application/zip,application/x-zip,application/x-zip-compressed"  />
            </label>
          </ div>
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
 
  </>
  )

}
export default memo(Uploader)
//   < DropdownButton id = "dropdown-button-drop-start"
// drop = 'start' title = "File Upload" variant = "light"
// className = { style.uploaderDropDown }

// onChange = { onChange(file, path, dispatch) } >

//       <Dropdown.Item href="#/action-1 " eventKey="1">
//         <Form.Group controlId="formFileMultiple" >
//           <Form.Label className=" w-100  m-0">
//             <AiFillFileAdd />File
//           </Form.Label>
//           <Form.Control className="d-none " type="file" multiple accept='text/plain' />
//         </Form.Group>
//       </Dropdown.Item>

      
//        <Dropdown.Item href="#/action-5" eventKey="2">
 
//         <Form.Group controlId="formFile" >
//           <Form.Label className=" w-100  m-0">
//             <AiFillFolderAdd />Folder
//           </Form.Label>
//           <Form.Control className="d-none " type="file" directory="" webkitdirectory="" multiple accept='text/plain'  />
//         </Form.Group>
//       </Dropdown.Item>

//       <Dropdown.Item href="#/action-3" eventKey="3">

//         <Form.Group controlId="form" >
//           <Form.Label className=" w-100  m-0">
//             <AiFillFileZip />.zip
//           </Form.Label>
//           <Form.Control className="d-none " type="file" accept="application/zip,application/x-zip,application/x-zip-compressed" />
//         </Form.Group>
//       </Dropdown.Item>
//     </ DropdownButton >