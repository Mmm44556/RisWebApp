import React, { useEffect, useState, Fragment, useMemo, memo } from "react";
import { useDirectory } from "../../../hooks/useDirectory";
import Stack from 'react-bootstrap/Stack';
import { FcFolder, FcFile } from "react-icons/fc";


import Uploader from '../Uploader';
import ModifiedBtn from '../modifyBtn';
import style from '../css/style.module.scss'


function useNewData(data) {
  const [hoverEdited, setHoverEdited] = useState(data);
  useEffect(() => {
    setHoverEdited(() => data)
  }, [data])
  return [hoverEdited, setHoverEdited]
}



const DirectoryList = ({ DirectoryBundle }) => {
  const { data, setDirName, forwardDir, showUploader, path } = DirectoryBundle;
  //匹配resource output
  const reg = useMemo(() => new RegExp(/output|resource/, 'i'), []);
  const [hoverEdited, setHoverEdited] = useNewData(data);
  const { getLayer, mouseEnter, mouseLeave, focus, blur } = useDirectory(setDirName, setHoverEdited, forwardDir);


  return (
    <>
      <tbody className={style.list}  >
        {
          hoverEdited.map(e => {
            if (e.type === 0) return
            return (
              <Fragment key={e.id}>
                <tr className={`${e.bg ? style.focusBackGround : ''}`}
                  onDoubleClick={getLayer(e, path)}
                  onMouseEnter={mouseEnter(e.id)}
                  onMouseLeave={mouseLeave(e.id)}
                  onFocus={focus(e.id)} tabIndex={e.id}
                  onBlur={blur(e.id)}>
                  <td >{e.type === "dir" ? <FcFolder /> : <FcFile />}{e.text}</td>
                  <td>{e.type}</td>
                  <td>{e.timeStamp}</td>
                  <td>{e.size ? `${e.size}MB` : "---"}</td>
                  {showUploader.isLogging && e.selected ? 
                  <td >
                    <Stack direction="horizontal" gap={2} className={style.buttonStack}>
                      {e.type == 'file' || 'dir' ? <>
                        {!reg.test(e.text) ? <>
                          {!(e.type == 'file' && !reg.test(e.text)) && <Uploader file={e} path={path} />}
                          <ModifiedBtn fn={'Rename'} theme={'light'} file={e} setHoverEdited={setHoverEdited} path={path} />
                          <ModifiedBtn fn={'Delete'} theme={'danger'} file={e} setHoverEdited={setHoverEdited} path={path} />
                        </> :
                          <p className='text-nowrap fst-italic fw-bold'>Read-Only</p>
                        }
                      </> :
                        null}
                    </Stack>
                  </td> :
                   <td style={{ width: '350px' }} />}
                </tr>
              </Fragment>
            )
          })
        }
      </tbody>
    </>
  )
}



export default DirectoryList;