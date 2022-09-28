import{l as mr}from"./logo.04e27001.js";const vr="/img/doctor-svgrepo-com.svg",Er="/img/ambulance-svgrepo-com.svg",br="/img/health-care-hospital-svgrepo-com.svg",yr="/img/health-care-svgrepo-com-face.svg",Rr="/img/health-care-svgrepo-com.svg",Cr="/img/health-clinic-health-care-svgrepo-com.svg",Ar="/img/health-clinic-syringe-svgrepo-com.svg";function Or(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ke={exports:{}},le={exports:{}},Xe=function(r,t){return function(){for(var n=new Array(arguments.length),i=0;i<n.length;i++)n[i]=arguments[i];return r.apply(t,n)}},wr=Xe,ce=Object.prototype.toString,de=function(e){return function(r){var t=ce.call(r);return e[t]||(e[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function O(e){return e=e.toLowerCase(),function(t){return de(t)===e}}function fe(e){return Array.isArray(e)}function F(e){return typeof e>"u"}function gr(e){return e!==null&&!F(e)&&e.constructor!==null&&!F(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var Ye=O("ArrayBuffer");function Sr(e){var r;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?r=ArrayBuffer.isView(e):r=e&&e.buffer&&Ye(e.buffer),r}function xr(e){return typeof e=="string"}function _r(e){return typeof e=="number"}function Qe(e){return e!==null&&typeof e=="object"}function I(e){if(de(e)!=="object")return!1;var r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}var Pr=O("Date"),Nr=O("File"),Lr=O("Blob"),Tr=O("FileList");function pe(e){return ce.call(e)==="[object Function]"}function Dr(e){return Qe(e)&&pe(e.pipe)}function qr(e){var r="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||ce.call(e)===r||pe(e.toString)&&e.toString()===r)}var Ur=O("URLSearchParams");function $r(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Ir(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function he(e,r){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),fe(e))for(var t=0,a=e.length;t<a;t++)r.call(null,e[t],t,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.call(null,e[n],n,e)}function ue(){var e={};function r(n,i){I(e[i])&&I(n)?e[i]=ue(e[i],n):I(n)?e[i]=ue({},n):fe(n)?e[i]=n.slice():e[i]=n}for(var t=0,a=arguments.length;t<a;t++)he(arguments[t],r);return e}function Br(e,r,t){return he(r,function(n,i){t&&typeof n=="function"?e[i]=wr(n,t):e[i]=n}),e}function Fr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Vr(e,r,t,a){e.prototype=Object.create(r.prototype,a),e.prototype.constructor=e,t&&Object.assign(e.prototype,t)}function jr(e,r,t){var a,n,i,s={};r=r||{};do{for(a=Object.getOwnPropertyNames(e),n=a.length;n-- >0;)i=a[n],s[i]||(r[i]=e[i],s[i]=!0);e=Object.getPrototypeOf(e)}while(e&&(!t||t(e,r))&&e!==Object.prototype);return r}function kr(e,r,t){e=String(e),(t===void 0||t>e.length)&&(t=e.length),t-=r.length;var a=e.indexOf(r,t);return a!==-1&&a===t}function Mr(e){if(!e)return null;var r=e.length;if(F(r))return null;for(var t=new Array(r);r-- >0;)t[r]=e[r];return t}var Hr=function(e){return function(r){return e&&r instanceof e}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array)),v={isArray:fe,isArrayBuffer:Ye,isBuffer:gr,isFormData:qr,isArrayBufferView:Sr,isString:xr,isNumber:_r,isObject:Qe,isPlainObject:I,isUndefined:F,isDate:Pr,isFile:Nr,isBlob:Lr,isFunction:pe,isStream:Dr,isURLSearchParams:Ur,isStandardBrowserEnv:Ir,forEach:he,merge:ue,extend:Br,trim:$r,stripBOM:Fr,inherits:Vr,toFlatObject:jr,kindOf:de,kindOfTest:O,endsWith:kr,toArray:Mr,isTypedArray:Hr,isFileList:Tr},x=v;function Re(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Ge=function(r,t,a){if(!t)return r;var n;if(a)n=a(t);else if(x.isURLSearchParams(t))n=t.toString();else{var i=[];x.forEach(t,function(l,f){l===null||typeof l>"u"||(x.isArray(l)?f=f+"[]":l=[l],x.forEach(l,function(p){x.isDate(p)?p=p.toISOString():x.isObject(p)&&(p=JSON.stringify(p)),i.push(Re(f)+"="+Re(p))}))}),n=i.join("&")}if(n){var s=r.indexOf("#");s!==-1&&(r=r.slice(0,s)),r+=(r.indexOf("?")===-1?"?":"&")+n}return r},Jr=v;function V(){this.handlers=[]}V.prototype.use=function(r,t,a){return this.handlers.push({fulfilled:r,rejected:t,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};V.prototype.eject=function(r){this.handlers[r]&&(this.handlers[r]=null)};V.prototype.forEach=function(r){Jr.forEach(this.handlers,function(a){a!==null&&r(a)})};var Wr=V,zr=v,Kr=function(r,t){zr.forEach(r,function(n,i){i!==t&&i.toUpperCase()===t.toUpperCase()&&(r[t]=n,delete r[i])})},Ze=v;function P(e,r,t,a,n){Error.call(this),this.message=e,this.name="AxiosError",r&&(this.code=r),t&&(this.config=t),a&&(this.request=a),n&&(this.response=n)}Ze.inherits(P,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var er=P.prototype,rr={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(e){rr[e]={value:e}});Object.defineProperties(P,rr);Object.defineProperty(er,"isAxiosError",{value:!0});P.from=function(e,r,t,a,n,i){var s=Object.create(er);return Ze.toFlatObject(e,s,function(l){return l!==Error.prototype}),P.call(s,e.message,r,t,a,n),s.name=e.name,i&&Object.assign(s,i),s};var L=P,tr={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},R=v;function Xr(e,r){r=r||new FormData;var t=[];function a(i){return i===null?"":R.isDate(i)?i.toISOString():R.isArrayBuffer(i)||R.isTypedArray(i)?typeof Blob=="function"?new Blob([i]):Buffer.from(i):i}function n(i,s){if(R.isPlainObject(i)||R.isArray(i)){if(t.indexOf(i)!==-1)throw Error("Circular reference detected in "+s);t.push(i),R.forEach(i,function(l,f){if(!R.isUndefined(l)){var d=s?s+"."+f:f,p;if(l&&!s&&typeof l=="object"){if(R.endsWith(f,"{}"))l=JSON.stringify(l);else if(R.endsWith(f,"[]")&&(p=R.toArray(l))){p.forEach(function(o){!R.isUndefined(o)&&r.append(d,a(o))});return}}n(l,d)}}),t.pop()}else r.append(s,a(i))}return n(e),r}var nr=Xr,z,Ce;function Yr(){if(Ce)return z;Ce=1;var e=L;return z=function(t,a,n){var i=n.config.validateStatus;!n.status||!i||i(n.status)?t(n):a(new e("Request failed with status code "+n.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},z}var K,Ae;function Qr(){if(Ae)return K;Ae=1;var e=v;return K=e.isStandardBrowserEnv()?function(){return{write:function(a,n,i,s,u,l){var f=[];f.push(a+"="+encodeURIComponent(n)),e.isNumber(i)&&f.push("expires="+new Date(i).toGMTString()),e.isString(s)&&f.push("path="+s),e.isString(u)&&f.push("domain="+u),l===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(a){var n=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),K}var Gr=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)},Zr=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r},et=Gr,rt=Zr,ar=function(r,t){return r&&!et(t)?rt(r,t):t},X,Oe;function tt(){if(Oe)return X;Oe=1;var e=v,r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return X=function(a){var n={},i,s,u;return a&&e.forEach(a.split(`
`),function(f){if(u=f.indexOf(":"),i=e.trim(f.substr(0,u)).toLowerCase(),s=e.trim(f.substr(u+1)),i){if(n[i]&&r.indexOf(i)>=0)return;i==="set-cookie"?n[i]=(n[i]?n[i]:[]).concat([s]):n[i]=n[i]?n[i]+", "+s:s}}),n},X}var Y,we;function nt(){if(we)return Y;we=1;var e=v;return Y=e.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),a=document.createElement("a"),n;function i(s){var u=s;return t&&(a.setAttribute("href",u),u=a.href),a.setAttribute("href",u),{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",host:a.host,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):"",hostname:a.hostname,port:a.port,pathname:a.pathname.charAt(0)==="/"?a.pathname:"/"+a.pathname}}return n=i(window.location.href),function(u){var l=e.isString(u)?i(u):u;return l.protocol===n.protocol&&l.host===n.host}}():function(){return function(){return!0}}(),Y}var Q,ge;function j(){if(ge)return Q;ge=1;var e=L,r=v;function t(a){e.call(this,a==null?"canceled":a,e.ERR_CANCELED),this.name="CanceledError"}return r.inherits(t,e,{__CANCEL__:!0}),Q=t,Q}var G,Se;function at(){return Se||(Se=1,G=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}),G}var Z,xe;function _e(){if(xe)return Z;xe=1;var e=v,r=Yr(),t=Qr(),a=Ge,n=ar,i=tt(),s=nt(),u=tr,l=L,f=j(),d=at();return Z=function(o){return new Promise(function(dr,w){var T=o.data,D=o.headers,q=o.responseType,g;function Ee(){o.cancelToken&&o.cancelToken.unsubscribe(g),o.signal&&o.signal.removeEventListener("abort",g)}e.isFormData(T)&&e.isStandardBrowserEnv()&&delete D["Content-Type"];var c=new XMLHttpRequest;if(o.auth){var fr=o.auth.username||"",pr=o.auth.password?unescape(encodeURIComponent(o.auth.password)):"";D.Authorization="Basic "+btoa(fr+":"+pr)}var H=n(o.baseURL,o.url);c.open(o.method.toUpperCase(),a(H,o.params,o.paramsSerializer),!0),c.timeout=o.timeout;function be(){if(!!c){var y="getAllResponseHeaders"in c?i(c.getAllResponseHeaders()):null,S=!q||q==="text"||q==="json"?c.responseText:c.response,A={data:S,status:c.status,statusText:c.statusText,headers:y,config:o,request:c};r(function(W){dr(W),Ee()},function(W){w(W),Ee()},A),c=null}}if("onloadend"in c?c.onloadend=be:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(be)},c.onabort=function(){!c||(w(new l("Request aborted",l.ECONNABORTED,o,c)),c=null)},c.onerror=function(){w(new l("Network Error",l.ERR_NETWORK,o,c,c)),c=null},c.ontimeout=function(){var S=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded",A=o.transitional||u;o.timeoutErrorMessage&&(S=o.timeoutErrorMessage),w(new l(S,A.clarifyTimeoutError?l.ETIMEDOUT:l.ECONNABORTED,o,c)),c=null},e.isStandardBrowserEnv()){var ye=(o.withCredentials||s(H))&&o.xsrfCookieName?t.read(o.xsrfCookieName):void 0;ye&&(D[o.xsrfHeaderName]=ye)}"setRequestHeader"in c&&e.forEach(D,function(S,A){typeof T>"u"&&A.toLowerCase()==="content-type"?delete D[A]:c.setRequestHeader(A,S)}),e.isUndefined(o.withCredentials)||(c.withCredentials=!!o.withCredentials),q&&q!=="json"&&(c.responseType=o.responseType),typeof o.onDownloadProgress=="function"&&c.addEventListener("progress",o.onDownloadProgress),typeof o.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",o.onUploadProgress),(o.cancelToken||o.signal)&&(g=function(y){!c||(w(!y||y&&y.type?new f:y),c.abort(),c=null)},o.cancelToken&&o.cancelToken.subscribe(g),o.signal&&(o.signal.aborted?g():o.signal.addEventListener("abort",g))),T||(T=null);var J=d(H);if(J&&["http","https","file"].indexOf(J)===-1){w(new l("Unsupported protocol "+J+":",l.ERR_BAD_REQUEST,o));return}c.send(T)})},Z}var ee,Pe;function it(){return Pe||(Pe=1,ee=null),ee}var m=v,Ne=Kr,Le=L,st=tr,ot=nr,ut={"Content-Type":"application/x-www-form-urlencoded"};function Te(e,r){!m.isUndefined(e)&&m.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function lt(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=_e()),e}function ct(e,r,t){if(m.isString(e))try{return(r||JSON.parse)(e),m.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(t||JSON.stringify)(e)}var k={transitional:st,adapter:lt(),transformRequest:[function(r,t){if(Ne(t,"Accept"),Ne(t,"Content-Type"),m.isFormData(r)||m.isArrayBuffer(r)||m.isBuffer(r)||m.isStream(r)||m.isFile(r)||m.isBlob(r))return r;if(m.isArrayBufferView(r))return r.buffer;if(m.isURLSearchParams(r))return Te(t,"application/x-www-form-urlencoded;charset=utf-8"),r.toString();var a=m.isObject(r),n=t&&t["Content-Type"],i;if((i=m.isFileList(r))||a&&n==="multipart/form-data"){var s=this.env&&this.env.FormData;return ot(i?{"files[]":r}:r,s&&new s)}else if(a||n==="application/json")return Te(t,"application/json"),ct(r);return r}],transformResponse:[function(r){var t=this.transitional||k.transitional,a=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,i=!a&&this.responseType==="json";if(i||n&&m.isString(r)&&r.length)try{return JSON.parse(r)}catch(s){if(i)throw s.name==="SyntaxError"?Le.from(s,Le.ERR_BAD_RESPONSE,this,null,this.response):s}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:it()},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};m.forEach(["delete","get","head"],function(r){k.headers[r]={}});m.forEach(["post","put","patch"],function(r){k.headers[r]=m.merge(ut)});var me=k,dt=v,ft=me,pt=function(r,t,a){var n=this||ft;return dt.forEach(a,function(s){r=s.call(n,r,t)}),r},re,De;function ir(){return De||(De=1,re=function(r){return!!(r&&r.__CANCEL__)}),re}var qe=v,te=pt,ht=ir(),mt=me,vt=j();function ne(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new vt}var Et=function(r){ne(r),r.headers=r.headers||{},r.data=te.call(r,r.data,r.headers,r.transformRequest),r.headers=qe.merge(r.headers.common||{},r.headers[r.method]||{},r.headers),qe.forEach(["delete","get","head","post","put","patch","common"],function(n){delete r.headers[n]});var t=r.adapter||mt.adapter;return t(r).then(function(n){return ne(r),n.data=te.call(r,n.data,n.headers,r.transformResponse),n},function(n){return ht(n)||(ne(r),n&&n.response&&(n.response.data=te.call(r,n.response.data,n.response.headers,r.transformResponse))),Promise.reject(n)})},b=v,sr=function(r,t){t=t||{};var a={};function n(d,p){return b.isPlainObject(d)&&b.isPlainObject(p)?b.merge(d,p):b.isPlainObject(p)?b.merge({},p):b.isArray(p)?p.slice():p}function i(d){if(b.isUndefined(t[d])){if(!b.isUndefined(r[d]))return n(void 0,r[d])}else return n(r[d],t[d])}function s(d){if(!b.isUndefined(t[d]))return n(void 0,t[d])}function u(d){if(b.isUndefined(t[d])){if(!b.isUndefined(r[d]))return n(void 0,r[d])}else return n(void 0,t[d])}function l(d){if(d in t)return n(r[d],t[d]);if(d in r)return n(void 0,r[d])}var f={url:s,method:s,data:s,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,beforeRedirect:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:l};return b.forEach(Object.keys(r).concat(Object.keys(t)),function(p){var o=f[p]||i,h=o(p);b.isUndefined(h)&&o!==l||(a[p]=h)}),a},ae,Ue;function or(){return Ue||(Ue=1,ae={version:"0.27.2"}),ae}var bt=or().version,C=L,ve={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){ve[e]=function(a){return typeof a===e||"a"+(r<1?"n ":" ")+e}});var $e={};ve.transitional=function(r,t,a){function n(i,s){return"[Axios v"+bt+"] Transitional option '"+i+"'"+s+(a?". "+a:"")}return function(i,s,u){if(r===!1)throw new C(n(s," has been removed"+(t?" in "+t:"")),C.ERR_DEPRECATED);return t&&!$e[s]&&($e[s]=!0,console.warn(n(s," has been deprecated since v"+t+" and will be removed in the near future"))),r?r(i,s,u):!0}};function yt(e,r,t){if(typeof e!="object")throw new C("options must be an object",C.ERR_BAD_OPTION_VALUE);for(var a=Object.keys(e),n=a.length;n-- >0;){var i=a[n],s=r[i];if(s){var u=e[i],l=u===void 0||s(u,i,e);if(l!==!0)throw new C("option "+i+" must be "+l,C.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new C("Unknown option "+i,C.ERR_BAD_OPTION)}}var Rt={assertOptions:yt,validators:ve},ur=v,Ct=Ge,Ie=Wr,Be=Et,M=sr,At=ar,lr=Rt,_=lr.validators;function N(e){this.defaults=e,this.interceptors={request:new Ie,response:new Ie}}N.prototype.request=function(r,t){typeof r=="string"?(t=t||{},t.url=r):t=r||{},t=M(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var a=t.transitional;a!==void 0&&lr.assertOptions(a,{silentJSONParsing:_.transitional(_.boolean),forcedJSONParsing:_.transitional(_.boolean),clarifyTimeoutError:_.transitional(_.boolean)},!1);var n=[],i=!0;this.interceptors.request.forEach(function(h){typeof h.runWhen=="function"&&h.runWhen(t)===!1||(i=i&&h.synchronous,n.unshift(h.fulfilled,h.rejected))});var s=[];this.interceptors.response.forEach(function(h){s.push(h.fulfilled,h.rejected)});var u;if(!i){var l=[Be,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(s),u=Promise.resolve(t);l.length;)u=u.then(l.shift(),l.shift());return u}for(var f=t;n.length;){var d=n.shift(),p=n.shift();try{f=d(f)}catch(o){p(o);break}}try{u=Be(f)}catch(o){return Promise.reject(o)}for(;s.length;)u=u.then(s.shift(),s.shift());return u};N.prototype.getUri=function(r){r=M(this.defaults,r);var t=At(r.baseURL,r.url);return Ct(t,r.params,r.paramsSerializer)};ur.forEach(["delete","get","head","options"],function(r){N.prototype[r]=function(t,a){return this.request(M(a||{},{method:r,url:t,data:(a||{}).data}))}});ur.forEach(["post","put","patch"],function(r){function t(a){return function(i,s,u){return this.request(M(u||{},{method:r,headers:a?{"Content-Type":"multipart/form-data"}:{},url:i,data:s}))}}N.prototype[r]=t(),N.prototype[r+"Form"]=t(!0)});var Ot=N,ie,Fe;function wt(){if(Fe)return ie;Fe=1;var e=j();function r(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var a;this.promise=new Promise(function(s){a=s});var n=this;this.promise.then(function(i){if(!!n._listeners){var s,u=n._listeners.length;for(s=0;s<u;s++)n._listeners[s](i);n._listeners=null}}),this.promise.then=function(i){var s,u=new Promise(function(l){n.subscribe(l),s=l}).then(i);return u.cancel=function(){n.unsubscribe(s)},u},t(function(s){n.reason||(n.reason=new e(s),a(n.reason))})}return r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(a){if(this.reason){a(this.reason);return}this._listeners?this._listeners.push(a):this._listeners=[a]},r.prototype.unsubscribe=function(a){if(!!this._listeners){var n=this._listeners.indexOf(a);n!==-1&&this._listeners.splice(n,1)}},r.source=function(){var a,n=new r(function(s){a=s});return{token:n,cancel:a}},ie=r,ie}var se,Ve;function gt(){return Ve||(Ve=1,se=function(r){return function(a){return r.apply(null,a)}}),se}var oe,je;function St(){if(je)return oe;je=1;var e=v;return oe=function(t){return e.isObject(t)&&t.isAxiosError===!0},oe}var ke=v,xt=Xe,B=Ot,_t=sr,Pt=me;function cr(e){var r=new B(e),t=xt(B.prototype.request,r);return ke.extend(t,B.prototype,r),ke.extend(t,r),t.create=function(n){return cr(_t(e,n))},t}var E=cr(Pt);E.Axios=B;E.CanceledError=j();E.CancelToken=wt();E.isCancel=ir();E.VERSION=or().version;E.toFormData=nr;E.AxiosError=L;E.Cancel=E.CanceledError;E.all=function(r){return Promise.all(r)};E.spread=gt();E.isAxiosError=St();le.exports=E;le.exports.default=E;(function(e){e.exports=le.exports})(Ke);const Nt=Or(Ke.exports),Me={Submit:{Id:new Date().getTime(),Inputs:[],Policy:"CLINICAL_BANK_PRONTO",ResultingVariable:"FLX_PRINCIPAL",Version:"V2.0"},Authentication:{Login:"297",Password:"43134e46f51d8005812beb8bfd746a28",Properties:[{Key:"FILIAL_ID",Value:"0"}]},Properties:[{Key:"USUARIO",Value:"CLINICAL_BANK_API"}]};function He(e){return e.toString().padStart(2,"0")}function Lt(e){return[He(e.getUTCDate()),He(e.getUTCMonth()+1),e.getUTCFullYear()].join("/")}function Tt(e){e.setAttribute("maxlength","14"),e.addEventListener("input",r=>{let t=e.value;if(isNaN(t[t.length-1])){e.value=t.substring(0,t.length-1);return}(t.length==3||t.length==7)&&(e.value+="."),t.length==11&&(e.value+="-")})}const U=[{Name:"PROP_CPF",Value:null},{Name:"PROP_DATA_NASCIMENTO",Value:null},{Name:"PROP_NOME",Value:null}],Dt=Nt.create({baseURL:"https://dr-clinicalbank-prd.neurotech.com.br/",headers:{"Content-type":"application/json"}});function Je(e,r){r!==""&&r!==void 0?document.querySelector(".sub-text-element").textContent=`${e} ${r}`:document.querySelector(".sub-text-element").textContent=`${e}`}function We(e){const r=document.createElement("span");return r.textContent=`${e}`,r.classList.add("sub-text-element"),r}function $(e){const r=document.querySelector(".space-cpf"),t=document.createElement("div");t.setAttribute("class","user-approvedOrNot"),t.appendChild(We(e[0]===""?"0.00":e[0])),t.appendChild(document.createElement("br")),r.querySelector("#cpfdiv").appendChild(t),e[1]!==""&&e[1]!==void 0&&(t.appendChild(We(e[1]===""?"0.00":e[1])),t.appendChild(document.createElement("br")),r.querySelector("#cpfdiv").appendChild(t))}function ze(){document.querySelector(".user-approvedOrNot").remove()}function qt(e){e.addEventListener("click",r=>{r.preventDefault();const t=e.querySelector(".spinner-border.spinner-border-sm");t.classList.remove("d-none");try{const a=document.querySelector("#formCPF"),n=a.querySelector(".form-control.border-radius.nome"),i=a.querySelector(".form-control.border-radius.data"),s=a.querySelector(".form-control.border-radius.cpf"),u=Lt(new Date(i.value)),l=document.querySelector("#cardCredit");s.value!==""&&i.value!==""&&n.value!==""?(U[0].Value=s.value.replace(/\D/g,""),U[1].Value=u,U[2].Value=n.value,Me.Submit.Inputs=[...U],Dt.post("services/rest/workflow/submit",Me).then(f=>{const d=document.body.contains(document.querySelector(".sub-text-element"));if(f.status===200&&f.data.Result.Result!=="REPROVADO"){const{Outputs:p}=f.data.Result,o=[];p.forEach(h=>{h.Key=="CALC_VALOR_CONTRATO"&&o.push({name:"CALC_VALOR_CONTRATO",value:h.Value}),h.Key=="CALC_VALOR_CONTRATO_FINAL"&&o.push({name:"CALC_VALOR_CONTRATO_FINAL",value:h.Value}),h.Key=="CALC_VALOR_PARCELA"&&o.push({name:"CALC_VALOR_PARCELA",value:h.Value}),h.Key=="CALC_VALOR_PARCELA_FINAL"&&o.push({name:"CALC_VALOR_PARCELA_FINAL",value:h.Value})}),d?document.body.contains(document.querySelector(".user-approvedOrNot"))?(ze(),$([`Credito Aprovado no momento: R$${o[0].value}`,`Valor das parcelas: R$${o[2].value}`])):Je("Credito Aprovado no momento: R$",o[0].value):$([`Credito Aprovado no momento: R$${o[0].value}`,`Valor das parcelas: R$${o[2].value}`])}else d?document.querySelectorAll(".sub-text-element").length>=2?(ze(),$(["Conforme analise n\xE3o foi poss\xEDvel realizar a solicita\xE7\xE3o"])):Je(["Conforme analise n\xE3o foi poss\xEDvel realizar a solicita\xE7\xE3o"]):$(["Conforme analise n\xE3o foi poss\xEDvel realizar a solicita\xE7\xE3o"])}).catch(f=>{alert("Erro ao pesquisar dados"),console.log(f),a.removeAttribute("style")}).finally(()=>{t.classList.add("d-none")})):alert("Preencha os campos corretamente!")}catch(a){console.log(a),alert("Erro ao consultar credito aprovado")}})}document.querySelector("#app").innerHTML=`
    <nav class='navbar container p-2'>
      <div class='col-sm-2 logo'>
        <div class='header-right'>
          <img alt='logo' class='img-width' src="${mr}" />
        </div>
      </div>
      <div class='d-flex flex-row-reverse'>
          <a href='${window.location.origin}' class="btn btn-md btn-outline-primary">
            <i class="bi bi-arrow-left"></i> 
              Voltar
            </a>
    
        </div>
    </nav>
    <hr class='separator '/>
    <section class='container container-sm container-md container-lg my-5' >
        <div class="row">
          <div class="col-sm-6" style='display: grid;place-content: center;'>
            <div class='row'>
              <div class='col-12 col-sm-10 col-md-6 col-lg-10'>
                <span class='text-color'>Consulte o Cr\xE9dito do seu CPF</span>
              </div>
            </div>
            <div class='row'>
              <div class='col-12 col-sm-12 col-md-6 col-lg-10'>
                <div class='text-width pt-3'>  
                  <span class='sub-text'>
                    Simule o seu tratamento</span>
                </div>
              </div>
            </div>
            <div class='row space-cpf'>
              <div class="col-10 col-sm-6 col-md-6 col-lg-8" id='cpfdiv'>
                  <form id="formCPF" method="post" >
                    <div class="input-group  mb-3">
                      <input type="text" value='' class='form-control border-radius nome' placeholder='Digite seu nome' aria-label="digite seu nome" aria-describedby="basic-addon2">
                    </div>
                    <div class="input-group  mb-3">
                      <input type="date"  value='' class='form-control border-radius data' placeholder='DD/MM/YYYY' aria-label="digite data de nascimento" aria-describedby="basic-addon2">
                    </div>  
                    <div class="input-group  mb-3">
                      <input type="text" value='' class='form-control border-radius cpf' placeholder='Digite seu cpf' aria-label="digite seu cpf" aria-describedby="basic-addon2">
                    </div>

                    <div class='p-2 mb-3'>
                      <button class="btn txt-background text-white" type="submit" id="button-addon2" style='margin-left: -10px;border-radius:12px'>
                       <span class="spinner-border spinner-border-sm d-none"></span> Consultar</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-12 col-sm-12">
                <div class='d-flex flex-wrap ' >
                  <div class="col-auto col-sm-2 col-md-2 align-self-center">
                      <div class='col col-sm col-md p-2'>
                        <img src='${Er}' />
                      </div>
                      <div class='col col-sm col-md p-2'>
                        <img src='${br}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${yr}' />
                      </div>
                    </div>
                    <div class="col-12 col-sm-8 col-md-8 align-self-center">
                      <div class="flex-md-fill flex-xl-fill width-img">
                        <img src='${vr}' />
                      </div>
                    </div>
                    <div class="col-auto col-sm-2 col-md-2 align-self-center">
                      <div class='col col-sm col-md p-2'>
                        <img src='${Rr}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${Cr}' />
                      </div>
                      <div class='col col-sm col-md p-2 '>
                        <img src='${Ar}' />
                      </div>
                    </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    </section>
    <footer class="footer mt-auto py-3 ">
      <div class="container">
        <span class="text-muted">&copy; Clinical Bank 2022</span>
      </div>
    </footer>

`;qt(document.querySelector("#button-addon2"));Tt(document.querySelector(".form-control.border-radius.cpf"));