import React, { useState, useEffect } from 'react';
import { Button, Dropdown, ListGroup, Image } from 'react-bootstrap';

import { IoNotificationsOutline } from "react-icons/io5";
import styled from 'styled-components';
import style from '@style';

const ScaleDown = styled.div`
	-webkit-animation:${({ animationName }) => animationName} 0.4s ease-out  backwards !important;
  animation: ${({ animationName }) => animationName} 0.4s ease-out  backwards !important;

@-webkit-keyframes scale-up-tr {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
  }
}
@keyframes scale-up-tr {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
            opacity:0;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: 100% 0%;
            transform-origin: 100% 0%;
            opacity:1;
  }
}

`


const CustomToggle = React.forwardRef(({ children, onClick, setAnimationName }, ref) => (
  <Button
    variant='light'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      setAnimationName(v => !v);
      onClick(e)
    }
    }
    style={{ borderRadius: '50px' }}
  >
    {children}
  </Button>
));

const CustomMenu = React.forwardRef(
  (props, ref) => {
    const { children, style, className, 'aria-labelledby': labeledBy, animationName } = props;


    return (
      <ScaleDown
        animationName={animationName ? 'scale-up-tr' : ''}>
        <div
          ref={ref}
          style={{ ...style, transform: "translateX(-90%)" }}
          className={`${className} p-0  `}
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
          <ListGroup>
            {
              ['', 'secondary', 'secondary', ''].map((e, index) => (
                <ListGroup.Item action
                  key={index}
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
      </ScaleDown>
    );
  },
);




function DirectMsg() {
  const [animationName, setAnimationName] = useState(false)

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}
        id="dropdown-custom-components"
        setAnimationName={setAnimationName}>
        <div className='position-relative'>
          <IoNotificationsOutline />
          <span
            className={`start-100 translate-middle 
            ${style.navigator_badge}`} />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        as={CustomMenu}
        animationName={animationName}>
      </Dropdown.Menu>
    </Dropdown>
  );
}



export default DirectMsg