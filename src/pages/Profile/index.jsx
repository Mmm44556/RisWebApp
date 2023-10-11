import React, { useContext } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import UserCard from '../../layouts/UserCard';
import UserInfo from '../../layouts/UserInfo';
import { LoginUserInfo } from '../../context';

export default function Profile() {
  let { userState } = useContext(LoginUserInfo);

  return (
    <Container fluid className='mt-5'>
      <Row>
        <Col sm={3}>
          <UserCard userState={userState} />
        </Col>
        <Col sm={9} className='pe-4'>
          <UserInfo userState={userState} />
        </Col>
      </Row>
    </Container>
  )
}