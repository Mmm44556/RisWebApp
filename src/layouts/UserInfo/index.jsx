import { memo, useState, useMemo, useCallback, useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap';
import { useFetcher, useLocation, Form } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditModal from './EditModal';
import { userToKeys } from './userToKey';
import { useInfoValidation } from '../../hooks/userInfoValidation';
import style from '../scss/styles.module.scss';
const fontStyle = 'fw-bold';

const fetcherState = {
  idle: false,
  submitting: true,
  loading: true,

}

const transformToString = (key, value) => {
  //將value不是字符串的都轉成string類型
  if (key === 'role_uid' || key === 'user_age' || key === 'user_id' || key === 'user_phone') {
    return String(value);
  }
  return value;
};

//表單提交
const useSubmitValidation = (fetcher, dispatch, normalInfo, setEdit, setToastDetail, setShowToast) => {
  const location = useLocation();

  useEffect(() => {
    //切換表單處理狀態
    setToastDetail(prev => ({ ...prev, spinner: fetcherState[fetcher.state] }))
  }, [fetcher.state])


  //更新全局狀態、提交表單、設定開啟系統提示內容
  const editButton = useCallback(() => {
    return setEdit(v => {
      if (v) {
        dispatch({ type: "normalInfo", data: normalInfo });
        fetcher.submit(normalInfo,{
          method:"PUT",
          action: location.pathname
        });
       
        
        setToastDetail({ detail: '儲存成功', theme: 'Success', spinner: fetcherState[fetcher.state], timeStamp: new Date().toLocaleTimeString() });
      }
      setShowToast(v);
      return !v
    })
  })
  return { editButton }
}

function UserInfo({ userState, dispatch, setToastDetail, setShowToast }) {
  const fetcher = useFetcher();

  const [normalInfo, setNormalInfo] = useState({ ...userState.normalInfo });
  const [edit, setEdit] = useState(false);

  const { editButton } = useSubmitValidation(fetcher, dispatch, normalInfo, setEdit, setToastDetail, setShowToast);
  const { normalInfoChangeCallBack, setNormalInfoCallBack } = useInfoValidation(setNormalInfo, userState);



  return (
    <Table responsive
      className='mt-4 border shadow p-3 mb-5 bg-body-tertiary rounded' >
      <tbody>
        <tr>
          <td className='position-relative'>
            <h4 className={fontStyle}>用戶資訊</h4>
            <UserFormData fetch={{ normalInfo, setNormalInfo, setNormalInfoCallBack, normalInfoChangeCallBack, editButton, edit, fetcher }} />
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

function UserFormData({ fetch: { normalInfo, setNormalInfo, setNormalInfoCallBack, normalInfoChangeCallBack, editButton, edit, fetcher } }) {


  return (
    <>
      <fetcher.Form
        onInput={normalInfoChangeCallBack(setNormalInfo)}
        className={style.normalInfo}
      >
        {userToKeys.normalInfo(normalInfo).length ?
          userToKeys.normalInfo(normalInfo, edit) : '尚無資料'}
        <div className="hstack gap-3 position-absolute end-0 top-0 mt-2 me-2">
          <EditModal
            setNormalInfo={()=>console.log('@')}
            edit={edit}
            type={'resetPassword'} />
          <EditModal
            setNormalInfo={setNormalInfoCallBack}
            type={'reset'}
            edit={edit}
            />
          <Button variant="light" className='fw-bold' type={edit ? 'button' : 'button'}
            onClick={editButton}
          >
            {edit ? '儲存' : '編輯'}
          </Button>
        </div>
      </fetcher.Form>
    </>
  )
}
//讓原始數據與修改後數據進行對比，用於開啟編輯按鈕(防呆)
// const originalUserState = JSON.stringify(userState.normalInfo, transformToString);
// const UpdatedUserState = JSON.stringify(normalInfo, transformToString);
// let isTheSameData = UpdatedUserState === originalUserState;
// console.log(isTheSameData);
// console.log(userState.normalInfo);
// console.log(normalInfo);


// console.log("fetcher state:", fetcher.state)
// console.log("fetcher formData:", Object.fromEntries(fetcher.formData|| new FormData()) )
// console.log("fetcher formMethod:", fetcher.formMethod)
// console.log("fetcher formAction:", fetcher.formAction)
// console.log("fetcher formEncType:", fetcher.formEncType)
// console.log("fetcher data:", fetcher.data)
// console.log("當前資料:", normalInfo);
// console.log("原始資料:",userState.normalInfo)





export default memo(UserInfo);
