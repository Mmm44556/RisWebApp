import { useEffect, useState, useMemo, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab, Row, Col, ListGroup, Card, Stack, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ReportModal from '@layouts/ReportModal';
import { useTypeFiles, useTypePrefetch, useTypeReports } from '@hooks/useTypeFiles';
import reportFieldKeys from '@utils/reportFieldKeys';
import { customFilesStyles, fileColumns, TypeBadges } from './column';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { BiSortAlt2 } from "react-icons/bi";
import { FaEdit, FaFileAlt, FaRegEdit } from "react-icons/fa";
import { HiArchiveBoxXMark } from "react-icons/hi2";

export default function Type() {
  const param = useParams();
  const queryClient = useQueryClient();
  const { data, isSuccess, isFetching } = useTypeFiles(param['*']);
  const typeReports = useTypeReports(queryClient);
  const [groupByData, setGroupByData] = useState([]);
  const [currentReportContent, setCurrentReportContent] = useState({ fileId: '' });
  const user = queryClient.getQueryData(['userCtx']);
  //開啟編輯檔案Modal
  const [lgShow, setLgShow] = useState(false);
  //當前選擇的檔案
  const [currentSelected, setCurrentSelected] = useState(null);
  const currentSelectedMemo = useMemo(() => currentSelected);
  //重置編輯報告內容
  const exit = () => setCurrentReportContent('');
  // if (isSuccess) {
  //   //當前頁數獲取完後再拿下一頁資料
  //   useTypePrefetch(param['*'], data[data.length - 1]?.fileId, queryClient);
  // }


  const rowOnclick = (row) => {
    const { fileId, data: { department } } = row;
    setCurrentSelected(row);
    setLgShow(true);
    typeReports.mutate({ fileId, department });

  }

  useEffect(() => {
    if (isSuccess) {
      //對所有資料進行類別分類
      const groupData = Object.groupBy(data, ({ data }) => data.type);
      setGroupByData(groupData)
      //當前頁數獲取完後再拿下一頁資料
      // useTypePrefetch(param['*'], data[data.length - 1]?.fileId, queryClient);
    }
  }, [data])
  return (
    <>
      {
        isSuccess ? <>
          <Suspense fallback={<h1>loading....</h1>}>
            <Row >
              <Col lg={9}>
                <Tabs
                  defaultActiveKey={Object.keys(groupByData)[0] || 'OPD'}
                  id="justify-tab-example"
                  className="mb-3"
                >
                  {Object.keys(groupByData).length > 0 ? Object.keys(groupByData).map(key => (
                    <Tab key={key || 'OPD'} eventKey={key || 'OPD'} title={TypeBadges[key]?.str || 'OPD'}>

                      <DataTable
                        customStyles={customFilesStyles}
                        // paginationServer
                        // paginationTotalRows={data?.total ?? iniPerPage}
                        // onChangePage={handlePage}
                        // onChangeRowsPerPage={handlePerPage}
                        columns={fileColumns}
                        data={groupByData[key] || []}
                        direction="auto"
                        onRowClicked={rowOnclick}
                        noDataComponent={<>
                          <h3 className="fw-bold">尚無資料</h3>
                        </>}
                        highlightOnHover
                        responsive

                        defaultSortFieldId={1}
                        progressPending={isFetching}
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
                  )) : <Tab eventKey={'OPD'} title={'---------'}>
                    <div className=' text-center fs-4 fst-italic fw-lighter '>
                      <HiArchiveBoxXMark
                        className="fs-3 align-text-top text-secondary"
                      />
                      尚無報告
                    </div>
                  </Tab>
                  }
                </Tabs>
              </Col>
              <Col lg={3} className='border-start'>
                asd
              </Col>
            </Row>


            <ReportModal lgShow={lgShow} setLgShow={setLgShow} ModalHeader={<ModalHeader user={user} />} exit={exit}>
              <>
                <Row className='h-100'>

                  <Col xs={12} md={8} lg={5} xxl={4}
                    className='bg-white border shadow-sm p-3 mb-5 bg-body rounded'
                    style={{ borderRadius: "1.125rem", overflow: 'overlay' }}>

                    <ModalReportTabs user={user} currentSelected={currentSelectedMemo} setCurrentReportContent={setCurrentReportContent} />

                  </Col>
                  <Col xs={6} md={4} lg={7} xxl={8} className='position-relative overflow-y-hidden'>

                    {
                      currentReportContent.length === 0 ? null : <Form
                        className='position-absolute w-100 h-100'>
                        <Form.Group className="mb-3 h-100 w-100" controlId="exampleForm.ControlTextarea1">

                          <Form.Control
                            as="textarea"
                            size='lg'
                            plaintext
                            value={currentReportContent.e}
                            className=' h-100 border-top border-bottom border-start p-1 bg-white'
                            onChange={(event) => {
                              setCurrentReportContent(e => ({ ...e, 'e': event.target.value }));
                            }}
                            readOnly={user.normalInfo.role_uid === 1 ? false : true}
                            style={{ resize: 'none', width: '95%' }}
                          />
                        </Form.Group>
                      </Form>
                    }





                  </Col>
                </Row>
              </>
            </ReportModal>
          </Suspense>
        </> : null
      }




    </>
  )
}


function ModalHeader({ user }) {
  const { normalInfo: { role_uid } } = user;
  return (
    <>
      <Row>
        <Col lg={6}>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 fs-4 fw-bold">


              {
                role_uid === 1 ? <>
                  <FaEdit className='align-baseline fs-5 ' />
                  編輯檔案
                </> : <>
                  <FaFileAlt className='align-baseline fs-5 ' />
                  檢視檔案
                </>
              }
            </div>
            <div className="p-2 border-start">
              <Button variant="success" className='fw-bold' size="sm"
              >開啟編輯
              </Button>
            </div>
            <div className="p-2">
              <Button variant="danger" className='fw-bold' size="sm"
              >  儲存修改
              </Button>
            </div>
          </Stack>
        </Col>
        <Col lg={6}>
          aaa
        </Col>
      </Row>




    </>
  )
}

function ModalReportTabs({ currentSelected, setCurrentReportContent, user }) {
  //更換當前選的報告內容
  const rowSelectedChange = (e) => {
    const splitStr = e.split('#');
    const { reports } = currentSelected;
    const currentReport = reports.find(e => e.fileId === splitStr[1]);

    setCurrentReportContent((e) => {
      //當選到同個報告時避免重置內容
      if (splitStr[1] === e.fileId) return e;
      return currentReport
    });
  }
  return (
    <Tab.Container
      id="list-group-tabs-example"
      onSelect={rowSelectedChange}>
      <Row className='overflow-auto p-1 ' style={{ height: '100%' }}>
        <Col sm={4} >
          <ListGroup>
            {
              currentSelected.reports.map((e) => {
                return (
                  <ListGroup.Item action
                    href={`#${e.fileId}`}
                    key={e.fileId} >
                    {e?.name || e.fileId}
                  </ListGroup.Item>
                )
              })
            }
          </ListGroup>
        </Col>
        <Col sm={8} >
          <Tab.Content>
            <Card style={{ width: '18rem' }} >
              <ListGroup variant="flush">
                {
                  reportFieldKeys(currentSelected.data).map((e) => (
                    <ListGroup.Item key={e[0]} className='position-relative'>
                      <span >
                        {
                          e[0]
                        }
                        :</span>
                      <br />
                      <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                        {
                          user.normalInfo.role_uid === 1 ? <>
                            {
                              <Form.Control
                                className="w-75 mt-1 mb-1 "
                                value={e[1]}
                                size="sm"
                                type="text"
                                placeholder="Small text"
                                style={{fontSize:'1.125rem'}}
                                />
                            }
                            <Button
                              variant="outline-light"
                              size="sm"
                              className='position-absolute d-flex justify-content-center align-items-center'
                              style={{ right: '5px', top: '3px' }} >
                              <FaRegEdit
                                className=' text-secondary fs-5 cursor-pointer '
                              />
                            </Button>
                          </> : e[1]
                        }

                      </span>
                    </ListGroup.Item>))
                }
                <ListGroup.Item>
                  <span>
                    上傳者:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      currentSelected.data.owner|| '-----'
                    }
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>
                    創建時間:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      moment(currentSelected.data.date.created).format('YYYY-MM-DD h:mm:ss a')
                    }
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>
                    截止時間:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      currentSelected.data.date.deadline || '-----'
                    }
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>
                    上次更新時間:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      currentSelected.data.date.update || '-----'
                    }
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
