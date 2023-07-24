
import React, { useRef } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useList } from '../../../hooks/usePathList'
import style from '../css/style.module.scss';
const PathCrumb = React.memo(({ PathCrumbBundle }) => {

  const ref = useRef('');
  const { path, setDirName, setPath } = PathCrumbBundle;
  const { root, layer } = useList(setDirName, setPath);

  return (
    <Breadcrumb className={style.linkStyle}>
      {
        path.map((e, index, arr) => {
          if (index === 0) return <Breadcrumb.Item key={index} title="rootFolder" className={style.rootStyle} onClick={root}>data</Breadcrumb.Item>
          if (index === (arr.length) - 2) {
            return (
              <Breadcrumb.Item ref={ref} key={index} className={style.backLinkStyle} onClick={layer(e, path)}>{e}</Breadcrumb.Item>
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

export default PathCrumb;