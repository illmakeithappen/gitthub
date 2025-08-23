function tv(r,o){for(var s=0;s<o.length;s++){const u=o[s];if(typeof u!="string"&&!Array.isArray(u)){for(const d in u)if(d!=="default"&&!(d in r)){const f=Object.getOwnPropertyDescriptor(u,d);f&&Object.defineProperty(r,d,f.get?f:{enumerable:!0,get:()=>u[d]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))u(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function s(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(d){if(d.ep)return;d.ep=!0;const f=s(d);fetch(d.href,f)}})();function Yp(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Al={exports:{}},ji={},Il={exports:{}},he={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uf;function nv(){if(Uf)return he;Uf=1;var r=Symbol.for("react.element"),o=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),f=Symbol.for("react.provider"),h=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),y=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),S=Symbol.iterator;function O(C){return C===null||typeof C!="object"?null:(C=S&&C[S]||C["@@iterator"],typeof C=="function"?C:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,j={};function E(C,L,ae){this.props=C,this.context=L,this.refs=j,this.updater=ae||D}E.prototype.isReactComponent={},E.prototype.setState=function(C,L){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,L,"setState")},E.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function M(){}M.prototype=E.prototype;function B(C,L,ae){this.props=C,this.context=L,this.refs=j,this.updater=ae||D}var H=B.prototype=new M;H.constructor=B,T(H,E.prototype),H.isPureReactComponent=!0;var Y=Array.isArray,q=Object.prototype.hasOwnProperty,G={current:null},K={key:!0,ref:!0,__self:!0,__source:!0};function je(C,L,ae){var le,pe={},de=null,ve=null;if(L!=null)for(le in L.ref!==void 0&&(ve=L.ref),L.key!==void 0&&(de=""+L.key),L)q.call(L,le)&&!K.hasOwnProperty(le)&&(pe[le]=L[le]);var me=arguments.length-2;if(me===1)pe.children=ae;else if(1<me){for(var A=Array(me),oe=0;oe<me;oe++)A[oe]=arguments[oe+2];pe.children=A}if(C&&C.defaultProps)for(le in me=C.defaultProps,me)pe[le]===void 0&&(pe[le]=me[le]);return{$$typeof:r,type:C,key:de,ref:ve,props:pe,_owner:G.current}}function ye(C,L){return{$$typeof:r,type:C.type,key:L,ref:C.ref,props:C.props,_owner:C._owner}}function Xe(C){return typeof C=="object"&&C!==null&&C.$$typeof===r}function it(C){var L={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(ae){return L[ae]})}var Ye=/\/+/g;function Ue(C,L){return typeof C=="object"&&C!==null&&C.key!=null?it(""+C.key):L.toString(36)}function W(C,L,ae,le,pe){var de=typeof C;(de==="undefined"||de==="boolean")&&(C=null);var ve=!1;if(C===null)ve=!0;else switch(de){case"string":case"number":ve=!0;break;case"object":switch(C.$$typeof){case r:case o:ve=!0}}if(ve)return ve=C,pe=pe(ve),C=le===""?"."+Ue(ve,0):le,Y(pe)?(ae="",C!=null&&(ae=C.replace(Ye,"$&/")+"/"),W(pe,L,ae,"",function(oe){return oe})):pe!=null&&(Xe(pe)&&(pe=ye(pe,ae+(!pe.key||ve&&ve.key===pe.key?"":(""+pe.key).replace(Ye,"$&/")+"/")+C)),L.push(pe)),1;if(ve=0,le=le===""?".":le+":",Y(C))for(var me=0;me<C.length;me++){de=C[me];var A=le+Ue(de,me);ve+=W(de,L,ae,A,pe)}else if(A=O(C),typeof A=="function")for(C=A.call(C),me=0;!(de=C.next()).done;)de=de.value,A=le+Ue(de,me++),ve+=W(de,L,ae,A,pe);else if(de==="object")throw L=String(C),Error("Objects are not valid as a React child (found: "+(L==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":L)+"). If you meant to render a collection of children, use an array instead.");return ve}function ge(C,L,ae){if(C==null)return C;var le=[],pe=0;return W(C,le,"","",function(de){return L.call(ae,de,pe++)}),le}function be(C){if(C._status===-1){var L=C._result;L=L(),L.then(function(ae){(C._status===0||C._status===-1)&&(C._status=1,C._result=ae)},function(ae){(C._status===0||C._status===-1)&&(C._status=2,C._result=ae)}),C._status===-1&&(C._status=0,C._result=L)}if(C._status===1)return C._result.default;throw C._result}var ke={current:null},V={transition:null},ee={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:V,ReactCurrentOwner:G};function Q(){throw Error("act(...) is not supported in production builds of React.")}return he.Children={map:ge,forEach:function(C,L,ae){ge(C,function(){L.apply(this,arguments)},ae)},count:function(C){var L=0;return ge(C,function(){L++}),L},toArray:function(C){return ge(C,function(L){return L})||[]},only:function(C){if(!Xe(C))throw Error("React.Children.only expected to receive a single React element child.");return C}},he.Component=E,he.Fragment=s,he.Profiler=d,he.PureComponent=B,he.StrictMode=u,he.Suspense=y,he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ee,he.act=Q,he.cloneElement=function(C,L,ae){if(C==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+C+".");var le=T({},C.props),pe=C.key,de=C.ref,ve=C._owner;if(L!=null){if(L.ref!==void 0&&(de=L.ref,ve=G.current),L.key!==void 0&&(pe=""+L.key),C.type&&C.type.defaultProps)var me=C.type.defaultProps;for(A in L)q.call(L,A)&&!K.hasOwnProperty(A)&&(le[A]=L[A]===void 0&&me!==void 0?me[A]:L[A])}var A=arguments.length-2;if(A===1)le.children=ae;else if(1<A){me=Array(A);for(var oe=0;oe<A;oe++)me[oe]=arguments[oe+2];le.children=me}return{$$typeof:r,type:C.type,key:pe,ref:de,props:le,_owner:ve}},he.createContext=function(C){return C={$$typeof:h,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},C.Provider={$$typeof:f,_context:C},C.Consumer=C},he.createElement=je,he.createFactory=function(C){var L=je.bind(null,C);return L.type=C,L},he.createRef=function(){return{current:null}},he.forwardRef=function(C){return{$$typeof:m,render:C}},he.isValidElement=Xe,he.lazy=function(C){return{$$typeof:k,_payload:{_status:-1,_result:C},_init:be}},he.memo=function(C,L){return{$$typeof:x,type:C,compare:L===void 0?null:L}},he.startTransition=function(C){var L=V.transition;V.transition={};try{C()}finally{V.transition=L}},he.unstable_act=Q,he.useCallback=function(C,L){return ke.current.useCallback(C,L)},he.useContext=function(C){return ke.current.useContext(C)},he.useDebugValue=function(){},he.useDeferredValue=function(C){return ke.current.useDeferredValue(C)},he.useEffect=function(C,L){return ke.current.useEffect(C,L)},he.useId=function(){return ke.current.useId()},he.useImperativeHandle=function(C,L,ae){return ke.current.useImperativeHandle(C,L,ae)},he.useInsertionEffect=function(C,L){return ke.current.useInsertionEffect(C,L)},he.useLayoutEffect=function(C,L){return ke.current.useLayoutEffect(C,L)},he.useMemo=function(C,L){return ke.current.useMemo(C,L)},he.useReducer=function(C,L,ae){return ke.current.useReducer(C,L,ae)},he.useRef=function(C){return ke.current.useRef(C)},he.useState=function(C){return ke.current.useState(C)},he.useSyncExternalStore=function(C,L,ae){return ke.current.useSyncExternalStore(C,L,ae)},he.useTransition=function(){return ke.current.useTransition()},he.version="18.3.1",he}var Hf;function Fu(){return Hf||(Hf=1,Il.exports=nv()),Il.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wf;function rv(){if(Wf)return ji;Wf=1;var r=Fu(),o=Symbol.for("react.element"),s=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,d=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,f={key:!0,ref:!0,__self:!0,__source:!0};function h(m,y,x){var k,S={},O=null,D=null;x!==void 0&&(O=""+x),y.key!==void 0&&(O=""+y.key),y.ref!==void 0&&(D=y.ref);for(k in y)u.call(y,k)&&!f.hasOwnProperty(k)&&(S[k]=y[k]);if(m&&m.defaultProps)for(k in y=m.defaultProps,y)S[k]===void 0&&(S[k]=y[k]);return{$$typeof:o,type:m,key:O,ref:D,props:S,_owner:d.current}}return ji.Fragment=s,ji.jsx=h,ji.jsxs=h,ji}var Vf;function iv(){return Vf||(Vf=1,Al.exports=rv()),Al.exports}var l=iv(),N=Fu();const Xn=Yp(N),ov=tv({__proto__:null,default:Xn},[N]);var Yo={},Fl={exports:{}},pt={},Dl={exports:{}},$l={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf;function sv(){return qf||(qf=1,(function(r){function o(V,ee){var Q=V.length;V.push(ee);e:for(;0<Q;){var C=Q-1>>>1,L=V[C];if(0<d(L,ee))V[C]=ee,V[Q]=L,Q=C;else break e}}function s(V){return V.length===0?null:V[0]}function u(V){if(V.length===0)return null;var ee=V[0],Q=V.pop();if(Q!==ee){V[0]=Q;e:for(var C=0,L=V.length,ae=L>>>1;C<ae;){var le=2*(C+1)-1,pe=V[le],de=le+1,ve=V[de];if(0>d(pe,Q))de<L&&0>d(ve,pe)?(V[C]=ve,V[de]=Q,C=de):(V[C]=pe,V[le]=Q,C=le);else if(de<L&&0>d(ve,Q))V[C]=ve,V[de]=Q,C=de;else break e}}return ee}function d(V,ee){var Q=V.sortIndex-ee.sortIndex;return Q!==0?Q:V.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var f=performance;r.unstable_now=function(){return f.now()}}else{var h=Date,m=h.now();r.unstable_now=function(){return h.now()-m}}var y=[],x=[],k=1,S=null,O=3,D=!1,T=!1,j=!1,E=typeof setTimeout=="function"?setTimeout:null,M=typeof clearTimeout=="function"?clearTimeout:null,B=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function H(V){for(var ee=s(x);ee!==null;){if(ee.callback===null)u(x);else if(ee.startTime<=V)u(x),ee.sortIndex=ee.expirationTime,o(y,ee);else break;ee=s(x)}}function Y(V){if(j=!1,H(V),!T)if(s(y)!==null)T=!0,be(q);else{var ee=s(x);ee!==null&&ke(Y,ee.startTime-V)}}function q(V,ee){T=!1,j&&(j=!1,M(je),je=-1),D=!0;var Q=O;try{for(H(ee),S=s(y);S!==null&&(!(S.expirationTime>ee)||V&&!it());){var C=S.callback;if(typeof C=="function"){S.callback=null,O=S.priorityLevel;var L=C(S.expirationTime<=ee);ee=r.unstable_now(),typeof L=="function"?S.callback=L:S===s(y)&&u(y),H(ee)}else u(y);S=s(y)}if(S!==null)var ae=!0;else{var le=s(x);le!==null&&ke(Y,le.startTime-ee),ae=!1}return ae}finally{S=null,O=Q,D=!1}}var G=!1,K=null,je=-1,ye=5,Xe=-1;function it(){return!(r.unstable_now()-Xe<ye)}function Ye(){if(K!==null){var V=r.unstable_now();Xe=V;var ee=!0;try{ee=K(!0,V)}finally{ee?Ue():(G=!1,K=null)}}else G=!1}var Ue;if(typeof B=="function")Ue=function(){B(Ye)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,ge=W.port2;W.port1.onmessage=Ye,Ue=function(){ge.postMessage(null)}}else Ue=function(){E(Ye,0)};function be(V){K=V,G||(G=!0,Ue())}function ke(V,ee){je=E(function(){V(r.unstable_now())},ee)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(V){V.callback=null},r.unstable_continueExecution=function(){T||D||(T=!0,be(q))},r.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ye=0<V?Math.floor(1e3/V):5},r.unstable_getCurrentPriorityLevel=function(){return O},r.unstable_getFirstCallbackNode=function(){return s(y)},r.unstable_next=function(V){switch(O){case 1:case 2:case 3:var ee=3;break;default:ee=O}var Q=O;O=ee;try{return V()}finally{O=Q}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(V,ee){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var Q=O;O=V;try{return ee()}finally{O=Q}},r.unstable_scheduleCallback=function(V,ee,Q){var C=r.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?C+Q:C):Q=C,V){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=Q+L,V={id:k++,callback:ee,priorityLevel:V,startTime:Q,expirationTime:L,sortIndex:-1},Q>C?(V.sortIndex=Q,o(x,V),s(y)===null&&V===s(x)&&(j?(M(je),je=-1):j=!0,ke(Y,Q-C))):(V.sortIndex=L,o(y,V),T||D||(T=!0,be(q))),V},r.unstable_shouldYield=it,r.unstable_wrapCallback=function(V){var ee=O;return function(){var Q=O;O=ee;try{return V.apply(this,arguments)}finally{O=Q}}}})($l)),$l}var Gf;function av(){return Gf||(Gf=1,Dl.exports=sv()),Dl.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qf;function lv(){if(Qf)return pt;Qf=1;var r=Fu(),o=av();function s(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var u=new Set,d={};function f(e,t){h(e,t),h(e+"Capture",t)}function h(e,t){for(d[e]=t,e=0;e<t.length;e++)u.add(t[e])}var m=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),y=Object.prototype.hasOwnProperty,x=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,k={},S={};function O(e){return y.call(S,e)?!0:y.call(k,e)?!1:x.test(e)?S[e]=!0:(k[e]=!0,!1)}function D(e,t,n,i){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function T(e,t,n,i){if(t===null||typeof t>"u"||D(e,t,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function j(e,t,n,i,a,c,p){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=c,this.removeEmptyString=p}var E={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){E[e]=new j(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];E[t]=new j(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){E[e]=new j(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){E[e]=new j(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){E[e]=new j(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){E[e]=new j(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){E[e]=new j(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){E[e]=new j(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){E[e]=new j(e,5,!1,e.toLowerCase(),null,!1,!1)});var M=/[\-:]([a-z])/g;function B(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(M,B);E[t]=new j(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(M,B);E[t]=new j(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(M,B);E[t]=new j(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){E[e]=new j(e,1,!1,e.toLowerCase(),null,!1,!1)}),E.xlinkHref=new j("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){E[e]=new j(e,1,!1,e.toLowerCase(),null,!0,!0)});function H(e,t,n,i){var a=E.hasOwnProperty(t)?E[t]:null;(a!==null?a.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(T(t,n,a,i)&&(n=null),i||a===null?O(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,i=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,i?e.setAttributeNS(i,t,n):e.setAttribute(t,n))))}var Y=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,q=Symbol.for("react.element"),G=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),je=Symbol.for("react.strict_mode"),ye=Symbol.for("react.profiler"),Xe=Symbol.for("react.provider"),it=Symbol.for("react.context"),Ye=Symbol.for("react.forward_ref"),Ue=Symbol.for("react.suspense"),W=Symbol.for("react.suspense_list"),ge=Symbol.for("react.memo"),be=Symbol.for("react.lazy"),ke=Symbol.for("react.offscreen"),V=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=V&&e[V]||e["@@iterator"],typeof e=="function"?e:null)}var Q=Object.assign,C;function L(e){if(C===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);C=t&&t[1]||""}return`
`+C+e}var ae=!1;function le(e,t){if(!e||ae)return"";ae=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(P){var i=P}Reflect.construct(e,[],t)}else{try{t.call()}catch(P){i=P}e.call(t.prototype)}else{try{throw Error()}catch(P){i=P}e()}}catch(P){if(P&&i&&typeof P.stack=="string"){for(var a=P.stack.split(`
`),c=i.stack.split(`
`),p=a.length-1,v=c.length-1;1<=p&&0<=v&&a[p]!==c[v];)v--;for(;1<=p&&0<=v;p--,v--)if(a[p]!==c[v]){if(p!==1||v!==1)do if(p--,v--,0>v||a[p]!==c[v]){var w=`
`+a[p].replace(" at new "," at ");return e.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",e.displayName)),w}while(1<=p&&0<=v);break}}}finally{ae=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?L(e):""}function pe(e){switch(e.tag){case 5:return L(e.type);case 16:return L("Lazy");case 13:return L("Suspense");case 19:return L("SuspenseList");case 0:case 2:case 15:return e=le(e.type,!1),e;case 11:return e=le(e.type.render,!1),e;case 1:return e=le(e.type,!0),e;default:return""}}function de(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case K:return"Fragment";case G:return"Portal";case ye:return"Profiler";case je:return"StrictMode";case Ue:return"Suspense";case W:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case it:return(e.displayName||"Context")+".Consumer";case Xe:return(e._context.displayName||"Context")+".Provider";case Ye:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ge:return t=e.displayName||null,t!==null?t:de(e.type)||"Memo";case be:t=e._payload,e=e._init;try{return de(e(t))}catch{}}return null}function ve(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(t);case 8:return t===je?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function me(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function A(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function oe(e){var t=A(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,c=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(p){i=""+p,c.call(this,p)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(p){i=""+p},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ae(e){e._valueTracker||(e._valueTracker=oe(e))}function Ee(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=A(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Ie(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function at(e,t){var n=t.checked;return Q({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Qu(e,t){var n=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;n=me(t.value!=null?t.value:n),e._wrapperState={initialChecked:i,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Yu(e,t){t=t.checked,t!=null&&H(e,"checked",t,!1)}function Hs(e,t){Yu(e,t);var n=me(t.value),i=t.type;if(n!=null)i==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ws(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ws(e,t.type,me(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ku(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ws(e,t,n){(t!=="number"||Ie(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var $r=Array.isArray;function tr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+me(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Vs(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(s(91));return Q({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ju(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(s(92));if($r(n)){if(1<n.length)throw Error(s(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:me(n)}}function Xu(e,t){var n=me(t.value),i=me(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),i!=null&&(e.defaultValue=""+i)}function Zu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ec(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function qs(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ec(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Mi,tc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,i,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,i,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Mi=Mi||document.createElement("div"),Mi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Mi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Br={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},og=["Webkit","ms","Moz","O"];Object.keys(Br).forEach(function(e){og.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Br[t]=Br[e]})});function nc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Br.hasOwnProperty(e)&&Br[e]?(""+t).trim():t+"px"}function rc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var i=n.indexOf("--")===0,a=nc(n,t[n],i);n==="float"&&(n="cssFloat"),i?e.setProperty(n,a):e[n]=a}}var sg=Q({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Gs(e,t){if(t){if(sg[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(s(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(s(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(s(61))}if(t.style!=null&&typeof t.style!="object")throw Error(s(62))}}function Qs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ys=null;function Ks(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Js=null,nr=null,rr=null;function ic(e){if(e=ui(e)){if(typeof Js!="function")throw Error(s(280));var t=e.stateNode;t&&(t=uo(t),Js(e.stateNode,e.type,t))}}function oc(e){nr?rr?rr.push(e):rr=[e]:nr=e}function sc(){if(nr){var e=nr,t=rr;if(rr=nr=null,ic(e),t)for(e=0;e<t.length;e++)ic(t[e])}}function ac(e,t){return e(t)}function lc(){}var Xs=!1;function uc(e,t,n){if(Xs)return e(t,n);Xs=!0;try{return ac(e,t,n)}finally{Xs=!1,(nr!==null||rr!==null)&&(lc(),sc())}}function Ur(e,t){var n=e.stateNode;if(n===null)return null;var i=uo(n);if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(s(231,t,typeof n));return n}var Zs=!1;if(m)try{var Hr={};Object.defineProperty(Hr,"passive",{get:function(){Zs=!0}}),window.addEventListener("test",Hr,Hr),window.removeEventListener("test",Hr,Hr)}catch{Zs=!1}function ag(e,t,n,i,a,c,p,v,w){var P=Array.prototype.slice.call(arguments,3);try{t.apply(n,P)}catch(F){this.onError(F)}}var Wr=!1,Bi=null,Ui=!1,ea=null,lg={onError:function(e){Wr=!0,Bi=e}};function ug(e,t,n,i,a,c,p,v,w){Wr=!1,Bi=null,ag.apply(lg,arguments)}function cg(e,t,n,i,a,c,p,v,w){if(ug.apply(this,arguments),Wr){if(Wr){var P=Bi;Wr=!1,Bi=null}else throw Error(s(198));Ui||(Ui=!0,ea=P)}}function Pn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function cc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function dc(e){if(Pn(e)!==e)throw Error(s(188))}function dg(e){var t=e.alternate;if(!t){if(t=Pn(e),t===null)throw Error(s(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var c=a.alternate;if(c===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===c.child){for(c=a.child;c;){if(c===n)return dc(a),e;if(c===i)return dc(a),t;c=c.sibling}throw Error(s(188))}if(n.return!==i.return)n=a,i=c;else{for(var p=!1,v=a.child;v;){if(v===n){p=!0,n=a,i=c;break}if(v===i){p=!0,i=a,n=c;break}v=v.sibling}if(!p){for(v=c.child;v;){if(v===n){p=!0,n=c,i=a;break}if(v===i){p=!0,i=c,n=a;break}v=v.sibling}if(!p)throw Error(s(189))}}if(n.alternate!==i)throw Error(s(190))}if(n.tag!==3)throw Error(s(188));return n.stateNode.current===n?e:t}function fc(e){return e=dg(e),e!==null?pc(e):null}function pc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=pc(e);if(t!==null)return t;e=e.sibling}return null}var hc=o.unstable_scheduleCallback,gc=o.unstable_cancelCallback,fg=o.unstable_shouldYield,pg=o.unstable_requestPaint,Fe=o.unstable_now,hg=o.unstable_getCurrentPriorityLevel,ta=o.unstable_ImmediatePriority,mc=o.unstable_UserBlockingPriority,Hi=o.unstable_NormalPriority,gg=o.unstable_LowPriority,vc=o.unstable_IdlePriority,Wi=null,Mt=null;function mg(e){if(Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Wi,e,void 0,(e.current.flags&128)===128)}catch{}}var Tt=Math.clz32?Math.clz32:xg,vg=Math.log,yg=Math.LN2;function xg(e){return e>>>=0,e===0?32:31-(vg(e)/yg|0)|0}var Vi=64,qi=4194304;function Vr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gi(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,a=e.suspendedLanes,c=e.pingedLanes,p=n&268435455;if(p!==0){var v=p&~a;v!==0?i=Vr(v):(c&=p,c!==0&&(i=Vr(c)))}else p=n&~a,p!==0?i=Vr(p):c!==0&&(i=Vr(c));if(i===0)return 0;if(t!==0&&t!==i&&(t&a)===0&&(a=i&-i,c=t&-t,a>=c||a===16&&(c&4194240)!==0))return t;if((i&4)!==0&&(i|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)n=31-Tt(t),a=1<<n,i|=e[n],t&=~a;return i}function wg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bg(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,c=e.pendingLanes;0<c;){var p=31-Tt(c),v=1<<p,w=a[p];w===-1?((v&n)===0||(v&i)!==0)&&(a[p]=wg(v,t)):w<=t&&(e.expiredLanes|=v),c&=~v}}function na(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function yc(){var e=Vi;return Vi<<=1,(Vi&4194240)===0&&(Vi=64),e}function ra(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function qr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Tt(t),e[t]=n}function kg(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-Tt(n),c=1<<a;t[a]=0,i[a]=-1,e[a]=-1,n&=~c}}function ia(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Tt(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}var Ce=0;function xc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var wc,oa,bc,kc,Sc,sa=!1,Qi=[],rn=null,on=null,sn=null,Gr=new Map,Qr=new Map,an=[],Sg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function jc(e,t){switch(e){case"focusin":case"focusout":rn=null;break;case"dragenter":case"dragleave":on=null;break;case"mouseover":case"mouseout":sn=null;break;case"pointerover":case"pointerout":Gr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qr.delete(t.pointerId)}}function Yr(e,t,n,i,a,c){return e===null||e.nativeEvent!==c?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:c,targetContainers:[a]},t!==null&&(t=ui(t),t!==null&&oa(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function jg(e,t,n,i,a){switch(t){case"focusin":return rn=Yr(rn,e,t,n,i,a),!0;case"dragenter":return on=Yr(on,e,t,n,i,a),!0;case"mouseover":return sn=Yr(sn,e,t,n,i,a),!0;case"pointerover":var c=a.pointerId;return Gr.set(c,Yr(Gr.get(c)||null,e,t,n,i,a)),!0;case"gotpointercapture":return c=a.pointerId,Qr.set(c,Yr(Qr.get(c)||null,e,t,n,i,a)),!0}return!1}function Cc(e){var t=Tn(e.target);if(t!==null){var n=Pn(t);if(n!==null){if(t=n.tag,t===13){if(t=cc(n),t!==null){e.blockedOn=t,Sc(e.priority,function(){bc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Yi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=la(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Ys=i,n.target.dispatchEvent(i),Ys=null}else return t=ui(n),t!==null&&oa(t),e.blockedOn=n,!1;t.shift()}return!0}function Ec(e,t,n){Yi(e)&&n.delete(t)}function Cg(){sa=!1,rn!==null&&Yi(rn)&&(rn=null),on!==null&&Yi(on)&&(on=null),sn!==null&&Yi(sn)&&(sn=null),Gr.forEach(Ec),Qr.forEach(Ec)}function Kr(e,t){e.blockedOn===t&&(e.blockedOn=null,sa||(sa=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Cg)))}function Jr(e){function t(a){return Kr(a,e)}if(0<Qi.length){Kr(Qi[0],e);for(var n=1;n<Qi.length;n++){var i=Qi[n];i.blockedOn===e&&(i.blockedOn=null)}}for(rn!==null&&Kr(rn,e),on!==null&&Kr(on,e),sn!==null&&Kr(sn,e),Gr.forEach(t),Qr.forEach(t),n=0;n<an.length;n++)i=an[n],i.blockedOn===e&&(i.blockedOn=null);for(;0<an.length&&(n=an[0],n.blockedOn===null);)Cc(n),n.blockedOn===null&&an.shift()}var ir=Y.ReactCurrentBatchConfig,Ki=!0;function Eg(e,t,n,i){var a=Ce,c=ir.transition;ir.transition=null;try{Ce=1,aa(e,t,n,i)}finally{Ce=a,ir.transition=c}}function Rg(e,t,n,i){var a=Ce,c=ir.transition;ir.transition=null;try{Ce=4,aa(e,t,n,i)}finally{Ce=a,ir.transition=c}}function aa(e,t,n,i){if(Ki){var a=la(e,t,n,i);if(a===null)Ca(e,t,i,Ji,n),jc(e,i);else if(jg(a,e,t,n,i))i.stopPropagation();else if(jc(e,i),t&4&&-1<Sg.indexOf(e)){for(;a!==null;){var c=ui(a);if(c!==null&&wc(c),c=la(e,t,n,i),c===null&&Ca(e,t,i,Ji,n),c===a)break;a=c}a!==null&&i.stopPropagation()}else Ca(e,t,i,null,n)}}var Ji=null;function la(e,t,n,i){if(Ji=null,e=Ks(i),e=Tn(e),e!==null)if(t=Pn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=cc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ji=e,null}function Rc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hg()){case ta:return 1;case mc:return 4;case Hi:case gg:return 16;case vc:return 536870912;default:return 16}default:return 16}}var ln=null,ua=null,Xi=null;function _c(){if(Xi)return Xi;var e,t=ua,n=t.length,i,a="value"in ln?ln.value:ln.textContent,c=a.length;for(e=0;e<n&&t[e]===a[e];e++);var p=n-e;for(i=1;i<=p&&t[n-i]===a[c-i];i++);return Xi=a.slice(e,1<i?1-i:void 0)}function Zi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function eo(){return!0}function Pc(){return!1}function vt(e){function t(n,i,a,c,p){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=c,this.target=p,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(n=e[v],this[v]=n?n(c):c[v]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?eo:Pc,this.isPropagationStopped=Pc,this}return Q(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=eo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=eo)},persist:function(){},isPersistent:eo}),t}var or={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ca=vt(or),Xr=Q({},or,{view:0,detail:0}),_g=vt(Xr),da,fa,Zr,to=Q({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ha,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zr&&(Zr&&e.type==="mousemove"?(da=e.screenX-Zr.screenX,fa=e.screenY-Zr.screenY):fa=da=0,Zr=e),da)},movementY:function(e){return"movementY"in e?e.movementY:fa}}),Tc=vt(to),Pg=Q({},to,{dataTransfer:0}),Tg=vt(Pg),zg=Q({},Xr,{relatedTarget:0}),pa=vt(zg),Ng=Q({},or,{animationName:0,elapsedTime:0,pseudoElement:0}),Lg=vt(Ng),Og=Q({},or,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ag=vt(Og),Ig=Q({},or,{data:0}),zc=vt(Ig),Fg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Dg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$g={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Mg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$g[e])?!!t[e]:!1}function ha(){return Mg}var Bg=Q({},Xr,{key:function(e){if(e.key){var t=Fg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Zi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Dg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ha,charCode:function(e){return e.type==="keypress"?Zi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ug=vt(Bg),Hg=Q({},to,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nc=vt(Hg),Wg=Q({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ha}),Vg=vt(Wg),qg=Q({},or,{propertyName:0,elapsedTime:0,pseudoElement:0}),Gg=vt(qg),Qg=Q({},to,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Yg=vt(Qg),Kg=[9,13,27,32],ga=m&&"CompositionEvent"in window,ei=null;m&&"documentMode"in document&&(ei=document.documentMode);var Jg=m&&"TextEvent"in window&&!ei,Lc=m&&(!ga||ei&&8<ei&&11>=ei),Oc=" ",Ac=!1;function Ic(e,t){switch(e){case"keyup":return Kg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Fc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var sr=!1;function Xg(e,t){switch(e){case"compositionend":return Fc(t);case"keypress":return t.which!==32?null:(Ac=!0,Oc);case"textInput":return e=t.data,e===Oc&&Ac?null:e;default:return null}}function Zg(e,t){if(sr)return e==="compositionend"||!ga&&Ic(e,t)?(e=_c(),Xi=ua=ln=null,sr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Lc&&t.locale!=="ko"?null:t.data;default:return null}}var em={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!em[e.type]:t==="textarea"}function $c(e,t,n,i){oc(i),t=so(t,"onChange"),0<t.length&&(n=new ca("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var ti=null,ni=null;function tm(e){rd(e,0)}function no(e){var t=dr(e);if(Ee(t))return e}function nm(e,t){if(e==="change")return t}var Mc=!1;if(m){var ma;if(m){var va="oninput"in document;if(!va){var Bc=document.createElement("div");Bc.setAttribute("oninput","return;"),va=typeof Bc.oninput=="function"}ma=va}else ma=!1;Mc=ma&&(!document.documentMode||9<document.documentMode)}function Uc(){ti&&(ti.detachEvent("onpropertychange",Hc),ni=ti=null)}function Hc(e){if(e.propertyName==="value"&&no(ni)){var t=[];$c(t,ni,e,Ks(e)),uc(tm,t)}}function rm(e,t,n){e==="focusin"?(Uc(),ti=t,ni=n,ti.attachEvent("onpropertychange",Hc)):e==="focusout"&&Uc()}function im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return no(ni)}function om(e,t){if(e==="click")return no(t)}function sm(e,t){if(e==="input"||e==="change")return no(t)}function am(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zt=typeof Object.is=="function"?Object.is:am;function ri(e,t){if(zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!y.call(t,a)||!zt(e[a],t[a]))return!1}return!0}function Wc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vc(e,t){var n=Wc(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Wc(n)}}function qc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=Ie();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ie(e.document)}return t}function ya(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function lm(e){var t=Gc(),n=e.focusedElem,i=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&qc(n.ownerDocument.documentElement,n)){if(i!==null&&ya(n)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,c=Math.min(i.start,a);i=i.end===void 0?c:Math.min(i.end,a),!e.extend&&c>i&&(a=i,i=c,c=a),a=Vc(n,c);var p=Vc(n,i);a&&p&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==p.node||e.focusOffset!==p.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),c>i?(e.addRange(t),e.extend(p.node,p.offset)):(t.setEnd(p.node,p.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var um=m&&"documentMode"in document&&11>=document.documentMode,ar=null,xa=null,ii=null,wa=!1;function Qc(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wa||ar==null||ar!==Ie(i)||(i=ar,"selectionStart"in i&&ya(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ii&&ri(ii,i)||(ii=i,i=so(xa,"onSelect"),0<i.length&&(t=new ca("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=ar)))}function ro(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var lr={animationend:ro("Animation","AnimationEnd"),animationiteration:ro("Animation","AnimationIteration"),animationstart:ro("Animation","AnimationStart"),transitionend:ro("Transition","TransitionEnd")},ba={},Yc={};m&&(Yc=document.createElement("div").style,"AnimationEvent"in window||(delete lr.animationend.animation,delete lr.animationiteration.animation,delete lr.animationstart.animation),"TransitionEvent"in window||delete lr.transitionend.transition);function io(e){if(ba[e])return ba[e];if(!lr[e])return e;var t=lr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yc)return ba[e]=t[n];return e}var Kc=io("animationend"),Jc=io("animationiteration"),Xc=io("animationstart"),Zc=io("transitionend"),ed=new Map,td="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function un(e,t){ed.set(e,t),f(t,[e])}for(var ka=0;ka<td.length;ka++){var Sa=td[ka],cm=Sa.toLowerCase(),dm=Sa[0].toUpperCase()+Sa.slice(1);un(cm,"on"+dm)}un(Kc,"onAnimationEnd"),un(Jc,"onAnimationIteration"),un(Xc,"onAnimationStart"),un("dblclick","onDoubleClick"),un("focusin","onFocus"),un("focusout","onBlur"),un(Zc,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),f("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),f("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),f("onBeforeInput",["compositionend","keypress","textInput","paste"]),f("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),f("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fm=new Set("cancel close invalid load scroll toggle".split(" ").concat(oi));function nd(e,t,n){var i=e.type||"unknown-event";e.currentTarget=n,cg(i,t,void 0,e),e.currentTarget=null}function rd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;e:{var c=void 0;if(t)for(var p=i.length-1;0<=p;p--){var v=i[p],w=v.instance,P=v.currentTarget;if(v=v.listener,w!==c&&a.isPropagationStopped())break e;nd(a,v,P),c=w}else for(p=0;p<i.length;p++){if(v=i[p],w=v.instance,P=v.currentTarget,v=v.listener,w!==c&&a.isPropagationStopped())break e;nd(a,v,P),c=w}}}if(Ui)throw e=ea,Ui=!1,ea=null,e}function _e(e,t){var n=t[za];n===void 0&&(n=t[za]=new Set);var i=e+"__bubble";n.has(i)||(id(t,e,2,!1),n.add(i))}function ja(e,t,n){var i=0;t&&(i|=4),id(n,e,i,t)}var oo="_reactListening"+Math.random().toString(36).slice(2);function si(e){if(!e[oo]){e[oo]=!0,u.forEach(function(n){n!=="selectionchange"&&(fm.has(n)||ja(n,!1,e),ja(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[oo]||(t[oo]=!0,ja("selectionchange",!1,t))}}function id(e,t,n,i){switch(Rc(t)){case 1:var a=Eg;break;case 4:a=Rg;break;default:a=aa}n=a.bind(null,t,n,e),a=void 0,!Zs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Ca(e,t,n,i,a){var c=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var p=i.tag;if(p===3||p===4){var v=i.stateNode.containerInfo;if(v===a||v.nodeType===8&&v.parentNode===a)break;if(p===4)for(p=i.return;p!==null;){var w=p.tag;if((w===3||w===4)&&(w=p.stateNode.containerInfo,w===a||w.nodeType===8&&w.parentNode===a))return;p=p.return}for(;v!==null;){if(p=Tn(v),p===null)return;if(w=p.tag,w===5||w===6){i=c=p;continue e}v=v.parentNode}}i=i.return}uc(function(){var P=c,F=Ks(n),$=[];e:{var I=ed.get(e);if(I!==void 0){var J=ca,Z=e;switch(e){case"keypress":if(Zi(n)===0)break e;case"keydown":case"keyup":J=Ug;break;case"focusin":Z="focus",J=pa;break;case"focusout":Z="blur",J=pa;break;case"beforeblur":case"afterblur":J=pa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":J=Tc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":J=Tg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":J=Vg;break;case Kc:case Jc:case Xc:J=Lg;break;case Zc:J=Gg;break;case"scroll":J=_g;break;case"wheel":J=Yg;break;case"copy":case"cut":case"paste":J=Ag;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":J=Nc}var te=(t&4)!==0,De=!te&&e==="scroll",R=te?I!==null?I+"Capture":null:I;te=[];for(var b=P,_;b!==null;){_=b;var U=_.stateNode;if(_.tag===5&&U!==null&&(_=U,R!==null&&(U=Ur(b,R),U!=null&&te.push(ai(b,U,_)))),De)break;b=b.return}0<te.length&&(I=new J(I,Z,null,n,F),$.push({event:I,listeners:te}))}}if((t&7)===0){e:{if(I=e==="mouseover"||e==="pointerover",J=e==="mouseout"||e==="pointerout",I&&n!==Ys&&(Z=n.relatedTarget||n.fromElement)&&(Tn(Z)||Z[Gt]))break e;if((J||I)&&(I=F.window===F?F:(I=F.ownerDocument)?I.defaultView||I.parentWindow:window,J?(Z=n.relatedTarget||n.toElement,J=P,Z=Z?Tn(Z):null,Z!==null&&(De=Pn(Z),Z!==De||Z.tag!==5&&Z.tag!==6)&&(Z=null)):(J=null,Z=P),J!==Z)){if(te=Tc,U="onMouseLeave",R="onMouseEnter",b="mouse",(e==="pointerout"||e==="pointerover")&&(te=Nc,U="onPointerLeave",R="onPointerEnter",b="pointer"),De=J==null?I:dr(J),_=Z==null?I:dr(Z),I=new te(U,b+"leave",J,n,F),I.target=De,I.relatedTarget=_,U=null,Tn(F)===P&&(te=new te(R,b+"enter",Z,n,F),te.target=_,te.relatedTarget=De,U=te),De=U,J&&Z)t:{for(te=J,R=Z,b=0,_=te;_;_=ur(_))b++;for(_=0,U=R;U;U=ur(U))_++;for(;0<b-_;)te=ur(te),b--;for(;0<_-b;)R=ur(R),_--;for(;b--;){if(te===R||R!==null&&te===R.alternate)break t;te=ur(te),R=ur(R)}te=null}else te=null;J!==null&&od($,I,J,te,!1),Z!==null&&De!==null&&od($,De,Z,te,!0)}}e:{if(I=P?dr(P):window,J=I.nodeName&&I.nodeName.toLowerCase(),J==="select"||J==="input"&&I.type==="file")var ne=nm;else if(Dc(I))if(Mc)ne=sm;else{ne=im;var re=rm}else(J=I.nodeName)&&J.toLowerCase()==="input"&&(I.type==="checkbox"||I.type==="radio")&&(ne=om);if(ne&&(ne=ne(e,P))){$c($,ne,n,F);break e}re&&re(e,I,P),e==="focusout"&&(re=I._wrapperState)&&re.controlled&&I.type==="number"&&Ws(I,"number",I.value)}switch(re=P?dr(P):window,e){case"focusin":(Dc(re)||re.contentEditable==="true")&&(ar=re,xa=P,ii=null);break;case"focusout":ii=xa=ar=null;break;case"mousedown":wa=!0;break;case"contextmenu":case"mouseup":case"dragend":wa=!1,Qc($,n,F);break;case"selectionchange":if(um)break;case"keydown":case"keyup":Qc($,n,F)}var ie;if(ga)e:{switch(e){case"compositionstart":var se="onCompositionStart";break e;case"compositionend":se="onCompositionEnd";break e;case"compositionupdate":se="onCompositionUpdate";break e}se=void 0}else sr?Ic(e,n)&&(se="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(se="onCompositionStart");se&&(Lc&&n.locale!=="ko"&&(sr||se!=="onCompositionStart"?se==="onCompositionEnd"&&sr&&(ie=_c()):(ln=F,ua="value"in ln?ln.value:ln.textContent,sr=!0)),re=so(P,se),0<re.length&&(se=new zc(se,e,null,n,F),$.push({event:se,listeners:re}),ie?se.data=ie:(ie=Fc(n),ie!==null&&(se.data=ie)))),(ie=Jg?Xg(e,n):Zg(e,n))&&(P=so(P,"onBeforeInput"),0<P.length&&(F=new zc("onBeforeInput","beforeinput",null,n,F),$.push({event:F,listeners:P}),F.data=ie))}rd($,t)})}function ai(e,t,n){return{instance:e,listener:t,currentTarget:n}}function so(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,c=a.stateNode;a.tag===5&&c!==null&&(a=c,c=Ur(e,n),c!=null&&i.unshift(ai(e,c,a)),c=Ur(e,t),c!=null&&i.push(ai(e,c,a))),e=e.return}return i}function ur(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function od(e,t,n,i,a){for(var c=t._reactName,p=[];n!==null&&n!==i;){var v=n,w=v.alternate,P=v.stateNode;if(w!==null&&w===i)break;v.tag===5&&P!==null&&(v=P,a?(w=Ur(n,c),w!=null&&p.unshift(ai(n,w,v))):a||(w=Ur(n,c),w!=null&&p.push(ai(n,w,v)))),n=n.return}p.length!==0&&e.push({event:t,listeners:p})}var pm=/\r\n?/g,hm=/\u0000|\uFFFD/g;function sd(e){return(typeof e=="string"?e:""+e).replace(pm,`
`).replace(hm,"")}function ao(e,t,n){if(t=sd(t),sd(e)!==t&&n)throw Error(s(425))}function lo(){}var Ea=null,Ra=null;function _a(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Pa=typeof setTimeout=="function"?setTimeout:void 0,gm=typeof clearTimeout=="function"?clearTimeout:void 0,ad=typeof Promise=="function"?Promise:void 0,mm=typeof queueMicrotask=="function"?queueMicrotask:typeof ad<"u"?function(e){return ad.resolve(null).then(e).catch(vm)}:Pa;function vm(e){setTimeout(function(){throw e})}function Ta(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(i===0){e.removeChild(a),Jr(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=a}while(n);Jr(t)}function cn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ld(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var cr=Math.random().toString(36).slice(2),Bt="__reactFiber$"+cr,li="__reactProps$"+cr,Gt="__reactContainer$"+cr,za="__reactEvents$"+cr,ym="__reactListeners$"+cr,xm="__reactHandles$"+cr;function Tn(e){var t=e[Bt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Gt]||n[Bt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=ld(e);e!==null;){if(n=e[Bt])return n;e=ld(e)}return t}e=n,n=e.parentNode}return null}function ui(e){return e=e[Bt]||e[Gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function dr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(s(33))}function uo(e){return e[li]||null}var Na=[],fr=-1;function dn(e){return{current:e}}function Pe(e){0>fr||(e.current=Na[fr],Na[fr]=null,fr--)}function Re(e,t){fr++,Na[fr]=e.current,e.current=t}var fn={},Ze=dn(fn),lt=dn(!1),zn=fn;function pr(e,t){var n=e.type.contextTypes;if(!n)return fn;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var a={},c;for(c in n)a[c]=t[c];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ut(e){return e=e.childContextTypes,e!=null}function co(){Pe(lt),Pe(Ze)}function ud(e,t,n){if(Ze.current!==fn)throw Error(s(168));Re(Ze,t),Re(lt,n)}function cd(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var a in i)if(!(a in t))throw Error(s(108,ve(e)||"Unknown",a));return Q({},n,i)}function fo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||fn,zn=Ze.current,Re(Ze,e),Re(lt,lt.current),!0}function dd(e,t,n){var i=e.stateNode;if(!i)throw Error(s(169));n?(e=cd(e,t,zn),i.__reactInternalMemoizedMergedChildContext=e,Pe(lt),Pe(Ze),Re(Ze,e)):Pe(lt),Re(lt,n)}var Qt=null,po=!1,La=!1;function fd(e){Qt===null?Qt=[e]:Qt.push(e)}function wm(e){po=!0,fd(e)}function pn(){if(!La&&Qt!==null){La=!0;var e=0,t=Ce;try{var n=Qt;for(Ce=1;e<n.length;e++){var i=n[e];do i=i(!0);while(i!==null)}Qt=null,po=!1}catch(a){throw Qt!==null&&(Qt=Qt.slice(e+1)),hc(ta,pn),a}finally{Ce=t,La=!1}}return null}var hr=[],gr=0,ho=null,go=0,kt=[],St=0,Nn=null,Yt=1,Kt="";function Ln(e,t){hr[gr++]=go,hr[gr++]=ho,ho=e,go=t}function pd(e,t,n){kt[St++]=Yt,kt[St++]=Kt,kt[St++]=Nn,Nn=e;var i=Yt;e=Kt;var a=32-Tt(i)-1;i&=~(1<<a),n+=1;var c=32-Tt(t)+a;if(30<c){var p=a-a%5;c=(i&(1<<p)-1).toString(32),i>>=p,a-=p,Yt=1<<32-Tt(t)+a|n<<a|i,Kt=c+e}else Yt=1<<c|n<<a|i,Kt=e}function Oa(e){e.return!==null&&(Ln(e,1),pd(e,1,0))}function Aa(e){for(;e===ho;)ho=hr[--gr],hr[gr]=null,go=hr[--gr],hr[gr]=null;for(;e===Nn;)Nn=kt[--St],kt[St]=null,Kt=kt[--St],kt[St]=null,Yt=kt[--St],kt[St]=null}var yt=null,xt=null,ze=!1,Nt=null;function hd(e,t){var n=Rt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function gd(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,yt=e,xt=cn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,yt=e,xt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nn!==null?{id:Yt,overflow:Kt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Rt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,yt=e,xt=null,!0):!1;default:return!1}}function Ia(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Fa(e){if(ze){var t=xt;if(t){var n=t;if(!gd(e,t)){if(Ia(e))throw Error(s(418));t=cn(n.nextSibling);var i=yt;t&&gd(e,t)?hd(i,n):(e.flags=e.flags&-4097|2,ze=!1,yt=e)}}else{if(Ia(e))throw Error(s(418));e.flags=e.flags&-4097|2,ze=!1,yt=e}}}function md(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;yt=e}function mo(e){if(e!==yt)return!1;if(!ze)return md(e),ze=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!_a(e.type,e.memoizedProps)),t&&(t=xt)){if(Ia(e))throw vd(),Error(s(418));for(;t;)hd(e,t),t=cn(t.nextSibling)}if(md(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){xt=cn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}xt=null}}else xt=yt?cn(e.stateNode.nextSibling):null;return!0}function vd(){for(var e=xt;e;)e=cn(e.nextSibling)}function mr(){xt=yt=null,ze=!1}function Da(e){Nt===null?Nt=[e]:Nt.push(e)}var bm=Y.ReactCurrentBatchConfig;function ci(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(s(309));var i=n.stateNode}if(!i)throw Error(s(147,e));var a=i,c=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===c?t.ref:(t=function(p){var v=a.refs;p===null?delete v[c]:v[c]=p},t._stringRef=c,t)}if(typeof e!="string")throw Error(s(284));if(!n._owner)throw Error(s(290,e))}return e}function vo(e,t){throw e=Object.prototype.toString.call(t),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function yd(e){var t=e._init;return t(e._payload)}function xd(e){function t(R,b){if(e){var _=R.deletions;_===null?(R.deletions=[b],R.flags|=16):_.push(b)}}function n(R,b){if(!e)return null;for(;b!==null;)t(R,b),b=b.sibling;return null}function i(R,b){for(R=new Map;b!==null;)b.key!==null?R.set(b.key,b):R.set(b.index,b),b=b.sibling;return R}function a(R,b){return R=bn(R,b),R.index=0,R.sibling=null,R}function c(R,b,_){return R.index=_,e?(_=R.alternate,_!==null?(_=_.index,_<b?(R.flags|=2,b):_):(R.flags|=2,b)):(R.flags|=1048576,b)}function p(R){return e&&R.alternate===null&&(R.flags|=2),R}function v(R,b,_,U){return b===null||b.tag!==6?(b=Pl(_,R.mode,U),b.return=R,b):(b=a(b,_),b.return=R,b)}function w(R,b,_,U){var ne=_.type;return ne===K?F(R,b,_.props.children,U,_.key):b!==null&&(b.elementType===ne||typeof ne=="object"&&ne!==null&&ne.$$typeof===be&&yd(ne)===b.type)?(U=a(b,_.props),U.ref=ci(R,b,_),U.return=R,U):(U=Bo(_.type,_.key,_.props,null,R.mode,U),U.ref=ci(R,b,_),U.return=R,U)}function P(R,b,_,U){return b===null||b.tag!==4||b.stateNode.containerInfo!==_.containerInfo||b.stateNode.implementation!==_.implementation?(b=Tl(_,R.mode,U),b.return=R,b):(b=a(b,_.children||[]),b.return=R,b)}function F(R,b,_,U,ne){return b===null||b.tag!==7?(b=Bn(_,R.mode,U,ne),b.return=R,b):(b=a(b,_),b.return=R,b)}function $(R,b,_){if(typeof b=="string"&&b!==""||typeof b=="number")return b=Pl(""+b,R.mode,_),b.return=R,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case q:return _=Bo(b.type,b.key,b.props,null,R.mode,_),_.ref=ci(R,null,b),_.return=R,_;case G:return b=Tl(b,R.mode,_),b.return=R,b;case be:var U=b._init;return $(R,U(b._payload),_)}if($r(b)||ee(b))return b=Bn(b,R.mode,_,null),b.return=R,b;vo(R,b)}return null}function I(R,b,_,U){var ne=b!==null?b.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return ne!==null?null:v(R,b,""+_,U);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case q:return _.key===ne?w(R,b,_,U):null;case G:return _.key===ne?P(R,b,_,U):null;case be:return ne=_._init,I(R,b,ne(_._payload),U)}if($r(_)||ee(_))return ne!==null?null:F(R,b,_,U,null);vo(R,_)}return null}function J(R,b,_,U,ne){if(typeof U=="string"&&U!==""||typeof U=="number")return R=R.get(_)||null,v(b,R,""+U,ne);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case q:return R=R.get(U.key===null?_:U.key)||null,w(b,R,U,ne);case G:return R=R.get(U.key===null?_:U.key)||null,P(b,R,U,ne);case be:var re=U._init;return J(R,b,_,re(U._payload),ne)}if($r(U)||ee(U))return R=R.get(_)||null,F(b,R,U,ne,null);vo(b,U)}return null}function Z(R,b,_,U){for(var ne=null,re=null,ie=b,se=b=0,Ge=null;ie!==null&&se<_.length;se++){ie.index>se?(Ge=ie,ie=null):Ge=ie.sibling;var we=I(R,ie,_[se],U);if(we===null){ie===null&&(ie=Ge);break}e&&ie&&we.alternate===null&&t(R,ie),b=c(we,b,se),re===null?ne=we:re.sibling=we,re=we,ie=Ge}if(se===_.length)return n(R,ie),ze&&Ln(R,se),ne;if(ie===null){for(;se<_.length;se++)ie=$(R,_[se],U),ie!==null&&(b=c(ie,b,se),re===null?ne=ie:re.sibling=ie,re=ie);return ze&&Ln(R,se),ne}for(ie=i(R,ie);se<_.length;se++)Ge=J(ie,R,se,_[se],U),Ge!==null&&(e&&Ge.alternate!==null&&ie.delete(Ge.key===null?se:Ge.key),b=c(Ge,b,se),re===null?ne=Ge:re.sibling=Ge,re=Ge);return e&&ie.forEach(function(kn){return t(R,kn)}),ze&&Ln(R,se),ne}function te(R,b,_,U){var ne=ee(_);if(typeof ne!="function")throw Error(s(150));if(_=ne.call(_),_==null)throw Error(s(151));for(var re=ne=null,ie=b,se=b=0,Ge=null,we=_.next();ie!==null&&!we.done;se++,we=_.next()){ie.index>se?(Ge=ie,ie=null):Ge=ie.sibling;var kn=I(R,ie,we.value,U);if(kn===null){ie===null&&(ie=Ge);break}e&&ie&&kn.alternate===null&&t(R,ie),b=c(kn,b,se),re===null?ne=kn:re.sibling=kn,re=kn,ie=Ge}if(we.done)return n(R,ie),ze&&Ln(R,se),ne;if(ie===null){for(;!we.done;se++,we=_.next())we=$(R,we.value,U),we!==null&&(b=c(we,b,se),re===null?ne=we:re.sibling=we,re=we);return ze&&Ln(R,se),ne}for(ie=i(R,ie);!we.done;se++,we=_.next())we=J(ie,R,se,we.value,U),we!==null&&(e&&we.alternate!==null&&ie.delete(we.key===null?se:we.key),b=c(we,b,se),re===null?ne=we:re.sibling=we,re=we);return e&&ie.forEach(function(ev){return t(R,ev)}),ze&&Ln(R,se),ne}function De(R,b,_,U){if(typeof _=="object"&&_!==null&&_.type===K&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case q:e:{for(var ne=_.key,re=b;re!==null;){if(re.key===ne){if(ne=_.type,ne===K){if(re.tag===7){n(R,re.sibling),b=a(re,_.props.children),b.return=R,R=b;break e}}else if(re.elementType===ne||typeof ne=="object"&&ne!==null&&ne.$$typeof===be&&yd(ne)===re.type){n(R,re.sibling),b=a(re,_.props),b.ref=ci(R,re,_),b.return=R,R=b;break e}n(R,re);break}else t(R,re);re=re.sibling}_.type===K?(b=Bn(_.props.children,R.mode,U,_.key),b.return=R,R=b):(U=Bo(_.type,_.key,_.props,null,R.mode,U),U.ref=ci(R,b,_),U.return=R,R=U)}return p(R);case G:e:{for(re=_.key;b!==null;){if(b.key===re)if(b.tag===4&&b.stateNode.containerInfo===_.containerInfo&&b.stateNode.implementation===_.implementation){n(R,b.sibling),b=a(b,_.children||[]),b.return=R,R=b;break e}else{n(R,b);break}else t(R,b);b=b.sibling}b=Tl(_,R.mode,U),b.return=R,R=b}return p(R);case be:return re=_._init,De(R,b,re(_._payload),U)}if($r(_))return Z(R,b,_,U);if(ee(_))return te(R,b,_,U);vo(R,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,b!==null&&b.tag===6?(n(R,b.sibling),b=a(b,_),b.return=R,R=b):(n(R,b),b=Pl(_,R.mode,U),b.return=R,R=b),p(R)):n(R,b)}return De}var vr=xd(!0),wd=xd(!1),yo=dn(null),xo=null,yr=null,$a=null;function Ma(){$a=yr=xo=null}function Ba(e){var t=yo.current;Pe(yo),e._currentValue=t}function Ua(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function xr(e,t){xo=e,$a=yr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(ct=!0),e.firstContext=null)}function jt(e){var t=e._currentValue;if($a!==e)if(e={context:e,memoizedValue:t,next:null},yr===null){if(xo===null)throw Error(s(308));yr=e,xo.dependencies={lanes:0,firstContext:e}}else yr=yr.next=e;return t}var On=null;function Ha(e){On===null?On=[e]:On.push(e)}function bd(e,t,n,i){var a=t.interleaved;return a===null?(n.next=n,Ha(t)):(n.next=a.next,a.next=n),t.interleaved=n,Jt(e,i)}function Jt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var hn=!1;function Wa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function kd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Xt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function gn(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(xe&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,Jt(e,n)}return a=i.interleaved,a===null?(t.next=t,Ha(i)):(t.next=a.next,a.next=t),i.interleaved=t,Jt(e,n)}function wo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ia(e,n)}}function Sd(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,c=null;if(n=n.firstBaseUpdate,n!==null){do{var p={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};c===null?a=c=p:c=c.next=p,n=n.next}while(n!==null);c===null?a=c=t:c=c.next=t}else a=c=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:c,shared:i.shared,effects:i.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function bo(e,t,n,i){var a=e.updateQueue;hn=!1;var c=a.firstBaseUpdate,p=a.lastBaseUpdate,v=a.shared.pending;if(v!==null){a.shared.pending=null;var w=v,P=w.next;w.next=null,p===null?c=P:p.next=P,p=w;var F=e.alternate;F!==null&&(F=F.updateQueue,v=F.lastBaseUpdate,v!==p&&(v===null?F.firstBaseUpdate=P:v.next=P,F.lastBaseUpdate=w))}if(c!==null){var $=a.baseState;p=0,F=P=w=null,v=c;do{var I=v.lane,J=v.eventTime;if((i&I)===I){F!==null&&(F=F.next={eventTime:J,lane:0,tag:v.tag,payload:v.payload,callback:v.callback,next:null});e:{var Z=e,te=v;switch(I=t,J=n,te.tag){case 1:if(Z=te.payload,typeof Z=="function"){$=Z.call(J,$,I);break e}$=Z;break e;case 3:Z.flags=Z.flags&-65537|128;case 0:if(Z=te.payload,I=typeof Z=="function"?Z.call(J,$,I):Z,I==null)break e;$=Q({},$,I);break e;case 2:hn=!0}}v.callback!==null&&v.lane!==0&&(e.flags|=64,I=a.effects,I===null?a.effects=[v]:I.push(v))}else J={eventTime:J,lane:I,tag:v.tag,payload:v.payload,callback:v.callback,next:null},F===null?(P=F=J,w=$):F=F.next=J,p|=I;if(v=v.next,v===null){if(v=a.shared.pending,v===null)break;I=v,v=I.next,I.next=null,a.lastBaseUpdate=I,a.shared.pending=null}}while(!0);if(F===null&&(w=$),a.baseState=w,a.firstBaseUpdate=P,a.lastBaseUpdate=F,t=a.shared.interleaved,t!==null){a=t;do p|=a.lane,a=a.next;while(a!==t)}else c===null&&(a.shared.lanes=0);Fn|=p,e.lanes=p,e.memoizedState=$}}function jd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],a=i.callback;if(a!==null){if(i.callback=null,i=n,typeof a!="function")throw Error(s(191,a));a.call(i)}}}var di={},Ut=dn(di),fi=dn(di),pi=dn(di);function An(e){if(e===di)throw Error(s(174));return e}function Va(e,t){switch(Re(pi,t),Re(fi,e),Re(Ut,di),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:qs(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=qs(t,e)}Pe(Ut),Re(Ut,t)}function wr(){Pe(Ut),Pe(fi),Pe(pi)}function Cd(e){An(pi.current);var t=An(Ut.current),n=qs(t,e.type);t!==n&&(Re(fi,e),Re(Ut,n))}function qa(e){fi.current===e&&(Pe(Ut),Pe(fi))}var Ne=dn(0);function ko(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ga=[];function Qa(){for(var e=0;e<Ga.length;e++)Ga[e]._workInProgressVersionPrimary=null;Ga.length=0}var So=Y.ReactCurrentDispatcher,Ya=Y.ReactCurrentBatchConfig,In=0,Le=null,He=null,Ve=null,jo=!1,hi=!1,gi=0,km=0;function et(){throw Error(s(321))}function Ka(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zt(e[n],t[n]))return!1;return!0}function Ja(e,t,n,i,a,c){if(In=c,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,So.current=e===null||e.memoizedState===null?Em:Rm,e=n(i,a),hi){c=0;do{if(hi=!1,gi=0,25<=c)throw Error(s(301));c+=1,Ve=He=null,t.updateQueue=null,So.current=_m,e=n(i,a)}while(hi)}if(So.current=Ro,t=He!==null&&He.next!==null,In=0,Ve=He=Le=null,jo=!1,t)throw Error(s(300));return e}function Xa(){var e=gi!==0;return gi=0,e}function Ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ve===null?Le.memoizedState=Ve=e:Ve=Ve.next=e,Ve}function Ct(){if(He===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var t=Ve===null?Le.memoizedState:Ve.next;if(t!==null)Ve=t,He=e;else{if(e===null)throw Error(s(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},Ve===null?Le.memoizedState=Ve=e:Ve=Ve.next=e}return Ve}function mi(e,t){return typeof t=="function"?t(e):t}function Za(e){var t=Ct(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var i=He,a=i.baseQueue,c=n.pending;if(c!==null){if(a!==null){var p=a.next;a.next=c.next,c.next=p}i.baseQueue=a=c,n.pending=null}if(a!==null){c=a.next,i=i.baseState;var v=p=null,w=null,P=c;do{var F=P.lane;if((In&F)===F)w!==null&&(w=w.next={lane:0,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null}),i=P.hasEagerState?P.eagerState:e(i,P.action);else{var $={lane:F,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null};w===null?(v=w=$,p=i):w=w.next=$,Le.lanes|=F,Fn|=F}P=P.next}while(P!==null&&P!==c);w===null?p=i:w.next=v,zt(i,t.memoizedState)||(ct=!0),t.memoizedState=i,t.baseState=p,t.baseQueue=w,n.lastRenderedState=i}if(e=n.interleaved,e!==null){a=e;do c=a.lane,Le.lanes|=c,Fn|=c,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function el(e){var t=Ct(),n=t.queue;if(n===null)throw Error(s(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,c=t.memoizedState;if(a!==null){n.pending=null;var p=a=a.next;do c=e(c,p.action),p=p.next;while(p!==a);zt(c,t.memoizedState)||(ct=!0),t.memoizedState=c,t.baseQueue===null&&(t.baseState=c),n.lastRenderedState=c}return[c,i]}function Ed(){}function Rd(e,t){var n=Le,i=Ct(),a=t(),c=!zt(i.memoizedState,a);if(c&&(i.memoizedState=a,ct=!0),i=i.queue,tl(Td.bind(null,n,i,e),[e]),i.getSnapshot!==t||c||Ve!==null&&Ve.memoizedState.tag&1){if(n.flags|=2048,vi(9,Pd.bind(null,n,i,a,t),void 0,null),qe===null)throw Error(s(349));(In&30)!==0||_d(n,t,a)}return a}function _d(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Pd(e,t,n,i){t.value=n,t.getSnapshot=i,zd(t)&&Nd(e)}function Td(e,t,n){return n(function(){zd(t)&&Nd(e)})}function zd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zt(e,n)}catch{return!0}}function Nd(e){var t=Jt(e,1);t!==null&&It(t,e,1,-1)}function Ld(e){var t=Ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mi,lastRenderedState:e},t.queue=e,e=e.dispatch=Cm.bind(null,Le,e),[t.memoizedState,e]}function vi(e,t,n,i){return e={tag:e,create:t,destroy:n,deps:i,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e)),e}function Od(){return Ct().memoizedState}function Co(e,t,n,i){var a=Ht();Le.flags|=e,a.memoizedState=vi(1|t,n,void 0,i===void 0?null:i)}function Eo(e,t,n,i){var a=Ct();i=i===void 0?null:i;var c=void 0;if(He!==null){var p=He.memoizedState;if(c=p.destroy,i!==null&&Ka(i,p.deps)){a.memoizedState=vi(t,n,c,i);return}}Le.flags|=e,a.memoizedState=vi(1|t,n,c,i)}function Ad(e,t){return Co(8390656,8,e,t)}function tl(e,t){return Eo(2048,8,e,t)}function Id(e,t){return Eo(4,2,e,t)}function Fd(e,t){return Eo(4,4,e,t)}function Dd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function $d(e,t,n){return n=n!=null?n.concat([e]):null,Eo(4,4,Dd.bind(null,t,e),n)}function nl(){}function Md(e,t){var n=Ct();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&Ka(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Bd(e,t){var n=Ct();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&Ka(t,i[1])?i[0]:(e=e(),n.memoizedState=[e,t],e)}function Ud(e,t,n){return(In&21)===0?(e.baseState&&(e.baseState=!1,ct=!0),e.memoizedState=n):(zt(n,t)||(n=yc(),Le.lanes|=n,Fn|=n,e.baseState=!0),t)}function Sm(e,t){var n=Ce;Ce=n!==0&&4>n?n:4,e(!0);var i=Ya.transition;Ya.transition={};try{e(!1),t()}finally{Ce=n,Ya.transition=i}}function Hd(){return Ct().memoizedState}function jm(e,t,n){var i=xn(e);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Wd(e))Vd(t,n);else if(n=bd(e,t,n,i),n!==null){var a=st();It(n,e,i,a),qd(n,t,i)}}function Cm(e,t,n){var i=xn(e),a={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Wd(e))Vd(t,a);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=t.lastRenderedReducer,c!==null))try{var p=t.lastRenderedState,v=c(p,n);if(a.hasEagerState=!0,a.eagerState=v,zt(v,p)){var w=t.interleaved;w===null?(a.next=a,Ha(t)):(a.next=w.next,w.next=a),t.interleaved=a;return}}catch{}finally{}n=bd(e,t,a,i),n!==null&&(a=st(),It(n,e,i,a),qd(n,t,i))}}function Wd(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function Vd(e,t){hi=jo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function qd(e,t,n){if((n&4194240)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ia(e,n)}}var Ro={readContext:jt,useCallback:et,useContext:et,useEffect:et,useImperativeHandle:et,useInsertionEffect:et,useLayoutEffect:et,useMemo:et,useReducer:et,useRef:et,useState:et,useDebugValue:et,useDeferredValue:et,useTransition:et,useMutableSource:et,useSyncExternalStore:et,useId:et,unstable_isNewReconciler:!1},Em={readContext:jt,useCallback:function(e,t){return Ht().memoizedState=[e,t===void 0?null:t],e},useContext:jt,useEffect:Ad,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Co(4194308,4,Dd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Co(4194308,4,e,t)},useInsertionEffect:function(e,t){return Co(4,2,e,t)},useMemo:function(e,t){var n=Ht();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var i=Ht();return t=n!==void 0?n(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=jm.bind(null,Le,e),[i.memoizedState,e]},useRef:function(e){var t=Ht();return e={current:e},t.memoizedState=e},useState:Ld,useDebugValue:nl,useDeferredValue:function(e){return Ht().memoizedState=e},useTransition:function(){var e=Ld(!1),t=e[0];return e=Sm.bind(null,e[1]),Ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=Le,a=Ht();if(ze){if(n===void 0)throw Error(s(407));n=n()}else{if(n=t(),qe===null)throw Error(s(349));(In&30)!==0||_d(i,t,n)}a.memoizedState=n;var c={value:n,getSnapshot:t};return a.queue=c,Ad(Td.bind(null,i,c,e),[e]),i.flags|=2048,vi(9,Pd.bind(null,i,c,n,t),void 0,null),n},useId:function(){var e=Ht(),t=qe.identifierPrefix;if(ze){var n=Kt,i=Yt;n=(i&~(1<<32-Tt(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=gi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=km++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Rm={readContext:jt,useCallback:Md,useContext:jt,useEffect:tl,useImperativeHandle:$d,useInsertionEffect:Id,useLayoutEffect:Fd,useMemo:Bd,useReducer:Za,useRef:Od,useState:function(){return Za(mi)},useDebugValue:nl,useDeferredValue:function(e){var t=Ct();return Ud(t,He.memoizedState,e)},useTransition:function(){var e=Za(mi)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:Ed,useSyncExternalStore:Rd,useId:Hd,unstable_isNewReconciler:!1},_m={readContext:jt,useCallback:Md,useContext:jt,useEffect:tl,useImperativeHandle:$d,useInsertionEffect:Id,useLayoutEffect:Fd,useMemo:Bd,useReducer:el,useRef:Od,useState:function(){return el(mi)},useDebugValue:nl,useDeferredValue:function(e){var t=Ct();return He===null?t.memoizedState=e:Ud(t,He.memoizedState,e)},useTransition:function(){var e=el(mi)[0],t=Ct().memoizedState;return[e,t]},useMutableSource:Ed,useSyncExternalStore:Rd,useId:Hd,unstable_isNewReconciler:!1};function Lt(e,t){if(e&&e.defaultProps){t=Q({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function rl(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Q({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _o={isMounted:function(e){return(e=e._reactInternals)?Pn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=st(),a=xn(e),c=Xt(i,a);c.payload=t,n!=null&&(c.callback=n),t=gn(e,c,a),t!==null&&(It(t,e,a,i),wo(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=st(),a=xn(e),c=Xt(i,a);c.tag=1,c.payload=t,n!=null&&(c.callback=n),t=gn(e,c,a),t!==null&&(It(t,e,a,i),wo(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=st(),i=xn(e),a=Xt(n,i);a.tag=2,t!=null&&(a.callback=t),t=gn(e,a,i),t!==null&&(It(t,e,i,n),wo(t,e,i))}};function Gd(e,t,n,i,a,c,p){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,p):t.prototype&&t.prototype.isPureReactComponent?!ri(n,i)||!ri(a,c):!0}function Qd(e,t,n){var i=!1,a=fn,c=t.contextType;return typeof c=="object"&&c!==null?c=jt(c):(a=ut(t)?zn:Ze.current,i=t.contextTypes,c=(i=i!=null)?pr(e,a):fn),t=new t(n,c),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=_o,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=c),t}function Yd(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&_o.enqueueReplaceState(t,t.state,null)}function il(e,t,n,i){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Wa(e);var c=t.contextType;typeof c=="object"&&c!==null?a.context=jt(c):(c=ut(t)?zn:Ze.current,a.context=pr(e,c)),a.state=e.memoizedState,c=t.getDerivedStateFromProps,typeof c=="function"&&(rl(e,t,c,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&_o.enqueueReplaceState(a,a.state,null),bo(e,n,a,i),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function br(e,t){try{var n="",i=t;do n+=pe(i),i=i.return;while(i);var a=n}catch(c){a=`
Error generating stack: `+c.message+`
`+c.stack}return{value:e,source:t,stack:a,digest:null}}function ol(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function sl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Pm=typeof WeakMap=="function"?WeakMap:Map;function Kd(e,t,n){n=Xt(-1,n),n.tag=3,n.payload={element:null};var i=t.value;return n.callback=function(){Ao||(Ao=!0,bl=i),sl(e,t)},n}function Jd(e,t,n){n=Xt(-1,n),n.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var a=t.value;n.payload=function(){return i(a)},n.callback=function(){sl(e,t)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(n.callback=function(){sl(e,t),typeof i!="function"&&(vn===null?vn=new Set([this]):vn.add(this));var p=t.stack;this.componentDidCatch(t.value,{componentStack:p!==null?p:""})}),n}function Xd(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Pm;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(a.add(n),e=Hm.bind(null,e,t,n),t.then(e,e))}function Zd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ef(e,t,n,i,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Xt(-1,1),t.tag=2,gn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var Tm=Y.ReactCurrentOwner,ct=!1;function ot(e,t,n,i){t.child=e===null?wd(t,null,n,i):vr(t,e.child,n,i)}function tf(e,t,n,i,a){n=n.render;var c=t.ref;return xr(t,a),i=Ja(e,t,n,i,c,a),n=Xa(),e!==null&&!ct?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Zt(e,t,a)):(ze&&n&&Oa(t),t.flags|=1,ot(e,t,i,a),t.child)}function nf(e,t,n,i,a){if(e===null){var c=n.type;return typeof c=="function"&&!_l(c)&&c.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=c,rf(e,t,c,i,a)):(e=Bo(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(c=e.child,(e.lanes&a)===0){var p=c.memoizedProps;if(n=n.compare,n=n!==null?n:ri,n(p,i)&&e.ref===t.ref)return Zt(e,t,a)}return t.flags|=1,e=bn(c,i),e.ref=t.ref,e.return=t,t.child=e}function rf(e,t,n,i,a){if(e!==null){var c=e.memoizedProps;if(ri(c,i)&&e.ref===t.ref)if(ct=!1,t.pendingProps=i=c,(e.lanes&a)!==0)(e.flags&131072)!==0&&(ct=!0);else return t.lanes=e.lanes,Zt(e,t,a)}return al(e,t,n,i,a)}function of(e,t,n){var i=t.pendingProps,a=i.children,c=e!==null?e.memoizedState:null;if(i.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Re(Sr,wt),wt|=n;else{if((n&1073741824)===0)return e=c!==null?c.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Re(Sr,wt),wt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=c!==null?c.baseLanes:n,Re(Sr,wt),wt|=i}else c!==null?(i=c.baseLanes|n,t.memoizedState=null):i=n,Re(Sr,wt),wt|=i;return ot(e,t,a,n),t.child}function sf(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function al(e,t,n,i,a){var c=ut(n)?zn:Ze.current;return c=pr(t,c),xr(t,a),n=Ja(e,t,n,i,c,a),i=Xa(),e!==null&&!ct?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Zt(e,t,a)):(ze&&i&&Oa(t),t.flags|=1,ot(e,t,n,a),t.child)}function af(e,t,n,i,a){if(ut(n)){var c=!0;fo(t)}else c=!1;if(xr(t,a),t.stateNode===null)To(e,t),Qd(t,n,i),il(t,n,i,a),i=!0;else if(e===null){var p=t.stateNode,v=t.memoizedProps;p.props=v;var w=p.context,P=n.contextType;typeof P=="object"&&P!==null?P=jt(P):(P=ut(n)?zn:Ze.current,P=pr(t,P));var F=n.getDerivedStateFromProps,$=typeof F=="function"||typeof p.getSnapshotBeforeUpdate=="function";$||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(v!==i||w!==P)&&Yd(t,p,i,P),hn=!1;var I=t.memoizedState;p.state=I,bo(t,i,p,a),w=t.memoizedState,v!==i||I!==w||lt.current||hn?(typeof F=="function"&&(rl(t,n,F,i),w=t.memoizedState),(v=hn||Gd(t,n,v,i,I,w,P))?($||typeof p.UNSAFE_componentWillMount!="function"&&typeof p.componentWillMount!="function"||(typeof p.componentWillMount=="function"&&p.componentWillMount(),typeof p.UNSAFE_componentWillMount=="function"&&p.UNSAFE_componentWillMount()),typeof p.componentDidMount=="function"&&(t.flags|=4194308)):(typeof p.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=w),p.props=i,p.state=w,p.context=P,i=v):(typeof p.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{p=t.stateNode,kd(e,t),v=t.memoizedProps,P=t.type===t.elementType?v:Lt(t.type,v),p.props=P,$=t.pendingProps,I=p.context,w=n.contextType,typeof w=="object"&&w!==null?w=jt(w):(w=ut(n)?zn:Ze.current,w=pr(t,w));var J=n.getDerivedStateFromProps;(F=typeof J=="function"||typeof p.getSnapshotBeforeUpdate=="function")||typeof p.UNSAFE_componentWillReceiveProps!="function"&&typeof p.componentWillReceiveProps!="function"||(v!==$||I!==w)&&Yd(t,p,i,w),hn=!1,I=t.memoizedState,p.state=I,bo(t,i,p,a);var Z=t.memoizedState;v!==$||I!==Z||lt.current||hn?(typeof J=="function"&&(rl(t,n,J,i),Z=t.memoizedState),(P=hn||Gd(t,n,P,i,I,Z,w)||!1)?(F||typeof p.UNSAFE_componentWillUpdate!="function"&&typeof p.componentWillUpdate!="function"||(typeof p.componentWillUpdate=="function"&&p.componentWillUpdate(i,Z,w),typeof p.UNSAFE_componentWillUpdate=="function"&&p.UNSAFE_componentWillUpdate(i,Z,w)),typeof p.componentDidUpdate=="function"&&(t.flags|=4),typeof p.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof p.componentDidUpdate!="function"||v===e.memoizedProps&&I===e.memoizedState||(t.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&I===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=Z),p.props=i,p.state=Z,p.context=w,i=P):(typeof p.componentDidUpdate!="function"||v===e.memoizedProps&&I===e.memoizedState||(t.flags|=4),typeof p.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&I===e.memoizedState||(t.flags|=1024),i=!1)}return ll(e,t,n,i,c,a)}function ll(e,t,n,i,a,c){sf(e,t);var p=(t.flags&128)!==0;if(!i&&!p)return a&&dd(t,n,!1),Zt(e,t,c);i=t.stateNode,Tm.current=t;var v=p&&typeof n.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&p?(t.child=vr(t,e.child,null,c),t.child=vr(t,null,v,c)):ot(e,t,v,c),t.memoizedState=i.state,a&&dd(t,n,!0),t.child}function lf(e){var t=e.stateNode;t.pendingContext?ud(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ud(e,t.context,!1),Va(e,t.containerInfo)}function uf(e,t,n,i,a){return mr(),Da(a),t.flags|=256,ot(e,t,n,i),t.child}var ul={dehydrated:null,treeContext:null,retryLane:0};function cl(e){return{baseLanes:e,cachePool:null,transitions:null}}function cf(e,t,n){var i=t.pendingProps,a=Ne.current,c=!1,p=(t.flags&128)!==0,v;if((v=p)||(v=e!==null&&e.memoizedState===null?!1:(a&2)!==0),v?(c=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Re(Ne,a&1),e===null)return Fa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(p=i.children,e=i.fallback,c?(i=t.mode,c=t.child,p={mode:"hidden",children:p},(i&1)===0&&c!==null?(c.childLanes=0,c.pendingProps=p):c=Uo(p,i,0,null),e=Bn(e,i,n,null),c.return=t,e.return=t,c.sibling=e,t.child=c,t.child.memoizedState=cl(n),t.memoizedState=ul,e):dl(t,p));if(a=e.memoizedState,a!==null&&(v=a.dehydrated,v!==null))return zm(e,t,p,i,v,a,n);if(c){c=i.fallback,p=t.mode,a=e.child,v=a.sibling;var w={mode:"hidden",children:i.children};return(p&1)===0&&t.child!==a?(i=t.child,i.childLanes=0,i.pendingProps=w,t.deletions=null):(i=bn(a,w),i.subtreeFlags=a.subtreeFlags&14680064),v!==null?c=bn(v,c):(c=Bn(c,p,n,null),c.flags|=2),c.return=t,i.return=t,i.sibling=c,t.child=i,i=c,c=t.child,p=e.child.memoizedState,p=p===null?cl(n):{baseLanes:p.baseLanes|n,cachePool:null,transitions:p.transitions},c.memoizedState=p,c.childLanes=e.childLanes&~n,t.memoizedState=ul,i}return c=e.child,e=c.sibling,i=bn(c,{mode:"visible",children:i.children}),(t.mode&1)===0&&(i.lanes=n),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function dl(e,t){return t=Uo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Po(e,t,n,i){return i!==null&&Da(i),vr(t,e.child,null,n),e=dl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function zm(e,t,n,i,a,c,p){if(n)return t.flags&256?(t.flags&=-257,i=ol(Error(s(422))),Po(e,t,p,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(c=i.fallback,a=t.mode,i=Uo({mode:"visible",children:i.children},a,0,null),c=Bn(c,a,p,null),c.flags|=2,i.return=t,c.return=t,i.sibling=c,t.child=i,(t.mode&1)!==0&&vr(t,e.child,null,p),t.child.memoizedState=cl(p),t.memoizedState=ul,c);if((t.mode&1)===0)return Po(e,t,p,null);if(a.data==="$!"){if(i=a.nextSibling&&a.nextSibling.dataset,i)var v=i.dgst;return i=v,c=Error(s(419)),i=ol(c,i,void 0),Po(e,t,p,i)}if(v=(p&e.childLanes)!==0,ct||v){if(i=qe,i!==null){switch(p&-p){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(i.suspendedLanes|p))!==0?0:a,a!==0&&a!==c.retryLane&&(c.retryLane=a,Jt(e,a),It(i,e,a,-1))}return Rl(),i=ol(Error(s(421))),Po(e,t,p,i)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Wm.bind(null,e),a._reactRetry=t,null):(e=c.treeContext,xt=cn(a.nextSibling),yt=t,ze=!0,Nt=null,e!==null&&(kt[St++]=Yt,kt[St++]=Kt,kt[St++]=Nn,Yt=e.id,Kt=e.overflow,Nn=t),t=dl(t,i.children),t.flags|=4096,t)}function df(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Ua(e.return,t,n)}function fl(e,t,n,i,a){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=i,c.tail=n,c.tailMode=a)}function ff(e,t,n){var i=t.pendingProps,a=i.revealOrder,c=i.tail;if(ot(e,t,i.children,n),i=Ne.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&df(e,n,t);else if(e.tag===19)df(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(Re(Ne,i),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ko(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),fl(t,!1,a,n,c);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ko(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}fl(t,!0,n,null,c);break;case"together":fl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function To(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Zt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Fn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(s(153));if(t.child!==null){for(e=t.child,n=bn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Nm(e,t,n){switch(t.tag){case 3:lf(t),mr();break;case 5:Cd(t);break;case 1:ut(t.type)&&fo(t);break;case 4:Va(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,a=t.memoizedProps.value;Re(yo,i._currentValue),i._currentValue=a;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(Re(Ne,Ne.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?cf(e,t,n):(Re(Ne,Ne.current&1),e=Zt(e,t,n),e!==null?e.sibling:null);Re(Ne,Ne.current&1);break;case 19:if(i=(n&t.childLanes)!==0,(e.flags&128)!==0){if(i)return ff(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Re(Ne,Ne.current),i)break;return null;case 22:case 23:return t.lanes=0,of(e,t,n)}return Zt(e,t,n)}var pf,pl,hf,gf;pf=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},pl=function(){},hf=function(e,t,n,i){var a=e.memoizedProps;if(a!==i){e=t.stateNode,An(Ut.current);var c=null;switch(n){case"input":a=at(e,a),i=at(e,i),c=[];break;case"select":a=Q({},a,{value:void 0}),i=Q({},i,{value:void 0}),c=[];break;case"textarea":a=Vs(e,a),i=Vs(e,i),c=[];break;default:typeof a.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=lo)}Gs(n,i);var p;n=null;for(P in a)if(!i.hasOwnProperty(P)&&a.hasOwnProperty(P)&&a[P]!=null)if(P==="style"){var v=a[P];for(p in v)v.hasOwnProperty(p)&&(n||(n={}),n[p]="")}else P!=="dangerouslySetInnerHTML"&&P!=="children"&&P!=="suppressContentEditableWarning"&&P!=="suppressHydrationWarning"&&P!=="autoFocus"&&(d.hasOwnProperty(P)?c||(c=[]):(c=c||[]).push(P,null));for(P in i){var w=i[P];if(v=a!=null?a[P]:void 0,i.hasOwnProperty(P)&&w!==v&&(w!=null||v!=null))if(P==="style")if(v){for(p in v)!v.hasOwnProperty(p)||w&&w.hasOwnProperty(p)||(n||(n={}),n[p]="");for(p in w)w.hasOwnProperty(p)&&v[p]!==w[p]&&(n||(n={}),n[p]=w[p])}else n||(c||(c=[]),c.push(P,n)),n=w;else P==="dangerouslySetInnerHTML"?(w=w?w.__html:void 0,v=v?v.__html:void 0,w!=null&&v!==w&&(c=c||[]).push(P,w)):P==="children"?typeof w!="string"&&typeof w!="number"||(c=c||[]).push(P,""+w):P!=="suppressContentEditableWarning"&&P!=="suppressHydrationWarning"&&(d.hasOwnProperty(P)?(w!=null&&P==="onScroll"&&_e("scroll",e),c||v===w||(c=[])):(c=c||[]).push(P,w))}n&&(c=c||[]).push("style",n);var P=c;(t.updateQueue=P)&&(t.flags|=4)}},gf=function(e,t,n,i){n!==i&&(t.flags|=4)};function yi(e,t){if(!ze)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&14680064,i|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Lm(e,t,n){var i=t.pendingProps;switch(Aa(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(t),null;case 1:return ut(t.type)&&co(),tt(t),null;case 3:return i=t.stateNode,wr(),Pe(lt),Pe(Ze),Qa(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(mo(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Nt!==null&&(jl(Nt),Nt=null))),pl(e,t),tt(t),null;case 5:qa(t);var a=An(pi.current);if(n=t.type,e!==null&&t.stateNode!=null)hf(e,t,n,i,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(s(166));return tt(t),null}if(e=An(Ut.current),mo(t)){i=t.stateNode,n=t.type;var c=t.memoizedProps;switch(i[Bt]=t,i[li]=c,e=(t.mode&1)!==0,n){case"dialog":_e("cancel",i),_e("close",i);break;case"iframe":case"object":case"embed":_e("load",i);break;case"video":case"audio":for(a=0;a<oi.length;a++)_e(oi[a],i);break;case"source":_e("error",i);break;case"img":case"image":case"link":_e("error",i),_e("load",i);break;case"details":_e("toggle",i);break;case"input":Qu(i,c),_e("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!c.multiple},_e("invalid",i);break;case"textarea":Ju(i,c),_e("invalid",i)}Gs(n,c),a=null;for(var p in c)if(c.hasOwnProperty(p)){var v=c[p];p==="children"?typeof v=="string"?i.textContent!==v&&(c.suppressHydrationWarning!==!0&&ao(i.textContent,v,e),a=["children",v]):typeof v=="number"&&i.textContent!==""+v&&(c.suppressHydrationWarning!==!0&&ao(i.textContent,v,e),a=["children",""+v]):d.hasOwnProperty(p)&&v!=null&&p==="onScroll"&&_e("scroll",i)}switch(n){case"input":Ae(i),Ku(i,c,!0);break;case"textarea":Ae(i),Zu(i);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(i.onclick=lo)}i=a,t.updateQueue=i,i!==null&&(t.flags|=4)}else{p=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ec(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=p.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=p.createElement(n,{is:i.is}):(e=p.createElement(n),n==="select"&&(p=e,i.multiple?p.multiple=!0:i.size&&(p.size=i.size))):e=p.createElementNS(e,n),e[Bt]=t,e[li]=i,pf(e,t,!1,!1),t.stateNode=e;e:{switch(p=Qs(n,i),n){case"dialog":_e("cancel",e),_e("close",e),a=i;break;case"iframe":case"object":case"embed":_e("load",e),a=i;break;case"video":case"audio":for(a=0;a<oi.length;a++)_e(oi[a],e);a=i;break;case"source":_e("error",e),a=i;break;case"img":case"image":case"link":_e("error",e),_e("load",e),a=i;break;case"details":_e("toggle",e),a=i;break;case"input":Qu(e,i),a=at(e,i),_e("invalid",e);break;case"option":a=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},a=Q({},i,{value:void 0}),_e("invalid",e);break;case"textarea":Ju(e,i),a=Vs(e,i),_e("invalid",e);break;default:a=i}Gs(n,a),v=a;for(c in v)if(v.hasOwnProperty(c)){var w=v[c];c==="style"?rc(e,w):c==="dangerouslySetInnerHTML"?(w=w?w.__html:void 0,w!=null&&tc(e,w)):c==="children"?typeof w=="string"?(n!=="textarea"||w!=="")&&Mr(e,w):typeof w=="number"&&Mr(e,""+w):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(d.hasOwnProperty(c)?w!=null&&c==="onScroll"&&_e("scroll",e):w!=null&&H(e,c,w,p))}switch(n){case"input":Ae(e),Ku(e,i,!1);break;case"textarea":Ae(e),Zu(e);break;case"option":i.value!=null&&e.setAttribute("value",""+me(i.value));break;case"select":e.multiple=!!i.multiple,c=i.value,c!=null?tr(e,!!i.multiple,c,!1):i.defaultValue!=null&&tr(e,!!i.multiple,i.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=lo)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return tt(t),null;case 6:if(e&&t.stateNode!=null)gf(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(s(166));if(n=An(pi.current),An(Ut.current),mo(t)){if(i=t.stateNode,n=t.memoizedProps,i[Bt]=t,(c=i.nodeValue!==n)&&(e=yt,e!==null))switch(e.tag){case 3:ao(i.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ao(i.nodeValue,n,(e.mode&1)!==0)}c&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Bt]=t,t.stateNode=i}return tt(t),null;case 13:if(Pe(Ne),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ze&&xt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)vd(),mr(),t.flags|=98560,c=!1;else if(c=mo(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[Bt]=t}else mr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),c=!1}else Nt!==null&&(jl(Nt),Nt=null),c=!0;if(!c)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ne.current&1)!==0?We===0&&(We=3):Rl())),t.updateQueue!==null&&(t.flags|=4),tt(t),null);case 4:return wr(),pl(e,t),e===null&&si(t.stateNode.containerInfo),tt(t),null;case 10:return Ba(t.type._context),tt(t),null;case 17:return ut(t.type)&&co(),tt(t),null;case 19:if(Pe(Ne),c=t.memoizedState,c===null)return tt(t),null;if(i=(t.flags&128)!==0,p=c.rendering,p===null)if(i)yi(c,!1);else{if(We!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(p=ko(e),p!==null){for(t.flags|=128,yi(c,!1),i=p.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)c=n,e=i,c.flags&=14680066,p=c.alternate,p===null?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=p.childLanes,c.lanes=p.lanes,c.child=p.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=p.memoizedProps,c.memoizedState=p.memoizedState,c.updateQueue=p.updateQueue,c.type=p.type,e=p.dependencies,c.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Re(Ne,Ne.current&1|2),t.child}e=e.sibling}c.tail!==null&&Fe()>jr&&(t.flags|=128,i=!0,yi(c,!1),t.lanes=4194304)}else{if(!i)if(e=ko(p),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),yi(c,!0),c.tail===null&&c.tailMode==="hidden"&&!p.alternate&&!ze)return tt(t),null}else 2*Fe()-c.renderingStartTime>jr&&n!==1073741824&&(t.flags|=128,i=!0,yi(c,!1),t.lanes=4194304);c.isBackwards?(p.sibling=t.child,t.child=p):(n=c.last,n!==null?n.sibling=p:t.child=p,c.last=p)}return c.tail!==null?(t=c.tail,c.rendering=t,c.tail=t.sibling,c.renderingStartTime=Fe(),t.sibling=null,n=Ne.current,Re(Ne,i?n&1|2:n&1),t):(tt(t),null);case 22:case 23:return El(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&(t.mode&1)!==0?(wt&1073741824)!==0&&(tt(t),t.subtreeFlags&6&&(t.flags|=8192)):tt(t),null;case 24:return null;case 25:return null}throw Error(s(156,t.tag))}function Om(e,t){switch(Aa(t),t.tag){case 1:return ut(t.type)&&co(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wr(),Pe(lt),Pe(Ze),Qa(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return qa(t),null;case 13:if(Pe(Ne),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(s(340));mr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Pe(Ne),null;case 4:return wr(),null;case 10:return Ba(t.type._context),null;case 22:case 23:return El(),null;case 24:return null;default:return null}}var zo=!1,nt=!1,Am=typeof WeakSet=="function"?WeakSet:Set,X=null;function kr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Oe(e,t,i)}else n.current=null}function hl(e,t,n){try{n()}catch(i){Oe(e,t,i)}}var mf=!1;function Im(e,t){if(Ea=Ki,e=Gc(),ya(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{n.nodeType,c.nodeType}catch{n=null;break e}var p=0,v=-1,w=-1,P=0,F=0,$=e,I=null;t:for(;;){for(var J;$!==n||a!==0&&$.nodeType!==3||(v=p+a),$!==c||i!==0&&$.nodeType!==3||(w=p+i),$.nodeType===3&&(p+=$.nodeValue.length),(J=$.firstChild)!==null;)I=$,$=J;for(;;){if($===e)break t;if(I===n&&++P===a&&(v=p),I===c&&++F===i&&(w=p),(J=$.nextSibling)!==null)break;$=I,I=$.parentNode}$=J}n=v===-1||w===-1?null:{start:v,end:w}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ra={focusedElem:e,selectionRange:n},Ki=!1,X=t;X!==null;)if(t=X,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,X=e;else for(;X!==null;){t=X;try{var Z=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(Z!==null){var te=Z.memoizedProps,De=Z.memoizedState,R=t.stateNode,b=R.getSnapshotBeforeUpdate(t.elementType===t.type?te:Lt(t.type,te),De);R.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var _=t.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(s(163))}}catch(U){Oe(t,t.return,U)}if(e=t.sibling,e!==null){e.return=t.return,X=e;break}X=t.return}return Z=mf,mf=!1,Z}function xi(e,t,n){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&e)===e){var c=a.destroy;a.destroy=void 0,c!==void 0&&hl(t,n,c)}a=a.next}while(a!==i)}}function No(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var i=n.create;n.destroy=i()}n=n.next}while(n!==t)}}function gl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function vf(e){var t=e.alternate;t!==null&&(e.alternate=null,vf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Bt],delete t[li],delete t[za],delete t[ym],delete t[xm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function yf(e){return e.tag===5||e.tag===3||e.tag===4}function xf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||yf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ml(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=lo));else if(i!==4&&(e=e.child,e!==null))for(ml(e,t,n),e=e.sibling;e!==null;)ml(e,t,n),e=e.sibling}function vl(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(vl(e,t,n),e=e.sibling;e!==null;)vl(e,t,n),e=e.sibling}var Ke=null,Ot=!1;function mn(e,t,n){for(n=n.child;n!==null;)wf(e,t,n),n=n.sibling}function wf(e,t,n){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Wi,n)}catch{}switch(n.tag){case 5:nt||kr(n,t);case 6:var i=Ke,a=Ot;Ke=null,mn(e,t,n),Ke=i,Ot=a,Ke!==null&&(Ot?(e=Ke,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ke.removeChild(n.stateNode));break;case 18:Ke!==null&&(Ot?(e=Ke,n=n.stateNode,e.nodeType===8?Ta(e.parentNode,n):e.nodeType===1&&Ta(e,n),Jr(e)):Ta(Ke,n.stateNode));break;case 4:i=Ke,a=Ot,Ke=n.stateNode.containerInfo,Ot=!0,mn(e,t,n),Ke=i,Ot=a;break;case 0:case 11:case 14:case 15:if(!nt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){a=i=i.next;do{var c=a,p=c.destroy;c=c.tag,p!==void 0&&((c&2)!==0||(c&4)!==0)&&hl(n,t,p),a=a.next}while(a!==i)}mn(e,t,n);break;case 1:if(!nt&&(kr(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(v){Oe(n,t,v)}mn(e,t,n);break;case 21:mn(e,t,n);break;case 22:n.mode&1?(nt=(i=nt)||n.memoizedState!==null,mn(e,t,n),nt=i):mn(e,t,n);break;default:mn(e,t,n)}}function bf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Am),t.forEach(function(i){var a=Vm.bind(null,e,i);n.has(i)||(n.add(i),i.then(a,a))})}}function At(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];try{var c=e,p=t,v=p;e:for(;v!==null;){switch(v.tag){case 5:Ke=v.stateNode,Ot=!1;break e;case 3:Ke=v.stateNode.containerInfo,Ot=!0;break e;case 4:Ke=v.stateNode.containerInfo,Ot=!0;break e}v=v.return}if(Ke===null)throw Error(s(160));wf(c,p,a),Ke=null,Ot=!1;var w=a.alternate;w!==null&&(w.return=null),a.return=null}catch(P){Oe(a,t,P)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)kf(t,e),t=t.sibling}function kf(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(At(t,e),Wt(e),i&4){try{xi(3,e,e.return),No(3,e)}catch(te){Oe(e,e.return,te)}try{xi(5,e,e.return)}catch(te){Oe(e,e.return,te)}}break;case 1:At(t,e),Wt(e),i&512&&n!==null&&kr(n,n.return);break;case 5:if(At(t,e),Wt(e),i&512&&n!==null&&kr(n,n.return),e.flags&32){var a=e.stateNode;try{Mr(a,"")}catch(te){Oe(e,e.return,te)}}if(i&4&&(a=e.stateNode,a!=null)){var c=e.memoizedProps,p=n!==null?n.memoizedProps:c,v=e.type,w=e.updateQueue;if(e.updateQueue=null,w!==null)try{v==="input"&&c.type==="radio"&&c.name!=null&&Yu(a,c),Qs(v,p);var P=Qs(v,c);for(p=0;p<w.length;p+=2){var F=w[p],$=w[p+1];F==="style"?rc(a,$):F==="dangerouslySetInnerHTML"?tc(a,$):F==="children"?Mr(a,$):H(a,F,$,P)}switch(v){case"input":Hs(a,c);break;case"textarea":Xu(a,c);break;case"select":var I=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!c.multiple;var J=c.value;J!=null?tr(a,!!c.multiple,J,!1):I!==!!c.multiple&&(c.defaultValue!=null?tr(a,!!c.multiple,c.defaultValue,!0):tr(a,!!c.multiple,c.multiple?[]:"",!1))}a[li]=c}catch(te){Oe(e,e.return,te)}}break;case 6:if(At(t,e),Wt(e),i&4){if(e.stateNode===null)throw Error(s(162));a=e.stateNode,c=e.memoizedProps;try{a.nodeValue=c}catch(te){Oe(e,e.return,te)}}break;case 3:if(At(t,e),Wt(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Jr(t.containerInfo)}catch(te){Oe(e,e.return,te)}break;case 4:At(t,e),Wt(e);break;case 13:At(t,e),Wt(e),a=e.child,a.flags&8192&&(c=a.memoizedState!==null,a.stateNode.isHidden=c,!c||a.alternate!==null&&a.alternate.memoizedState!==null||(wl=Fe())),i&4&&bf(e);break;case 22:if(F=n!==null&&n.memoizedState!==null,e.mode&1?(nt=(P=nt)||F,At(t,e),nt=P):At(t,e),Wt(e),i&8192){if(P=e.memoizedState!==null,(e.stateNode.isHidden=P)&&!F&&(e.mode&1)!==0)for(X=e,F=e.child;F!==null;){for($=X=F;X!==null;){switch(I=X,J=I.child,I.tag){case 0:case 11:case 14:case 15:xi(4,I,I.return);break;case 1:kr(I,I.return);var Z=I.stateNode;if(typeof Z.componentWillUnmount=="function"){i=I,n=I.return;try{t=i,Z.props=t.memoizedProps,Z.state=t.memoizedState,Z.componentWillUnmount()}catch(te){Oe(i,n,te)}}break;case 5:kr(I,I.return);break;case 22:if(I.memoizedState!==null){Cf($);continue}}J!==null?(J.return=I,X=J):Cf($)}F=F.sibling}e:for(F=null,$=e;;){if($.tag===5){if(F===null){F=$;try{a=$.stateNode,P?(c=a.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(v=$.stateNode,w=$.memoizedProps.style,p=w!=null&&w.hasOwnProperty("display")?w.display:null,v.style.display=nc("display",p))}catch(te){Oe(e,e.return,te)}}}else if($.tag===6){if(F===null)try{$.stateNode.nodeValue=P?"":$.memoizedProps}catch(te){Oe(e,e.return,te)}}else if(($.tag!==22&&$.tag!==23||$.memoizedState===null||$===e)&&$.child!==null){$.child.return=$,$=$.child;continue}if($===e)break e;for(;$.sibling===null;){if($.return===null||$.return===e)break e;F===$&&(F=null),$=$.return}F===$&&(F=null),$.sibling.return=$.return,$=$.sibling}}break;case 19:At(t,e),Wt(e),i&4&&bf(e);break;case 21:break;default:At(t,e),Wt(e)}}function Wt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(yf(n)){var i=n;break e}n=n.return}throw Error(s(160))}switch(i.tag){case 5:var a=i.stateNode;i.flags&32&&(Mr(a,""),i.flags&=-33);var c=xf(e);vl(e,c,a);break;case 3:case 4:var p=i.stateNode.containerInfo,v=xf(e);ml(e,v,p);break;default:throw Error(s(161))}}catch(w){Oe(e,e.return,w)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Fm(e,t,n){X=e,Sf(e)}function Sf(e,t,n){for(var i=(e.mode&1)!==0;X!==null;){var a=X,c=a.child;if(a.tag===22&&i){var p=a.memoizedState!==null||zo;if(!p){var v=a.alternate,w=v!==null&&v.memoizedState!==null||nt;v=zo;var P=nt;if(zo=p,(nt=w)&&!P)for(X=a;X!==null;)p=X,w=p.child,p.tag===22&&p.memoizedState!==null?Ef(a):w!==null?(w.return=p,X=w):Ef(a);for(;c!==null;)X=c,Sf(c),c=c.sibling;X=a,zo=v,nt=P}jf(e)}else(a.subtreeFlags&8772)!==0&&c!==null?(c.return=a,X=c):jf(e)}}function jf(e){for(;X!==null;){var t=X;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:nt||No(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!nt)if(n===null)i.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Lt(t.type,n.memoizedProps);i.componentDidUpdate(a,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var c=t.updateQueue;c!==null&&jd(t,c,i);break;case 3:var p=t.updateQueue;if(p!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}jd(t,p,n)}break;case 5:var v=t.stateNode;if(n===null&&t.flags&4){n=v;var w=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":w.autoFocus&&n.focus();break;case"img":w.src&&(n.src=w.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var P=t.alternate;if(P!==null){var F=P.memoizedState;if(F!==null){var $=F.dehydrated;$!==null&&Jr($)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(s(163))}nt||t.flags&512&&gl(t)}catch(I){Oe(t,t.return,I)}}if(t===e){X=null;break}if(n=t.sibling,n!==null){n.return=t.return,X=n;break}X=t.return}}function Cf(e){for(;X!==null;){var t=X;if(t===e){X=null;break}var n=t.sibling;if(n!==null){n.return=t.return,X=n;break}X=t.return}}function Ef(e){for(;X!==null;){var t=X;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{No(4,t)}catch(w){Oe(t,n,w)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var a=t.return;try{i.componentDidMount()}catch(w){Oe(t,a,w)}}var c=t.return;try{gl(t)}catch(w){Oe(t,c,w)}break;case 5:var p=t.return;try{gl(t)}catch(w){Oe(t,p,w)}}}catch(w){Oe(t,t.return,w)}if(t===e){X=null;break}var v=t.sibling;if(v!==null){v.return=t.return,X=v;break}X=t.return}}var Dm=Math.ceil,Lo=Y.ReactCurrentDispatcher,yl=Y.ReactCurrentOwner,Et=Y.ReactCurrentBatchConfig,xe=0,qe=null,$e=null,Je=0,wt=0,Sr=dn(0),We=0,wi=null,Fn=0,Oo=0,xl=0,bi=null,dt=null,wl=0,jr=1/0,en=null,Ao=!1,bl=null,vn=null,Io=!1,yn=null,Fo=0,ki=0,kl=null,Do=-1,$o=0;function st(){return(xe&6)!==0?Fe():Do!==-1?Do:Do=Fe()}function xn(e){return(e.mode&1)===0?1:(xe&2)!==0&&Je!==0?Je&-Je:bm.transition!==null?($o===0&&($o=yc()),$o):(e=Ce,e!==0||(e=window.event,e=e===void 0?16:Rc(e.type)),e)}function It(e,t,n,i){if(50<ki)throw ki=0,kl=null,Error(s(185));qr(e,n,i),((xe&2)===0||e!==qe)&&(e===qe&&((xe&2)===0&&(Oo|=n),We===4&&wn(e,Je)),ft(e,i),n===1&&xe===0&&(t.mode&1)===0&&(jr=Fe()+500,po&&pn()))}function ft(e,t){var n=e.callbackNode;bg(e,t);var i=Gi(e,e===qe?Je:0);if(i===0)n!==null&&gc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(n!=null&&gc(n),t===1)e.tag===0?wm(_f.bind(null,e)):fd(_f.bind(null,e)),mm(function(){(xe&6)===0&&pn()}),n=null;else{switch(xc(i)){case 1:n=ta;break;case 4:n=mc;break;case 16:n=Hi;break;case 536870912:n=vc;break;default:n=Hi}n=If(n,Rf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Rf(e,t){if(Do=-1,$o=0,(xe&6)!==0)throw Error(s(327));var n=e.callbackNode;if(Cr()&&e.callbackNode!==n)return null;var i=Gi(e,e===qe?Je:0);if(i===0)return null;if((i&30)!==0||(i&e.expiredLanes)!==0||t)t=Mo(e,i);else{t=i;var a=xe;xe|=2;var c=Tf();(qe!==e||Je!==t)&&(en=null,jr=Fe()+500,$n(e,t));do try{Bm();break}catch(v){Pf(e,v)}while(!0);Ma(),Lo.current=c,xe=a,$e!==null?t=0:(qe=null,Je=0,t=We)}if(t!==0){if(t===2&&(a=na(e),a!==0&&(i=a,t=Sl(e,a))),t===1)throw n=wi,$n(e,0),wn(e,i),ft(e,Fe()),n;if(t===6)wn(e,i);else{if(a=e.current.alternate,(i&30)===0&&!$m(a)&&(t=Mo(e,i),t===2&&(c=na(e),c!==0&&(i=c,t=Sl(e,c))),t===1))throw n=wi,$n(e,0),wn(e,i),ft(e,Fe()),n;switch(e.finishedWork=a,e.finishedLanes=i,t){case 0:case 1:throw Error(s(345));case 2:Mn(e,dt,en);break;case 3:if(wn(e,i),(i&130023424)===i&&(t=wl+500-Fe(),10<t)){if(Gi(e,0)!==0)break;if(a=e.suspendedLanes,(a&i)!==i){st(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Pa(Mn.bind(null,e,dt,en),t);break}Mn(e,dt,en);break;case 4:if(wn(e,i),(i&4194240)===i)break;for(t=e.eventTimes,a=-1;0<i;){var p=31-Tt(i);c=1<<p,p=t[p],p>a&&(a=p),i&=~c}if(i=a,i=Fe()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Dm(i/1960))-i,10<i){e.timeoutHandle=Pa(Mn.bind(null,e,dt,en),i);break}Mn(e,dt,en);break;case 5:Mn(e,dt,en);break;default:throw Error(s(329))}}}return ft(e,Fe()),e.callbackNode===n?Rf.bind(null,e):null}function Sl(e,t){var n=bi;return e.current.memoizedState.isDehydrated&&($n(e,t).flags|=256),e=Mo(e,t),e!==2&&(t=dt,dt=n,t!==null&&jl(t)),e}function jl(e){dt===null?dt=e:dt.push.apply(dt,e)}function $m(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var a=n[i],c=a.getSnapshot;a=a.value;try{if(!zt(c(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wn(e,t){for(t&=~xl,t&=~Oo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Tt(t),i=1<<n;e[n]=-1,t&=~i}}function _f(e){if((xe&6)!==0)throw Error(s(327));Cr();var t=Gi(e,0);if((t&1)===0)return ft(e,Fe()),null;var n=Mo(e,t);if(e.tag!==0&&n===2){var i=na(e);i!==0&&(t=i,n=Sl(e,i))}if(n===1)throw n=wi,$n(e,0),wn(e,t),ft(e,Fe()),n;if(n===6)throw Error(s(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Mn(e,dt,en),ft(e,Fe()),null}function Cl(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===0&&(jr=Fe()+500,po&&pn())}}function Dn(e){yn!==null&&yn.tag===0&&(xe&6)===0&&Cr();var t=xe;xe|=1;var n=Et.transition,i=Ce;try{if(Et.transition=null,Ce=1,e)return e()}finally{Ce=i,Et.transition=n,xe=t,(xe&6)===0&&pn()}}function El(){wt=Sr.current,Pe(Sr)}function $n(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,gm(n)),$e!==null)for(n=$e.return;n!==null;){var i=n;switch(Aa(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&co();break;case 3:wr(),Pe(lt),Pe(Ze),Qa();break;case 5:qa(i);break;case 4:wr();break;case 13:Pe(Ne);break;case 19:Pe(Ne);break;case 10:Ba(i.type._context);break;case 22:case 23:El()}n=n.return}if(qe=e,$e=e=bn(e.current,null),Je=wt=t,We=0,wi=null,xl=Oo=Fn=0,dt=bi=null,On!==null){for(t=0;t<On.length;t++)if(n=On[t],i=n.interleaved,i!==null){n.interleaved=null;var a=i.next,c=n.pending;if(c!==null){var p=c.next;c.next=a,i.next=p}n.pending=i}On=null}return e}function Pf(e,t){do{var n=$e;try{if(Ma(),So.current=Ro,jo){for(var i=Le.memoizedState;i!==null;){var a=i.queue;a!==null&&(a.pending=null),i=i.next}jo=!1}if(In=0,Ve=He=Le=null,hi=!1,gi=0,yl.current=null,n===null||n.return===null){We=1,wi=t,$e=null;break}e:{var c=e,p=n.return,v=n,w=t;if(t=Je,v.flags|=32768,w!==null&&typeof w=="object"&&typeof w.then=="function"){var P=w,F=v,$=F.tag;if((F.mode&1)===0&&($===0||$===11||$===15)){var I=F.alternate;I?(F.updateQueue=I.updateQueue,F.memoizedState=I.memoizedState,F.lanes=I.lanes):(F.updateQueue=null,F.memoizedState=null)}var J=Zd(p);if(J!==null){J.flags&=-257,ef(J,p,v,c,t),J.mode&1&&Xd(c,P,t),t=J,w=P;var Z=t.updateQueue;if(Z===null){var te=new Set;te.add(w),t.updateQueue=te}else Z.add(w);break e}else{if((t&1)===0){Xd(c,P,t),Rl();break e}w=Error(s(426))}}else if(ze&&v.mode&1){var De=Zd(p);if(De!==null){(De.flags&65536)===0&&(De.flags|=256),ef(De,p,v,c,t),Da(br(w,v));break e}}c=w=br(w,v),We!==4&&(We=2),bi===null?bi=[c]:bi.push(c),c=p;do{switch(c.tag){case 3:c.flags|=65536,t&=-t,c.lanes|=t;var R=Kd(c,w,t);Sd(c,R);break e;case 1:v=w;var b=c.type,_=c.stateNode;if((c.flags&128)===0&&(typeof b.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(vn===null||!vn.has(_)))){c.flags|=65536,t&=-t,c.lanes|=t;var U=Jd(c,v,t);Sd(c,U);break e}}c=c.return}while(c!==null)}Nf(n)}catch(ne){t=ne,$e===n&&n!==null&&($e=n=n.return);continue}break}while(!0)}function Tf(){var e=Lo.current;return Lo.current=Ro,e===null?Ro:e}function Rl(){(We===0||We===3||We===2)&&(We=4),qe===null||(Fn&268435455)===0&&(Oo&268435455)===0||wn(qe,Je)}function Mo(e,t){var n=xe;xe|=2;var i=Tf();(qe!==e||Je!==t)&&(en=null,$n(e,t));do try{Mm();break}catch(a){Pf(e,a)}while(!0);if(Ma(),xe=n,Lo.current=i,$e!==null)throw Error(s(261));return qe=null,Je=0,We}function Mm(){for(;$e!==null;)zf($e)}function Bm(){for(;$e!==null&&!fg();)zf($e)}function zf(e){var t=Af(e.alternate,e,wt);e.memoizedProps=e.pendingProps,t===null?Nf(e):$e=t,yl.current=null}function Nf(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Lm(n,t,wt),n!==null){$e=n;return}}else{if(n=Om(n,t),n!==null){n.flags&=32767,$e=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{We=6,$e=null;return}}if(t=t.sibling,t!==null){$e=t;return}$e=t=e}while(t!==null);We===0&&(We=5)}function Mn(e,t,n){var i=Ce,a=Et.transition;try{Et.transition=null,Ce=1,Um(e,t,n,i)}finally{Et.transition=a,Ce=i}return null}function Um(e,t,n,i){do Cr();while(yn!==null);if((xe&6)!==0)throw Error(s(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(s(177));e.callbackNode=null,e.callbackPriority=0;var c=n.lanes|n.childLanes;if(kg(e,c),e===qe&&($e=qe=null,Je=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Io||(Io=!0,If(Hi,function(){return Cr(),null})),c=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||c){c=Et.transition,Et.transition=null;var p=Ce;Ce=1;var v=xe;xe|=4,yl.current=null,Im(e,n),kf(n,e),lm(Ra),Ki=!!Ea,Ra=Ea=null,e.current=n,Fm(n),pg(),xe=v,Ce=p,Et.transition=c}else e.current=n;if(Io&&(Io=!1,yn=e,Fo=a),c=e.pendingLanes,c===0&&(vn=null),mg(n.stateNode),ft(e,Fe()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],i(a.value,{componentStack:a.stack,digest:a.digest});if(Ao)throw Ao=!1,e=bl,bl=null,e;return(Fo&1)!==0&&e.tag!==0&&Cr(),c=e.pendingLanes,(c&1)!==0?e===kl?ki++:(ki=0,kl=e):ki=0,pn(),null}function Cr(){if(yn!==null){var e=xc(Fo),t=Et.transition,n=Ce;try{if(Et.transition=null,Ce=16>e?16:e,yn===null)var i=!1;else{if(e=yn,yn=null,Fo=0,(xe&6)!==0)throw Error(s(331));var a=xe;for(xe|=4,X=e.current;X!==null;){var c=X,p=c.child;if((X.flags&16)!==0){var v=c.deletions;if(v!==null){for(var w=0;w<v.length;w++){var P=v[w];for(X=P;X!==null;){var F=X;switch(F.tag){case 0:case 11:case 15:xi(8,F,c)}var $=F.child;if($!==null)$.return=F,X=$;else for(;X!==null;){F=X;var I=F.sibling,J=F.return;if(vf(F),F===P){X=null;break}if(I!==null){I.return=J,X=I;break}X=J}}}var Z=c.alternate;if(Z!==null){var te=Z.child;if(te!==null){Z.child=null;do{var De=te.sibling;te.sibling=null,te=De}while(te!==null)}}X=c}}if((c.subtreeFlags&2064)!==0&&p!==null)p.return=c,X=p;else e:for(;X!==null;){if(c=X,(c.flags&2048)!==0)switch(c.tag){case 0:case 11:case 15:xi(9,c,c.return)}var R=c.sibling;if(R!==null){R.return=c.return,X=R;break e}X=c.return}}var b=e.current;for(X=b;X!==null;){p=X;var _=p.child;if((p.subtreeFlags&2064)!==0&&_!==null)_.return=p,X=_;else e:for(p=b;X!==null;){if(v=X,(v.flags&2048)!==0)try{switch(v.tag){case 0:case 11:case 15:No(9,v)}}catch(ne){Oe(v,v.return,ne)}if(v===p){X=null;break e}var U=v.sibling;if(U!==null){U.return=v.return,X=U;break e}X=v.return}}if(xe=a,pn(),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Wi,e)}catch{}i=!0}return i}finally{Ce=n,Et.transition=t}}return!1}function Lf(e,t,n){t=br(n,t),t=Kd(e,t,1),e=gn(e,t,1),t=st(),e!==null&&(qr(e,1,t),ft(e,t))}function Oe(e,t,n){if(e.tag===3)Lf(e,e,n);else for(;t!==null;){if(t.tag===3){Lf(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(vn===null||!vn.has(i))){e=br(n,e),e=Jd(t,e,1),t=gn(t,e,1),e=st(),t!==null&&(qr(t,1,e),ft(t,e));break}}t=t.return}}function Hm(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),t=st(),e.pingedLanes|=e.suspendedLanes&n,qe===e&&(Je&n)===n&&(We===4||We===3&&(Je&130023424)===Je&&500>Fe()-wl?$n(e,0):xl|=n),ft(e,t)}function Of(e,t){t===0&&((e.mode&1)===0?t=1:(t=qi,qi<<=1,(qi&130023424)===0&&(qi=4194304)));var n=st();e=Jt(e,t),e!==null&&(qr(e,t,n),ft(e,n))}function Wm(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Of(e,n)}function Vm(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(s(314))}i!==null&&i.delete(t),Of(e,n)}var Af;Af=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||lt.current)ct=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return ct=!1,Nm(e,t,n);ct=(e.flags&131072)!==0}else ct=!1,ze&&(t.flags&1048576)!==0&&pd(t,go,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;To(e,t),e=t.pendingProps;var a=pr(t,Ze.current);xr(t,n),a=Ja(null,t,i,e,a,n);var c=Xa();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ut(i)?(c=!0,fo(t)):c=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Wa(t),a.updater=_o,t.stateNode=a,a._reactInternals=t,il(t,i,e,n),t=ll(null,t,i,!0,c,n)):(t.tag=0,ze&&c&&Oa(t),ot(null,t,a,n),t=t.child),t;case 16:i=t.elementType;e:{switch(To(e,t),e=t.pendingProps,a=i._init,i=a(i._payload),t.type=i,a=t.tag=Gm(i),e=Lt(i,e),a){case 0:t=al(null,t,i,e,n);break e;case 1:t=af(null,t,i,e,n);break e;case 11:t=tf(null,t,i,e,n);break e;case 14:t=nf(null,t,i,Lt(i.type,e),n);break e}throw Error(s(306,i,""))}return t;case 0:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Lt(i,a),al(e,t,i,a,n);case 1:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Lt(i,a),af(e,t,i,a,n);case 3:e:{if(lf(t),e===null)throw Error(s(387));i=t.pendingProps,c=t.memoizedState,a=c.element,kd(e,t),bo(t,i,null,n);var p=t.memoizedState;if(i=p.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:p.cache,pendingSuspenseBoundaries:p.pendingSuspenseBoundaries,transitions:p.transitions},t.updateQueue.baseState=c,t.memoizedState=c,t.flags&256){a=br(Error(s(423)),t),t=uf(e,t,i,n,a);break e}else if(i!==a){a=br(Error(s(424)),t),t=uf(e,t,i,n,a);break e}else for(xt=cn(t.stateNode.containerInfo.firstChild),yt=t,ze=!0,Nt=null,n=wd(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(mr(),i===a){t=Zt(e,t,n);break e}ot(e,t,i,n)}t=t.child}return t;case 5:return Cd(t),e===null&&Fa(t),i=t.type,a=t.pendingProps,c=e!==null?e.memoizedProps:null,p=a.children,_a(i,a)?p=null:c!==null&&_a(i,c)&&(t.flags|=32),sf(e,t),ot(e,t,p,n),t.child;case 6:return e===null&&Fa(t),null;case 13:return cf(e,t,n);case 4:return Va(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=vr(t,null,i,n):ot(e,t,i,n),t.child;case 11:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Lt(i,a),tf(e,t,i,a,n);case 7:return ot(e,t,t.pendingProps,n),t.child;case 8:return ot(e,t,t.pendingProps.children,n),t.child;case 12:return ot(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(i=t.type._context,a=t.pendingProps,c=t.memoizedProps,p=a.value,Re(yo,i._currentValue),i._currentValue=p,c!==null)if(zt(c.value,p)){if(c.children===a.children&&!lt.current){t=Zt(e,t,n);break e}}else for(c=t.child,c!==null&&(c.return=t);c!==null;){var v=c.dependencies;if(v!==null){p=c.child;for(var w=v.firstContext;w!==null;){if(w.context===i){if(c.tag===1){w=Xt(-1,n&-n),w.tag=2;var P=c.updateQueue;if(P!==null){P=P.shared;var F=P.pending;F===null?w.next=w:(w.next=F.next,F.next=w),P.pending=w}}c.lanes|=n,w=c.alternate,w!==null&&(w.lanes|=n),Ua(c.return,n,t),v.lanes|=n;break}w=w.next}}else if(c.tag===10)p=c.type===t.type?null:c.child;else if(c.tag===18){if(p=c.return,p===null)throw Error(s(341));p.lanes|=n,v=p.alternate,v!==null&&(v.lanes|=n),Ua(p,n,t),p=c.sibling}else p=c.child;if(p!==null)p.return=c;else for(p=c;p!==null;){if(p===t){p=null;break}if(c=p.sibling,c!==null){c.return=p.return,p=c;break}p=p.return}c=p}ot(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,i=t.pendingProps.children,xr(t,n),a=jt(a),i=i(a),t.flags|=1,ot(e,t,i,n),t.child;case 14:return i=t.type,a=Lt(i,t.pendingProps),a=Lt(i.type,a),nf(e,t,i,a,n);case 15:return rf(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Lt(i,a),To(e,t),t.tag=1,ut(i)?(e=!0,fo(t)):e=!1,xr(t,n),Qd(t,i,a),il(t,i,a,n),ll(null,t,i,!0,e,n);case 19:return ff(e,t,n);case 22:return of(e,t,n)}throw Error(s(156,t.tag))};function If(e,t){return hc(e,t)}function qm(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rt(e,t,n,i){return new qm(e,t,n,i)}function _l(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gm(e){if(typeof e=="function")return _l(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ye)return 11;if(e===ge)return 14}return 2}function bn(e,t){var n=e.alternate;return n===null?(n=Rt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Bo(e,t,n,i,a,c){var p=2;if(i=e,typeof e=="function")_l(e)&&(p=1);else if(typeof e=="string")p=5;else e:switch(e){case K:return Bn(n.children,a,c,t);case je:p=8,a|=8;break;case ye:return e=Rt(12,n,t,a|2),e.elementType=ye,e.lanes=c,e;case Ue:return e=Rt(13,n,t,a),e.elementType=Ue,e.lanes=c,e;case W:return e=Rt(19,n,t,a),e.elementType=W,e.lanes=c,e;case ke:return Uo(n,a,c,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Xe:p=10;break e;case it:p=9;break e;case Ye:p=11;break e;case ge:p=14;break e;case be:p=16,i=null;break e}throw Error(s(130,e==null?e:typeof e,""))}return t=Rt(p,n,t,a),t.elementType=e,t.type=i,t.lanes=c,t}function Bn(e,t,n,i){return e=Rt(7,e,i,t),e.lanes=n,e}function Uo(e,t,n,i){return e=Rt(22,e,i,t),e.elementType=ke,e.lanes=n,e.stateNode={isHidden:!1},e}function Pl(e,t,n){return e=Rt(6,e,null,t),e.lanes=n,e}function Tl(e,t,n){return t=Rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Qm(e,t,n,i,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ra(0),this.expirationTimes=ra(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ra(0),this.identifierPrefix=i,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function zl(e,t,n,i,a,c,p,v,w){return e=new Qm(e,t,n,v,w),t===1?(t=1,c===!0&&(t|=8)):t=0,c=Rt(3,null,null,t),e.current=c,c.stateNode=e,c.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Wa(c),e}function Ym(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:G,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}function Ff(e){if(!e)return fn;e=e._reactInternals;e:{if(Pn(e)!==e||e.tag!==1)throw Error(s(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ut(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(s(171))}if(e.tag===1){var n=e.type;if(ut(n))return cd(e,n,t)}return t}function Df(e,t,n,i,a,c,p,v,w){return e=zl(n,i,!0,e,a,c,p,v,w),e.context=Ff(null),n=e.current,i=st(),a=xn(n),c=Xt(i,a),c.callback=t??null,gn(n,c,a),e.current.lanes=a,qr(e,a,i),ft(e,i),e}function Ho(e,t,n,i){var a=t.current,c=st(),p=xn(a);return n=Ff(n),t.context===null?t.context=n:t.pendingContext=n,t=Xt(c,p),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=gn(a,t,p),e!==null&&(It(e,a,p,c),wo(e,a,p)),p}function Wo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function $f(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Nl(e,t){$f(e,t),(e=e.alternate)&&$f(e,t)}function Km(){return null}var Mf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ll(e){this._internalRoot=e}Vo.prototype.render=Ll.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(s(409));Ho(e,t,null,null)},Vo.prototype.unmount=Ll.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Dn(function(){Ho(null,e,null,null)}),t[Gt]=null}};function Vo(e){this._internalRoot=e}Vo.prototype.unstable_scheduleHydration=function(e){if(e){var t=kc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<an.length&&t!==0&&t<an[n].priority;n++);an.splice(n,0,e),n===0&&Cc(e)}};function Ol(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function qo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Bf(){}function Jm(e,t,n,i,a){if(a){if(typeof i=="function"){var c=i;i=function(){var P=Wo(p);c.call(P)}}var p=Df(t,i,e,0,null,!1,!1,"",Bf);return e._reactRootContainer=p,e[Gt]=p.current,si(e.nodeType===8?e.parentNode:e),Dn(),p}for(;a=e.lastChild;)e.removeChild(a);if(typeof i=="function"){var v=i;i=function(){var P=Wo(w);v.call(P)}}var w=zl(e,0,!1,null,null,!1,!1,"",Bf);return e._reactRootContainer=w,e[Gt]=w.current,si(e.nodeType===8?e.parentNode:e),Dn(function(){Ho(t,w,n,i)}),w}function Go(e,t,n,i,a){var c=n._reactRootContainer;if(c){var p=c;if(typeof a=="function"){var v=a;a=function(){var w=Wo(p);v.call(w)}}Ho(t,p,e,a)}else p=Jm(n,t,e,a,i);return Wo(p)}wc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vr(t.pendingLanes);n!==0&&(ia(t,n|1),ft(t,Fe()),(xe&6)===0&&(jr=Fe()+500,pn()))}break;case 13:Dn(function(){var i=Jt(e,1);if(i!==null){var a=st();It(i,e,1,a)}}),Nl(e,1)}},oa=function(e){if(e.tag===13){var t=Jt(e,134217728);if(t!==null){var n=st();It(t,e,134217728,n)}Nl(e,134217728)}},bc=function(e){if(e.tag===13){var t=xn(e),n=Jt(e,t);if(n!==null){var i=st();It(n,e,t,i)}Nl(e,t)}},kc=function(){return Ce},Sc=function(e,t){var n=Ce;try{return Ce=e,t()}finally{Ce=n}},Js=function(e,t,n){switch(t){case"input":if(Hs(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=uo(i);if(!a)throw Error(s(90));Ee(i),Hs(i,a)}}}break;case"textarea":Xu(e,n);break;case"select":t=n.value,t!=null&&tr(e,!!n.multiple,t,!1)}},ac=Cl,lc=Dn;var Xm={usingClientEntryPoint:!1,Events:[ui,dr,uo,oc,sc,Cl]},Si={findFiberByHostInstance:Tn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zm={bundleType:Si.bundleType,version:Si.version,rendererPackageName:Si.rendererPackageName,rendererConfig:Si.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Y.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fc(e),e===null?null:e.stateNode},findFiberByHostInstance:Si.findFiberByHostInstance||Km,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qo.isDisabled&&Qo.supportsFiber)try{Wi=Qo.inject(Zm),Mt=Qo}catch{}}return pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xm,pt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ol(t))throw Error(s(200));return Ym(e,t,null,n)},pt.createRoot=function(e,t){if(!Ol(e))throw Error(s(299));var n=!1,i="",a=Mf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=zl(e,1,!1,null,null,n,!1,i,a),e[Gt]=t.current,si(e.nodeType===8?e.parentNode:e),new Ll(t)},pt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=fc(t),e=e===null?null:e.stateNode,e},pt.flushSync=function(e){return Dn(e)},pt.hydrate=function(e,t,n){if(!qo(t))throw Error(s(200));return Go(null,e,t,!0,n)},pt.hydrateRoot=function(e,t,n){if(!Ol(e))throw Error(s(405));var i=n!=null&&n.hydratedSources||null,a=!1,c="",p=Mf;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(c=n.identifierPrefix),n.onRecoverableError!==void 0&&(p=n.onRecoverableError)),t=Df(t,null,e,1,n??null,a,!1,c,p),e[Gt]=t.current,si(e),i)for(e=0;e<i.length;e++)n=i[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Vo(t)},pt.render=function(e,t,n){if(!qo(t))throw Error(s(200));return Go(null,e,t,!1,n)},pt.unmountComponentAtNode=function(e){if(!qo(e))throw Error(s(40));return e._reactRootContainer?(Dn(function(){Go(null,null,e,!1,function(){e._reactRootContainer=null,e[Gt]=null})}),!0):!1},pt.unstable_batchedUpdates=Cl,pt.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!qo(n))throw Error(s(200));if(e==null||e._reactInternals===void 0)throw Error(s(38));return Go(e,t,n,!1,i)},pt.version="18.3.1-next-f1338f8080-20240426",pt}var Yf;function Kp(){if(Yf)return Fl.exports;Yf=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(o){console.error(o)}}return r(),Fl.exports=lv(),Fl.exports}var Kf;function uv(){if(Kf)return Yo;Kf=1;var r=Kp();return Yo.createRoot=r.createRoot,Yo.hydrateRoot=r.hydrateRoot,Yo}var cv=uv();const dv=Yp(cv);Kp();/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Pi(){return Pi=Object.assign?Object.assign.bind():function(r){for(var o=1;o<arguments.length;o++){var s=arguments[o];for(var u in s)Object.prototype.hasOwnProperty.call(s,u)&&(r[u]=s[u])}return r},Pi.apply(this,arguments)}var En;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(En||(En={}));const Jf="popstate";function fv(r){r===void 0&&(r={});function o(u,d){let{pathname:f,search:h,hash:m}=u.location;return xu("",{pathname:f,search:h,hash:m},d.state&&d.state.usr||null,d.state&&d.state.key||"default")}function s(u,d){return typeof d=="string"?d:ks(d)}return hv(o,s,null,r)}function Be(r,o){if(r===!1||r===null||typeof r>"u")throw new Error(o)}function Jp(r,o){if(!r){typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function pv(){return Math.random().toString(36).substr(2,8)}function Xf(r,o){return{usr:r.state,key:r.key,idx:o}}function xu(r,o,s,u){return s===void 0&&(s=null),Pi({pathname:typeof r=="string"?r:r.pathname,search:"",hash:""},typeof o=="string"?Ar(o):o,{state:s,key:o&&o.key||u||pv()})}function ks(r){let{pathname:o="/",search:s="",hash:u=""}=r;return s&&s!=="?"&&(o+=s.charAt(0)==="?"?s:"?"+s),u&&u!=="#"&&(o+=u.charAt(0)==="#"?u:"#"+u),o}function Ar(r){let o={};if(r){let s=r.indexOf("#");s>=0&&(o.hash=r.substr(s),r=r.substr(0,s));let u=r.indexOf("?");u>=0&&(o.search=r.substr(u),r=r.substr(0,u)),r&&(o.pathname=r)}return o}function hv(r,o,s,u){u===void 0&&(u={});let{window:d=document.defaultView,v5Compat:f=!1}=u,h=d.history,m=En.Pop,y=null,x=k();x==null&&(x=0,h.replaceState(Pi({},h.state,{idx:x}),""));function k(){return(h.state||{idx:null}).idx}function S(){m=En.Pop;let E=k(),M=E==null?null:E-x;x=E,y&&y({action:m,location:j.location,delta:M})}function O(E,M){m=En.Push;let B=xu(j.location,E,M);x=k()+1;let H=Xf(B,x),Y=j.createHref(B);try{h.pushState(H,"",Y)}catch(q){if(q instanceof DOMException&&q.name==="DataCloneError")throw q;d.location.assign(Y)}f&&y&&y({action:m,location:j.location,delta:1})}function D(E,M){m=En.Replace;let B=xu(j.location,E,M);x=k();let H=Xf(B,x),Y=j.createHref(B);h.replaceState(H,"",Y),f&&y&&y({action:m,location:j.location,delta:0})}function T(E){let M=d.location.origin!=="null"?d.location.origin:d.location.href,B=typeof E=="string"?E:ks(E);return B=B.replace(/ $/,"%20"),Be(M,"No window.location.(origin|href) available to create URL for href: "+B),new URL(B,M)}let j={get action(){return m},get location(){return r(d,h)},listen(E){if(y)throw new Error("A history only accepts one active listener");return d.addEventListener(Jf,S),y=E,()=>{d.removeEventListener(Jf,S),y=null}},createHref(E){return o(d,E)},createURL:T,encodeLocation(E){let M=T(E);return{pathname:M.pathname,search:M.search,hash:M.hash}},push:O,replace:D,go(E){return h.go(E)}};return j}var Zf;(function(r){r.data="data",r.deferred="deferred",r.redirect="redirect",r.error="error"})(Zf||(Zf={}));function gv(r,o,s){return s===void 0&&(s="/"),mv(r,o,s)}function mv(r,o,s,u){let d=typeof o=="string"?Ar(o):o,f=Du(d.pathname||"/",s);if(f==null)return null;let h=Xp(r);vv(h);let m=null;for(let y=0;m==null&&y<h.length;++y){let x=Pv(f);m=Ev(h[y],x)}return m}function Xp(r,o,s,u){o===void 0&&(o=[]),s===void 0&&(s=[]),u===void 0&&(u="");let d=(f,h,m)=>{let y={relativePath:m===void 0?f.path||"":m,caseSensitive:f.caseSensitive===!0,childrenIndex:h,route:f};y.relativePath.startsWith("/")&&(Be(y.relativePath.startsWith(u),'Absolute route path "'+y.relativePath+'" nested under path '+('"'+u+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),y.relativePath=y.relativePath.slice(u.length));let x=Rn([u,y.relativePath]),k=s.concat(y);f.children&&f.children.length>0&&(Be(f.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+x+'".')),Xp(f.children,o,k,x)),!(f.path==null&&!f.index)&&o.push({path:x,score:jv(x,f.index),routesMeta:k})};return r.forEach((f,h)=>{var m;if(f.path===""||!((m=f.path)!=null&&m.includes("?")))d(f,h);else for(let y of Zp(f.path))d(f,h,y)}),o}function Zp(r){let o=r.split("/");if(o.length===0)return[];let[s,...u]=o,d=s.endsWith("?"),f=s.replace(/\?$/,"");if(u.length===0)return d?[f,""]:[f];let h=Zp(u.join("/")),m=[];return m.push(...h.map(y=>y===""?f:[f,y].join("/"))),d&&m.push(...h),m.map(y=>r.startsWith("/")&&y===""?"/":y)}function vv(r){r.sort((o,s)=>o.score!==s.score?s.score-o.score:Cv(o.routesMeta.map(u=>u.childrenIndex),s.routesMeta.map(u=>u.childrenIndex)))}const yv=/^:[\w-]+$/,xv=3,wv=2,bv=1,kv=10,Sv=-2,ep=r=>r==="*";function jv(r,o){let s=r.split("/"),u=s.length;return s.some(ep)&&(u+=Sv),o&&(u+=wv),s.filter(d=>!ep(d)).reduce((d,f)=>d+(yv.test(f)?xv:f===""?bv:kv),u)}function Cv(r,o){return r.length===o.length&&r.slice(0,-1).every((u,d)=>u===o[d])?r[r.length-1]-o[o.length-1]:0}function Ev(r,o,s){let{routesMeta:u}=r,d={},f="/",h=[];for(let m=0;m<u.length;++m){let y=u[m],x=m===u.length-1,k=f==="/"?o:o.slice(f.length)||"/",S=Rv({path:y.relativePath,caseSensitive:y.caseSensitive,end:x},k),O=y.route;if(!S)return null;Object.assign(d,S.params),h.push({params:d,pathname:Rn([f,S.pathname]),pathnameBase:Lv(Rn([f,S.pathnameBase])),route:O}),S.pathnameBase!=="/"&&(f=Rn([f,S.pathnameBase]))}return h}function Rv(r,o){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[s,u]=_v(r.path,r.caseSensitive,r.end),d=o.match(s);if(!d)return null;let f=d[0],h=f.replace(/(.)\/+$/,"$1"),m=d.slice(1);return{params:u.reduce((x,k,S)=>{let{paramName:O,isOptional:D}=k;if(O==="*"){let j=m[S]||"";h=f.slice(0,f.length-j.length).replace(/(.)\/+$/,"$1")}const T=m[S];return D&&!T?x[O]=void 0:x[O]=(T||"").replace(/%2F/g,"/"),x},{}),pathname:f,pathnameBase:h,pattern:r}}function _v(r,o,s){o===void 0&&(o=!1),s===void 0&&(s=!0),Jp(r==="*"||!r.endsWith("*")||r.endsWith("/*"),'Route path "'+r+'" will be treated as if it were '+('"'+r.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+r.replace(/\*$/,"/*")+'".'));let u=[],d="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(h,m,y)=>(u.push({paramName:m,isOptional:y!=null}),y?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(u.push({paramName:"*"}),d+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):s?d+="\\/*$":r!==""&&r!=="/"&&(d+="(?:(?=\\/|$))"),[new RegExp(d,o?void 0:"i"),u]}function Pv(r){try{return r.split("/").map(o=>decodeURIComponent(o).replace(/\//g,"%2F")).join("/")}catch(o){return Jp(!1,'The URL path "'+r+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+o+").")),r}}function Du(r,o){if(o==="/")return r;if(!r.toLowerCase().startsWith(o.toLowerCase()))return null;let s=o.endsWith("/")?o.length-1:o.length,u=r.charAt(s);return u&&u!=="/"?null:r.slice(s)||"/"}function Tv(r,o){o===void 0&&(o="/");let{pathname:s,search:u="",hash:d=""}=typeof r=="string"?Ar(r):r;return{pathname:s?s.startsWith("/")?s:zv(s,o):o,search:Ov(u),hash:Av(d)}}function zv(r,o){let s=o.replace(/\/+$/,"").split("/");return r.split("/").forEach(d=>{d===".."?s.length>1&&s.pop():d!=="."&&s.push(d)}),s.length>1?s.join("/"):"/"}function Ml(r,o,s,u){return"Cannot include a '"+r+"' character in a manually specified "+("`to."+o+"` field ["+JSON.stringify(u)+"].  Please separate it out to the ")+("`to."+s+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Nv(r){return r.filter((o,s)=>s===0||o.route.path&&o.route.path.length>0)}function eh(r,o){let s=Nv(r);return o?s.map((u,d)=>d===s.length-1?u.pathname:u.pathnameBase):s.map(u=>u.pathnameBase)}function th(r,o,s,u){u===void 0&&(u=!1);let d;typeof r=="string"?d=Ar(r):(d=Pi({},r),Be(!d.pathname||!d.pathname.includes("?"),Ml("?","pathname","search",d)),Be(!d.pathname||!d.pathname.includes("#"),Ml("#","pathname","hash",d)),Be(!d.search||!d.search.includes("#"),Ml("#","search","hash",d)));let f=r===""||d.pathname==="",h=f?"/":d.pathname,m;if(h==null)m=s;else{let S=o.length-1;if(!u&&h.startsWith("..")){let O=h.split("/");for(;O[0]==="..";)O.shift(),S-=1;d.pathname=O.join("/")}m=S>=0?o[S]:"/"}let y=Tv(d,m),x=h&&h!=="/"&&h.endsWith("/"),k=(f||h===".")&&s.endsWith("/");return!y.pathname.endsWith("/")&&(x||k)&&(y.pathname+="/"),y}const Rn=r=>r.join("/").replace(/\/\/+/g,"/"),Lv=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),Ov=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,Av=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r;function Iv(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}const nh=["post","put","patch","delete"];new Set(nh);const Fv=["get",...nh];new Set(Fv);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ti(){return Ti=Object.assign?Object.assign.bind():function(r){for(var o=1;o<arguments.length;o++){var s=arguments[o];for(var u in s)Object.prototype.hasOwnProperty.call(s,u)&&(r[u]=s[u])}return r},Ti.apply(this,arguments)}const $u=N.createContext(null),Dv=N.createContext(null),er=N.createContext(null),Ps=N.createContext(null),_n=N.createContext({outlet:null,matches:[],isDataRoute:!1}),rh=N.createContext(null);function $v(r,o){let{relative:s}=o===void 0?{}:o;Li()||Be(!1);let{basename:u,navigator:d}=N.useContext(er),{hash:f,pathname:h,search:m}=oh(r,{relative:s}),y=h;return u!=="/"&&(y=h==="/"?u:Rn([u,h])),d.createHref({pathname:y,search:m,hash:f})}function Li(){return N.useContext(Ps)!=null}function Oi(){return Li()||Be(!1),N.useContext(Ps).location}function ih(r){N.useContext(er).static||N.useLayoutEffect(r)}function Ts(){let{isDataRoute:r}=N.useContext(_n);return r?Zv():Mv()}function Mv(){Li()||Be(!1);let r=N.useContext($u),{basename:o,future:s,navigator:u}=N.useContext(er),{matches:d}=N.useContext(_n),{pathname:f}=Oi(),h=JSON.stringify(eh(d,s.v7_relativeSplatPath)),m=N.useRef(!1);return ih(()=>{m.current=!0}),N.useCallback(function(x,k){if(k===void 0&&(k={}),!m.current)return;if(typeof x=="number"){u.go(x);return}let S=th(x,JSON.parse(h),f,k.relative==="path");r==null&&o!=="/"&&(S.pathname=S.pathname==="/"?o:Rn([o,S.pathname])),(k.replace?u.replace:u.push)(S,k.state,k)},[o,u,h,f,r])}function Bv(){let{matches:r}=N.useContext(_n),o=r[r.length-1];return o?o.params:{}}function oh(r,o){let{relative:s}=o===void 0?{}:o,{future:u}=N.useContext(er),{matches:d}=N.useContext(_n),{pathname:f}=Oi(),h=JSON.stringify(eh(d,u.v7_relativeSplatPath));return N.useMemo(()=>th(r,JSON.parse(h),f,s==="path"),[r,h,f,s])}function Uv(r,o){return Hv(r,o)}function Hv(r,o,s,u){Li()||Be(!1);let{navigator:d}=N.useContext(er),{matches:f}=N.useContext(_n),h=f[f.length-1],m=h?h.params:{};h&&h.pathname;let y=h?h.pathnameBase:"/";h&&h.route;let x=Oi(),k;if(o){var S;let E=typeof o=="string"?Ar(o):o;y==="/"||(S=E.pathname)!=null&&S.startsWith(y)||Be(!1),k=E}else k=x;let O=k.pathname||"/",D=O;if(y!=="/"){let E=y.replace(/^\//,"").split("/");D="/"+O.replace(/^\//,"").split("/").slice(E.length).join("/")}let T=gv(r,{pathname:D}),j=Qv(T&&T.map(E=>Object.assign({},E,{params:Object.assign({},m,E.params),pathname:Rn([y,d.encodeLocation?d.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?y:Rn([y,d.encodeLocation?d.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),f,s,u);return o&&j?N.createElement(Ps.Provider,{value:{location:Ti({pathname:"/",search:"",hash:"",state:null,key:"default"},k),navigationType:En.Pop}},j):j}function Wv(){let r=Xv(),o=Iv(r)?r.status+" "+r.statusText:r instanceof Error?r.message:JSON.stringify(r),s=r instanceof Error?r.stack:null,d={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return N.createElement(N.Fragment,null,N.createElement("h2",null,"Unexpected Application Error!"),N.createElement("h3",{style:{fontStyle:"italic"}},o),s?N.createElement("pre",{style:d},s):null,null)}const Vv=N.createElement(Wv,null);class qv extends N.Component{constructor(o){super(o),this.state={location:o.location,revalidation:o.revalidation,error:o.error}}static getDerivedStateFromError(o){return{error:o}}static getDerivedStateFromProps(o,s){return s.location!==o.location||s.revalidation!=="idle"&&o.revalidation==="idle"?{error:o.error,location:o.location,revalidation:o.revalidation}:{error:o.error!==void 0?o.error:s.error,location:s.location,revalidation:o.revalidation||s.revalidation}}componentDidCatch(o,s){console.error("React Router caught the following error during render",o,s)}render(){return this.state.error!==void 0?N.createElement(_n.Provider,{value:this.props.routeContext},N.createElement(rh.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Gv(r){let{routeContext:o,match:s,children:u}=r,d=N.useContext($u);return d&&d.static&&d.staticContext&&(s.route.errorElement||s.route.ErrorBoundary)&&(d.staticContext._deepestRenderedBoundaryId=s.route.id),N.createElement(_n.Provider,{value:o},u)}function Qv(r,o,s,u){var d;if(o===void 0&&(o=[]),s===void 0&&(s=null),u===void 0&&(u=null),r==null){var f;if(!s)return null;if(s.errors)r=s.matches;else if((f=u)!=null&&f.v7_partialHydration&&o.length===0&&!s.initialized&&s.matches.length>0)r=s.matches;else return null}let h=r,m=(d=s)==null?void 0:d.errors;if(m!=null){let k=h.findIndex(S=>S.route.id&&(m==null?void 0:m[S.route.id])!==void 0);k>=0||Be(!1),h=h.slice(0,Math.min(h.length,k+1))}let y=!1,x=-1;if(s&&u&&u.v7_partialHydration)for(let k=0;k<h.length;k++){let S=h[k];if((S.route.HydrateFallback||S.route.hydrateFallbackElement)&&(x=k),S.route.id){let{loaderData:O,errors:D}=s,T=S.route.loader&&O[S.route.id]===void 0&&(!D||D[S.route.id]===void 0);if(S.route.lazy||T){y=!0,x>=0?h=h.slice(0,x+1):h=[h[0]];break}}}return h.reduceRight((k,S,O)=>{let D,T=!1,j=null,E=null;s&&(D=m&&S.route.id?m[S.route.id]:void 0,j=S.route.errorElement||Vv,y&&(x<0&&O===0?(e0("route-fallback"),T=!0,E=null):x===O&&(T=!0,E=S.route.hydrateFallbackElement||null)));let M=o.concat(h.slice(0,O+1)),B=()=>{let H;return D?H=j:T?H=E:S.route.Component?H=N.createElement(S.route.Component,null):S.route.element?H=S.route.element:H=k,N.createElement(Gv,{match:S,routeContext:{outlet:k,matches:M,isDataRoute:s!=null},children:H})};return s&&(S.route.ErrorBoundary||S.route.errorElement||O===0)?N.createElement(qv,{location:s.location,revalidation:s.revalidation,component:j,error:D,children:B(),routeContext:{outlet:null,matches:M,isDataRoute:!0}}):B()},null)}var sh=(function(r){return r.UseBlocker="useBlocker",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r})(sh||{}),ah=(function(r){return r.UseBlocker="useBlocker",r.UseLoaderData="useLoaderData",r.UseActionData="useActionData",r.UseRouteError="useRouteError",r.UseNavigation="useNavigation",r.UseRouteLoaderData="useRouteLoaderData",r.UseMatches="useMatches",r.UseRevalidator="useRevalidator",r.UseNavigateStable="useNavigate",r.UseRouteId="useRouteId",r})(ah||{});function Yv(r){let o=N.useContext($u);return o||Be(!1),o}function Kv(r){let o=N.useContext(Dv);return o||Be(!1),o}function Jv(r){let o=N.useContext(_n);return o||Be(!1),o}function lh(r){let o=Jv(),s=o.matches[o.matches.length-1];return s.route.id||Be(!1),s.route.id}function Xv(){var r;let o=N.useContext(rh),s=Kv(),u=lh();return o!==void 0?o:(r=s.errors)==null?void 0:r[u]}function Zv(){let{router:r}=Yv(sh.UseNavigateStable),o=lh(ah.UseNavigateStable),s=N.useRef(!1);return ih(()=>{s.current=!0}),N.useCallback(function(d,f){f===void 0&&(f={}),s.current&&(typeof d=="number"?r.navigate(d):r.navigate(d,Ti({fromRouteId:o},f)))},[r,o])}const tp={};function e0(r,o,s){tp[r]||(tp[r]=!0)}function t0(r,o){r==null||r.v7_startTransition,r==null||r.v7_relativeSplatPath}function _t(r){Be(!1)}function n0(r){let{basename:o="/",children:s=null,location:u,navigationType:d=En.Pop,navigator:f,static:h=!1,future:m}=r;Li()&&Be(!1);let y=o.replace(/^\/*/,"/"),x=N.useMemo(()=>({basename:y,navigator:f,static:h,future:Ti({v7_relativeSplatPath:!1},m)}),[y,m,f,h]);typeof u=="string"&&(u=Ar(u));let{pathname:k="/",search:S="",hash:O="",state:D=null,key:T="default"}=u,j=N.useMemo(()=>{let E=Du(k,y);return E==null?null:{location:{pathname:E,search:S,hash:O,state:D,key:T},navigationType:d}},[y,k,S,O,D,T,d]);return j==null?null:N.createElement(er.Provider,{value:x},N.createElement(Ps.Provider,{children:s,value:j}))}function r0(r){let{children:o,location:s}=r;return Uv(wu(o),s)}new Promise(()=>{});function wu(r,o){o===void 0&&(o=[]);let s=[];return N.Children.forEach(r,(u,d)=>{if(!N.isValidElement(u))return;let f=[...o,d];if(u.type===N.Fragment){s.push.apply(s,wu(u.props.children,f));return}u.type!==_t&&Be(!1),!u.props.index||!u.props.children||Be(!1);let h={id:u.props.id||f.join("-"),caseSensitive:u.props.caseSensitive,element:u.props.element,Component:u.props.Component,index:u.props.index,path:u.props.path,loader:u.props.loader,action:u.props.action,errorElement:u.props.errorElement,ErrorBoundary:u.props.ErrorBoundary,hasErrorBoundary:u.props.ErrorBoundary!=null||u.props.errorElement!=null,shouldRevalidate:u.props.shouldRevalidate,handle:u.props.handle,lazy:u.props.lazy};u.props.children&&(h.children=wu(u.props.children,f)),s.push(h)}),s}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function bu(){return bu=Object.assign?Object.assign.bind():function(r){for(var o=1;o<arguments.length;o++){var s=arguments[o];for(var u in s)Object.prototype.hasOwnProperty.call(s,u)&&(r[u]=s[u])}return r},bu.apply(this,arguments)}function i0(r,o){if(r==null)return{};var s={},u=Object.keys(r),d,f;for(f=0;f<u.length;f++)d=u[f],!(o.indexOf(d)>=0)&&(s[d]=r[d]);return s}function o0(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function s0(r,o){return r.button===0&&(!o||o==="_self")&&!o0(r)}const a0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],l0="6";try{window.__reactRouterVersion=l0}catch{}const u0="startTransition",np=ov[u0];function c0(r){let{basename:o,children:s,future:u,window:d}=r,f=N.useRef();f.current==null&&(f.current=fv({window:d,v5Compat:!0}));let h=f.current,[m,y]=N.useState({action:h.action,location:h.location}),{v7_startTransition:x}=u||{},k=N.useCallback(S=>{x&&np?np(()=>y(S)):y(S)},[y,x]);return N.useLayoutEffect(()=>h.listen(k),[h,k]),N.useEffect(()=>t0(u),[u]),N.createElement(n0,{basename:o,children:s,location:m.location,navigationType:m.action,navigator:h,future:u})}const d0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",f0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,nn=N.forwardRef(function(o,s){let{onClick:u,relative:d,reloadDocument:f,replace:h,state:m,target:y,to:x,preventScrollReset:k,viewTransition:S}=o,O=i0(o,a0),{basename:D}=N.useContext(er),T,j=!1;if(typeof x=="string"&&f0.test(x)&&(T=x,d0))try{let H=new URL(window.location.href),Y=x.startsWith("//")?new URL(H.protocol+x):new URL(x),q=Du(Y.pathname,D);Y.origin===H.origin&&q!=null?x=q+Y.search+Y.hash:j=!0}catch{}let E=$v(x,{relative:d}),M=p0(x,{replace:h,state:m,target:y,preventScrollReset:k,relative:d,viewTransition:S});function B(H){u&&u(H),H.defaultPrevented||M(H)}return N.createElement("a",bu({},O,{href:T||E,onClick:j||f?u:B,ref:s,target:y}))});var rp;(function(r){r.UseScrollRestoration="useScrollRestoration",r.UseSubmit="useSubmit",r.UseSubmitFetcher="useSubmitFetcher",r.UseFetcher="useFetcher",r.useViewTransitionState="useViewTransitionState"})(rp||(rp={}));var ip;(function(r){r.UseFetcher="useFetcher",r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"})(ip||(ip={}));function p0(r,o){let{target:s,replace:u,state:d,preventScrollReset:f,relative:h,viewTransition:m}=o===void 0?{}:o,y=Ts(),x=Oi(),k=oh(r,{relative:h});return N.useCallback(S=>{if(s0(S,s)){S.preventDefault();let O=u!==void 0?u:ks(x)===ks(k);y(r,{replace:O,state:d,preventScrollReset:f,relative:h,viewTransition:m})}},[x,y,k,u,d,s,r,f,h,m])}var ht=function(){return ht=Object.assign||function(o){for(var s,u=1,d=arguments.length;u<d;u++){s=arguments[u];for(var f in s)Object.prototype.hasOwnProperty.call(s,f)&&(o[f]=s[f])}return o},ht.apply(this,arguments)};function Ss(r,o,s){if(s||arguments.length===2)for(var u=0,d=o.length,f;u<d;u++)(f||!(u in o))&&(f||(f=Array.prototype.slice.call(o,0,u)),f[u]=o[u]);return r.concat(f||Array.prototype.slice.call(o))}var Te="-ms-",_i="-moz-",Se="-webkit-",uh="comm",zs="rule",Mu="decl",h0="@import",ch="@keyframes",g0="@layer",dh=Math.abs,Bu=String.fromCharCode,ku=Object.assign;function m0(r,o){return Qe(r,0)^45?(((o<<2^Qe(r,0))<<2^Qe(r,1))<<2^Qe(r,2))<<2^Qe(r,3):0}function fh(r){return r.trim()}function tn(r,o){return(r=o.exec(r))?r[0]:r}function fe(r,o,s){return r.replace(o,s)}function ps(r,o,s){return r.indexOf(o,s)}function Qe(r,o){return r.charCodeAt(o)|0}function Tr(r,o,s){return r.slice(o,s)}function qt(r){return r.length}function ph(r){return r.length}function Ri(r,o){return o.push(r),r}function v0(r,o){return r.map(o).join("")}function op(r,o){return r.filter(function(s){return!tn(s,o)})}var Ns=1,zr=1,hh=0,Pt=0,Me=0,Ir="";function Ls(r,o,s,u,d,f,h,m){return{value:r,root:o,parent:s,type:u,props:d,children:f,line:Ns,column:zr,length:h,return:"",siblings:m}}function Cn(r,o){return ku(Ls("",null,null,"",null,null,0,r.siblings),r,{length:-r.length},o)}function Er(r){for(;r.root;)r=Cn(r.root,{children:[r]});Ri(r,r.siblings)}function y0(){return Me}function x0(){return Me=Pt>0?Qe(Ir,--Pt):0,zr--,Me===10&&(zr=1,Ns--),Me}function Dt(){return Me=Pt<hh?Qe(Ir,Pt++):0,zr++,Me===10&&(zr=1,Ns++),Me}function Yn(){return Qe(Ir,Pt)}function hs(){return Pt}function Os(r,o){return Tr(Ir,r,o)}function Su(r){switch(r){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function w0(r){return Ns=zr=1,hh=qt(Ir=r),Pt=0,[]}function b0(r){return Ir="",r}function Bl(r){return fh(Os(Pt-1,ju(r===91?r+2:r===40?r+1:r)))}function k0(r){for(;(Me=Yn())&&Me<33;)Dt();return Su(r)>2||Su(Me)>3?"":" "}function S0(r,o){for(;--o&&Dt()&&!(Me<48||Me>102||Me>57&&Me<65||Me>70&&Me<97););return Os(r,hs()+(o<6&&Yn()==32&&Dt()==32))}function ju(r){for(;Dt();)switch(Me){case r:return Pt;case 34:case 39:r!==34&&r!==39&&ju(Me);break;case 40:r===41&&ju(r);break;case 92:Dt();break}return Pt}function j0(r,o){for(;Dt()&&r+Me!==57;)if(r+Me===84&&Yn()===47)break;return"/*"+Os(o,Pt-1)+"*"+Bu(r===47?r:Dt())}function C0(r){for(;!Su(Yn());)Dt();return Os(r,Pt)}function E0(r){return b0(gs("",null,null,null,[""],r=w0(r),0,[0],r))}function gs(r,o,s,u,d,f,h,m,y){for(var x=0,k=0,S=h,O=0,D=0,T=0,j=1,E=1,M=1,B=0,H="",Y=d,q=f,G=u,K=H;E;)switch(T=B,B=Dt()){case 40:if(T!=108&&Qe(K,S-1)==58){ps(K+=fe(Bl(B),"&","&\f"),"&\f",dh(x?m[x-1]:0))!=-1&&(M=-1);break}case 34:case 39:case 91:K+=Bl(B);break;case 9:case 10:case 13:case 32:K+=k0(T);break;case 92:K+=S0(hs()-1,7);continue;case 47:switch(Yn()){case 42:case 47:Ri(R0(j0(Dt(),hs()),o,s,y),y);break;default:K+="/"}break;case 123*j:m[x++]=qt(K)*M;case 125*j:case 59:case 0:switch(B){case 0:case 125:E=0;case 59+k:M==-1&&(K=fe(K,/\f/g,"")),D>0&&qt(K)-S&&Ri(D>32?ap(K+";",u,s,S-1,y):ap(fe(K," ","")+";",u,s,S-2,y),y);break;case 59:K+=";";default:if(Ri(G=sp(K,o,s,x,k,d,m,H,Y=[],q=[],S,f),f),B===123)if(k===0)gs(K,o,G,G,Y,f,S,m,q);else switch(O===99&&Qe(K,3)===110?100:O){case 100:case 108:case 109:case 115:gs(r,G,G,u&&Ri(sp(r,G,G,0,0,d,m,H,d,Y=[],S,q),q),d,q,S,m,u?Y:q);break;default:gs(K,G,G,G,[""],q,0,m,q)}}x=k=D=0,j=M=1,H=K="",S=h;break;case 58:S=1+qt(K),D=T;default:if(j<1){if(B==123)--j;else if(B==125&&j++==0&&x0()==125)continue}switch(K+=Bu(B),B*j){case 38:M=k>0?1:(K+="\f",-1);break;case 44:m[x++]=(qt(K)-1)*M,M=1;break;case 64:Yn()===45&&(K+=Bl(Dt())),O=Yn(),k=S=qt(H=K+=C0(hs())),B++;break;case 45:T===45&&qt(K)==2&&(j=0)}}return f}function sp(r,o,s,u,d,f,h,m,y,x,k,S){for(var O=d-1,D=d===0?f:[""],T=ph(D),j=0,E=0,M=0;j<u;++j)for(var B=0,H=Tr(r,O+1,O=dh(E=h[j])),Y=r;B<T;++B)(Y=fh(E>0?D[B]+" "+H:fe(H,/&\f/g,D[B])))&&(y[M++]=Y);return Ls(r,o,s,d===0?zs:m,y,x,k,S)}function R0(r,o,s,u){return Ls(r,o,s,uh,Bu(y0()),Tr(r,2,-2),0,u)}function ap(r,o,s,u,d){return Ls(r,o,s,Mu,Tr(r,0,u),Tr(r,u+1,-1),u,d)}function gh(r,o,s){switch(m0(r,o)){case 5103:return Se+"print-"+r+r;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Se+r+r;case 4789:return _i+r+r;case 5349:case 4246:case 4810:case 6968:case 2756:return Se+r+_i+r+Te+r+r;case 5936:switch(Qe(r,o+11)){case 114:return Se+r+Te+fe(r,/[svh]\w+-[tblr]{2}/,"tb")+r;case 108:return Se+r+Te+fe(r,/[svh]\w+-[tblr]{2}/,"tb-rl")+r;case 45:return Se+r+Te+fe(r,/[svh]\w+-[tblr]{2}/,"lr")+r}case 6828:case 4268:case 2903:return Se+r+Te+r+r;case 6165:return Se+r+Te+"flex-"+r+r;case 5187:return Se+r+fe(r,/(\w+).+(:[^]+)/,Se+"box-$1$2"+Te+"flex-$1$2")+r;case 5443:return Se+r+Te+"flex-item-"+fe(r,/flex-|-self/g,"")+(tn(r,/flex-|baseline/)?"":Te+"grid-row-"+fe(r,/flex-|-self/g,""))+r;case 4675:return Se+r+Te+"flex-line-pack"+fe(r,/align-content|flex-|-self/g,"")+r;case 5548:return Se+r+Te+fe(r,"shrink","negative")+r;case 5292:return Se+r+Te+fe(r,"basis","preferred-size")+r;case 6060:return Se+"box-"+fe(r,"-grow","")+Se+r+Te+fe(r,"grow","positive")+r;case 4554:return Se+fe(r,/([^-])(transform)/g,"$1"+Se+"$2")+r;case 6187:return fe(fe(fe(r,/(zoom-|grab)/,Se+"$1"),/(image-set)/,Se+"$1"),r,"")+r;case 5495:case 3959:return fe(r,/(image-set\([^]*)/,Se+"$1$`$1");case 4968:return fe(fe(r,/(.+:)(flex-)?(.*)/,Se+"box-pack:$3"+Te+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Se+r+r;case 4200:if(!tn(r,/flex-|baseline/))return Te+"grid-column-align"+Tr(r,o)+r;break;case 2592:case 3360:return Te+fe(r,"template-","")+r;case 4384:case 3616:return s&&s.some(function(u,d){return o=d,tn(u.props,/grid-\w+-end/)})?~ps(r+(s=s[o].value),"span",0)?r:Te+fe(r,"-start","")+r+Te+"grid-row-span:"+(~ps(s,"span",0)?tn(s,/\d+/):+tn(s,/\d+/)-+tn(r,/\d+/))+";":Te+fe(r,"-start","")+r;case 4896:case 4128:return s&&s.some(function(u){return tn(u.props,/grid-\w+-start/)})?r:Te+fe(fe(r,"-end","-span"),"span ","")+r;case 4095:case 3583:case 4068:case 2532:return fe(r,/(.+)-inline(.+)/,Se+"$1$2")+r;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(qt(r)-1-o>6)switch(Qe(r,o+1)){case 109:if(Qe(r,o+4)!==45)break;case 102:return fe(r,/(.+:)(.+)-([^]+)/,"$1"+Se+"$2-$3$1"+_i+(Qe(r,o+3)==108?"$3":"$2-$3"))+r;case 115:return~ps(r,"stretch",0)?gh(fe(r,"stretch","fill-available"),o,s)+r:r}break;case 5152:case 5920:return fe(r,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(u,d,f,h,m,y,x){return Te+d+":"+f+x+(h?Te+d+"-span:"+(m?y:+y-+f)+x:"")+r});case 4949:if(Qe(r,o+6)===121)return fe(r,":",":"+Se)+r;break;case 6444:switch(Qe(r,Qe(r,14)===45?18:11)){case 120:return fe(r,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Se+(Qe(r,14)===45?"inline-":"")+"box$3$1"+Se+"$2$3$1"+Te+"$2box$3")+r;case 100:return fe(r,":",":"+Te)+r}break;case 5719:case 2647:case 2135:case 3927:case 2391:return fe(r,"scroll-","scroll-snap-")+r}return r}function js(r,o){for(var s="",u=0;u<r.length;u++)s+=o(r[u],u,r,o)||"";return s}function _0(r,o,s,u){switch(r.type){case g0:if(r.children.length)break;case h0:case Mu:return r.return=r.return||r.value;case uh:return"";case ch:return r.return=r.value+"{"+js(r.children,u)+"}";case zs:if(!qt(r.value=r.props.join(",")))return""}return qt(s=js(r.children,u))?r.return=r.value+"{"+s+"}":""}function P0(r){var o=ph(r);return function(s,u,d,f){for(var h="",m=0;m<o;m++)h+=r[m](s,u,d,f)||"";return h}}function T0(r){return function(o){o.root||(o=o.return)&&r(o)}}function z0(r,o,s,u){if(r.length>-1&&!r.return)switch(r.type){case Mu:r.return=gh(r.value,r.length,s);return;case ch:return js([Cn(r,{value:fe(r.value,"@","@"+Se)})],u);case zs:if(r.length)return v0(s=r.props,function(d){switch(tn(d,u=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Er(Cn(r,{props:[fe(d,/:(read-\w+)/,":"+_i+"$1")]})),Er(Cn(r,{props:[d]})),ku(r,{props:op(s,u)});break;case"::placeholder":Er(Cn(r,{props:[fe(d,/:(plac\w+)/,":"+Se+"input-$1")]})),Er(Cn(r,{props:[fe(d,/:(plac\w+)/,":"+_i+"$1")]})),Er(Cn(r,{props:[fe(d,/:(plac\w+)/,Te+"input-$1")]})),Er(Cn(r,{props:[d]})),ku(r,{props:op(s,u)});break}return""})}}var N0={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},bt={},Nr=typeof process<"u"&&bt!==void 0&&(bt.REACT_APP_SC_ATTR||bt.SC_ATTR)||"data-styled",mh="active",vh="data-styled-version",As="6.1.19",Uu=`/*!sc*/
`,Cs=typeof window<"u"&&typeof document<"u",L0=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==""?bt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&bt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.SC_DISABLE_SPEEDY!==void 0&&bt.SC_DISABLE_SPEEDY!==""&&bt.SC_DISABLE_SPEEDY!=="false"&&bt.SC_DISABLE_SPEEDY),Is=Object.freeze([]),Lr=Object.freeze({});function O0(r,o,s){return s===void 0&&(s=Lr),r.theme!==s.theme&&r.theme||o||s.theme}var yh=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),A0=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,I0=/(^-|-$)/g;function lp(r){return r.replace(A0,"-").replace(I0,"")}var F0=/(a)(d)/gi,Ko=52,up=function(r){return String.fromCharCode(r+(r>25?39:97))};function Cu(r){var o,s="";for(o=Math.abs(r);o>Ko;o=o/Ko|0)s=up(o%Ko)+s;return(up(o%Ko)+s).replace(F0,"$1-$2")}var Ul,xh=5381,Pr=function(r,o){for(var s=o.length;s;)r=33*r^o.charCodeAt(--s);return r},wh=function(r){return Pr(xh,r)};function D0(r){return Cu(wh(r)>>>0)}function $0(r){return r.displayName||r.name||"Component"}function Hl(r){return typeof r=="string"&&!0}var bh=typeof Symbol=="function"&&Symbol.for,kh=bh?Symbol.for("react.memo"):60115,M0=bh?Symbol.for("react.forward_ref"):60112,B0={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},U0={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Sh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},H0=((Ul={})[M0]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ul[kh]=Sh,Ul);function cp(r){return("type"in(o=r)&&o.type.$$typeof)===kh?Sh:"$$typeof"in r?H0[r.$$typeof]:B0;var o}var W0=Object.defineProperty,V0=Object.getOwnPropertyNames,dp=Object.getOwnPropertySymbols,q0=Object.getOwnPropertyDescriptor,G0=Object.getPrototypeOf,fp=Object.prototype;function jh(r,o,s){if(typeof o!="string"){if(fp){var u=G0(o);u&&u!==fp&&jh(r,u,s)}var d=V0(o);dp&&(d=d.concat(dp(o)));for(var f=cp(r),h=cp(o),m=0;m<d.length;++m){var y=d[m];if(!(y in U0||s&&s[y]||h&&y in h||f&&y in f)){var x=q0(o,y);try{W0(r,y,x)}catch{}}}}return r}function Or(r){return typeof r=="function"}function Hu(r){return typeof r=="object"&&"styledComponentId"in r}function Gn(r,o){return r&&o?"".concat(r," ").concat(o):r||o||""}function pp(r,o){if(r.length===0)return"";for(var s=r[0],u=1;u<r.length;u++)s+=r[u];return s}function zi(r){return r!==null&&typeof r=="object"&&r.constructor.name===Object.name&&!("props"in r&&r.$$typeof)}function Eu(r,o,s){if(s===void 0&&(s=!1),!s&&!zi(r)&&!Array.isArray(r))return o;if(Array.isArray(o))for(var u=0;u<o.length;u++)r[u]=Eu(r[u],o[u]);else if(zi(o))for(var u in o)r[u]=Eu(r[u],o[u]);return r}function Wu(r,o){Object.defineProperty(r,"toString",{value:o})}function Ai(r){for(var o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(r," for more information.").concat(o.length>0?" Args: ".concat(o.join(", ")):""))}var Q0=(function(){function r(o){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=o}return r.prototype.indexOfGroup=function(o){for(var s=0,u=0;u<o;u++)s+=this.groupSizes[u];return s},r.prototype.insertRules=function(o,s){if(o>=this.groupSizes.length){for(var u=this.groupSizes,d=u.length,f=d;o>=f;)if((f<<=1)<0)throw Ai(16,"".concat(o));this.groupSizes=new Uint32Array(f),this.groupSizes.set(u),this.length=f;for(var h=d;h<f;h++)this.groupSizes[h]=0}for(var m=this.indexOfGroup(o+1),y=(h=0,s.length);h<y;h++)this.tag.insertRule(m,s[h])&&(this.groupSizes[o]++,m++)},r.prototype.clearGroup=function(o){if(o<this.length){var s=this.groupSizes[o],u=this.indexOfGroup(o),d=u+s;this.groupSizes[o]=0;for(var f=u;f<d;f++)this.tag.deleteRule(u)}},r.prototype.getGroup=function(o){var s="";if(o>=this.length||this.groupSizes[o]===0)return s;for(var u=this.groupSizes[o],d=this.indexOfGroup(o),f=d+u,h=d;h<f;h++)s+="".concat(this.tag.getRule(h)).concat(Uu);return s},r})(),ms=new Map,Es=new Map,vs=1,Jo=function(r){if(ms.has(r))return ms.get(r);for(;Es.has(vs);)vs++;var o=vs++;return ms.set(r,o),Es.set(o,r),o},Y0=function(r,o){vs=o+1,ms.set(r,o),Es.set(o,r)},K0="style[".concat(Nr,"][").concat(vh,'="').concat(As,'"]'),J0=new RegExp("^".concat(Nr,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),X0=function(r,o,s){for(var u,d=s.split(","),f=0,h=d.length;f<h;f++)(u=d[f])&&r.registerName(o,u)},Z0=function(r,o){for(var s,u=((s=o.textContent)!==null&&s!==void 0?s:"").split(Uu),d=[],f=0,h=u.length;f<h;f++){var m=u[f].trim();if(m){var y=m.match(J0);if(y){var x=0|parseInt(y[1],10),k=y[2];x!==0&&(Y0(k,x),X0(r,k,y[3]),r.getTag().insertRules(x,d)),d.length=0}else d.push(m)}}},hp=function(r){for(var o=document.querySelectorAll(K0),s=0,u=o.length;s<u;s++){var d=o[s];d&&d.getAttribute(Nr)!==mh&&(Z0(r,d),d.parentNode&&d.parentNode.removeChild(d))}};function ey(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Ch=function(r){var o=document.head,s=r||o,u=document.createElement("style"),d=(function(m){var y=Array.from(m.querySelectorAll("style[".concat(Nr,"]")));return y[y.length-1]})(s),f=d!==void 0?d.nextSibling:null;u.setAttribute(Nr,mh),u.setAttribute(vh,As);var h=ey();return h&&u.setAttribute("nonce",h),s.insertBefore(u,f),u},ty=(function(){function r(o){this.element=Ch(o),this.element.appendChild(document.createTextNode("")),this.sheet=(function(s){if(s.sheet)return s.sheet;for(var u=document.styleSheets,d=0,f=u.length;d<f;d++){var h=u[d];if(h.ownerNode===s)return h}throw Ai(17)})(this.element),this.length=0}return r.prototype.insertRule=function(o,s){try{return this.sheet.insertRule(s,o),this.length++,!0}catch{return!1}},r.prototype.deleteRule=function(o){this.sheet.deleteRule(o),this.length--},r.prototype.getRule=function(o){var s=this.sheet.cssRules[o];return s&&s.cssText?s.cssText:""},r})(),ny=(function(){function r(o){this.element=Ch(o),this.nodes=this.element.childNodes,this.length=0}return r.prototype.insertRule=function(o,s){if(o<=this.length&&o>=0){var u=document.createTextNode(s);return this.element.insertBefore(u,this.nodes[o]||null),this.length++,!0}return!1},r.prototype.deleteRule=function(o){this.element.removeChild(this.nodes[o]),this.length--},r.prototype.getRule=function(o){return o<this.length?this.nodes[o].textContent:""},r})(),ry=(function(){function r(o){this.rules=[],this.length=0}return r.prototype.insertRule=function(o,s){return o<=this.length&&(this.rules.splice(o,0,s),this.length++,!0)},r.prototype.deleteRule=function(o){this.rules.splice(o,1),this.length--},r.prototype.getRule=function(o){return o<this.length?this.rules[o]:""},r})(),gp=Cs,iy={isServer:!Cs,useCSSOMInjection:!L0},Eh=(function(){function r(o,s,u){o===void 0&&(o=Lr),s===void 0&&(s={});var d=this;this.options=ht(ht({},iy),o),this.gs=s,this.names=new Map(u),this.server=!!o.isServer,!this.server&&Cs&&gp&&(gp=!1,hp(this)),Wu(this,function(){return(function(f){for(var h=f.getTag(),m=h.length,y="",x=function(S){var O=(function(M){return Es.get(M)})(S);if(O===void 0)return"continue";var D=f.names.get(O),T=h.getGroup(S);if(D===void 0||!D.size||T.length===0)return"continue";var j="".concat(Nr,".g").concat(S,'[id="').concat(O,'"]'),E="";D!==void 0&&D.forEach(function(M){M.length>0&&(E+="".concat(M,","))}),y+="".concat(T).concat(j,'{content:"').concat(E,'"}').concat(Uu)},k=0;k<m;k++)x(k);return y})(d)})}return r.registerId=function(o){return Jo(o)},r.prototype.rehydrate=function(){!this.server&&Cs&&hp(this)},r.prototype.reconstructWithOptions=function(o,s){return s===void 0&&(s=!0),new r(ht(ht({},this.options),o),this.gs,s&&this.names||void 0)},r.prototype.allocateGSInstance=function(o){return this.gs[o]=(this.gs[o]||0)+1},r.prototype.getTag=function(){return this.tag||(this.tag=(o=(function(s){var u=s.useCSSOMInjection,d=s.target;return s.isServer?new ry(d):u?new ty(d):new ny(d)})(this.options),new Q0(o)));var o},r.prototype.hasNameForId=function(o,s){return this.names.has(o)&&this.names.get(o).has(s)},r.prototype.registerName=function(o,s){if(Jo(o),this.names.has(o))this.names.get(o).add(s);else{var u=new Set;u.add(s),this.names.set(o,u)}},r.prototype.insertRules=function(o,s,u){this.registerName(o,s),this.getTag().insertRules(Jo(o),u)},r.prototype.clearNames=function(o){this.names.has(o)&&this.names.get(o).clear()},r.prototype.clearRules=function(o){this.getTag().clearGroup(Jo(o)),this.clearNames(o)},r.prototype.clearTag=function(){this.tag=void 0},r})(),oy=/&/g,sy=/^\s*\/\/.*$/gm;function Rh(r,o){return r.map(function(s){return s.type==="rule"&&(s.value="".concat(o," ").concat(s.value),s.value=s.value.replaceAll(",",",".concat(o," ")),s.props=s.props.map(function(u){return"".concat(o," ").concat(u)})),Array.isArray(s.children)&&s.type!=="@keyframes"&&(s.children=Rh(s.children,o)),s})}function ay(r){var o,s,u,d=Lr,f=d.options,h=f===void 0?Lr:f,m=d.plugins,y=m===void 0?Is:m,x=function(O,D,T){return T.startsWith(s)&&T.endsWith(s)&&T.replaceAll(s,"").length>0?".".concat(o):O},k=y.slice();k.push(function(O){O.type===zs&&O.value.includes("&")&&(O.props[0]=O.props[0].replace(oy,s).replace(u,x))}),h.prefix&&k.push(z0),k.push(_0);var S=function(O,D,T,j){D===void 0&&(D=""),T===void 0&&(T=""),j===void 0&&(j="&"),o=j,s=D,u=new RegExp("\\".concat(s,"\\b"),"g");var E=O.replace(sy,""),M=E0(T||D?"".concat(T," ").concat(D," { ").concat(E," }"):E);h.namespace&&(M=Rh(M,h.namespace));var B=[];return js(M,P0(k.concat(T0(function(H){return B.push(H)})))),B};return S.hash=y.length?y.reduce(function(O,D){return D.name||Ai(15),Pr(O,D.name)},xh).toString():"",S}var ly=new Eh,Ru=ay(),_h=Xn.createContext({shouldForwardProp:void 0,styleSheet:ly,stylis:Ru});_h.Consumer;Xn.createContext(void 0);function mp(){return N.useContext(_h)}var uy=(function(){function r(o,s){var u=this;this.inject=function(d,f){f===void 0&&(f=Ru);var h=u.name+f.hash;d.hasNameForId(u.id,h)||d.insertRules(u.id,h,f(u.rules,h,"@keyframes"))},this.name=o,this.id="sc-keyframes-".concat(o),this.rules=s,Wu(this,function(){throw Ai(12,String(u.name))})}return r.prototype.getName=function(o){return o===void 0&&(o=Ru),this.name+o.hash},r})(),cy=function(r){return r>="A"&&r<="Z"};function vp(r){for(var o="",s=0;s<r.length;s++){var u=r[s];if(s===1&&u==="-"&&r[0]==="-")return r;cy(u)?o+="-"+u.toLowerCase():o+=u}return o.startsWith("ms-")?"-"+o:o}var Ph=function(r){return r==null||r===!1||r===""},Th=function(r){var o,s,u=[];for(var d in r){var f=r[d];r.hasOwnProperty(d)&&!Ph(f)&&(Array.isArray(f)&&f.isCss||Or(f)?u.push("".concat(vp(d),":"),f,";"):zi(f)?u.push.apply(u,Ss(Ss(["".concat(d," {")],Th(f),!1),["}"],!1)):u.push("".concat(vp(d),": ").concat((o=d,(s=f)==null||typeof s=="boolean"||s===""?"":typeof s!="number"||s===0||o in N0||o.startsWith("--")?String(s).trim():"".concat(s,"px")),";")))}return u};function Kn(r,o,s,u){if(Ph(r))return[];if(Hu(r))return[".".concat(r.styledComponentId)];if(Or(r)){if(!Or(f=r)||f.prototype&&f.prototype.isReactComponent||!o)return[r];var d=r(o);return Kn(d,o,s,u)}var f;return r instanceof uy?s?(r.inject(s,u),[r.getName(u)]):[r]:zi(r)?Th(r):Array.isArray(r)?Array.prototype.concat.apply(Is,r.map(function(h){return Kn(h,o,s,u)})):[r.toString()]}function dy(r){for(var o=0;o<r.length;o+=1){var s=r[o];if(Or(s)&&!Hu(s))return!1}return!0}var fy=wh(As),py=(function(){function r(o,s,u){this.rules=o,this.staticRulesId="",this.isStatic=(u===void 0||u.isStatic)&&dy(o),this.componentId=s,this.baseHash=Pr(fy,s),this.baseStyle=u,Eh.registerId(s)}return r.prototype.generateAndInjectStyles=function(o,s,u){var d=this.baseStyle?this.baseStyle.generateAndInjectStyles(o,s,u):"";if(this.isStatic&&!u.hash)if(this.staticRulesId&&s.hasNameForId(this.componentId,this.staticRulesId))d=Gn(d,this.staticRulesId);else{var f=pp(Kn(this.rules,o,s,u)),h=Cu(Pr(this.baseHash,f)>>>0);if(!s.hasNameForId(this.componentId,h)){var m=u(f,".".concat(h),void 0,this.componentId);s.insertRules(this.componentId,h,m)}d=Gn(d,h),this.staticRulesId=h}else{for(var y=Pr(this.baseHash,u.hash),x="",k=0;k<this.rules.length;k++){var S=this.rules[k];if(typeof S=="string")x+=S;else if(S){var O=pp(Kn(S,o,s,u));y=Pr(y,O+k),x+=O}}if(x){var D=Cu(y>>>0);s.hasNameForId(this.componentId,D)||s.insertRules(this.componentId,D,u(x,".".concat(D),void 0,this.componentId)),d=Gn(d,D)}}return d},r})(),zh=Xn.createContext(void 0);zh.Consumer;var Wl={};function hy(r,o,s){var u=Hu(r),d=r,f=!Hl(r),h=o.attrs,m=h===void 0?Is:h,y=o.componentId,x=y===void 0?(function(Y,q){var G=typeof Y!="string"?"sc":lp(Y);Wl[G]=(Wl[G]||0)+1;var K="".concat(G,"-").concat(D0(As+G+Wl[G]));return q?"".concat(q,"-").concat(K):K})(o.displayName,o.parentComponentId):y,k=o.displayName,S=k===void 0?(function(Y){return Hl(Y)?"styled.".concat(Y):"Styled(".concat($0(Y),")")})(r):k,O=o.displayName&&o.componentId?"".concat(lp(o.displayName),"-").concat(o.componentId):o.componentId||x,D=u&&d.attrs?d.attrs.concat(m).filter(Boolean):m,T=o.shouldForwardProp;if(u&&d.shouldForwardProp){var j=d.shouldForwardProp;if(o.shouldForwardProp){var E=o.shouldForwardProp;T=function(Y,q){return j(Y,q)&&E(Y,q)}}else T=j}var M=new py(s,O,u?d.componentStyle:void 0);function B(Y,q){return(function(G,K,je){var ye=G.attrs,Xe=G.componentStyle,it=G.defaultProps,Ye=G.foldedComponentIds,Ue=G.styledComponentId,W=G.target,ge=Xn.useContext(zh),be=mp(),ke=G.shouldForwardProp||be.shouldForwardProp,V=O0(K,ge,it)||Lr,ee=(function(pe,de,ve){for(var me,A=ht(ht({},de),{className:void 0,theme:ve}),oe=0;oe<pe.length;oe+=1){var Ae=Or(me=pe[oe])?me(A):me;for(var Ee in Ae)A[Ee]=Ee==="className"?Gn(A[Ee],Ae[Ee]):Ee==="style"?ht(ht({},A[Ee]),Ae[Ee]):Ae[Ee]}return de.className&&(A.className=Gn(A.className,de.className)),A})(ye,K,V),Q=ee.as||W,C={};for(var L in ee)ee[L]===void 0||L[0]==="$"||L==="as"||L==="theme"&&ee.theme===V||(L==="forwardedAs"?C.as=ee.forwardedAs:ke&&!ke(L,Q)||(C[L]=ee[L]));var ae=(function(pe,de){var ve=mp(),me=pe.generateAndInjectStyles(de,ve.styleSheet,ve.stylis);return me})(Xe,ee),le=Gn(Ye,Ue);return ae&&(le+=" "+ae),ee.className&&(le+=" "+ee.className),C[Hl(Q)&&!yh.has(Q)?"class":"className"]=le,je&&(C.ref=je),N.createElement(Q,C)})(H,Y,q)}B.displayName=S;var H=Xn.forwardRef(B);return H.attrs=D,H.componentStyle=M,H.displayName=S,H.shouldForwardProp=T,H.foldedComponentIds=u?Gn(d.foldedComponentIds,d.styledComponentId):"",H.styledComponentId=O,H.target=u?d.target:r,Object.defineProperty(H,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(Y){this._foldedDefaultProps=u?(function(q){for(var G=[],K=1;K<arguments.length;K++)G[K-1]=arguments[K];for(var je=0,ye=G;je<ye.length;je++)Eu(q,ye[je],!0);return q})({},d.defaultProps,Y):Y}}),Wu(H,function(){return".".concat(H.styledComponentId)}),f&&jh(H,r,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),H}function yp(r,o){for(var s=[r[0]],u=0,d=o.length;u<d;u+=1)s.push(o[u],r[u+1]);return s}var xp=function(r){return Object.assign(r,{isCss:!0})};function gy(r){for(var o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];if(Or(r)||zi(r))return xp(Kn(yp(Is,Ss([r],o,!0))));var u=r;return o.length===0&&u.length===1&&typeof u[0]=="string"?Kn(u):xp(Kn(yp(u,o)))}function _u(r,o,s){if(s===void 0&&(s=Lr),!o)throw Ai(1,o);var u=function(d){for(var f=[],h=1;h<arguments.length;h++)f[h-1]=arguments[h];return r(o,s,gy.apply(void 0,Ss([d],f,!1)))};return u.attrs=function(d){return _u(r,o,ht(ht({},s),{attrs:Array.prototype.concat(s.attrs,d).filter(Boolean)}))},u.withConfig=function(d){return _u(r,o,ht(ht({},s),d))},u}var Nh=function(r){return _u(hy,r)},g=Nh;yh.forEach(function(r){g[r]=Nh(r)});const my=g.header`
  background-color: var(--gitthub-beige);
  border-bottom: 2px solid var(--gitthub-black);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  ${r=>r.$scrolled&&`
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `}
`,vy=g.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;

  @media (max-width: 768px) {
    height: 70px;
    padding: 0 var(--spacing-md);
  }
`,yy=g(nn)`
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--gitthub-black);
  letter-spacing: -0.05em;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,xy=g.div`
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--gitthub-beige);
    flex-direction: column;
    padding: var(--spacing-lg);
    border-bottom: 2px solid var(--gitthub-black);
    transform: translateY(${r=>r.$open?"0":"-100%"});
    opacity: ${r=>r.$open?"1":"0"};
    pointer-events: ${r=>r.$open?"all":"none"};
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`,wy=g(nn)`
  color: var(--gitthub-black);
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  padding: var(--spacing-xs) 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gitthub-black);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${r=>r.$active&&`
    &::after {
      width: 100%;
      background: #FF0000;
    }
  `}

  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding: var(--spacing-sm) 0;
  }
`,by=g.button`
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    display: block;
    width: 100%;
    height: 3px;
    background: var(--gitthub-black);
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${r=>r.$open?"translateY(10.5px) rotate(45deg)":"none"};
    }

    &:nth-child(2) {
      opacity: ${r=>r.$open?"0":"1"};
    }

    &:nth-child(3) {
      transform: ${r=>r.$open?"translateY(-10.5px) rotate(-45deg)":"none"};
    }
  }
`;function ky(){const r=Oi(),[o,s]=N.useState(!1),[u,d]=N.useState(!1);N.useEffect(()=>{const h=()=>{d(window.scrollY>10)};return window.addEventListener("scroll",h),()=>window.removeEventListener("scroll",h)},[]),N.useEffect(()=>{s(!1)},[r]);const f=[{path:"/",label:"Home"},{path:"/about",label:"About"},{path:"/services",label:"Services"},{path:"/databank",label:"Data Bank"},{path:"/course-generator",label:"AI Courses"},{path:"/contact",label:"Contact"}];return l.jsx(my,{$scrolled:u,children:l.jsxs(vy,{children:[l.jsx(yy,{to:"/",children:"gitthub"}),l.jsx(xy,{$open:o,children:f.map(h=>l.jsx(wy,{to:h.path,$active:r.pathname===h.path,children:h.label},h.path))}),l.jsxs(by,{$open:o,onClick:()=>s(!o),"aria-label":"Toggle menu",children:[l.jsx("span",{}),l.jsx("span",{}),l.jsx("span",{})]})]})})}const Sy=g.footer`
  background-color: var(--gitthub-black);
  color: var(--gitthub-beige);
  padding: var(--spacing-xxl) 0 var(--spacing-lg);
  margin-top: var(--spacing-xxl);
`,jy=g.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-xl);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Xo=g.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    font-weight: 900;
  }

  p {
    color: var(--gitthub-light-beige);
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }
`,Cy=g.div`
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: var(--spacing-md);
`,wp=g.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`,Sn=g(nn)`
  color: var(--gitthub-light-beige);
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    color: var(--gitthub-beige);
    transform: translateX(5px);
  }
`;g.a`
  color: var(--gitthub-light-beige);
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    color: var(--gitthub-beige);
    transform: translateX(5px);
  }
`;const Ey=g.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`,Vl=g.a`
  width: 40px;
  height: 40px;
  border: 2px solid var(--gitthub-light-beige);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--gitthub-light-beige);

  &:hover {
    background: var(--gitthub-beige);
    color: var(--gitthub-black);
    border-color: var(--gitthub-beige);
    transform: translateY(-3px);
  }
`,Ry=g.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  color: var(--gitthub-light-beige);
  
  span {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
`,_y=g.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-lg) 0;
  border-top: 1px solid var(--gitthub-gray);
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gitthub-light-beige);
  font-size: 0.9rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
`;function Py(){return l.jsxs(Sy,{children:[l.jsxs(jy,{children:[l.jsxs(Xo,{children:[l.jsx(Cy,{children:"gitthub"}),l.jsx("p",{children:"Transforming data into insights. We specialize in AI solutions, data journalism, and cutting-edge analytics to help organizations make data-driven decisions."}),l.jsxs(Ey,{children:[l.jsx(Vl,{href:"https://github.com",target:"_blank",rel:"noopener noreferrer","aria-label":"GitHub",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})}),l.jsx(Vl,{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Twitter",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"})})}),l.jsx(Vl,{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn",children:l.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"currentColor",children:l.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})})]})]}),l.jsxs(Xo,{children:[l.jsx("h3",{children:"Quick Links"}),l.jsxs(wp,{children:[l.jsx(Sn,{to:"/",children:"Home"}),l.jsx(Sn,{to:"/about",children:"About Us"}),l.jsx(Sn,{to:"/services",children:"Services"}),l.jsx(Sn,{to:"/contact",children:"Contact"})]})]}),l.jsxs(Xo,{children:[l.jsx("h3",{children:"Services"}),l.jsxs(wp,{children:[l.jsx(Sn,{to:"/services",children:"Data Analysis"}),l.jsx(Sn,{to:"/services",children:"AI Solutions"}),l.jsx(Sn,{to:"/services",children:"Data Journalism"}),l.jsx(Sn,{to:"/services",children:"Consulting"})]})]}),l.jsxs(Xo,{children:[l.jsx("h3",{children:"Contact"}),l.jsxs(Ry,{children:[l.jsx("span",{children:"📧 info@gitthub.org"}),l.jsx("span",{children:"📍 Frankfurt, Germany"}),l.jsx("span",{children:"🌐 www.gitthub.org"})]})]})]}),l.jsxs(_y,{children:[l.jsx("div",{children:"© 2025 gitthub. All rights reserved."}),l.jsxs("div",{children:[l.jsx(nn,{to:"/privacy",style:{color:"inherit",marginRight:"20px"},children:"Privacy Policy"}),l.jsx(nn,{to:"/terms",style:{color:"inherit"},children:"Terms of Service"})]})]})]})}function Lh(r,o){return function(){return r.apply(o,arguments)}}const{toString:Ty}=Object.prototype,{getPrototypeOf:Vu}=Object,{iterator:Fs,toStringTag:Oh}=Symbol,Ds=(r=>o=>{const s=Ty.call(o);return r[s]||(r[s]=s.slice(8,-1).toLowerCase())})(Object.create(null)),$t=r=>(r=r.toLowerCase(),o=>Ds(o)===r),$s=r=>o=>typeof o===r,{isArray:Fr}=Array,Ni=$s("undefined");function Ii(r){return r!==null&&!Ni(r)&&r.constructor!==null&&!Ni(r.constructor)&&gt(r.constructor.isBuffer)&&r.constructor.isBuffer(r)}const Ah=$t("ArrayBuffer");function zy(r){let o;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?o=ArrayBuffer.isView(r):o=r&&r.buffer&&Ah(r.buffer),o}const Ny=$s("string"),gt=$s("function"),Ih=$s("number"),Fi=r=>r!==null&&typeof r=="object",Ly=r=>r===!0||r===!1,ys=r=>{if(Ds(r)!=="object")return!1;const o=Vu(r);return(o===null||o===Object.prototype||Object.getPrototypeOf(o)===null)&&!(Oh in r)&&!(Fs in r)},Oy=r=>{if(!Fi(r)||Ii(r))return!1;try{return Object.keys(r).length===0&&Object.getPrototypeOf(r)===Object.prototype}catch{return!1}},Ay=$t("Date"),Iy=$t("File"),Fy=$t("Blob"),Dy=$t("FileList"),$y=r=>Fi(r)&&gt(r.pipe),My=r=>{let o;return r&&(typeof FormData=="function"&&r instanceof FormData||gt(r.append)&&((o=Ds(r))==="formdata"||o==="object"&&gt(r.toString)&&r.toString()==="[object FormData]"))},By=$t("URLSearchParams"),[Uy,Hy,Wy,Vy]=["ReadableStream","Request","Response","Headers"].map($t),qy=r=>r.trim?r.trim():r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Di(r,o,{allOwnKeys:s=!1}={}){if(r===null||typeof r>"u")return;let u,d;if(typeof r!="object"&&(r=[r]),Fr(r))for(u=0,d=r.length;u<d;u++)o.call(null,r[u],u,r);else{if(Ii(r))return;const f=s?Object.getOwnPropertyNames(r):Object.keys(r),h=f.length;let m;for(u=0;u<h;u++)m=f[u],o.call(null,r[m],m,r)}}function Fh(r,o){if(Ii(r))return null;o=o.toLowerCase();const s=Object.keys(r);let u=s.length,d;for(;u-- >0;)if(d=s[u],o===d.toLowerCase())return d;return null}const Qn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Dh=r=>!Ni(r)&&r!==Qn;function Pu(){const{caseless:r}=Dh(this)&&this||{},o={},s=(u,d)=>{const f=r&&Fh(o,d)||d;ys(o[f])&&ys(u)?o[f]=Pu(o[f],u):ys(u)?o[f]=Pu({},u):Fr(u)?o[f]=u.slice():o[f]=u};for(let u=0,d=arguments.length;u<d;u++)arguments[u]&&Di(arguments[u],s);return o}const Gy=(r,o,s,{allOwnKeys:u}={})=>(Di(o,(d,f)=>{s&&gt(d)?r[f]=Lh(d,s):r[f]=d},{allOwnKeys:u}),r),Qy=r=>(r.charCodeAt(0)===65279&&(r=r.slice(1)),r),Yy=(r,o,s,u)=>{r.prototype=Object.create(o.prototype,u),r.prototype.constructor=r,Object.defineProperty(r,"super",{value:o.prototype}),s&&Object.assign(r.prototype,s)},Ky=(r,o,s,u)=>{let d,f,h;const m={};if(o=o||{},r==null)return o;do{for(d=Object.getOwnPropertyNames(r),f=d.length;f-- >0;)h=d[f],(!u||u(h,r,o))&&!m[h]&&(o[h]=r[h],m[h]=!0);r=s!==!1&&Vu(r)}while(r&&(!s||s(r,o))&&r!==Object.prototype);return o},Jy=(r,o,s)=>{r=String(r),(s===void 0||s>r.length)&&(s=r.length),s-=o.length;const u=r.indexOf(o,s);return u!==-1&&u===s},Xy=r=>{if(!r)return null;if(Fr(r))return r;let o=r.length;if(!Ih(o))return null;const s=new Array(o);for(;o-- >0;)s[o]=r[o];return s},Zy=(r=>o=>r&&o instanceof r)(typeof Uint8Array<"u"&&Vu(Uint8Array)),ex=(r,o)=>{const u=(r&&r[Fs]).call(r);let d;for(;(d=u.next())&&!d.done;){const f=d.value;o.call(r,f[0],f[1])}},tx=(r,o)=>{let s;const u=[];for(;(s=r.exec(o))!==null;)u.push(s);return u},nx=$t("HTMLFormElement"),rx=r=>r.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(s,u,d){return u.toUpperCase()+d}),bp=(({hasOwnProperty:r})=>(o,s)=>r.call(o,s))(Object.prototype),ix=$t("RegExp"),$h=(r,o)=>{const s=Object.getOwnPropertyDescriptors(r),u={};Di(s,(d,f)=>{let h;(h=o(d,f,r))!==!1&&(u[f]=h||d)}),Object.defineProperties(r,u)},ox=r=>{$h(r,(o,s)=>{if(gt(r)&&["arguments","caller","callee"].indexOf(s)!==-1)return!1;const u=r[s];if(gt(u)){if(o.enumerable=!1,"writable"in o){o.writable=!1;return}o.set||(o.set=()=>{throw Error("Can not rewrite read-only method '"+s+"'")})}})},sx=(r,o)=>{const s={},u=d=>{d.forEach(f=>{s[f]=!0})};return Fr(r)?u(r):u(String(r).split(o)),s},ax=()=>{},lx=(r,o)=>r!=null&&Number.isFinite(r=+r)?r:o;function ux(r){return!!(r&&gt(r.append)&&r[Oh]==="FormData"&&r[Fs])}const cx=r=>{const o=new Array(10),s=(u,d)=>{if(Fi(u)){if(o.indexOf(u)>=0)return;if(Ii(u))return u;if(!("toJSON"in u)){o[d]=u;const f=Fr(u)?[]:{};return Di(u,(h,m)=>{const y=s(h,d+1);!Ni(y)&&(f[m]=y)}),o[d]=void 0,f}}return u};return s(r,0)},dx=$t("AsyncFunction"),fx=r=>r&&(Fi(r)||gt(r))&&gt(r.then)&&gt(r.catch),Mh=((r,o)=>r?setImmediate:o?((s,u)=>(Qn.addEventListener("message",({source:d,data:f})=>{d===Qn&&f===s&&u.length&&u.shift()()},!1),d=>{u.push(d),Qn.postMessage(s,"*")}))(`axios@${Math.random()}`,[]):s=>setTimeout(s))(typeof setImmediate=="function",gt(Qn.postMessage)),px=typeof queueMicrotask<"u"?queueMicrotask.bind(Qn):typeof process<"u"&&process.nextTick||Mh,hx=r=>r!=null&&gt(r[Fs]),z={isArray:Fr,isArrayBuffer:Ah,isBuffer:Ii,isFormData:My,isArrayBufferView:zy,isString:Ny,isNumber:Ih,isBoolean:Ly,isObject:Fi,isPlainObject:ys,isEmptyObject:Oy,isReadableStream:Uy,isRequest:Hy,isResponse:Wy,isHeaders:Vy,isUndefined:Ni,isDate:Ay,isFile:Iy,isBlob:Fy,isRegExp:ix,isFunction:gt,isStream:$y,isURLSearchParams:By,isTypedArray:Zy,isFileList:Dy,forEach:Di,merge:Pu,extend:Gy,trim:qy,stripBOM:Qy,inherits:Yy,toFlatObject:Ky,kindOf:Ds,kindOfTest:$t,endsWith:Jy,toArray:Xy,forEachEntry:ex,matchAll:tx,isHTMLForm:nx,hasOwnProperty:bp,hasOwnProp:bp,reduceDescriptors:$h,freezeMethods:ox,toObjectSet:sx,toCamelCase:rx,noop:ax,toFiniteNumber:lx,findKey:Fh,global:Qn,isContextDefined:Dh,isSpecCompliantForm:ux,toJSONObject:cx,isAsyncFn:dx,isThenable:fx,setImmediate:Mh,asap:px,isIterable:hx};function ce(r,o,s,u,d){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=r,this.name="AxiosError",o&&(this.code=o),s&&(this.config=s),u&&(this.request=u),d&&(this.response=d,this.status=d.status?d.status:null)}z.inherits(ce,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:z.toJSONObject(this.config),code:this.code,status:this.status}}});const Bh=ce.prototype,Uh={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(r=>{Uh[r]={value:r}});Object.defineProperties(ce,Uh);Object.defineProperty(Bh,"isAxiosError",{value:!0});ce.from=(r,o,s,u,d,f)=>{const h=Object.create(Bh);return z.toFlatObject(r,h,function(y){return y!==Error.prototype},m=>m!=="isAxiosError"),ce.call(h,r.message,o,s,u,d),h.cause=r,h.name=r.name,f&&Object.assign(h,f),h};const gx=null;function Tu(r){return z.isPlainObject(r)||z.isArray(r)}function Hh(r){return z.endsWith(r,"[]")?r.slice(0,-2):r}function kp(r,o,s){return r?r.concat(o).map(function(d,f){return d=Hh(d),!s&&f?"["+d+"]":d}).join(s?".":""):o}function mx(r){return z.isArray(r)&&!r.some(Tu)}const vx=z.toFlatObject(z,{},null,function(o){return/^is[A-Z]/.test(o)});function Ms(r,o,s){if(!z.isObject(r))throw new TypeError("target must be an object");o=o||new FormData,s=z.toFlatObject(s,{metaTokens:!0,dots:!1,indexes:!1},!1,function(j,E){return!z.isUndefined(E[j])});const u=s.metaTokens,d=s.visitor||k,f=s.dots,h=s.indexes,y=(s.Blob||typeof Blob<"u"&&Blob)&&z.isSpecCompliantForm(o);if(!z.isFunction(d))throw new TypeError("visitor must be a function");function x(T){if(T===null)return"";if(z.isDate(T))return T.toISOString();if(z.isBoolean(T))return T.toString();if(!y&&z.isBlob(T))throw new ce("Blob is not supported. Use a Buffer instead.");return z.isArrayBuffer(T)||z.isTypedArray(T)?y&&typeof Blob=="function"?new Blob([T]):Buffer.from(T):T}function k(T,j,E){let M=T;if(T&&!E&&typeof T=="object"){if(z.endsWith(j,"{}"))j=u?j:j.slice(0,-2),T=JSON.stringify(T);else if(z.isArray(T)&&mx(T)||(z.isFileList(T)||z.endsWith(j,"[]"))&&(M=z.toArray(T)))return j=Hh(j),M.forEach(function(H,Y){!(z.isUndefined(H)||H===null)&&o.append(h===!0?kp([j],Y,f):h===null?j:j+"[]",x(H))}),!1}return Tu(T)?!0:(o.append(kp(E,j,f),x(T)),!1)}const S=[],O=Object.assign(vx,{defaultVisitor:k,convertValue:x,isVisitable:Tu});function D(T,j){if(!z.isUndefined(T)){if(S.indexOf(T)!==-1)throw Error("Circular reference detected in "+j.join("."));S.push(T),z.forEach(T,function(M,B){(!(z.isUndefined(M)||M===null)&&d.call(o,M,z.isString(B)?B.trim():B,j,O))===!0&&D(M,j?j.concat(B):[B])}),S.pop()}}if(!z.isObject(r))throw new TypeError("data must be an object");return D(r),o}function Sp(r){const o={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g,function(u){return o[u]})}function qu(r,o){this._pairs=[],r&&Ms(r,this,o)}const Wh=qu.prototype;Wh.append=function(o,s){this._pairs.push([o,s])};Wh.toString=function(o){const s=o?function(u){return o.call(this,u,Sp)}:Sp;return this._pairs.map(function(d){return s(d[0])+"="+s(d[1])},"").join("&")};function yx(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Vh(r,o,s){if(!o)return r;const u=s&&s.encode||yx;z.isFunction(s)&&(s={serialize:s});const d=s&&s.serialize;let f;if(d?f=d(o,s):f=z.isURLSearchParams(o)?o.toString():new qu(o,s).toString(u),f){const h=r.indexOf("#");h!==-1&&(r=r.slice(0,h)),r+=(r.indexOf("?")===-1?"?":"&")+f}return r}class jp{constructor(){this.handlers=[]}use(o,s,u){return this.handlers.push({fulfilled:o,rejected:s,synchronous:u?u.synchronous:!1,runWhen:u?u.runWhen:null}),this.handlers.length-1}eject(o){this.handlers[o]&&(this.handlers[o]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(o){z.forEach(this.handlers,function(u){u!==null&&o(u)})}}const qh={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},xx=typeof URLSearchParams<"u"?URLSearchParams:qu,wx=typeof FormData<"u"?FormData:null,bx=typeof Blob<"u"?Blob:null,kx={isBrowser:!0,classes:{URLSearchParams:xx,FormData:wx,Blob:bx},protocols:["http","https","file","blob","url","data"]},Gu=typeof window<"u"&&typeof document<"u",zu=typeof navigator=="object"&&navigator||void 0,Sx=Gu&&(!zu||["ReactNative","NativeScript","NS"].indexOf(zu.product)<0),jx=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Cx=Gu&&window.location.href||"http://localhost",Ex=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Gu,hasStandardBrowserEnv:Sx,hasStandardBrowserWebWorkerEnv:jx,navigator:zu,origin:Cx},Symbol.toStringTag,{value:"Module"})),rt={...Ex,...kx};function Rx(r,o){return Ms(r,new rt.classes.URLSearchParams,{visitor:function(s,u,d,f){return rt.isNode&&z.isBuffer(s)?(this.append(u,s.toString("base64")),!1):f.defaultVisitor.apply(this,arguments)},...o})}function _x(r){return z.matchAll(/\w+|\[(\w*)]/g,r).map(o=>o[0]==="[]"?"":o[1]||o[0])}function Px(r){const o={},s=Object.keys(r);let u;const d=s.length;let f;for(u=0;u<d;u++)f=s[u],o[f]=r[f];return o}function Gh(r){function o(s,u,d,f){let h=s[f++];if(h==="__proto__")return!0;const m=Number.isFinite(+h),y=f>=s.length;return h=!h&&z.isArray(d)?d.length:h,y?(z.hasOwnProp(d,h)?d[h]=[d[h],u]:d[h]=u,!m):((!d[h]||!z.isObject(d[h]))&&(d[h]=[]),o(s,u,d[h],f)&&z.isArray(d[h])&&(d[h]=Px(d[h])),!m)}if(z.isFormData(r)&&z.isFunction(r.entries)){const s={};return z.forEachEntry(r,(u,d)=>{o(_x(u),d,s,0)}),s}return null}function Tx(r,o,s){if(z.isString(r))try{return(o||JSON.parse)(r),z.trim(r)}catch(u){if(u.name!=="SyntaxError")throw u}return(s||JSON.stringify)(r)}const $i={transitional:qh,adapter:["xhr","http","fetch"],transformRequest:[function(o,s){const u=s.getContentType()||"",d=u.indexOf("application/json")>-1,f=z.isObject(o);if(f&&z.isHTMLForm(o)&&(o=new FormData(o)),z.isFormData(o))return d?JSON.stringify(Gh(o)):o;if(z.isArrayBuffer(o)||z.isBuffer(o)||z.isStream(o)||z.isFile(o)||z.isBlob(o)||z.isReadableStream(o))return o;if(z.isArrayBufferView(o))return o.buffer;if(z.isURLSearchParams(o))return s.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),o.toString();let m;if(f){if(u.indexOf("application/x-www-form-urlencoded")>-1)return Rx(o,this.formSerializer).toString();if((m=z.isFileList(o))||u.indexOf("multipart/form-data")>-1){const y=this.env&&this.env.FormData;return Ms(m?{"files[]":o}:o,y&&new y,this.formSerializer)}}return f||d?(s.setContentType("application/json",!1),Tx(o)):o}],transformResponse:[function(o){const s=this.transitional||$i.transitional,u=s&&s.forcedJSONParsing,d=this.responseType==="json";if(z.isResponse(o)||z.isReadableStream(o))return o;if(o&&z.isString(o)&&(u&&!this.responseType||d)){const h=!(s&&s.silentJSONParsing)&&d;try{return JSON.parse(o)}catch(m){if(h)throw m.name==="SyntaxError"?ce.from(m,ce.ERR_BAD_RESPONSE,this,null,this.response):m}}return o}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:rt.classes.FormData,Blob:rt.classes.Blob},validateStatus:function(o){return o>=200&&o<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};z.forEach(["delete","get","head","post","put","patch"],r=>{$i.headers[r]={}});const zx=z.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Nx=r=>{const o={};let s,u,d;return r&&r.split(`
`).forEach(function(h){d=h.indexOf(":"),s=h.substring(0,d).trim().toLowerCase(),u=h.substring(d+1).trim(),!(!s||o[s]&&zx[s])&&(s==="set-cookie"?o[s]?o[s].push(u):o[s]=[u]:o[s]=o[s]?o[s]+", "+u:u)}),o},Cp=Symbol("internals");function Ci(r){return r&&String(r).trim().toLowerCase()}function xs(r){return r===!1||r==null?r:z.isArray(r)?r.map(xs):String(r)}function Lx(r){const o=Object.create(null),s=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let u;for(;u=s.exec(r);)o[u[1]]=u[2];return o}const Ox=r=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());function ql(r,o,s,u,d){if(z.isFunction(u))return u.call(this,o,s);if(d&&(o=s),!!z.isString(o)){if(z.isString(u))return o.indexOf(u)!==-1;if(z.isRegExp(u))return u.test(o)}}function Ax(r){return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(o,s,u)=>s.toUpperCase()+u)}function Ix(r,o){const s=z.toCamelCase(" "+o);["get","set","has"].forEach(u=>{Object.defineProperty(r,u+s,{value:function(d,f,h){return this[u].call(this,o,d,f,h)},configurable:!0})})}let mt=class{constructor(o){o&&this.set(o)}set(o,s,u){const d=this;function f(m,y,x){const k=Ci(y);if(!k)throw new Error("header name must be a non-empty string");const S=z.findKey(d,k);(!S||d[S]===void 0||x===!0||x===void 0&&d[S]!==!1)&&(d[S||y]=xs(m))}const h=(m,y)=>z.forEach(m,(x,k)=>f(x,k,y));if(z.isPlainObject(o)||o instanceof this.constructor)h(o,s);else if(z.isString(o)&&(o=o.trim())&&!Ox(o))h(Nx(o),s);else if(z.isObject(o)&&z.isIterable(o)){let m={},y,x;for(const k of o){if(!z.isArray(k))throw TypeError("Object iterator must return a key-value pair");m[x=k[0]]=(y=m[x])?z.isArray(y)?[...y,k[1]]:[y,k[1]]:k[1]}h(m,s)}else o!=null&&f(s,o,u);return this}get(o,s){if(o=Ci(o),o){const u=z.findKey(this,o);if(u){const d=this[u];if(!s)return d;if(s===!0)return Lx(d);if(z.isFunction(s))return s.call(this,d,u);if(z.isRegExp(s))return s.exec(d);throw new TypeError("parser must be boolean|regexp|function")}}}has(o,s){if(o=Ci(o),o){const u=z.findKey(this,o);return!!(u&&this[u]!==void 0&&(!s||ql(this,this[u],u,s)))}return!1}delete(o,s){const u=this;let d=!1;function f(h){if(h=Ci(h),h){const m=z.findKey(u,h);m&&(!s||ql(u,u[m],m,s))&&(delete u[m],d=!0)}}return z.isArray(o)?o.forEach(f):f(o),d}clear(o){const s=Object.keys(this);let u=s.length,d=!1;for(;u--;){const f=s[u];(!o||ql(this,this[f],f,o,!0))&&(delete this[f],d=!0)}return d}normalize(o){const s=this,u={};return z.forEach(this,(d,f)=>{const h=z.findKey(u,f);if(h){s[h]=xs(d),delete s[f];return}const m=o?Ax(f):String(f).trim();m!==f&&delete s[f],s[m]=xs(d),u[m]=!0}),this}concat(...o){return this.constructor.concat(this,...o)}toJSON(o){const s=Object.create(null);return z.forEach(this,(u,d)=>{u!=null&&u!==!1&&(s[d]=o&&z.isArray(u)?u.join(", "):u)}),s}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([o,s])=>o+": "+s).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(o){return o instanceof this?o:new this(o)}static concat(o,...s){const u=new this(o);return s.forEach(d=>u.set(d)),u}static accessor(o){const u=(this[Cp]=this[Cp]={accessors:{}}).accessors,d=this.prototype;function f(h){const m=Ci(h);u[m]||(Ix(d,h),u[m]=!0)}return z.isArray(o)?o.forEach(f):f(o),this}};mt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);z.reduceDescriptors(mt.prototype,({value:r},o)=>{let s=o[0].toUpperCase()+o.slice(1);return{get:()=>r,set(u){this[s]=u}}});z.freezeMethods(mt);function Gl(r,o){const s=this||$i,u=o||s,d=mt.from(u.headers);let f=u.data;return z.forEach(r,function(m){f=m.call(s,f,d.normalize(),o?o.status:void 0)}),d.normalize(),f}function Qh(r){return!!(r&&r.__CANCEL__)}function Dr(r,o,s){ce.call(this,r??"canceled",ce.ERR_CANCELED,o,s),this.name="CanceledError"}z.inherits(Dr,ce,{__CANCEL__:!0});function Yh(r,o,s){const u=s.config.validateStatus;!s.status||!u||u(s.status)?r(s):o(new ce("Request failed with status code "+s.status,[ce.ERR_BAD_REQUEST,ce.ERR_BAD_RESPONSE][Math.floor(s.status/100)-4],s.config,s.request,s))}function Fx(r){const o=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return o&&o[1]||""}function Dx(r,o){r=r||10;const s=new Array(r),u=new Array(r);let d=0,f=0,h;return o=o!==void 0?o:1e3,function(y){const x=Date.now(),k=u[f];h||(h=x),s[d]=y,u[d]=x;let S=f,O=0;for(;S!==d;)O+=s[S++],S=S%r;if(d=(d+1)%r,d===f&&(f=(f+1)%r),x-h<o)return;const D=k&&x-k;return D?Math.round(O*1e3/D):void 0}}function $x(r,o){let s=0,u=1e3/o,d,f;const h=(x,k=Date.now())=>{s=k,d=null,f&&(clearTimeout(f),f=null),r(...x)};return[(...x)=>{const k=Date.now(),S=k-s;S>=u?h(x,k):(d=x,f||(f=setTimeout(()=>{f=null,h(d)},u-S)))},()=>d&&h(d)]}const Rs=(r,o,s=3)=>{let u=0;const d=Dx(50,250);return $x(f=>{const h=f.loaded,m=f.lengthComputable?f.total:void 0,y=h-u,x=d(y),k=h<=m;u=h;const S={loaded:h,total:m,progress:m?h/m:void 0,bytes:y,rate:x||void 0,estimated:x&&m&&k?(m-h)/x:void 0,event:f,lengthComputable:m!=null,[o?"download":"upload"]:!0};r(S)},s)},Ep=(r,o)=>{const s=r!=null;return[u=>o[0]({lengthComputable:s,total:r,loaded:u}),o[1]]},Rp=r=>(...o)=>z.asap(()=>r(...o)),Mx=rt.hasStandardBrowserEnv?((r,o)=>s=>(s=new URL(s,rt.origin),r.protocol===s.protocol&&r.host===s.host&&(o||r.port===s.port)))(new URL(rt.origin),rt.navigator&&/(msie|trident)/i.test(rt.navigator.userAgent)):()=>!0,Bx=rt.hasStandardBrowserEnv?{write(r,o,s,u,d,f){const h=[r+"="+encodeURIComponent(o)];z.isNumber(s)&&h.push("expires="+new Date(s).toGMTString()),z.isString(u)&&h.push("path="+u),z.isString(d)&&h.push("domain="+d),f===!0&&h.push("secure"),document.cookie=h.join("; ")},read(r){const o=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return o?decodeURIComponent(o[3]):null},remove(r){this.write(r,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Ux(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)}function Hx(r,o){return o?r.replace(/\/?\/$/,"")+"/"+o.replace(/^\/+/,""):r}function Kh(r,o,s){let u=!Ux(o);return r&&(u||s==!1)?Hx(r,o):o}const _p=r=>r instanceof mt?{...r}:r;function Zn(r,o){o=o||{};const s={};function u(x,k,S,O){return z.isPlainObject(x)&&z.isPlainObject(k)?z.merge.call({caseless:O},x,k):z.isPlainObject(k)?z.merge({},k):z.isArray(k)?k.slice():k}function d(x,k,S,O){if(z.isUndefined(k)){if(!z.isUndefined(x))return u(void 0,x,S,O)}else return u(x,k,S,O)}function f(x,k){if(!z.isUndefined(k))return u(void 0,k)}function h(x,k){if(z.isUndefined(k)){if(!z.isUndefined(x))return u(void 0,x)}else return u(void 0,k)}function m(x,k,S){if(S in o)return u(x,k);if(S in r)return u(void 0,x)}const y={url:f,method:f,data:f,baseURL:h,transformRequest:h,transformResponse:h,paramsSerializer:h,timeout:h,timeoutMessage:h,withCredentials:h,withXSRFToken:h,adapter:h,responseType:h,xsrfCookieName:h,xsrfHeaderName:h,onUploadProgress:h,onDownloadProgress:h,decompress:h,maxContentLength:h,maxBodyLength:h,beforeRedirect:h,transport:h,httpAgent:h,httpsAgent:h,cancelToken:h,socketPath:h,responseEncoding:h,validateStatus:m,headers:(x,k,S)=>d(_p(x),_p(k),S,!0)};return z.forEach(Object.keys({...r,...o}),function(k){const S=y[k]||d,O=S(r[k],o[k],k);z.isUndefined(O)&&S!==m||(s[k]=O)}),s}const Jh=r=>{const o=Zn({},r);let{data:s,withXSRFToken:u,xsrfHeaderName:d,xsrfCookieName:f,headers:h,auth:m}=o;o.headers=h=mt.from(h),o.url=Vh(Kh(o.baseURL,o.url,o.allowAbsoluteUrls),r.params,r.paramsSerializer),m&&h.set("Authorization","Basic "+btoa((m.username||"")+":"+(m.password?unescape(encodeURIComponent(m.password)):"")));let y;if(z.isFormData(s)){if(rt.hasStandardBrowserEnv||rt.hasStandardBrowserWebWorkerEnv)h.setContentType(void 0);else if((y=h.getContentType())!==!1){const[x,...k]=y?y.split(";").map(S=>S.trim()).filter(Boolean):[];h.setContentType([x||"multipart/form-data",...k].join("; "))}}if(rt.hasStandardBrowserEnv&&(u&&z.isFunction(u)&&(u=u(o)),u||u!==!1&&Mx(o.url))){const x=d&&f&&Bx.read(f);x&&h.set(d,x)}return o},Wx=typeof XMLHttpRequest<"u",Vx=Wx&&function(r){return new Promise(function(s,u){const d=Jh(r);let f=d.data;const h=mt.from(d.headers).normalize();let{responseType:m,onUploadProgress:y,onDownloadProgress:x}=d,k,S,O,D,T;function j(){D&&D(),T&&T(),d.cancelToken&&d.cancelToken.unsubscribe(k),d.signal&&d.signal.removeEventListener("abort",k)}let E=new XMLHttpRequest;E.open(d.method.toUpperCase(),d.url,!0),E.timeout=d.timeout;function M(){if(!E)return;const H=mt.from("getAllResponseHeaders"in E&&E.getAllResponseHeaders()),q={data:!m||m==="text"||m==="json"?E.responseText:E.response,status:E.status,statusText:E.statusText,headers:H,config:r,request:E};Yh(function(K){s(K),j()},function(K){u(K),j()},q),E=null}"onloadend"in E?E.onloadend=M:E.onreadystatechange=function(){!E||E.readyState!==4||E.status===0&&!(E.responseURL&&E.responseURL.indexOf("file:")===0)||setTimeout(M)},E.onabort=function(){E&&(u(new ce("Request aborted",ce.ECONNABORTED,r,E)),E=null)},E.onerror=function(){u(new ce("Network Error",ce.ERR_NETWORK,r,E)),E=null},E.ontimeout=function(){let Y=d.timeout?"timeout of "+d.timeout+"ms exceeded":"timeout exceeded";const q=d.transitional||qh;d.timeoutErrorMessage&&(Y=d.timeoutErrorMessage),u(new ce(Y,q.clarifyTimeoutError?ce.ETIMEDOUT:ce.ECONNABORTED,r,E)),E=null},f===void 0&&h.setContentType(null),"setRequestHeader"in E&&z.forEach(h.toJSON(),function(Y,q){E.setRequestHeader(q,Y)}),z.isUndefined(d.withCredentials)||(E.withCredentials=!!d.withCredentials),m&&m!=="json"&&(E.responseType=d.responseType),x&&([O,T]=Rs(x,!0),E.addEventListener("progress",O)),y&&E.upload&&([S,D]=Rs(y),E.upload.addEventListener("progress",S),E.upload.addEventListener("loadend",D)),(d.cancelToken||d.signal)&&(k=H=>{E&&(u(!H||H.type?new Dr(null,r,E):H),E.abort(),E=null)},d.cancelToken&&d.cancelToken.subscribe(k),d.signal&&(d.signal.aborted?k():d.signal.addEventListener("abort",k)));const B=Fx(d.url);if(B&&rt.protocols.indexOf(B)===-1){u(new ce("Unsupported protocol "+B+":",ce.ERR_BAD_REQUEST,r));return}E.send(f||null)})},qx=(r,o)=>{const{length:s}=r=r?r.filter(Boolean):[];if(o||s){let u=new AbortController,d;const f=function(x){if(!d){d=!0,m();const k=x instanceof Error?x:this.reason;u.abort(k instanceof ce?k:new Dr(k instanceof Error?k.message:k))}};let h=o&&setTimeout(()=>{h=null,f(new ce(`timeout ${o} of ms exceeded`,ce.ETIMEDOUT))},o);const m=()=>{r&&(h&&clearTimeout(h),h=null,r.forEach(x=>{x.unsubscribe?x.unsubscribe(f):x.removeEventListener("abort",f)}),r=null)};r.forEach(x=>x.addEventListener("abort",f));const{signal:y}=u;return y.unsubscribe=()=>z.asap(m),y}},Gx=function*(r,o){let s=r.byteLength;if(s<o){yield r;return}let u=0,d;for(;u<s;)d=u+o,yield r.slice(u,d),u=d},Qx=async function*(r,o){for await(const s of Yx(r))yield*Gx(s,o)},Yx=async function*(r){if(r[Symbol.asyncIterator]){yield*r;return}const o=r.getReader();try{for(;;){const{done:s,value:u}=await o.read();if(s)break;yield u}}finally{await o.cancel()}},Pp=(r,o,s,u)=>{const d=Qx(r,o);let f=0,h,m=y=>{h||(h=!0,u&&u(y))};return new ReadableStream({async pull(y){try{const{done:x,value:k}=await d.next();if(x){m(),y.close();return}let S=k.byteLength;if(s){let O=f+=S;s(O)}y.enqueue(new Uint8Array(k))}catch(x){throw m(x),x}},cancel(y){return m(y),d.return()}},{highWaterMark:2})},Bs=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",Xh=Bs&&typeof ReadableStream=="function",Kx=Bs&&(typeof TextEncoder=="function"?(r=>o=>r.encode(o))(new TextEncoder):async r=>new Uint8Array(await new Response(r).arrayBuffer())),Zh=(r,...o)=>{try{return!!r(...o)}catch{return!1}},Jx=Xh&&Zh(()=>{let r=!1;const o=new Request(rt.origin,{body:new ReadableStream,method:"POST",get duplex(){return r=!0,"half"}}).headers.has("Content-Type");return r&&!o}),Tp=64*1024,Nu=Xh&&Zh(()=>z.isReadableStream(new Response("").body)),_s={stream:Nu&&(r=>r.body)};Bs&&(r=>{["text","arrayBuffer","blob","formData","stream"].forEach(o=>{!_s[o]&&(_s[o]=z.isFunction(r[o])?s=>s[o]():(s,u)=>{throw new ce(`Response type '${o}' is not supported`,ce.ERR_NOT_SUPPORT,u)})})})(new Response);const Xx=async r=>{if(r==null)return 0;if(z.isBlob(r))return r.size;if(z.isSpecCompliantForm(r))return(await new Request(rt.origin,{method:"POST",body:r}).arrayBuffer()).byteLength;if(z.isArrayBufferView(r)||z.isArrayBuffer(r))return r.byteLength;if(z.isURLSearchParams(r)&&(r=r+""),z.isString(r))return(await Kx(r)).byteLength},Zx=async(r,o)=>{const s=z.toFiniteNumber(r.getContentLength());return s??Xx(o)},e1=Bs&&(async r=>{let{url:o,method:s,data:u,signal:d,cancelToken:f,timeout:h,onDownloadProgress:m,onUploadProgress:y,responseType:x,headers:k,withCredentials:S="same-origin",fetchOptions:O}=Jh(r);x=x?(x+"").toLowerCase():"text";let D=qx([d,f&&f.toAbortSignal()],h),T;const j=D&&D.unsubscribe&&(()=>{D.unsubscribe()});let E;try{if(y&&Jx&&s!=="get"&&s!=="head"&&(E=await Zx(k,u))!==0){let q=new Request(o,{method:"POST",body:u,duplex:"half"}),G;if(z.isFormData(u)&&(G=q.headers.get("content-type"))&&k.setContentType(G),q.body){const[K,je]=Ep(E,Rs(Rp(y)));u=Pp(q.body,Tp,K,je)}}z.isString(S)||(S=S?"include":"omit");const M="credentials"in Request.prototype;T=new Request(o,{...O,signal:D,method:s.toUpperCase(),headers:k.normalize().toJSON(),body:u,duplex:"half",credentials:M?S:void 0});let B=await fetch(T,O);const H=Nu&&(x==="stream"||x==="response");if(Nu&&(m||H&&j)){const q={};["status","statusText","headers"].forEach(ye=>{q[ye]=B[ye]});const G=z.toFiniteNumber(B.headers.get("content-length")),[K,je]=m&&Ep(G,Rs(Rp(m),!0))||[];B=new Response(Pp(B.body,Tp,K,()=>{je&&je(),j&&j()}),q)}x=x||"text";let Y=await _s[z.findKey(_s,x)||"text"](B,r);return!H&&j&&j(),await new Promise((q,G)=>{Yh(q,G,{data:Y,headers:mt.from(B.headers),status:B.status,statusText:B.statusText,config:r,request:T})})}catch(M){throw j&&j(),M&&M.name==="TypeError"&&/Load failed|fetch/i.test(M.message)?Object.assign(new ce("Network Error",ce.ERR_NETWORK,r,T),{cause:M.cause||M}):ce.from(M,M&&M.code,r,T)}}),Lu={http:gx,xhr:Vx,fetch:e1};z.forEach(Lu,(r,o)=>{if(r){try{Object.defineProperty(r,"name",{value:o})}catch{}Object.defineProperty(r,"adapterName",{value:o})}});const zp=r=>`- ${r}`,t1=r=>z.isFunction(r)||r===null||r===!1,eg={getAdapter:r=>{r=z.isArray(r)?r:[r];const{length:o}=r;let s,u;const d={};for(let f=0;f<o;f++){s=r[f];let h;if(u=s,!t1(s)&&(u=Lu[(h=String(s)).toLowerCase()],u===void 0))throw new ce(`Unknown adapter '${h}'`);if(u)break;d[h||"#"+f]=u}if(!u){const f=Object.entries(d).map(([m,y])=>`adapter ${m} `+(y===!1?"is not supported by the environment":"is not available in the build"));let h=o?f.length>1?`since :
`+f.map(zp).join(`
`):" "+zp(f[0]):"as no adapter specified";throw new ce("There is no suitable adapter to dispatch the request "+h,"ERR_NOT_SUPPORT")}return u},adapters:Lu};function Ql(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new Dr(null,r)}function Np(r){return Ql(r),r.headers=mt.from(r.headers),r.data=Gl.call(r,r.transformRequest),["post","put","patch"].indexOf(r.method)!==-1&&r.headers.setContentType("application/x-www-form-urlencoded",!1),eg.getAdapter(r.adapter||$i.adapter)(r).then(function(u){return Ql(r),u.data=Gl.call(r,r.transformResponse,u),u.headers=mt.from(u.headers),u},function(u){return Qh(u)||(Ql(r),u&&u.response&&(u.response.data=Gl.call(r,r.transformResponse,u.response),u.response.headers=mt.from(u.response.headers))),Promise.reject(u)})}const tg="1.11.0",Us={};["object","boolean","number","function","string","symbol"].forEach((r,o)=>{Us[r]=function(u){return typeof u===r||"a"+(o<1?"n ":" ")+r}});const Lp={};Us.transitional=function(o,s,u){function d(f,h){return"[Axios v"+tg+"] Transitional option '"+f+"'"+h+(u?". "+u:"")}return(f,h,m)=>{if(o===!1)throw new ce(d(h," has been removed"+(s?" in "+s:"")),ce.ERR_DEPRECATED);return s&&!Lp[h]&&(Lp[h]=!0,console.warn(d(h," has been deprecated since v"+s+" and will be removed in the near future"))),o?o(f,h,m):!0}};Us.spelling=function(o){return(s,u)=>(console.warn(`${u} is likely a misspelling of ${o}`),!0)};function n1(r,o,s){if(typeof r!="object")throw new ce("options must be an object",ce.ERR_BAD_OPTION_VALUE);const u=Object.keys(r);let d=u.length;for(;d-- >0;){const f=u[d],h=o[f];if(h){const m=r[f],y=m===void 0||h(m,f,r);if(y!==!0)throw new ce("option "+f+" must be "+y,ce.ERR_BAD_OPTION_VALUE);continue}if(s!==!0)throw new ce("Unknown option "+f,ce.ERR_BAD_OPTION)}}const ws={assertOptions:n1,validators:Us},Vt=ws.validators;let Jn=class{constructor(o){this.defaults=o||{},this.interceptors={request:new jp,response:new jp}}async request(o,s){try{return await this._request(o,s)}catch(u){if(u instanceof Error){let d={};Error.captureStackTrace?Error.captureStackTrace(d):d=new Error;const f=d.stack?d.stack.replace(/^.+\n/,""):"";try{u.stack?f&&!String(u.stack).endsWith(f.replace(/^.+\n.+\n/,""))&&(u.stack+=`
`+f):u.stack=f}catch{}}throw u}}_request(o,s){typeof o=="string"?(s=s||{},s.url=o):s=o||{},s=Zn(this.defaults,s);const{transitional:u,paramsSerializer:d,headers:f}=s;u!==void 0&&ws.assertOptions(u,{silentJSONParsing:Vt.transitional(Vt.boolean),forcedJSONParsing:Vt.transitional(Vt.boolean),clarifyTimeoutError:Vt.transitional(Vt.boolean)},!1),d!=null&&(z.isFunction(d)?s.paramsSerializer={serialize:d}:ws.assertOptions(d,{encode:Vt.function,serialize:Vt.function},!0)),s.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?s.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:s.allowAbsoluteUrls=!0),ws.assertOptions(s,{baseUrl:Vt.spelling("baseURL"),withXsrfToken:Vt.spelling("withXSRFToken")},!0),s.method=(s.method||this.defaults.method||"get").toLowerCase();let h=f&&z.merge(f.common,f[s.method]);f&&z.forEach(["delete","get","head","post","put","patch","common"],T=>{delete f[T]}),s.headers=mt.concat(h,f);const m=[];let y=!0;this.interceptors.request.forEach(function(j){typeof j.runWhen=="function"&&j.runWhen(s)===!1||(y=y&&j.synchronous,m.unshift(j.fulfilled,j.rejected))});const x=[];this.interceptors.response.forEach(function(j){x.push(j.fulfilled,j.rejected)});let k,S=0,O;if(!y){const T=[Np.bind(this),void 0];for(T.unshift(...m),T.push(...x),O=T.length,k=Promise.resolve(s);S<O;)k=k.then(T[S++],T[S++]);return k}O=m.length;let D=s;for(S=0;S<O;){const T=m[S++],j=m[S++];try{D=T(D)}catch(E){j.call(this,E);break}}try{k=Np.call(this,D)}catch(T){return Promise.reject(T)}for(S=0,O=x.length;S<O;)k=k.then(x[S++],x[S++]);return k}getUri(o){o=Zn(this.defaults,o);const s=Kh(o.baseURL,o.url,o.allowAbsoluteUrls);return Vh(s,o.params,o.paramsSerializer)}};z.forEach(["delete","get","head","options"],function(o){Jn.prototype[o]=function(s,u){return this.request(Zn(u||{},{method:o,url:s,data:(u||{}).data}))}});z.forEach(["post","put","patch"],function(o){function s(u){return function(f,h,m){return this.request(Zn(m||{},{method:o,headers:u?{"Content-Type":"multipart/form-data"}:{},url:f,data:h}))}}Jn.prototype[o]=s(),Jn.prototype[o+"Form"]=s(!0)});let r1=class ng{constructor(o){if(typeof o!="function")throw new TypeError("executor must be a function.");let s;this.promise=new Promise(function(f){s=f});const u=this;this.promise.then(d=>{if(!u._listeners)return;let f=u._listeners.length;for(;f-- >0;)u._listeners[f](d);u._listeners=null}),this.promise.then=d=>{let f;const h=new Promise(m=>{u.subscribe(m),f=m}).then(d);return h.cancel=function(){u.unsubscribe(f)},h},o(function(f,h,m){u.reason||(u.reason=new Dr(f,h,m),s(u.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(o){if(this.reason){o(this.reason);return}this._listeners?this._listeners.push(o):this._listeners=[o]}unsubscribe(o){if(!this._listeners)return;const s=this._listeners.indexOf(o);s!==-1&&this._listeners.splice(s,1)}toAbortSignal(){const o=new AbortController,s=u=>{o.abort(u)};return this.subscribe(s),o.signal.unsubscribe=()=>this.unsubscribe(s),o.signal}static source(){let o;return{token:new ng(function(d){o=d}),cancel:o}}};function i1(r){return function(s){return r.apply(null,s)}}function o1(r){return z.isObject(r)&&r.isAxiosError===!0}const Ou={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Ou).forEach(([r,o])=>{Ou[o]=r});function rg(r){const o=new Jn(r),s=Lh(Jn.prototype.request,o);return z.extend(s,Jn.prototype,o,{allOwnKeys:!0}),z.extend(s,o,null,{allOwnKeys:!0}),s.create=function(d){return rg(Zn(r,d))},s}const ue=rg($i);ue.Axios=Jn;ue.CanceledError=Dr;ue.CancelToken=r1;ue.isCancel=Qh;ue.VERSION=tg;ue.toFormData=Ms;ue.AxiosError=ce;ue.Cancel=ue.CanceledError;ue.all=function(o){return Promise.all(o)};ue.spread=i1;ue.isAxiosError=o1;ue.mergeConfig=Zn;ue.AxiosHeaders=mt;ue.formToJSON=r=>Gh(z.isHTMLForm(r)?new FormData(r):r);ue.getAdapter=eg.getAdapter;ue.HttpStatusCode=Ou;ue.default=ue;const{Axios:vS,AxiosError:yS,CanceledError:xS,isCancel:wS,CancelToken:bS,VERSION:kS,all:SS,Cancel:jS,isAxiosError:CS,spread:ES,toFormData:RS,AxiosHeaders:_S,HttpStatusCode:PS,formToJSON:TS,getAdapter:zS,mergeConfig:NS}=ue,Op="",s1=g.div`
  width: 100%;
  overflow-x: hidden;
`,a1=g.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--gitthub-beige);
  padding: var(--spacing-xxl) var(--spacing-lg);

  @media (max-width: 768px) {
    min-height: calc(100vh - 70px);
    padding: var(--spacing-xl) var(--spacing-md);
  }
`,l1=g.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`,u1=g.div`
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,c1=g.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;

  span {
    display: block;
    background: linear-gradient(135deg, var(--gitthub-black) 0%, var(--gitthub-gray) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`,d1=g.p`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--gitthub-gray);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
`,f1=g.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`,Yl=g(nn)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  text-align: center;
  min-width: 150px;

  ${r=>r.$primary?`
    background: var(--gitthub-black);
    color: var(--gitthub-beige);
    border: 2px solid var(--gitthub-black);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
  `:`
    background: transparent;
    color: var(--gitthub-black);
    border: 2px solid var(--gitthub-black);

    &:hover {
      background: var(--gitthub-black);
      color: var(--gitthub-beige);
      transform: translateY(-3px);
    }
  `}
`,p1=g.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @media (max-width: 1024px) {
    height: 400px;
  }
`,h1=g.div`
  width: 100%;
  height: 100%;
  background: var(--gitthub-black);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'gitthub';
    position: absolute;
    font-size: 8rem;
    font-weight: 900;
    color: var(--gitthub-beige);
    opacity: 0.1;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`,g1=g.div`
  font-size: 4rem;
  font-weight: 900;
  color: var(--gitthub-beige);
  z-index: 1;
  letter-spacing: -0.05em;
`,m1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
  border-top: 3px solid var(--gitthub-black);
  border-bottom: 3px solid var(--gitthub-black);
`,v1=g.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
`,y1=g.h2`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
`,x1=g.p`
  font-size: 1.25rem;
  color: var(--gitthub-gray);
  line-height: 1.8;
`,w1=g.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b1=g.div`
  background: var(--gitthub-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    &::after {
      transform: translateX(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gitthub-black);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`,k1=g.div`
  width: 60px;
  height: 60px;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  font-weight: 900;
`,S1=g.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
`,j1=g.p`
  color: var(--gitthub-gray);
  line-height: 1.6;
`,C1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-bottom: 3px solid var(--gitthub-black);
`,E1=g.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  text-align: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Zo=g.div`
  h3 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    background: linear-gradient(135deg, var(--gitthub-beige) 0%, var(--gitthub-light-beige) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.1rem;
    color: var(--gitthub-light-beige);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`,R1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-top: 3px solid var(--gitthub-black);
`,_1=g.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
  }
`;function P1(){const[r,o]=N.useState([]),[s,u]=N.useState(null);return N.useEffect(()=>{ue.get(`${Op}/api/features`).then(d=>{o(d.data.features||[])}).catch(d=>{console.error("Error fetching features:",d),o([{title:"Data Analysis",description:"Transform raw data into actionable insights with our advanced analytics.",icon:"📊"},{title:"AI Solutions",description:"Leverage cutting-edge artificial intelligence for smarter decision making.",icon:"🤖"},{title:"Data Journalism",description:"Tell compelling stories backed by data-driven research and visualization.",icon:"📰"},{title:"Machine Learning",description:"Build predictive models that learn and improve from your data.",icon:"🧠"},{title:"Consulting",description:"Expert guidance to navigate your data transformation journey.",icon:"💡"},{title:"Training",description:"Empower your team with data literacy and technical skills.",icon:"🎓"}])}),ue.get(`${Op}/api/stats`).then(d=>{u(d.data)}).catch(d=>{console.error("Error fetching stats:",d),u({projects:150,clients:50,team:25,years:5})})},[]),l.jsxs(s1,{children:[l.jsx(a1,{children:l.jsxs(l1,{children:[l.jsxs(u1,{children:[l.jsxs(c1,{children:["Data Science",l.jsx("span",{children:"Meets Innovation"})]}),l.jsx(d1,{children:"Transform your data into powerful insights with cutting-edge AI and machine learning solutions tailored for modern challenges."}),l.jsxs(f1,{children:[l.jsx(Yl,{to:"/services",$primary:!0,children:"Explore Services"}),l.jsx(Yl,{to:"/contact",children:"Get Started"})]})]}),l.jsx(p1,{children:l.jsx(h1,{children:l.jsx(g1,{children:"gitthub"})})})]})}),l.jsxs(m1,{children:[l.jsxs(v1,{children:[l.jsx(y1,{children:"What We Do"}),l.jsx(x1,{children:"Comprehensive data solutions designed to accelerate your digital transformation"})]}),l.jsx(w1,{children:r.map((d,f)=>l.jsxs(b1,{children:[l.jsx(k1,{children:d.icon}),l.jsx(S1,{children:d.title}),l.jsx(j1,{children:d.description})]},f))})]}),s&&l.jsx(C1,{children:l.jsxs(E1,{children:[l.jsxs(Zo,{children:[l.jsxs("h3",{children:[s.projects||150,"+"]}),l.jsx("p",{children:"Projects Completed"})]}),l.jsxs(Zo,{children:[l.jsxs("h3",{children:[s.clients||50,"+"]}),l.jsx("p",{children:"Happy Clients"})]}),l.jsxs(Zo,{children:[l.jsxs("h3",{children:[s.team||25,"+"]}),l.jsx("p",{children:"Team Members"})]}),l.jsxs(Zo,{children:[l.jsxs("h3",{children:[s.years||5,"+"]}),l.jsx("p",{children:"Years Experience"})]})]})}),l.jsx(R1,{children:l.jsxs(_1,{children:[l.jsx("h2",{children:"Ready to Transform Your Data?"}),l.jsx("p",{children:"Let's discuss how our expertise can help you unlock the full potential of your data and drive meaningful business outcomes."}),l.jsx(Yl,{to:"/contact",$primary:!0,children:"Start Your Journey"})]})})]})}const T1=g.div`
  padding: var(--spacing-xxl) 0;
`,z1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-bottom: 3px solid var(--gitthub-black);
`,N1=g.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;
`,L1=g.p`
  font-size: 1.5rem;
  color: var(--gitthub-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`,Kl=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: ${r=>r.$alt?"var(--gitthub-light-beige)":"var(--gitthub-beige)"};
  border-bottom: 3px solid var(--gitthub-black);
`,Jl=g.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${r=>(r.$reverse,"1fr 1fr")};
  gap: var(--spacing-xxl);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  ${r=>r.$reverse&&`
    @media (min-width: 1025px) {
      > *:first-child {
        order: 2;
      }
    }
  `}
`,Xl=g.div`
  h2 {
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.125rem;
    color: var(--gitthub-gray);
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }
`,Zl=g.div`
  background: var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xxl);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(232, 221, 212, 0.05) 10px,
      rgba(232, 221, 212, 0.05) 20px
    );
    animation: slide 20s linear infinite;
  }

  @keyframes slide {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`,eu=g.div`
  color: var(--gitthub-beige);
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  z-index: 1;
  position: relative;
`,O1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
`,A1=g.div`
  text-align: center;
  margin-bottom: var(--spacing-xxl);

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-light-beige);
    max-width: 800px;
    margin: 0 auto;
  }
`,I1=g.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
`,es=g.div`
  text-align: center;
  padding: var(--spacing-lg);
  border: 2px solid var(--gitthub-beige);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: var(--gitthub-beige);
    color: var(--gitthub-black);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: var(--spacing-md);
  }

  p {
    line-height: 1.6;
  }
`,F1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
`,D1=g.div`
  text-align: center;
  margin-bottom: var(--spacing-xxl);

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-gray);
    max-width: 800px;
    margin: 0 auto;
  }
`,$1=g.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,tu=g.div`
  padding: var(--spacing-xl);
  background: var(--gitthub-light-beige);
  border-radius: var(--radius-lg);
  border: 3px solid var(--gitthub-black);

  h3 {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
  }

  p {
    font-size: 1.1rem;
    color: var(--gitthub-gray);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`,M1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
  text-align: center;
`,B1=g.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
  }
`,U1=g(nn)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;function H1(){return l.jsxs(T1,{children:[l.jsxs(z1,{children:[l.jsx(N1,{children:"About gitthub"}),l.jsx(L1,{children:"Pioneering the intersection of data science, artificial intelligence, and storytelling to create meaningful impact."})]}),l.jsx(Kl,{children:l.jsxs(Jl,{children:[l.jsxs(Xl,{children:[l.jsx("h2",{children:"Our Mission"}),l.jsx("p",{children:"At gitthub, we believe in the transformative power of data. Our mission is to democratize access to advanced analytics and AI technologies, enabling organizations of all sizes to make informed, data-driven decisions."}),l.jsx("p",{children:"We combine cutting-edge technology with deep domain expertise to deliver solutions that not only solve complex problems but also tell compelling stories through data visualization and journalism."})]}),l.jsx(Zl,{children:l.jsx(eu,{children:"Mission"})})]})}),l.jsx(Kl,{$alt:!0,children:l.jsxs(Jl,{$reverse:!0,children:[l.jsxs(Xl,{children:[l.jsx("h2",{children:"Our Approach"}),l.jsx("p",{children:"We take a holistic approach to data science, combining technical excellence with creative storytelling. Our interdisciplinary team brings together expertise in machine learning, statistics, journalism, and design."}),l.jsx("p",{children:"Every project begins with understanding your unique challenges and goals. We then apply our expertise to develop tailored solutions that deliver measurable results and actionable insights."})]}),l.jsx(Zl,{children:l.jsx(eu,{children:"Approach"})})]})}),l.jsxs(O1,{children:[l.jsxs(A1,{children:[l.jsx("h2",{children:"Our Core Values"}),l.jsx("p",{children:"The principles that guide everything we do"})]}),l.jsxs(I1,{children:[l.jsxs(es,{children:[l.jsx("h3",{children:"Innovation"}),l.jsx("p",{children:"Pushing boundaries with cutting-edge technology and creative solutions"})]}),l.jsxs(es,{children:[l.jsx("h3",{children:"Integrity"}),l.jsx("p",{children:"Maintaining the highest standards of ethics and transparency in our work"})]}),l.jsxs(es,{children:[l.jsx("h3",{children:"Impact"}),l.jsx("p",{children:"Creating meaningful change through data-driven insights and solutions"})]}),l.jsxs(es,{children:[l.jsx("h3",{children:"Collaboration"}),l.jsx("p",{children:"Working together with clients as partners in their success journey"})]})]})]}),l.jsxs(F1,{children:[l.jsxs(D1,{children:[l.jsx("h2",{children:"Our Team"}),l.jsx("p",{children:"A diverse group of data scientists, engineers, journalists, and designers united by a passion for innovation"})]}),l.jsxs($1,{children:[l.jsxs(tu,{children:[l.jsx("h3",{children:"25+"}),l.jsx("p",{children:"Expert Professionals"})]}),l.jsxs(tu,{children:[l.jsx("h3",{children:"10+"}),l.jsx("p",{children:"Disciplines"})]}),l.jsxs(tu,{children:[l.jsx("h3",{children:"5+"}),l.jsx("p",{children:"Years Experience"})]})]})]}),l.jsx(Kl,{children:l.jsxs(Jl,{children:[l.jsxs(Xl,{children:[l.jsx("h2",{children:"Technology Stack"}),l.jsx("p",{children:"We leverage the latest technologies and frameworks to deliver robust, scalable solutions. Our expertise spans Python, R, TensorFlow, PyTorch, and cloud platforms including AWS, Google Cloud, and Azure."}),l.jsx("p",{children:"From real-time data processing to advanced neural networks, we have the technical capabilities to tackle any data challenge."})]}),l.jsx(Zl,{children:l.jsx(eu,{children:"Tech"})})]})}),l.jsx(M1,{children:l.jsxs(B1,{children:[l.jsx("h2",{children:"Let's Work Together"}),l.jsx("p",{children:"Ready to unlock the potential of your data? We're here to help you navigate the journey from raw data to actionable insights."}),l.jsx(U1,{to:"/contact",children:"Get in Touch"})]})})]})}const W1=g.div`
  padding: var(--spacing-xxl) 0;
`,V1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-bottom: 3px solid var(--gitthub-black);
`,q1=g.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;
`,G1=g.p`
  font-size: 1.5rem;
  color: var(--gitthub-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`,Q1=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
  border-bottom: 3px solid var(--gitthub-black);
`,Y1=g.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,K1=g.div`
  background: var(--gitthub-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--gitthub-black);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
`,J1=g.div`
  width: 80px;
  height: 80px;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
  font-weight: 900;
`,X1=g.h3`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
`,Z1=g.p`
  color: var(--gitthub-gray);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
`,ew=g.ul`
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-lg);
`,tw=g.li`
  padding: var(--spacing-sm) 0;
  color: var(--gitthub-gray);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  &::before {
    content: '✓';
    font-weight: bold;
    color: var(--gitthub-black);
    font-size: 1.2rem;
  }
`,nw=g.button`
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`,rw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-bottom: 3px solid var(--gitthub-black);
`,iw=g.div`
  text-align: center;
  margin-bottom: var(--spacing-xxl);

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-light-beige);
    max-width: 800px;
    margin: 0 auto;
  }
`,ow=g.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: var(--gitthub-light-beige);
    opacity: 0.3;
    z-index: 0;

    @media (max-width: 1024px) {
      display: none;
    }
  }
`,sw=g.div`
  text-align: center;
  position: relative;
  z-index: 1;
`,aw=g.div`
  width: 80px;
  height: 80px;
  background: var(--gitthub-beige);
  color: var(--gitthub-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  margin: 0 auto var(--spacing-md);
  border: 3px solid var(--gitthub-beige);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`,lw=g.h3`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
`,uw=g.p`
  color: var(--gitthub-light-beige);
  font-size: 0.95rem;
  line-height: 1.6;
`,cw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  border-bottom: 3px solid var(--gitthub-black);
`,dw=g.div`
  text-align: center;
  margin-bottom: var(--spacing-xxl);

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.02em;
  }
`,fw=g.div`
  max-width: 800px;
  margin: 0 auto;
  background: var(--gitthub-light-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;

  p {
    font-size: 1.25rem;
    line-height: 1.8;
    color: var(--gitthub-gray);
    margin-bottom: var(--spacing-lg);
    font-style: italic;
  }

  cite {
    font-style: normal;
    font-weight: 700;
    display: block;
    color: var(--gitthub-black);
  }
`,pw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
  text-align: center;
`,hw=g.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
  }
`,gw=g(nn)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;function mw(){const r=[{icon:"📊",title:"Data Analytics",description:"Transform raw data into actionable insights with advanced analytics and visualization.",features:["Exploratory Data Analysis","Statistical Modeling","Interactive Dashboards","Real-time Analytics","Custom Reports"]},{icon:"🤖",title:"AI & Machine Learning",description:"Build intelligent systems that learn from data and improve over time.",features:["Predictive Modeling","Natural Language Processing","Computer Vision","Deep Learning","Model Deployment"]},{icon:"📰",title:"Data Journalism",description:"Tell compelling stories backed by data-driven research and visualization.",features:["Data Investigation","Story Development","Interactive Visualizations","Fact Checking","Publication Support"]},{icon:"🎯",title:"Business Intelligence",description:"Enable data-driven decision making across your organization.",features:["KPI Development","Performance Tracking","Competitive Analysis","Market Research","Strategy Consulting"]},{icon:"⚙️",title:"Data Engineering",description:"Build robust data infrastructure for scalable analytics.",features:["Data Pipeline Development","ETL/ELT Processes","Data Warehouse Design","Cloud Architecture","API Development"]},{icon:"🎓",title:"Training & Workshops",description:"Empower your team with data literacy and technical skills.",features:["Custom Training Programs","Hands-on Workshops","Data Literacy","Tool Training","Best Practices"]}],o=[{number:"1",title:"Discovery",description:"Understanding your needs and defining objectives"},{number:"2",title:"Analysis",description:"Deep dive into your data and requirements"},{number:"3",title:"Development",description:"Building and testing tailored solutions"},{number:"4",title:"Deployment",description:"Implementation and continuous optimization"}];return l.jsxs(W1,{children:[l.jsxs(V1,{children:[l.jsx(q1,{children:"Our Services"}),l.jsx(G1,{children:"Comprehensive data solutions designed to accelerate your digital transformation and drive business growth."})]}),l.jsx(Q1,{children:l.jsx(Y1,{children:r.map((s,u)=>l.jsxs(K1,{children:[l.jsx(J1,{children:s.icon}),l.jsx(X1,{children:s.title}),l.jsx(Z1,{children:s.description}),l.jsx(ew,{children:s.features.map((d,f)=>l.jsx(tw,{children:d},f))}),l.jsx(nw,{children:"Learn More →"})]},u))})}),l.jsxs(rw,{children:[l.jsxs(iw,{children:[l.jsx("h2",{children:"Our Process"}),l.jsx("p",{children:"A proven methodology that delivers results"})]}),l.jsx(ow,{children:o.map((s,u)=>l.jsxs(sw,{children:[l.jsx(aw,{children:s.number}),l.jsx(lw,{children:s.title}),l.jsx(uw,{children:s.description})]},u))})]}),l.jsxs(cw,{children:[l.jsx(dw,{children:l.jsx("h2",{children:"Client Success Stories"})}),l.jsxs(fw,{children:[l.jsx("p",{children:`"gitthub transformed our data chaos into clear insights. Their team's expertise in both technical implementation and strategic thinking helped us make data-driven decisions that increased our efficiency by 40%."`}),l.jsx("cite",{children:"— Director of Operations, Tech Startup"})]})]}),l.jsx(pw,{children:l.jsxs(hw,{children:[l.jsx("h2",{children:"Ready to Get Started?"}),l.jsx("p",{children:"Let's discuss how our services can help you achieve your data goals and drive meaningful business outcomes."}),l.jsx(gw,{to:"/contact",children:"Schedule a Consultation"})]})})]})}const vw="",yw=g.div`
  padding: var(--spacing-xxl) 0;
  min-height: calc(100vh - 160px);
`,xw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-bottom: 3px solid var(--gitthub-black);
`,ww=g.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;
`,bw=g.p`
  font-size: 1.5rem;
  color: var(--gitthub-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`,kw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
`,Sw=g.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,jw=g.form`
  background: var(--gitthub-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
`,Cw=g.h2`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
`,ts=g.div`
  margin-bottom: var(--spacing-lg);
`,ns=g.label`
  display: block;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--gitthub-black);
  font-size: 1.1rem;
`,nu=g.input`
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1rem;
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-sm);
  background: var(--gitthub-light-beige);
  color: var(--gitthub-black);
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: var(--gitthub-white);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: var(--gitthub-gray);
    opacity: 0.6;
  }
`,Ew=g.textarea`
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1rem;
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-sm);
  background: var(--gitthub-light-beige);
  color: var(--gitthub-black);
  font-family: inherit;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: var(--gitthub-white);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: var(--gitthub-gray);
    opacity: 0.6;
  }
`,Rw=g.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.1rem;
  font-weight: 700;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,_w=g.div`
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  margin-top: var(--spacing-md);
  font-weight: 600;
  text-align: center;

  ${r=>r.$success?`
    background: #d4edda;
    color: #155724;
    border: 2px solid #155724;
  `:`
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #721c24;
  `}
`,Pw=g.div`
  padding: var(--spacing-xl);
`,Tw=g.div`
  margin-bottom: var(--spacing-xxl);

  h3 {
    font-size: 1.75rem;
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.01em;
  }

  p {
    color: var(--gitthub-gray);
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }
`,zw=g.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`,ru=g.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
`,iu=g.div`
  width: 50px;
  height: 50px;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`,ou=g.div`
  h4 {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: var(--spacing-xs);
  }

  p {
    color: var(--gitthub-gray);
    line-height: 1.6;
  }

  a {
    color: var(--gitthub-black);
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`,Nw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  border-top: 3px solid var(--gitthub-black);
`,Lw=g.div`
  text-align: center;
  margin-bottom: var(--spacing-xxl);

  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
  }
`,Ow=g.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  gap: var(--spacing-lg);
`,Aw=g.div`
  background: var(--gitthub-light-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--gitthub-gray);
    line-height: 1.6;
  }
`;function Iw(){const[r,o]=N.useState({name:"",email:"",company:"",message:""}),[s,u]=N.useState(!1),[d,f]=N.useState(null),h=x=>{o({...r,[x.target.name]:x.target.value})},m=async x=>{x.preventDefault(),u(!0),f(null);try{(await ue.post(`${vw}/api/contact`,r)).status===200&&(f({type:"success",text:"Thank you for your message! We'll get back to you soon."}),o({name:"",email:"",company:"",message:""}))}catch{f({type:"error",text:"Something went wrong. Please try again later."})}finally{u(!1)}},y=[{question:"How long does a typical project take?",answer:"Project timelines vary based on scope and complexity. Simple analytics projects can be completed in 2-4 weeks, while comprehensive AI implementations may take 3-6 months."},{question:"Do you work with small businesses?",answer:"Absolutely! We work with organizations of all sizes, from startups to enterprises. Our solutions are tailored to fit your specific needs and budget."},{question:"What industries do you specialize in?",answer:"We have experience across multiple industries including finance, healthcare, retail, technology, and media. Our data science expertise is applicable to any data-driven challenge."},{question:"Can you help with data infrastructure?",answer:"Yes, we provide end-to-end data solutions including infrastructure design, data pipeline development, and cloud architecture implementation."}];return l.jsxs(yw,{children:[l.jsxs(xw,{children:[l.jsx(ww,{children:"Get in Touch"}),l.jsx(bw,{children:"Ready to transform your data into insights? Let's discuss how we can help."})]}),l.jsx(kw,{children:l.jsxs(Sw,{children:[l.jsxs(jw,{onSubmit:m,children:[l.jsx(Cw,{children:"Send Us a Message"}),l.jsxs(ts,{children:[l.jsx(ns,{htmlFor:"name",children:"Your Name *"}),l.jsx(nu,{type:"text",id:"name",name:"name",value:r.name,onChange:h,placeholder:"John Doe",required:!0})]}),l.jsxs(ts,{children:[l.jsx(ns,{htmlFor:"email",children:"Email Address *"}),l.jsx(nu,{type:"email",id:"email",name:"email",value:r.email,onChange:h,placeholder:"john@example.com",required:!0})]}),l.jsxs(ts,{children:[l.jsx(ns,{htmlFor:"company",children:"Company"}),l.jsx(nu,{type:"text",id:"company",name:"company",value:r.company,onChange:h,placeholder:"Your Company"})]}),l.jsxs(ts,{children:[l.jsx(ns,{htmlFor:"message",children:"Message *"}),l.jsx(Ew,{id:"message",name:"message",value:r.message,onChange:h,placeholder:"Tell us about your project or question...",required:!0})]}),l.jsx(Rw,{type:"submit",disabled:s,children:s?"Sending...":"Send Message"}),d&&l.jsx(_w,{$success:d.type==="success",children:d.text})]}),l.jsxs(Pw,{children:[l.jsxs(Tw,{children:[l.jsx("h3",{children:"Let's Start a Conversation"}),l.jsx("p",{children:"Whether you're looking to implement AI solutions, need help with data analysis, or want to explore how data can transform your business, we're here to help."}),l.jsx("p",{children:"Our team of experts is ready to understand your unique challenges and develop tailored solutions that deliver real results."})]}),l.jsxs(zw,{children:[l.jsxs(ru,{children:[l.jsx(iu,{children:"📧"}),l.jsxs(ou,{children:[l.jsx("h4",{children:"Email"}),l.jsx("p",{children:l.jsx("a",{href:"mailto:info@gitthub.org",children:"info@gitthub.org"})})]})]}),l.jsxs(ru,{children:[l.jsx(iu,{children:"📍"}),l.jsxs(ou,{children:[l.jsx("h4",{children:"Location"}),l.jsx("p",{children:"Frankfurt am Main, Germany"})]})]}),l.jsxs(ru,{children:[l.jsx(iu,{children:"💬"}),l.jsxs(ou,{children:[l.jsx("h4",{children:"Response Time"}),l.jsx("p",{children:"We typically respond within 24 hours"})]})]})]})]})]})}),l.jsxs(Nw,{children:[l.jsx(Lw,{children:l.jsx("h2",{children:"Frequently Asked Questions"})}),l.jsx(Ow,{children:y.map((x,k)=>l.jsxs(Aw,{children:[l.jsx("h3",{children:x.question}),l.jsx("p",{children:x.answer})]},k))})]})]})}const Fw=g.div`
  min-height: 100vh;
`,Dw=g.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-bottom: 3px solid var(--gitthub-black);
`,$w=g.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;
  color: var(--gitthub-black);
`,Mw=g.p`
  font-size: 1.5rem;
  color: var(--gitthub-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`,Bw=g.section`
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--gitthub-beige);
`,Uw=g.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`,rs=g.div`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`,is=g.div`
  font-size: 3rem;
  font-weight: 900;
  color: var(--gitthub-black);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
`,os=g.div`
  color: var(--gitthub-gray);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`,Hw=g.section`
  background: var(--gitthub-light-beige);
  border-top: 3px solid var(--gitthub-black);
`,Ww=g.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-lg);
`,Vw=g.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  border-bottom: 3px solid var(--gitthub-black);
  padding-bottom: var(--spacing-md);
`,su=g.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${r=>r.$active?"var(--gitthub-black)":"var(--gitthub-white)"};
  color: ${r=>r.$active?"var(--gitthub-white)":"var(--gitthub-black)"};
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`,qw=g.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`,Gw=g.input`
  flex: 1;
  min-width: 300px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  background: var(--gitthub-white);
  font-size: 1.1rem;
  font-weight: 600;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }

  &::placeholder {
    color: var(--gitthub-light-gray);
  }
`,Ap=g.select`
  padding: var(--spacing-md) var(--spacing-lg);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  background: var(--gitthub-white);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`,Qw=g.button`
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--gitthub-white);
    color: var(--gitthub-black);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`,Yw=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Kw=g.div`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--gitthub-black);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
`,Jw=g.h3`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
  color: var(--gitthub-black);
`,Xw=g.p`
  color: var(--gitthub-gray);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
`,Zw=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--gitthub-dark-beige);
`,eb=g.span`
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,tb=g.span`
  background: var(--gitthub-white);
  color: var(--gitthub-black);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid var(--gitthub-black);
`,nb=g.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`,rb=g.span`
  background: var(--gitthub-beige);
  color: var(--gitthub-black);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid var(--gitthub-dark-beige);
`,ib=g.section`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);
`,Ip=g.h2`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: var(--spacing-xl);
  letter-spacing: -0.02em;
  color: var(--gitthub-black);
`,ob=g.form`
  display: grid;
  gap: var(--spacing-lg);
`,Ei=g.div`
  display: grid;
  grid-template-columns: ${r=>r.$half?"1fr 1fr":"1fr"};
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Rr=g.div`
  display: grid;
  gap: var(--spacing-sm);
`,_r=g.label`
  color: var(--gitthub-black);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
`,Fp=g.input`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`,sb=g.textarea`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  min-height: 120px;
  resize: vertical;
  background: var(--gitthub-white);
  font-family: var(--font-primary);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`,Dp=g.select`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`,ab=g.input`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }

  &::file-selector-button {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--gitthub-black);
    color: var(--gitthub-white);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 700;
    margin-right: var(--spacing-md);
    cursor: pointer;
  }
`,lb=g.button`
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;

  &:hover {
    background: var(--gitthub-white);
    color: var(--gitthub-black);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,ub=g.div`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--gitthub-gray);
  font-size: 1.5rem;
  font-weight: 700;
`,ig=g.div`
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
  border: 3px solid var(--gitthub-black);
`,cb=g(ig)`
  background: #FEE;
  color: var(--gitthub-black);
`,db=g(ig)`
  background: #EFE;
  color: var(--gitthub-black);
`,fb=g.section`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
`,pb=g.p`
  color: var(--gitthub-gray);
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`,hb=g.div`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--gitthub-gray);
`,gb=g.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--gitthub-black);
`,mb=g.p`
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xl);
`;function vb(){const[r,o]=N.useState("browse"),[s,u]=N.useState([]),[d,f]=N.useState(null),[h,m]=N.useState(!0),[y,x]=N.useState(null),[k,S]=N.useState(null),[O,D]=N.useState(""),[T,j]=N.useState(""),[E,M]=N.useState(""),[B,H]=N.useState([]),[Y,q]=N.useState([]),[G,K]=N.useState({title:"",description:"",format:"",category:"",file:null,tags:"",workflowCategories:[]});N.useEffect(()=>{je(),ye(),Xe()},[]);const je=async()=>{try{const W=await ue.get("/api/databank/stats");f(W.data)}catch(W){console.error("Error fetching stats:",W)}},ye=async()=>{m(!0);try{const W={};T&&(W.format=T),E&&(W.category=E);const ge=await ue.get("/api/databank/resources",{params:W});u(ge.data.resources||[])}catch(W){x("Failed to load resources"),console.error("Error fetching resources:",W)}finally{m(!1)}},Xe=async()=>{try{const W=await ue.get("/api/databank/formats");H(W.data.formats||[]),q(W.data.categories||[])}catch(W){console.error("Error fetching formats:",W)}},it=async()=>{m(!0);try{const W=await ue.post("/api/databank/resources/search",{query:O,format:T||null,category:E||null,limit:20,offset:0});u(W.data.resources||[])}catch(W){x("Search failed"),console.error("Error searching:",W)}finally{m(!1)}},Ye=async W=>{var be,ke;W.preventDefault(),x(null),S(null);const ge=new FormData;ge.append("file",G.file),ge.append("title",G.title),ge.append("description",G.description),ge.append("format",G.format),ge.append("category",G.category),ge.append("tags",JSON.stringify(G.tags.split(",").map(V=>V.trim()).filter(V=>V))),ge.append("workflow_categories",JSON.stringify(G.workflowCategories));try{const V=await ue.post("/api/databank/resources/upload",ge,{headers:{"Content-Type":"multipart/form-data"}});S("Resource uploaded successfully!"),K({title:"",description:"",format:"",category:"",file:null,tags:"",workflowCategories:[]}),ye(),je(),o("browse")}catch(V){x(((ke=(be=V.response)==null?void 0:be.data)==null?void 0:ke.detail)||"Upload failed"),console.error("Error uploading:",V)}},Ue=async W=>{try{window.open(`/api/databank/resources/${W}/download`,"_blank")}catch(ge){x("Download failed"),console.error("Error downloading:",ge)}};return l.jsxs(Fw,{children:[l.jsxs(Dw,{children:[l.jsx($w,{children:"Data Bank"}),l.jsx(Mw,{children:"Access curated datasets and educational resources for AI workflow training. Upload, explore, and learn from real-world data."})]}),d&&l.jsx(Bw,{children:l.jsxs(Uw,{children:[l.jsxs(rs,{children:[l.jsx(is,{children:d.total_resources||0}),l.jsx(os,{children:"Total Resources"})]}),l.jsxs(rs,{children:[l.jsx(is,{children:d.total_experiences||0}),l.jsx(os,{children:"Learning Experiences"})]}),l.jsxs(rs,{children:[l.jsx(is,{children:Object.keys(d.resources_by_format||{}).length}),l.jsx(os,{children:"Data Formats"})]}),l.jsxs(rs,{children:[l.jsx(is,{children:Object.keys(d.resources_by_category||{}).length}),l.jsx(os,{children:"Categories"})]})]})}),l.jsx(Hw,{children:l.jsxs(Ww,{children:[l.jsxs(Vw,{children:[l.jsx(su,{$active:r==="browse",onClick:()=>o("browse"),children:"Browse Resources"}),l.jsx(su,{$active:r==="upload",onClick:()=>o("upload"),children:"Upload Data"}),l.jsx(su,{$active:r==="experiences",onClick:()=>o("experiences"),children:"Learning Experiences"})]}),y&&l.jsx(cb,{children:y}),k&&l.jsx(db,{children:k}),r==="browse"&&l.jsxs(l.Fragment,{children:[l.jsxs(qw,{children:[l.jsx(Gw,{placeholder:"Search resources...",value:O,onChange:W=>D(W.target.value),onKeyPress:W=>W.key==="Enter"&&it()}),l.jsxs(Ap,{value:T,onChange:W=>j(W.target.value),children:[l.jsx("option",{value:"",children:"All Formats"}),B.map(W=>l.jsx("option",{value:W,children:W.toUpperCase()},W))]}),l.jsxs(Ap,{value:E,onChange:W=>M(W.target.value),children:[l.jsx("option",{value:"",children:"All Categories"}),Y.map(W=>l.jsx("option",{value:W,children:W.replace(/_/g," ").replace(/\b\w/g,ge=>ge.toUpperCase())},W))]}),l.jsx(Qw,{onClick:it,children:"Search"})]}),h?l.jsx(ub,{children:"Loading resources..."}):s.length>0?l.jsx(Yw,{children:s.map(W=>l.jsxs(Kw,{onClick:()=>Ue(W.id),children:[l.jsx(Jw,{children:W.title}),l.jsx(Xw,{children:W.description}),l.jsxs(Zw,{children:[l.jsx(eb,{children:W.format}),l.jsx(tb,{children:W.category.replace(/_/g," ")})]}),W.tags&&W.tags.length>0&&l.jsx(nb,{children:W.tags.slice(0,3).map((ge,be)=>l.jsx(rb,{children:ge},be))})]},W.id))}):l.jsxs(hb,{children:[l.jsx(gb,{children:"No resources found"}),l.jsx(mb,{children:"Try adjusting your search filters or upload new resources to get started."})]})]}),r==="upload"&&l.jsxs(ib,{children:[l.jsx(Ip,{children:"Upload New Resource"}),l.jsxs(ob,{onSubmit:Ye,children:[l.jsx(Ei,{children:l.jsxs(Rr,{children:[l.jsx(_r,{children:"Title *"}),l.jsx(Fp,{type:"text",value:G.title,onChange:W=>K({...G,title:W.target.value}),required:!0,placeholder:"Enter resource title"})]})}),l.jsx(Ei,{children:l.jsxs(Rr,{children:[l.jsx(_r,{children:"Description *"}),l.jsx(sb,{value:G.description,onChange:W=>K({...G,description:W.target.value}),required:!0,placeholder:"Describe your resource..."})]})}),l.jsx(Ei,{children:l.jsxs(Rr,{children:[l.jsx(_r,{children:"File *"}),l.jsx(ab,{type:"file",onChange:W=>K({...G,file:W.target.files[0]}),required:!0})]})}),l.jsxs(Ei,{$half:!0,children:[l.jsxs(Rr,{children:[l.jsx(_r,{children:"Format *"}),l.jsxs(Dp,{value:G.format,onChange:W=>K({...G,format:W.target.value}),required:!0,children:[l.jsx("option",{value:"",children:"Select Format"}),B.map(W=>l.jsx("option",{value:W,children:W.toUpperCase()},W))]})]}),l.jsxs(Rr,{children:[l.jsx(_r,{children:"Category *"}),l.jsxs(Dp,{value:G.category,onChange:W=>K({...G,category:W.target.value}),required:!0,children:[l.jsx("option",{value:"",children:"Select Category"}),Y.map(W=>l.jsx("option",{value:W,children:W.replace(/_/g," ").replace(/\b\w/g,ge=>ge.toUpperCase())},W))]})]})]}),l.jsx(Ei,{children:l.jsxs(Rr,{children:[l.jsx(_r,{children:"Tags (comma-separated)"}),l.jsx(Fp,{type:"text",value:G.tags,onChange:W=>K({...G,tags:W.target.value}),placeholder:"e.g., machine-learning, dataset, tutorial"})]})}),l.jsx(lb,{type:"submit",children:"Upload Resource"})]})]}),r==="experiences"&&l.jsxs(fb,{children:[l.jsx(Ip,{children:"Learning Experiences"}),l.jsx(pb,{children:"Interactive learning experiences are coming soon! These will include guided tutorials, hands-on exercises, and real-world case studies to help you master AI workflows."})]})]})})]})}const yb=async()=>{try{const r=await ue.get("/api/auth/me",{withCredentials:!0});r.data&&(Au(r.data),Iu(!0))}catch{Iu(!1),Au(null)}},xb=async()=>{try{await ue.post("/api/auth/logout",{},{withCredentials:!0}),Au(null),Iu(!1),navigate("/auth")}catch(r){console.error("Logout error:",r)}},[Un,Au]=N.useState(null),[$p,Iu]=N.useState(!1),au=g.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`,lu=g.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
`,Hn=g.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .label {
    font-size: 0.85rem;
    opacity: 0.9;
  }
  
  .value {
    font-size: 1.2rem;
    font-weight: bold;
  }
`,wb=g.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  input {
    background: transparent;
    border: none;
    color: white;
    flex: 1;
    font-family: monospace;
    
    &::selection {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  button {
    background: white;
    color: #667eea;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    
    &:hover {
      opacity: 0.9;
    }
  }
`,bb=g.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`,kb=g.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`,Sb=g.h1`
  font-size: 3rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
  text-align: center;
`,jb=g.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  text-align: center;
  margin-bottom: 3rem;
`,Cb=g.div`
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`,Eb=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${r=>r.expanded?"1rem":"0"};
`,Rb=g.h3`
  font-size: 1.2rem;
  color: var(--gitthub-black);
  margin: 0;
`,_b=g.button`
  background: var(--gitthub-black);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-gray);
  }
`,Pb=g.div`
  display: ${r=>r.show?"block":"none"};
  margin-top: 1rem;
`,uu=g.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`,cu=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`,du=g.h4`
  margin: 0;
  font-size: 1rem;
  color: var(--gitthub-black);
`,fu=g.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${r=>r.active?"#4caf50":"#f44336"};
  color: white;
`,pu=g.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gitthub-gray);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,hu=g.p`
  font-size: 0.85rem;
  color: var(--gitthub-gray);
  margin: 0.5rem 0 0 0;
`,Tb=g.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`,zb=g.form`
  background: var(--gitthub-light-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`,Mp=g.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--gitthub-black);
  border-bottom: 2px solid var(--gitthub-beige);
  padding-bottom: 0.5rem;
`,Nb=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,jn=g.div`
  display: flex;
  flex-direction: column;
`,Ft=g.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`,bs=g.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,gu=g.select`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,Lb=g.div`
  position: relative;
`,Ob=g.p`
  font-size: 0.85rem;
  color: var(--gitthub-gray);
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
`,Bp=g.textarea`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,mu=g.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`,vu=g.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`,Ab=g.div`
  margin-bottom: 2rem;
`,Ib=g.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`,Fb=g(bs)`
  flex: 1;
`,Db=g.div`
  max-height: 300px;
  overflow-y: auto;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  background: white;
`,$b=g.div`
  padding: 1rem;
  border-bottom: 1px solid var(--gitthub-light-beige);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-light-beige);
  }

  &:last-child {
    border-bottom: none;
  }
`,Mb=g.div`
  flex: 1;
`,Bb=g.h4`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--gitthub-black);
`,Ub=g.p`
  font-size: 0.85rem;
  color: var(--gitthub-gray);
`,Hb=g.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`,ss=g.span`
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
  color: var(--gitthub-gray);
`,Wb=g.button`
  padding: 0.5rem 1rem;
  background: ${r=>r.selected?"#4caf50":"var(--gitthub-black)"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s;

  &:hover {
    background: ${r=>r.selected?"#45a049":"var(--gitthub-gray)"};
  }
`,Vb=g.div`
  margin-top: 1rem;
  padding: 1rem;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
`,qb=g.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`,Gb=g.button`
  background: var(--gitthub-black);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: block;
  margin: 2rem auto 0;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Qb=g.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,Yb=g.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background: ${r=>r.type==="success"?"#d4edda":"#f8d7da"};
  color: ${r=>r.type==="success"?"#155724":"#721c24"};
  border: 1px solid ${r=>r.type==="success"?"#c3e6cb":"#f5c6cb"};
`,Kb=g.div`
  background: white;
  border: 3px solid var(--gitthub-black);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
`,Jb=g.div`
  border-bottom: 3px solid var(--gitthub-beige);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`,Xb=g.h2`
  font-size: 2rem;
  color: var(--gitthub-black);
  margin-bottom: 0.5rem;
`,Zb=g.p`
  color: var(--gitthub-gray);
  line-height: 1.6;
`,ek=g.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,tk=g.div`
  background: var(--gitthub-light-beige);
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  padding: 1.5rem;
`,nk=g.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`,rk=g.p`
  color: var(--gitthub-gray);
  font-size: 0.95rem;
`,ik=g.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`,as=g.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--gitthub-black);
  background: ${r=>r.primary?"var(--gitthub-black)":"white"};
  color: ${r=>r.primary?"white":"var(--gitthub-black)"};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;function ok(){const r=Ts(),[o,s]=N.useState({topic:"",level:"beginner",duration:"4 weeks",learningObjectives:"",targetAudience:"",prerequisites:"",useDatabank:!0,includeAssessments:!0,includeProjects:!0,language:"english",aiModel:"template"}),[u,d]=N.useState(!1),[f,h]=N.useState({openai:"",anthropic:"",google:""}),[m,y]=N.useState({openai:!1,anthropic:!1,google:!1}),[x,k]=N.useState(null),[S,O]=N.useState([]),[D,T]=N.useState(!1),[j,E]=N.useState([]),[M,B]=N.useState(null),[H,Y]=N.useState([]),[q,G]=N.useState([]),[K,je]=N.useState(""),[ye,Xe]=N.useState(null),[it,Ye]=N.useState(!1),[Ue,W]=N.useState(!1),[ge,be]=N.useState(null);N.useEffect(()=>{yb(),ke(),ee(),Q(),o.useDatabank&&C()},[]),N.useEffect(()=>{o.useDatabank&&C(K)},[K,o.useDatabank]),N.useEffect(()=>{const A=j.find(oe=>oe.id===o.aiModel);B(A)},[o.aiModel,j]);const ke=async()=>{try{const A=await ue.get("/api/session/info",{withCredentials:!0});k(A.data)}catch(A){console.error("Error fetching session info:",A)}},V=async()=>{try{const A=await ue.get("/api/session/courses",{withCredentials:!0});O(A.data.courses)}catch(A){console.error("Error fetching user courses:",A)}},ee=async()=>{try{const A=await ue.get("/api/courses/ai-models",{withCredentials:!0});E(A.data.models),y(A.data.credentials_status),A.data.recommended&&s(oe=>({...oe,aiModel:A.data.recommended}))}catch(A){console.error("Error fetching AI models:",A)}},Q=async()=>{try{const A=await ue.get("/api/courses/api-credentials/status",{withCredentials:!0});y(A.data)}catch(A){console.error("Error fetching credentials status:",A)}},C=async(A="")=>{try{W(!0);const oe=await ue.get("/api/databank/resources",{params:{limit:50,search:A||void 0}});Y(oe.data.resources||[])}catch(oe){console.error("Error fetching resources:",oe),Y([])}finally{W(!1)}},L=A=>{const{name:oe,value:Ae,type:Ee,checked:Ie}=A.target;s(at=>({...at,[oe]:Ee==="checkbox"?Ie:Ae}))},ae=(A,oe)=>{h(Ae=>({...Ae,[A]:oe}))},le=async()=>{try{const A=await ue.post("/api/courses/api-credentials",f,{withCredentials:!0});A.data.success&&(y(A.data.status),be({type:"success",message:"API credentials saved successfully for your session!"}),await ee(),setTimeout(()=>be(null),3e3))}catch(A){console.error("Error saving credentials:",A),be({type:"error",message:"Failed to save API credentials"}),setTimeout(()=>be(null),3e3)}},pe=A=>{G(oe=>oe.some(Ee=>Ee.id===A.id)?oe.filter(Ee=>Ee.id!==A.id):[...oe,A])},de=async A=>{var oe,Ae;A.preventDefault(),Ye(!0),Xe(null);try{const Ee={topic:o.topic,level:o.level,duration:o.duration,learning_objectives:o.learningObjectives.split(`
`).filter(at=>at.trim()),target_audience:o.targetAudience,prerequisites:o.prerequisites.split(`
`).filter(at=>at.trim()),use_databank_resources:o.useDatabank,selected_resources:q.length>0?q:null,include_assessments:o.includeAssessments,include_projects:o.includeProjects,language:o.language,ai_model:o.aiModel};console.log("Sending course generation request:",Ee);const Ie=await ue.post("/api/courses/generate",Ee,{withCredentials:!0});if(console.log("Course generation response:",Ie.data),Ie.data.success&&Ie.data.course)Xe(Ie.data.course),Ie.data.rate_limit_remaining!==void 0&&k(at=>({...at,rate_limit_remaining:Ie.data.rate_limit_remaining,courses_generated:((at==null?void 0:at.courses_generated)||0)+1})),Ie.data.share_url&&be({type:"success",message:`Course generated! Share it: ${Ie.data.share_url}`});else throw new Error("Invalid response format")}catch(Ee){console.error("Error generating course:",Ee);const Ie=((Ae=(oe=Ee.response)==null?void 0:oe.data)==null?void 0:Ae.detail)||Ee.message||"Failed to generate course";ge(`Error: ${Ie}

Please check the console for more details.`)}finally{Ye(!1)}},ve=async A=>{if(ye)try{const oe=await ue.post(`/api/courses/${ye.course_id}/export`,{format:A,include_solutions:!1}),Ae=new Blob([oe.data.data.content],{type:"text/plain"}),Ee=window.URL.createObjectURL(Ae),Ie=document.createElement("a");Ie.href=Ee,Ie.download=oe.data.data.filename,Ie.click(),window.URL.revokeObjectURL(Ee)}catch(oe){console.error("Error exporting course:",oe),ge("Failed to export course. Please try again.")}},me=()=>{ye&&r(`/course/${ye.course_id}`)};return l.jsx(bb,{children:l.jsxs(kb,{children:[l.jsx(Sb,{children:"AI Course Generator"}),l.jsx(jb,{children:"Create comprehensive courses using AI models and Data Bank resources"}),$p&&Un?l.jsxs(au,{style:{background:"linear-gradient(135deg, #4caf50 0%, #45a049 100%)"},children:[l.jsxs("div",{children:[l.jsxs("h3",{style:{margin:0,marginBottom:"0.5rem"},children:["Welcome, ",Un.full_name,"!"]}),l.jsxs("div",{style:{fontSize:"0.9rem",opacity:.9},children:[Un.email," • ",Un.subscription_tier," Plan"]})]}),l.jsxs(lu,{children:[l.jsxs(Hn,{children:[l.jsx("span",{className:"label",children:"Courses Created"}),l.jsx("span",{className:"value",children:Un.courses_created})]}),l.jsxs(Hn,{children:[l.jsx("span",{className:"label",children:"Monthly Limit"}),l.jsxs("span",{className:"value",children:[Un.courses_created,"/",Un.monthly_limit]})]}),l.jsx(Hn,{children:l.jsx("button",{style:{background:"white",color:"#4caf50",border:"none",padding:"0.5rem 1rem",borderRadius:"4px",cursor:"pointer",fontWeight:"600"},onClick:xb,children:"Logout"})})]})]}):l.jsxs(au,{style:{background:"linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"},children:[l.jsxs("div",{children:[l.jsx("h3",{style:{margin:0,marginBottom:"0.5rem"},children:"Guest Mode"}),l.jsx("div",{style:{fontSize:"0.9rem",opacity:.9},children:"Limited to 5 courses per day • No course history"})]}),l.jsx(lu,{children:l.jsx(Hn,{children:l.jsx("button",{style:{background:"white",color:"#ff9800",border:"none",padding:"0.5rem 1.5rem",borderRadius:"4px",cursor:"pointer",fontWeight:"600"},onClick:()=>r("/auth"),children:"Login / Register"})})})]}),!$p&&x&&l.jsxs(au,{children:[l.jsxs("div",{children:[l.jsx("h3",{style:{margin:0,marginBottom:"0.5rem"},children:"Your Session"}),l.jsxs("div",{style:{fontSize:"0.9rem",opacity:.9},children:["Guest User ID: ",x.user_id]})]}),l.jsxs(lu,{children:[l.jsxs(Hn,{children:[l.jsx("span",{className:"label",children:"Courses Created"}),l.jsx("span",{className:"value",children:x.courses_generated})]}),l.jsxs(Hn,{children:[l.jsx("span",{className:"label",children:"Daily Limit"}),l.jsxs("span",{className:"value",children:[x.rate_limit_remaining,"/50"]})]}),l.jsx(Hn,{children:l.jsxs("button",{style:{background:"white",color:"#667eea",border:"none",padding:"0.5rem 1rem",borderRadius:"4px",cursor:"pointer",fontWeight:"600"},onClick:()=>{V(),T(!D)},children:[D?"Hide":"View"," My Courses"]})})]})]}),D&&S.length>0&&l.jsxs("div",{style:{background:"white",border:"2px solid var(--gitthub-gray)",borderRadius:"8px",padding:"1.5rem",marginBottom:"2rem"},children:[l.jsx("h3",{children:"Your Generated Courses"}),l.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:S.map((A,oe)=>l.jsxs("div",{style:{padding:"1rem",background:"var(--gitthub-light-beige)",borderRadius:"4px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[l.jsxs("div",{children:[l.jsx("strong",{children:A.course_data.title}),l.jsxs("div",{style:{fontSize:"0.85rem",color:"var(--gitthub-gray)",marginTop:"0.25rem"},children:["Created: ",new Date(A.created_at).toLocaleDateString()]})]}),l.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[l.jsx("button",{onClick:()=>r(`/course/${A.id}`),style:{padding:"0.5rem 1rem",background:"var(--gitthub-black)",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"View"}),l.jsx("button",{onClick:()=>{const Ae=`https://gitthub.org/course/share/${A.share_token}`;navigator.clipboard.writeText(Ae),be({type:"success",message:"Share link copied!"}),setTimeout(()=>be(null),2e3)},style:{padding:"0.5rem 1rem",background:"white",color:"var(--gitthub-black)",border:"2px solid var(--gitthub-black)",borderRadius:"4px",cursor:"pointer"},children:"Share"})]})]},oe))})]}),l.jsxs(Cb,{children:[l.jsxs(Eb,{expanded:u,children:[l.jsx(Rb,{children:"🔑 API Credentials Configuration"}),l.jsx(_b,{onClick:()=>d(!u),children:u?"Hide":"Configure API Keys"})]}),l.jsxs(Pb,{show:u,children:[ge&&l.jsx(Yb,{type:ge.type,children:ge.message}),l.jsxs(uu,{children:[l.jsxs(cu,{children:[l.jsx(du,{children:"OpenAI (GPT-4, GPT-3.5)"}),l.jsx(fu,{active:m.openai,children:m.openai?"Configured":"Not Configured"})]}),l.jsx(pu,{type:"password",placeholder:"sk-...",value:f.openai,onChange:A=>ae("openai",A.target.value)}),l.jsxs(hu,{children:["Get your API key from ",l.jsx("a",{href:"https://platform.openai.com/api-keys",target:"_blank",rel:"noopener noreferrer",children:"OpenAI Platform"})]})]}),l.jsxs(uu,{children:[l.jsxs(cu,{children:[l.jsx(du,{children:"Anthropic (Claude)"}),l.jsx(fu,{active:m.anthropic,children:m.anthropic?"Configured":"Not Configured"})]}),l.jsx(pu,{type:"password",placeholder:"sk-ant-...",value:f.anthropic,onChange:A=>ae("anthropic",A.target.value)}),l.jsxs(hu,{children:["Get your API key from ",l.jsx("a",{href:"https://console.anthropic.com",target:"_blank",rel:"noopener noreferrer",children:"Anthropic Console"})]})]}),l.jsxs(uu,{children:[l.jsxs(cu,{children:[l.jsx(du,{children:"Google (Gemini)"}),l.jsx(fu,{active:m.google,children:m.google?"Configured":"Not Configured"})]}),l.jsx(pu,{type:"password",placeholder:"AIza...",value:f.google,onChange:A=>ae("google",A.target.value)}),l.jsxs(hu,{children:["Get your API key from ",l.jsx("a",{href:"https://makersuite.google.com/app/apikey",target:"_blank",rel:"noopener noreferrer",children:"Google AI Studio"})]})]}),l.jsx(Tb,{type:"button",onClick:le,disabled:!f.openai&&!f.anthropic&&!f.google,children:"Save API Credentials"})]})]}),l.jsxs(zb,{onSubmit:de,children:[l.jsx(Mp,{children:"Course Configuration"}),l.jsxs(Nb,{children:[l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"topic",children:"Course Topic *"}),l.jsx(bs,{id:"topic",name:"topic",type:"text",value:o.topic,onChange:L,placeholder:"e.g., Machine Learning Fundamentals",required:!0})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"aiModel",children:"AI Model"}),l.jsxs(Lb,{children:[l.jsxs(gu,{id:"aiModel",name:"aiModel",value:o.aiModel,onChange:L,children:[l.jsx("optgroup",{label:"No AI Required",children:l.jsx("option",{value:"template",children:"Template-Based (Fast & Free)"})}),l.jsxs("optgroup",{label:"OpenAI",children:[l.jsxs("option",{value:"gpt-4",disabled:!m.openai,children:["GPT-4 ",!m.openai&&"(API Key Required)"]}),l.jsxs("option",{value:"gpt-3.5-turbo",disabled:!m.openai,children:["GPT-3.5 Turbo ",!m.openai&&"(API Key Required)"]})]}),l.jsxs("optgroup",{label:"Anthropic",children:[l.jsxs("option",{value:"claude-3",disabled:!m.anthropic,children:["Claude 3 Opus ",!m.anthropic&&"(API Key Required)"]}),l.jsxs("option",{value:"claude-instant",disabled:!m.anthropic,children:["Claude Instant ",!m.anthropic&&"(API Key Required)"]})]}),l.jsx("optgroup",{label:"Google",children:l.jsxs("option",{value:"gemini-pro",disabled:!m.google,children:["Gemini Pro ",!m.google&&"(API Key Required)"]})})]}),M&&l.jsxs(Ob,{children:[l.jsxs("strong",{children:[M.provider,":"]})," ",M.description]})]})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"level",children:"Difficulty Level"}),l.jsxs(gu,{id:"level",name:"level",value:o.level,onChange:L,children:[l.jsx("option",{value:"beginner",children:"Beginner"}),l.jsx("option",{value:"intermediate",children:"Intermediate"}),l.jsx("option",{value:"advanced",children:"Advanced"})]})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"duration",children:"Course Duration"}),l.jsx(bs,{id:"duration",name:"duration",type:"text",value:o.duration,onChange:L,placeholder:"e.g., 4 weeks, 10 hours"})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"language",children:"Language"}),l.jsxs(gu,{id:"language",name:"language",value:o.language,onChange:L,children:[l.jsx("option",{value:"english",children:"English"}),l.jsx("option",{value:"spanish",children:"Spanish"}),l.jsx("option",{value:"french",children:"French"}),l.jsx("option",{value:"german",children:"German"}),l.jsx("option",{value:"chinese",children:"Chinese"}),l.jsx("option",{value:"japanese",children:"Japanese"})]})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"targetAudience",children:"Target Audience"}),l.jsx(bs,{id:"targetAudience",name:"targetAudience",type:"text",value:o.targetAudience,onChange:L,placeholder:"e.g., Data scientists, Software engineers, Students"})]})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"learningObjectives",children:"Learning Objectives (one per line)"}),l.jsx(Bp,{id:"learningObjectives",name:"learningObjectives",value:o.learningObjectives,onChange:L,placeholder:`Understand fundamental ML concepts
Build and train models
Evaluate model performance`})]}),l.jsxs(jn,{children:[l.jsx(Ft,{htmlFor:"prerequisites",children:"Prerequisites (one per line)"}),l.jsx(Bp,{id:"prerequisites",name:"prerequisites",value:o.prerequisites,onChange:L,placeholder:`Basic Python programming
Understanding of statistics
Linear algebra fundamentals`})]}),l.jsxs(mu,{children:[l.jsx(vu,{type:"checkbox",id:"useDatabank",name:"useDatabank",checked:o.useDatabank,onChange:L}),l.jsx(Ft,{htmlFor:"useDatabank",style:{marginBottom:0},children:"Include resources from gitthub Data Bank"})]}),o.useDatabank&&l.jsxs(Ab,{children:[l.jsx(Mp,{children:"Select Data Bank Resources (Optional)"}),l.jsx(Ib,{children:l.jsx(Fb,{type:"text",placeholder:"Search resources...",value:K,onChange:A=>je(A.target.value)})}),Ue?l.jsx("p",{children:"Loading resources..."}):l.jsxs(l.Fragment,{children:[l.jsx(Db,{children:H.map(A=>l.jsxs($b,{children:[l.jsxs(Mb,{children:[l.jsx(Bb,{children:A.title}),l.jsx(Ub,{children:A.description}),l.jsxs(Hb,{children:[l.jsx(ss,{children:A.format}),l.jsx(ss,{children:A.category}),A.file_size&&l.jsx(ss,{children:A.file_size})]})]}),l.jsx(Wb,{type:"button",selected:q.some(oe=>oe.id===A.id),onClick:()=>pe(A),children:q.some(oe=>oe.id===A.id)?"Selected":"Select"})]},A.id))}),q.length>0&&l.jsxs(Vb,{children:[l.jsxs(qb,{children:[q.length," resource(s) selected"]}),l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.5rem"},children:q.map(A=>l.jsx(ss,{style:{background:"#4caf50",color:"white"},children:A.title},A.id))})]})]})]}),l.jsxs(mu,{children:[l.jsx(vu,{type:"checkbox",id:"includeAssessments",name:"includeAssessments",checked:o.includeAssessments,onChange:L}),l.jsx(Ft,{htmlFor:"includeAssessments",style:{marginBottom:0},children:"Generate quizzes and assessments"})]}),l.jsxs(mu,{children:[l.jsx(vu,{type:"checkbox",id:"includeProjects",name:"includeProjects",checked:o.includeProjects,onChange:L}),l.jsx(Ft,{htmlFor:"includeProjects",style:{marginBottom:0},children:"Include hands-on projects"})]}),l.jsx(Gb,{type:"submit",disabled:it||!o.topic,children:it?l.jsxs(l.Fragment,{children:[l.jsx(Qb,{}),"Generating with ",(M==null?void 0:M.name)||"Template","..."]}):"Generate Course"})]}),ye&&l.jsxs(Kb,{children:[l.jsxs(Jb,{children:[l.jsx(Xb,{children:ye.title}),l.jsx(Zb,{children:ye.description}),l.jsxs("div",{style:{marginTop:"1rem",display:"flex",gap:"2rem",flexWrap:"wrap"},children:[l.jsxs("span",{children:[l.jsx("strong",{children:"Level:"})," ",ye.level]}),l.jsxs("span",{children:[l.jsx("strong",{children:"Duration:"})," ",ye.duration]}),l.jsxs("span",{children:[l.jsx("strong",{children:"Modules:"})," ",ye.modules.length]}),l.jsxs("span",{children:[l.jsx("strong",{children:"AI Model:"})," ",(M==null?void 0:M.name)||"Template"]})]}),ye.share_url&&l.jsxs(wb,{children:[l.jsx("input",{type:"text",value:ye.share_url,readOnly:!0,onClick:A=>A.target.select()}),l.jsx("button",{onClick:()=>{navigator.clipboard.writeText(ye.share_url),be({type:"success",message:"Share link copied to clipboard!"}),setTimeout(()=>be(null),2e3)},children:"Copy Link"})]})]}),l.jsx("h3",{style:{marginBottom:"1rem"},children:"Course Modules"}),l.jsx(ek,{children:ye.modules.map((A,oe)=>l.jsxs(tk,{children:[l.jsxs(nk,{children:["Module ",oe+1,": ",A.title]}),l.jsx(rk,{children:A.description}),l.jsxs("div",{style:{marginTop:"0.5rem",fontSize:"0.9rem",color:"var(--gitthub-gray)"},children:[A.content_sections.length," sections •",A.activities.length," activities •",A.assessment?"1 assessment":"No assessment"]})]},A.module_id))}),l.jsxs(ik,{children:[l.jsx(as,{primary:!0,onClick:me,children:"View Full Course"}),l.jsx(as,{onClick:()=>ve("html"),children:"Export as HTML"}),l.jsx(as,{onClick:()=>ve("markdown"),children:"Export as Markdown"}),l.jsx(as,{onClick:()=>ve("json"),children:"Export as JSON"})]})]})]})})}const ls=g.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`,sk=g.div`
  background: var(--gitthub-light-beige);
  border-bottom: 3px solid var(--gitthub-black);
  padding: 3rem 2rem;
`,ak=g.div`
  max-width: 1200px;
  margin: 0 auto;
`,lk=g.h1`
  font-size: 2.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`,uk=g.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  line-height: 1.6;
`,ck=g.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`,us=g.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
`,dk=g.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,fk=g.div`
  flex: 0 0 300px;
  background: var(--gitthub-light-beige);
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    position: static;
    flex: 1;
  }
`,pk=g.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,hk=g.button`
  padding: 1rem;
  border: 2px solid ${r=>r.active?"var(--gitthub-black)":"transparent"};
  background: ${r=>r.active?"white":"transparent"};
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: ${r=>r.active?"600":"400"};

  &:hover {
    background: white;
    border-color: var(--gitthub-gray);
  }
`,gk=g.div`
  flex: 1;
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  padding: 2rem;
`,cs=g.div`
  margin-bottom: 2rem;
`,ds=g.h3`
  font-size: 1.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--gitthub-beige);
`,mk=g.div`
  line-height: 1.6;
  color: var(--gitthub-gray);
`,vk=g.pre`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  margin: 1rem 0;
`,yk=g.div`
  background: var(--gitthub-light-beige);
  border-left: 4px solid var(--gitthub-black);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 4px 4px 0;
`,xk=g.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`,wk=g.div`
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1rem 0;
`,bk=g.div`
  margin-bottom: 1.5rem;
`,kk=g.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`,Sk=g.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`,jk=g.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-beige);
  }
`,Ck=g.div`
  height: 8px;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
`,Ek=g.div`
  height: 100%;
  background: var(--gitthub-black);
  border-radius: 4px;
  width: ${r=>r.progress}%;
  transition: width 0.5s ease;
`,Rk=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`,_k=g.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--gitthub-light-beige);
  border-top-color: var(--gitthub-black);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,Up=g.div`
  background: #fee;
  border: 2px solid #f44;
  color: #c00;
  padding: 1rem;
  border-radius: 4px;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`;function Pk(){const{courseId:r}=Bv(),[o,s]=N.useState(null),[u,d]=N.useState(0),[f,h]=N.useState(!0),[m,y]=N.useState(null),[x,k]=N.useState(0);N.useEffect(()=>{S()},[r]);const S=async()=>{try{h(!0);const j=await ue.get(`/api/courses/${r}`);s(j.data),y(null)}catch(j){console.error("Error fetching course:",j),y("Failed to load course. Please try again.")}finally{h(!1)}},O=()=>{if(!o)return 0;const j=o.modules.length,E=u+1;return Math.round(E/j*100)},D=(j,E)=>E==="code"?l.jsx(vk,{children:j}):E==="interactive"?l.jsx("div",{style:{padding:"1rem",background:"#f9f9f9",borderRadius:"4px"},children:j}):l.jsx("p",{children:j});if(f)return l.jsx(ls,{children:l.jsx(Rk,{children:l.jsx(_k,{})})});if(m)return l.jsx(ls,{children:l.jsx(Up,{children:m})});if(!o)return l.jsx(ls,{children:l.jsx(Up,{children:"Course not found"})});const T=o.modules[u];return l.jsxs(ls,{children:[l.jsx(sk,{children:l.jsxs(ak,{children:[l.jsx(lk,{children:o.title}),l.jsx(uk,{children:o.description}),l.jsxs(ck,{children:[l.jsxs(us,{children:[l.jsx("span",{children:"📚"}),l.jsx("strong",{children:"Level:"})," ",o.level]}),l.jsxs(us,{children:[l.jsx("span",{children:"⏱️"}),l.jsx("strong",{children:"Duration:"})," ",o.duration]}),l.jsxs(us,{children:[l.jsx("span",{children:"📖"}),l.jsx("strong",{children:"Modules:"})," ",o.modules.length]}),l.jsxs(us,{children:[l.jsx("span",{children:"🌐"}),l.jsx("strong",{children:"Language:"})," ",o.language||"English"]})]})]})}),l.jsxs(dk,{children:[l.jsxs(fk,{children:[l.jsx("h3",{style:{marginBottom:"1rem"},children:"Course Modules"}),l.jsx(Ck,{children:l.jsx(Ek,{progress:O()})}),l.jsx(pk,{children:o.modules.map((j,E)=>l.jsxs(hk,{active:u===E,onClick:()=>d(E),children:[l.jsxs("div",{style:{fontWeight:"600",marginBottom:"0.25rem"},children:["Module ",E+1]}),l.jsx("div",{style:{fontSize:"0.9rem"},children:j.title})]},j.module_id))})]}),l.jsxs(gk,{children:[l.jsxs("h2",{style:{marginBottom:"1rem"},children:["Module ",u+1,": ",T.title]}),l.jsx("p",{style:{marginBottom:"2rem",color:"var(--gitthub-gray)"},children:T.description}),T.objectives&&T.objectives.length>0&&l.jsxs(cs,{children:[l.jsx(ds,{children:"Learning Objectives"}),l.jsx("ul",{style:{marginLeft:"1.5rem"},children:T.objectives.map((j,E)=>l.jsx("li",{style:{marginBottom:"0.5rem"},children:j},E))})]}),T.content_sections&&T.content_sections.map((j,E)=>l.jsxs(cs,{children:[l.jsx(ds,{children:j.title}),l.jsxs(mk,{children:[D(j.content,j.content_type),j.duration_minutes&&l.jsxs("p",{style:{fontSize:"0.9rem",color:"var(--gitthub-gray)",marginTop:"0.5rem"},children:["⏱️ Estimated time: ",j.duration_minutes," minutes"]})]})]},E)),T.activities&&T.activities.length>0&&l.jsxs(cs,{children:[l.jsx(ds,{children:"Activities"}),T.activities.map((j,E)=>l.jsxs(yk,{children:[l.jsx(xk,{children:j.title}),l.jsx("p",{style:{marginBottom:"0.5rem"},children:j.description}),l.jsx("strong",{children:"Instructions:"}),l.jsx("ol",{style:{marginLeft:"1.5rem",marginTop:"0.5rem"},children:j.instructions.map((M,B)=>l.jsx("li",{children:M},B))}),j.hints&&j.hints.length>0&&l.jsxs("details",{style:{marginTop:"1rem"},children:[l.jsx("summary",{style:{cursor:"pointer",fontWeight:"600"},children:"💡 Hints"}),l.jsx("ul",{style:{marginLeft:"1.5rem",marginTop:"0.5rem"},children:j.hints.map((M,B)=>l.jsx("li",{children:M},B))})]})]},E))]}),T.assessment&&l.jsxs(cs,{children:[l.jsx(ds,{children:T.assessment.title}),l.jsx(wk,{children:T.assessment.questions.map((j,E)=>l.jsxs(bk,{children:[l.jsxs(kk,{children:[E+1,". ",j.question]}),l.jsx(Sk,{children:j.options&&j.options.map((M,B)=>l.jsxs(jk,{children:[l.jsx("input",{type:"radio",name:`question-${E}`}),l.jsxs("span",{children:[String.fromCharCode(65+B),". ",M]})]},B))})]},E))})]})]})]})]})}const Tk=g.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`,zk=g.div`
  background: var(--gitthub-light-beige);
  border-bottom: 3px solid var(--gitthub-black);
  padding: 3rem 2rem;
`,Nk=g.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`,Lk=g.h1`
  font-size: 3rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`,Ok=g.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  line-height: 1.6;
`,Ak=g.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`,Ik=g.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`,Hp=g.select`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  background: white;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,Fk=g.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 300px;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`,Wp=g(nn)`
  padding: 0.75rem 1.5rem;
  background: var(--gitthub-black);
  color: white;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`,Dk=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`,$k=g.div`
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`,Mk=g.div`
  background: var(--gitthub-beige);
  padding: 1.5rem;
  border-bottom: 2px solid var(--gitthub-gray);
`,Bk=g.h3`
  font-size: 1.3rem;
  color: var(--gitthub-black);
  margin-bottom: 0.5rem;
`,Uk=g.p`
  color: var(--gitthub-gray);
  font-size: 0.95rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,Hk=g.div`
  padding: 1.5rem;
`,Wk=g.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`,Vp=g.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--gitthub-gray);
`,Vk=g.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${r=>{switch(r.status){case"published":return"#4caf50";case"draft":return"#ff9800";default:return"var(--gitthub-gray)"}}};
  color: white;
`,qk=g.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--gitthub-black);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-gray);
  }
`,Gk=g.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--gitthub-light-beige);
  border-radius: 8px;
  border: 2px dashed var(--gitthub-gray);
`,Qk=g.h3`
  font-size: 1.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`,Yk=g.p`
  color: var(--gitthub-gray);
  margin-bottom: 2rem;
`,Kk=g.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`,Jk=g.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--gitthub-light-beige);
  border-top-color: var(--gitthub-black);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;function Xk(){const r=Ts(),[o,s]=N.useState([]),[u,d]=N.useState(!0),[f,h]=N.useState(""),[m,y]=N.useState(""),[x,k]=N.useState("");N.useEffect(()=>{S()},[m,x]);const S=async()=>{try{d(!0);const j=await ue.get("/api/courses",{params:{level:m||void 0,status:x||void 0,limit:20}});s(j.data.courses||[])}catch(j){console.error("Error fetching courses:",j),s([])}finally{d(!1)}},O=async()=>{if(!f.trim()){S();return}try{d(!0);const j=await ue.post("/api/courses/search",null,{params:{query:f,level:m||void 0,status:x||void 0}});s(j.data.courses||[])}catch(j){console.error("Error searching courses:",j),s([])}finally{d(!1)}},D=j=>{r(`/course/${j}`)},T=o.filter(j=>{if(!f)return!0;const E=f.toLowerCase();return j.title.toLowerCase().includes(E)||j.description.toLowerCase().includes(E)||j.tags&&j.tags.some(M=>M.toLowerCase().includes(E))});return l.jsxs(Tk,{children:[l.jsx(zk,{children:l.jsxs(Nk,{children:[l.jsx(Lk,{children:"AI Course Library"}),l.jsx(Ok,{children:"Browse our collection of AI-generated courses or create your own"})]})}),l.jsxs(Ak,{children:[l.jsxs(Ik,{children:[l.jsx(Fk,{type:"text",placeholder:"Search courses...",value:f,onChange:j=>h(j.target.value),onKeyPress:j=>j.key==="Enter"&&O()}),l.jsxs(Hp,{value:m,onChange:j=>y(j.target.value),children:[l.jsx("option",{value:"",children:"All Levels"}),l.jsx("option",{value:"beginner",children:"Beginner"}),l.jsx("option",{value:"intermediate",children:"Intermediate"}),l.jsx("option",{value:"advanced",children:"Advanced"})]}),l.jsxs(Hp,{value:x,onChange:j=>k(j.target.value),children:[l.jsx("option",{value:"",children:"All Status"}),l.jsx("option",{value:"published",children:"Published"}),l.jsx("option",{value:"draft",children:"Draft"})]}),l.jsx(Wp,{to:"/course-generator",children:"+ Create New Course"})]}),u?l.jsx(Kk,{children:l.jsx(Jk,{})}):T.length>0?l.jsx(Dk,{children:T.map(j=>l.jsxs($k,{onClick:()=>D(j.id||j.course_id),children:[l.jsxs(Mk,{children:[l.jsx(Bk,{children:j.title}),l.jsx(Uk,{children:j.description})]}),l.jsxs(Hk,{children:[l.jsxs(Wk,{children:[l.jsxs(Vp,{children:[l.jsx("span",{children:"📚"})," ",j.level]}),l.jsxs(Vp,{children:[l.jsx("span",{children:"⏱️"})," ",j.duration]}),l.jsx(Vk,{status:j.status,children:j.status})]}),j.tags&&j.tags.length>0&&l.jsx("div",{style:{marginBottom:"1rem"},children:j.tags.slice(0,3).map((E,M)=>l.jsx("span",{style:{display:"inline-block",padding:"0.25rem 0.5rem",margin:"0.25rem",background:"var(--gitthub-light-beige)",borderRadius:"4px",fontSize:"0.85rem"},children:E},M))}),l.jsx(qk,{onClick:E=>{E.stopPropagation(),D(j.id||j.course_id)},children:"View Course"})]})]},j.id||j.course_id))}):l.jsxs(Gk,{children:[l.jsx(Qk,{children:"No Courses Found"}),l.jsx(Yk,{children:f?`No courses match your search "${f}"`:"Be the first to create an AI-powered course!"}),l.jsx(Wp,{to:"/course-generator",children:"Create Your First Course"})]})]})]})}const Zk=g.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`,eS=g.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
`,tS=g.div`
  background: var(--gitthub-black);
  color: white;
  padding: 2rem;
  text-align: center;
`,nS=g.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 900;
  letter-spacing: -0.05em;
`,rS=g.p`
  margin: 0.5rem 0 0;
  opacity: 0.9;
  font-size: 0.95rem;
`,iS=g.div`
  padding: 2.5rem;
`,oS=g.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--gitthub-light-beige);
`,qp=g.button`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${r=>r.active?"var(--gitthub-black)":"var(--gitthub-gray)"};
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gitthub-black);
    transform: scaleX(${r=>r.active?1:0});
    transition: transform 0.3s;
  }

  &:hover {
    color: var(--gitthub-black);
  }
`,Gp=g.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Wn=g.div`
  display: flex;
  flex-direction: column;
`,Vn=g.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
  font-size: 0.9rem;
`,qn=g.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`,Qp=g.button`
  padding: 1rem;
  background: var(--gitthub-black);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,sS=g.div`
  background: #fee;
  border: 1px solid #fcc;
  color: #c00;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,aS=g.div`
  background: #efe;
  border: 1px solid #cfc;
  color: #060;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`,lS=g.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gitthub-light-beige);
`,uS=g.button`
  background: none;
  border: 2px solid var(--gitthub-gray);
  color: var(--gitthub-gray);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    border-color: var(--gitthub-black);
    color: var(--gitthub-black);
  }
`,cS=g.div`
  background: var(--gitthub-light-beige);
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`,dS=g.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,fs=g.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--gitthub-gray);

  &::before {
    content: '✓';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #4caf50;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-right: 0.75rem;
    font-weight: bold;
  }
`;function yu(){const r=Ts(),[o,s]=N.useState("login"),[u,d]=N.useState(!1),[f,h]=N.useState(""),[m,y]=N.useState(""),[x,k]=N.useState({email:"",password:""}),[S,O]=N.useState({email:"",password:"",confirmPassword:"",full_name:"",organization:""}),D=B=>{k(H=>({...H,[B.target.name]:B.target.value})),h("")},T=B=>{O(H=>({...H,[B.target.name]:B.target.value})),h("")},j=async B=>{var H,Y;B.preventDefault(),d(!0),h("");try{const q=await ue.post("/api/auth/login",x,{withCredentials:!0});q.data.success&&(y("Login successful! Redirecting..."),localStorage.setItem("user",JSON.stringify(q.data.user)),setTimeout(()=>{r("/course-generator")},1e3))}catch(q){h(((Y=(H=q.response)==null?void 0:H.data)==null?void 0:Y.detail)||"Login failed. Please try again.")}finally{d(!1)}},E=async B=>{var H,Y;if(B.preventDefault(),d(!0),h(""),S.password!==S.confirmPassword){h("Passwords do not match"),d(!1);return}if(S.password.length<6){h("Password must be at least 6 characters"),d(!1);return}try{const q=await ue.post("/api/auth/register",{email:S.email,password:S.password,full_name:S.full_name,organization:S.organization||null},{withCredentials:!0});q.data.success&&(y("Registration successful! Redirecting..."),localStorage.setItem("user",JSON.stringify(q.data.user)),setTimeout(()=>{r("/course-generator")},1e3))}catch(q){h(((Y=(H=q.response)==null?void 0:H.data)==null?void 0:Y.detail)||"Registration failed. Please try again.")}finally{d(!1)}},M=()=>{localStorage.removeItem("user"),r("/course-generator")};return l.jsx(Zk,{children:l.jsxs(eS,{children:[l.jsxs(tS,{children:[l.jsx(nS,{children:"gitthub"}),l.jsx(rS,{children:"AI Course Generator Platform"})]}),l.jsxs(iS,{children:[o==="login"&&l.jsx(cS,{children:l.jsxs(dS,{children:[l.jsx(fs,{children:"100 courses per month with account"}),l.jsx(fs,{children:"Save your API keys permanently"}),l.jsx(fs,{children:"Course history and management"}),l.jsx(fs,{children:"Share courses with unique URLs"})]})}),l.jsxs(oS,{children:[l.jsx(qp,{active:o==="login",onClick:()=>s("login"),children:"Login"}),l.jsx(qp,{active:o==="register",onClick:()=>s("register"),children:"Register"})]}),f&&l.jsx(sS,{children:f}),m&&l.jsx(aS,{children:m}),o==="login"?l.jsxs(Gp,{onSubmit:j,children:[l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"email",children:"Email Address"}),l.jsx(qn,{type:"email",id:"email",name:"email",value:x.email,onChange:D,placeholder:"you@example.com",required:!0})]}),l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"password",children:"Password"}),l.jsx(qn,{type:"password",id:"password",name:"password",value:x.password,onChange:D,placeholder:"••••••••",required:!0})]}),l.jsx(Qp,{type:"submit",disabled:u,children:u?"Logging in...":"Login"})]}):l.jsxs(Gp,{onSubmit:E,children:[l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"full_name",children:"Full Name"}),l.jsx(qn,{type:"text",id:"full_name",name:"full_name",value:S.full_name,onChange:T,placeholder:"John Doe",required:!0})]}),l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"email",children:"Email Address"}),l.jsx(qn,{type:"email",id:"email",name:"email",value:S.email,onChange:T,placeholder:"you@example.com",required:!0})]}),l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"organization",children:"Organization (Optional)"}),l.jsx(qn,{type:"text",id:"organization",name:"organization",value:S.organization,onChange:T,placeholder:"Your Company"})]}),l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"password",children:"Password"}),l.jsx(qn,{type:"password",id:"password",name:"password",value:S.password,onChange:T,placeholder:"••••••••",required:!0,minLength:"6"})]}),l.jsxs(Wn,{children:[l.jsx(Vn,{htmlFor:"confirmPassword",children:"Confirm Password"}),l.jsx(qn,{type:"password",id:"confirmPassword",name:"confirmPassword",value:S.confirmPassword,onChange:T,placeholder:"••••••••",required:!0,minLength:"6"})]}),l.jsx(Qp,{type:"submit",disabled:u,children:u?"Creating Account...":"Create Account"})]}),l.jsxs(lS,{children:[l.jsx("p",{style:{marginBottom:"1rem",color:"var(--gitthub-gray)"},children:"Or continue without an account (limited to 5 courses/day)"}),l.jsx(uS,{onClick:M,children:"Continue as Guest"})]})]})]})})}const fS=g.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,pS=g.main`
  flex: 1;
`;function hS(){return l.jsx(c0,{children:l.jsxs(fS,{children:[l.jsx(ky,{}),l.jsx(pS,{children:l.jsxs(r0,{children:[l.jsx(_t,{path:"/",element:l.jsx(P1,{})}),l.jsx(_t,{path:"/auth",element:l.jsx(yu,{})}),l.jsx(_t,{path:"/login",element:l.jsx(yu,{})}),l.jsx(_t,{path:"/register",element:l.jsx(yu,{})}),l.jsx(_t,{path:"/about",element:l.jsx(H1,{})}),l.jsx(_t,{path:"/services",element:l.jsx(mw,{})}),l.jsx(_t,{path:"/contact",element:l.jsx(Iw,{})}),l.jsx(_t,{path:"/databank",element:l.jsx(vb,{})}),l.jsx(_t,{path:"/course-generator",element:l.jsx(ok,{})}),l.jsx(_t,{path:"/courses",element:l.jsx(Xk,{})}),l.jsx(_t,{path:"/course/:courseId",element:l.jsx(Pk,{})})]})}),l.jsx(Py,{})]})})}dv.createRoot(document.getElementById("root")).render(l.jsx(Xn.StrictMode,{children:l.jsx(hS,{})}));
