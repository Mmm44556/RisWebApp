import React, { useEffect, useState, useMemo } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, Outlet } from 'react-router-dom';

import style from "../assets/scss/style.module.scss";
export default function Authentication() {
  const Navigate = useNavigate()
  //註冊通過轉導
  const [registerConfirm, setRegisterConfirm] = useState('Login');
  const [registerStatus,setRegisterStatus] = useState({is:false,info:''});
  
  useEffect(() => {
    Navigate('Login', { replace: true })
  }, [])
  return (
    <>
      <Container fluid className={style.authContainer} >

        <Row className='x'>
          <Col xl={9} md={9} sm={9} xs={6}>
            1 of 1
          </Col>

          <Col xl={3} md={3} sm={3} xs={6} className='border-start m-0 p-0'>

            <Tabs
              defaultActiveKey="Login"
              id="controlled-tab-example"
              activeKey={registerConfirm}
              fill
              onSelect={e => {
                Navigate(e, { replace: true })
                setRegisterConfirm(e)
                setRegisterStatus(e => ({...e,is: false, info: ''}))
                return e
              }}

            >
              <Tab eventKey="Login" title="登入" />
              <Tab eventKey="Register" title="註冊" />
            </Tabs>
            
            <Outlet context={[Navigate, setRegisterConfirm, setRegisterStatus]} />
            {registerStatus.is ? <h2 className={style.regiCheck}>{registerStatus.info}</h2>:null}
          </Col>
        </Row>
      </Container>
    </>
  )
}


