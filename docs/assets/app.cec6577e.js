import{G as a}from"./index.e8867d45.js";const s=a("app",{state:()=>({printPreviewPapers:[]}),actions:{navigateToPrint(t,e,p){this.$patch(r=>{r.printPreviewPapers=p,t.push({path:"/print",query:{fileName:e}})})}}});export{s as u};
