import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from '../Upload/css/style.module.scss'
export const Uploader = ()=>{

  return(
    <>
      <DropdownButton id="dropdown-button-drop-start" drop='start' title="File upload" variant="light">

        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </>
  )

}