import { memo, useState, useMemo, useCallback } from 'react'
import { Table, Modal } from 'react-bootstrap';
import { useFetcher, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ResetInfo from './ResetInfo';
import { userToKeys } from './userToKey';
import { useInfoValidation } from '../../hooks/userInfoValidation';
import style from '../scss/styles.module.scss';
const fontStyle = 'fw-bold';

const fetcherState = {
  Idle: false,
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

//表單提交驗證
const submitValidation = (submit, dispatch, normalInfo) => () => {
  // submit(normalInfo);
  dispatch({ type: "normalInfo", data: normalInfo });
}


function UserInfo({ getUser, dispatch, userState }) {
  // const { userState, dispatch } = getUser();
  const [normalInfo, setNormalInfo] = useState(() => ({ ...userState.normalInfo }), [userState]);
  console.log('原使:', userState.normalInfo);
  const { setNormalInfoCallBack, normalInfoChangeCallBack, normalInfoChange } = useInfoValidation(userState, setNormalInfo);
  const fetcher = useFetcher();
  //讓原始數據與修改後數據進行對比，用於開啟編輯按鈕(防呆)
  const originalUserState = JSON.stringify(userState.normalInfo, transformToString);
  const UpdatedUserState = JSON.stringify(normalInfo, transformToString);
  let isTheSameData = UpdatedUserState === originalUserState ;
  // console.log(isTheSameData);
  // console.log(userState.normalInfo);
  // console.log(normalInfo);


  // console.log("fetcher state:", fetcher.state)
  // console.log("fetcher formData:", Object.fromEntries(fetcher.formData|| new FormData()) )
  // console.log("fetcher formMethod:", fetcher.formMethod)
  // console.log("fetcher formAction:", fetcher.formAction)
  // console.log("fetcher formEncType:", fetcher.formEncType)
  // console.log("fetcher data:", fetcher.data)

  return (
    <Table responsive
      className='mt-4 border shadow p-3 mb-5 bg-body-tertiary rounded' >
      <tbody>
        <tr>
          <td className='position-relative'>
            <h4 className={fontStyle}>用戶資訊</h4>
            <UserFormData fetch={{ fetcher, normalInfo, dispatch, setNormalInfo, userState, setNormalInfoCallBack, normalInfoChangeCallBack, setNormalInfo,normalInfoChange,isTheSameData }} />
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

function UserFormData({ fetch: { fetcher, normalInfo, dispatch, setNormalInfoCallBack, normalInfoChangeCallBack, setNormalInfo,isTheSameData, normalInfoChange } }) {
  const location = useLocation();

  return (
    <>
      <fetcher.Form
        onChange={normalInfoChange(setNormalInfo)}
        onSubmit={submitValidation(fetcher.submit, dispatch, normalInfo)}
        className={style.normalInfo}
        method='PUT'
        action={`${location.pathname}?`}>

        {userToKeys.normalInfo(normalInfo).length ?
          userToKeys.normalInfo(normalInfo) : '尚無資料'}
        <div className="hstack gap-3 position-absolute end-0 top-0 mt-2 me-2">
          <ResetInfo
            setNormalInfo={setNormalInfoCallBack}
            type={'resetPassword'} />

          <ResetInfo
            setNormalInfo={setNormalInfoCallBack}
            type={'reset'} />
          <Button variant="light" className='fw-bold' type='submit'
            disabled={isTheSameData || fetcherState[fetcher.state]}>
            儲存
          </Button>

        </div>
      </fetcher.Form>

    </>
  )
}






export default memo(UserInfo);
