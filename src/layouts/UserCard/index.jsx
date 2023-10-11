import React,{Suspense} from 'react'
import {  Card, ListGroup, Image } from 'react-bootstrap';
export default function UserCard({ userState }) {
  return (
    <Card className='mt-4 text-center shadow p-3 mb-5 bg-body-tertiary rounded'>
      <Card.Body>
        <Card.Title className='pb-2'>
            <Image src="https://picsum.photos/171/180?random=2" roundedCircle fluid  />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <p>{userState["user_name"].toUpperCase()}</p>
          <p>放射科醫師</p>
        </Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <address>
              <a href={`mailto:${userState["user_mail"]}`}>
                {userState["user_mail"]}
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
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
