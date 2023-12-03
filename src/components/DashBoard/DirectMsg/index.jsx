import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown, ListGroup } from 'react-bootstrap';
import { Figure } from '@assets/styled';
import { IoNotificationsOutline } from "react-icons/io5";
import styled from 'styled-components';
import style from '@style';

const ScaleDown = styled.div`

  animation: ${({ animationName }) => animationName};

}
@keyframes scale-up-tr {
  0% {
            transform: scale(0);
            transform-origin: 100% 0%;
  }
  100% {
            transform: scale(1);
            transform-origin: 100% 0%;
          
  }
}

`


const CustomToggle = React.forwardRef((props, ref) => {
  const { children, onClick, setAnimationName } = props
  useEffect(() => {
    if (/show/i.test(props.className) == false) setAnimationName(false);
  }, [props.className])
  return (
    <Button
      variant='light'
      ref={ref}
      onClick={(e) => {

        setAnimationName(v => !v);
        e.preventDefault();
        onClick(e)
      }
      }
      style={{ borderRadius: '50px' }}
    >
      {children}
    </Button>
  )
});

const CustomMenu = React.forwardRef(
  (props, ref) => {
    const { children, style, className, 'aria-labelledby': labeledBy, animationName } = props;


    return (
      <ScaleDown
        animationName={animationName ? 'scale-up-tr  0.4s ease-out  backwards !important' : null}
      >
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
          <ListGroup >
            {
              ['', 'secondary', 'secondary', ''].map((e, index) => (
                <ListGroup.Item action
                  key={index}
                  variant={e}
                  className='d-flex flex-row border-bottom  border-0'
                >
                  <div className='d-flex'>
                    <div>

                      <Figure>2</Figure>
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
    <Dropdown

    >
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
        setAnimationName={setAnimationName}
        animationName={animationName}>
      </Dropdown.Menu>
    </Dropdown>
  );
}



export default DirectMsg