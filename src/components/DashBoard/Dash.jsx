import React, { useReducer, useMemo,memo } from "react";
import { Col, Row, Container, Nav } from "react-bootstrap";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Navigator } from "../../layouts/Navigator";
import { useLogin } from "../../store/userInI";
import { IsAdminLogin } from "../../context";
import { useLoaderData,Outlet,useNavigate } from 'react-router-dom';
import { GrSystem } from "react-icons/gr";
import { MdDashboardCustomize, MdAccountBox, MdLogout, MdPeople } from "react-icons/md";
import style from "./css/style.module.scss";

function Dash() {
  const userJson = useLoaderData();

  const [initial, reducers] = useLogin(JSON.parse(userJson?.data));

  const [state, dispatch] = useReducer(reducers, initial);
  const userLogin = useMemo(() => ({
    isLogin: state,
  }), [state])
  return (
    <>
      <IsAdminLogin.Provider value={userLogin}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid>
            <Row>
              <Col className={style.leftBreakpoint} xl={2} >
                
                {/* 功能表 */}
                <DashList userLogin={userLogin}  />
              </Col>
              <Col xl={10} className={style.rightBreakpoint} >
                <Col   >
                  <Navigator />
                </Col>
                <Col >
                {/* DashBoard內部路由組件 */}
                  <Outlet context={[userLogin]}/>
                </Col>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>

      </IsAdminLogin.Provider>

    </>
  );
}
const DashList=memo(({ userLogin: { isLogin } })=> {
  const navigator = useNavigate();
  return (
    <Nav defaultActiveKey="DashBoard" variant="pills" className="flex-column" as="ul">
      <Nav.Item as="li" className="text-center p-2">
        <Nav.Link eventKey="DashBoard"
         onClick={() => navigator('DashBoard', {})}
          title="dataList"
          className="fs-4">
          <GrSystem className="fs-4 me-2" />RIS-System
          </Nav.Link>
      </Nav.Item>
      <hr/>
      <Nav.Item as="li">
        <Nav.Link eventKey="DashBoard"
         onClick={() => navigator('DashBoard', {})}
          title="dataList">
          <MdDashboardCustomize/>檔案列表
          </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="profile"
         onClick={() => navigator('Profile',{})} 
          title="Profile">
          <MdAccountBox/>個人資料
          </Nav.Link>
      </Nav.Item>
      {isLogin.role_uid == 1 ? <Nav.Item as="li">
        <Nav.Link 
        eventKey="employees"
         title="employees">
          <MdPeople />員工資料
        </Nav.Link>
      </Nav.Item>
      :null}
      <Nav.Item as="li">
        <Nav.Link
          eventKey="logout"
          title="logout">
          <MdLogout /> 登出系統
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
})

export default Dash;
