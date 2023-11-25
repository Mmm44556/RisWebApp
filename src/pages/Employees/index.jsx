import { useState, useEffect } from 'react';
import { Form, Spinner, Button, Placeholder } from 'react-bootstrap';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BiSortAlt2 } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import DataTable from 'react-data-table-component';
import { columns } from './js/column';
import { paginationComponentOptions } from './js/keywords';
import { fetchEmployees, useFilterComponent } from './js/paginatorFn';



function Employees() {
  const queryClient = useQueryClient();
  const iniPerPage = 10;
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(iniPerPage);

  const {
    isError,
    error,
    isInitialLoading,
    isSuccess,
    fetchStatus,
    data,
    refetch,
    isPreviousData,
  } = useQuery({
    queryKey: ['employees', page],
    queryFn: () => fetchEmployees(page, perPage),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 1,

  })
  //資料過濾搜尋
  const { SubHeaderComponentMemo, filteredItems, resetPaginationToggle } = useFilterComponent(data?.data);

  //預先獲取下筆資料
  useEffect(() => {
    if (isSuccess) {
      usePrefetch(page, perPage);
    }
  }, [data])

  //修改初始頁數狀態
  useEffect(() => {
    refetch();
  }, [perPage])
  //修改上下頁
  const handlePage = (page) => {
    if (!isPreviousData) {
      setPage(page - 1)
    }
  }
  //修改當前頁數量
  const handlePerPage = async (perPage, page) => {
    setPerPage(perPage)
    setPage(Math.max(page - 1, 0))
  }

  return (
    <>
      {
        isError ? <h1>Something's wrong:{error}</h1>
          : <>
            <DataTable
              paginationServer
              paginationTotalRows={data?.total ?? iniPerPage}
              onChangePage={handlePage}
              onChangeRowsPerPage={handlePerPage}
              columns={columns}
              data={filteredItems}
              direction="auto"
              expandOnRowClicked
              expandableRows
              expandableRowsHideExpander
              title={<>

                <h3 className='d-inline-block p-0 m-0'>
                  <MdPeople className="fs-3" />
                  用戶資料
                  <Button variant="primary">
                    <FaArrowRotateLeft />
                  </Button>
                </h3>
              </>}
              noDataComponent={<h3 className="fw-bold">尚無資料</h3>}
              highlightOnHover
              responsive
              pagination
              progressPending={isInitialLoading}
              paginationPerPage={perPage}
              paginationResetDefaultPage={resetPaginationToggle}
              paginationComponentOptions={paginationComponentOptions}
              paginationRowsPerPageOptions={[iniPerPage, 20]}
              contextMessage={{ singular: '筆資料', plural: '筆資料' }}
              progressComponent={<>
                <div className='fs-2'>
                  <Spinner animation="border" className='me-2' size="" />
                  載入中...<LoadingProgress length={7} />
                </div>

              </>}
              persistTableHead
              pointerOnHover
              subHeader
              subHeaderAlign="right"
              subHeaderWrap
              subHeaderComponent={SubHeaderComponentMemo}
              selectableRows
              selectableRowsHighlight
              selectableRowsComponent={Form.Check}
              sortIcon={<BiSortAlt2 />}
            /></>
      }

    </>
  );

  async function usePrefetch(page = 0, perPage = 10) {
    await queryClient.prefetchQuery({
      queryKey: ['employees', (page + 1)],
      queryFn: () => fetchEmployees((page + 1), perPage),
    })

  }
}
function LoadingProgress({ length = 4 }) {
  return (
    <>
      <Placeholder as="p" animation="glow">
        <Placeholder lg={length} />
      </Placeholder>

    </>
  );
}
export default Employees;