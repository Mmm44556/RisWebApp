import { memo } from 'react';
import Pagination from 'react-bootstrap/Pagination';
const FilesPagination = memo(() => {

  return (
    <div className='d-flex'>
      <Pagination >
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
      <div className='ms-auto'>
        Page 1 of 3
      </div>
    </div>
  )
})
export default FilesPagination