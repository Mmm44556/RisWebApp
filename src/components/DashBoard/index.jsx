import { useReducer, useContext, memo, useState, useEffect } from "react";
import { Col, Row, Container, Nav, Modal, Button, ThemeProvider } from "react-bootstrap";
import Navigator from "../../layouts/Navigator";
import { useLogin } from "../../store/userInI";
import { LoginUserInfo } from "../../context";
import { useLoaderData, Outlet, useNavigate, useLocation, useRouteLoaderData } from 'react-router-dom';
import { GrSystem } from "react-icons/gr";
import { MdDashboardCustomize, MdAccountBox, MdLogout, MdPeople, MdAnalytics } from "react-icons/md";
import style from "../../scss/style.module.scss";



function DashBoard() {
  const userJson = useLoaderData();
  const [initial, reducers] = useLogin(JSON.parse(userJson?.data));
  const [userState, dispatch] = useReducer(reducers, initial);
  const navigator = useNavigate();
  const z = useRouteLoaderData("auth");
  // console.log(z)
  useEffect(() => {
    navigator('dataList', { replace: true });
  }, [])

  return (
    <>

      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">
        <Container fluid>
          <Row>
            <Col className={style.leftBreakpoint} xl={2} >

              {/* 功能表 */}
              <DashList userState={userState} />
            </Col>
            <Col xl={10} className={style.rightBreakpoint} >
              <Col   >
                <Navigator />
              </Col>
              <Col >
                {/* DashBoard內部路由組件 */}
                <Outlet context={[userState, dispatch]} />
              </Col>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </>
  );
}
function DashList({ userState }) {
  const { normalInfo } = userState;
  const navigator = useNavigate();
  let url = useLocation(); //匹配當前路由
  url = url.pathname.split('/');
  return (
    <Nav defaultActiveKey="dataList" variant="pills" activeKey={url[2]} className="flex-column" as="ul">
      <Nav.Item as="li" className="text-center p-2">
        <Nav.Link eventKey="dataList"
          onClick={() => navigator('dataList', {})}
          title="dataList"
          className="fs-4">
          <GrSystem className="fs-4" />
          <span className="ms-2 fs-5">RIS-System</span>

        </Nav.Link>
      </Nav.Item>
      <hr />
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('dataList', { replace: true })}
          eventKey="dataList"
          title="dataList">
          <MdDashboardCustomize />檔案列表
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('analysis', { replace: true })}
          eventKey="analysis"
          title="analysis">
          <MdAnalytics />報告分析
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator(`user/${normalInfo.user_id}`, { replace: true })}
          eventKey="user"
          title="user">
          <MdAccountBox />個人資料
        </Nav.Link>
      </Nav.Item>
      {userState.normalInfo.role_uid == 1 ? <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('employees', { replace: true })}
          eventKey="employees"
          title="employees">
          <MdPeople />員工資料
        </Nav.Link>
      </Nav.Item>
        : null}
      <Nav.Item as="li">
        <Nav.Link
          eventKey="logout"
          title="logout">
          <LogOutBtn normalInfo={normalInfo} navigator={navigator} />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
function LogOutBtn({ normalInfo, navigator }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p onClick={handleShow} style={{ fontSize: "1.1rem", padding: 0 }} >
        <MdLogout /> 登出系統
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>系統提示</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center fw-bold">
          <pre className="text-start">
            <p>登出帳號: {normalInfo.user_name}</p>
            <p>系統時間: {new Date().toLocaleString()}</p>
          </pre>
          <p>---登出後將會保留當前紀錄---</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
          <Button variant="danger" onClick={() => navigator('Logout', { replace: true })}>
            登出
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DashBoard;
