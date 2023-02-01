import{R as U,r as c,j as p,a as L,F as G}from"./config.5c3d81e4.js";/**
 * @remix-run/router v1.0.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},E.apply(this,arguments)}var y;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(y||(y={}));const F="popstate";function X(e){e===void 0&&(e={});function t(o,s){let{pathname:a="/",search:i="",hash:l=""}=C(o.location.hash.substr(1));return D("",{pathname:a,search:i,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(o,s){let a=o.document.querySelector("base"),i="";if(a&&a.getAttribute("href")){let l=o.location.href,d=l.indexOf("#");i=d===-1?l:l.slice(0,d)}return i+"#"+(typeof s=="string"?s:B(s))}function r(o,s){Y(o.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(s)+")")}return ee(t,n,r,e)}function Y(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Z(){return Math.random().toString(36).substr(2,8)}function _(e){return{usr:e.state,key:e.key}}function D(e,t,n,r){return n===void 0&&(n=null),E({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?C(t):t,{state:n,key:t&&t.key||r||Z()})}function B(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function C(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Q(e){let t=typeof window<"u"&&typeof window.location<"u"&&window.location.origin!=="null"?window.location.origin:"unknown://unknown",n=typeof e=="string"?e:B(e);return new URL(n,t)}function ee(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:s=!1}=r,a=o.history,i=y.Pop,l=null;function d(){i=y.Pop,l&&l({action:i,location:m.location})}function u(h,f){i=y.Push;let x=D(m.location,h,f);n&&n(x,h);let S=_(x),R=m.createHref(x);try{a.pushState(S,"",R)}catch{o.location.assign(R)}s&&l&&l({action:i,location:m.location})}function v(h,f){i=y.Replace;let x=D(m.location,h,f);n&&n(x,h);let S=_(x),R=m.createHref(x);a.replaceState(S,"",R),s&&l&&l({action:i,location:m.location})}let m={get action(){return i},get location(){return e(o,a)},listen(h){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(F,d),l=h,()=>{o.removeEventListener(F,d),l=null}},createHref(h){return t(o,h)},encodeLocation(h){let f=Q(B(h));return E({},h,{pathname:f.pathname,search:f.search,hash:f.hash})},push:u,replace:v,go(h){return a.go(h)}};return m}var H;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(H||(H={}));function te(e,t,n){n===void 0&&(n="/");let r=typeof t=="string"?C(t):t,o=q(r.pathname||"/",n);if(o==null)return null;let s=J(e);re(s);let a=null;for(let i=0;a==null&&i<s.length;++i)a=he(s[i],pe(o));return a}function J(e,t,n,r){return t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=""),e.forEach((o,s)=>{let a={relativePath:o.path||"",caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};a.relativePath.startsWith("/")&&(g(a.relativePath.startsWith(r),'Absolute route path "'+a.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),a.relativePath=a.relativePath.slice(r.length));let i=w([r,a.relativePath]),l=n.concat(a);o.children&&o.children.length>0&&(g(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+i+'".')),J(o.children,t,l,i)),!(o.path==null&&!o.index)&&t.push({path:i,score:ce(i,o.index),routesMeta:l})}),t}function re(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ue(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const ne=/^:\w+$/,oe=3,ae=2,se=1,ie=10,le=-2,V=e=>e==="*";function ce(e,t){let n=e.split("/"),r=n.length;return n.some(V)&&(r+=le),t&&(r+=ae),n.filter(o=>!V(o)).reduce((o,s)=>o+(ne.test(s)?oe:s===""?se:ie),r)}function ue(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function he(e,t){let{routesMeta:n}=e,r={},o="/",s=[];for(let a=0;a<n.length;++a){let i=n[a],l=a===n.length-1,d=o==="/"?t:t.slice(o.length)||"/",u=de({path:i.relativePath,caseSensitive:i.caseSensitive,end:l},d);if(!u)return null;Object.assign(r,u.params);let v=i.route;s.push({params:r,pathname:w([o,u.pathname]),pathnameBase:ge(w([o,u.pathnameBase])),route:v}),u.pathnameBase!=="/"&&(o=w([o,u.pathnameBase]))}return s}function de(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=fe(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),i=o.slice(1);return{params:r.reduce((d,u,v)=>{if(u==="*"){let m=i[v]||"";a=s.slice(0,s.length-m.length).replace(/(.)\/+$/,"$1")}return d[u]=me(i[v]||"",u),d},{}),pathname:s,pathnameBase:a,pattern:e}}function fe(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),j(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,(a,i)=>(r.push(i),"([^\\/]+)"));return e.endsWith("*")?(r.push("*"),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function pe(e){try{return decodeURI(e)}catch(t){return j(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function me(e,t){try{return decodeURIComponent(e)}catch(n){return j(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function q(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function g(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function j(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}const w=e=>e.join("/").replace(/\/\/+/g,"/"),ge=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/");class ve{constructor(t,n,r){this.status=t,this.statusText=n||"",this.data=r}}function xe(e){return e instanceof ve}const ye=new Set(["POST","PUT","PATCH","DELETE"]);[...ye];/**
 * React Router v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},I.apply(this,arguments)}function we(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const Ce=typeof Object.is=="function"?Object.is:we,{useState:Re,useEffect:Ee,useLayoutEffect:Pe,useDebugValue:Se}=U;function be(e,t,n){const r=t(),[{inst:o},s]=Re({inst:{value:r,getSnapshot:t}});return Pe(()=>{o.value=r,o.getSnapshot=t,b(o)&&s({inst:o})},[e,r,t]),Ee(()=>(b(o)&&s({inst:o}),e(()=>{b(o)&&s({inst:o})})),[e]),Se(r),r}function b(e){const t=e.getSnapshot,n=e.value;try{const r=t();return!Ce(n,r)}catch{return!0}}function Ue(e,t,n){return t()}const Le=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",De=!Le,Ie=De?Ue:be;"useSyncExternalStore"in U&&(e=>e.useSyncExternalStore)(U);const Oe=c.exports.createContext(null),$e=c.exports.createContext(null),z=c.exports.createContext(null),Be=c.exports.createContext(null),P=c.exports.createContext(null),T=c.exports.createContext({outlet:null,matches:[]}),K=c.exports.createContext(null);function M(){return c.exports.useContext(P)!=null}function je(){return M()||g(!1),c.exports.useContext(P).location}function Te(e,t){M()||g(!1);let n=c.exports.useContext(z),{matches:r}=c.exports.useContext(T),o=r[r.length-1],s=o?o.params:{};o&&o.pathname;let a=o?o.pathnameBase:"/";o&&o.route;let i=je(),l;if(t){var d;let f=typeof t=="string"?C(t):t;a==="/"||((d=f.pathname)==null?void 0:d.startsWith(a))||g(!1),l=f}else l=i;let u=l.pathname||"/",v=a==="/"?u:u.slice(a.length)||"/",m=te(e,{pathname:v}),h=He(m&&m.map(f=>Object.assign({},f,{params:Object.assign({},s,f.params),pathname:w([a,f.pathname]),pathnameBase:f.pathnameBase==="/"?a:w([a,f.pathnameBase])})),r,n||void 0);return t&&h?p(P.Provider,{value:{location:I({pathname:"/",search:"",hash:"",state:null,key:"default"},l),navigationType:y.Pop},children:h}):h}function Me(){let e=ke(),t=xe(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:r},s={padding:"2px 4px",backgroundColor:r};return L(G,{children:[p("h2",{children:"Unhandled Thrown Error!"}),p("h3",{style:{fontStyle:"italic"},children:t}),n?p("pre",{style:o,children:n}):null,p("p",{children:"\u{1F4BF} Hey developer \u{1F44B}"}),L("p",{children:["You can provide a way better UX than this when your app throws errors by providing your own\xA0",p("code",{style:s,children:"errorElement"})," props on\xA0",p("code",{style:s,children:"<Route>"})]})]})}class Fe extends c.exports.Component{constructor(t){super(t),this.state={location:t.location,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location?{error:t.error,location:t.location}:{error:t.error||n.error,location:n.location}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?p(K.Provider,{value:this.state.error,children:this.props.component}):this.props.children}}function _e(e){let{routeContext:t,match:n,children:r}=e,o=c.exports.useContext(Oe);return o&&n.route.errorElement&&(o._deepestRenderedBoundaryId=n.route.id),p(T.Provider,{value:t,children:r})}function He(e,t,n){if(t===void 0&&(t=[]),e==null)if(n!=null&&n.errors)e=n.matches;else return null;let r=e,o=n==null?void 0:n.errors;if(o!=null){let s=r.findIndex(a=>a.route.id&&(o==null?void 0:o[a.route.id]));s>=0||g(!1),r=r.slice(0,Math.min(r.length,s+1))}return r.reduceRight((s,a,i)=>{let l=a.route.id?o==null?void 0:o[a.route.id]:null,d=n?a.route.errorElement||p(Me,{}):null,u=()=>p(_e,{match:a,routeContext:{outlet:s,matches:t.concat(r.slice(0,i+1))},children:l?d:a.route.element!==void 0?a.route.element:s});return n&&(a.route.errorElement||i===0)?p(Fe,{location:n.location,component:d,error:l,children:u()}):u()},null)}var k;(function(e){e.UseRevalidator="useRevalidator"})(k||(k={}));var O;(function(e){e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator"})(O||(O={}));function Ve(e){let t=c.exports.useContext(z);return t||g(!1),t}function ke(){var e;let t=c.exports.useContext(K),n=Ve(O.UseRouteError),r=c.exports.useContext(T),o=r.matches[r.matches.length-1];return t||(r||g(!1),o.route.id||g(!1),(e=n.errors)==null?void 0:e[o.route.id])}function Ae(e){g(!1)}function Ne(e){let{basename:t="/",children:n=null,location:r,navigationType:o=y.Pop,navigator:s,static:a=!1}=e;M()&&g(!1);let i=t.replace(/^\/*/,"/"),l=c.exports.useMemo(()=>({basename:i,navigator:s,static:a}),[i,s,a]);typeof r=="string"&&(r=C(r));let{pathname:d="/",search:u="",hash:v="",state:m=null,key:h="default"}=r,f=c.exports.useMemo(()=>{let x=q(d,i);return x==null?null:{pathname:x,search:u,hash:v,state:m,key:h}},[i,d,u,v,m,h]);return f==null?null:p(Be.Provider,{value:l,children:p(P.Provider,{children:n,value:{location:f,navigationType:o}})})}function Je(e){let{children:t,location:n}=e,r=c.exports.useContext($e),o=r&&!t?r.router.routes:$(t);return Te(o,n)}var A;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(A||(A={}));new Promise(()=>{});function $(e,t){t===void 0&&(t=[]);let n=[];return c.exports.Children.forEach(e,(r,o)=>{if(!c.exports.isValidElement(r))return;if(r.type===c.exports.Fragment){n.push.apply(n,$(r.props.children,t));return}r.type!==Ae&&g(!1),!r.props.index||!r.props.children||g(!1);let s=[...t,o],a={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,hasErrorBoundary:r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle};r.props.children&&(a.children=$(r.props.children,s)),n.push(a)}),n}/**
 * React Router DOM v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function qe(e){let{basename:t,children:n,window:r}=e,o=c.exports.useRef();o.current==null&&(o.current=X({window:r,v5Compat:!0}));let s=o.current,[a,i]=c.exports.useState({action:s.action,location:s.location});return c.exports.useLayoutEffect(()=>s.listen(i),[s]),p(Ne,{basename:t,children:n,location:a.location,navigationType:a.action,navigator:s})}var N;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(N||(N={}));var W;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(W||(W={}));const ze=({width:e,height:t})=>p(G,{children:L("svg",{className:"dark:fill-white fill-slate-800",width:e,height:t,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[p("style",{dangerouslySetInnerHTML:{__html:".spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}"}}),p("path",{d:"M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z",className:"spinner_P7sC"})]})});export{qe as H,Je as R,ze as S,Ae as a};