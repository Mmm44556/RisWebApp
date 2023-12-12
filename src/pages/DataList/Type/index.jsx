import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useTypeFiles, useTypePrefetch } from '@hooks/useTypeFiles';
import { customFilesStyles, fileColumns, TypeBadges } from './column';
import { useQueryClient } from '@tanstack/react-query';
import { BiSortAlt2 } from "react-icons/bi";
const keys = {
  'Internal': 'MC'
}
export default function Type() {
  const param = useParams();
  const { data, isSuccess, isFetching } = useTypeFiles(param['*']);
  const [groupByData, setGroupByData] = useState([]);
  const queryClient = useQueryClient();

  if (isSuccess) {
    useTypePrefetch(param['*'], data[data.length - 1].fileId, queryClient);
  }
  useEffect(() => {

    if (isSuccess) {
      const groupData = Object.groupBy(data, ({ data }) => data.type);

      setGroupByData(groupData)

    }
  }, [data])

  return (
    <>
      {
        isSuccess ? <>
          <Tabs
            defaultActiveKey={Object.keys(groupByData)[0]}
            id="justify-tab-example"
            className="mb-3"
          >

            {Object.keys(groupByData).map(key => (
              <Tab key={key} eventKey={key} title={TypeBadges[key].str}>

                <DataTable
                  customStyles={customFilesStyles}
                  // paginationServer
                  // paginationTotalRows={data?.total ?? iniPerPage}
                  // onChangePage={handlePage}
                  // onChangeRowsPerPage={handlePerPage}
                  columns={fileColumns}
                  data={groupByData[key]}
                  direction="auto"

                  // title={''}
                  noDataComponent={<>
                    <h3 className="fw-bold">尚無資料</h3>
                  </>}
                  highlightOnHover
                  responsive

                  defaultSortFieldId={1}
                  progressPending={isFetching}
                  // paginationPerPage={perPage}
                  // paginationResetDefaultPage={resetPaginationToggle}
                  // paginationComponentOptions={paginationComponentOptions}
                  // paginationRowsPerPageOptions={[iniPerPage, 20]}
                  // progressComponent={<LoadingProgress length={7} />}
                  persistTableHead
                  pointerOnHover
                  // subHeader
                  subHeaderAlign="right"
                  subHeaderWrap
                  // subHeaderComponent={SubHeaderComponentMemo}
                  // selectableRowsComponent={Form.Check}
                  sortIcon={<BiSortAlt2 />}
                />

              </Tab>
            ))}
          </Tabs>
        </> : null
      }




    </>
  )
}
// <Table bordered hover
//   variant='light'
// >
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>姓名</th>
//       <th>類別</th>
//       <th>治療部位</th>
//       <th>檢查方法</th>
//       <th>剩餘時間</th>
//       <th>創建時間</th>
//     </tr>
//   </thead>
//   <tbody>
//     {groupByData[key].map(({ data, fileId }) => (
//       <tr>
//         <td>{fileId}</td>
//         <td>{data.patient}</td>
//         <td>{data.type}</td>
//         <td>{data?.parts}</td>
//         <td>{data.inspection}</td>
//         <td>{(() => {
//           const start = moment()
//           return start.to(data.date?.deadline, true);
//         })()}</td>
//         <td>{moment(data.date.created).format('YYYY-MM-DD hh:mm')}</td>
//       </tr>
//     ))}
//   </tbody>
// </Table>