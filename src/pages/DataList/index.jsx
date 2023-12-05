import { memo, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Breadcrumb } from 'react-bootstrap';
import { VscFiles } from "react-icons/vsc";
import { FaArrowCircleRight } from "react-icons/fa";
import styled from 'styled-components';


import { type } from "@utils/departmentKeys";

const Hover = styled.div`
  cursor:pointer;
a{
  cursor:pointer;
}
.card{
}
`
const Font = styled.div`
*{
  font-weight:bold;
}
`



const swappedType = Object.fromEntries(
  Object.entries(type).map(([key, value]) => [value.title, key])
);
function DataList() {
  const location = useLocation();
  const navigator = useNavigate();
  const path = location.pathname.slice(1).split('/');
  path.shift();
  const [currentPath, setCurrentPath] = useState(() => path);


  useEffect(() => {
    setCurrentPath(v => {
      path.splice(1, 1);
      return path;
    }
    )
  }, [location.pathname])

  return (
    <>
      <Breadcrumb
        className="text-end"
      >
        {
          currentPath.map(e => {
            return (

              <Breadcrumb.Item
                className="fs-4"
                linkProps={
                  {
                    className: "text-decoration-none fs-4 text-secondary fw-lighter"
                  }
                }
                onClick={(e) => {
                  if (e.target.innerText==='Home'){
                    navigator(`/DashBoard/${currentPath[0]}`)
                    return;
                  }
                  return;
                }} >
                {
                  swappedType[e]
                }
              </Breadcrumb.Item>

            )
          })
        }
      </Breadcrumb>
      <Outlet context={[navigator]} />
    </>

  );
}
export function Root(params) {

  const [navigator] = useOutletContext();


  return (
    <>
      <Font>
        <Container fluid>
          <Row className="mb-5">
            {
              ['內科', '外科', '骨科', '放射科'].map((e, idx) => {
                return (
                  <Col key={idx}>
                    <Hover bg={type[e].bg} gd={type[e].gradient}>
                      <Card
                        style={{ background: type[e].bg }}
                        onClick={() => navigator(`type/${type[e].title}`)}

                      >
                        <Card.Body className="text-white d-flex justify-content-between text-nowrap">
                          <div>
                            <Card.Title>
                              {e}
                            </Card.Title>
                            <Card.Text>
                              數量:&nbsp;{idx}
                            </Card.Text>
                          </div>
                          <div>
                            <VscFiles className="fs-1 me-2 text-black-50" />
                          </div>
                        </Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item
                            className="text-center p-0"
                            style={{ backgroundColor: type[e].footer }}
                          >
                            <Card.Link
                              className="text-decoration-none text-white"
                            >
                              More info
                              <FaArrowCircleRight className="ms-1" />
                            </Card.Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Hover>
                  </Col>
                )
              })
            }

          </Row>
          <Row className="mb-5">
            {
              ['臨床醫師未提回', '報告覆閱工作'].map((e, idx) => {
                return (
                  <Col key={idx}>
                    <Hover bg={type[e].bg} gd={type[e].gradient}>
                      <Card
                        style={{ background: type[e].bg }}
                        onClick={() => navigator(`type/${type[e].title}`)}>
                        <Card.Body className="text-white d-flex justify-content-between  text-nowrap">
                          <div>
                            <Card.Title>
                              {e}
                            </Card.Title>

                            <Card.Text>
                              {idx}
                            </Card.Text>
                          </div>
                          <div>
                            <VscFiles
                              style={{ fontSize: '3.5cqw' }}
                              className=" me-4 text-black-50" />
                          </div>
                        </Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item
                            className="text-center "
                            style={{ backgroundColor: type[e].footer }}>
                            <Card.Link
                              className="text-decoration-none text-white"
                            >
                              More info
                              <FaArrowCircleRight className="ms-1" />
                            </Card.Link>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Hover>
                  </Col>
                )
              })
            }
          </Row>

          <Row>
            {
              ['院內各科報告', '本周已完成報告'].map((e, idx) => {
                return (
                  <Col key={idx}>
                    <Card >
                      <Card.Body className="ps-0 pe-0">
                        <Card.Title className="border-bottom">
                          {e}
                        </Card.Title>
                        <Card.Text>
                          <Row>


                            {
                              [1, 2].map(e => {
                                return (
                                  <Col>
                                    123
                                  </Col>
                                )
                              })
                            }
                          </Row>
                        </Card.Text>

                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </Container >
      </Font>
    </>
  )
}

export default memo(DataList);
