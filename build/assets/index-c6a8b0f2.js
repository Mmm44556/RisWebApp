import{S as Jn,t as eo,v as to,w as nn,x as no,p as it,r,u as ie,j as s,c as fe,P as H,b as on,y as oo,z as ao,D as ct,G as ro,H as an,F as Ht,I as at,J as so,K as N,L as v,R as T,Q as lo,U as io,h as _e,V as co,q as uo,W as go,X as po,C as mo,l as rt,m as V,Y as ho,s as Mt,e as Ie,f as fo,B as bo,Z as It,$ as wo,a0 as xo,a1 as yo}from"./index-aeac18f4.js";import{I as vo}from"./index.esm-8c3d7532.js";import{d as Co,s as Ro,D as ye,e as Eo,f as So,g as Oo,h as jo,i as Po,m as $o,u as Do,O as Lt,j as ko,k as To,b as Je,l as Fo,F as Ho,N as Mo,a as Io,n as Lo,S as No,P as Nt}from"./userInitial-bff8cdd3.js";import{C as Te,U as _o,u as et,h as Ao}from"./userToKey-0fab527f.js";import{i as zo,u as _t,a as At,r as Bo,h as zt,b as Wo,c as Uo}from"./AbstractModalHeader-0dac5ded.js";import{M as Fe}from"./Modal-53bfb843.js";import"./index.esm-0fa41996.js";import"./ListGroup-2aa0bd9f.js";class Go extends Jn{constructor(t,n){super(),this.client=t,this.setOptions(n),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var n;const o=this.options;this.options=this.client.defaultMutationOptions(t),eo(o,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),(n=this.currentMutation)==null||n.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var t;(t=this.currentMutation)==null||t.removeObserver(this)}}onMutationUpdate(t){this.updateResult();const n={listeners:!0};t.type==="success"?n.onSuccess=!0:t.type==="error"&&(n.onError=!0),this.notify(n)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(t,n){return this.mutateOptions=n,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:typeof t<"u"?t:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const t=this.currentMutation?this.currentMutation.state:to(),n={...t,isLoading:t.status==="loading",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset};this.currentResult=n}notify(t){nn.batch(()=>{if(this.mutateOptions&&this.hasListeners()){if(t.onSuccess){var n,o,a,l;(n=(o=this.mutateOptions).onSuccess)==null||n.call(o,this.currentResult.data,this.currentResult.variables,this.currentResult.context),(a=(l=this.mutateOptions).onSettled)==null||a.call(l,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)}else if(t.onError){var i,u,c,g;(i=(u=this.mutateOptions).onError)==null||i.call(u,this.currentResult.error,this.currentResult.variables,this.currentResult.context),(c=(g=this.mutateOptions).onSettled)==null||c.call(g,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}}t.listeners&&this.listeners.forEach(({listener:p})=>{p(this.currentResult)})})}}function Ko(e,t,n){const o=no(e,t,n),a=it({context:o.context}),[l]=r.useState(()=>new Go(a,o));r.useEffect(()=>{l.setOptions(o)},[l,o]);const i=Co(r.useCallback(c=>l.subscribe(nn.batchCalls(c)),[l]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),u=r.useCallback((c,g)=>{l.mutate(c,g).catch(Vo)},[l]);if(i.error&&Ro(l.options.useErrorBoundary,[i.error]))throw i.error;return{...i,mutate:u,mutateAsync:i.mutate}}function Vo(){}const rn=r.forwardRef(({bsPrefix:e,size:t,vertical:n=!1,className:o,role:a="group",as:l="div",...i},u)=>{const c=ie(e,"btn-group");let g=c;return n&&(g=`${c}-vertical`),s.jsx(l,{...i,ref:u,role:a,className:fe(o,g,t&&`${c}-${t}`)})});rn.displayName="ButtonGroup";const Qo=rn,pe=H.oneOf(["start","end"]),Yo=H.oneOfType([pe,H.shape({sm:pe}),H.shape({md:pe}),H.shape({lg:pe}),H.shape({xl:pe}),H.shape({xxl:pe}),H.object]),Zo={id:H.string,href:H.string,onClick:H.func,title:H.node.isRequired,disabled:H.bool,align:Yo,menuRole:H.string,renderMenuOnMount:H.bool,rootCloseEvent:H.string,menuVariant:H.oneOf(["dark"]),flip:H.bool,bsPrefix:H.string,variant:H.string,size:H.string},dt=r.forwardRef(({title:e,children:t,bsPrefix:n,rootCloseEvent:o,variant:a,size:l,menuRole:i,renderMenuOnMount:u,disabled:c,href:g,id:p,menuVariant:m,flip:y,...b},f)=>s.jsxs(ye,{ref:f,...b,children:[s.jsx(Eo,{id:p,href:g,size:l,variant:a,disabled:c,childBsPrefix:n,children:e}),s.jsx(So,{role:i,renderOnMount:u,rootCloseEvent:o,variant:m,flip:y,children:t})]}));dt.displayName="DropdownButton";dt.propTypes=Zo;const qo=dt,Xo=()=>{};function Jo(e,t,{disabled:n,clickTrigger:o}={}){const a=t||Xo;Oo(e,a,{disabled:n,clickTrigger:o});const l=on(i=>{zo(i)&&a(i)});r.useEffect(()=>{if(n||e==null)return;const i=oo(jo(e));let u=(i.defaultView||window).event;const c=ao(i,"keyup",g=>{if(g===u){u=void 0;return}l(g)});return()=>{c()}},[e,n,l])}const sn=r.forwardRef((e,t)=>{const{flip:n,offset:o,placement:a,containerPadding:l,popperConfig:i={},transition:u,runTransition:c}=e,[g,p]=_t(),[m,y]=_t(),b=ct(p,t),f=At(e.container),j=At(e.target),[h,S]=r.useState(!e.show),C=Po(j,g,$o({placement:a,enableEvents:!!e.show,containerPadding:l||5,flip:n,offset:o,arrowElement:m,popperConfig:i}));e.show&&h&&S(!1);const O=(...W)=>{S(!0),e.onExited&&e.onExited(...W)},R=e.show||!h;if(Jo(g,e.onHide,{disabled:!e.rootClose||e.rootCloseDisabled,clickTrigger:e.rootCloseEvent}),!R)return null;const{onExit:$,onExiting:D,onEnter:E,onEntering:k,onEntered:B}=e;let I=e.children(Object.assign({},C.attributes.popper,{style:C.styles.popper,ref:b}),{popper:C,placement:a,show:!!e.show,arrowProps:Object.assign({},C.attributes.arrow,{style:C.styles.arrow,ref:y})});return I=Bo(u,c,{in:!!e.show,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:I,onExit:$,onExiting:D,onExited:O,onEnter:E,onEntering:k,onEntered:B}),f?ro.createPortal(I,f):null});sn.displayName="Overlay";const ea=sn,ln=r.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},a)=>(t=ie(t,"popover-header"),s.jsx(n,{ref:a,className:fe(e,t),...o})));ln.displayName="PopoverHeader";const ta=ln,cn=r.forwardRef(({className:e,bsPrefix:t,as:n="div",...o},a)=>(t=ie(t,"popover-body"),s.jsx(n,{ref:a,className:fe(e,t),...o})));cn.displayName="PopoverBody";const dn=cn;function un(e,t){let n=e;return e==="left"?n=t?"end":"start":e==="right"&&(n=t?"start":"end"),n}function gn(e="absolute"){return{position:e,top:"0",left:"0",opacity:"0",pointerEvents:"none"}}const na=r.forwardRef(({bsPrefix:e,placement:t="right",className:n,style:o,children:a,body:l,arrowProps:i,hasDoneInitialMeasure:u,popper:c,show:g,...p},m)=>{const y=ie(e,"popover"),b=an(),[f]=(t==null?void 0:t.split("-"))||[],j=un(f,b);let h=o;return g&&!u&&(h={...o,...gn(c==null?void 0:c.strategy)}),s.jsxs("div",{ref:m,role:"tooltip",style:h,"x-placement":f,className:fe(n,y,f&&`bs-popover-${j}`),...p,children:[s.jsx("div",{className:"popover-arrow",...i}),l?s.jsx(dn,{children:a}):a]})}),oa=Object.assign(na,{Header:ta,Body:dn,POPPER_OFFSET:[0,8]}),pn=r.forwardRef(({bsPrefix:e,placement:t="right",className:n,style:o,children:a,arrowProps:l,hasDoneInitialMeasure:i,popper:u,show:c,...g},p)=>{e=ie(e,"tooltip");const m=an(),[y]=(t==null?void 0:t.split("-"))||[],b=un(y,m);let f=o;return c&&!i&&(f={...o,...gn(u==null?void 0:u.strategy)}),s.jsxs("div",{ref:p,style:f,role:"tooltip","x-placement":y,className:fe(n,e,`bs-tooltip-${b}`),...g,children:[s.jsx("div",{className:"tooltip-arrow",...l}),s.jsx("div",{className:`${e}-inner`,children:a})]})});pn.displayName="Tooltip";const Ae=Object.assign(pn,{TOOLTIP_OFFSET:[0,6]});function aa(e){const t=r.useRef(null),n=ie(void 0,"popover"),o=ie(void 0,"tooltip"),a=r.useMemo(()=>({name:"offset",options:{offset:()=>{if(e)return e;if(t.current){if(zt(t.current,n))return oa.POPPER_OFFSET;if(zt(t.current,o))return Ae.TOOLTIP_OFFSET}return[0,0]}}}),[e,n,o]);return[t,[a]]}function ra(e,t){const{ref:n}=e,{ref:o}=t;e.ref=n.__wrapped||(n.__wrapped=a=>n(at(a))),t.ref=o.__wrapped||(o.__wrapped=a=>o(at(a)))}const mn=r.forwardRef(({children:e,transition:t=Ht,popperConfig:n={},rootClose:o=!1,placement:a="top",show:l=!1,...i},u)=>{const c=r.useRef({}),[g,p]=r.useState(null),[m,y]=aa(i.offset),b=ct(u,m),f=t===!0?Ht:t||void 0,j=on(h=>{p(h),n==null||n.onFirstUpdate==null||n.onFirstUpdate(h)});return Wo(()=>{g&&i.target&&(c.current.scheduleUpdate==null||c.current.scheduleUpdate())},[g,i.target]),r.useEffect(()=>{l||p(null)},[l]),s.jsx(ea,{...i,ref:b,popperConfig:{...n,modifiers:y.concat(n.modifiers||[]),onFirstUpdate:j},transition:f,rootClose:o,placement:a,show:l,children:(h,{arrowProps:S,popper:C,show:O})=>{var R,$;ra(h,S);const D=C==null?void 0:C.placement,E=Object.assign(c.current,{state:C==null?void 0:C.state,scheduleUpdate:C==null?void 0:C.update,placement:D,outOfBoundaries:(C==null||(R=C.state)==null||($=R.modifiersData.hide)==null?void 0:$.isReferenceHidden)||!1,strategy:n.strategy}),k=!!g;return typeof e=="function"?e({...h,placement:D,show:O,...!t&&O&&{className:"show"},popper:E,arrowProps:S,hasDoneInitialMeasure:k}):r.cloneElement(e,{...h,placement:D,arrowProps:S,popper:E,hasDoneInitialMeasure:k,className:fe(e.props.className,!t&&O&&"show"),style:{...e.props.style,...h.style}})}})});mn.displayName="Overlay";const sa=mn;function la(e){return e&&typeof e=="object"?e:{show:e,hide:e}}function Bt(e,t,n){const[o]=t,a=o.currentTarget,l=o.relatedTarget||o.nativeEvent[n];(!l||l!==a)&&!Uo(a,l)&&e(...t)}H.oneOf(["click","hover","focus"]);const ia=({trigger:e=["hover","focus"],overlay:t,children:n,popperConfig:o={},show:a,defaultShow:l=!1,onToggle:i,delay:u,placement:c,flip:g=c&&c.indexOf("auto")!==-1,...p})=>{const m=r.useRef(null),y=ct(m,n.ref),b=Do(),f=r.useRef(""),[j,h]=so(a,l,i),S=la(u),{onFocus:C,onBlur:O,onClick:R}=typeof n!="function"?r.Children.only(n).props:{},$=_=>{y(at(_))},D=r.useCallback(()=>{if(b.clear(),f.current="show",!S.show){h(!0);return}b.set(()=>{f.current==="show"&&h(!0)},S.show)},[S.show,h,b]),E=r.useCallback(()=>{if(b.clear(),f.current="hide",!S.hide){h(!1);return}b.set(()=>{f.current==="hide"&&h(!1)},S.hide)},[S.hide,h,b]),k=r.useCallback((..._)=>{D(),C==null||C(..._)},[D,C]),B=r.useCallback((..._)=>{E(),O==null||O(..._)},[E,O]),I=r.useCallback((..._)=>{h(!j),R==null||R(..._)},[R,h,j]),W=r.useCallback((..._)=>{Bt(D,_,"fromElement")},[D]),Q=r.useCallback((..._)=>{Bt(E,_,"toElement")},[E]),F=e==null?[]:[].concat(e),U={ref:$};return F.indexOf("click")!==-1&&(U.onClick=I),F.indexOf("focus")!==-1&&(U.onFocus=k,U.onBlur=B),F.indexOf("hover")!==-1&&(U.onMouseOver=W,U.onMouseOut=Q),s.jsxs(s.Fragment,{children:[typeof n=="function"?n(U):r.cloneElement(n,U),s.jsx(sa,{...p,show:j,onHide:E,flip:g,placement:c,popperConfig:o,target:m.current,children:t})]})},ut=ia;var ne;function me(e,t){return e[t]}function st(e,t){return t.split(".").reduce((n,o)=>{const a=o.match(/[^\]\\[.]+/g);if(a&&a.length>1)for(let l=0;l<a.length;l++)return n[a[l]][a[l+1]];return n[o]},e)}function ca(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function da(e=[],t,n="id"){const o=e.slice(),a=me(t,n);return a?o.splice(o.findIndex(l=>me(l,n)===a),1):o.splice(o.findIndex(l=>l===t),1),o}function Wt(e){return e.map((t,n)=>{const o=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(o.id=n+1),o})}function ve(e,t){return Math.ceil(e/t)}function tt(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(ne||(ne={}));const L=()=>null;function hn(e,t=[],n=[]){let o={},a=[...n];return t.length&&t.forEach(l=>{if(!l.when||typeof l.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');l.when(e)&&(o=l.style||{},l.classNames&&(a=[...a,...l.classNames]),typeof l.style=="function"&&(o=l.style(e)||{}))}),{style:o,classNames:a.join(" ")}}function Le(e,t=[],n="id"){const o=me(e,n);return o?t.some(a=>me(a,n)===o):t.some(a=>a===e)}function He(e,t){return t?e.findIndex(n=>Ce(n.id,t)):-1}function Ce(e,t){return e==t}function ua(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:o,rows:a,rowCount:l,mergeSelections:i}=t,u=!e.allSelected,c=!e.toggleOnSelectedRowsChange;if(i){const g=u?[...e.selectedRows,...a.filter(p=>!Le(p,e.selectedRows,o))]:e.selectedRows.filter(p=>!Le(p,a,o));return Object.assign(Object.assign({},e),{allSelected:u,selectedCount:g.length,selectedRows:g,toggleOnSelectedRowsChange:c})}return Object.assign(Object.assign({},e),{allSelected:u,selectedCount:u?l:0,selectedRows:u?a:[],toggleOnSelectedRowsChange:c})}case"SELECT_SINGLE_ROW":{const{keyField:o,row:a,isSelected:l,rowCount:i,singleSelect:u}=t;return u?l?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[a],toggleOnSelectedRowsChange:n}):l?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:da(e.selectedRows,a,o),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:ca(e.selectedRows,a),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:o,selectedRows:a,totalRows:l,mergeSelections:i}=t;if(i){const u=[...e.selectedRows,...a.filter(c=>!Le(c,e.selectedRows,o))];return Object.assign(Object.assign({},e),{selectedCount:u.length,allSelected:!1,selectedRows:u,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:a.length,allSelected:a.length===l,selectedRows:a,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:o}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:o})}case"SORT_CHANGE":{const{sortDirection:o,selectedColumn:a,clearSelectedOnSort:l}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:a,sortDirection:o,currentPage:1}),l&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:o,paginationServer:a,visibleOnly:l,persistSelectedOnPageChange:i}=t,u=a&&i,c=a&&!i||l;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:o}),u&&{allSelected:!1}),c&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:o,page:a}=t;return Object.assign(Object.assign({},e),{currentPage:a,rowsPerPage:o})}}}const ga=N`
	pointer-events: none;
	opacity: 0.4;
`,pa=v.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&ga};
	${({theme:e})=>e.table.style};
`,ma=N`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,ha=v.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&ma};
	${({theme:e})=>e.head.style};
`,fa=v.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,fn=(e,...t)=>N`
		@media screen and (max-width: ${599}px) {
			${N(e,...t)}
		}
	`,ba=(e,...t)=>N`
		@media screen and (max-width: ${959}px) {
			${N(e,...t)}
		}
	`,wa=(e,...t)=>N`
		@media screen and (max-width: ${1280}px) {
			${N(e,...t)}
		}
	`,xa=e=>(t,...n)=>N`
				@media screen and (max-width: ${e}px) {
					${N(t,...n)}
				}
			`,be=v.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,bn=v(be)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&N`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&fn`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&ba`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&wa`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&xa(e)`
    display: none;
  `};
`,ya=N`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,va=v(bn).attrs(e=>({style:e.style}))`
	${({$renderAsCell:e})=>!e&&ya};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var Ca=r.memo(function({id:e,column:t,row:n,rowIndex:o,dataTag:a,isDragging:l,onDragStart:i,onDragOver:u,onDragEnd:c,onDragEnter:g,onDragLeave:p}){const{style:m,classNames:y}=hn(n,t.conditionalCellStyles,["rdt_TableCell"]);return r.createElement(va,{id:e,"data-column-id":t.id,role:"cell",className:y,"data-tag":a,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:m,$isDragging:l,onDragStart:i,onDragOver:u,onDragEnd:c,onDragEnter:g,onDragLeave:p},!t.cell&&r.createElement("div",{"data-tag":a},function(b,f,j,h){if(!f)return null;if(typeof f!="string"&&typeof f!="function")throw new Error("selector must be a . delimited string eg (my.property) or function (e.g. row => row.field");return j&&typeof j=="function"?j(b,h):f&&typeof f=="function"?f(b,h):st(b,f)}(n,t.selector,t.format,o)),t.cell&&t.cell(n,o,t,e))}),wn=r.memo(function({name:e,component:t="input",componentOptions:n={style:{}},indeterminate:o=!1,checked:a=!1,disabled:l=!1,onClick:i=L}){const u=t,c=u!=="input"?n.style:(p=>Object.assign(Object.assign({fontSize:"18px"},!p&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(l),g=r.useMemo(()=>function(p,...m){let y;return Object.keys(p).map(b=>p[b]).forEach((b,f)=>{typeof b=="function"&&(y=Object.assign(Object.assign({},p),{[Object.keys(p)[f]]:b(...m)}))}),y||p}(n,o),[n,o]);return r.createElement(u,Object.assign({type:"checkbox",ref:p=>{p&&(p.indeterminate=o)},style:c,onClick:l?L:i,name:e,"aria-label":e,checked:a,disabled:l},g,{onChange:L}))});const Ra=v(be)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function Ea({name:e,keyField:t,row:n,rowCount:o,selected:a,selectableRowsComponent:l,selectableRowsComponentProps:i,selectableRowsSingle:u,selectableRowDisabled:c,onSelectedRow:g}){const p=!(!c||!c(n));return r.createElement(Ra,{onClick:m=>m.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},r.createElement(wn,{name:e,component:l,componentOptions:i,checked:a,"aria-checked":a,onClick:()=>{g({type:"SELECT_SINGLE_ROW",row:n,isSelected:a,keyField:t,rowCount:o,singleSelect:u})},disabled:p}))}const Sa=v.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Oa({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:o,row:a,onToggled:l}){const i=t?n.expanded:n.collapsed;return r.createElement(Sa,{"aria-disabled":e,onClick:()=>l&&l(a),"data-testid":`expander-button-${o}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const ja=v(be)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function Pa({row:e,expanded:t=!1,expandableIcon:n,id:o,onToggled:a,disabled:l=!1}){return r.createElement(ja,{onClick:i=>i.stopPropagation(),$noPadding:!0},r.createElement(Oa,{id:o,row:e,expanded:t,expandableIcon:n,disabled:l,onToggled:a}))}const $a=v.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var Da=r.memo(function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:o,extendedClassNames:a}){const l=["rdt_ExpanderRow",...a.split(" ").filter(i=>i!=="rdt_TableRow")].join(" ");return r.createElement($a,{className:l,$extendedRowStyle:o},r.createElement(t,Object.assign({data:e},n)))}),Ne,lt,le;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(Ne||(Ne={})),function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"}(lt||(lt={})),function(e){e.SM="sm",e.MD="md",e.LG="lg"}(le||(le={}));const ka=N`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,Ta=N`
	&:hover {
		cursor: pointer;
	}
`,Fa=v.div.attrs(e=>({style:e.style}))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&ka};
	${({$pointerOnHover:e})=>e&&Ta};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
`;function Ha({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:o=!1,dense:a=!1,expandableIcon:l,expandableRows:i=!1,expandableRowsComponent:u,expandableRowsComponentProps:c,expandableRowsHideExpander:g,expandOnRowClicked:p=!1,expandOnRowDoubleClicked:m=!1,highlightOnHover:y=!1,id:b,expandableInheritConditionalStyles:f,keyField:j,onRowClicked:h=L,onRowDoubleClicked:S=L,onRowMouseEnter:C=L,onRowMouseLeave:O=L,onRowExpandToggled:R=L,onSelectedRow:$=L,pointerOnHover:D=!1,row:E,rowCount:k,rowIndex:B,selectableRowDisabled:I=null,selectableRows:W=!1,selectableRowsComponent:Q,selectableRowsComponentProps:F,selectableRowsHighlight:U=!1,selectableRowsSingle:_=!1,selected:ce,striped:de=!1,draggingColumnId:ze,onDragStart:Be,onDragOver:We,onDragEnd:Ue,onDragEnter:q,onDragLeave:Ee}){const[X,Se]=r.useState(n);r.useEffect(()=>{Se(n)},[n]);const oe=r.useCallback(()=>{Se(!X),R(!X,E)},[X,R,E]),Ge=D||i&&(p||m),Ke=r.useCallback(M=>{M.target&&M.target.getAttribute("data-tag")==="allowRowEvents"&&(h(E,M),!o&&i&&p&&oe())},[o,p,i,oe,h,E]),Oe=r.useCallback(M=>{M.target&&M.target.getAttribute("data-tag")==="allowRowEvents"&&(S(E,M),!o&&i&&m&&oe())},[o,m,i,oe,S,E]),Ve=r.useCallback(M=>{C(E,M)},[C,E]),J=r.useCallback(M=>{O(E,M)},[O,E]),ae=me(E,j),{style:je,classNames:Pe}=hn(E,t,["rdt_TableRow"]),Qe=U&&ce,Ye=f?je:{},Ze=de&&B%2==0;return r.createElement(r.Fragment,null,r.createElement(Fa,{id:`row-${b}`,role:"row",$striped:Ze,$highlightOnHover:y,$pointerOnHover:!o&&Ge,$dense:a,onClick:Ke,onDoubleClick:Oe,onMouseEnter:Ve,onMouseLeave:J,className:Pe,$selected:Qe,style:je},W&&r.createElement(Ea,{name:`select-row-${ae}`,keyField:j,row:E,rowCount:k,selected:ce,selectableRowsComponent:Q,selectableRowsComponentProps:F,selectableRowDisabled:I,selectableRowsSingle:_,onSelectedRow:$}),i&&!g&&r.createElement(Pa,{id:ae,expandableIcon:l,expanded:X,row:E,onToggled:oe,disabled:o}),e.map(M=>M.omit?null:r.createElement(Ca,{id:`cell-${M.id}-${ae}`,key:`cell-${M.id}-${ae}`,dataTag:M.ignoreRowClick||M.button?null:"allowRowEvents",column:M,row:E,rowIndex:B,isDragging:Ce(ze,M.id),onDragStart:Be,onDragOver:We,onDragEnd:Ue,onDragEnter:q,onDragLeave:Ee}))),i&&X&&r.createElement(Da,{key:`expander-${ae}`,data:E,extendedRowStyle:Ye,extendedClassNames:Pe,ExpanderComponent:u,expanderComponentProps:c}))}const Ma=v.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Ia=({sortActive:e,sortDirection:t})=>T.createElement(Ma,{$sortActive:e,$sortDirection:t},"▲"),La=v(bn)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,Na=N`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({sortActive:e})=>!e&&N`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,_a=v.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Na};
`,Aa=v.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var za=r.memo(function({column:e,disabled:t,draggingColumnId:n,selectedColumn:o={},sortDirection:a,sortIcon:l,sortServer:i,pagination:u,paginationServer:c,persistSelectedOnSort:g,selectableRowsVisibleOnly:p,onSort:m,onDragStart:y,onDragOver:b,onDragEnd:f,onDragEnter:j,onDragLeave:h}){r.useEffect(()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)},[]);const[S,C]=r.useState(!1),O=r.useRef(null);if(r.useEffect(()=>{O.current&&C(O.current.scrollWidth>O.current.clientWidth)},[S]),e.omit)return null;const R=()=>{if(!e.sortable&&!e.selector)return;let F=a;Ce(o.id,e.id)&&(F=a===ne.ASC?ne.DESC:ne.ASC),m({type:"SORT_CHANGE",sortDirection:F,selectedColumn:e,clearSelectedOnSort:u&&c&&!g||i||p})},$=F=>r.createElement(Ia,{sortActive:F,sortDirection:a}),D=()=>r.createElement("span",{className:[a,"__rdt_custom_sort_icon__"].join(" ")},l),E=!(!e.sortable||!Ce(o.id,e.id)),k=!e.sortable||t,B=e.sortable&&!l&&!e.right,I=e.sortable&&!l&&e.right,W=e.sortable&&l&&!e.right,Q=e.sortable&&l&&e.right;return r.createElement(La,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:Ce(e.id,n),onDragStart:y,onDragOver:b,onDragEnd:f,onDragEnter:j,onDragLeave:h},e.name&&r.createElement(_a,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:k?void 0:R,onKeyPress:k?void 0:F=>{F.key==="Enter"&&R()},sortActive:!k&&E,disabled:k},!k&&Q&&D(),!k&&I&&$(E),typeof e.name=="string"?r.createElement(Aa,{title:S?e.name:void 0,ref:O,"data-column-id":e.id},e.name):e.name,!k&&W&&D(),!k&&B&&$(E)))});const Ba=v(be)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Wa({headCell:e=!0,rowData:t,keyField:n,allSelected:o,mergeSelections:a,selectedRows:l,selectableRowsComponent:i,selectableRowsComponentProps:u,selectableRowDisabled:c,onSelectAllRows:g}){const p=l.length>0&&!o,m=c?t.filter(f=>!c(f)):t,y=m.length===0,b=Math.min(t.length,m.length);return r.createElement(Ba,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},r.createElement(wn,{name:"select-all-rows",component:i,componentOptions:u,onClick:()=>{g({type:"SELECT_ALL_ROWS",rows:m,rowCount:b,mergeSelections:a,keyField:n})},checked:o,indeterminate:p,disabled:y}))}function xn(e=Ne.AUTO){const t=typeof window=="object",[n,o]=r.useState(!1);return r.useEffect(()=>{if(t)if(e!=="auto")o(e==="rtl");else{const a=!(!window.document||!window.document.createElement),l=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],u=l.dir==="rtl"||i.dir==="rtl";o(a&&u)}},[e,t]),n}const Ua=v.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Ga=v.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,Ut=v.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({$rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,$visible:t})=>t&&e.contextMenu.activeStyle};
`;function Ka({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:o,direction:a}){const l=xn(a),i=o>0;return n?r.createElement(Ut,{$visible:i},r.cloneElement(n,{selectedCount:o})):r.createElement(Ut,{$visible:i,$rtl:l},r.createElement(Ua,null,((u,c,g)=>{if(c===0)return null;const p=c===1?u.singular:u.plural;return g?`${c} ${u.message||""} ${p}`:`${c} ${p} ${u.message||""}`})(e,o,l)),r.createElement(Ga,null,t))}const Va=v.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,Qa=v.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Ya=v.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Za=({title:e,actions:t=null,contextMessage:n,contextActions:o,contextComponent:a,selectedCount:l,direction:i,showMenu:u=!0})=>r.createElement(Va,{className:"rdt_TableHeader",role:"heading","aria-level":1},r.createElement(Qa,null,e),t&&r.createElement(Ya,null,t),u&&r.createElement(Ka,{contextMessage:n,contextActions:o,contextComponent:a,direction:i,selectedCount:l}));function yn(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n}const qa={left:"flex-start",right:"flex-end",center:"center"},Xa=v.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>qa[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,Ja=e=>{var{align:t="right",wrapContent:n=!0}=e,o=yn(e,["align","wrapContent"]);return r.createElement(Xa,Object.assign({align:t,$wrapContent:n},o))},er=v.div`
	display: flex;
	flex-direction: column;
`,tr=v.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&N`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&N`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Gt=v.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,nr=v.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,or=v(be)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,ar=v.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,rr=()=>T.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},T.createElement("path",{d:"M7 10l5 5 5-5z"}),T.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),sr=v.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,lr=v.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,ir=e=>{var{defaultValue:t,onChange:n}=e,o=yn(e,["defaultValue","onChange"]);return r.createElement(lr,null,r.createElement(sr,Object.assign({onChange:n,defaultValue:t},o)),r.createElement(rr,null))},d={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return T.createElement("div",null,"To add an expander pass in a component instance via ",T.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:T.createElement(()=>T.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},T.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),T.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"})),null),expanded:T.createElement(()=>T.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},T.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),T.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"})),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:T.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:T.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:lt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:T.createElement(()=>T.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},T.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),T.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"})),null),paginationIconLastPage:T.createElement(()=>T.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},T.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),T.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"})),null),paginationIconNext:T.createElement(()=>T.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},T.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),T.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),paginationIconPrevious:T.createElement(()=>T.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},T.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),T.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:Ne.AUTO,onChangePage:L,onChangeRowsPerPage:L,onRowClicked:L,onRowDoubleClicked:L,onRowMouseEnter:L,onRowMouseLeave:L,onRowExpandToggled:L,onSelectedRowsChange:L,onSort:L,onColumnOrderChange:L},cr={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},dr=v.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,Me=v.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({$isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,ur=v.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${fn`
    width: 100%;
    justify-content: space-around;
  `};
`,vn=v.span`
	flex-shrink: 1;
	user-select: none;
`,gr=v(vn)`
	margin: 0 24px;
`,pr=v(vn)`
	margin: 0 4px;
`;var mr=r.memo(function({rowsPerPage:e,rowCount:t,currentPage:n,direction:o=d.direction,paginationRowsPerPageOptions:a=d.paginationRowsPerPageOptions,paginationIconLastPage:l=d.paginationIconLastPage,paginationIconFirstPage:i=d.paginationIconFirstPage,paginationIconNext:u=d.paginationIconNext,paginationIconPrevious:c=d.paginationIconPrevious,paginationComponentOptions:g=d.paginationComponentOptions,onChangeRowsPerPage:p=d.onChangeRowsPerPage,onChangePage:m=d.onChangePage}){const y=(()=>{const F=typeof window=="object";function U(){return{width:F?window.innerWidth:void 0,height:F?window.innerHeight:void 0}}const[_,ce]=r.useState(U);return r.useEffect(()=>{if(!F)return()=>null;function de(){ce(U())}return window.addEventListener("resize",de),()=>window.removeEventListener("resize",de)},[]),_})(),b=xn(o),f=y.width&&y.width>599,j=ve(t,e),h=n*e,S=h-e+1,C=n===1,O=n===j,R=Object.assign(Object.assign({},cr),g),$=n===j?`${S}-${t} ${R.rangeSeparatorText} ${t}`:`${S}-${h} ${R.rangeSeparatorText} ${t}`,D=r.useCallback(()=>m(n-1),[n,m]),E=r.useCallback(()=>m(n+1),[n,m]),k=r.useCallback(()=>m(1),[m]),B=r.useCallback(()=>m(ve(t,e)),[m,t,e]),I=r.useCallback(F=>p(Number(F.target.value),n),[n,p]),W=a.map(F=>r.createElement("option",{key:F,value:F},F));R.selectAllRowsItem&&W.push(r.createElement("option",{key:-1,value:t},R.selectAllRowsItemText));const Q=r.createElement(ir,{onChange:I,defaultValue:e,"aria-label":R.rowsPerPageText},W);return r.createElement(dr,{className:"rdt_Pagination"},!R.noRowsPerPage&&f&&r.createElement(r.Fragment,null,r.createElement(pr,null,R.rowsPerPageText),Q),f&&r.createElement(gr,null,$),r.createElement(ur,null,r.createElement(Me,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":C,onClick:k,disabled:C,$isRTL:b},i),r.createElement(Me,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":C,onClick:D,disabled:C,$isRTL:b},c),!R.noRowsPerPage&&!f&&Q,r.createElement(Me,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":O,onClick:E,disabled:O,$isRTL:b},u),r.createElement(Me,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":O,onClick:B,disabled:O,$isRTL:b},l)))});const se=(e,t)=>{const n=r.useRef(!0);r.useEffect(()=>{n.current?n.current=!1:e()},t)};var hr=function(e){return function(t){return!!t&&typeof t=="object"}(e)&&!function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||function(o){return o.$$typeof===fr}(t)}(e)},fr=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function Re(e,t){return t.clone!==!1&&t.isMergeableObject(e)?he((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function br(e,t,n){return e.concat(t).map(function(o){return Re(o,n)})}function Kt(e){return Object.keys(e).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(n){return t.propertyIsEnumerable(n)}):[]}(e))}function Vt(e,t){try{return t in e}catch{return!1}}function wr(e,t,n){var o={};return n.isMergeableObject(e)&&Kt(e).forEach(function(a){o[a]=Re(e[a],n)}),Kt(t).forEach(function(a){(function(l,i){return Vt(l,i)&&!(Object.hasOwnProperty.call(l,i)&&Object.propertyIsEnumerable.call(l,i))})(e,a)||(Vt(e,a)&&n.isMergeableObject(t[a])?o[a]=function(l,i){if(!i.customMerge)return he;var u=i.customMerge(l);return typeof u=="function"?u:he}(a,n)(e[a],t[a],n):o[a]=Re(t[a],n))}),o}function he(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||br,n.isMergeableObject=n.isMergeableObject||hr,n.cloneUnlessOtherwiseSpecified=Re;var o=Array.isArray(t);return o===Array.isArray(e)?o?n.arrayMerge(e,t,n):wr(e,t,n):Re(t,n)}he.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(n,o){return he(n,o,t)},{})};var xr=he;const Qt={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},Yt={default:Qt,light:Qt,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function yr(e,t,n,o){const[a,l]=r.useState(()=>Wt(e)),[i,u]=r.useState(""),c=r.useRef("");se(()=>{l(Wt(e))},[e]);const g=r.useCallback(h=>{var S,C,O;const{attributes:R}=h.target,$=(S=R.getNamedItem("data-column-id"))===null||S===void 0?void 0:S.value;$&&(c.current=((O=(C=a[He(a,$)])===null||C===void 0?void 0:C.id)===null||O===void 0?void 0:O.toString())||"",u(c.current))},[a]),p=r.useCallback(h=>{var S;const{attributes:C}=h.target,O=(S=C.getNamedItem("data-column-id"))===null||S===void 0?void 0:S.value;if(O&&c.current&&O!==c.current){const R=He(a,c.current),$=He(a,O),D=[...a];D[R]=a[$],D[$]=a[R],l(D),t(D)}},[t,a]),m=r.useCallback(h=>{h.preventDefault()},[]),y=r.useCallback(h=>{h.preventDefault()},[]),b=r.useCallback(h=>{h.preventDefault(),c.current="",u("")},[]),f=function(h=!1){return h?ne.ASC:ne.DESC}(o),j=r.useMemo(()=>a[He(a,n==null?void 0:n.toString())]||{},[n,a]);return{tableColumns:a,draggingColumnId:i,handleDragStart:g,handleDragEnter:p,handleDragOver:m,handleDragLeave:y,handleDragEnd:b,defaultSortDirection:f,defaultSortColumn:j}}var vr=r.memo(function(e){const{data:t=d.data,columns:n=d.columns,title:o=d.title,actions:a=d.actions,keyField:l=d.keyField,striped:i=d.striped,highlightOnHover:u=d.highlightOnHover,pointerOnHover:c=d.pointerOnHover,dense:g=d.dense,selectableRows:p=d.selectableRows,selectableRowsSingle:m=d.selectableRowsSingle,selectableRowsHighlight:y=d.selectableRowsHighlight,selectableRowsNoSelectAll:b=d.selectableRowsNoSelectAll,selectableRowsVisibleOnly:f=d.selectableRowsVisibleOnly,selectableRowSelected:j=d.selectableRowSelected,selectableRowDisabled:h=d.selectableRowDisabled,selectableRowsComponent:S=d.selectableRowsComponent,selectableRowsComponentProps:C=d.selectableRowsComponentProps,onRowExpandToggled:O=d.onRowExpandToggled,onSelectedRowsChange:R=d.onSelectedRowsChange,expandableIcon:$=d.expandableIcon,onChangeRowsPerPage:D=d.onChangeRowsPerPage,onChangePage:E=d.onChangePage,paginationServer:k=d.paginationServer,paginationServerOptions:B=d.paginationServerOptions,paginationTotalRows:I=d.paginationTotalRows,paginationDefaultPage:W=d.paginationDefaultPage,paginationResetDefaultPage:Q=d.paginationResetDefaultPage,paginationPerPage:F=d.paginationPerPage,paginationRowsPerPageOptions:U=d.paginationRowsPerPageOptions,paginationIconLastPage:_=d.paginationIconLastPage,paginationIconFirstPage:ce=d.paginationIconFirstPage,paginationIconNext:de=d.paginationIconNext,paginationIconPrevious:ze=d.paginationIconPrevious,paginationComponent:Be=d.paginationComponent,paginationComponentOptions:We=d.paginationComponentOptions,responsive:Ue=d.responsive,progressPending:q=d.progressPending,progressComponent:Ee=d.progressComponent,persistTableHead:X=d.persistTableHead,noDataComponent:Se=d.noDataComponent,disabled:oe=d.disabled,noTableHead:Ge=d.noTableHead,noHeader:Ke=d.noHeader,fixedHeader:Oe=d.fixedHeader,fixedHeaderScrollHeight:Ve=d.fixedHeaderScrollHeight,pagination:J=d.pagination,subHeader:ae=d.subHeader,subHeaderAlign:je=d.subHeaderAlign,subHeaderWrap:Pe=d.subHeaderWrap,subHeaderComponent:Qe=d.subHeaderComponent,noContextMenu:Ye=d.noContextMenu,contextMessage:Ze=d.contextMessage,contextActions:M=d.contextActions,contextComponent:Rn=d.contextComponent,expandableRows:$e=d.expandableRows,onRowClicked:gt=d.onRowClicked,onRowDoubleClicked:pt=d.onRowDoubleClicked,onRowMouseEnter:mt=d.onRowMouseEnter,onRowMouseLeave:ht=d.onRowMouseLeave,sortIcon:En=d.sortIcon,onSort:Sn=d.onSort,sortFunction:ft=d.sortFunction,sortServer:qe=d.sortServer,expandableRowsComponent:On=d.expandableRowsComponent,expandableRowsComponentProps:jn=d.expandableRowsComponentProps,expandableRowDisabled:bt=d.expandableRowDisabled,expandableRowsHideExpander:wt=d.expandableRowsHideExpander,expandOnRowClicked:Pn=d.expandOnRowClicked,expandOnRowDoubleClicked:$n=d.expandOnRowDoubleClicked,expandableRowExpanded:xt=d.expandableRowExpanded,expandableInheritConditionalStyles:Dn=d.expandableInheritConditionalStyles,defaultSortFieldId:kn=d.defaultSortFieldId,defaultSortAsc:Tn=d.defaultSortAsc,clearSelectedRows:yt=d.clearSelectedRows,conditionalRowStyles:Fn=d.conditionalRowStyles,theme:vt=d.theme,customStyles:Ct=d.customStyles,direction:we=d.direction,onColumnOrderChange:Hn=d.onColumnOrderChange,className:Mn}=e,{tableColumns:Rt,draggingColumnId:Et,handleDragStart:St,handleDragEnter:Ot,handleDragOver:jt,handleDragLeave:Pt,handleDragEnd:$t,defaultSortDirection:In,defaultSortColumn:Ln}=yr(n,Hn,kn,Tn),[{rowsPerPage:ee,currentPage:G,selectedRows:Xe,allSelected:Dt,selectedCount:kt,selectedColumn:Y,sortDirection:ue,toggleOnSelectedRowsChange:Nn},re]=r.useReducer(ua,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Ln,toggleOnSelectedRowsChange:!1,sortDirection:In,currentPage:W,rowsPerPage:F,selectedRowsFlag:!1,contextMessage:d.contextMessage}),{persistSelectedOnSort:Tt=!1,persistSelectedOnPageChange:De=!1}=B,Ft=!(!k||!De&&!Tt),_n=J&&!q&&t.length>0,An=Be||mr,zn=r.useMemo(()=>((x={},P="default",z="default")=>{const K=Yt[P]?P:z;return xr({table:{style:{color:(w=Yt[K]).text.primary,backgroundColor:w.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:w.text.primary,backgroundColor:w.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:w.background.default,minHeight:"52px"}},head:{style:{color:w.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:w.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:w.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:w.context.background,fontSize:"18px",fontWeight:400,color:w.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:w.text.primary,backgroundColor:w.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:w.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:w.selected.text,backgroundColor:w.selected.default,borderBottomColor:w.background.default}},highlightOnHoverStyle:{color:w.highlightOnHover.text,backgroundColor:w.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:w.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:w.background.default},stripedStyle:{color:w.striped.text,backgroundColor:w.striped.default}},expanderRow:{style:{color:w.text.primary,backgroundColor:w.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:w.button.default,fill:w.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:w.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:w.button.hover},"&:focus":{outline:"none",backgroundColor:w.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:w.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:w.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:w.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:w.button.default,fill:w.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:w.button.disabled,fill:w.button.disabled},"&:hover:not(:disabled)":{backgroundColor:w.button.hover},"&:focus":{outline:"none",backgroundColor:w.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:w.text.primary,backgroundColor:w.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:w.text.primary,backgroundColor:w.background.default}}},x);var w})(Ct,vt),[Ct,vt]),Bn=r.useMemo(()=>Object.assign({},we!=="auto"&&{dir:we}),[we]),A=r.useMemo(()=>{if(qe)return t;if(Y!=null&&Y.sortFunction&&typeof Y.sortFunction=="function"){const x=Y.sortFunction,P=ue===ne.ASC?x:(z,K)=>-1*x(z,K);return[...t].sort(P)}return function(x,P,z,K){return P?K&&typeof K=="function"?K(x.slice(0),P,z):x.slice(0).sort((w,ke)=>{let te,Z;if(typeof P=="string"?(te=st(w,P),Z=st(ke,P)):(te=P(w),Z=P(ke)),z==="asc"){if(te<Z)return-1;if(te>Z)return 1}if(z==="desc"){if(te>Z)return-1;if(te<Z)return 1}return 0}):x}(t,Y==null?void 0:Y.selector,ue,ft)},[qe,Y,ue,t,ft]),xe=r.useMemo(()=>{if(J&&!k){const x=G*ee,P=x-ee;return A.slice(P,x)}return A},[G,J,k,ee,A]),Wn=r.useCallback(x=>{re(x)},[]),Un=r.useCallback(x=>{re(x)},[]),Gn=r.useCallback(x=>{re(x)},[]),Kn=r.useCallback((x,P)=>gt(x,P),[gt]),Vn=r.useCallback((x,P)=>pt(x,P),[pt]),Qn=r.useCallback((x,P)=>mt(x,P),[mt]),Yn=r.useCallback((x,P)=>ht(x,P),[ht]),ge=r.useCallback(x=>re({type:"CHANGE_PAGE",page:x,paginationServer:k,visibleOnly:f,persistSelectedOnPageChange:De}),[k,De,f]),Zn=r.useCallback(x=>{const P=ve(I||xe.length,x),z=tt(G,P);k||ge(z),re({type:"CHANGE_ROWS_PER_PAGE",page:z,rowsPerPage:x})},[G,ge,k,I,xe.length]);if(J&&!k&&A.length>0&&xe.length===0){const x=ve(A.length,ee),P=tt(G,x);ge(P)}se(()=>{R({allSelected:Dt,selectedCount:kt,selectedRows:Xe.slice(0)})},[Nn]),se(()=>{Sn(Y,ue,A.slice(0))},[Y,ue]),se(()=>{E(G,I||A.length)},[G]),se(()=>{D(ee,G)},[ee]),se(()=>{ge(W)},[W,Q]),se(()=>{if(J&&k&&I>0){const x=ve(I,ee),P=tt(G,x);G!==P&&ge(P)}},[I]),r.useEffect(()=>{re({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:yt})},[m,yt]),r.useEffect(()=>{if(!j)return;const x=A.filter(z=>j(z)),P=m?x.slice(0,1):x;re({type:"SELECT_MULTIPLE_ROWS",keyField:l,selectedRows:P,totalRows:A.length,mergeSelections:Ft})},[t,j]);const qn=f?xe:A,Xn=De||m||b;return r.createElement(lo,{theme:zn},!Ke&&(!!o||!!a)&&r.createElement(Za,{title:o,actions:a,showMenu:!Ye,selectedCount:kt,direction:we,contextActions:M,contextComponent:Rn,contextMessage:Ze}),ae&&r.createElement(Ja,{align:je,wrapContent:Pe},Qe),r.createElement(tr,Object.assign({$responsive:Ue,$fixedHeader:Oe,$fixedHeaderScrollHeight:Ve,className:Mn},Bn),r.createElement(nr,null,q&&!X&&r.createElement(Gt,null,Ee),r.createElement(pa,{disabled:oe,className:"rdt_Table",role:"table"},!Ge&&(!!X||A.length>0&&!q)&&r.createElement(ha,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:Oe},r.createElement(fa,{className:"rdt_TableHeadRow",role:"row",$dense:g},p&&(Xn?r.createElement(be,{style:{flex:"0 0 48px"}}):r.createElement(Wa,{allSelected:Dt,selectedRows:Xe,selectableRowsComponent:S,selectableRowsComponentProps:C,selectableRowDisabled:h,rowData:qn,keyField:l,mergeSelections:Ft,onSelectAllRows:Un})),$e&&!wt&&r.createElement(or,null),Rt.map(x=>r.createElement(za,{key:x.id,column:x,selectedColumn:Y,disabled:q||A.length===0,pagination:J,paginationServer:k,persistSelectedOnSort:Tt,selectableRowsVisibleOnly:f,sortDirection:ue,sortIcon:En,sortServer:qe,onSort:Wn,onDragStart:St,onDragOver:jt,onDragEnd:$t,onDragEnter:Ot,onDragLeave:Pt,draggingColumnId:Et})))),!A.length&&!q&&r.createElement(ar,null,Se),q&&X&&r.createElement(Gt,null,Ee),!q&&A.length>0&&r.createElement(er,{className:"rdt_TableBody",role:"rowgroup"},xe.map((x,P)=>{const z=me(x,l),K=function(Z=""){return typeof Z!="number"&&(!Z||Z.length===0)}(z)?P:z,w=Le(x,Xe,l),ke=!!($e&&xt&&xt(x)),te=!!($e&&bt&&bt(x));return r.createElement(Ha,{id:K,key:K,keyField:l,"data-row-id":K,columns:Rt,row:x,rowCount:A.length,rowIndex:P,selectableRows:p,expandableRows:$e,expandableIcon:$,highlightOnHover:u,pointerOnHover:c,dense:g,expandOnRowClicked:Pn,expandOnRowDoubleClicked:$n,expandableRowsComponent:On,expandableRowsComponentProps:jn,expandableRowsHideExpander:wt,defaultExpanderDisabled:te,defaultExpanded:ke,expandableInheritConditionalStyles:Dn,conditionalRowStyles:Fn,selected:w,selectableRowsHighlight:y,selectableRowsComponent:S,selectableRowsComponentProps:C,selectableRowDisabled:h,selectableRowsSingle:m,striped:i,onRowExpandToggled:O,onRowClicked:Kn,onRowDoubleClicked:Vn,onRowMouseEnter:Qn,onRowMouseLeave:Yn,onSelectedRow:Gn,draggingColumnId:Et,onDragStart:St,onDragOver:jt,onDragEnd:$t,onDragEnter:Ot,onDragLeave:Pt})}))))),_n&&r.createElement("div",null,r.createElement(An,{onChangePage:ge,onChangeRowsPerPage:Zn,rowCount:I||A.length,currentPage:G,rowsPerPage:ee,direction:we,paginationRowsPerPageOptions:U,paginationIconLastPage:_,paginationIconFirstPage:ce,paginationIconNext:de,paginationIconPrevious:ze,paginationComponentOptions:We})))});function Cr(e){return io({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M7 20h2V8h3L8 4 4 8h3zm13-4h-3V4h-2v12h-3l4 4z"}}]})(e)}function Rr({isFetching:e,children:t}){const[n,o]=r.useState(!1),a=()=>o(!1),l=()=>o(!0);return s.jsxs(s.Fragment,{children:[s.jsx(_e,{variant:"primary",onClick:l,disabled:e,children:t}),s.jsx(Lt,{show:n,onHide:a,placement:"end",children:s.jsx(Lt.Body,{children:s.jsx(co,{Title:s.jsx(s.Fragment,{children:"註冊新用戶"}),service:"admin",location:`sign-up/${btoa("admin")}`})})})]})}function Er({ToolText:e}){const t=n=>s.jsx(Ae,{id:"button-tooltip",...n,children:e});return s.jsx(ut,{placement:"top",overlay:t,children:s.jsx("span",{children:s.jsx(ko,{className:"fs-5"})})})}const Sr=v.div`

-webkit-animation: shadow-drop ${({s:e})=>e}s ${({delay:e})=>e} cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
animation: shadow-drop ${({s:e})=>e}s ${({delay:e})=>e}s  cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

@-webkit-keyframes shadow-drop {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}
@keyframes shadow-drop {
  0% {
    opacity:0;
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    opacity:1;
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
}

`;function Or({subtitle:e,Text:t,children:n,second:o,delay:a}){return s.jsx(Sr,{s:o,delay:a,children:s.jsx(Te,{className:"mt-4 text-center shadow p-3 mb-5 bg-body-tertiary rounded",children:s.jsxs(Te.Body,{children:[e?s.jsx(Te.Subtitle,{className:"mb-2 text-muted text-end",children:e}):null,s.jsx(Te.Text,{children:n})]})})})}const nt=r.memo(Or);function jr({title:e,header:t,children:n,resetUpdateUserDate:o}){const[a,l]=r.useState(!1);return s.jsxs(s.Fragment,{children:[s.jsx("div",{onClick:()=>l(!0),className:"me-2",children:e}),s.jsxs(Fe,{size:"xl",show:a,onHide:()=>{l(!1),o()},"aria-labelledby":"example-modal-sizes-title-lg",children:[s.jsx(Fe.Header,{closeButton:!0,children:s.jsx(Fe.Title,{id:"example-modal-sizes-title-lg",className:"fst-italic",children:t})}),s.jsx(Fe.Body,{children:n})]})]})}const Pr=r.memo(jr);function $r(e,t,n,o){const{mutate:a}=Ko({mutationFn:async({newData:i})=>{if(o.type==="DELETE"){const u=i.normalInfo;fetch(`http://localhost:3301/employees/${u}`,{method:"DELETE",credentials:"include",mode:"cors"}).then(c=>c.text())}if(o.type==="UPDATE"){const{normalInfo:u,medicalInfo:c}=i,g={...u,user_password:btoa(u.user_password),...c};delete g.uuid,["MRI002","CT002"].includes(c.position_id)?g.role_uid=1:g.role_uid=2;const p=await fetch(`http://localhost:3301/employees/${g.user_id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(g),credentials:"include",mode:"cors"});if(!p.ok){const m=await p.json();throw new Error(m.msg)}}return o},onMutate:async({newData:i,operation:u})=>{await e.cancelQueries({queryKey:["employees"]});const c=e.getQueryData(["employees",t]);if(o.bool){const g=c.data;let p;const m={DELETE:()=>(p=g.filter(y=>y.user_id!==i.user_id),{...c,data:p}),UPDATE:()=>{const y=l(i);return g.forEach((b,f,j)=>{b.user_id==y.user_id&&(j[f]={...b,...y})}),{...c,data:g}},DEFAULT:()=>c};return e.setQueryData(["employees",t],m[u]()),{previousData:c}}return{previousData:c}},onError:(i,u,c)=>{n({detail:i.message,theme:"danger",timeStamp:new Date().toLocaleTimeString(),show:!0}),e.setQueryData(["employees"],c.previousData)},onSettled:i=>{if(i.type==="DELETE"&&i.bool){n({detail:"刪除成功!",theme:"#ffdb36",timeStamp:new Date().toLocaleTimeString(),show:!0});return}if(i.type==="UPDATE"&&i.bool){n({detail:"編輯成功!",theme:"success",timeStamp:new Date().toLocaleTimeString(),show:!0});return}}});function l(i){return Object.values(i).reduce((g,p)=>({...p,...g}))}return{mutate:a,combinationUserFields:l}}const Dr=v(_e)`
border:none;
transition:all 0.3s ease-out;

svg{
font-size:1.4rem;
transition:inherit;
transform:${({open:e})=>e?"rotate(-90deg)":""}

}
&:hover{
  background:#859cb1d1;
}
`,Zt=v(To)`
font-weight:bold;
padding-right:0;
padding-top:0;
svg{
margin-right:5px;
}`,qt=v.table`
width:100%;
--fontSize:1.1rem;
--fontWeight:600;
--fontColor:#6d6d6d;

tr{
  margin:0px;
  border-bottom:1.3px solid #dadada;


  td{
    text-align:left;
    padding:8px !important;
    &:first-child{
    font-weight:700 !important;
    }
    &:last-child{
      display:flex;
      align-items:center;
      border:none;
      font-size:var(--fontSize);
      font-weight:var(--fontWeight);
      color:var(--fontColor);
    }
  input{
    border:none;
    font-size:var(--fontSize);
    font-weight:var(--fontWeight);
    color:var(--fontColor);
  }
  }
}

`,kr=r.forwardRef(({children:e,onClick:t,setIsOpen:n},o)=>s.jsx("a",{href:"",ref:o,onClick:a=>{a.preventDefault(),n(l=>!l),t(a)},children:e})),Tr=r.forwardRef(({children:e,style:t,className:n,"aria-labelledby":o,show:a,setIsOpen:l},i)=>(r.useEffect(()=>{a||l(!1)},[a]),s.jsx("div",{ref:i,style:{...t,transform:"translateX(-25%)"},className:`${n}`,"aria-labelledby":o,children:s.jsx("ul",{className:"list-unstyled m-0 text-start ",children:e})})));function Xt(e,t,n,o){let a=confirm(`${t} ${e}`);return n({type:o,bool:a}),a}function Fr({currentEditUser:e}){const{role_uid:t}=e.normalInfo;return s.jsxs(s.Fragment,{children:["人員資料修改-",s.jsx(Fo,{className:"fs-5  align-baseline"}),"Role_Group:",s.jsx(_e,{variant:t==1?"danger":"primary",as:"div",className:"m-1 fw-bold user-select-none",children:Cn[t]}),"@",s.jsxs("div",{className:"d-inline-block text-secondary",children:["上次更新:",new Date().toLocaleString()]})]})}function Hr({userData:e,page:t}){const[n,o,a,l]=uo(),i=$=>{a(D=>!D),o({...$})},u=r.useMemo(()=>Je(e),[e]),[c,g]=r.useState(u),[p,m]=r.useState(!1),[y,b]=r.useState({type:"DEFAULT",bool:!1}),[f,j]=r.useState({department_name:c.medicalInfo.department_name,position_id:c.medicalInfo.position_id}),h=it(),{mutate:S,combinationUserFields:C}=$r(h,t,i,y),O=$=>{Xt(c.normalInfo.user_name,"確定修改該筆資料?",b,"UPDATE"),S({newData:c,operation:"UPDATE"})},R=()=>{const D=h.getQueryData(["employees",t]).data.filter(E=>E.user_id===e.user_id);g(Je(D[0]))};return s.jsxs(ye,{children:[s.jsx(ye.Toggle,{as:kr,setIsOpen:m,id:"dropdown-custom-components",children:s.jsx(Dr,{variant:"outline-secondary",open:p,children:s.jsx(go,{})})}),s.jsxs(ye.Menu,{as:Tr,setIsOpen:m,children:[s.jsx(Zt,{eventKey:"1",children:s.jsx(Pr,{title:s.jsxs(s.Fragment,{children:[" ",s.jsx(po,{className:"text-secondary me-1 "}),"編輯"]}),header:s.jsx(Fr,{currentEditUser:c}),resetUpdateUserDate:R,children:s.jsx(mo,{children:s.jsx("form",{onChange:$=>{let D=`user_${$.target.name}`;const E=$.target.value,k=C(c);D==="user_department"&&(D="position_id");const B=Je({...k,[D]:E});g(()=>B)},children:s.jsxs(rt,{children:[s.jsxs(V,{lg:3,children:[s.jsx(V,{children:s.jsx(_o,{userState:c,Figure:null,role:"admin",save:O})}),s.jsx(V,{children:"Notifications"})]}),s.jsxs(V,{lg:9,className:"text-nowrap",children:[s.jsx(V,{children:s.jsx(nt,{subtitle:c.normalInfo.uuid,second:.6,delay:.1,children:s.jsx(qt,{children:et.normalInfo(c.normalInfo,g,"admin")})})}),s.jsxs(rt,{children:[s.jsx(V,{children:s.jsx(nt,{second:3,delay:.7})}),s.jsx(V,{children:s.jsx(nt,{subtitle:s.jsx(Er,{ToolText:"注意!保存後才一併修改"}),second:2,delay:.5,children:s.jsxs(qt,{children:[et.medicalInfo(c.medicalInfo,"admin",f,j),et.restInfo(c.restInfo)]})})})]})]})]})})})})}),s.jsxs(Zt,{eventKey:"2",onClick:$=>{Xt(e.user_name,"確定刪除該筆資料?",b,"DELETE"),S({newData:e,operation:"DELETE"})},children:[s.jsx(ho,{className:"text-danger"}),"刪除"]})]})]})}const Jt={MALE:{text:"男",color:"rgb(79 140 255)"},FEMALE:{text:"女",color:"rgb(255 2 2 / 56%)"},BISEXUAL:{text:"跨性別",color:"rgb(177 171 171 / 56%)"}},Cn={2:"訪客",1:"管理員"},Mr={table:{style:{minHeight:"50dvh"}},rows:{style:{minHeight:"60px"}},headCells:{style:{paddingLeft:"8px",paddingRight:"8px"}},cells:{style:{paddingLeft:"8px",paddingRight:"8px"}}};function Ir(e){return[{name:"ID",selector:n=>n.uuid?n.uuid.slice(0,8):n.uuid,hide:le.MD,compact:!0},{cell:n=>s.jsx(Ho,{bg:Jt[n.user_sex.toUpperCase()].color,children:n.user_name.charAt(0)}),hide:le.SM,width:"50px",left:!0,compact:!0},{name:"用戶名稱",selector:n=>n.user_name,sortable:!0,reorder:!0},{name:"報告量",selector:n=>n.reports??"無",sortable:!0,reorder:!0,hide:le.SM,width:"10%",minWidth:"50px",compact:!0},{name:"部門",selector:n=>n.department_name,sortable:!0,reorder:!0,hide:le.MD,width:"10%",minWidth:"50px",compact:!0},{name:"職稱",selector:n=>n.position_name,sortable:!0,reorder:!0},{name:"權限",selector:n=>Cn[n.role_uid],sortable:!0,reorder:!0,width:"5%",minWidth:"50px",compact:!0},{name:"性別",selector:n=>Jt[n.user_sex.toUpperCase()].text,sortable:!0,reorder:!0,width:"10%",minWidth:"50px"},{name:"上次登入",selector:n=>{const o=Ao(n.lastTimeLogin),a=/Invalid\b/i.test(o);return s.jsx(s.Fragment,{children:s.jsx(ut,{placement:"bottom",overlay:s.jsxs(Ae,{id:`tooltip-${n.uuid}`,children:[s.jsx("time",{dateTime:`${o.format("YYYY-MM-DD")}`,children:o.format("h:mm:ss a")}),"."]}),children:s.jsx("div",{variant:"secondary",children:a?"尚未登記":o.format("YYYY-MM-DD")})})})},sortable:!0,reorder:!0,hide:le.MD,style:{color:"rgba(0, 0, 0, 0.54)"}},{cell:n=>s.jsx(Hr,{userData:n,page:e}),ignoreRowClick:!0,allowOverflow:!0,button:!0}]}const ot={user_name:"用戶名稱",department_name:"部門",position_name:"職稱",lastTimeLogin:"上次登入"},Lr={rowsPerPageText:"每頁資料:",noRowsPerPage:!1,rangeSeparatorText:"of",selectAllRowsItem:!0,selectAllRowsItemText:"30"};function Nr({filterHandler:e,filterKeyWord:t,setFilterKeyWord:n}){return s.jsx(s.Fragment,{children:s.jsxs(rt,{children:[s.jsxs(V,{className:"mt-2 fw-bold",sm:6,xs:6,md:4,children:["查詢鍵: ",ot[t]]}),s.jsx(V,{sm:6,xs:6,md:6,className:Mt.xsSearchInput,children:s.jsx(Mo.Brand,{className:"fs-5",children:s.jsxs(Ie.Group,{controlId:"exampleForm.ControlInput1",onChange:e,className:"position-relative",children:[s.jsx("div",{className:"position-absolute end-0 ",children:s.jsx(Ie.Label,{children:s.jsx(fo,{className:"m-2 me-3",style:{cursor:"pointer"}})})}),s.jsx(Ie.Control,{type:"email",placeholder:"Search"})]})})}),s.jsx(V,{md:1,sm:8,className:Mt.xsBreakPoint}),s.jsx(V,{sm:4,md:2,children:s.jsx(qo,{as:Qo,size:"sm",variant:"light",onClick:o=>{if(o.target.innerText){const a=Object.fromEntries(Object.entries(ot).map(([l,i])=>[i,l]));n(a[o.target.innerText])}},title:s.jsx(bo,{className:"fs-4 "}),children:Object.values(ot).map(o=>s.jsx(ye.Item,{children:o},o))})})]})})}function en(e=0,t=10){return fetch(`http://localhost:3301/employees?per_page=${t}&page=${e}`,{method:"GET",credentials:"include",mode:"cors"}).then(n=>n.json())}function _r(e=[],t){const[n,o]=r.useState("user_name"),[a,l]=r.useState(""),[i,u]=r.useState(!1),g=t.getQueryData(["userCtx"]).normalInfo,p=e.filter(y=>y[n]&&y[n].toLowerCase().includes(a.toLowerCase())&&!y.user_name.includes(g.user_name));return{SubHeaderComponentMemo:r.useMemo(()=>{const y=b=>{a&&(u(!i),l("")),l(b.target.value)};return s.jsx(Nr,{filterHandler:y,filterKeyWord:n,setFilterKeyWord:o})},[a,i,n]),filteredItems:p,resetPaginationToggle:i}}const Ar=v(xo)`
.nav-link{
color:#495057;
  &[aria-selected="true"]{
    color:#0d6efd;
    }
}`;function qr(){const e=it(),t=10,[n,o]=r.useState(0),[a,l]=r.useState(t),i=Ir(n),{isSuccess:u,isFetching:c,dataUpdatedAt:g,isStale:p,data:m,refetch:y,isPreviousData:b}=Io({queryKey:["employees",n],queryFn:()=>en(n,a),keepPreviousData:!0,refetchOnWindowFocus:!1,retry:1}),{SubHeaderComponentMemo:f,filteredItems:j,resetPaginationToggle:h}=_r(m==null?void 0:m.data,e);r.useEffect(()=>{u&&O(n,a)},[m]);const S=R=>{b||o(R-1)},C=async(R,$)=>{l(R),o(Math.max($-1,0))};return s.jsx(s.Fragment,{children:s.jsxs(Ar,{defaultActiveKey:"employees",id:"justify-tab-example",className:"mb-3",justify:!0,children:[s.jsx(It,{eventKey:"employees",title:s.jsxs("h4",{className:" p-0 m-0",children:[s.jsx(wo,{className:"fs-3"}),"用戶資料"]}),children:s.jsx(vr,{customStyles:Mr,paginationServer:!0,paginationTotalRows:(m==null?void 0:m.total)??t,onChangePage:S,onChangeRowsPerPage:C,columns:i,data:j,direction:"auto",expandableRowsComponent:()=>s.jsx("h5",{children:"補充"}),expandOnRowClicked:!0,expandableRows:!0,expandableRowsHideExpander:!0,title:s.jsx(zr,{isStale:p,isFetching:c,refetch:y,queryClient:e,data:{data:m,dataUpdatedAt:g}}),noDataComponent:s.jsx(s.Fragment,{children:s.jsx("h3",{className:"fw-bold",children:"尚無資料"})}),highlightOnHover:!0,responsive:!0,pagination:!0,progressPending:c,paginationPerPage:a,paginationResetDefaultPage:h,paginationComponentOptions:Lr,paginationRowsPerPageOptions:[t,20],contextMessage:{singular:"筆資料",plural:"筆資料"},progressComponent:s.jsx(Br,{length:7}),persistTableHead:!0,pointerOnHover:!0,subHeader:!0,subHeaderAlign:"right",subHeaderWrap:!0,subHeaderComponent:f,selectableRows:!0,selectableRowsHighlight:!0,selectableRowsComponent:Ie.Check,sortIcon:s.jsx(Cr,{})})}),s.jsx(It,{eventKey:"analytics",title:s.jsxs("h4",{className:"p-0 m-0",children:[s.jsx(vo,{className:"fs-3"}),"行為分析"]}),children:"Tab content for Home"})]})});async function O(R=0,$=10){await e.prefetchQuery({queryKey:["employees",R+1],queryFn:()=>en(R+1,$)})}}function zr({isStale:e,isFetching:t,queryClient:n,refetch:o,data:{data:a,dataUpdatedAt:l}}){return s.jsxs("div",{className:"d-flex justify-content-between",children:[s.jsxs("h6",{className:"d  flex-row align-items-center p-0 m-0 text-secondary",children:[s.jsxs("div",{className:"d-inline-block",children:["上次刷新時間: ",new Date(l).toLocaleString()]}),s.jsxs("div",{children:["系統註冊人數:",(a==null?void 0:a.total)??0,"人"]})]}),s.jsxs("h3",{className:"d-flex flex-row align-items-center p-0 m-0 gap-2",children:[s.jsx(tn,{hint:"+Add member",children:s.jsxs(Rr,{isFetching:t,children:[s.jsx(Lo,{className:"me-1"}),"新增用戶"]})}),s.jsx(tn,{hint:"Refresh",children:s.jsxs(_e,{variant:"light",disabled:t,onClick:()=>{n.cancelQueries({queryKey:["employees"]}),o(),e&&n.invalidateQueries({queryKey:["employees"]})},children:["刷新資料  ",s.jsx(yo,{})]})})]})]})}function Br({length:e=4}){return s.jsx(s.Fragment,{children:s.jsxs("div",{className:"fs-2",children:[s.jsx(No,{animation:"border",className:"me-2",size:""}),"載入中... ",s.jsx(Nt,{as:"p",animation:"glow",children:s.jsx(Nt,{lg:e})})]})})}function tn({children:e,hint:t}){return s.jsx(ut,{placement:"top",overlay:s.jsx(Ae,{children:s.jsx("span",{children:t})}),children:e})}export{qr as default};
