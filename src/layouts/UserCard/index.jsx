import { Card, ListGroup, Image, ProgressBar } from 'react-bootstrap';
export default function UserCard({ userState: { normalInfo, medicalInfo }, Figure }) {
  return (
    <Card className='mt-4 text-center shadow p-3 mb-5 bg-body-tertiary rounded'>
      <Card.Body>
        <Card.Title className='pb-2'>
          {Figure??null}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <p>{normalInfo["user_name"]}</p>
          <p>{medicalInfo["position_name"]}</p>
        </Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <address>
              <a href={`mailto:${normalInfo["user_mail"]}`}>
                {normalInfo["user_mail"]}
              </a>
            </address>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-around'>
            <span>
              報告量
            </span>
            <span>
              10
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <ProgressBar now={10}  />
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
