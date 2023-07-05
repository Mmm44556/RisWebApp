import Pagination from 'react-bootstrap/Pagination';
export const Paginate = ()=>{

  return(
    <>
      <Pagination className="position-absolute end-0">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  )
}