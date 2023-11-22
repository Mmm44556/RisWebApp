import { useReducer, useState, useEffect, Suspense, useContext } from "react";
import { Col, Row, Container, Nav, Modal, Button, ThemeProvider } from "react-bootstrap";
import Navigator from "../../layouts/Navigator";
import { useLogin } from "../../store/userInI";
import { useLoaderData, Outlet, useNavigate, useLocation, useRouteLoaderData } from 'react-router-dom';

import { GrSystem } from "react-icons/gr";
import { MdDashboardCustomize, MdAccountBox, MdLogout, MdPeople, MdAnalytics } from "react-icons/md";
import FetchPerformance from "../../layouts/FetchPerformance";
import { themeContext } from "../../context";
import style from "../../assets/scss/style.module.scss";

function useInitialUserInfo() {
  const userJson = useLoaderData();

  const [initial, reducer] = useLogin(userJson);
  const [userState, dispatch] = useReducer(reducer, initial);

  return { userState, dispatch }
}


function DashBoard() {

  const [theme, setTheme] = useState(()=>{
    if (localStorage.getItem('theme') === 'Dark') return false;
    return true;
  });


  //用戶資料，存放至reducer、context作為全局狀態
  const { userState, dispatch } = useInitialUserInfo();

  //系統提示Toast
  const [ToastDetail, setToastDetail] = useState({ detail: '', theme: 'Success', spinner: false, timeStamp: "" });
  const [showToast, setShowToast] = useState(false);
  const toggleShow = () => setShowToast(!showToast);
  const navigator = useNavigate();


  useEffect(() => {
    navigator('dataList', { replace: true });
  }, [])
  return (
    <>
      <themeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid >
            <Row>
              <Col className={style.leftBreakpoint} xl={2} as="aside"

              >
                {/* 功能表 */}
                <DashList userState={userState} />
              </Col>
              <Col xl={10} className={style.rightBreakpoint} as="main">
                <Col   >
                  <Navigator normalInfo={userState.normalInfo} />
                  <FetchPerformance showToast={showToast} createDetail={ToastDetail} toggleShow={toggleShow} />
                </Col>
                <Col style={{ minHeight: '100vh' }} >
                  {/* DashBoard內部路由組件 */}
                  <Suspense fallback={<h1>loading.....</h1>}>
                    <Outlet context={[userState, dispatch, setToastDetail, setShowToast, showToast]} />
                  </Suspense>
                </Col>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>
      </themeContext.Provider>
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
          <MdPeople />用戶資料
        </Nav.Link>
      </Nav.Item>
        : null}

    </Nav>
  )
}


export default DashBoard;
