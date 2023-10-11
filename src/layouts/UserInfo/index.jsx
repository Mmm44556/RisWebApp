import React, { memo } from 'react'
import { Table } from 'react-bootstrap';
import { userToKeys } from './userToKey';
const fontStyle = 'fw-bold'
function UserInfo({ userState }) {
  return (
    <Table responsive
     className='mt-4 border shadow p-3 mb-5 bg-body-tertiary rounded'>
      <tbody>
        <tr>
          <td>
            <h4 className={fontStyle}>用戶資訊</h4>
            {userToKeys.normalInfo(userState.normalInfo).length ?
              userToKeys.normalInfo(userState.normalInfo) : '尚無資料'}
          </td>
        </tr>
        <tr>
          <td>
            <h4 className={fontStyle}>醫療部門</h4>
            <tr>
              {userToKeys.medicalInfo(userState.medicalInfo).length ?
                userToKeys.medicalInfo(userState.medicalInfo) : '尚無資料'}
            </tr>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className={fontStyle}>其他</h4>
            <tr>
              
              {userToKeys.restInfo(userState.restInfo).length ?
                userToKeys.restInfo(userState.restInfo) : '尚無資料'}
                
            </tr>
          </td>

        </tr>
      </tbody>
    </Table>
  )
}

export default memo(UserInfo);
