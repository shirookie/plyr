!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueAPlyr=t():e.VueAPlyr=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){e.exports=function(){var e="undefined"!=typeof window,t="undefined"!=typeof navigator,n=e&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart","click"]:["click"],r=function(e){return e},o={instances:[]};function l(e){var t="function"==typeof e;if(!t&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:t?e:e.handler,middleware:e.middleware||r,events:e.events||n,isActive:!(!1===e.isActive)}}function a(e){var t=e.el,n=e.event,r=e.handler,o=e.middleware;n.target!==t&&!t.contains(n.target)&&o(n,t)&&r(n,t)}function i(e){var t=e.el,n=e.handler,r=e.middleware;return{el:t,eventHandlers:e.events.map(function(e){return{event:e,handler:function(e){return a({event:e,el:t,handler:n,middleware:r})}}})}}function s(e){var t=o.instances.findIndex(function(t){return t.el===e});-1!==t&&(o.instances[t].eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}),o.instances.splice(t,1))}return o.bind=function(e,t){var n=l(t.value);if(n.isActive){var r=i({el:e,events:n.events,handler:n.handler,middleware:n.middleware});r.eventHandlers.forEach(function(e){return setTimeout(document.addEventListener,0,e.event,e.handler)}),o.instances.push(r)}},o.update=function(e,t){var n=l(t.value),r=n.events,u=n.handler,p=n.middleware;if(n.isActive){var d=o.instances.find(function(t){return t.el===e});d?(d.eventHandlers.forEach(function(e){return document.removeEventListener(e.event,e.handler)}),d.eventHandlers=r.map(function(t){return{event:t,handler:function(t){return a({event:t,el:e,handler:u,middleware:p})}}})):(d=i({el:e,events:r,handler:u,middleware:p}),o.instances.push(d)),d.eventHandlers.forEach(function(e){return setTimeout(document.addEventListener,0,e.event,e.handler)})}else s(e)},o.unbind=s,{install:function(e){e.directive("click-outside",o)},directive:o}}()},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);document.documentMode,window.navigator.userAgent.includes("Edge"),"WebkitAppearance"in document.documentElement.style&&/Edge/.test(navigator.userAgent),/(iPhone|iPod)/gi.test(navigator.platform),/(iPad|iPhone|iPod)/gi.test(navigator.platform);const l="undefined"!=typeof window;var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"plyr plyr--full-ui plyr--audio plyr--html5"},[e._t("controls",[n("div",{staticClass:"plyr__controls"},e._l(e.renderControls,function(e){return n(e.component,{key:e.key,tag:"component",class:e.className,attrs:{control:e.key}})}),1)]),e._v(" "),n("audio",e._g(e._b({ref:"audio",staticStyle:{display:"none"}},"audio",e.$attrs,!1),e.$listeners),[e._t("default")],2)],2)};a._withStripped=!0;var i={enabled:!0,title:"",debug:!1,autoplay:!1,autopause:!0,seekTime:10,volume:1,muted:!1,duration:null,displayDuration:!0,invertTime:!0,toggleInvert:!0,ratio:"16:9",clickToPlay:!0,resetOnEnd:!1,disableContextMenu:!0,loadSprite:!0,iconPrefix:"plyr",iconUrl:"https://cdn.plyr.io/3.5.2/plyr.svg",blankVideo:"https://cdn.plyr.io/static/blank.mp4",quality:{default:576,options:[4320,2880,2160,1440,1080,720,576,480,360,240]},loop:{active:!1},speed:{selected:1,options:[.5,.75,1,1.25,1.5,1.75,2]},keyboard:{focused:!0,global:!1},tooltips:{controls:!0,seek:!0},storage:{enabled:!0,key:"plyr"},controls:["rewind","play","fast-forward","progress","current-time","volume","speed"],settings:["speed"],i18n:{restart:"Restart",rewind:"Rewind {seektime}s",play:"Play",pause:"Pause",fastForward:"Forward {seektime}s",seek:"Seek",seekLabel:"{currentTime} of {duration}",played:"Played",buffered:"Buffered",currentTime:"Current time",duration:"Duration",volume:"Volume",mute:"Mute",unmute:"Unmute",enableCaptions:"Enable captions",disableCaptions:"Disable captions",download:"Download",enterFullscreen:"Enter fullscreen",exitFullscreen:"Exit fullscreen",frameTitle:"Player for {title}",captions:"Captions",settings:"Settings",menuBack:"Go back to previous menu",speed:"Speed",normal:"Normal",quality:"Quality",loop:"Loop",start:"Start",end:"End",all:"All",reset:"Reset",disabled:"Disabled",enabled:"Enabled",advertisement:"Ad",qualityBadge:{2160:"4K",1440:"HD",1080:"HD",720:"HD",576:"SD",480:"SD"}},urls:{download:null,vimeo:{sdk:"https://player.vimeo.com/api/player.js",iframe:"https://player.vimeo.com/video/{0}?{1}",api:"https://vimeo.com/api/v2/video/{0}.json"},youtube:{sdk:"https://www.youtube.com/iframe_api",api:"https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet"},googleIMA:{sdk:"https://imasdk.googleapis.com/js/sdkloader/ima3.js"}},listeners:{seek:null,play:null,pause:null,restart:null,rewind:null,fastForward:null,mute:null,volume:null,captions:null,download:null,fullscreen:null,pip:null,airplay:null,speed:null,quality:null,loop:null,language:null},events:["ended","progress","stalled","playing","waiting","canplay","canplaythrough","loadstart","loadeddata","loadedmetadata","timeupdate","volumechange","play","pause","error","seeking","seeked","emptied","ratechange","cuechange","download","enterfullscreen","exitfullscreen","captionsenabled","captionsdisabled","languagechange","controlshidden","controlsshown","ready","statechange","qualitychange","adsloaded","adscontentpause","adscontentresume","adstarted","adsmidpoint","adscomplete","adsallcomplete","adsimpression","adsclick"],selectors:{editable:"input, textarea, select, [contenteditable]",container:".plyr",controls:{container:null,wrapper:".plyr__controls"},labels:"[data-plyr]",buttons:{play:'[data-plyr="play"]',pause:'[data-plyr="pause"]',restart:'[data-plyr="restart"]',rewind:'[data-plyr="rewind"]',fastForward:'[data-plyr="fast-forward"]',mute:'[data-plyr="mute"]',captions:'[data-plyr="captions"]',download:'[data-plyr="download"]',fullscreen:'[data-plyr="fullscreen"]',pip:'[data-plyr="pip"]',airplay:'[data-plyr="airplay"]',settings:'[data-plyr="settings"]',loop:'[data-plyr="loop"]'},inputs:{seek:'[data-plyr="seek"]',volume:'[data-plyr="volume"]',speed:'[data-plyr="speed"]',language:'[data-plyr="language"]',quality:'[data-plyr="quality"]'},display:{currentTime:".plyr__time--current",duration:".plyr__time--duration",buffer:".plyr__progress__buffer",loop:".plyr__progress__loop",volume:".plyr__volume--display"},progress:".plyr__progress",captions:".plyr__captions",caption:".plyr__caption",menu:{quality:".js-plyr__menu__list--quality"}},classNames:{type:"plyr--audio",provider:"plyr--html5",video:"plyr__video-wrapper",embed:"plyr__video-embed",embedContainer:"plyr__video-embed__container",poster:"plyr__poster",posterEnabled:"plyr__poster-enabled",ads:"plyr__ads",control:"plyr__control",controlPressed:"plyr__control--pressed",playing:"plyr--playing",paused:"plyr--paused",stopped:"plyr--stopped",loading:"plyr--loading",hover:"plyr--hover",tooltip:"plyr__tooltip",cues:"plyr__cues",hidden:"plyr__sr-only",hideControls:"plyr--hide-controls",isIos:"plyr--is-ios",isTouch:"plyr--is-touch",uiSupported:"plyr--full-ui",noTransition:"plyr--no-transition",display:{time:"plyr__time"},menu:{value:"plyr__menu__value",badge:"plyr__badge",open:"plyr--menu-open"},captions:{enabled:"plyr--captions-enabled",active:"plyr--captions-active"},fullscreen:{enabled:"plyr--fullscreen-enabled",fallback:"plyr--fullscreen-fallback"},pip:{supported:"plyr--pip-supported",active:"plyr--pip-active"},airplay:{supported:"plyr--airplay-supported",active:"plyr--airplay-active"},tabFocus:"plyr__tab-focus",previewThumbnails:{thumbContainer:"plyr__preview-thumb",thumbContainerShown:"plyr__preview-thumb--is-shown",imageContainer:"plyr__preview-thumb__image-container",timeContainer:"plyr__preview-thumb__time-container",scrubbingContainer:"plyr__preview-scrubbing",scrubbingContainerShown:"plyr__preview-scrubbing--is-shown"}},attributes:{embed:{provider:"data-plyr-provider",id:"data-plyr-embed-id"}}},s=function(){var e=this,t=e.$createElement;return(e._self._c||t)("button",{attrs:{type:e.type},on:{click:function(t){return e.toggle(!1)}}},[e.toggleState?e._t("toggled",[e._v(e._s(e.labelPressed))]):e._t("default",[e._v(e._s(e.label))])],2)};s._withStripped=!0;var u={methods:{setup(e,t,n=!0){this.$parent.player[n?"addEventListener":"removeEventListener"](e,t)}}},p=function(){var e=this.$createElement;return(this._self._c||e)("span",{staticClass:"plyr__tooltip"},[this._t("default")],2)};p._withStripped=!0;function d(e,t,n,r,o,l,a,i){var s,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),l&&(u._scopeId="data-v-"+l),a?(s=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=s):o&&(s=i?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(u.functional){u._injectStyles=s;var p=u.render;u.render=function(e,t){return s.call(t),p(e,t)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,s):[s]}return{exports:e,options:u}}var c=d({name:"aplyr-tooltip"},p,[],!1,null,null,null);c.options.__file="src/_controls/tooltip.vue";var m=c.exports;const h={play:{toggleState:!1,label:"play",labelPressed:"pause",icon:"play",iconPressed:"pause"},mute:{toggleState:!0,label:"mute",labelPressed:"unmute",icon:"volume",iconPressed:"muted"}};var y=d({name:"aplyr-button",extends:u,props:{control:{required:!0,validator:e=>-1!==["play","pause"].indexOf(e)},type:{type:String,default:"button"},config:{type:Object,default:()=>({})}},data(){return Object.assign({toggleState:!0===this.config.toggle},h[this.control]||{label:this.config.label||this.control,labelPressed:this.config.labelPressed||this.config.label||this.control,icon:this.config.icon||this.type,iconPressed:this.config.iconPressed||this.config.icon||this.type})},methods:{toggle(e,t=!1){t?this.toggleState=void 0===e?!this.toggleState:e:this.$nextTick(()=>{this.$parent["play"===this.control&&!0===this.toggleState?"pause":this.control]()})},setToggleTrue(){this.toggle(!0,!0)},setToggleFalse(){this.toggle(!1,!0)}},mounted(){"play"!==this.control&&"pause"!==this.control||(this.setup("play",this.setToggleTrue),this.setup("pause",this.setToggleFalse))},beforeDestroy(){"play"!==this.control&&"pause"!==this.control||(this.setup("play",this.setToggleTrue,!1),this.setup("pause",this.setToggleFalse,!1))},components:{"v-aplyr-tooltip":m}},s,[],!1,null,null,null);y.options.__file="src/_controls/button.vue";var f=y.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"plyr--loading":e.loading}},[n("v-aplyr-range",{attrs:{control:"progress",max:e.duration},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("progress",{staticClass:"plyr__progress__buffer",attrs:{max:e.duration,role:"progressbar","aria-hidden":"true"},model:{value:e.buffered,callback:function(t){e.buffered=t},expression:"buffered"}})],1)};v._withStripped=!0;var g=function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],ref:"input",style:{"--value":e.displayVal},attrs:{type:"range",min:e.min,max:e.max,step:e.step,autocomplete:"off",role:"slider"},domProps:{value:e.model},on:{__r:function(t){e.model=t.target.value}}})};g._withStripped=!0;var _={addCSS:!0,thumbWidth:15,watch:!0};const b=e=>null!=e?e.constructor:null,w=(e,t)=>Boolean(e&&t&&e instanceof t),T=e=>null==e,k=e=>b(e)===Object,x=e=>b(e)===String,S=e=>Array.isArray(e),E=e=>w(e,NodeList);var C={nullOrUndefined:T,object:k,number:e=>b(e)===Number&&!Number.isNaN(e),string:x,boolean:e=>b(e)===Boolean,function:e=>b(e)===Function,array:S,nodeList:E,element:e=>w(e,Element),event:e=>w(e,Event),empty:e=>T(e)||(x(e)||S(e)||E(e))&&!e.length||k(e)&&!Object.keys(e).length};function P(e,t){if(t<1){const n=function(e){const t=`${e}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0}(t);return parseFloat(e.toFixed(n))}return Math.round(e/t)*t}class ${constructor(e,t){C.element(e)?this.element=e:C.string(e)&&(this.element=document.querySelector(e)),C.element(this.element)&&C.empty(this.element.rangeTouch)&&(this.config=Object.assign({},_,t),this.init())}static get enabled(){return"ontouchstart"in document.documentElement}static setup(e,t={}){let n=null;if(C.empty(e)||C.string(e)?n=Array.from(document.querySelectorAll(C.string(e)?e:'input[type="range"]')):C.element(e)?n=[e]:C.nodeList(e)?n=Array.from(e):C.array(e)&&(n=e.filter(C.element)),C.empty(n))return null;const r=Object.assign({},_,t);if(C.string(e)&&r.watch){new MutationObserver(t=>{Array.from(t).forEach(t=>{Array.from(t.addedNodes).forEach(t=>{if(!C.element(t)||!function(e,t){const n={Element:Element};return(n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(){return Array.from(document.querySelectorAll(t)).includes(this)}).call(e,t)}(t,e))return;new $(t,r)})})}).observe(document.body,{childList:!0,subtree:!0})}return n.map(e=>new $(e,t))}init(){$.enabled&&(this.config.addCSS&&(this.element.style.userSelect="none",this.element.style.webKitUserSelect="none",this.element.style.touchAction="manipulation"),this.listeners(!0),this.element.rangeTouch=this)}destroy(){$.enabled&&(this.listeners(!1),this.element.rangeTouch=null)}listeners(e){const t=e?"addEventListener":"removeEventListener";["touchstart","touchmove","touchend"].forEach(e=>{this.element[t](e,e=>this.set(e),!1)})}get(e){if(!$.enabled||!C.event(e))return null;const t=e.target,n=e.changedTouches[0],r=parseFloat(t.getAttribute("min"))||0,o=parseFloat(t.getAttribute("max"))||100,l=parseFloat(t.getAttribute("step"))||1,a=o-r;let i;const s=t.getBoundingClientRect(),u=100/s.width*(this.config.thumbWidth/2)/100;return(i=100/s.width*(n.clientX-s.left))<0?i=0:i>100&&(i=100),i<50?i-=(100-2*i)*u:i>50&&(i+=2*(i-50)*u),r+P(a*(i/100),l)}set(e){$.enabled&&C.event(e)&&!e.target.disabled&&(e.preventDefault(),e.target.value=this.get(e),function(e,t){if(!e||!t)return;const n=new Event(t);e.dispatchEvent(n)}(e.target,"touchend"===e.type?"change":"input"))}}var A=$,V=d({name:"aplyr-range",props:{control:{type:String,required:!0},value:{default:0},max:{default:100},min:{default:0},step:{default:.01}},data(){return{currentVal:this.value}},computed:{model:{get(){return this.currentVal},set(e){e!=this.currentVal&&(this.currentVal=e,this.$emit("input",e))}},displayVal(){return this.model/this.max*100+"%"}},watch:{value(e){this.model=e}},mounted(){A.setup(this.$refs.input)}},g,[],!1,null,null,null);V.options.__file="src/_controls/range.vue";var j=V.exports;const M=["canplay","seeking","seeked","timeupdate","durationchange","progress","playing","waiting"];var O=d({name:"aplyr-progress",extends:u,components:{"v-aplyr-tooltip":m,"v-aplyr-range":j},props:{timeout:{type:Number,default:300}},data:()=>({loading:!0,loadingTimeoutId:null,currentTime:0,duration:100,buffered:0}),computed:{model:{get(){return this.currentTime},set(e){e!=this.currentTime&&(this.currentTime=e,this.$parent.player.currentTime=e)}}},mounted(){M.forEach(e=>{this.setup(e,this["on"+e])})},beforeDestroy(){M.forEach(e=>{this.setup(e,this["on"+e],!1)})},methods:{updateCurrentTime(){this.model=this.$parent.player.currentTime},updateDuration(){this.duration=this.$parent.player.duration},updateBuffered(){let e=this.$parent.player.buffered;this.buffered=e&&e.length?e.end(0):0},updateLoading(e){clearTimeout(this.loadingTimeoutId),this.loadingTimeoutId=setTimeout(()=>{this.loading=e},this.timeout)},oncanplay(){this.updateLoading(!1)},onseeking(){},onseeked(){this.updateLoading(!1)},ontimeupdate(){this.updateCurrentTime()},ondurationchange(){this.updateDuration()},onprogress(){this.updateBuffered()},onplaying(){this.updateLoading(!1),this.updateBuffered()},onwaiting(){this.updateLoading(!0)}}},v,[],!1,null,null,null);O.options.__file="src/_controls/progress.vue";var N=O.exports,L=function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("v-aplyr-button",{staticClass:"plyr__control",attrs:{control:"mute"},on:{mute:this.toggleMute}}),this._v(" "),t("v-aplyr-range",{attrs:{control:"volume"},on:{input:this.changeVolume}})],1)};L._withStripped=!0;var F=d({name:"aplyr-volume",extends:u,data:()=>({volume:0}),methods:{toggleMute(e){this.$emit(e?"mute":"unmute"),this.changeVolume(e?0:100)},changeVolume(e){this.$emit("volumechange",e)}},components:{"v-aplyr-button":f,"v-aplyr-range":j}},L,[],!1,null,null,null);F.options.__file="src/_controls/volume.vue";var D=F.exports;const q={play:{component:"v-aplyr-button",className:"plyr__control"},progress:{component:"v-aplyr-progress",className:"plyr__progress"}};var R=d({name:"vue-aplyr",props:{options:{type:Object,default:()=>Object.assign({},i)}},data:()=>({controls:{},ready:!1,computedVal:{}}),computed:{renderControls(){return this.options.controls.filter(e=>void 0!==q[e]).map(e=>({key:e,component:q[e].component,className:q[e].className}))},player(){return this.$refs.audio},currentTime:{set(e){this.ready&&(this.player.currentTime=e),this.computedVal.currentTime=e},get(){return this.computedVal.currentTime||this.player.currentTime}},speed:{set(e){this.player.playbackRate=parseFloat(e)},get(){return this.player.playbackRate}}},methods:{setControl(e,t){this.$set(this.controls,e,t)},unsetControl(e){this.$delete(this.controls,e)},play(){this.player.play()},pause(){this.player.pause()},togglePlay(){}},components:{"v-aplyr-button":f,"v-aplyr-progress":N,"v-aplyr-volume":D}},a,[],!1,null,null,null);R.options.__file="src/VueAPlyr.vue";var B=R.exports,H=function(){var e=this.$createElement;return(this._self._c||e)("span",{staticClass:"plyr__time"},[this._v(this._s(this.displayTime))])};H._withStripped=!0;const I=e=>Math.trunc(e/60/60%60,10),U=e=>Math.trunc(e/60%60,10),W=e=>Math.trunc(e%60,10);var X=d({name:"aplyr-time",extends:u,props:{control:{required:!0,validator:e=>-1!==["currentTime","duration"].indexOf(e)}},data:()=>({value:0}),computed:{displayTime(){return function(e=0,t=!1,n=!1){const r=e=>`0${e}`.slice(-2);let o=I(e);const l=U(e),a=W(e);return`${n&&e>0?"-":""}${o=t||o>0?`${o}:`:""}${r(l)}:${r(a)}`}(this.value)}},mounted(){this.setup("currentTime"===this.control?"timeupdate":"durationchange",this.updateTime)},beforeDestroy(){this.setup("currentTime"===this.control?"timeupdate":"durationchange",this.updateTime,!1)},methods:{updateTime(e){this.value=this.$parent.player[this.control]}}},H,[],!1,null,null,null);X.options.__file="src/_controls/time.vue";var K=X.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.closeMenu,expression:"closeMenu"}]},[n("button",{staticClass:"plyr__control",attrs:{type:"button"},on:{click:function(t){e.opened=!e.opened}}},[e._t("default",[e._v(e._s(e.label))],null,1==e.controls.length?{selected:e.config[e.controls[0]].selected}:{})],2),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.opened,expression:"opened"}],staticClass:"plyr__menu__container"},[e.controls.length>1?n("div",e._l(e.controls,function(t){return n("button",{key:t,staticClass:"plyr__control plyr__control--forward",attrs:{role:"menuitem",type:"button"}},[e._v("\n                "+e._s(t)+"\n            ")])}),0):e._e(),e._v(" "),e._l(e.controls,function(t){return n("div",{directives:[{name:"show",rawName:"v-show",value:e.active==t,expression:"active == item"}],key:t},[e._t(t,[e.controls.length>1?n("button",{staticClass:"plyr__control plyr__control--back",attrs:{type:"button"}},[n("span",[e._v(e._s(t))]),e._v(" "),n("span",{staticClass:"plyr__sr-only"},[e._v("返回上级")])]):e._e(),e._v(" "),n("div",{attrs:{role:"menu"}},e._l(e.config[t].options,function(r){return n("button",{key:r,staticClass:"plyr__control",attrs:{type:"button","aria-checked":r==e.config[t].selected,role:"menuitemradio"},on:{click:function(n){return e.set(t,r)}}},[e._v("\n                        "+e._s(r)+"\n                    ")])}),0)])],2)})],2)])};z._withStripped=!0;var G=d({name:"aplyr-menu",props:{controls:{default:()=>["speed"],validator:e=>Array.isArray(e)&&e.length>0}},data(){let e={};return this.controls.forEach(t=>{e[t]=this.$parent.options[t]}),{opened:!1,active:this.controls[0],config:e}},computed:{label(){return this.controls.length>1?"settings":this.config[this.controls[0]].selected}},methods:{closeMenu(){this.opened=!1},set(e,t){this.config[e].selected=t,this.$parent[e]=t,1==this.controls.length&&this.closeMenu()}}},z,[],!1,null,null,null);G.options.__file="src/_controls/menu.vue";var Q=G.exports;let J;function Y(e){Y.installed&&J===e||(Y.installed=!0,J=e,e.use(o.a),e.component("v-aplyr",B))}n.d(t,"_Vue",function(){return J}),n.d(t,"VueAPlyr",function(){return B}),n.d(t,"VueAPlyrButton",function(){return f}),n.d(t,"VueAPlyrProgress",function(){return N}),n.d(t,"VueAPlyrRange",function(){return j}),n.d(t,"VueAPlyrTooltip",function(){return m}),n.d(t,"VueAPlyrVolume",function(){return D}),n.d(t,"VueAPlyrTime",function(){return K}),n.d(t,"VueAPlyrMenu",function(){return Q}),l&&window.Vue&&window.Vue.use(Y);t.default=Y}])});