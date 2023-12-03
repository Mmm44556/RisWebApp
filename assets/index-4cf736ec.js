import{L as u,R as m,r as d,j as s,h,s as j}from"./index-aeac18f4.js";import{F as p,D as o}from"./userInitial-bff8cdd3.js";import{a as N}from"./index.esm-8c3d7532.js";import{L as c}from"./ListGroup-2aa0bd9f.js";import"./AbstractModalHeader-0dac5ded.js";const b=u.div`

  animation: ${({animationName:e})=>e};

}
@keyframes scale-up-tr {
  0% {
            transform: scale(0);
            transform-origin: 100% 0%;
  }
  100% {
            transform: scale(1);
            transform-origin: 100% 0%;
          
  }
}

`,y=m.forwardRef((e,a)=>{const{children:l,onClick:n,setAnimationName:t}=e;return d.useEffect(()=>{/show/i.test(e.className)==!1&&t(!1)},[e.className]),s.jsx(h,{variant:"light",ref:a,onClick:r=>{t(i=>!i),r.preventDefault(),n(r)},style:{borderRadius:"50px"},children:l})}),g=m.forwardRef((e,a)=>{const{children:l,style:n,className:t,"aria-labelledby":r,animationName:i}=e;return s.jsx(b,{animationName:i?"scale-up-tr  0.4s ease-out  backwards !important":null,children:s.jsxs("div",{ref:a,style:{...n,transform:"translateX(-90%)"},className:`${t} p-0  `,"aria-labelledby":r,children:[s.jsxs("p",{className:" fw-bold d-flex justify-content-between p-2 m-0 border-bottom",children:[s.jsx("span",{children:"Notifications"}),s.jsx("a",{href:"#",children:"Mark all as read"})]}),s.jsx(c,{children:["","secondary","secondary",""].map((f,x)=>s.jsxs(c.Item,{action:!0,variant:f,className:"d-flex flex-row border-bottom  border-0",children:[s.jsxs("div",{className:"d-flex",children:[s.jsx("div",{children:s.jsx(p,{children:"2"})}),s.jsxs("div",{className:"d-flex flex-column text-nowrap",children:[s.jsx("h5",{className:"m-0",children:"tim"}),s.jsx("p",{className:"m-0",children:"Mentioned you in a comment 10m"}),s.jsx("p",{className:"m-0 ms-auto",children:new Date().toLocaleString()})]})]}),s.jsx("div",{children:"...more"})]},x))})]})})});function M(){const[e,a]=d.useState(!1);return s.jsxs(o,{children:[s.jsx(o.Toggle,{as:y,id:"dropdown-custom-components",setAnimationName:a,children:s.jsxs("div",{className:"position-relative",children:[s.jsx(N,{}),s.jsx("span",{className:`start-100 translate-middle 
            ${j.navigator_badge}`})]})}),s.jsx(o.Menu,{as:g,setAnimationName:a,animationName:e})]})}export{M as default};
