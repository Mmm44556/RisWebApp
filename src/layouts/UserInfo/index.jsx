import { memo, useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { Table } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query'
import { useFetcher } from 'react-router-dom';

import Form from './Form';
import { userToKeys } from './hooks/userToKey';
import { useSubmission, editTrigger } from './hooks/useForm';

const fontStyle = 'fw-bold';


function UserInfo({ userState, setToastDetail, setShowToast, showToast }) {
  const fetcher = useFetcher();
  const fetcherState = fetcher?.data;
  //用戶資料狀態
  const [normalInfo, setNormalInfo] = useState({ ...userState.normalInfo });
  //開啟編輯模式
  const [edit, setEdit] = useState(true);
  const editButton = editTrigger(setEdit, setToastDetail, fetcher);
  //觸發提交表單
  useSubmission(fetcher, normalInfo, setShowToast, edit);


  const queryClient = useQueryClient();

  useEffect(() => {
    //提交成功後將緩存的用戶資料更新
    if (edit == false) {
      const user = queryClient.getQueryData(['userCtx']);
      const submittedForm = normalInfo;
      const mutationUser = { ...user, normalInfo: { ...submittedForm } };
      queryClient.setQueryData(['userCtx'], mutationUser);
      console.log(queryClient.getQueryData(['userCtx']))

    }
  }, [edit])
  return (
    <Table responsive
      className='mt-4 border shadow p-3 mb-5 bg-body-tertiary rounded' >
      <tbody>
        <tr>
          <td className='position-relative'>
            <h4 className={fontStyle}>用戶資訊</h4>
            <Form fetch={{ normalInfo, setNormalInfo, editButton, edit, fetcher, userState, setToastDetail, setShowToast, showToast }} />
          </td>
        </tr>
        <tr>
          <td>
            <h4 className={fontStyle}>醫療部門</h4>
            {userToKeys.medicalInfo(userState.medicalInfo).length ?
              userToKeys.medicalInfo(userState.medicalInfo) : '尚無資料'}
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


// console.log("fetcher state:", fetcher.state)
// console.log("fetcher formData:", Object.fromEntries(fetcher.formData|| new FormData()) )
// console.log("fetcher formMethod:", fetcher.formMethod)
// console.log("fetcher formAction:", fetcher.formAction)
// console.log("fetcher formEncType:", fetcher.formEncType)
// console.log("fetcher data:", fetcher.data)
// console.log("當前資料:", normalInfo);
// console.log("原始資料:",userState.normalInfo)





export default memo(UserInfo);
