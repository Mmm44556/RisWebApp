import React, { useReducer, useContext, memo } from "react";
import { Col, Row, Container, Nav } from "react-bootstrap";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Navigator } from "../../layouts/Navigator";
import { useLogin } from "../../store/userInI";
import { LoginUserInfo } from "../../context";
import { useLoaderData, Outlet, useNavigate, useLocation, useRouteLoaderData } from 'react-router-dom';
import { GrSystem } from "react-icons/gr";
import { MdDashboardCustomize, MdAccountBox, MdLogout, MdPeople, MdAnalytics } from "react-icons/md";
import style from "../../scss/style.module.scss";

function Dash() {
  const userJson = useLoaderData();
  const z = useRouteLoaderData ("auth");
  console.log(z)
  const [initial, reducers] = useLogin(JSON.parse(userJson?.data));
  const [userState, dispatch] = useReducer(reducers, initial);
  return (
    <>
      <LoginUserInfo.Provider value={{ userState, dispatch }}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid>
            <Row>
              <Col className={style.leftBreakpoint} xl={2} >

                {/* 功能表 */}
                <DashList />
              </Col>
              <Col xl={10} className={style.rightBreakpoint} >
                <Col   >
                  <Navigator />
                </Col>
                <Col >
                  {/* DashBoard內部路由組件 */}
                  <Outlet context={[userState, dispatch ]} />
                </Col>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>

      </LoginUserInfo.Provider>

    </>
  );
}
const DashList = memo(() => {
  const { userState } = useContext(LoginUserInfo);
  const navigator = useNavigate();
  let url = useLocation();
  url = url.pathname.split('/');
  return (
    <Nav defaultActiveKey="DashBoard" variant="pills" activeKey={url[1]} className="flex-column" as="ul">
      <Nav.Item as="li" className="text-center p-2">
        <Nav.Link eventKey="DashBoard"
          onClick={() => navigator('DashBoard', {})}
          title="dashBoard"
          className="fs-4">
          <GrSystem className="fs-4" />
          <span className="ms-2 fs-5">RIS-System</span>

        </Nav.Link>
      </Nav.Item>
      <hr />
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('DashBoard', { replace: true })}
          eventKey="DashBoard"
          title="dashBoard">
          <MdDashboardCustomize />檔案列表
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('Analysis', { replace: true })}
          eventKey="Analysis"
          title="analysis">
          <MdAnalytics />報告分析
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('Profile', { replace: true })}
          eventKey="Profile"
          title="profile">
          <MdAccountBox />個人資料
        </Nav.Link>
      </Nav.Item>
      {userState.normalInfo.role_uid == 1 ? <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('Employees', { replace: true })}
          eventKey="Employees"
          title="employees">
          <MdPeople />員工資料
        </Nav.Link>
      </Nav.Item>
        : null}
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('Logout', { replace: true })}
          eventKey="Logout"
          title="logout">
          <MdLogout /> 登出系統
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
})

export default Dash;
