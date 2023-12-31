import { memo, useState, lazy, Suspense, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Form, NavDropdown, Button } from 'react-bootstrap';
import { IoNotificationsOutline } from "react-icons/io5";
import { BsFilterLeft, BsSearch } from "react-icons/bs";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import style from '@style';
import { themeContext } from '@context';
import { Figure } from '@assets/styled';

const Logout = lazy(() => import('../../Authentication/Logout'));
const DirectMsg = lazy(() => import('../../components/DashBoard/DirectMsg'));



const switchTheme = (setTheme) => () => setTheme(v => {
  if (v) {
    localStorage.setItem('theme', 'Dark');
  } else {
    localStorage.setItem('theme', 'Light');
  }
  return !v;
})

function Navigator({ normalInfo }) {
  const { theme, setTheme } = useContext(themeContext);
  const { show, LogoutModalHandle } = useLogoutModal();
  let searchParams = useLocation();

  return <>

    <Navbar expand={"sm"}
      style={{ zIndex: '1000' }}
      className="shadow p-1  rounded bg-light"
      collapseOnSelect
    >

      <Container >
        {searchParams.pathname.split('/').includes("dataList") ? <><NavDropdown title={<span type="button" className="btn btn-outline-secondary border-0 ">
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

        <Navbar.Toggle aria-controls="responsive-navbar-nav"

        />
        <Navbar.Collapse id="responsive-navbar-nav" >

          <Nav className="me-auto" />
          <Nav className={style.navigator_tabs}>
            <Nav.Item>
              <Button
                variant="light"
                className="d-inline-flex "
                style={{ borderRadius: "50px" }}
                onClick={switchTheme(setTheme)}
              >
                {
                  theme === true ? <MdOutlineLightMode /> : <MdOutlineNightlight />
                }
              </Button>
            </Nav.Item>

            <Nav.Item >
              <Suspense fallback={<h6>loading....</h6>}>
                <DirectMsg />
              </Suspense>

            </Nav.Item>
            <Nav.Item >
              <NavDropdown
                title={<>
                  <Figure bg={(localStorage.getItem('figure') ?? '#fff')}>{normalInfo['user_name'].charAt(0)}</Figure>
                  {normalInfo['user_name']}</>}
                id="navbarScrollingDropdown">

                <NavDropdown.Item href="#action3" >
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item >

                  <Suspense fallback={<h6>loading....</h6>}>
                    <Logout normalInfo={normalInfo}
                      show={show} LogoutModalHandle={LogoutModalHandle} />
                  </Suspense>

                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>

}

export default memo(Navigator);


function useLogoutModal() {
  //控制登出介面
  const [show, setShow] = useState(false);
  const LogoutModalHandle = () => setShow(v => !v);
  return { show, LogoutModalHandle }
}
