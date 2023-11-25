import { useState } from "react";
import { Col, Row, Container, ThemeProvider } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import SideBar from "@components/SideBar";
import Navigator from "@layouts/Navigator";
import FetchPerformance from "@layouts/FetchPerformance";
import { themeContext } from "@context";
import { useUser } from "@hooks";
import style from "@style";


function DashBoard() {

  //設置主題
  const [theme, setTheme] = useTheme();
  //設置系統提示
  const { ToastDetail, setToastDetail} = useSysToastDetail();
  const { toggleShow, showToast, setShowToast } = useSysToastShow();
  //用戶資料
  const { data, status } = useUser();
  const userState = data;

  return (
    <>
      {status == 'success' ? <themeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid >
            <Row>
              <Col className={style.leftBreakpoint} xl={2} as="aside"

              >
                {/* 功能表 */}
                <SideBar userState={userState} />
              </Col>
              <Col xl={10} className={style.rightBreakpoint} as="main">
                <Col   >
                  <Navigator normalInfo={userState.normalInfo} />
                  <FetchPerformance showToast={showToast} createDetail={ToastDetail} toggleShow={toggleShow} />
                </Col>
                <Col style={{ minHeight: '100vh' }} >

                  <Outlet context={[userState, setToastDetail, setShowToast, showToast]} />

                </Col>
              </Col>
            </Row>
          </Container>
        </ThemeProvider>
      </themeContext.Provider> : 'loading...'}
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
  const [ToastDetail, setToastDetail] = useState({ detail: '', theme: 'Success', spinner: false, timeStamp: "" });
  return { ToastDetail, setToastDetail}
}
function useSysToastShow() {
  //系統Toast顯示
  const [showToast, setShowToast] = useState(false);
  const toggleShow = () => setShowToast(!showToast);
  return { toggleShow, showToast, setShowToast }
}


export default DashBoard;
