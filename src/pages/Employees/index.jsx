import { useMemo, useState } from 'react';
import { Table, Button, Image, ProgressBar, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import SearchBar from '../../layouts/SearchBar';
import { AiOutlineReload } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import DataTable from 'react-data-table-component';
import { columns, data } from './js/column';


const paginationComponentOptions = {
  rowsPerPageText: '每頁資料:',
  noRowsPerPage: false,
  rangeSeparatorText: 'of',
  selectAllRowsItem: true,
  selectAllRowsItemText: '所有資料',

}


function Employees() {
  const { SubHeaderComponentMemo, filteredItems, resetPaginationToggle } = useFilterComponent();

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      direction="auto"
      expandOnRowClicked
      expandableRows
      expandableRowsHideExpander
      title={<h3><MdPeople className="fs-3" />用戶資料</h3>}
      highlightOnHover
      responsive
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      paginationComponentOptions={paginationComponentOptions}
      paginationRowsPerPageOptions={[10, 20]}
      contextMessage={{ singular: '筆資料', plural: '筆資料' }}
      progressPending={false}
      progressComponent={<>
        <div className='fs-2'>
          <Spinner animation="border" className='me-2' size="" />
          載入中...
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




    />
  );
}

//過濾功能
function useFilterComponent() {
  const [filterKeyWord, setFilterKeyWord] = useState('user_name');
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //過濾輸入資料，每次輸入都會執行
  const filteredItems = data.filter(
    item => item[filterKeyWord] && item[filterKeyWord].toLowerCase().includes(filterText.toLowerCase())
  );

  //輸入框組件
  const SubHeaderComponentMemo = useMemo(() => {
    const filterHandler = (e) => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
      setFilterText(e.target.value)
    };
    return <SearchBar filterHandler={filterHandler}
      filterKeyWord={filterKeyWord} setFilterKeyWord={setFilterKeyWord} />
  }, [filterText, resetPaginationToggle, filterKeyWord]);

  return { SubHeaderComponentMemo, filteredItems, resetPaginationToggle }
}

export default Employees;