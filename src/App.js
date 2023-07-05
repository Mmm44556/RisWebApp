import { useReducer, useCallback, useMemo } from "react";
import { Col, Row,Container } from "react-bootstrap";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { Navigator } from "./components/Navigator/Navigator";
import { DashBoard } from './components/DashBoard/DashBoard';
import { reducer } from './reducer'


function App() {
  //reducers處理登入
  const reducers = useCallback(reducer, []);
  const initial = useMemo(() => ({
    isLogging: false
  }), [])

  const [state, dispatch] = useReducer(reducers, initial);
  const signIn = useCallback(() => dispatch({ type: 'LoggedIn' }), [])
  return (
    <>


      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">
        <Container fluid>
          <Row>
            <Col className="border" xxl={2}>
              123
            </Col>
            <Col xxl={10} className="border p-0 ">
              <Col   >
                <Navigator signIn={signIn} isLogin={state} />
              </Col>
              <Col >
                <DashBoard showUploader={state} />
              </Col>
            </Col>
          </Row>
        </Container>

      </ThemeProvider>



    </>
  );
}

export default App;
