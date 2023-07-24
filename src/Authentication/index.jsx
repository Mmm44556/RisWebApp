import React,{ useRef, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { IsAdminLogin } from '../context';
export const Authentication = React.memo(({ show, setOnHide }) => {
  const {  signIn } = useContext(IsAdminLogin);
  const account = useRef('');
  const password = useRef('');
  const admin = () => {
    if (account.current.value.trim() === "root" && password.current.value.trim() === "1234") {
      signIn()
      setOnHide()
    }
  }



  return (

    <Modal show={show} onHide={setOnHide}  tabIndex={0} onKeyDown={(e)=>{
      if (e.keyCode === 13) admin();
      return
    }}>
      <Modal.Header closeButton >
        <Modal.Title className="fw-semibold">編輯系統</Modal.Title>
      </Modal.Header >
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" ref={account} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" ref={password} />
            </Col>
          </Form.Group>
          <fieldset>

          </fieldset>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setOnHide}>
          Close
        </Button>
        <Button variant="primary" onClick={admin} >
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );

})