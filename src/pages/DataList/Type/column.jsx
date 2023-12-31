import {  Badge } from 'react-bootstrap';
import moment from 'moment';
const customFilesStyles = {
  table: {
    style: {
      minHeight: '50dvh'
    },
  },

  rows: {
    style: {
      minHeight: '45px',
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
const TypeBadges={
  'ER': {
    str: '急診',
    bg:'danger'
  },
  'OPD': {
    str: '門診',
    bg:'primary'
  },
  'PE':{
    str: '健檢',
    bg:'success'
  },
  'MC': {
    str:'體檢',
    bg:'secondary'
  },
  'IP':{
    str:'住院',
    bg:'warning'
  }
}
const fileColumns = [
  {
    name: '#',
    selector: (row,idx) =>idx,
    compact: true
  },
  {
    name: '類別',
    selector: row =>{
      const type = TypeBadges[row.data.type]
      return <Badge bg={type.bg} style={{fontSize:"1cqi"}} >
        {type.str}
      </Badge>
    },
    sortable: true,
    reorder: true,

  },
  {
    name: '姓名',
    selector: row => row.data.patient,
    sortable: true,
    reorder: true,
  },
  {
    name: '治療部位',
    selector: row => row.data.parts,
    sortable: true,
    reorder: true,
  },
  {
    name: '檢查方法',
    selector: row => row.data.inspection,
    sortable: true,
    reorder: true,
  },
  {
    name: '剩餘時間',
    selector: row => moment().to(row.data.date?.deadline, true),
    sortable: true,
    reorder: true,
  }
]

export { fileColumns, customFilesStyles, TypeBadges };