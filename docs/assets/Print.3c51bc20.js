import{_ as N,r as D,H,D as O,h as V,C as E,q as h,d as F,o,c as s,b as i,F as _,e as f,u as M,f as v,w,x as q,B as b,t as g,I as y,j as x}from"./index.e8867d45.js";import{u as z}from"./app.cec6577e.js";const A={class:"A4"},I={class:"mt-12 mb-12"},R={class:"row"},W={key:0,class:"btn"},j={__name:"Print",setup(L){const r=D(!1),C=H(),P=O(),k=z(),S=V(()=>k.printPreviewPapers.map(t=>{const{paperTitle:u,paperSubTitle:a,numberOfPagerColumns:e,solution:l,formulas:n}=t,p=n.length/e,d=100/e,T=l=="0"?"16px":"160px";let c=[],m=0;for(;m<n.length;)c.push(n.slice(m,p+m)),m+=p;return c=c.reverse(),console.log(c),{paperTitle:u,paperSubTitle:a,columnsOfPaper:c,colWidth:d,rowHeight:T}}));E(()=>{const t=new Date,u=t.getFullYear(),a=t.getMonth()+1,e=t.getDate(),l=t.getHours(),n=t.getMinutes(),p=t.getSeconds(),d=`${u}${a}${e}${l}${n}${p}`;console.log(d),document.title=C.query.fileName+d,window.onbeforeprint=()=>{console.log("before"),r.value=!0},window.onafterprint=()=>{console.log("after"),h(()=>{r.value=!1})}});const $=()=>{P.back()},B=()=>{r.value=!0,h(()=>{window.print()})};return(t,u)=>{const a=F("ElButton");return o(),s("div",{class:b({preview:!r.value})},[i("div",A,[(o(!0),s(_,null,f(M(S),e=>(o(),s("div",{class:b(["sheet padding-10mm",{"sheet-shadow":!r.value}])},[i("div",I,[i("h1",null,g(e.paperTitle),1),i("h3",null,g(e.paperSubTitle),1)]),i("div",R,[(o(!0),s(_,null,f(e.columnsOfPaper,l=>(o(),s("div",{style:y(`width: ${e.colWidth}%;`)},[(o(!0),s(_,null,f(l,n=>(o(),s("p",{style:y(`margin-bottom: ${e.rowHeight}`)},g(n),5))),256))],4))),256))])],2))),256)),r.value?q("",!0):(o(),s("div",W,[v(a,{onClick:$},{default:w(()=>[x("\u8FD4\u56DE")]),_:1}),v(a,{class:"mr-2 w-32",type:"primary",onClick:B},{default:w(()=>[x("\u6253\u5370")]),_:1})]))])],2)}}},J=N(j,[["__scopeId","data-v-ad3ea0b9"]]);export{J as default};
