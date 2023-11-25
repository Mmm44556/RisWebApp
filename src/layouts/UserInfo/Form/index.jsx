import { Suspense, lazy,memo } from 'react';
import { Button } from 'react-bootstrap';
import { userToKeys } from '../hooks/userToKey';
import style from '@style';
import { useInfoValidation } from '@hooks/userInfoValidation';
const EditModal = lazy(() => import('../EditModal'));

function Form({ fetch: { normalInfo, setNormalInfo, editButton, edit, fetcher, userState, setToastDetail, setShowToast, showToast } }) {

  const { normalInfoChangeCallBack, setNormalInfoCallBack } = useInfoValidation(setNormalInfo, userState);

  return (
    <>
      <fetcher.Form

        onInput={normalInfoChangeCallBack(setNormalInfo)}
        className={style.normalInfo}
      >
        {userToKeys.normalInfo(normalInfo).length ?
          userToKeys.normalInfo(normalInfo, edit) : '尚無資料'}
        <div className="hstack gap-3 position-absolute end-0 top-0 mt-2 me-2">
          <Suspense fallback={<h1>loading....</h1>}>
            <EditModal
              edit={edit}
              type={'submit'}
              userState={userState}
              setToastDetail={setToastDetail}
              setShowToast={setShowToast}
              showToast={showToast}
              fetcher={fetcher}
            />
          </Suspense>
          <Suspense fallback={<h1>loading....</h1>}>
            <EditModal
              setNormalInfo={setNormalInfoCallBack}
              type={'reset'}
              edit={edit}
              setToastDetail={setToastDetail}
              setShowToast={setShowToast}
            />
          </Suspense>

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