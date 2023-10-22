import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import UserCard from '../../layouts/UserCard';
import UserInfo from '../../layouts/UserInfo';

export default function Profile() {
  let [userState, dispatch ] = useOutletContext();
  const getUser = useCallback(() => ({ userState, dispatch }), [userState]);

  return (
    <Container fluid className='mt-3'>
      <Row>
        <Col sm={3}>
          <UserCard userState={userState} />
        </Col>
        <Col sm={9} className='pe-4'>
          <UserInfo getUser={getUser} userState={userState} dispatch={dispatch}  />
        </Col>
      </Row>
    </Container>
  )
}