
import { Media } from 'react-data-table-component';
const sex ={
  'MALE':'男',
  'FEMALE':'女',
  'Bisexual':'跨性別'
}
const columns = [
  {
    name: 'ID',
    selector: row =>{
      if(row.uuid) return row.uuid.slice(0,8);
      return row.uuid
    },
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
    selector: row => row.reports??'無',
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
    name: '性別',
    selector: row => sex[row.user_sex.toUpperCase()],
    sortable: true,
    reorder: true,
  },
  {
    name: '註冊時間',
    selector: row => new Date(row.user_register_time).toLocaleDateString(),
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
export { columns }