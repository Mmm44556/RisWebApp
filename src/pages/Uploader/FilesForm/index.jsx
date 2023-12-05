import { useState, memo } from 'react'
import { Form, Col, Row, Container } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import { parts, selection } from '@utils/uploadFormKeys';


const Calender = styled.div`
input{
  outline:none;
  border:1px solid #ced4da;
  border-radius:.375rem;
  
}
`
const ContainerProps = styled(Container)`
input,select,span{
  font-size:1.2cqw;
  &[type="time"]{
    margin-right:5px;
  }
}
.deadline{
  font-weight:700;
  margin-right:5px;
}
`

function FilesForm({ setForm }) {
  const [isRadiology, setIsRadiology] = useState(false);
  //是否添加額外補充
  const [additional, setAdditional] = useState(false);
  const saveInput = ({ target }) => {
    setForm(v => {
      v[target.name] = target.value;
      if (target.name === 'permission') {
        v[target.name] = target.checked;
      }

      if (target.name === 'additional' && target.checked==false){
        delete v.description;
        delete v.additional;
      }
      if (!(target.value === "RADIOLOGY") && target.name === 'department') {
        delete v.parts;
        delete v.time;
        delete v.month;
      }
      return v;
    })
  }
  return (
    <ContainerProps>
      <Form
        onChange={saveInput}
      >
        <Row>
          <Col>
            <div>
              <Form.Label htmlFor="reportTitle">病例編號</Form.Label>
              <Form.Control
                type="text"
                id="reportTitle"
                name="title"
                aria-describedby="reportTitleHelpBlock"
              />
              <Form.Text id="reportTitleHelpBlock" muted>
                編號格式:[A-z]-[0-9]
              </Form.Text>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label htmlFor="patientName">病患姓名</Form.Label>
              <Form.Control
                type="text"
                name="patient"
                id="patientName"
                aria-describedby="patientNameHelpBlock"
              />
            </div>
          </Col>
        </Row>
        <Row>
          {
            selection.map(e => {
              return (

                <Col md={12} lg={12} sm={12} className='mb-4'>
                  <Form.Select
                    aria-label="medical selection"
                    id={e.title}
                    name={e.name}
                    onChange={({ target }) => {
                      //判斷是放射科才開放欄位
                      if (target.name === 'department') {
                        if (target.value === 'RADIOLOGY') {
                          setIsRadiology(true);
                          return;
                        }
                        setIsRadiology(false);
                        return;
                      }
                    }}
                  >
                    <option

                      value={e.default}>
                      {e.title}
                    </option>
                    {
                      Object.entries(e.values).map(v => {
                        return (
                          <option value={v[0]}>{v[1]}</option>
                        )
                      })
                    }
                  </Form.Select>
                </Col>

              )
            })
          }
          {
            isRadiology ? <>
              <Col md={12} lg={12} sm={12} className='mb-4'>
                {
                  parts.map(e => {

                    return (
                      <Form.Select
                        name={e.name}
                        aria-label="medical selection"
                      >
                        <option value={e.default}>{e.title}</option>
                        {
                          Object.entries(e.values).map(v => {
                            return (
                              <option value={v[0]}>{v[1]}</option>
                            )
                          })
                        }
                      </Form.Select>
                    )
                  })
                }
              </Col>  </> : null
          }

          {
            isRadiology ? <Col md={12} lg={12} sm={12} className='mb-3'> <Calender>
              <div className='deadline'>設置截止時間:</div>
              <input type="time" name="time" min="09:00" max="18:00" required />
              <input
                id="month"
                type="month"
                name="month"
                min={moment().format('YYYY-MM')}
                max={moment().format('YYYY-MM')}
                required
                pattern="[0-9]{4}-[0-9]{2}" />
            </Calender>   </Col> : null
          }


          <Col>
            <Form.Check
              type="switch"
              id="permission"
              label="開啟訪問權限"
              name="permission"
            />

          </Col>
          <Col>
            <Form.Check
              type="switch"
              id="additional"
              name="additional"
              onClick={(e) => setAdditional(e.target.checked)}
              label="添加額外說明"
            />
          </Col>
          {
            additional ? <Additional/> : null
          }
        </Row>
      </Form>
    </ContainerProps>
  )
}

function Additional(){
  return (
    <Col md={12} lg={12} ms={12}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>說明:</Form.Label>
        <Form.Control name="description" as="textarea" rows={3} />
      </Form.Group>

    </Col> 
  )
}

export default memo(FilesForm);