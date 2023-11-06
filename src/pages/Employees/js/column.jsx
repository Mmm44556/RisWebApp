import { Image } from "react-bootstrap";
import { Media } from 'react-data-table-Component';
const columns = [
  {
    name: 'ID',
    selector: row => row.user_id,
    hide: Media.MD

  },
  {
    name: '用戶名稱',
    selector: row => row.user_name,
    sortable: true,
    reorder: true,
  },
  {
    name: '報告量',
    selector: row => row.reports,
    sortable: true,
    reorder: true,
    hide: Media.SM
  },
  {
    name: '部門',
    selector: row => row.department_name,
    sortable: true,
    reorder: true,
    hide: Media.MD
  },
  {
    name: '職稱',
    selector: row => row.position_name,
    sortable: true,
    reorder: true,
  },
  {
    name: '上次登入',
    selector: row => row.lastTimeLogin,
    sortable: true,
    reorder: true,
    hide: Media.MD
  },
  {
    name: '狀態',
    selector: row => row.status,
    sortable: true,
    reorder: true,
  },
];
const data = [
  {
    id: 1,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'Beetlejuice',
    reports: 10,
    department_name: '放射診斷科',
    position_name: '主治醫師',
    lastTimeLogin: new Date().toLocaleDateString(),
    status: 'online'
  },
  {
    id: 7,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'Beetlejuice',
    reports: 10,
    department_name: '放射診斷科',
    position_name: '主治醫師',
    lastTimeLogin: new Date().toLocaleDateString(),
    status: 'online'
  },
  {
    id: 2,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'Ghostbusters',
    reports: 15,
    department_name: '磁振造影MRI組',
    position_name: '醫事放射師',
    lastTimeLogin: new Date().toLocaleDateString(),
    status: 'online'
  },
  {
    id: 3,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'hhjdrre',
    reports: 15,
    department_name: '磁振造影MRI組',
    position_name: '醫事放射師',
    lastTimeLogin: new Date('2019').toLocaleDateString(),
    status: 'offline'
  },
  {
    id: 4,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'adasdsad',
    reports: 15,
    department_name: '電腦斷層CT組',
    position_name: 'MRI組長',
    lastTimeLogin: new Date('2019').toLocaleDateString(),
    status: 'offline'
  },
  {
    id: 5,
    user_id: <Image src="https://picsum.photos/35/35" roundedCircle />,
    user_name: 'adasdsad',
    reports: 15,
    department_name: '電腦斷層CT組',
    position_name: 'MRI組長',
    lastTimeLogin: new Date('2019').toLocaleDateString(),
    status: 'offline'
  },
]

export { columns, data }