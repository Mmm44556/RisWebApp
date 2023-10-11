import React, { useRef } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Form, useSearchParams } from 'react-router-dom';

const Preference = React.memo(({ show, setOnHide }) => {
  let [searchParams, setSearchParams] = useSearchParams({ q: '', o: false });
  let q = searchParams.get('q')
  let o = searchParams.get('o')
  const account = useRef('');
  const password = useRef('');

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

export default Preference;