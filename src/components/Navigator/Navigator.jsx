import React, {  useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Authentication } from '../Authentication';

export const Navigator = React.memo(({ signIn, isLogin }) => {
  const [LoginShow, setIsLoginShow] = useState(false);
  const openModal = useCallback(() => setIsLoginShow(true), [])
  const closeModal = useCallback(() => setIsLoginShow(false), [])
  return <>
    <Navbar expand={"lg"} className="shadow p-3 mb-3 bg-body-tertiary rounded bg-light" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand href="#" className="fs-5">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="position-absolute end-0 me-5" />
        <Navbar.Collapse id="responsive-navbar-nav" className="fs-4">
          <Nav className="me-5 position-absolute end-0">
            <Nav.Link >---</Nav.Link>
            <Nav.Link >---</Nav.Link>
            <Nav.Link >
              <LoginIcon isLogin={isLogin} signIn={signIn} setIsLog={openModal} />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    <Authentication signIn={signIn} show={LoginShow} setOnHide={closeModal} />
  </>

})

const LoginIcon = React.memo(({ isLogin, signIn, setIsLog })=>{


  return (
    <>
      {isLogin.isLogging ? <FiLogOut onClick={signIn} className='h-100' /> : <FaUserCircle onClick={setIsLog} className='h-100' />}
    </>
  )
})