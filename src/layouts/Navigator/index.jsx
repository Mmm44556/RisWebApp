import { memo, useState, useCallback } from 'react';
import { Container, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import { AiFillSetting } from "react-icons/ai";
import { BsFilterLeft, BsSearch } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import Preference from './Preference';

function Navigator() {
  const [LoginShow, setIsLoginShow] = useState(false);
  const openModal = useCallback(() => setIsLoginShow(true), [])
  const closeModal = useCallback(() => setIsLoginShow(false), [])
  let searchParams = useLocation();
  return <>
    <Navbar expand={"sm"} className="shadow p-3 mb- bg-body-tertiary rounded bg-light" collapseOnSelect sticky="top">
      <Container >
        {searchParams.pathname.split('/')[1] === "DashBoard" ? <><NavDropdown title={<span type="button" className="btn btn-outline-secondary border-0 ">
          <BsFilterLeft className='fs-4' /></span>} id="collasible-nav-dropdown" className='me-3'>
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
        </NavDropdown>
          <Navbar.Brand className="fs-5">

            <Form.Group controlId="exampleForm.ControlInput1" className='position-relative'>
              <div className='position-absolute end-0 '>
                <Form.Label>
                  <BsSearch className='m-2 me-3' style={{ cursor: "pointer" }} />
                </Form.Label>
              </div>
              <Form.Control type="email" placeholder="Search" />
            </Form.Group>
          </Navbar.Brand></> : null}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="" />
        <Navbar.Collapse id="responsive-navbar-nav" className="fs-4 ">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link >---</Nav.Link>
            <Nav.Link >---</Nav.Link>
            <Nav.Link >
              <AiFillSetting onClick={openModal} className='h-100' />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    <Preference show={LoginShow} setOnHide={closeModal} />
  </>

}

export default memo(Navigator);