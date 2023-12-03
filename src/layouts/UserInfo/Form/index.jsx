import { Suspense, lazy, memo } from 'react';
import { Button } from 'react-bootstrap';
import { userToKeys } from '../../../hooks/userToKey';
import style from '@style';
import { useInfoValidation } from '@hooks/userInfoValidation';
import EditModal from '../EditModal';


function Form({ fetch: { normalInfo, setNormalInfo, editButton, edit, fetcher, userState, setToastDetail, setShowToast, showToast } }) {

  const { normalInfoChangeCallBack, setNormalInfoCallBack } = useInfoValidation(setNormalInfo, userState);

  return (
    <>
      <fetcher.Form
        onInput={normalInfoChangeCallBack(setNormalInfo)}
        className={style.normalInfo}
      >
        <table>
          {userToKeys.normalInfo(normalInfo).length ?
            userToKeys.normalInfo(normalInfo, edit) : '尚無資料'}
        </table>
        <div className="hstack gap-3 position-absolute end-0 top-0 mt-2 me-2">
          <EditModal
            edit={edit}
            type={'submit'}
            userState={userState}
            setToastDetail={setToastDetail}
            setShowToast={setShowToast}
            showToast={showToast}
            fetcher={fetcher}
          />

          <EditModal
            setNormalInfo={setNormalInfoCallBack}
            type={'reset'}
            edit={edit}
            setToastDetail={setToastDetail}
            setShowToast={setShowToast}
          />


          <Button variant="light" className='fw-bold' type='button'
            onClick={editButton}
          >
            {edit ? '儲存' : '編輯'}
          </Button>
        </div>
      </fetcher.Form>
    </>
  )
}
export default memo(Form);