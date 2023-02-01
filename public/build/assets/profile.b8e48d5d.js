import{r as n,j as e,F as i,a as t,c as p,d as m,s as l,k as J}from"./config.5c3d81e4.js";import{B as u}from"./ButtonLoading.4ae85373.js";import"./axios.b95f0d2f.js";const K=()=>{const[r,c]=n.exports.useState({}),[d,g]=n.exports.useState(!1),[w,x]=n.exports.useState(!1),[f,N]=n.exports.useState(!1),[h,k]=n.exports.useState(!1),[L,y]=n.exports.useState(""),[$,v]=n.exports.useState(""),[j,C]=n.exports.useState(""),[I,U]=n.exports.useState(!0),[V,b]=n.exports.useState(!1),[O,o]=n.exports.useState({}),[B,_]=n.exports.useState(!1),[T,S]=n.exports.useState(!1),[F,E]=n.exports.useState(!1),[A,P]=n.exports.useState(""),R=a=>{p.get(`${m}/profile/get-user-data/${window.type}/${window.auth.id}`,{signal:a.signal}).then(({data:s})=>{c(s.data),U(!1)}).catch(s=>{U(!1);let D=s.response.data;D.errors&&l(Object.values(D.errors)[0],"error")})},q=()=>{S(!0),o({}),p.post(`${m}/profile/send-new-email-verify-code`,{email:r.email,type:window.type,id:r.id}).then(({data:a})=>{_(!0),x(!1),S(!1),l(a.data.message,"success")}).catch(a=>{S(!1);let s=a.response.data;s.errors.errors?l(s.errors.errors[0],"error"):o(s.errors)})};n.exports.useEffect(()=>{const a=new AbortController;return R(a),()=>a.abort()},[]);const z=()=>{b(!0),o({}),p.post(`${m}/profile/change-user-name`,{name:r.name,type:window.type,id:r.id}).then(({data:a})=>{l(a.data.message,"success"),b(!1),g(!d),o({})}).catch(a=>{b(!1);let s=a.response.data;s.errors.errors?l(s.errors.errors[0],"error"):o(s.errors)})},G=()=>{E(!0),o({}),p.post(`${m}/profile/verify-new-email`,{code:A,type:window.type,id:r.id}).then(({data:a})=>{l(a.data.message,"success"),P(""),_(!1),E(!1)}).catch(a=>{E(!1);let s=a.response.data;s.errors.errors?l(s.errors.errors[0],"error"):o(s.errors)})},H=()=>{o({}),N(!0),p.post(`${m}/profile/change-password`,{id:r.id,type:window.type,old_password:$,password:L,password_confirmation:j}).then(({data:a})=>{k(!1),y(""),v(""),C(""),N(!1),l(a.data.message,"success")}).catch(a=>{N(!1);let s=a.response.data;s.errors.errors?l(s.errors.errors[0],"error"):o(s.errors)})};return e(i,{children:e("div",{className:"p-2 lg:px-10 lg:py-2",children:t("div",{className:"grid grid-cols-1 lg:grid-cols-2",children:[t("div",{className:`py-1 px-3 ${I?"animate-pulse pointer-events-none":""}`,children:[e("div",{className:"overflow-auto",children:e("table",{className:"w-full",children:t("tbody",{children:[t("tr",{children:[e("td",{className:"p-3 text-sm whitespace-nowrap",children:window.locale_name}),e("td",{className:"p-3 whitespace-nowrap",children:t("div",{className:"flex items-center gap-2",children:[d?e("input",{value:r.name,onChange:a=>{c({...r,name:a.target.value})},className:"input-content w-auto p-0 m-0"}):e(i,{children:r.name}),d?t(i,{children:[e("button",{disabled:V,onClick:()=>{z()},className:"text-sky-600 dark:text-sky-400 text-xl",children:V?e(u,{}):e("ion-icon",{name:"checkmark-outline"})}),e("button",{onClick:()=>{g(!d),c({...r,name:window.auth.name}),o({})},className:"text-sky-600 dark:text-sky-400  text-xl",children:e("ion-icon",{name:"close-outline"})})]}):e("button",{onClick:()=>g(!d),className:"text-sky-600 dark:text-sky-400 text-xl",children:e("ion-icon",{name:"create-outline"})})]})})]}),t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_email}),e("td",{className:"p-3 w-auto whitespace-nowrap",children:t("div",{className:"flex items-center gap-2",children:[w?e("input",{value:r.email,onChange:a=>{c({...r,email:a.target.value})},className:"input-content w-auto p-0 m-0"}):e(i,{children:r.email}),w?t(i,{children:[e("button",{disabled:T,onClick:()=>{q()},className:"text-sky-600 dark:text-sky-400  text-xl",children:T?e(u,{}):e("ion-icon",{name:"checkmark-outline"})}),e("button",{onClick:()=>{x(!w),c({...r,email:window.auth.email}),o({})},className:"text-sky-600 dark:text-sky-400  text-xl",children:e("ion-icon",{name:"close-outline"})})]}):e(i,{children:!B&&e("button",{onClick:()=>x(!w),className:"text-sky-600 dark:text-sky-400  text-xl",children:e("ion-icon",{name:"create-outline"})})})]})})]}),B&&t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_new_email_verify_code}),e("td",{children:t("div",{className:"flex items-center gap-1",children:[e("input",{value:A,onChange:a=>{P(a.target.value)},className:"input-content w-auto p-0 m-0",type:"text"}),e("button",{disabled:F,onClick:()=>{G()},className:"text-sky-600 dark:text-sky-400  text-xl",children:F?e(u,{}):e("ion-icon",{name:"checkmark-outline"})}),e("button",{onClick:()=>{c({...r,email:window.auth.email}),_(!1),P("")},className:"text-sky-600 dark:text-sky-400  text-xl",children:e("ion-icon",{name:"close-outline"})})]})})]}),window.type==="admin"&&t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_stories_count}),e("td",{className:"p-3 whitespace-nowrap",children:r.stories_count})]}),e("tr",{children:e("td",{className:"p-3 whitespace-nowrap",colSpan:2,children:h?e("button",{className:"orange-button",onClick:()=>{k(!h),y(""),v(""),C("")},children:t("div",{className:"flex items-center gap-1",children:[e("ion-icon",{name:"close-outline"}),window.locale_close_change_password]})}):e("button",{className:"sky-button",onClick:()=>k(!h),children:t("div",{className:"flex items-center gap-1",children:[e("ion-icon",{name:"lock-closed-outline"}),window.locale_change_password]})})})}),h&&t(i,{children:[t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_old_password}),e("td",{className:"p-3 whitespace-nowrap",children:e("input",{value:$,onChange:a=>{v(a.target.value)},className:"input-content w-auto p-0 m-0",type:"password"})})]}),t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_new_password}),e("td",{className:"p-3 whitespace-nowrap",children:e("input",{value:L,onChange:a=>{y(a.target.value)},className:"input-content w-auto p-0 m-0",type:"password"})})]}),t("tr",{children:[e("td",{className:"p-3 whitespace-nowrap",children:window.locale_confirm_password}),e("td",{className:"p-3 whitespace-nowrap",children:e("input",{value:j,onChange:a=>{C(a.target.value)},className:"input-content w-auto p-0 m-0",type:"password"})})]}),e("tr",{children:e("td",{className:"p-3 whitespace-nowrap",colSpan:2,children:e("button",{disabled:f,onClick:()=>{H()},className:`green-button ${f?"opacity-70":""}`,children:t("div",{className:"flex items-center gap-1",children:[f?e(u,{}):e("ion-icon",{name:"checkmark-outline"}),window.locale_save]})})})})]})]})})}),Object.keys(O).length>0&&e("p",{className:"text-red-500",children:Object.values(O)[0]})]}),e("div",{children:"cols2"})]})})})};J.createRoot(document.getElementById("root-profile")).render(e(K,{}));