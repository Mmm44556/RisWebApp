import React, { useRef, useContext,useEffect,useCallback,useMemo } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Form, useSearchParams } from 'react-router-dom';
import { IsAdminLogin } from '../context';
export const Authentication = React.memo(({ show, setOnHide }) => {
  const user = useContext(IsAdminLogin);
  let [searchParams, setSearchParams] = useSearchParams({ q: '', o: false });
  let q = searchParams.get('q')
  let o = searchParams.get('o')
  const account = useRef('');
  const password = useRef('');
  const user2 = new Map(Object.entries(user.isLogin));
  const userArr = [];
  const userToKeys = useMemo(() => ({
    user_name: '名稱',
    user_mail: '信箱',
    user_sex: '性別',
    user_age: '年齡',
    user_phone: '電話'
  })) 
    user2.delete('role_uid')
    user2.forEach((v, k) => {
      userArr.push(<tr className='border border-start-0'>
        <td className='fs-5 p-3'>{userToKeys[k]}</td>
        <td className='p-3' >{v}</td>
      </tr>)
    })

  return (

    <Modal show={show} onHide={setOnHide} tabIndex={0}>
      <Modal.Header closeButton >
        <Modal.Title className="fw-semibold">設置</Modal.Title>
      </Modal.Header >
      <Modal.Body>
        <Form>
            <Table className='border-2 rounded-end mt-3' >
              <tbody>
                <thead >
                  <tr className='border-0'>
                    <th className="p-2 fw-bold fs-4">基本資料</th>
                  </tr>
                </thead>
                {userArr}
               
              </tbody>
            </Table>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setOnHide}>
          保存
        </Button>
        <Button variant="primary" >
          登出
        </Button>
      </Modal.Footer>
    </Modal>
  );

})

function Profile(params) {
  return (
    <>
    
    </>
  )
  
}

  // < Form >

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
  //           <Form.Label column sm={2}>
  //             姓名
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="email" placeholder="Name" />
  //           </Col>
  //         </Form.Group>
  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
  //           <Form.Label column sm={2}>
  //             信箱
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="email" placeholder="Email" />
  //           </Col>
  //         </Form.Group>
       
  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
  //           <Form.Label column sm={2}>
  //             密碼
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="password" placeholder="Password" />
  //           </Col>
  //         </Form.Group>
  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
  //           <Form.Label column sm={2}>
  //             電話
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="email" placeholder="Phone" />
  //           </Col>
  //         </Form.Group>

  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
  //           <Form.Label column sm={2}>
  //             年齡
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="password" placeholder="Age" />
  //           </Col>
  //         </Form.Group>
  //         <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
  //           <Form.Label column sm={2}>
  //             性別
  //           </Form.Label>
  //           <Col sm={10}>
  //             <Form.Control type="password" placeholder="Sex" />
  //           </Col>
  //         </Form.Group>
  //       </ >