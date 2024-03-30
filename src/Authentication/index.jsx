import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tab, Tabs, Image } from 'react-bootstrap';

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, Outlet } from 'react-router-dom';
import background from '@assets/images/sys.png';
import style from "@style";
export default function Authentication() {
  const Navigate = useNavigate();
  const queryClient = useQueryClient();
  //註冊通過轉導
  const [registerConfirm, setRegisterConfirm] = useState('sign-in');

  useEffect(() => {
    Navigate('sign-in', { replace: true })
    queryClient.removeQueries();
  }, [])
  return (
    <div className={style.backgroundImg} >
      <Container fluid className={style.authContainer} >

        <Row >
          <Col xl={4} md={4} sm={4} xs={4} className='p-0'>

          </Col>
          <Col className=' m-0 p-0'>

            <Tabs
              defaultActiveKey="sign-in"
              activeKey={registerConfirm}
              fill
              onSelect={e => {
                Navigate(e, { replace: true })
           
                setRegisterConfirm(e)
                return e
              }}

            >
              <Tab eventKey="sign-in" title="登入" />
              <Tab eventKey="sign-up" title="註冊" />
            </Tabs>

            <Outlet context={[Navigate, setRegisterConfirm]} />
          </Col>
          <Col xl={4} md={4} sm={4} xs={4} className='p-0'>

          </Col>
        </Row>
      </Container>
    </div>
  )
}


