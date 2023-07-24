import React, { useReducer, useCallback, useMemo } from "react";
import { Col, Row, Container } from "react-bootstrap";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Navigator } from "./layouts/Navigator";
import DashBoard from './components/DashBoard';
import { useLogin } from "./store/userInI";
import { IsAdminLogin } from "./context";


function App() {
  const [initial, reducers] = useLogin();
  const [state, dispatch] = useReducer(reducers, initial);
  const signIn = () => dispatch({ type: 'LoggedIn' })
  const userLogin = useMemo(() =>({
      isLogin: state,
      signIn
  }), [state])
  return (
    <>

      <IsAdminLogin.Provider value={userLogin}>
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs">
          <Container fluid>
            <Row>
              <Col className="border" xxl={2} lg={2}>
                123
              </Col>
              <Col xxl={10} lg={10} className="border p-0 " style={{ height: "100vh" }}>
                <Col   >
                  <Navigator/>
                </Col>
                <Col >
                  <DashBoard showUploader={state} />
                </Col>
              </Col>
            </Row>
          </Container>

        </ThemeProvider>

      </IsAdminLogin.Provider>

    </>
  );
}

export default App;
