import { useEffect, useState, useMemo, Suspense } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Row, Col, ListGroup, Card, Stack, Button, Form, Badge, Modal, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ReportModal from '@layouts/ReportModal';
import { useTypeFiles, useTypePrefetch, useTypeReports } from '@hooks/useTypeFiles';
import { reportFieldKeys, zhKeys, reverseObject } from '@utils/reportFieldKeys';
import { customFilesStyles, fileColumns, TypeBadges } from './column';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { BiSortAlt2 } from "react-icons/bi";
import { FaEdit, FaFileAlt, FaRegEdit } from "react-icons/fa";
import { HiArchiveBoxXMark } from "react-icons/hi2";

export default function Type() {
  const param = useParams();
  const nav = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();
  const { data, isSuccess, isFetching } = useTypeFiles(param['*']);
  const typeReports = useTypeReports(queryClient);
  const [groupByData, setGroupByData] = useState([]);
  const [currentReportContent, setCurrentReportContent] = useState({ fileId: '', e: '' });
  const user = queryClient.getQueryData(['userCtx']);
  //開啟編輯檔案Modal
  const [lgShow, setLgShow] = useState(false);
  //當前選擇的檔案
  const [currentSelected, setCurrentSelected] = useState(null);
  const currentSelectedMemo = useMemo(() => currentSelected);
  //重置編輯報告內容
  const exit = () => {
    // const beforeSave = confirm('是否儲存當前修改');
    nav(location.pathname);
    // if (beforeSave) {
    // queryClient.setQueryData(['department', currentSelected.data.department]);
    // }
    setLgShow(false)
    setCurrentReportContent({ fileId: '', e: '' })
  };

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
          <Row >
            <Col lg={9}>
              <Tabs
                defaultActiveKey={Object.keys(groupByData)[0]}
                id="justify-tab-example"
                className="mb-3"
              >
                {Object.keys(groupByData).length > 0 ? Object.keys(groupByData).map(key => (
                  <Tab key={key} eventKey={key} title={TypeBadges[key]?.str}>

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


          <ReportModal lgShow={lgShow} setLgShow={setLgShow} ModalHeader={<ModalHeader user={user} currentSelectedMemo={currentSelectedMemo} setCurrentSelected={setCurrentSelected} currentReportContent={currentReportContent} />} exit={exit}>

            <>
              <Row className='h-100'>

                <Col xs={12} md={8} lg={5} xxl={4}
                  className='bg-white border shadow-sm p-3 mb-5 bg-body rounded'
                  style={{ borderRadius: "1.125rem", overflow: 'overlay' }}>

                  <ModalReportTabs user={user} currentSelectedMemo={currentSelectedMemo} setCurrentReportContent={setCurrentReportContent} setCurrentSelected={setCurrentSelected} />

                </Col>
                <Col xs={6} md={4} lg={7} xxl={8} className='position-relative overflow-y-hidden'>

                  {
                    currentReportContent.e.length === 0 ? null : <Form
                      className='position-absolute w-100 h-100'>
                      <Form.Group className="mb-3 h-100 w-100" >
                        <Form.Control
                          as="textarea"
                          size='lg'
                          plaintext
                          value={currentReportContent.e}
                          className=' h-100 border-top border-bottom border-start p-1 bg-white'
                          onChange={(event) => {
                            setCurrentReportContent(e => ({ ...e, 'e': event.target.value }));
                          }}
                          readOnly={user.normalInfo.role_uid == 1 ? false : true}
                          style={{ resize: 'none', width: '95%' }}
                        />
                      </Form.Group>
                    </Form>
                  }
                </Col>
              </Row>
            </>
          </ReportModal>
        </> : <h2 className="position-absolute start-50 end-50"><Spinner animation="border" /></h2>
      }




    </>
  )
}

function SaveModal({ saveModalShow, setSaveModalShow, setConfirmSave }) {

  const handleClose = () => {
    setSaveModalShow(false);
    setConfirmSave(false);
  };

  return (
    <>

      <Modal
        show={saveModalShow}
        onHide={handleClose}
        style={{ backgroundColor: '#00000024' }}>
        <Modal.Header closeButton className='border-0 '>
          <Modal.Title className="text-center">是否保存當前修改?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className='border-'>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="danger" onClick={() => setConfirmSave(true)}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function ModalHeader({ user, currentSelectedMemo, setCurrentSelected, currentReportContent }) {
  const { hash } = useLocation();
  const { normalInfo: { role_uid } } = user;
  const { data, reports } = currentSelectedMemo;
  const [saveModalShow, setSaveModalShow] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  //尋找當前編輯的報告
  const findUpdatedReport = () => reports.find(e => `#${e.fileId}` == hash);
  useEffect(() => {
    if (confirmSave) {
      setCurrentSelected(prev => {
        return prev
      })
      console.log(findUpdatedReport(), currentSelectedMemo);
    }


  }, [confirmSave])
  const saveBtn = () => {
    console.log(findUpdatedReport(), currentSelectedMemo);
    // const findUpdatedReport = reports.find(e => e.fileId == h)
    setSaveModalShow(true);
  }

  const reportState = () => {
    const currentReportState = findUpdatedReport();
    return (
      <>
        {
          role_uid == 1 && hash.length !== 0 ? <Form

            onChange={(event) => {
              //尋找當前點擊的檔案處理提出報告、覆閱狀態
              setCurrentSelected(report => {
                report.reports.forEach(e => {
                  if (`#${e.fileId}` == hash) {
                    e.state[event.target.id] = event.target.checked;
                  }
                })
                return { ...report }
              })
            }}>
            <Form.Check
              type="switch"
              defaultChecked={currentReportState?.state.proposal || false}
              checked={currentReportState?.state.proposal || false}
              id="proposal"
              label="提出報告問題"
            />
            <Form.Check
              type="switch"
              defaultChecked={currentReportState?.state.review || false}
              checked={currentReportState?.state?.review || false}
              label="報告已覆閱"
              id="review"
            />
          </Form> : null
        }
      </>
    )
  }

  return (
    <>
      <Row>
        <Col lg={6} >
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 fs-4 fw-bold">
              {
                role_uid == 1 ? <>
                  <FaEdit className='align-baseline fs-5 ' />
                  編輯檔案
                </> : <>
                  <FaFileAlt className='align-baseline fs-5 ' />
                  檢視檔案
                </>
              }
            </div>
            {
              role_uid == 1 && hash.length !== 0 ? <div className="p-2 border-start">
                <SaveModal saveModalShow={saveModalShow} setSaveModalShow={setSaveModalShow} setConfirmSave={setConfirmSave} />
                <Button
                  onClick={saveBtn}
                  variant="danger" className='fw-bold' size="sm"
                >  儲存修改
                </Button>
              </div> : null
            }
            {
              data.department === 'RADIOLOGY' ? <div className="p-2 ">
                <Button variant="success" className='fw-bold' size="sm"
                >  下載報告(.json)
                </Button>
              </div> : null
            }

          </Stack>
        </Col>
        <Col lg={6} >
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 border-start">
              <Badge bg="warning" text="dark" style={{ fontSize: "0.8rem" }}>
                截止日期:
                {
                  data.date.deadline || '-----'
                }
              </Badge>
            </div>
            <div className="p-2 ">
              <Badge bg="warning" text="dark" style={{ fontSize: "0.8rem" }} >
                上次更新:
                {
                  data.date.update || '-----'
                }
              </Badge>
            </div>
            <div className="p-2 ">
              {reportState()}
            </div>
          </Stack>
        </Col>
      </Row>


    </>
  )
}
const tabsFormKeys = {
  type: ['ER', 'OPD', 'PE', 'MC', 'IP'],
  inspection: ['CT', 'MRI'],
  parts: ['LIVER', 'CHEST', 'KIDNEY', 'SPLEEN', 'LIVER_TRANSPLANT']

}
function ModalReportTabs({ currentSelectedMemo, setCurrentReportContent, setCurrentSelected, user }) {
  const reverseObjectZhKeys = reverseObject(zhKeys);
  //更換當前選的報告內容
  const rowSelectedChange = (e) => {
    const splitStr = e.split('#');
    const { reports } = currentSelectedMemo;
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
          <ListGroup className="position-relative">
            {
              currentSelectedMemo.reports.length == 0 ? <h2 className="position-absolute start-50 end-50"><Spinner animation="border" /></h2> :
                currentSelectedMemo.reports.map((e) => {

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
                  reportFieldKeys(currentSelectedMemo.data).map((e) => (
                    <ListGroup.Item key={e[0]} className='position-relative'>
                      <span >
                        {
                          e[0]
                        }
                        :</span>
                      <br />
                      <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                        {
                          user.normalInfo.role_uid == 1 ? <Form
                            onChange={(e) => {
                              setCurrentSelected(prev => {
                                const field = e.target.id;
                                return { ...prev, data: { ...prev.data, [field]: e.target.value } }
                              })
                            }}
                          >

                            {
                              ['title', 'patient'].includes(reverseObjectZhKeys[e[0]]) ?
                                <Form.Group className="mb-3" controlId={reverseObjectZhKeys[e[0]]}>
                                  <Form.Label
                                    style={{ right: '5px', top: '3px', cursor: 'pointer' }}
                                    className='position-absolute text-secondary '>
                                    <FaRegEdit className='fs-5' />
                                  </Form.Label>
                                  <Form.Control
                                    className="w-75 mt-1 mb-1 "
                                    defaultValue={e[1]}
                                    value={e[1]}
                                    size="sm"
                                    type="text"
                                    id={reverseObjectZhKeys[e[0]]}
                                    placeholder={reverseObjectZhKeys[e[0]]}
                                    required
                                    isInvalid={!(e[1])}
                                    style={{ fontSize: '1.125rem' }}
                                  /> </Form.Group> :
                                <Form.Group className="mb-3" controlId={reverseObjectZhKeys[e[0]]}>
                                  <Form.Label
                                    style={{ right: '5px', top: '3px', cursor: 'pointer' }}
                                    className='position-absolute text-secondary '>
                                    <FaRegEdit className='fs-5' />
                                  </Form.Label>

                                  <Form.Select
                                    size="sm"
                                    className='w-75 mt-1 mb-1 '
                                    style={{ fontSize: '1.125rem' }}
                                    aria-label="Default select example">

                                    {
                                      tabsFormKeys[reverseObjectZhKeys[e[0]]].map(e => (
                                        <option
                                          defaultValue={reverseObjectZhKeys[e[0]]}
                                          value={reverseObjectZhKeys[e[0]]}>
                                          {
                                            e
                                          }
                                        </option>
                                      ))

                                    }
                                  </Form.Select>
                                </Form.Group>
                            }
                          </Form> : e[1]
                        }

                      </span>
                    </ListGroup.Item>))
                }
                <ListGroup.Item>
                  <span>
                    部門:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      currentSelectedMemo.data.department || '-----'
                    }
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>
                    上傳者:
                  </span>
                  <br />
                  <span className='fw-bold' style={{ fontSize: '1.1rem' }}>
                    {
                      currentSelectedMemo.data.owner || '-----'
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
                      moment(currentSelectedMemo.data.date.created).format('YYYY-MM-DD h:mm:ss a')
                    }
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container >
  );
}

