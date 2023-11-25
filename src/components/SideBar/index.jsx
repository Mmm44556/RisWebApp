import {Nav } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDashboardCustomize, MdAccountBox, MdPeople, MdAnalytics } from "react-icons/md";
import { GrSystem } from "react-icons/gr";


function SideBar({ userState }) {

  const { normalInfo } = userState;
 
  const navigator = useNavigate();
  let url = useLocation(); //匹配當前路由
  url = url.pathname.split('/');
  return (
    <Nav defaultActiveKey="dataList" variant="pills" activeKey={url[2]} className="flex-column" as="ul">
      <Nav.Item as="li" className="text-center p-2">
        <Nav.Link eventKey="dataList"
          onClick={() => navigator('dataList', {})}
          title="dataList"
          className="fs-4">
          <GrSystem className="fs-4" />
          <span className="ms-2 fs-5">RIS-System</span>

        </Nav.Link>
      </Nav.Item>
      <hr />
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('dataList', { replace: true })}
          eventKey="dataList"
          title="dataList">
          <MdDashboardCustomize />檔案列表
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('analysis', { replace: true })}
          eventKey="analysis"
          title="analysis">
          <MdAnalytics />報告分析
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator(`user/${normalInfo.user_id}`, { replace: true })}
          eventKey="user"
          title="user">
          <MdAccountBox />個人資料
        </Nav.Link>
      </Nav.Item>
      {normalInfo.role_uid == 1 ? <Nav.Item as="li">
        <Nav.Link
          onClick={() => navigator('employees', { replace: true })}
          eventKey="employees"
          title="employees">
          <MdPeople />用戶資料
        </Nav.Link>
      </Nav.Item>
        : null}

    </Nav>
  )
}
export default SideBar;