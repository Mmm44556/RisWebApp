import React, { useState } from 'react';
import { Button, Dropdown, ListGroup, Image } from 'react-bootstrap';

import { IoNotificationsOutline } from "react-icons/io5";
import style from '../../../assets/scss//style.module.scss';


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant='light'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ borderRadius: '50px' }}
  >
    {children}
  </Button>
));


const CustomMenu = React.forwardRef(
  (props, ref) => {
    const { children, style, className, 'aria-labelledby': labeledBy } = props;

    return (
      <div
        ref={ref}
        style={{ ...style, transform: "translateX(-90%)" }}
        className={`${className} p-0`}
        aria-labelledby={labeledBy}
      >
        <p className=' fw-bold d-flex justify-content-between p-2 m-0 border-bottom'>
          <span>
            Notifications
          </span>
          <a href='#'>
            Mark all as read
          </a>
        </p>
        <ListGroup
        >
          {
            ['', 'secondary','secondary',''].map(e => (
              <ListGroup.Item action
              variant={e}
                className='d-flex flex-row border-bottom  border-0'
                >
                <div className='d-flex'>
                  <div>
                    
                    <Image src="https://picsum.photos/30/30" roundedCircle className='me-2' />
                  </div>
                  <div className='d-flex flex-column text-nowrap'>
                    <h5 className='m-0'>tim</h5>
                    <p className='m-0'>Mentioned you in a comment 10m</p>
                    <p className='m-0 ms-auto'>{
                      new Date().toLocaleString()
                      
                    }</p>
                  </div>
                </div>
                <div>...more</div>
              </ListGroup.Item>
            ))
          }

        </ListGroup>
      </div>
    );
  },
);

function DirectMsg() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}
        id="dropdown-custom-components"
      >
        <div className='position-relative'>
          <IoNotificationsOutline />
          <span
            className={`start-100 translate-middle 
                  ${style.navigator_badge}`} />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}

      >

        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}



export default DirectMsg