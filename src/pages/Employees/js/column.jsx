import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import EditDropdown from '../EditDropdown';
import { Media } from 'react-data-table-component';
import { Figure } from '@assets/styled';
const sex = {
  'MALE': {
    text: '男',
    color: 'rgb(79 140 255)'
  },
  'FEMALE': {
    text: '女',
    color: 'rgb(255 2 2 / 56%)'
  },
  'BISEXUAL': {
    text: '跨性別',
    color: 'rgb(177 171 171 / 56%)'
  },
}
const role = {
  2: '訪客',
  1: '管理員'
}

const customStyles = {
  table: {
    style: {
      minHeight: '50dvh'
    },
  },

  rows: {
    style: {
      minHeight: '60px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  }

};
function getColumns(page) {
  const columns = [
    {
      name: 'ID',
      selector: row => {
        if (row.uuid) return row.uuid.slice(0, 8);
        return row.uuid
      },
      hide: Media.MD,
      compact: true
    },
    {
      cell: row => {

        return (
          <Figure bg={sex[row.user_sex.toUpperCase()].color}>
            {row.user_name.charAt(0)}
          </Figure>
        )
      },
      hide: Media.SM,
      width: '50px',
      left: true,
      compact: true
    },
    {
      name: '用戶名稱',
      selector: row => row.user_name,
      sortable: true,
      reorder: true,

    },
    {
      name: '報告量',
      selector: row => row.reports ?? '無',
      sortable: true,
      reorder: true,
      hide: Media.SM,
      width: '10%',
      minWidth: '50px',
      compact: true
    },
    {
      name: '部門',
      selector: row => row.department_name,
      sortable: true,
      reorder: true,
      hide: Media.MD,
      width: '10%',
      minWidth: '50px',
      compact: true
    },
    {
      name: '職稱',
      selector: row => row.position_name,
      sortable: true,
      reorder: true,
    },
    {
      name: '權限',
      selector: row => role[row.role_uid],
      sortable: true,
      reorder: true,
      width: '5%',
      minWidth: '50px',
      compact: true
    },
    {
      name: '性別',
      selector: row => sex[row.user_sex.toUpperCase()].text,
      sortable: true,
      reorder: true,
      width: '10%',
      minWidth: '50px',
    },
    // {
    //   name: '註冊時間',
    //   selector: row => new Date(row.user_register_time).toLocaleDateString(),
    //   sortable: true,
    //   reorder: true,
    //   hide: Media.MD,
    //   style: {
    //     color: 'rgba(0, 0, 0, 0.54)'
    //   }
    // },
    {
      name: '上次登入',
      selector: row => {

        const timeString = new Date(row.lastTimeLogin ?? 'N') ?? '尚未登記';
        console.log(timeString)
        return (
          <>
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Tooltip id={`tooltip-${row.uuid}`}>
                  <time dateTime={`${timeString.toLocaleDateString()}`}>{timeString.toLocaleTimeString()}</time>.
                </Tooltip>
              }
            >
              <div variant="secondary">{timeString.toLocaleDateString() ?? '尚未登記'}</div>
            </OverlayTrigger>
          </>
        )
      },
      sortable: true,
      reorder: true,
      hide: Media.MD,
      style: {
        color: 'rgba(0, 0, 0, 0.54)'
      }
    },
    {

      cell: (row) => <EditDropdown userData={row} page={page} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

  ];


  return columns
}

export { getColumns, customStyles, sex }