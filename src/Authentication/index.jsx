import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs,Image } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, Outlet } from 'react-router-dom';
import background from '@assets/images/sys.png';
import style from "@style";
export default function Authentication() {
  const Navigate = useNavigate();
  const queryClient = useQueryClient();
  //註冊通過轉導
  const [registerConfirm, setRegisterConfirm] = useState('sign-in');
  const [registerStatus, setRegisterStatus] = useState({ is: false, info: '' });


  useEffect(() => {
    Navigate('sign-in', { replace: true })
    queryClient.removeQueries();
  }, [])
  return (
    <>
      <Container fluid className={style.authContainer} >

        <Row >
          <Col xl={4} md={4} sm={4} xs={4} className='p-0'>
          
          </Col>
          <Col xl={4} md={4} sm={4} xs={4} className='border m-0 p-0'>

            <Tabs
              defaultActiveKey="Login"
              id="controlled-tab-example"
              activeKey={registerConfirm}

              fill
              onSelect={e => {
                Navigate(e, { replace: true })
                setRegisterConfirm(e)
                setRegisterStatus(e => ({ ...e, is: false, info: '' }))
                return e
              }}

            >
              <Tab eventKey="sign-in" title="登入" />
              <Tab eventKey="sign-up" title="註冊" />
            </Tabs>

            <Outlet context={[Navigate, setRegisterConfirm, setRegisterStatus]} />
            {registerStatus.is ? <h2 className={style.regiCheck}>{registerStatus.info}</h2> : null}
          </Col>
          <Col xl={4} md={4} sm={4} xs={4} className='p-0'>

          </Col>
        </Row>
      </Container>
    </>
  )
}


