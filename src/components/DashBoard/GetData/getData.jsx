import React, { useEffect, useState, Fragment, useCallback, useRef, useMemo } from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';

import { FcFolder, FcFile } from "react-icons/fc";
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Paginate } from './Pagination/Pagination';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Uploader } from '../Uploader/Uploader';
import { ModifiedBtn } from '../modifyBtn/btn';
import { CreateBtn } from '../CreateFolder/CreateBtn';
import { fetchData } from '../Upload/js/fetchData';
import style from '../Upload/css/style.module.scss';

const folderKeys = {
  all: ['dataFolderRoot'],
  folder: (name) => [...folderKeys.all, { directory: name }],
  fileDetails: (fileName) => [...folderKeys.folder, fileName]


}

export const GetData = React.memo(({ showUploader }) => {
  const [dirName, setDirName] = useState({ api: 'initial.php', folderName: 'data' });
  const [path, setPath] = useState([dirName.folderName]);

  //進入資料夾路徑
  const forwardDir = useCallback((dir) => setPath((v) => {
    v.push(dir)
    return [...v]
  }), [])

  const placeholderData = useMemo(() => [{
    filename: '', text: 'Loading....'
  }], [])
  const { data, isSuccess, fetchStatus, refetch } = useQuery({
    queryKey: folderKeys.folder(dirName.api),
    queryFn: fetchData(dirName.api),
    placeholderData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false
  })

  return (
    <>
      <div className={style.upload}>
        <PathCrumb path={path} dirName={dirName} setDirName={setDirName} setPath={setPath} />
        {showUploader.isLogging ?
          <>
            {path.length === 1 ? <CreateBtn refetch={refetch} /> : null}
          </>
          : null}
      </div>

      <Table responsive="sm" hover className='text-start'>
        <thead>
          <tr>
            <th>Name</th>
            <th>type</th>
            <th>Last modified</th>
            <th>size</th>
            {showUploader.isLogging ? <th className='text-center'>edit</th> : null}
          </tr>
        </thead>
        {
          fetchStatus === 'fetching' ? <Loading /> :
            isSuccess ? <Directory forwardDir={forwardDir} dirName={dirName} setDirName={setDirName} data={data} refetch={refetch} showUploader={showUploader} path={path} /> : null
        }


      </Table>
      <div className='d-flex justify-content-end'>
        <Paginate />
      </div>

    </>)


})


const Directory = ({ data, setDirName, forwardDir, refetch, showUploader, path, }) => {
  const queryClient = useQueryClient();
  const [hoverEdited, setHoverEdited] = useState(false);
  const getLayer = (file) => () => {
    if (file.type === 'file') return;
    setDirName({ api: `layer.php/?folderName=${file.filename}`, folderName: file.filename })
    forwardDir(file.filename)
  }
  return (
    <>
      {/* <button onClick={refetch}>refetch</button> */}
      <tbody>
        {
          data.map(e => {
            if (e.type === 0) return
            return (
              <Fragment key={e.filename}>
                <tr className={style.hover} onDoubleClick={getLayer(e)} onMouseEnter={() => setHoverEdited(true)}  >
                  <td >{e.type === "dir" ? <FcFolder /> : <FcFile />}{e.text}</td>
                  <td>{e.type}</td>
                  <td>{e.timeStamp}</td>
                  <td>{e.size ? `${e.size}MB` : "---"}</td>
                  {showUploader.isLogging && hoverEdited ? <td >
                    <Stack direction="horizontal" gap={2} style={{ width: "min-content", marginLeft: '50%', transform: 'translateX(-50%)' }}>
                      {path.length === 1 ? <Uploader /> : null}
                      {e.type === 'file' ?
                        <>
                          <ModifiedBtn fn={'Rename'} theme={'light'} />
                          <ModifiedBtn fn={'Delete'} theme={'danger'} />
                        </> :
                        <p class="fst-italic text-nowrap">Read-Only</p>}
                    </Stack>
                  </td> : null}
                </tr>
              </Fragment>
            )
          })
        }
      </tbody>
    </>
  )
}


const PathCrumb = React.memo(({ path, setDirName, setPath }) => {
  const ref = useRef('')
  const root = useCallback(() => {
    //根目錄退步
    setPath(v => {
      if (v.length === 1) {
        return v
      } else if (v.length === 2) {
        setDirName({ api: 'initial.php', folderName: '' })
        v.pop()
        return [...v]
      }
      return v
    })
  }, [])
  //獲取內部檔案
  const layer = useCallback((query) => () => {
    setDirName({ api: `layer.php/?folderName=${query}`, folderName: query })
    //路徑退步
    setPath(v => {
      v.pop();
      return [...v]
    })
  }, [])

  return (
    <Breadcrumb className={style.linkStyle}>
      {
        path.map((e, index, arr) => {
          if (index === 0) return <Breadcrumb.Item key={index} title="rootFolder" className={style.rootStyle} onClick={root}>data</Breadcrumb.Item>
          if (index === (arr.length) - 2) {
            return (
              <Breadcrumb.Item ref={ref} key={index} className={style.backLinkStyle} onClick={layer(e)}>{e}</Breadcrumb.Item>
            )

          }
          return (
            <Breadcrumb.Item className={style.lastLinkStyle} key={index} >{e}</Breadcrumb.Item>
          )
        })
      }

    </Breadcrumb>
  )

})

const Loading = () => {

  return (
    <tbody className={style.userSelect}>
      <tr>
        <td>Loading...</td>
      </tr>
    </tbody>
  )
}