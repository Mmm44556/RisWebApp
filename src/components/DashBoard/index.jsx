import { useState, Suspense, lazy } from "react";
import { Col, Row, Container, ThemeProvider } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";

import SideBarHolder from "@components/SideBar/SideBarHolder";
import Navigator from "@layouts/Navigator";
import FetchPerformance from "@layouts/FetchPerformance";
import { themeContext } from "@context";
import { useUser } from "@hooks";

import style from "@style";

const SideBar = lazy(() => import("@components/SideBar"));


function DashBoard() {

  //設置主題
  const [theme, setTheme] = useTheme();
  //設置系統提示
  const { ToastDetail, setToastDetail } = useSysToastDetail();
  const { toggleShow, showToast, setShowToast } = useSysToastShow();
  //用戶資料
  const { data, status } = useUser();
  const userState = data;
  return (
    <>

      <themeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid >
            <Row>
              <Col className={style.leftBreakpoint} xl={2} as="aside"
              >
                <Suspense fallback={<SideBarHolder />}>
                  {
                    data ? <SideBar userState={userState} /> : null
                  }
                </Suspense>

              </Col>
              <Col xl={10} className={style.rightBreakpoint} as="main">
                <Col >
                  {
                    status == 'success' ? <Navigator normalInfo={userState.normalInfo} /> : null
                  }
                  <FetchPerformance showToast={showToast} createDetail={ToastDetail} toggleShow={toggleShow} />

                </Col>
                <Col style={{ minHeight: '100vh' }} >
                  {
                    status == 'success' ? <Outlet context={[userState, setToastDetail, setShowToast, showToast]} />
                      : null
                  }
                </Col>

                <footer className="text-end text-secondary opacity-75 ">
                  <hr className="m-1" />
                  <p className="d-inline-block m-1  ">
                    Copyright &copy; 2023 React Bootstrap. Created by Mmm44556.
                    <a href='https://github.com/Mmm44556/RisWebApp'
                      target='_blank'
                      className='text-secondary'
                    >
                      <FaGithub className="fs-4 pb-1" />
                    </a>
                  </p>

                </footer>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>
      </themeContext.Provider>
    </>

  );
}



function useTheme() {
  //設置系統主題
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme') === 'Dark') return false;
    return true;
  });
  return [theme, setTheme]
}
function useSysToastDetail() {
  //系統Toast內容
  const [ToastDetail, setToastDetail] = useState({ detail: '', theme: 'Success', spinner: false, timeStamp: "",show:false });
  return { ToastDetail, setToastDetail }
}
function useSysToastShow() {
  //系統Toast顯示
  const [showToast, setShowToast] = useState(false);
  const toggleShow = () => setShowToast(!showToast);
  return { toggleShow, showToast, setShowToast }
}


export default DashBoard;
