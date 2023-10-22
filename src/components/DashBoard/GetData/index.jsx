import { useState, useCallback, useEffect, lazy, Suspense,memo } from 'react'
import { Table, Button, Card, Collapse, CloseButton, Stack } from 'react-bootstrap';
import { useQueryClient, QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import Paginate from '../../../layouts/Pagination';
import CreateBtn from '../CreateFolder';
import PathCrumb from '../pathCrumb';

import FetchTime from '../performance';
import DirectoryList from '../DirectoryList'
import { useInitialData } from '../../../hooks/useInitialData';
import { useCreateFolder } from '../../../hooks/useCreateFolder';
import { useUploaded } from '../../../store/uploadReducer';
import { IsUploadedFiles } from '../../../context';
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";
import style from '../../../scss/style.module.scss';
const UploadedList = lazy(() => delay(import('./uploadList')))

const folderKeys = {
  all: ['dataFolderRoot'],
  folder: (name) => [...folderKeys.all, { directory: name }],
  fileDetails: (fileName) => [...folderKeys.folder, fileName]
}

function GetData ({ userState })  {
  const queryClient = useQueryClient();
  const [state, dispatch] = useUploaded();
  const [dirName, setDirName] = useState({ api: 'initial.php', folderName: 'data' });
  const [path, setPath] = useState([dirName.folderName]);
  //上傳成功顯示
  const [showCreateDone, setShowCreateDone] = useState(false);
  const toggleShow = () => setShowCreateDone(!showCreateDone);
  const [createDetail, setCreateDetail] = useState({ detail: '', theme: '', spinner: false });
  //進入資料夾路徑
  const forwardDir = useCallback((dir, id) => setPath((v) => {
    v.push(dir)

    //選取顯示狀態重製
    if (v.length == 2) {
      const resetIniData = queryClient.getQueryData(["dataFolderRoot", { "directory": "initial.php" }])
      resetIniData[id].selected = false;
    }
    return [...v]
  }), [])
  //初始化資料
  const { data, isSuccess, isFetching } = useInitialData(folderKeys.folder, dirName);
  //創建資料夾觸發refetch
  const mutation = useCreateFolder(setShowCreateDone, setCreateDetail);

  const fetchPerformance = showCreateDone && <FetchTime showCreateDone={showCreateDone} toggleShow={toggleShow} createDetail={createDetail} />
  const editedRowText = userState.normalInfo.role_uid ==1 ? 'edit' : '';


  const Bundles = {
    Directory: {
      data,
      path,
      dirName,
      userState,
      forwardDir,
      setDirName,
    },
    PathCrumb: {
      path,
      dirName,
      setDirName,
      setPath,

    }
  }
  const loading = isFetching && <Loading info="Loading..." />;
  const success = isSuccess ? <DirectoryList DirectoryBundle={Bundles.Directory} /> : <Loading info="No network connection!" />;

  return (
    <>

      {fetchPerformance}
      <div className={style.upload}>
        <PathCrumb PathCrumbBundle={Bundles.PathCrumb} />
        {userState.normalInfo.role_uid == 1 && path.length === 1 ? <CreateBtn mutation={mutation} /> : null}
      </div>
      <IsUploadedFiles.Provider value={dispatch}>
        <Table responsive="sm" hover className='text-start'>
          <thead>
            <tr>
              <th>Name</th>
              <th>type</th>
              <th>Last modified</th>
              <th>size</th>
              <th className='text-center'>{editedRowText}</th>
            </tr>
          </thead>
          {
            loading || success
          }
        </Table>
        <div className='d-flex justify-content-end'>
          <Paginate />
        </div>
        {state.isUploaded ? <FilesStateBar UploadedState={state} dispatch={dispatch} /> : null}
      </IsUploadedFiles.Provider>
    </>)


}

function delay(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
// style = {{ backgroundColor: '#f2f2f2cc' }}
function HorizontalButtons({ close, setOpen, open }) {
  return (
    <Stack direction="horizontal" gap={3}  >
      <a href='#'
        onClick={() => setOpen(!open)}
        className='ms-auto link-secondary link-opacity-50-hover'>
        <BiLeftArrowAlt style={{ fontSize: '1.7rem' }} />
      </a>
      <CloseButton onClick={close} style={{ boxShadow: 'none' }} />
    </Stack>
  );
}


const FilesStateBar = ({ UploadedState, dispatch }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(UploadedState)
  }, [UploadedState])
  const close = () => {
    setOpen(!open)
    dispatch({ type: 'reset' })
  }

  return (
    <aside className={`position-fixed bottom-0 start-0 ${style.uploadWrap}`}>
      {open && <HorizontalButtons close={close} setOpen={setOpen} open={open} />
      }
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className='position-absolute bottom-0 rounded fs-2 btn-outline-light'
        variant="light"
        style={{ backgroundColor: 'lightgray' }}
      >

        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " style={{ fontSize: "0.5em" }}>
          {UploadedState.sum}
        </span>
        <FaFileUpload />
      </Button>

      <div style={{ height: 'min-content' }}>

        <Collapse in={open} dimension="width">

          <div id="example-collapse-text position-absolute bottom-0 ">
            <Card body className={style.uploadCard}>

              <Suspense fallback={<Loading info={'loading...'} />}>
                <UploadedList {...UploadedState} />
              </Suspense>
            </Card>
          </div>
        </Collapse>
      </div>
    </aside>
  );
}

const Loading = ({ info }) => {

  return (
    <table>
      <tbody className={style.userSelect}>
        <tr>
          <td>{info}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default memo(GetData);