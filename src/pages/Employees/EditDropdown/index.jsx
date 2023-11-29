import { forwardRef, useState, useEffect, useMemo } from 'react'
import { Dropdown, Button, DropdownItem, Container, Row, Col } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { MdAutoDelete } from "react-icons/md";
import { BsThreeDotsVertical, BsWrench } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import UserContainer from '@layouts/UserContainer';
import UserCard from '@layouts/UserCard';
import { userToKeys } from '@hooks/userToKey';
import useEditGroup from '../js/useEditGroup';
import userInitial from '@store/userInitial';

import styled from 'styled-components';


const EnhButton = styled(Button)`
border:none;
transition:all 0.3s ease-out;

svg{
font-size:1.4rem;
transition:inherit;
transform:${(({ open }) => open ? 'rotate(-90deg)' : '')}

}
&:hover{
  background:#859cb1d1;
}
`
const EnhDropdown = styled(DropdownItem)`
font-weight:bold;
padding-right:0;
svg{
margin-right:5px;
}

`

const CustomToggle = forwardRef(({ children, onClick, setIsOpen }, ref) => {
  return (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(v => !v)
        onClick(e);
      }}
    >
      {children}
    </a>
  )
});


const CustomMenu = forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy, show, setIsOpen }, ref) => {
    useEffect(() => {
      if (!show) {
        setIsOpen(false)
      }
    }, [show])
    return (
      <div
        ref={ref}
        style={{ ...style, transform: "translateX(-25%)" }}
        className={`${className}`}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled m-0 text-start ">
          {
            children
          }
        </ul>
      </div>
    );
  },
);

function confirmResult(user_name, setDeleteInfo) {
  let result = confirm(`確定刪除該筆資料? ${user_name}`);
  setDeleteInfo(result);
  return result;
}


export default function EditDropdown({ userData, page }) {
  const [userState, setToastDetail, setShowToast, showToast] = useOutletContext();
  const setToast = (details) => {
    setShowToast(v => !v);
    setToastDetail({ ...details });
  }
  const editUser = useMemo(() => userInitial(userData));

  const [open, setIsOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useEditGroup(queryClient, page, setToast, deleteInfo);


  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} setIsOpen={setIsOpen} id="dropdown-custom-components">
        <EnhButton variant="outline-secondary" open={open}>
          <BsThreeDotsVertical />
        </EnhButton>

      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        setIsOpen={setIsOpen}>
        <EnhDropdown eventKey="1"
        >
          <UserContainer
            title={<> <BsWrench className='text-secondary me-1 ' />編輯</>}
            header={< >人員資料修改-<FaUser className='fs-5  align-baseline' />
            {userData.user_name}</>}>
            <Container>
              <Row >
                <Col lg={4}>
                  <UserCard userState={editUser} 
                  Figure={null}/>
                </Col>
                <Col>
                {
                    userToKeys.normalInfo(editUser.normalInfo)
                }
                </Col>
              </Row>


            </Container>


          </UserContainer>
        </EnhDropdown>

        <EnhDropdown eventKey="2"
          onClick={(e) => {
            confirmResult(userData.user_name, setDeleteInfo);
            mutate(userData)
          }}>
          <MdAutoDelete className='text-danger' />
          刪除
        </EnhDropdown>

      </Dropdown.Menu>



    </Dropdown>
  );
}


