import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { fetcherState } from '../../../hooks/userToKey';
//表單提交
const useSubmission = (fetcher, normalInfo, setShowToast, edit) => {
  const location = useLocation();
  useEffect(() => {
    setShowToast(!edit);
    if (!edit == true) {
      //提交表單
      fetcher.submit(normalInfo, {
        method: "PUT",
        action: location.pathname
      });
    }
  }, [edit])
}

//設定系統提示內容
function setSysToast(hint, setToastDetail, fetcher) {
  const type = {
    success: {
      detail: '儲存成功',
      theme: 'Success',
      spinner: fetcherState[fetcher.state],
      timeStamp: new Date().toLocaleTimeString()
    }
  }
  //設定系統提示:提交狀態
  if (fetcher.state == 'submitting') {
    setToastDetail(prev => ({ ...prev, spinner: fetcherState[fetcher.state] }))
  }
  setToastDetail({ ...type[hint] });
}


//設定開啟系統提示內容、保存
function editTrigger(setEdit, setToastDetail, fetcher) {
  return () => {
    setSysToast('success', setToastDetail, fetcher);
    setEdit(v => !v);
  }

}

export { useSubmission, setSysToast, editTrigger }