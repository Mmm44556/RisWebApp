import React from 'react'
import { Container, Tabs, Tab, Row, Col, Nav, Card, Stack, Button, Form, Badge, Modal, Spinner } from 'react-bootstrap';
import UserCard from '../../layouts/UserCard';
export default function Proposal({ proposals }) {
  const [firstData] = proposals;

  return (
    <Container
      style={{ height: '100dvh', overflowY: scroll }}
    >
      <Tab.Container
        defaultActiveKey={firstData.data.proposalCtx[0].time || ''}
      >
        <Row>
          <Col sm={3}>
            <Tab.Content>
              {
                proposals.map(e => {
                  const { data } = e;
                  const { proposalCtx } = data;

                  return proposalCtx.map((user) => {
                    
                    return (
                      <Tab.Pane eventKey={user.time}>
                        <UserCard
                        userState={user.proposer}
                        role={''}
                        />
                      </Tab.Pane>)

                  })
                })
              }
            </Tab.Content>
          </Col>
          <Col sm={9}>
            <Nav variant="pills" className="flex-column">
              {
                proposals.map(e => {
                  const { data } = e;
                  const { proposalCtx } = data;
                  return proposalCtx.map((user) => {
                    return (<Nav.Item>
                      <Nav.Link eventKey={user.time}>
                        {
                          user.time
                        }
                      </Nav.Link>
                    </Nav.Item>)

                  })
                })
              }


            </Nav>

          </Col>
        </Row>
      </Tab.Container>
    </Container>

  )
}
