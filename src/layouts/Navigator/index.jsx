import React, {  useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiFillSetting} from "react-icons/ai";
import { Authentication } from '../../Authentication';

export const Navigator = React.memo(() => {
  const [LoginShow, setIsLoginShow] = useState(false);
  const openModal = useCallback(() => setIsLoginShow(true), [])
  const closeModal = useCallback(() => setIsLoginShow(false), [])

  return <>
    <Navbar expand={"lg"} className="shadow p-3 mb-3 bg-body-tertiary rounded bg-light" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand href="#" className="fs-5" style={{height:'50px'}}></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="position-absolute end-0 me-5" />
        <Navbar.Collapse id="responsive-navbar-nav" className="fs-4">
          <Nav className="me-5 position-absolute end-0">
            <Nav.Link >---</Nav.Link>
            <Nav.Link >---</Nav.Link>
            <Nav.Link >
              <AiFillSetting onClick={openModal} className='h-100' />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    <Authentication show={LoginShow} setOnHide={closeModal} />
  </>

})