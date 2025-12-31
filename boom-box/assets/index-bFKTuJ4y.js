var Pr=Object.defineProperty;var Dr=(n,e,t)=>e in n?Pr(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var m=(n,e,t)=>Dr(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class ns{constructor(e,t,s=null){m(this,"color");m(this,"col",0);m(this,"row",0);m(this,"elm");m(this,"powerUp",null);m(this,"_readyToBoom",!1);m(this,"_highlighted",!1);this.color=t,this.powerUp=s,this.createElm(),this.updatePosition({col:e.col,row:e.row})}set readyToBoom(e){this._readyToBoom=e}get readyToBoom(){return this._readyToBoom}set highlighted(e){this._highlighted=e,this.elm.classList.toggle("highlight",e)}get highlighted(){return this._highlighted}matchesColor(e){return this.powerUp==="rainbow"?!0:this.color===e}updatePosition({col:e,row:t}){e!==void 0&&(this.col=e),t!==void 0&&(this.row=t),this.elm.style.setProperty("--col",String(e)),this.elm.style.setProperty("--row",String(t))}createElm(){this.elm=document.createElement("button"),this.elm.className="cell",this.powerUp==="rainbow"?this.elm.classList.add("powerup","powerup-rainbow"):this.powerUp==="bomb"?(this.elm.classList.add("powerup","powerup-bomb"),this.elm.style.backgroundColor=this.color):this.powerUp==="lightning"?(this.elm.classList.add("powerup","powerup-lightning"),this.elm.style.backgroundColor=this.color):this.elm.style.backgroundColor=this.color,this.elm.setAttribute("data-pos",`${this.col}-${this.row}`)}destroy(){this.elm.classList.add("boom"),setTimeout(()=>{this.elm.remove()},200)}}class yn{constructor(e,t,s,i){m(this,"x");m(this,"y");m(this,"color");m(this,"container");m(this,"vx");m(this,"vy");m(this,"size");m(this,"elm");this.x=e,this.y=t,this.color=s,this.container=i,this.vx=(Math.random()-.5)*200,this.vy=(Math.random()-.5)*200-100,this.size=Math.random()*8+4,this.createElm(),this.animate()}createElm(){this.elm=document.createElement("div"),this.elm.className="particle",this.elm.style.cssText=`
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            background-color: ${this.color};
            --vx: ${this.vx}px;
            --vy: ${this.vy}px;
        `,this.container.appendChild(this.elm)}animate(){requestAnimationFrame(()=>{this.elm.classList.add("animate")}),setTimeout(()=>{this.elm.remove()},600)}static burst(e,t,s,i,r=8){for(let o=0;o<r;o++)new yn(e,t,s,i)}}class ss{constructor(e){m(this,"cells",[]);m(this,"elm");m(this,"boardElm");this.boardElm=e,this.createElm()}createElm(){this.elm=document.createElement("div"),this.elm.className="column"}addCell(e){this.cells.unshift(e)}boomCells(){this.cells=this.cells.filter(e=>{if(e.readyToBoom){const t=e.elm.getBoundingClientRect(),s=this.boardElm.getBoundingClientRect(),i=t.left-s.left+t.width/2,r=t.top-s.top+t.height/2;yn.burst(i,r,e.color,this.boardElm,6),e.destroy()}return!e.readyToBoom})}getCell(e){return this.cells[e]}destroy(){this.elm.remove()}}class Mr{constructor(e){m(this,"container");this.container=e}showScore(e,t,s,i){const r=document.createElement("div");r.className="score-popup",r.textContent=`+${s}`,r.style.cssText=`
            left: ${e}px;
            top: ${t}px;
            color: ${i};
        `,this.container.appendChild(r),requestAnimationFrame(()=>{r.classList.add("animate")}),setTimeout(()=>{r.remove()},800)}showCombo(e){const t=document.querySelector(".combo-popup");t&&t.remove();const s=document.createElement("div");s.className="combo-popup",s.innerHTML=`<span class="combo-count">${e}x</span><span class="combo-text">COMBO!</span>`,document.body.appendChild(s),requestAnimationFrame(()=>{s.classList.add("animate")}),setTimeout(()=>{s.remove()},1200)}showGameOver(e,t){const s=document.querySelector(".gameover-popup");s&&s.remove();const i=document.createElement("div");i.className="gameover-popup",t?i.innerHTML=`
                <span class="gameover-title">🎉 NEW HIGH SCORE! 🎉</span>
                <span class="gameover-score">${e}</span>
            `:i.innerHTML=`
                <span class="gameover-title">GAME OVER</span>
                <span class="gameover-score">Score: ${e}</span>
            `,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add("animate")}),setTimeout(()=>{i.remove()},4e3)}}const Bt={gamesPlayed:0,blocksDestroyed:0,biggestCombo:0,highestScore:0,totalPlayTimeMs:0,totalCombos:0},is="boombox-stats";class Or{constructor(){m(this,"stats");m(this,"sessionStartTime",0);this.stats=this.load(),this.startSession(),document.addEventListener("visibilitychange",()=>{document.hidden?this.savePlayTime():this.sessionStartTime=Date.now()}),window.addEventListener("beforeunload",()=>{this.savePlayTime()})}load(){try{const e=localStorage.getItem(is);if(e)return{...Bt,...JSON.parse(e)}}catch(e){console.error("Failed to load stats:",e)}return{...Bt}}save(){try{localStorage.setItem(is,JSON.stringify(this.stats))}catch(e){console.error("Failed to save stats:",e)}}startSession(){this.sessionStartTime=Date.now()}savePlayTime(){this.sessionStartTime>0&&(this.stats.totalPlayTimeMs+=Date.now()-this.sessionStartTime,this.sessionStartTime=Date.now(),this.save())}recordGameEnd(e){this.stats.gamesPlayed++,e>this.stats.highestScore&&(this.stats.highestScore=e),this.savePlayTime(),this.save()}recordBlocksDestroyed(e){this.stats.blocksDestroyed+=e,this.save()}recordCombo(e){e>this.stats.biggestCombo&&(this.stats.biggestCombo=e),this.stats.totalCombos++,this.save()}getStats(){return{...this.stats}}reset(){this.stats={...Bt},this.sessionStartTime=Date.now(),this.save()}formatPlayTime(){const e=this.stats.totalPlayTimeMs+(Date.now()-this.sessionStartTime),t=Math.floor(e/6e4);if(t<60)return`${t}m`;const s=Math.floor(t/60),i=t%60;return`${s}h ${i}m`}}const Lr=()=>{};var rs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Re(e)},Re=function(n){return new Error("Firebase Database ("+ei.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Fr=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Cn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),s.push(t[d],t[u],t[h],t[p])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ti(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Fr(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new Br;const h=r<<2|a>>4;if(s.push(h),c!==64){const p=a<<4&240|c>>2;if(s.push(p),u!==64){const _=c<<6&192|u;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Br extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ni=function(n){const e=ti(n);return Cn.encodeByteArray(e,!0)},ct=function(n){return ni(n).replace(/\./g,"")},Qt=function(n){try{return Cn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return si(void 0,n)}function si(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Hr(t)||(n[t]=si(n[t],e[t]));return n}function Hr(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=()=>Wr().__FIREBASE_DEFAULTS__,$r=()=>{if(typeof process>"u"||typeof rs>"u")return;const n=rs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Gr=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Qt(n[1]);return e&&JSON.parse(e)},ii=()=>{try{return Lr()||Vr()||$r()||Gr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},qr=n=>{var e,t;return(t=(e=ii())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},zr=n=>{const e=qr(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},ri=()=>{var n;return(n=ii())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function jr(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ct(JSON.stringify(t)),ct(JSON.stringify(o)),""].join(".")}const De={};function Kr(){const n={prod:[],emulator:[]};for(const e of Object.keys(De))De[e]?n.emulator.push(e):n.prod.push(e);return n}function Qr(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let os=!1;function Xr(n,e){if(typeof window>"u"||typeof document>"u"||!vn(window.location.host)||De[n]===e||De[n]||os)return;De[n]=e;function t(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=Kr().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{os=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=Qr(s),p=t("text"),_=document.getElementById(p)||document.createElement("span"),w=t("learnmore"),N=document.getElementById(w)||document.createElement("a"),G=t("preprendIcon"),q=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ie=h.element;a(ie),d(N,w);const Ft=c();l(q,G),ie.append(q,_,N,Ft),document.body.appendChild(ie)}r?(_.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",p)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function oi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Jr())}function Zr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eo(){return ei.NODE_ADMIN===!0}function to(){try{return typeof indexedDB=="object"}catch{return!1}}function no(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so="FirebaseError";class Xe extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=so,Object.setPrototypeOf(this,Xe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ai.prototype.create)}}class ai{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?io(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Xe(i,a,s)}}function io(n,e){return n.replace(ro,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const ro=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n){return JSON.parse(n)}function P(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=We(Qt(r[0])||""),t=We(Qt(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},oo=function(n){const e=li(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ao=function(n){const e=li(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function le(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function as(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ht(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function ut(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(ls(r)&&ls(o)){if(!ut(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function ls(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function ci(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,f(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Rt=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n){return n&&n._delegate?n._delegate:n}class Ve{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Tt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(po(e))try{this.getOrInitializeService({instanceIdentifier:re})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=re){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=re){return this.instances.has(e)}getOptions(e=re){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:fo(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=re){return this.component?this.component.multipleInstances?e:re:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fo(n){return n===re?void 0:n}function po(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new uo(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const mo={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},go=S.INFO,yo={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Co=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=yo[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hi{constructor(e){this.name=e,this._logLevel=go,this._logHandler=Co,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const vo=(n,e)=>e.some(t=>n instanceof t);let cs,hs;function Eo(){return cs||(cs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wo(){return hs||(hs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ui=new WeakMap,Xt=new WeakMap,di=new WeakMap,Ut=new WeakMap,En=new WeakMap;function bo(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(J(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ui.set(t,n)}).catch(()=>{}),En.set(e,n),e}function So(n){if(Xt.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Xt.set(n,e)}let Jt={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xt.get(n);if(e==="objectStoreNames")return n.objectStoreNames||di.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return J(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Io(n){Jt=n(Jt)}function To(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Ht(this),e,...t);return di.set(s,e.sort?e.sort():[e]),J(s)}:wo().includes(n)?function(...e){return n.apply(Ht(this),e),J(ui.get(this))}:function(...e){return J(n.apply(Ht(this),e))}}function Ro(n){return typeof n=="function"?To(n):(n instanceof IDBTransaction&&So(n),vo(n,Eo())?new Proxy(n,Jt):n)}function J(n){if(n instanceof IDBRequest)return bo(n);if(Ut.has(n))return Ut.get(n);const e=Ro(n);return e!==n&&(Ut.set(n,e),En.set(e,n)),e}const Ht=n=>En.get(n);function No(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=J(o);return s&&o.addEventListener("upgradeneeded",l=>{s(J(o.result),l.oldVersion,l.newVersion,J(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const ko=["get","getKey","getAll","getAllKeys","count"],xo=["put","add","delete","clear"],Wt=new Map;function us(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Wt.get(e))return Wt.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=xo.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||ko.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Wt.set(e,r),r}Io(n=>({...n,get:(e,t,s)=>us(e,t)||n.get(e,t,s),has:(e,t)=>!!us(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Po(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Po(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zt="@firebase/app",ds="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=new hi("@firebase/app"),Do="@firebase/app-compat",Mo="@firebase/analytics-compat",Oo="@firebase/analytics",Lo="@firebase/app-check-compat",Fo="@firebase/app-check",Bo="@firebase/auth",Uo="@firebase/auth-compat",Ho="@firebase/database",Wo="@firebase/data-connect",Vo="@firebase/database-compat",$o="@firebase/functions",Go="@firebase/functions-compat",qo="@firebase/installations",zo="@firebase/installations-compat",jo="@firebase/messaging",Yo="@firebase/messaging-compat",Ko="@firebase/performance",Qo="@firebase/performance-compat",Xo="@firebase/remote-config",Jo="@firebase/remote-config-compat",Zo="@firebase/storage",ea="@firebase/storage-compat",ta="@firebase/firestore",na="@firebase/ai",sa="@firebase/firestore-compat",ia="firebase",ra="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="[DEFAULT]",oa={[Zt]:"fire-core",[Do]:"fire-core-compat",[Oo]:"fire-analytics",[Mo]:"fire-analytics-compat",[Fo]:"fire-app-check",[Lo]:"fire-app-check-compat",[Bo]:"fire-auth",[Uo]:"fire-auth-compat",[Ho]:"fire-rtdb",[Wo]:"fire-data-connect",[Vo]:"fire-rtdb-compat",[$o]:"fire-fn",[Go]:"fire-fn-compat",[qo]:"fire-iid",[zo]:"fire-iid-compat",[jo]:"fire-fcm",[Yo]:"fire-fcm-compat",[Ko]:"fire-perf",[Qo]:"fire-perf-compat",[Xo]:"fire-rc",[Jo]:"fire-rc-compat",[Zo]:"fire-gcs",[ea]:"fire-gcs-compat",[ta]:"fire-fst",[sa]:"fire-fst-compat",[na]:"fire-vertex","fire-js":"fire-js",[ia]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=new Map,aa=new Map,tn=new Map;function fs(n,e){try{n.container.addComponent(e)}catch(t){Y.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ft(n){const e=n.name;if(tn.has(e))return Y.debug(`There were multiple attempts to register component ${e}.`),!1;tn.set(e,n);for(const t of dt.values())fs(t,n);for(const t of aa.values())fs(t,n);return!0}function la(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ca(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Z=new ai("app","Firebase",ha);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ve("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Z.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da=ra;function fi(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:en,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw Z.create("bad-app-name",{appName:String(i)});if(t||(t=ri()),!t)throw Z.create("no-options");const r=dt.get(i);if(r){if(ut(t,r.options)&&ut(s,r.config))return r;throw Z.create("duplicate-app",{appName:i})}const o=new _o(i);for(const l of tn.values())o.addComponent(l);const a=new ua(t,s,o);return dt.set(i,a),a}function fa(n=en){const e=dt.get(n);if(!e&&n===en&&ri())return fi();if(!e)throw Z.create("no-app",{appName:n});return e}function ye(n,e,t){let s=oa[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Y.warn(o.join(" "));return}ft(new Ve(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="firebase-heartbeat-database",_a=1,$e="firebase-heartbeat-store";let Vt=null;function pi(){return Vt||(Vt=No(pa,_a,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore($e)}catch(t){console.warn(t)}}}}).catch(n=>{throw Z.create("idb-open",{originalErrorMessage:n.message})})),Vt}async function ma(n){try{const t=(await pi()).transaction($e),s=await t.objectStore($e).get(_i(n));return await t.done,s}catch(e){if(e instanceof Xe)Y.warn(e.message);else{const t=Z.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Y.warn(t.message)}}}async function ps(n,e){try{const s=(await pi()).transaction($e,"readwrite");await s.objectStore($e).put(e,_i(n)),await s.done}catch(t){if(t instanceof Xe)Y.warn(t.message);else{const s=Z.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Y.warn(s.message)}}}function _i(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga=1024,ya=30;class Ca{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ea(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=_s();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>ya){const o=wa(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Y.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=_s(),{heartbeatsToSend:s,unsentEntries:i}=va(this._heartbeatsCache.heartbeats),r=ct(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Y.warn(t),""}}}function _s(){return new Date().toISOString().substring(0,10)}function va(n,e=ga){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),ms(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ms(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Ea{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return to()?no().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ma(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ps(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ps(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ms(n){return ct(JSON.stringify({version:2,heartbeats:n})).length}function wa(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n){ft(new Ve("platform-logger",e=>new Ao(e),"PRIVATE")),ft(new Ve("heartbeat",e=>new Ca(e),"PRIVATE")),ye(Zt,ds,n),ye(Zt,ds,"esm2020"),ye("fire-js","")}ba("");var Sa="firebase",Ia="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ye(Sa,Ia,"app");var gs={};const ys="@firebase/database",Cs="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mi="";function Ta(n){mi=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),P(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:We(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return $(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ra(e)}}catch{}return new Na},ae=gi("localStorage"),ka=gi("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce=new hi("@firebase/database"),yi=function(){let n=1;return function(){return n++}}(),Ci=function(n){const e=ho(n),t=new co;t.update(e);const s=t.digest();return Cn.encodeByteArray(s)},Ze=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Ze.apply(null,s):typeof s=="object"?e+=P(s):e+=s,e+=" "}return e};let Me=null,vs=!0;const xa=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Ce.logLevel=S.VERBOSE,Me=Ce.log.bind(Ce)},M=function(...n){if(vs===!0&&(vs=!1,Me===null&&ka.get("logging_enabled")===!0&&xa()),Me){const e=Ze.apply(null,n);Me(e)}},et=function(n){return function(...e){M(n,...e)}},nn=function(...n){const e="FIREBASE INTERNAL ERROR: "+Ze(...n);Ce.error(e)},K=function(...n){const e=`FIREBASE FATAL ERROR: ${Ze(...n)}`;throw Ce.error(e),new Error(e)},B=function(...n){const e="FIREBASE WARNING: "+Ze(...n);Ce.warn(e)},Aa=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&B("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},wn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Pa=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},be="[MIN_NAME]",ce="[MAX_NAME]",Ne=function(n,e){if(n===e)return 0;if(n===be||e===ce)return-1;if(e===be||n===ce)return 1;{const t=Es(n),s=Es(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Da=function(n,e){return n===e?0:n<e?-1:1},ke=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+P(e))},bn=function(n){if(typeof n!="object"||n===null)return P(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=P(e[s]),t+=":",t+=bn(n[e[s]]);return t+="}",t},vi=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function F(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Ei=function(n){f(!wn(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Ma=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Oa=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function La(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const Fa=new RegExp("^-?(0*)\\d{1,10}$"),Ba=-2147483648,Ua=2147483647,Es=function(n){if(Fa.test(n)){const e=Number(n);if(e>=Ba&&e<=Ua)return e}return null},tt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw B("Exception was thrown by user callback.",t),e},Math.floor(0))}},Ha=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Oe=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ca(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){B(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(M("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',B(e)}}class lt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}lt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn="5",wi="v",bi="s",Si="r",Ii="f",Ti=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ri="ls",Ni="p",sn="ac",ki="websocket",xi="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ae.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ae.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function $a(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Pi(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let s;if(e===ki)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===xi)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);$a(n)&&(t.ns=n.namespace);const i=[];return F(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(){this.counters_={}}incrementCounter(e,t=1){$(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Ur(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t={},Gt={};function In(n){const e=n.toString();return $t[e]||($t[e]=new Ga),$t[e]}function qa(n,e){const t=n.toString();return Gt[t]||(Gt[t]=e()),Gt[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&tt(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws="start",ja="close",Ya="pLPCommand",Ka="pRTLPCB",Di="id",Mi="pw",Oi="ser",Qa="cb",Xa="seg",Ja="ts",Za="d",el="dframe",Li=1870,Fi=30,tl=Li-Fi,nl=25e3,sl=3e4;class me{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=et(e),this.stats_=In(t),this.urlFn=l=>(this.appCheckToken&&(l[sn]=this.appCheckToken),Pi(t,xi,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new za(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(sl)),Pa(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Tn((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ws)this.id=a,this.password=l;else if(o===ja)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[ws]="t",s[Oi]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[Qa]=this.scriptTagHolder.uniqueCallbackIdentifier),s[wi]=Sn,this.transportSessionId&&(s[bi]=this.transportSessionId),this.lastSessionId&&(s[Ri]=this.lastSessionId),this.applicationId&&(s[Ni]=this.applicationId),this.appCheckToken&&(s[sn]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ti.test(location.hostname)&&(s[Si]=Ii);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){me.forceAllow_=!0}static forceDisallow(){me.forceDisallow_=!0}static isAvailable(){return me.forceAllow_?!0:!me.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ma()&&!Oa()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=ni(t),i=vi(s,tl);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[el]="t",s[Di]=e,s[Mi]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=P(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Tn{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=yi(),window[Ya+this.uniqueCallbackIdentifier]=e,window[Ka+this.uniqueCallbackIdentifier]=t,this.myIFrame=Tn.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){M("frame writing exception"),a.stack&&M(a.stack),M(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||M("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Di]=this.myID,e[Mi]=this.myPW,e[Oi]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Fi+s.length<=Li;){const o=this.pendingSegs.shift();s=s+"&"+Xa+i+"="+o.seg+"&"+Ja+i+"="+o.ts+"&"+Za+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(nl)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{M("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=16384,rl=45e3;let pt=null;typeof MozWebSocket<"u"?pt=MozWebSocket:typeof WebSocket<"u"&&(pt=WebSocket);class U{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=et(this.connId),this.stats_=In(t),this.connURL=U.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[wi]=Sn,typeof location<"u"&&location.hostname&&Ti.test(location.hostname)&&(o[Si]=Ii),t&&(o[bi]=t),s&&(o[Ri]=s),i&&(o[sn]=i),r&&(o[Ni]=r),Pi(e,ki,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ae.set("previous_websocket_failure",!0);try{let s;eo(),this.mySock=new pt(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){U.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&pt!==null&&!U.forceDisallow_}static previouslyFailed(){return ae.isInMemoryStorage||ae.get("previous_websocket_failure")===!0}markConnectionHealthy(){ae.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=We(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=vi(t,il);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(rl))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}U.responsesRequiredToBeHealthy=2;U.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{static get ALL_TRANSPORTS(){return[me,U]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=U&&U.isAvailable();let s=t&&!U.previouslyFailed();if(e.webSocketOnly&&(t||B("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[U];else{const i=this.transports_=[];for(const r of Ge.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ge.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ge.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=6e4,al=5e3,ll=10*1024,cl=100*1024,qt="t",bs="d",hl="s",Ss="r",ul="e",Is="o",Ts="a",Rs="n",Ns="p",dl="h";class fl{constructor(e,t,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=et("c:"+this.id+":"),this.transportManager_=new Ge(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Oe(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>cl?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ll?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(qt in e){const t=e[qt];t===Ts?this.upgradeIfSecondaryHealthy_():t===Ss?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Is&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=ke("t",e),s=ke("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ns,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ts,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Rs,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=ke("t",e),s=ke("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=ke(qt,e);if(bs in e){const s=e[bs];if(t===dl){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Rs){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===hl?this.onConnectionShutdown_(s):t===Ss?this.onReset_(s):t===ul?nn("Server Error: "+s):t===Is?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):nn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Sn!==s&&B("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Oe(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ol))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Oe(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(al))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ns,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ae.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Ui{static getInstance(){return new _t}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!oi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=32,xs=768;class b{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new b("")}function y(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function te(n){return n.pieces_.length-n.pieceNum_}function I(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new b(n.pieces_,e)}function Hi(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function pl(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Wi(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Vi(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new b(e,0)}function k(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof b)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new b(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function O(n,e){const t=y(n),s=y(e);if(t===null)return e;if(t===s)return O(I(n),I(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Rn(n,e){if(te(n)!==te(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function H(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(te(n)>te(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class _l{constructor(e,t){this.errorPrefix_=t,this.parts_=Wi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Rt(this.parts_[s]);$i(this)}}function ml(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Rt(e),$i(n)}function gl(n){const e=n.parts_.pop();n.byteLength_-=Rt(e),n.parts_.length>0&&(n.byteLength_-=1)}function $i(n){if(n.byteLength_>xs)throw new Error(n.errorPrefix_+"has a key path longer than "+xs+" bytes ("+n.byteLength_+").");if(n.parts_.length>ks)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ks+") or object contains a cycle "+oe(n))}function oe(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn extends Ui{static getInstance(){return new Nn}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=1e3,yl=60*5*1e3,As=30*1e3,Cl=1.3,vl=3e4,El="server_kill",Ps=3;class j extends Bi{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=j.nextPersistentConnectionId_++,this.log_=et("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=xe,this.maxReconnectDelay_=yl,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Nn.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&_t.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(P(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Tt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;j.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&$(e,"w")){const s=le(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();B(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ao(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=As)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=oo(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+P(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):nn("Unrecognized action received from server: "+P(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=xe,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=xe,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>vl&&(this.reconnectDelay_=xe),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Cl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+j.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?M("getToken() completed but was canceled"):(M("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new fl(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,p=>{B(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(El)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&B(u),l())}}}interrupt(e){M("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){M("Resuming connection for reason: "+e),delete this.interruptReasons_[e],as(this.interruptReasons_)&&(this.reconnectDelay_=xe,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>bn(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new b(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){M("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ps&&(this.reconnectDelay_=As,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){M("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ps&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+mi.replace(/\./g,"-")]=1,oi()?e["framework.cordova"]=1:Zr()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=_t.getInstance().currentlyOnline();return as(this.interruptReasons_)&&e}}j.nextPersistentConnectionId_=0;j.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new C(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new C(be,e),i=new C(be,t);return this.compare(s,i)!==0}minPost(){return C.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rt;class Gi extends Nt{static get __EMPTY_NODE(){return rt}static set __EMPTY_NODE(e){rt=e}compare(e,t){return Ne(e.name,t.name)}isDefinedOn(e){throw Re("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return C.MIN}maxPost(){return new C(ce,rt)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new C(e,rt)}toString(){return".key"}}const ve=new Gi;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class A{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??A.RED,this.left=i??L.EMPTY_NODE,this.right=r??L.EMPTY_NODE}copy(e,t,s,i,r){return new A(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return L.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return L.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,A.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,A.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}A.RED=!0;A.BLACK=!1;class wl{copy(e,t,s,i,r){return this}insert(e,t,s){return new A(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class L{constructor(e,t=L.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new L(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,A.BLACK,null,null))}remove(e){return new L(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,A.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ot(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ot(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ot(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ot(this.root_,null,this.comparator_,!0,e)}}L.EMPTY_NODE=new wl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(n,e){return Ne(n.name,e.name)}function kn(n,e){return Ne(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rn;function Sl(n){rn=n}const qi=function(n){return typeof n=="number"?"number:"+Ei(n):"string:"+n},zi=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&$(e,".sv"),"Priority must be a string or number.")}else f(n===rn||n.isEmpty(),"priority of unexpected type.");f(n===rn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ds;class x{static set __childrenNodeConstructor(e){Ds=e}static get __childrenNodeConstructor(){return Ds}constructor(e,t=x.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),zi(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new x(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:y(e)===".priority"?this.priorityNode_:x.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:x.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=y(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(f(s!==".priority"||te(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,x.__childrenNodeConstructor.EMPTY_NODE.updateChild(I(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+qi(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ei(this.value_):e+=this.value_,this.lazyHash_=Ci(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===x.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof x.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=x.VALUE_TYPE_ORDER.indexOf(t),r=x.VALUE_TYPE_ORDER.indexOf(s);return f(i>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}x.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ji,Yi;function Il(n){ji=n}function Tl(n){Yi=n}class Rl extends Nt{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return C.MIN}maxPost(){return new C(ce,new x("[PRIORITY-POST]",Yi))}makePost(e,t){const s=ji(e);return new C(t,new x("[PRIORITY-POST]",s))}toString(){return".priority"}}const R=new Rl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl=Math.log(2);class kl{constructor(e){const t=r=>parseInt(Math.log(r)/Nl,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mt=function(n,e,t,s){n.sort(e);const i=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new A(h,u.node,A.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=i(l,p),w=i(p+1,c);return u=n[p],h=t?t(u):u,new A(h,u.node,A.BLACK,_,w)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,w){const N=u-_,G=u;u-=_;const q=i(N+1,G),ie=n[N],Ft=t?t(ie):ie;p(new A(Ft,ie.node,w,null,q))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const w=l.nextBitIsOne(),N=Math.pow(2,l.count-(_+1));w?h(N,A.BLACK):(h(N,A.BLACK),h(N,A.RED))}return d},o=new kl(n.length),a=r(o);return new L(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt;const _e={};class z{static get Default(){return f(_e&&R,"ChildrenNode.ts has not been loaded"),zt=zt||new z({".priority":_e},{".priority":R}),zt}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=le(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof L?t:null}hasIndex(e){return $(this.indexSet_,e.toString())}addIndex(e,t){f(e!==ve,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(C.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=mt(s,e.getCompare()):a=_e;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new z(d,c)}addToIndexes(e,t){const s=ht(this.indexes_,(i,r)=>{const o=le(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),i===_e)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(C.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),mt(a,o.getCompare())}else return _e;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new C(e.name,a))),l.insert(e,e.node)}});return new z(s,this.indexSet_)}removeFromIndexes(e,t){const s=ht(this.indexes_,i=>{if(i===_e)return i;{const r=t.get(e.name);return r?i.remove(new C(e.name,r)):i}});return new z(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ae;class g{static get EMPTY_NODE(){return Ae||(Ae=new g(new L(kn),null,z.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&zi(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ae}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Ae:t}}getChild(e){const t=y(e);return t===null?this:this.getImmediateChild(t).getChild(I(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new C(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Ae:this.priorityNode_;return new g(i,o,r)}}updateChild(e,t){const s=y(e);if(s===null)return t;{f(y(e)!==".priority"||te(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(I(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(R,(o,a)=>{t[o]=a.val(e),s++,r&&g.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+qi(this.getPriority().val())+":"),this.forEachChild(R,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":Ci(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new C(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new C(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new C(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,C.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,C.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===nt?-1:0}withIndex(e){if(e===ve||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ve||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(R),i=t.getIterator(R);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ve?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class xl extends g{constructor(){super(new L(kn),g.EMPTY_NODE,z.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const nt=new xl;Object.defineProperties(C,{MIN:{value:new C(be,g.EMPTY_NODE)},MAX:{value:new C(ce,nt)}});Gi.__EMPTY_NODE=g.EMPTY_NODE;x.__childrenNodeConstructor=g;Sl(nt);Tl(nt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=!0;function D(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new x(t,D(e))}if(!(n instanceof Array)&&Al){const t=[];let s=!1;if(F(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=D(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new C(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=mt(t,bl,o=>o.name,kn);if(s){const o=mt(t,R.getCompare());return new g(r,D(e),new z({".priority":o},{".priority":R}))}else return new g(r,D(e),z.Default)}else{let t=g.EMPTY_NODE;return F(n,(s,i)=>{if($(n,s)&&s.substring(0,1)!=="."){const r=D(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(D(e))}}Il(D);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl extends Nt{constructor(e){super(),this.indexPath_=e,f(!v(e)&&y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}makePost(e,t){const s=D(e),i=g.EMPTY_NODE.updateChild(this.indexPath_,s);return new C(t,i)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,nt);return new C(ce,e)}toString(){return Wi(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl extends Nt{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ne(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return C.MIN}maxPost(){return C.MAX}makePost(e,t){const s=D(e);return new C(t,s)}toString(){return".value"}}const Ml=new Dl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(n){return{type:"value",snapshotNode:n}}function Se(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function qe(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ze(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ol(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(qe(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Se(t,s)):o.trackChildChange(ze(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(R,(i,r)=>{t.hasChild(i)||s.trackChildChange(qe(i,r))}),t.isLeafNode()||t.forEachChild(R,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(ze(i,r,o))}else s.trackChildChange(Se(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.indexedFilter_=new xn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=je.getStartPost_(e),this.endPost_=je.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new C(t,s))||(s=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=g.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(R,(o,a)=>{r.matches(new C(o,a))||(i=i.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new je(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new C(t,s))||(s=g.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new C(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=i.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!s.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(ze(t,s,u)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(qe(t,u));const w=a.updateImmediateChild(t,g.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(Se(h.name,h.node)),w.updateImmediateChild(h.name,h.node)):w}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(qe(c.name,c.node)),r.trackChildChange(Se(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=R}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:be}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ce}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===R}copy(){const e=new An;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Fl(n){return n.loadsAllData()?new xn(n.getIndex()):n.hasLimit()?new Ll(n):new je(n)}function Ms(n){const e={};if(n.isDefault())return e;let t;if(n.index_===R?t="$priority":n.index_===Ml?t="$value":n.index_===ve?t="$key":(f(n.index_ instanceof Pl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=P(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=P(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+P(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=P(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+P(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Os(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==R&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends Bi{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=et("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=gt.getListenId_(e,s),a={};this.listens_[o]=a;const l=Ms(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),le(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",i(h,null)}})}unlisten(e,t){const s=gt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Ms(e._queryParams),s=e._path.toString(),i=new Tt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+lo(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=We(a.responseText)}catch{B("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&B("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(){return{value:null,children:new Map}}function Qi(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=y(e);n.children.has(s)||n.children.set(s,yt());const i=n.children.get(s);e=I(e),Qi(i,e,t)}}function on(n,e,t){n.value!==null?t(e,n.value):Ul(n,(s,i)=>{const r=new b(e.toString()+"/"+s);on(i,r,t)})}function Ul(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&F(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=10*1e3,Wl=30*1e3,Vl=5*60*1e3;class $l{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Hl(e);const s=Ls+(Wl-Ls)*Math.random();Oe(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;F(e,(i,r)=>{r>0&&$(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Oe(this.reportStats_.bind(this),Math.floor(Math.random()*2*Vl))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(W||(W={}));function Xi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Pn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Dn(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=W.ACK_USER_WRITE,this.source=Xi()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new b(e));return new Ct(E(),t,this.revert)}}else return f(y(this.path)===e,"operationForChild called for unrelated child."),new Ct(I(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){this.source=e,this.path=t,this.type=W.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new Ye(this.source,E()):new Ye(this.source,I(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=W.OVERWRITE}operationForChild(e){return v(this.path)?new he(this.source,E(),this.snap.getImmediateChild(e)):new he(this.source,I(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=W.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new b(e));return t.isEmpty()?null:t.value?new he(this.source,E(),t.value):new Ke(this.source,E(),t)}else return f(y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ke(this.source,I(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=y(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ql(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ol(o.childName,o.snapshotNode))}),Pe(n,i,"child_removed",e,s,t),Pe(n,i,"child_added",e,s,t),Pe(n,i,"child_moved",r,s,t),Pe(n,i,"child_changed",e,s,t),Pe(n,i,"value",e,s,t),i}function Pe(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>jl(n,a,l)),o.forEach(a=>{const l=zl(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function zl(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function jl(n,e,t){if(e.childName==null||t.childName==null)throw Re("Should only compare child_ events.");const s=new C(e.childName,e.snapshotNode),i=new C(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(n,e){return{eventCache:n,serverCache:e}}function Le(n,e,t,s){return kt(new ue(e,t,s),n.serverCache)}function Ji(n,e,t,s){return kt(n.eventCache,new ue(e,t,s))}function an(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function de(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jt;const Yl=()=>(jt||(jt=new L(Da)),jt);class T{static fromObject(e){let t=new T(null);return F(e,(s,i)=>{t=t.set(new b(s),i)}),t}constructor(e,t=Yl()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const s=y(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(I(e),t);return r!=null?{path:k(new b(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=y(e),s=this.children.get(t);return s!==null?s.subtree(I(e)):new T(null)}}set(e,t){if(v(e))return new T(t,this.children);{const s=y(e),r=(this.children.get(s)||new T(null)).set(I(e),t),o=this.children.insert(s,r);return new T(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new T(null):new T(null,this.children);{const t=y(e),s=this.children.get(t);if(s){const i=s.remove(I(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new T(null):new T(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=y(e),s=this.children.get(t);return s?s.get(I(e)):null}}setTree(e,t){if(v(e))return t;{const s=y(e),r=(this.children.get(s)||new T(null)).setTree(I(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new T(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(k(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(v(e))return null;{const r=y(e),o=this.children.get(r);return o?o.findOnPath_(I(e),k(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,s){if(v(e))return this;{this.value&&s(t,this.value);const i=y(e),r=this.children.get(i);return r?r.foreachOnPath_(I(e),k(t,i),s):new T(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(k(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.writeTree_=e}static empty(){return new V(new T(null))}}function Fe(n,e,t){if(v(e))return new V(new T(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=O(i,e);return r=r.updateChild(o,t),new V(n.writeTree_.set(i,r))}else{const i=new T(t),r=n.writeTree_.setTree(e,i);return new V(r)}}}function Fs(n,e,t){let s=n;return F(t,(i,r)=>{s=Fe(s,k(e,i),r)}),s}function Bs(n,e){if(v(e))return V.empty();{const t=n.writeTree_.setTree(e,new T(null));return new V(t)}}function ln(n,e){return fe(n,e)!=null}function fe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(O(t.path,e)):null}function Us(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(R,(s,i)=>{e.push(new C(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new C(s,i.value))}),e}function ee(n,e){if(v(e))return n;{const t=fe(n,e);return t!=null?new V(new T(t)):new V(n.writeTree_.subtree(e))}}function cn(n){return n.writeTree_.isEmpty()}function Ie(n,e){return Zi(E(),n.writeTree_,e)}function Zi(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Zi(k(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(k(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(n,e){return sr(e,n)}function Kl(n,e,t,s,i){f(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Fe(n.visibleWrites,e,t)),n.lastWriteId=s}function Ql(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function Xl(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Jl(a,s.path)?i=!1:H(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return Zl(n),!0;if(s.snap)n.visibleWrites=Bs(n.visibleWrites,s.path);else{const a=s.children;F(a,l=>{n.visibleWrites=Bs(n.visibleWrites,k(s.path,l))})}return!0}else return!1}function Jl(n,e){if(n.snap)return H(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&H(k(n.path,t),e))return!0;return!1}function Zl(n){n.visibleWrites=er(n.allWrites,ec,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function ec(n){return n.visible}function er(n,e,t){let s=V.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)H(t,o)?(a=O(t,o),s=Fe(s,a,r.snap)):H(o,t)&&(a=O(o,t),s=Fe(s,E(),r.snap.getChild(a)));else if(r.children){if(H(t,o))a=O(t,o),s=Fs(s,a,r.children);else if(H(o,t))if(a=O(o,t),v(a))s=Fs(s,E(),r.children);else{const l=le(r.children,y(a));if(l){const c=l.getChild(I(a));s=Fe(s,E(),c)}}}else throw Re("WriteRecord should have .snap or .children")}}return s}function tr(n,e,t,s,i){if(!s&&!i){const r=fe(n.visibleWrites,e);if(r!=null)return r;{const o=ee(n.visibleWrites,e);if(cn(o))return t;if(t==null&&!ln(o,E()))return null;{const a=t||g.EMPTY_NODE;return Ie(o,a)}}}else{const r=ee(n.visibleWrites,e);if(!i&&cn(r))return t;if(!i&&t==null&&!ln(r,E()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(H(c.path,e)||H(e,c.path))},a=er(n.allWrites,o,e),l=t||g.EMPTY_NODE;return Ie(a,l)}}}function tc(n,e,t){let s=g.EMPTY_NODE;const i=fe(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(R,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=ee(n.visibleWrites,e);return t.forEachChild(R,(o,a)=>{const l=Ie(ee(r,new b(o)),a);s=s.updateImmediateChild(o,l)}),Us(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=ee(n.visibleWrites,e);return Us(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function nc(n,e,t,s,i){f(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=k(e,t);if(ln(n.visibleWrites,r))return null;{const o=ee(n.visibleWrites,r);return cn(o)?i.getChild(t):Ie(o,i.getChild(t))}}function sc(n,e,t,s){const i=k(e,t),r=fe(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=ee(n.visibleWrites,i);return Ie(o,s.getNode().getImmediateChild(t))}else return null}function ic(n,e){return fe(n.visibleWrites,e)}function rc(n,e,t,s,i,r,o){let a;const l=ee(n.visibleWrites,e),c=fe(l,E());if(c!=null)a=c;else if(t!=null)a=Ie(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let p=h.getNext();for(;p&&d.length<i;)u(p,s)!==0&&d.push(p),p=h.getNext();return d}else return[]}function oc(){return{visibleWrites:V.empty(),allWrites:[],lastWriteId:-1}}function vt(n,e,t,s){return tr(n.writeTree,n.treePath,e,t,s)}function On(n,e){return tc(n.writeTree,n.treePath,e)}function Hs(n,e,t,s){return nc(n.writeTree,n.treePath,e,t,s)}function Et(n,e){return ic(n.writeTree,k(n.treePath,e))}function ac(n,e,t,s,i,r){return rc(n.writeTree,n.treePath,e,t,s,i,r)}function Ln(n,e,t){return sc(n.writeTree,n.treePath,e,t)}function nr(n,e){return sr(k(n.treePath,e),n.writeTree)}function sr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,ze(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,qe(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Se(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,ze(s,e.snapshotNode,i.oldSnap));else throw Re("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const ir=new cc;class Fn{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ue(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ln(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:de(this.viewCache_),r=ac(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(n){return{filter:n}}function uc(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function dc(n,e,t,s,i){const r=new lc;let o,a;if(t.type===W.OVERWRITE){const c=t;c.source.fromUser?o=hn(n,e,c.path,c.snap,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=wt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===W.MERGE){const c=t;c.source.fromUser?o=pc(n,e,c.path,c.children,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=un(n,e,c.path,c.children,s,i,a,r))}else if(t.type===W.ACK_USER_WRITE){const c=t;c.revert?o=gc(n,e,c.path,s,i,r):o=_c(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===W.LISTEN_COMPLETE)o=mc(n,e,t.path,s,r);else throw Re("Unknown operation type: "+t.type);const l=r.getChanges();return fc(e,o,l),{viewCache:o,changes:l}}function fc(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=an(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Ki(an(e)))}}function rr(n,e,t,s,i,r){const o=e.eventCache;if(Et(s,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=de(e),d=c instanceof g?c:g.EMPTY_NODE,u=On(s,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=vt(s,de(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=y(t);if(c===".priority"){f(te(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Hs(s,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=I(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Hs(s,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Ln(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return Le(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function wt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,s);c=d.updateFullNode(l.getNode(),p,null)}else{const p=y(t);if(!l.isCompleteForPath(t)&&te(t)>1)return e;const _=I(t),N=l.getNode().getImmediateChild(p).updateChild(_,s);p===".priority"?c=d.updatePriority(l.getNode(),N):c=d.updateChild(l.getNode(),p,N,_,ir,null)}const u=Ji(e,c,l.isFullyInitialized()||v(t),d.filtersNodes()),h=new Fn(i,u,r);return rr(n,u,t,i,h,a)}function hn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const d=new Fn(i,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Le(e,c,!0,n.filter.filtersNodes());else{const u=y(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=Le(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=I(t),p=a.getNode().getImmediateChild(u);let _;if(v(h))_=s;else{const w=d.getCompleteChild(u);w!=null?Hi(h)===".priority"&&w.getChild(Vi(h)).isEmpty()?_=w:_=w.updateChild(h,s):_=g.EMPTY_NODE}if(p.equals(_))l=e;else{const w=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=Le(e,w,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Ws(n,e){return n.eventCache.isCompleteForChild(e)}function pc(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=k(t,l);Ws(e,y(d))&&(a=hn(n,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=k(t,l);Ws(e,y(d))||(a=hn(n,a,d,c,i,r,o))}),a}function Vs(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function un(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=s:c=new T(null).setTree(t,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Vs(n,p,h);l=wt(n,l,new b(u),_,i,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),w=Vs(n,_,h);l=wt(n,l,new b(u),w,i,r,o,a)}}),l}function _c(n,e,t,s,i,r,o){if(Et(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return wt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(v(t)){let c=new T(null);return l.getNode().forEachChild(ve,(d,u)=>{c=c.set(new b(d),u)}),un(n,e,t,c,i,r,a,o)}else return e}else{let c=new T(null);return s.foreach((d,u)=>{const h=k(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),un(n,e,t,c,i,r,a,o)}}function mc(n,e,t,s,i){const r=e.serverCache,o=Ji(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return rr(n,o,t,s,ir,i)}function gc(n,e,t,s,i,r){let o;if(Et(s,t)!=null)return e;{const a=new Fn(s,e,i),l=e.eventCache.getNode();let c;if(v(t)||y(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=vt(s,de(e));else{const u=e.serverCache.getNode();f(u instanceof g,"serverChildren would be complete if leaf node"),d=On(s,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=y(t);let u=Ln(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,I(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,g.EMPTY_NODE,I(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=vt(s,de(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Et(s,E())!=null,Le(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new xn(s.getIndex()),r=Fl(s);this.processor_=hc(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),d=new ue(l,o.isFullyInitialized(),i.filtersNodes()),u=new ue(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=kt(u,d),this.eventGenerator_=new Gl(this.query_)}get query(){return this.query_}}function Cc(n){return n.viewCache_.serverCache.getNode()}function vc(n,e){const t=de(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(y(e)).isEmpty())?t.getChild(e):null}function $s(n){return n.eventRegistrations_.length===0}function Ec(n,e){n.eventRegistrations_.push(e)}function Gs(n,e,t){const s=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function qs(n,e,t,s){e.type===W.MERGE&&e.source.queryId!==null&&(f(de(n.viewCache_),"We should always have a full cache before handling merges"),f(an(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=dc(n.processor_,i,e,t,s);return uc(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,or(n,r.changes,r.viewCache.eventCache.getNode(),null)}function wc(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(R,(r,o)=>{s.push(Se(r,o))}),t.isFullyInitialized()&&s.push(Ki(t.getNode())),or(n,s,t.getNode(),e)}function or(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return ql(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bt;class bc{constructor(){this.views=new Map}}function Sc(n){f(!bt,"__referenceConstructor has already been defined"),bt=n}function Ic(){return f(bt,"Reference.ts has not been loaded"),bt}function Tc(n){return n.views.size===0}function Bn(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return f(r!=null,"SyncTree gave us an op for an invalid query."),qs(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(qs(o,e,t,s));return r}}function Rc(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=vt(t,i?s:null),l=!1;a?l=!0:s instanceof g?(a=On(t,s),l=!1):(a=g.EMPTY_NODE,l=!1);const c=kt(new ue(a,l,!1),new ue(s,i,!1));return new yc(e,c)}return o}function Nc(n,e,t,s,i,r){const o=Rc(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Ec(o,t),wc(o,t)}function kc(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ne(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Gs(c,t,s)),$s(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Gs(l,t,s)),$s(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ne(n)&&r.push(new(Ic())(e._repo,e._path)),{removed:r,events:o}}function ar(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ee(n,e){let t=null;for(const s of n.views.values())t=t||vc(s,e);return t}function lr(n,e){if(e._queryParams.loadsAllData())return xt(n);{const s=e._queryIdentifier;return n.views.get(s)}}function cr(n,e){return lr(n,e)!=null}function ne(n){return xt(n)!=null}function xt(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let St;function xc(n){f(!St,"__referenceConstructor has already been defined"),St=n}function Ac(){return f(St,"Reference.ts has not been loaded"),St}let Pc=1;class zs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new T(null),this.pendingWriteTree_=oc(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function hr(n,e,t,s,i){return Kl(n.pendingWriteTree_,e,t,s,i),i?st(n,new he(Xi(),e,t)):[]}function ge(n,e,t=!1){const s=Ql(n.pendingWriteTree_,e);if(Xl(n.pendingWriteTree_,e)){let r=new T(null);return s.snap!=null?r=r.set(E(),!0):F(s.children,o=>{r=r.set(new b(o),!0)}),st(n,new Ct(s.path,r,t))}else return[]}function At(n,e,t){return st(n,new he(Pn(),e,t))}function Dc(n,e,t){const s=T.fromObject(t);return st(n,new Ke(Pn(),e,s))}function Mc(n,e){return st(n,new Ye(Pn(),e))}function Oc(n,e,t){const s=Hn(n,t);if(s){const i=Wn(s),r=i.path,o=i.queryId,a=O(r,e),l=new Ye(Dn(o),a);return Vn(n,r,l)}else return[]}function dn(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||cr(o,e))){const l=kc(o,e,t,s);Tc(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>ne(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=Bc(h);for(let _=0;_<p.length;++_){const w=p[_],N=w.query,G=fr(n,w);n.listenProvider_.startListening(Be(N),It(n,N),G.hashFn,G.onComplete)}}}!u&&c.length>0&&!s&&(d?n.listenProvider_.stopListening(Be(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(Pt(h));n.listenProvider_.stopListening(Be(h),p)}))}Uc(n,c)}return a}function Lc(n,e,t,s){const i=Hn(n,s);if(i!=null){const r=Wn(i),o=r.path,a=r.queryId,l=O(o,e),c=new he(Dn(a),l,t);return Vn(n,o,c)}else return[]}function Fc(n,e,t,s){const i=Hn(n,s);if(i){const r=Wn(i),o=r.path,a=r.queryId,l=O(o,e),c=T.fromObject(t),d=new Ke(Dn(a),l,c);return Vn(n,o,d)}else return[]}function js(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(h,p)=>{const _=O(h,i);r=r||Ee(p,_),o=o||ne(p)});let a=n.syncPointTree_.get(i);a?(o=o||ne(a),r=r||Ee(a,E())):(a=new bc,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((p,_)=>{const w=Ee(_,E());w&&(r=r.updateImmediateChild(p,w))}));const c=cr(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Pt(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=Hc();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=Mn(n.pendingWriteTree_,i);let u=Nc(a,e,t,d,r,l);if(!c&&!o&&!s){const h=lr(a,e);u=u.concat(Wc(n,e,h))}return u}function Un(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=O(o,e),c=Ee(a,l);if(c)return c});return tr(i,e,r,t,!0)}function st(n,e){return ur(e,n.syncPointTree_,null,Mn(n.pendingWriteTree_,E()))}function ur(n,e,t,s){if(v(n.path))return dr(n,e,t,s);{const i=e.get(E());t==null&&i!=null&&(t=Ee(i,E()));let r=[];const o=y(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=nr(s,o);r=r.concat(ur(a,l,c,d))}return i&&(r=r.concat(Bn(i,n,s,t))),r}}function dr(n,e,t,s){const i=e.get(E());t==null&&i!=null&&(t=Ee(i,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=nr(s,o),d=n.operationForChild(o);d&&(r=r.concat(dr(d,a,l,c)))}),i&&(r=r.concat(Bn(i,n,s,t))),r}function fr(n,e){const t=e.query,s=It(n,t);return{hashFn:()=>(Cc(e)||g.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Oc(n,t._path,s):Mc(n,t._path);{const r=La(i,t);return dn(n,t,null,r)}}}}function It(n,e){const t=Pt(e);return n.queryToTagMap.get(t)}function Pt(n){return n._path.toString()+"$"+n._queryIdentifier}function Hn(n,e){return n.tagToQueryMap.get(e)}function Wn(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new b(n.substr(0,e))}}function Vn(n,e,t){const s=n.syncPointTree_.get(e);f(s,"Missing sync point for query tag that we're tracking");const i=Mn(n.pendingWriteTree_,e);return Bn(s,t,i,null)}function Bc(n){return n.fold((e,t,s)=>{if(t&&ne(t))return[xt(t)];{let i=[];return t&&(i=ar(t)),F(s,(r,o)=>{i=i.concat(o)}),i}})}function Be(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Ac())(n._repo,n._path):n}function Uc(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Pt(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Hc(){return Pc++}function Wc(n,e,t){const s=e._path,i=It(n,e),r=fr(n,t),o=n.listenProvider_.startListening(Be(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)f(!ne(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!v(c)&&d&&ne(d))return[xt(d).query];{let h=[];return d&&(h=h.concat(ar(d).map(p=>p.query))),F(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(Be(d),It(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new $n(t)}node(){return this.node_}}class Gn{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=k(this.path_,e);return new Gn(this.syncTree_,t)}node(){return Un(this.syncTree_,this.path_)}}const Vc=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ys=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return $c(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Gc(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},$c=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Gc=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&f(!1,"Unexpected increment value: "+s);const i=e.node();if(f(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},qc=function(n,e,t,s){return qn(e,new Gn(t,n),s)},pr=function(n,e,t){return qn(n,new $n(e),t)};function qn(n,e,t){const s=n.getPriority().val(),i=Ys(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ys(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new x(a,D(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new x(i))),o.forEachChild(R,(a,l)=>{const c=qn(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Dt(n,e){let t=e instanceof b?e:new b(e),s=n,i=y(t);for(;i!==null;){const r=le(s.node.children,i)||{children:{},childCount:0};s=new zn(i,s,r),t=I(t),i=y(t)}return s}function pe(n){return n.node.value}function jn(n,e){n.node.value=e,fn(n)}function _r(n){return n.node.childCount>0}function zc(n){return pe(n)===void 0&&!_r(n)}function Mt(n,e){F(n.node.children,(t,s)=>{e(new zn(t,n,s))})}function mr(n,e,t,s){t&&e(n),Mt(n,i=>{mr(i,e,!0)})}function jc(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function it(n){return new b(n.parent===null?n.name:it(n.parent)+"/"+n.name)}function fn(n){n.parent!==null&&Yc(n.parent,n.name,n)}function Yc(n,e,t){const s=zc(t),i=$(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,fn(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,fn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc=/[\[\].#$\/\u0000-\u001F\u007F]/,Qc=/[\[\].#$\u0000-\u001F\u007F]/,Yt=10*1024*1024,gr=function(n){return typeof n=="string"&&n.length!==0&&!Kc.test(n)},yr=function(n){return typeof n=="string"&&n.length!==0&&!Qc.test(n)},Xc=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),yr(n)},Jc=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!wn(n)||n&&typeof n=="object"&&$(n,".sv")},Yn=function(n,e,t){const s=t instanceof b?new _l(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+oe(s));if(typeof e=="function")throw new Error(n+"contains a function "+oe(s)+" with contents = "+e.toString());if(wn(e))throw new Error(n+"contains "+e.toString()+" "+oe(s));if(typeof e=="string"&&e.length>Yt/3&&Rt(e)>Yt)throw new Error(n+"contains a string greater than "+Yt+" utf8 bytes "+oe(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(F(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!gr(o)))throw new Error(n+" contains an invalid key ("+o+") "+oe(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ml(s,o),Yn(n,a,s),gl(s)}),i&&r)throw new Error(n+' contains ".value" child '+oe(s)+" in addition to actual children.")}},Cr=function(n,e,t,s){if(!yr(t))throw new Error(ci(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Zc=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Cr(n,e,t)},eh=function(n,e){if(y(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},th=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!gr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Xc(t))throw new Error(ci(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function vr(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Rn(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function Er(n,e,t){vr(n,t),wr(n,s=>Rn(s,e))}function se(n,e,t){vr(n,t),wr(n,s=>H(s,e)||H(e,s))}function wr(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(sh(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function sh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Me&&M("event: "+t.toString()),tt(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="repo_interrupt",rh=25;class oh{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new nh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=yt(),this.transactionQueueTree_=new zn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ah(n,e,t){if(n.stats_=In(n.repoInfo_),n.forceRestClient_||Ha())n.server_=new gt(n.repoInfo_,(s,i,r,o)=>{Ks(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Qs(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{P(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new j(n.repoInfo_,e,(s,i,r,o)=>{Ks(n,s,i,r,o)},s=>{Qs(n,s)},s=>{ch(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=qa(n.repoInfo_,()=>new $l(n.stats_,n.server_)),n.infoData_=new Bl,n.infoSyncTree_=new zs({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=At(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Qn(n,"connected",!1),n.serverSyncTree_=new zs({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);se(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function lh(n){const t=n.infoData_.getNode(new b(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Kn(n){return Vc({timestamp:lh(n)})}function Ks(n,e,t,s,i){n.dataUpdateCount++;const r=new b(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=ht(t,c=>D(c));o=Fc(n.serverSyncTree_,r,l,i)}else{const l=D(t);o=Lc(n.serverSyncTree_,r,l,i)}else if(s){const l=ht(t,c=>D(c));o=Dc(n.serverSyncTree_,r,l)}else{const l=D(t);o=At(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Zn(n,r)),se(n.eventQueue_,a,o)}function Qs(n,e){Qn(n,"connected",e),e===!1&&hh(n)}function ch(n,e){F(e,(t,s)=>{Qn(n,t,s)})}function Qn(n,e,t){const s=new b("/.info/"+e),i=D(t);n.infoData_.updateSnapshot(s,i);const r=At(n.infoSyncTree_,s,i);se(n.eventQueue_,s,r)}function br(n){return n.nextWriteId_++}function hh(n){Xn(n,"onDisconnectEvents");const e=Kn(n),t=yt();on(n.onDisconnect_,E(),(i,r)=>{const o=qc(i,r,n.serverSyncTree_,e);Qi(t,i,o)});let s=[];on(t,E(),(i,r)=>{s=s.concat(At(n.serverSyncTree_,i,r));const o=mh(n,i);Zn(n,o)}),n.onDisconnect_=yt(),se(n.eventQueue_,E(),s)}function uh(n,e,t){let s;y(e._path)===".info"?s=js(n.infoSyncTree_,e,t):s=js(n.serverSyncTree_,e,t),Er(n.eventQueue_,e._path,s)}function Xs(n,e,t){let s;y(e._path)===".info"?s=dn(n.infoSyncTree_,e,t):s=dn(n.serverSyncTree_,e,t),Er(n.eventQueue_,e._path,s)}function dh(n){n.persistentConnection_&&n.persistentConnection_.interrupt(ih)}function Xn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),M(t,...e)}function fh(n,e,t,s,i,r){Xn(n,"transaction on "+e);const o={path:e,update:t,onComplete:s,status:null,order:yi(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Jn(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Yn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Dt(n.transactionQueueTree_,e),d=pe(c)||[];d.push(o),jn(c,d);let u;typeof l=="object"&&l!==null&&$(l,".priority")?(u=le(l,".priority"),f(Jc(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Un(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const h=Kn(n),p=D(l,u),_=pr(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=br(n);const w=hr(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);se(n.eventQueue_,e,w),Ot(n,n.transactionQueueTree_)}}function Jn(n,e,t){return Un(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Ot(n,e=n.transactionQueueTree_){if(e||Lt(n,e),pe(e)){const t=Ir(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&ph(n,it(e),t)}else _r(e)&&Mt(e,t=>{Ot(n,t)})}function ph(n,e,t){const s=t.map(c=>c.currentWriteId),i=Jn(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=O(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Xn(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(ge(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Lt(n,Dt(n.transactionQueueTree_,e)),Ot(n,n.transactionQueueTree_),se(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)tt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{B("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Zn(n,e)}},o)}function Zn(n,e){const t=Sr(n,e),s=it(t),i=Ir(n,t);return _h(n,i,s),s}function _h(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=O(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(ge(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=rh)d=!0,u="maxretry",i=i.concat(ge(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Jn(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){Yn("transaction failed: Data returned ",p,l.path);let _=D(p);typeof p=="object"&&p!=null&&$(p,".priority")||(_=_.updatePriority(h.getPriority()));const N=l.currentWriteId,G=Kn(n),q=pr(_,h,G);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=q,l.currentWriteId=br(n),o.splice(o.indexOf(N),1),i=i.concat(hr(n.serverSyncTree_,l.path,q,l.currentWriteId,l.applyLocally)),i=i.concat(ge(n.serverSyncTree_,N,!0))}else d=!0,u="nodata",i=i.concat(ge(n.serverSyncTree_,l.currentWriteId,!0))}se(n.eventQueue_,t,i),i=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}Lt(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)tt(s[a]);Ot(n,n.transactionQueueTree_)}function Sr(n,e){let t,s=n.transactionQueueTree_;for(t=y(e);t!==null&&pe(s)===void 0;)s=Dt(s,t),e=I(e),t=y(e);return s}function Ir(n,e){const t=[];return Tr(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Tr(n,e,t){const s=pe(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Mt(e,i=>{Tr(n,i,t)})}function Lt(n,e){const t=pe(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,jn(e,t.length>0?t:void 0)}Mt(e,s=>{Lt(n,s)})}function mh(n,e){const t=it(Sr(n,e)),s=Dt(n.transactionQueueTree_,e);return jc(s,i=>{Kt(n,i)}),Kt(n,s),mr(s,i=>{Kt(n,i)}),t}function Kt(n,e){const t=pe(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ge(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?jn(e,void 0):t.length=r+1,se(n.eventQueue_,it(e),i);for(let o=0;o<s.length;o++)tt(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function yh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):B(`Invalid query segment '${t}' in query '${n}'`)}return e}const Js=function(n,e){const t=Ch(n),s=t.namespace;t.domain==="firebase.com"&&K(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&K("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Aa();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ai(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new b(t.pathString)}},Ch=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(i=gh(n.substring(d,u)));const h=yh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");s=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+P(this.snapshot.exportVal())}}class Eh{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return v(this._path)?null:Hi(this._path)}get ref(){return new X(this._repo,this._path)}get _queryIdentifier(){const e=Os(this._queryParams),t=bn(e);return t==="{}"?"default":t}get _queryObject(){return Os(this._queryParams)}isEqual(e){if(e=Je(e),!(e instanceof es))return!1;const t=this._repo===e._repo,s=Rn(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+pl(this._path)}}class X extends es{constructor(e,t){super(e,t,new An,!1)}get parent(){const e=Vi(this._path);return e===null?null:new X(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Qe{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new b(e),s=_n(this.ref,e);return new Qe(this._node.getChild(t),s,R)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Qe(i,_n(this.ref,s),R)))}hasChild(e){const t=new b(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function pn(n,e){return n=Je(n),n._checkNotDeleted("ref"),e!==void 0?_n(n._root,e):n._root}function _n(n,e){return n=Je(n),y(n._path)===null?Zc("child","path",e):Cr("child","path",e),new X(n._repo,k(n._path,e))}class ts{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new vh("value",this,new Qe(e.snapshotNode,new X(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Eh(this,e,t):null}matches(e){return e instanceof ts?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function bh(n,e,t,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=t,c=(d,u)=>{Xs(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new wh(t,r||void 0),a=new ts(o);return uh(n._repo,n,a),()=>Xs(n._repo,n,a)}function Rr(n,e,t,s){return bh(n,"value",e,t,s)}Sc(X);xc(X);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="FIREBASE_DATABASE_EMULATOR_HOST",mn={};let Ih=!1;function Th(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=vn(r);n.repoInfo_=new Ai(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Rh(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||K("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),M("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Js(r,i),a=o.repoInfo,l;typeof process<"u"&&gs&&(l=gs[Sh]),l?(r=`http://${l}?ns=${a.namespace}`,o=Js(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Va(n.name,n.options,e);th("Invalid Firebase Database URL",o),v(o.path)||K("Database URL must point to the root of a Firebase Database (not including a child path).");const d=kh(a,n,c,new Wa(n,t));return new xh(d,n)}function Nh(n,e){const t=mn[e];(!t||t[n.key]!==n)&&K(`Database ${e}(${n.repoInfo_}) has already been deleted.`),dh(n),delete t[n.key]}function kh(n,e,t,s){let i=mn[e.name];i||(i={},mn[e.name]=i);let r=i[n.toURLString()];return r&&K("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new oh(n,Ih,t,s),i[n.toURLString()]=r,r}class xh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ah(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new X(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Nh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&K("Cannot call "+e+" on a deleted database.")}}function Ah(n=fa(),e){const t=la(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=zr("database");s&&Ph(t,...s)}return t}function Ph(n,e,t,s={}){n=Je(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&ut(s,r.repoInfo_.emulatorOptions))return;K("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&K('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new lt(lt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Yr(s.mockUserToken,n.app.options.projectId);o=new lt(a)}vn(e)&&(jr(e),Xr("Database",!0)),Th(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(n){Ta(da),ft(new Ve("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Rh(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),ye(ys,Cs,n),ye(ys,Cs,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Zs(n,e,t){if(n=Je(n),eh("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=!0,i=new Tt,r=(a,l,c)=>{let d=null;a?i.reject(a):(d=new Qe(c,new X(n._repo,n._path),R),i.resolve(new Mh(l,d)))},o=Rr(n,()=>{});return fh(n._repo,n._path,e,r,o,s),i.promise}j.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};j.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Dh();const Oh={apiKey:"AIzaSyCqwiNOFbVigVisfbGjfLaEbTngv9Ar7vo",authDomain:"boom-box-86bc9.firebaseapp.com",databaseURL:"https://boom-box-86bc9-default-rtdb.europe-west1.firebasedatabase.app",projectId:"boom-box-86bc9",storageBucket:"boom-box-86bc9.firebasestorage.app",messagingSenderId:"813636214814",appId:"1:813636214814:web:d8245fe60203d40c8e0e0f"},Lh=fi(Oh),gn=Ah(Lh),Fh=pn(gn,"globalStats");class Bh{constructor(){m(this,"globalStats",{totalBooms:0,totalGamesPlayed:0});m(this,"onStatsUpdate",null);this.initListeners()}initListeners(){Rr(Fh,e=>{const t=e.val();t&&(this.globalStats={totalBooms:t.totalBooms||0,totalGamesPlayed:t.totalGamesPlayed||0}),this.onStatsUpdate&&this.onStatsUpdate(this.globalStats)},e=>{console.error("Error listening to globalStats:",e)})}subscribeToStats(e){this.onStatsUpdate=e,e(this.globalStats)}async addBooms(e){const t=pn(gn,"globalStats/totalBooms");try{await Zs(t,s=>(typeof s=="number"?s:0)+e)}catch(s){console.error("Failed to update booms:",s)}}async addGamePlayed(){const e=pn(gn,"globalStats/totalGamesPlayed");try{await Zs(e,t=>(typeof t=="number"?t:0)+1)}catch(t){console.error("Failed to update games played:",t)}}getStats(){return{...this.globalStats}}}const Uh="/boom-box/assets/fx-1-CxpGIugk.mp3",Hh="/boom-box/assets/fx-2-BWoGzB9L.mp3",at={R:"#e74c3c",G:"#27ae60",B:"#3498db",O:"#f39c12"},Wh={easy:"🌱 Easy",normal:"⚡ Normal",hard:"🔥 Hard"};class Vh{constructor(e,t,s,i,r,o){m(this,"boardElm");m(this,"scoreElm");m(this,"msgElm");m(this,"highScoreElm");m(this,"muteBtn");m(this,"difficultyElm");m(this,"initColumnsCount",8);m(this,"initRowsCount",4);m(this,"gameOverRow",13);m(this,"rowsCount",0);m(this,"columns",[]);m(this,"currentColor",null);m(this,"score",0);m(this,"highScore");m(this,"isMuted");m(this,"readyToBoomCounter",0);m(this,"highlightedCells",[]);m(this,"gameover",!1);m(this,"lastRowColors",[]);m(this,"comboCount",0);m(this,"lastScoreEarned",0);m(this,"scorePopup");m(this,"markedCellsPositions",[]);m(this,"powerUpSpawnChance",.05);m(this,"activatedPowerUps",[]);m(this,"statsManager");m(this,"firebaseService");m(this,"difficultyMode","normal");m(this,"colorConfigs",{easy:{colors:3,clustering:.35},normal:{colors:4,clustering:.15},hard:{colors:4,clustering:-.15}});this.boardElm=e,this.scoreElm=t,this.msgElm=s,this.highScoreElm=i,this.muteBtn=r,this.difficultyElm=o,this.highScore=this.loadHighScore(),this.isMuted=this.loadMuteState(),this.scorePopup=new Mr(this.boardElm),this.statsManager=new Or,this.firebaseService=new Bh,this.initMuteButton()}setDifficultyConfig(e){this.difficultyMode=e}restart(){this.columns.forEach(e=>{e.cells.forEach(t=>t.elm.remove()),e.destroy()}),this.columns=[],this.gameover=!1,this.score=0,this.start()}loadHighScore(){const e=localStorage.getItem("boombox-highscore");return e?parseInt(e,10):0}resetHighScore(){this.highScore=0,localStorage.removeItem("boombox-highscore"),this.showScore()}saveHighScore(){localStorage.setItem("boombox-highscore",this.highScore.toString())}loadMuteState(){return localStorage.getItem("boombox-muted")==="true"}saveMuteState(){localStorage.setItem("boombox-muted",this.isMuted.toString())}initMuteButton(){this.updateMuteButtonState(),this.muteBtn.addEventListener("click",()=>{this.isMuted=!this.isMuted,this.saveMuteState(),this.updateMuteButtonState()})}updateMuteButtonState(){this.muteBtn.classList.toggle("muted",this.isMuted)}getStatsManager(){return this.statsManager}getFirebaseService(){return this.firebaseService}start(){this.msgElm.innerText="",this.initRowsCount=4,this.lastRowColors=[],this.comboCount=0,this.initializeCells(),this.renderBoard(),this.updateCellsPositions(),this.showDifficulty()}initializeCells(){for(let e=0;e<this.initColumnsCount;e++){const t=this.generateNewRowColors(),s=new ss(this.boardElm);for(let i=this.initRowsCount-1;i>=0;i--){const r=new ns({col:e,row:i},t[i]);s.addCell(r)}this.columns.push(s)}}renderBoard(){this.boardElm.innerHTML="";const e=Math.floor(window.innerHeight*.7),t=Math.floor(e/this.gameOverRow);this.boardElm.style.setProperty("--dimension",t+"px"),this.boardElm.style.width=this.initColumnsCount*(t*1.1)+"px",this.boardElm.style.height=e+"px";for(let s=0;s<this.columns.length;s++){const i=this.columns[s];for(let r=i.cells.length-1;r>=0;r--){const o=i.getCell(r);o&&(this.attachCellListeners(o),i.elm.append(o.elm))}this.boardElm.appendChild(i.elm)}this.showScore()}updateCellsPositions(){this.rowsCount=0,this.columns.forEach((e,t)=>{e.cells.forEach((s,i)=>{s.updatePosition({col:t,row:i})}),e.cells.length>this.rowsCount&&(this.rowsCount=e.cells.length,this.rowsCount>=this.gameOverRow&&(this.gameover=!0,this.clearBoard()))})}generateNewRowColors(){const e=this.colorConfigs[this.difficultyMode],t=Object.keys(at).slice(0,e.colors),s=[];for(let i=0;i<this.initColumnsCount;i++){const r=i>0?s[i-1]:null,o=this.lastRowColors[i]||null;let a;if(e.clustering>0&&Math.random()<e.clustering){const l=[r,o].filter(c=>c!==null);l.length>0&&(a=l[Math.floor(Math.random()*l.length)])}else if(e.clustering<0&&Math.random()<Math.abs(e.clustering)){const l=[r,o].filter(d=>d!==null),c=t.filter(d=>!l.includes(at[d]));if(c.length>0){const d=c[Math.floor(Math.random()*c.length)];a=at[d]}}if(!a){const l=t[Math.floor(Math.random()*t.length)];a=at[l]}s.push(a)}return this.lastRowColors=[...s],s}cellClick(e){if(this.gameover||!e||e.readyToBoom||this.isSingleCell(e))return;this.markedCellsPositions=[],this.activatedPowerUps=[],e.powerUp==="rainbow"?this.markRainbowCell(e):(this.currentColor=e.color,this.markRoundCell(e));const t=this.readyToBoomCounter;this.removeMarkedRoundCells(),this.calcScore(),this.showFloatingScore(),t>=3?(this.comboCount++,this.statsManager.recordCombo(this.comboCount),this.comboCount>=2&&this.scorePopup.showCombo(this.comboCount)):this.comboCount=0,this.showScore(),this.addNewCellsToColumns(),this.renderNewCells(),this.updateCellsPositions()}findCell(e,t){var s;return(s=this.columns[e])==null?void 0:s.getCell(t)}markCellForBoom(e){if(e.readyToBoom)return;e.readyToBoom=!0,this.readyToBoomCounter++,e.powerUp&&this.activatedPowerUps.push(e);const t=e.elm.getBoundingClientRect(),s=this.boardElm.getBoundingClientRect();this.markedCellsPositions.push({x:t.left-s.left+t.width/2,y:t.top-s.top+t.height/2,color:e.color})}markRainbowCell(e){this.markCellForBoom(e);const{top:t,bottom:s,left:i,right:r}=this.findSibling(e.col,e.row);t&&!t.readyToBoom&&(t.powerUp==="rainbow"?this.markRainbowCell(t):(this.currentColor=t.color,this.markRoundCell(t))),s&&!s.readyToBoom&&(s.powerUp==="rainbow"?this.markRainbowCell(s):(this.currentColor=s.color,this.markRoundCell(s))),i&&!i.readyToBoom&&(i.powerUp==="rainbow"?this.markRainbowCell(i):(this.currentColor=i.color,this.markRoundCell(i))),r&&!r.readyToBoom&&(r.powerUp==="rainbow"?this.markRainbowCell(r):(this.currentColor=r.color,this.markRoundCell(r)))}markRoundCell(e){this.markCellForBoom(e);const{top:t,bottom:s,left:i,right:r}=this.findSibling(e.col,e.row);t&&!t.readyToBoom&&(t.powerUp==="rainbow"?this.markRainbowCell(t):t.color===this.currentColor&&this.markRoundCell(t)),s&&!s.readyToBoom&&(s.powerUp==="rainbow"?this.markRainbowCell(s):s.color===this.currentColor&&this.markRoundCell(s)),i&&!i.readyToBoom&&(i.powerUp==="rainbow"?this.markRainbowCell(i):i.color===this.currentColor&&this.markRoundCell(i)),r&&!r.readyToBoom&&(r.powerUp==="rainbow"?this.markRainbowCell(r):r.color===this.currentColor&&this.markRoundCell(r))}isSingleCell(e){const{top:t,bottom:s,left:i,right:r}=this.findSibling(e.col,e.row);return e.powerUp==="bomb"||e.powerUp==="lightning"?!1:e.powerUp==="rainbow"?!(t||s||i||r):!(t&&(t.color===e.color||t.powerUp==="rainbow")||s&&(s.color===e.color||s.powerUp==="rainbow")||i&&(i.color===e.color||i.powerUp==="rainbow")||r&&(r.color===e.color||r.powerUp==="rainbow"))}findSibling(e,t){const s=this.findCell(e,t+1),i=this.findCell(e,t-1),r=this.findCell(e-1,t),o=this.findCell(e+1,t);return{top:s,bottom:i,left:r,right:o}}removeMarkedRoundCells(){const e=this.readyToBoomCounter;this.activatePowerUps(),this.columns.forEach(t=>t.boomCells()),this.columns=this.columns.filter(t=>(t.cells.length||t.destroy(),t.cells.length>0)),this.currentColor=null,this.activatedPowerUps=[],this.playFxSounds(),e>=8&&this.triggerScreenShake(e)}activatePowerUps(){const e=new Set;let t=!0;for(;t;){t=!1;for(const s of this.activatedPowerUps)if(!e.has(s)){switch(e.add(s),s.powerUp){case"bomb":this.activateBomb(s);break;case"lightning":this.activateLightning(s);break}this.activatedPowerUps.length>e.size&&(t=!0)}}}markCellForDestruction(e){if(e.readyToBoom)return;e.readyToBoom=!0,this.readyToBoomCounter++;const t=e.elm.getBoundingClientRect(),s=this.boardElm.getBoundingClientRect();this.markedCellsPositions.push({x:t.left-s.left+t.width/2,y:t.top-s.top+t.height/2,color:e.color}),e.powerUp&&e.powerUp!=="rainbow"&&this.activatedPowerUps.push(e)}activateBomb(e){for(let t=-1;t<=1;t++)for(let s=-1;s<=1;s++){const i=this.findCell(e.col+t,e.row+s);i&&this.markCellForDestruction(i)}}activateLightning(e){for(let t=0;t<this.columns.length;t++){const s=this.findCell(t,e.row);s&&this.markCellForDestruction(s)}}triggerScreenShake(e){const t=Math.min(.3+(e-8)*.05,.8);this.boardElm.style.setProperty("--shake-duration",`${t}s`),this.boardElm.classList.add("shake"),setTimeout(()=>{this.boardElm.classList.remove("shake")},t*1e3)}playFxSounds(){if(this.isMuted)return;const e=Math.random()>.5,t=new Audio(e?Uh:Hh),s=Math.min((this.comboCount-1)*.1,.5);t.playbackRate=1+s,t.play()}calcScore(){const e=this.readyToBoomCounter;let t=1;e>30?t=5:e>20?t=4:e>10?t=3:e>5&&(t=2);const s=Math.min(this.comboCount,5),r=e*t*s;this.lastScoreEarned=r,this.firebaseService.addBooms(e),this.score+=r,this.readyToBoomCounter=0,this.statsManager.recordBlocksDestroyed(e),this.score>this.highScore&&(this.highScore=this.score,this.saveHighScore())}showFloatingScore(){if(this.markedCellsPositions.length===0)return;const e=this.markedCellsPositions.reduce((i,r)=>i+r.x,0)/this.markedCellsPositions.length,t=this.markedCellsPositions.reduce((i,r)=>i+r.y,0)/this.markedCellsPositions.length,s=this.markedCellsPositions[0].color;this.scorePopup.showScore(e,t,this.lastScoreEarned,s)}getRandomPowerUp(){if(Math.random()>this.powerUpSpawnChance)return null;const e=["bomb","rainbow","lightning"];return e[Math.floor(Math.random()*e.length)]}showScore(){this.scoreElm.innerText=`SCORE: ${this.score}`,this.highScoreElm.innerText=`BEST: ${this.highScore}`}showDifficulty(){this.difficultyElm.innerText=Wh[this.difficultyMode]}checkHighScore(){return this.score>this.highScore?(this.highScore=this.score,this.saveHighScore(),!0):!1}addNewCellsToColumns(){const e=this.generateNewRowColors();for(let t=0;t<this.initColumnsCount;t++){this.columns[t]||(this.columns[t]=new ss(this.boardElm),this.boardElm.appendChild(this.columns[t].elm));const s=this.getRandomPowerUp(),i=new ns({col:t,row:0},e[t],s);this.columns[t].addCell(i)}}renderNewCells(){for(const e of this.columns){const t=e.getCell(0);t&&(this.attachCellListeners(t),e.elm.append(t.elm))}}attachCellListeners(e){e.elm.addEventListener("click",()=>this.cellClick(e)),e.elm.addEventListener("mouseenter",()=>this.cellHover(e)),e.elm.addEventListener("mouseleave",()=>this.cellHoverEnd())}cellHover(e){this.gameover||this.isSingleCell(e)||(e.powerUp==="rainbow"?this.highlightRainbowConnections(e):e.powerUp==="bomb"?this.highlightBombArea(e):e.powerUp==="lightning"?this.highlightLightningRow(e):this.highlightConnectedCells(e,e.color))}highlightBombArea(e){for(let t=-1;t<=1;t++)for(let s=-1;s<=1;s++){const i=this.findCell(e.col+t,e.row+s);i&&!i.highlighted&&(this.highlightCell(i),this.highlightPowerUpChain(i))}}highlightLightningRow(e){for(let t=0;t<this.columns.length;t++){const s=this.findCell(t,e.row);s&&!s.highlighted&&(this.highlightCell(s),this.highlightPowerUpChain(s))}}highlightPowerUpChain(e){e.powerUp==="bomb"?this.highlightBombArea(e):e.powerUp==="lightning"?this.highlightLightningRow(e):e.powerUp==="rainbow"&&this.highlightRainbowConnections(e)}cellHoverEnd(){this.clearHighlights()}highlightCell(e){e.highlighted||(e.highlighted=!0,this.highlightedCells.push(e))}highlightRainbowConnections(e){this.highlightCell(e);const{top:t,bottom:s,left:i,right:r}=this.findSibling(e.col,e.row);t&&!t.highlighted&&(t.powerUp==="rainbow"?this.highlightRainbowConnections(t):this.highlightConnectedCells(t,t.color)),s&&!s.highlighted&&(s.powerUp==="rainbow"?this.highlightRainbowConnections(s):this.highlightConnectedCells(s,s.color)),i&&!i.highlighted&&(i.powerUp==="rainbow"?this.highlightRainbowConnections(i):this.highlightConnectedCells(i,i.color)),r&&!r.highlighted&&(r.powerUp==="rainbow"?this.highlightRainbowConnections(r):this.highlightConnectedCells(r,r.color))}highlightConnectedCells(e,t){this.highlightCell(e);const{top:s,bottom:i,left:r,right:o}=this.findSibling(e.col,e.row);s&&!s.highlighted&&(s.powerUp==="rainbow"?this.highlightRainbowConnections(s):s.color===t&&this.highlightConnectedCells(s,t)),i&&!i.highlighted&&(i.powerUp==="rainbow"?this.highlightRainbowConnections(i):i.color===t&&this.highlightConnectedCells(i,t)),r&&!r.highlighted&&(r.powerUp==="rainbow"?this.highlightRainbowConnections(r):r.color===t&&this.highlightConnectedCells(r,t)),o&&!o.highlighted&&(o.powerUp==="rainbow"?this.highlightRainbowConnections(o):o.color===t&&this.highlightConnectedCells(o,t))}clearHighlights(){this.highlightedCells.forEach(e=>{e.highlighted=!1}),this.highlightedCells=[]}clearBoard(){this.columns.forEach(s=>{s.cells.forEach(i=>i.destroy()),this.playFxSounds()}),this.statsManager.recordGameEnd(this.score),this.firebaseService.addGamePlayed();const e=this.checkHighScore(),t=this.score;this.scorePopup.showGameOver(t,e),this.scoreElm.innerText="Next round starting...",this.msgElm.innerText="",this.columns=[],this.gameover=!1,this.score=0,setTimeout(()=>{this.start()},5e3)}}function Nr(){const e=(document&&document.documentElement&&document.documentElement.clientHeight||window.innerHeight)*.01;document.documentElement.style.setProperty("--vh",`${e}px`)}Nr();window.addEventListener("resize",Nr);const $h=document.getElementById("board"),Gh=document.getElementById("score"),qh=document.getElementById("msg"),zh=document.getElementById("high-score"),jh=document.getElementById("mute-btn"),Yh=document.getElementById("difficulty"),Kh=document.getElementById("settings-btn"),Ue=document.getElementById("settings-modal"),Qh=document.getElementById("close-settings"),kr=document.querySelectorAll(".diff-btn"),Xh=document.getElementById("diff-desc"),Jh=document.getElementById("stats-btn"),He=document.getElementById("stats-modal"),Zh=document.getElementById("close-stats"),eu=document.getElementById("reset-stats"),we=document.getElementById("reset-confirm-dialog"),tu=document.getElementById("cancel-reset"),nu=document.getElementById("confirm-reset"),su=document.getElementById("stat-games"),iu=document.getElementById("stat-blocks"),ru=document.getElementById("stat-combo"),ou=document.getElementById("stat-total-combos"),au=document.getElementById("stat-highscore"),lu=document.getElementById("stat-playtime"),cu=document.getElementById("global-booms"),hu={easy:"3 colors with clustering - easier to find matching groups",normal:"4 colors evenly distributed - balanced gameplay",hard:"4 colors that avoid neighbors - harder to find matches"};let Te=localStorage.getItem("boombox-difficulty")||"normal";function xr(){kr.forEach(n=>{n.classList.toggle("active",n.dataset.difficulty===Te)}),Xh.textContent=hu[Te]}Kh.addEventListener("click",()=>{Ue.classList.remove("hidden")});Qh.addEventListener("click",()=>{Ue.classList.add("hidden"),localStorage.setItem("boombox-difficulty",Te),Q.setDifficultyConfig(Te),Q.restart()});Ue.addEventListener("click",n=>{n.target===Ue&&Ue.classList.add("hidden")});kr.forEach(n=>{n.addEventListener("click",()=>{Te=n.dataset.difficulty,xr()})});xr();const Q=new Vh($h,Gh,qh,zh,jh,Yh);Q.setDifficultyConfig(Te);Q.start();function Ar(){const n=Q.getStatsManager().getStats();su.textContent=n.gamesPlayed.toLocaleString(),iu.textContent=n.blocksDestroyed.toLocaleString(),ru.textContent=n.biggestCombo.toLocaleString(),ou.textContent=n.totalCombos.toLocaleString(),au.textContent=n.highestScore.toLocaleString(),lu.textContent=Q.getStatsManager().formatPlayTime()}Jh.addEventListener("click",()=>{Ar(),He.classList.remove("hidden")});Zh.addEventListener("click",()=>{He.classList.add("hidden")});eu.addEventListener("click",()=>{we.showModal()});tu.addEventListener("click",()=>{we.close()});nu.addEventListener("click",()=>{Q.getStatsManager().reset(),Q.resetHighScore(),Ar(),we.close()});we.addEventListener("click",n=>{n.target===we&&we.close()});He.addEventListener("click",n=>{n.target===He&&He.classList.add("hidden")});const uu=Q.getFirebaseService();uu.subscribeToStats(n=>{cu.textContent=n.totalBooms.toLocaleString()});
