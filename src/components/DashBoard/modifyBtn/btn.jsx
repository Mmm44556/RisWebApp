import Button from 'react-bootstrap/Button';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
export const ModifiedBtn =  ({fn,theme})=>{

  return(
    <>
      <Button variant={theme} className='text-nowrap'>{fn === 'Rename' ? 
      <MdDriveFileRenameOutline/>:<RiDeleteBin6Fill/>}
      {fn}
      </Button>
    </>
  )
} 