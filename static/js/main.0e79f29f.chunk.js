(this["webpackJsonpawesome-mapper"]=this["webpackJsonpawesome-mapper"]||[]).push([[0],{11:function(e,t,a){e.exports=a(25)},16:function(e,t,a){},17:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},18:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(2),o=a.n(l),c=(a(16),a(17),a(18),a(7)),i=a(1),m=a(10),u=Object(m.a)({},{INCREASE_COUNT:"INCREASE_COUNT",DECREASE_COUNT:"DECREASE_COUNT",CREATE_MAP:"CREATE_MAP"}),s=function(e){var t=Object(i.b)(),a=Object(n.useState)(0),l=Object(c.a)(a,2),o=l[0],m=l[1],s=Object(n.useState)(0),p=Object(c.a)(s,2),E=p[0],f=p[1];return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t({type:u.CREATE_MAP,xSize:o,ySize:E})}},r.a.createElement("label",null,"X n\xba of tiles: "),r.a.createElement("input",{value:o,onChange:function(e){return m(e.target.value)},type:"number",name:"xTiles"}),r.a.createElement("br",null),r.a.createElement("label",null,"Y n\xba of tiles: "),r.a.createElement("input",{value:E,onChange:function(e){return f(e.target.value)},type:"number",name:"yTiles"}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Generate new Map!")))},p=function(e){var t=e.tileType,a=t?"/Awesome-Mapper/images/"+t:"/Awesome-Mapper/images/empty.png";return r.a.createElement("td",null,r.a.createElement("img",{src:a}))},E=function(e,t){return r.a.createElement("tr",{key:t},e.map((function(e){return r.a.createElement(p,{tileType:e})})))},f=function(e){var t=Object(i.c)((function(e){return e.awesomeMap}));return console.log("Here are the Tiles"),console.table(t),console.log("Hemos venio a bailar"),console.table(t),console.log(t),r.a.createElement("div",null,r.a.createElement("div",{className:"awesome-map"},t.map(E)))},b=["grass.png","water.png"];var v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(f,null),r.a.createElement("div",{className:"btn-group","aria-label":"Tiles"},b.map((function(e,t){var a="/Awesome-Mapper/images/"+e;return r.a.createElement("a",{onClick:function(){return function(e){alert(e)}(e)}},r.a.createElement("img",{src:a}))}))),r.a.createElement(s,null),r.a.createElement("p",null,"Welcome to Awesome Mapper!"),"This project is being developed by",r.a.createElement("a",{className:"App-link",href:"https://abujalance.com",target:"_blank",rel:"noopener noreferrer"},"Abujalance")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=a(3),d={awesomeMap:[["","",""],["","",""],["","",""]]};var h=function(e,t){for(var a=new Array(t),n=0;n<t;n++){for(var r=[],l=0;l<e;l++)r.push("");a[n]=r}return a},w=Object(g.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.CREATE_MAP:var a=t.xSize,n=t.ySize;return{awesomeMap:h(a,n)};default:return e}}));o.a.render(r.a.createElement(i.a,{store:w},r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.0e79f29f.chunk.js.map