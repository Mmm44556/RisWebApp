import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Register from '@authentication/Register';
import styled from 'styled-components';

const OffcanvasContainer = styled(Offcanvas)`
width: fit-content !important;
`

function AddMember({ isFetching, children }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary"
        onClick={handleShow}
        disabled={isFetching}
      >
        {children}
      </Button>
      <OffcanvasContainer
        show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body
          className='sssss'
        >
          <Register
            Title={<>註冊新用戶</>}
            service={'admin'}
            location={`sign-up/${btoa('admin')}`}
          />
        </Offcanvas.Body>
      </OffcanvasContainer>

    </>
  );
}


export default AddMember;