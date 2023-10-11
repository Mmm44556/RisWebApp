import React, { memo } from 'react'
import { Table } from 'react-bootstrap';
import { userToKeys } from './userToKey';
const fontStyle = 'fw-bold'
function UserInfo({ userState }) {
  console.log(userToKeys.normalInfo(userState.medicalInfo))
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
              {userToKeys.normalInfo(userState.medicalInfo).length ?
                userToKeys.normalInfo(userState.medicalInfo) : '尚無資料'}
            </tr>
          </td>
        </tr>
        <tr>
          <td>
            <h4 className={fontStyle}>其他</h4>
            <tr>
              {userToKeys.normalInfo(userState.restInfo).length ?
                userToKeys.normalInfo(userState.restInfo) : '尚無資料'}
            </tr>
          </td>

        </tr>
      </tbody>
    </Table>
  )
}

export default memo(UserInfo);
