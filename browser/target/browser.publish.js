!function e(n,t,r){function s(i,a){if(!t[i]){if(!n[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(o)return o(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=t[i]={exports:{}};n[i][0].call(u.exports,function(e){var t=n[i][1][e];return s(t?t:e)},u,u.exports,e,n,t,r)}return t[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)s(r[i]);return s}({1:[function(e,n,t){function r(e){return u=e.split("\n")[0],c(e,!1,"../../",!1)}function s(e){var n=document.getElementById("presentation").contentWindow.document,t=r(e);t&&(n.open(),n.write(r(e)),n.close())}function o(e,n,t){for(var r=[],s=0;s<e.length;++s)n(e[s],function(n){r.push(n),r.length==e.length&&t(r)})}function i(e,n){var t=new XMLHttpRequest;t.onreadystatechange=function(){4==t.readyState&&n(t.responseText)},console.log(e),t.open("GET",e.href||e.src,!0),t.send()}function a(e){var n=document.createElement("a");n.href=e,n.download=u.trim().toLowerCase().replace(/ /g,"_")+".html",window.chrome?n.click():(n.innerHTML="Download",document.querySelector("div.render > div.toolbar").appendChild(n))}function l(){function e(){for(var e=0;e<t.length;++e)t[e].parentNode.removeChild(t[e]);for(var e=0;e<r.length;++e)r[e].parentNode.removeChild(r[e]);s.forEach(function(e){var t=document.createElement("style");t.innerHTML=e,n.head.appendChild(t)}),l.forEach(function(e){var t=document.createElement("script");t.innerHTML=e,n.head.appendChild(t)});var o=n.documentElement.outerHTML||n.documentElement.innerHTML;null!==window.exportedFile&&window.URL.revokeObjectURL(window.exportedFile),window.exportedFile=window.URL.createObjectURL(new Blob([o],{type:"text/html"})),a(window.exportedFile)}var n=document.getElementById("presentation").contentWindow.document,t=n.getElementsByTagName("link"),r=n.getElementsByTagName("script"),s=[],l=[];o(t,i,function(n){s=n,l.length&&e()}),o(r,i,function(n){l=n,s.length&&e()})}var c=e("../publish_core.js"),u="Untitled Presentation";n.exports.save=l,n.exports.render_presentation=s,n.exports.publish_presentation=r},{"../publish_core.js":3}],2:[function(e,n,t){!function(){function e(e,n,t){return this.name=e,this.symbols=n,this.postprocess=t,this}function t(e,n,t){this.rule=e,this.expect=n,this.reference=t,this.data=[]}function r(n,r){var s=this.table=[];this.rules=n.map(function(n){return new e(n.name,n.symbols,n.postprocess)}),this.start=r=r||this.rules[0].name;var o=[];this.table.push([]),this.rules.forEach(function(e){e.name===r&&(o.push(e),s[0].push(new t(e,0,0)))}),this.advanceTo(0,o),this.current=0}e.prototype.toString=function(e){function n(e){return e.literal?JSON.stringify(e.literal):e.toString()}var t="undefined"==typeof e?this.symbols.map(n).join(" "):this.symbols.slice(0,e).map(n).join(" ")+" ● "+this.symbols.slice(e).map(n).join(" ");return this.name+" → "+t},t.prototype.toString=function(){return"{"+this.rule.toString(this.expect)+"}, from: "+(this.reference||0)},t.prototype.nextState=function(e){var n=new t(this.rule,this.expect+1,this.reference);return n.data=this.data.slice(0),n.data.push(e),n},t.prototype.consumeTerminal=function(e){var n=!1;return this.rule.symbols[this.expect]&&(this.rule.symbols[this.expect].test?this.rule.symbols[this.expect].test(e)&&(n=this.nextState(e)):this.rule.symbols[this.expect].literal===e&&(n=this.nextState(e))),n},t.prototype.consumeNonTerminal=function(e){return this.rule.symbols[this.expect]===e?this.nextState(e):!1},t.prototype.process=function(e,n,s,o){if(this.expect===this.rule.symbols.length){if(this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,r.fail)),this.data!==r.fail)for(var i,a,l=0;l<n[this.reference].length;)i=n[this.reference][l],a=i.consumeNonTerminal(this.rule.name),a&&(a.data[a.data.length-1]=this.data,n[e].push(a)),l++}else{for(var c=n[e].indexOf(this),u=0;c>u;u++){var p=n[e][u];if(p.rule.symbols.length===p.expect&&p.reference===e){var a=this.consumeNonTerminal(p.rule.name);a&&(a.data[a.data.length-1]=p.data,n[e].push(a))}}var f=this.rule.symbols[this.expect],m=this;s.forEach(function(r){if(r.name===f&&-1===o.indexOf(r))if(r.symbols.length>0)o.push(r),n[e].push(new t(r,0,e));else{var s=m.consumeNonTerminal(r.name);r.postprocess?s.data[s.data.length-1]=r.postprocess([],this.reference):s.data[s.data.length-1]=[],n[e].push(s)}})}},r.fail={},r.prototype.advanceTo=function(e,n){for(var t=0;t<this.table[e].length;)this.table[e][t].process(e,this.table,this.rules,n),t++},r.prototype.feed=function(e){for(var n=0;n<e.length;n++){this.table.push([]);for(var t=0;t<this.table[this.current+n].length;t++){var r=this.table[this.current+n][t],s=r.consumeTerminal(e[n]);s&&this.table[this.current+n+1].push(s)}var o=[];if(this.advanceTo(this.current+n+1,o),0===this.table[this.table.length-1].length){var i=new Error("nearley: No possible parsings (@"+(this.current+n)+": '"+e[n]+"').");throw i.offset=this.current+n,i}}return this.current+=n,this.results=this.finish(),this},r.prototype.finish=function(){var e=[],n=this;return this.table[this.table.length-1].forEach(function(t){t.rule.name===n.start&&t.expect===t.rule.symbols.length&&0===t.reference&&t.data!==r.fail&&e.push(t)}),e.map(function(e){return e.data})};var s={Parser:r,Rule:e};"undefined"!=typeof n&&"undefined"!=typeof n.exports?n.exports=s:window.nearley=s}()},{}],3:[function(e,n,t){(function(t,r){function s(n,s,l,c){var u=new i.Parser(o.ParserRules,o.ParserStart);l||(l="");var p=l+"common/common.css",f=l+"themes/modern.dark.css",m=l+"common/scripts.js";s&&(fs=e("fs")),u.current=0,u.feed(n);var h=u.results[0],b="";if(!h)return void 0;var d=h[0][0],y=!1;h[0][2]&&h[0][2].forEach(function(e){var n=e[0],t=e[1];n.indexOf("transition")>-1?n.indexOf("bullet")>-1&&(y=t):"theme"==n&&(f=l+"themes/"+t.toLowerCase().trim().split(" ").join(".")+".css")}),h[1].forEach(function(e,n){slideClass="slide",y&&(slideClass+=" transbullets"),b+='<div class="'+slideClass+'" id="slide'+n+'">'+e+"</div>"});var g=b;if(b="<!DOCTYPE html><html><head><title>"+d+"</title>",c&&s){var v="";try{v=fs.readFileSync("./"+f).toString().split("\n")}catch(e){try{v=fs.readFileSync(a.join(r,f)).toString().split("\n")}catch(e){console.error("Theme "+f+" not found. Please check your spelling. If you are designing a theme, please check your path. Else, file an issue on the tracker"),t.exit(0)}}var $=[],w=[];v.forEach(function(e){"@import"==e.slice(0,"@import".length)?w.push(e):$.push(e)}),b+="<style>"+w.join("\n")+fs.readFileSync(a.join(r,p))+"\n\n"+$.join("\n")+"</style><script>"+fs.readFileSync(a.join(r,m))+"</script>"}else b+='<link rel="stylesheet" href="'+p+'" type="text/css"><link rel="stylesheet" href="'+f+'" type="text/css"><script src="'+m+'" type="text/javascript"></script>';return b+="</head><body>"+g+"</body></html>"}var o=e("./uPresent_ne.js"),i=e("nearley"),a=e("path");n.exports=s}).call(this,e("_process"),"/..")},{"./uPresent_ne.js":4,_process:7,fs:5,nearley:2,path:6}],4:[function(e,n,t){!function(){function e(e){return e[0]}var t={ParserRules:[{name:"main",symbols:["config","_","presentation"],postprocess:function(e){return[e[0],e[2]]}},{name:"config",symbols:["pphrase"]},{name:"config",symbols:["pphrase","_"," ebnf$1",/[\s]/]},{name:"configOption",symbols:[{literal:"+"},"pphrase",{literal:"\n"}],postprocess:function(e){return[e[1],!0]}},{name:"configOption",symbols:[{literal:"-"},"pphrase",{literal:"\n"}],postprocess:function(e){return[e[1],!1]}},{name:" string$2",symbols:[{literal:":"},{literal:" "}],postprocess:function(e){return e.join("")}},{name:"configOption",symbols:["pphrase"," string$2","pphrase",{literal:"\n"}],postprocess:function(e){return[e[0],e[2]]}},{name:"presentation",symbols:[" ebnf$3"],postprocess:function(e){return[].concat.apply([],e)}},{name:"slide",symbols:[" ebnf$4",{literal:"\n"},"content"],postprocess:function(e){return e[2]}},{name:"content",symbols:[" ebnf$5"],postprocess:function(e){return e[0].join("")}},{name:"line",symbols:["marker",{literal:"\n"}],postprocess:function(e){return e[0]}},{name:"line",symbols:["lphrase",{literal:"\n"}],postprocess:function(e){return"<p>"+e[0]+"</p>"}},{name:"line",symbols:[" ebnf$6",{literal:"\n"}],postprocess:function(e){return"<ul>"+e[0].join("")+"</ul>"}},{name:"line",symbols:[{literal:"\n"}],postprocess:function(e){return""}},{name:"italics",symbols:[{literal:"_"},"lphrase",{literal:"_"}],postprocess:function(e){return"<em>"+e[1]+"</em>"}},{name:" string$7",symbols:[{literal:"*"},{literal:"*"}],postprocess:function(e){return e.join("")}},{name:" string$8",symbols:[{literal:"*"},{literal:"*"}],postprocess:function(e){return e.join("")}},{name:"bold",symbols:[" string$7","lphrase"," string$8"],postprocess:function(e){return"<strong>"+e[1]+"</strong>"}},{name:" string$9",symbols:[{literal:"!"},{literal:"["}],postprocess:function(e){return e.join("")}},{name:" string$10",symbols:[{literal:"]"},{literal:"("}],postprocess:function(e){return e.join("")}},{name:"image",symbols:[" string$9","pphrase"," string$10","path",{literal:")"}],postprocess:function(e){return'<img alt="'+e[1]+'" src="'+e[3]+'" />'}},{name:" string$11",symbols:[{literal:"h"},{literal:"t"},{literal:"t"},{literal:"p"}],postprocess:function(e){return e.join("")}},{name:"linkprotocol",symbols:[" string$11"]},{name:" string$12",symbols:[{literal:"h"},{literal:"t"},{literal:"t"},{literal:"p"},{literal:"s"}],postprocess:function(e){return e.join("")}},{name:"linkprotocol",symbols:[" string$12"]},{name:"domain",symbols:[" ebnf$13"],postprocess:function(e){return e[0].join("")}},{name:" string$14",symbols:[{literal:":"},{literal:"/"},{literal:"/"}],postprocess:function(e){return e.join("")}},{name:"rawlink",symbols:["linkprotocol"," string$14","domain",{literal:"/"}," ebnf$15"],postprocess:function(e){return"<a href='"+e[0]+e[1]+e[2]+e[3]+e[4].join("")+"'>"+e[0]+e[1]+e[2]+e[3]+e[4].join("")+"</a>"}},{name:" string$16",symbols:[{literal:"]"},{literal:"("}],postprocess:function(e){return e.join("")}},{name:"namelink",symbols:[{literal:"["},"pphrase"," string$16","path",{literal:")"}],postprocess:function(e){return'<a href="'+e[3]+'">'+e[1]+"</a>"}},{name:"ln",symbols:["nophrase"," ebnf$17"],postprocess:function(e,n,t){return e[1]=e[1].join(""),e[1].indexOf("http://")>-1||e[1].indexOf("https://")>-1?t:e[0]+e[1]}},{name:"lphrase",symbols:["ln"],postprocess:e},{name:"lphrase",symbols:["nphrase"],postprocess:e},{name:"nophrase",symbols:["nphrase"],postprocess:e},{name:"nophrase",symbols:["_"],postprocess:function(){return""}},{name:"nphrase",symbols:["lphrase",/[#]/],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase","italics"],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase","bold"],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase","image"],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase",/[\-]/],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase",/[!]/,/[^\[]/],postprocess:function(e){return e[0]+e[1]+e[2]}},{name:"nphrase",symbols:["bphrase","rawlink",/[\s]/],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["bphrase","namelink"],postprocess:function(e){return e[0]+e[1]}},{name:"nphrase",symbols:["lphrase",{literal:"["}],postprocess:function(e){return e[0]+e[1]}},{name:"bphrase",symbols:["lphrase"],postprocess:e},{name:"bphrase",symbols:["_"],postprocess:function(){return""}},{name:"pphrase",symbols:[" ebnf$18"],postprocess:function(e){return e[0].join("")}},{name:"linecharacter",symbols:[/[A-Za-z0-9 @$%^&()+=.,<>/?'";:\|\]\{\}\(\)]/]},{name:" string$19",symbols:[{literal:"#"},{literal:" "}],postprocess:function(e){return e.join("")}},{name:"marker",symbols:[" string$19","lphrase",{literal:"\n"}],postprocess:function(e){return"<h1>"+e[1]+"</h1>"}},{name:"marker",symbols:["image","bphrase"],postprocess:function(e){return"<p>"+e[0]+e[1]+"</p>"}},{name:" string$20",symbols:[{literal:"["},{literal:"l"},{literal:"i"},{literal:"n"},{literal:"e"},{literal:"b"},{literal:"r"},{literal:"e"},{literal:"a"},{literal:"k"},{literal:"]"},{literal:"\n"}],postprocess:function(e){return e.join("")}},{name:"marker",symbols:[" string$20"],postprocess:function(e){return"<br/>"}},{name:" string$21",symbols:[{literal:"]"},{literal:" "}],postprocess:function(e){return e.join("")}},{name:"marker",symbols:[{literal:"["},"pphrase"," string$21","lphrase",{literal:"\n"}],postprocess:function(e){return"<div class='"+e[1]+"'>"+e[3]+"</div>"}},{name:"path",symbols:[" ebnf$22"],postprocess:function(e){return e[0].join("")}},{name:" string$23",symbols:[{literal:"~"},{literal:" "}],postprocess:function(e){return e.join("")}},{name:"listnode",symbols:[" string$23","lphrase",{literal:"\n"}],postprocess:function(e){return"<li>"+e[1]+"</li>"}},{name:" string$24",symbols:[{literal:"~"},{literal:"~"},{literal:" "}],postprocess:function(e){return e.join("")}},{name:"listnode",symbols:["_"," string$24","lphrase",{literal:"\n"}],postprocess:function(e){return"<li class='alt'>"+e[2]+"</li>"}},{name:"_",symbols:[],postprocess:function(){return null}},{name:"_",symbols:[/[\s]/,"_"],postprocess:function(){return null}},{name:" ebnf$1",symbols:["configOption"]},{name:" ebnf$1",symbols:["configOption"," ebnf$1"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$3",symbols:["slide"]},{name:" ebnf$3",symbols:["slide"," ebnf$3"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$4",symbols:[{literal:"-"}]},{name:" ebnf$4",symbols:[{literal:"-"}," ebnf$4"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$5",symbols:["line"]},{name:" ebnf$5",symbols:["line"," ebnf$5"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$6",symbols:["listnode"]},{name:" ebnf$6",symbols:["listnode"," ebnf$6"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$13",symbols:[/[A-Za-z\.]/]},{name:" ebnf$13",symbols:[/[A-Za-z\.]/," ebnf$13"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$15",symbols:[]},{name:" ebnf$15",symbols:[/[^ \n\t]/," ebnf$15"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$17",symbols:["linecharacter"]},{name:" ebnf$17",symbols:["linecharacter"," ebnf$17"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$18",symbols:[/[ A-Za-z0-9!@#$%^&*()_+\-\=}{\[\]"':;?/>.<,i]/]},{name:" ebnf$18",symbols:[/[ A-Za-z0-9!@#$%^&*()_+\-\=}{\[\]"':;?/>.<,i]/," ebnf$18"],postprocess:function(e){return[e[0]].concat(e[1])}},{name:" ebnf$22",symbols:[/[A-Za-z0-9:\/!@#$%^&*()_+=\-\'\.\(\)]/]},{name:" ebnf$22",symbols:[/[A-Za-z0-9:\/!@#$%^&*()_+=\-\'\.\(\)]/," ebnf$22"],postprocess:function(e){return[e[0]].concat(e[1])}}],ParserStart:"main"};"undefined"!=typeof n&&"undefined"!=typeof n.exports?n.exports=t:window.grammar=t}()},{}],5:[function(e,n,t){},{}],6:[function(e,n,t){(function(e){function n(e,n){for(var t=0,r=e.length-1;r>=0;r--){var s=e[r];"."===s?e.splice(r,1):".."===s?(e.splice(r,1),t++):t&&(e.splice(r,1),t--)}if(n)for(;t--;t)e.unshift("..");return e}function r(e,n){if(e.filter)return e.filter(n);for(var t=[],r=0;r<e.length;r++)n(e[r],r,e)&&t.push(e[r]);return t}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(e){return s.exec(e).slice(1)};t.resolve=function(){for(var t="",s=!1,o=arguments.length-1;o>=-1&&!s;o--){var i=o>=0?arguments[o]:e.cwd();if("string"!=typeof i)throw new TypeError("Arguments to path.resolve must be strings");i&&(t=i+"/"+t,s="/"===i.charAt(0))}return t=n(r(t.split("/"),function(e){return!!e}),!s).join("/"),(s?"/":"")+t||"."},t.normalize=function(e){var s=t.isAbsolute(e),o="/"===i(e,-1);return e=n(r(e.split("/"),function(e){return!!e}),!s).join("/"),e||s||(e="."),e&&o&&(e+="/"),(s?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(r(e,function(e,n){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,n){function r(e){for(var n=0;n<e.length&&""===e[n];n++);for(var t=e.length-1;t>=0&&""===e[t];t--);return n>t?[]:e.slice(n,t-n+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var s=r(e.split("/")),o=r(n.split("/")),i=Math.min(s.length,o.length),a=i,l=0;i>l;l++)if(s[l]!==o[l]){a=l;break}for(var c=[],l=a;l<s.length;l++)c.push("..");return c=c.concat(o.slice(a)),c.join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var n=o(e),t=n[0],r=n[1];return t||r?(r&&(r=r.substr(0,r.length-1)),t+r):"."},t.basename=function(e,n){var t=o(e)[2];return n&&t.substr(-1*n.length)===n&&(t=t.substr(0,t.length-n.length)),t},t.extname=function(e){return o(e)[3]};var i="b"==="ab".substr(-1)?function(e,n,t){return e.substr(n,t)}:function(e,n,t){return 0>n&&(n=e.length+n),e.substr(n,t)}}).call(this,e("_process"))},{_process:7}],7:[function(e,n,t){function r(){u=!1,a.length?c=a.concat(c):p=-1,c.length&&s()}function s(){if(!u){var e=setTimeout(r);u=!0;for(var n=c.length;n;){for(a=c,c=[];++p<n;)a[p].run();p=-1,n=c.length}a=null,u=!1,clearTimeout(e)}}function o(e,n){this.fun=e,this.array=n}function i(){}var a,l=n.exports={},c=[],u=!1,p=-1;l.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];c.push(new o(e,n)),1!==c.length||u||setTimeout(s,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=i,l.addListener=i,l.once=i,l.off=i,l.removeListener=i,l.removeAllListeners=i,l.emit=i,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},{}],8:[function(e,n,t){function r(e){var n=new FileReader;n.onload=function(e){return function(e){a=e.target.result,window.render()}}(e),n.readAsText(e)}function s(e){e.stopPropagation(),e.preventDefault();var n=e.dataTransfer.files[0];r(n)}function o(e){e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"}var i=e("../uPresent.browser.js"),a="";window.render=function(){i.render_presentation(a),document.body.className="render"},window.reset=function(){window.location.reload(!1)},window.save=function(){i.save()},window.addEventListener("load",function(){var e=document.querySelector("div.upload");e.addEventListener("dragover",o,!1),e.addEventListener("drop",s,!1)})},{"../uPresent.browser.js":1}]},{},[8]);