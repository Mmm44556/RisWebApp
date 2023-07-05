import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
export const PathCrumb = React.memo(({ path }) => {

  return (
    <Breadcrumb>
      {
        path.map((e,index) => {
          return (
            <Breadcrumb.Item href="#" key={index}>{e}</Breadcrumb.Item>
          )
        })
      }

    </Breadcrumb>
  )

})