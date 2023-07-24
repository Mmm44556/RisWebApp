
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { AiOutlineCheck } from "react-icons/ai";

const FetchTime = ({ showCreateDone, toggleShow, createDetail })=> {


  return (
    <Row >
      <Col md={6} className="mb-2 position-absolute start-50" style={{transform:'translateX(-50%)'}}>
        <Toast show={showCreateDone} onClose={toggleShow} bg={createDetail.theme} >
          <Toast.Header>
            {createDetail.spinner ? <Spinner animation="border" variant={createDetail.theme} style={{width:'1rem',height:'1rem'}} />:<AiOutlineCheck/>}
            <strong className="me-auto">Information</strong>
            <small>{createDetail.timeStamp}</small>
          </Toast.Header>
          <Toast.Body>{createDetail.detail}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
export default FetchTime

