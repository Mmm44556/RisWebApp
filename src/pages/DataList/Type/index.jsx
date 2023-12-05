import React from 'react'
import {useParams } from 'react-router-dom';
export default function Type() {
  const param = useParams();
  console.log(param['*'])
  return (
    <div>
      類型
    </div>
  )
}
