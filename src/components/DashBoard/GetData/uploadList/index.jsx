import React, { memo, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FcFolder, FcFile } from "react-icons/fc";
import { BsFillExclamationTriangleFill, BsFillCheckSquareFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

function errTag(state) {
  if (state != 'error') return { backgroundColor:'inherit'}
  return {
    backgroundColor: 'rgba(0, 0, 0, 0.075)'
  }
 
}

function uploadedList({ isUploaded, files, loading }) {
  const iconStatus = {
    success: <BsFillCheckSquareFill />,
    exist: <BsFillExclamationTriangleFill />,
    error: <TiDelete />
  }
 

  return (
    <>
      <Table hover size="sm mb-0">
        <tbody className='text-start' style={{ fontSize: '20px' }}>
          {
            files.map((e, index) => {
              return (
                <Fragment key={index}>
                  <tr style={errTag(e.state)}>
                    <td>
                      <FcFile />
                      {e.text}
                    </td>
                    <td>{e.path}</td>
                    <td><IconTooltip file={e} Icon={iconStatus[e.state]} /></td>
                  </tr>
                </Fragment>
              )

            })
          }
        </tbody>
      </Table>
    </>
  );
}

function IconTooltip({ file, Icon }) {
  return (
    <>
      <OverlayTrigger
        placement={'top'}
        overlay={
          <Tooltip id={'tooltip-top'}>
            {file.info}
          </Tooltip>
        }
      >
        <span>{Icon}</span>
      </OverlayTrigger>
    </>
  )
}
export default memo(uploadedList);