import{r as o,u as S,c as E,j as e,d as v,h as I,n as P,s as T,o as U,p as M,q,C as Q,l as D,m as y}from"./index-aeac18f4.js";import{f as N,u as j,U as H}from"./userToKey-0fab527f.js";import{M as b}from"./Modal-53bfb843.js";import"./index.esm-0fa41996.js";import"./AbstractModalHeader-0dac5ded.js";import"./ListGroup-2aa0bd9f.js";const R=o.forwardRef(({bsPrefix:n,className:s,striped:r,bordered:t,borderless:a,hover:l,size:d,variant:c,responsive:u,...m},h)=>{const i=S(n,"table"),g=E(s,i,c&&`${i}-${c}`,d&&`${i}-${d}`,r&&`${i}-${typeof r=="string"?`striped-${r}`:"striped"}`,t&&`${i}-bordered`,a&&`${i}-borderless`,l&&`${i}-hover`),x=e.jsx("table",{...m,className:g,ref:h});if(u){let p=`${i}-responsive`;return typeof u=="string"&&(p=`${p}-${u}`),e.jsx("div",{className:p,children:x})}return x}),_=R,O=n=>s=>{const{name:r,value:t}=s.target;n(a=>r=="age"&&t.length>2?a:{...a,[`user_${r}`]:t})};function A(n,s){const r=o.useCallback(()=>n(()=>({...s.normalInfo})),[s]);return{normalInfoChangeCallBack:o.useCallback(()=>O(n),[s]),setNormalInfoCallBack:r}}function K({setNormalInfo:n,type:s,edit:r,fetcher:t,userState:a,setShowToast:l,setToastDetail:d,showToast:c}){const u=v(),m=o.useRef(),[h,i]=o.useState(!1),{func:g,header:x,body:p,footer:k}=V(s,m,t,i),[B,F]=o.useState(!1),C=()=>F(f=>!f),L=()=>(C(),l(f=>!f),d({detail:"重置成功!",theme:"Warning",spinner:"",timeStamp:new Date().toLocaleTimeString()}),n());return e.jsxs(e.Fragment,{children:[e.jsx(I,{variant:"light",className:"fw-bold",type:s=="submit"?"button":"reset",onClick:C,disabled:!r,children:g}),e.jsxs(b,{show:B,onHide:C,animation:!1,centered:!0,className:"text-center",onShow:s=="reset"?()=>null:()=>{Object.values(m.current).forEach(f=>{if(f.localName=="input"){if(f.value.length==0){i(!0);return}}else return})},children:[e.jsx(b.Header,{className:"border border-0 justify-content-center ",children:e.jsx(b.Title,{className:"fw-bold",children:x})}),e.jsx(b.Body,{children:p}),e.jsxs(b.Footer,{className:"border border-0",children:[e.jsx(I,{variant:"secondary",onClick:C,children:"取消"}),e.jsx(I,{variant:"danger",onClick:s=="reset"?L:()=>{if(m.current[0].value==a.normalInfo.user_password){t.submit({...a.normalInfo,user_password:m.current[1].value},{action:u.pathname,method:"PATCH"}),l(!0),d({detail:"修改成功!",theme:"success",spinner:N[t.state],timeStamp:new Date().toLocaleTimeString()});return}l(f=>!f),d({detail:"密碼錯誤!",theme:"danger",spinner:"",timeStamp:new Date().toLocaleTimeString()})},type:s,disabled:c||h,children:k})]})]})]})}function V(n,s,r,t){switch(n){case"submit":const a=()=>{s.current[0].value.length!==0&&s.current[1].value.length!==0?t(!1):t(!0)};return{func:"重設密碼",header:"確定修改密碼?",body:e.jsx(r.Form,{ref:s,onInput:a,children:e.jsxs("div",{className:`${P.normalInfo} vstack gap-2`,children:[e.jsxs("p",{children:[e.jsx("h5",{className:"d-inline fw-bold me-2",children:"舊密碼:"}),e.jsx("input",{type:"password",name:"oldPassword",className:"w-50",required:!0,minLength:"0",maxLength:"12",placeholder:"password"})]}),e.jsxs("p",{children:[e.jsx("h5",{className:"d-inline fw-bold me-2",children:"新密碼:"}),e.jsx("input",{type:"password",name:"newPassword",className:"w-50",required:!0,minLength:"0",maxLength:"12",placeholder:"password"})]})]})}),footer:"確定"};case"reset":return{func:"重置",header:"確定移除當前變更?",body:e.jsxs(e.Fragment,{children:["你的任何變更都將遺失",e.jsx("sub",{children:"。"})]}),footer:"重設變更"}}}const $=o.memo(K);function W({fetch:{normalInfo:n,setNormalInfo:s,editButton:r,edit:t,fetcher:a,userState:l,setToastDetail:d,setShowToast:c,showToast:u}}){const{normalInfoChangeCallBack:m,setNormalInfoCallBack:h}=A(s,l);return e.jsx(e.Fragment,{children:e.jsxs(a.Form,{onInput:m(s),className:T.normalInfo,children:[e.jsx("table",{children:j.normalInfo(n).length?j.normalInfo(n,t):"尚無資料"}),e.jsxs("div",{className:"hstack gap-3 position-absolute end-0 top-0 mt-2 me-2",children:[e.jsx($,{edit:t,type:"submit",userState:l,setToastDetail:d,setShowToast:c,showToast:u,fetcher:a}),e.jsx($,{setNormalInfo:h,type:"reset",edit:t,setToastDetail:d,setShowToast:c}),e.jsx(I,{variant:"light",className:"fw-bold",type:"button",onClick:r,children:t?"儲存":"編輯"})]})]})})}const G=o.memo(W),J=(n,s,r,t)=>{const a=v();o.useEffect(()=>{r(!t),t||n.submit(s,{method:"PUT",action:a.pathname})},[t])};function X(n,s,r){const t={success:{detail:"儲存成功",theme:"Success",spinner:N[r.state],timeStamp:new Date().toLocaleTimeString()}};r.state=="submitting"&&s(a=>({...a,spinner:N[r.state]})),s({...t[n]})}function Y(n,s,r){return()=>{X("success",s,r),n(t=>!t)}}const w="fw-bold";function Z({userState:n,setToastDetail:s,setShowToast:r,showToast:t}){const a=U();a==null||a.data;const[l,d]=o.useState({...n.normalInfo}),[c,u]=o.useState(!0),m=Y(u,s,a);J(a,l,r,c);const h=M();return o.useEffect(()=>{if(c==!1){const x={...h.getQueryData(["userCtx"]),normalInfo:{...l}};h.setQueryData(["userCtx"],x),console.log(h.getQueryData(["userCtx"]))}},[c]),e.jsx(e.Fragment,{children:e.jsx(_,{responsive:!0,className:"mt-4 border shadow p-3 mb-5 bg-body-tertiary rounded",children:e.jsxs("tbody",{children:[e.jsx("tr",{children:e.jsxs("td",{className:"position-relative",children:[e.jsx("h4",{className:w,children:"用戶資訊"}),e.jsx(G,{fetch:{normalInfo:l,setNormalInfo:d,editButton:m,edit:c,fetcher:a,userState:n,setToastDetail:s,setShowToast:r,showToast:t}})]})}),e.jsx("tr",{children:e.jsxs("td",{children:[e.jsx("h4",{className:w,children:"醫療部門"}),j.medicalInfo(n.medicalInfo).length?j.medicalInfo(n.medicalInfo):"尚無資料"]})}),e.jsx("tr",{children:e.jsxs("td",{children:[e.jsx("h4",{className:w,children:"其他"}),j.restInfo(n.restInfo).length?j.restInfo(n.restInfo):"尚無資料"]})})]})})})}const z=o.memo(Z);function oe(){const[n,s,r,t]=q();return e.jsx(Q,{fluid:!0,className:"mt-3",children:e.jsxs(D,{children:[e.jsx(y,{sm:3,children:e.jsx(H,{userState:n})}),e.jsx(y,{sm:9,className:"pe-4",children:e.jsx(z,{userState:n,setToastDetail:s,setShowToast:r,showToast:t})})]})})}export{oe as default};
