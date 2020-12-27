var EmailsInput;EmailsInput=function(){"use strict";var e={74:function(e,t){var n,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Enter="Enter",e.Comma=","}(n||(n={})),function(e){e.all="all",e.valid="valid",e.invalid="invalid"}(i||(i={}));var l=function(){function e(e,t){var n=this;void 0===t&&(t={}),this.rootElement=e,this.emails=[],this.inputPlaceholder=t.placeholder||"add more people...",this.render(),t.initialValues&&t.initialValues.forEach((function(e){console.log(e),n.add(e)}))}return e.prototype.getEmails=function(e){return void 0===e&&(e=i.valid),e===i.all?this.emails.map((function(e){return e.value})):e===i.valid?this.emails.reduce((function(e,t){return t.valid&&e.push(t.value),e}),[]):e===i.invalid?this.emails.reduce((function(e,t){return t.valid||e.push(t.value),e}),[]):void 0},e.prototype.add=function(e){var t=this;e.trim().split(",").forEach((function(e){if(e.length>0&&!t.emails.some((function(t){return t.value===e}))){e=e.trim();var n=t.isValidEmail(e),i=t.renderEmailElement(e,n);t.emails.push({value:e,valid:n}),t.containerElement.insertBefore(i,t.inputElement),t.containerElement.scrollTop=t.containerElement.scrollHeight}}))},e.prototype.isValidEmail=function(e){return RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).test(e)},e.prototype.removeEmailElement=function(e,t){this.emails=this.emails.filter((function(e){return e.value!==t})),this.containerElement.removeChild(e)},e.prototype.renderEmailElement=function(e,t){var n=this,i=document.createElement("div");i.className="EmailsInput__email"+(t?" EmailsInput__email--valid":" EmailsInput__email--invalid");var l=document.createElement("button");l.innerHTML="&times;",l.className="EmailsInput__email__remove",l.addEventListener("click",(function(){return n.removeEmailElement(i,e)}));var a=document.createElement("div");return a.innerHTML=e,i.appendChild(a),i.appendChild(l),i},e.prototype.renderInputElement=function(){var e=this;this.inputElement=document.createElement("input"),this.inputElement.setAttribute("type","email"),this.inputElement.setAttribute("multiple",""),this.inputElement.setAttribute("placeholder",this.inputPlaceholder),this.inputElement.className="EmailsInput__input";var t=function(t){t.length>0&&(e.add(t),e.inputElement.value="")};return this.inputElement.addEventListener("keyup",(function(i){var l=i.key||i.keyCode;l!==n.Enter&&l!==n.Comma||t(e.inputElement.value)})),this.inputElement.addEventListener("paste",(function(e){e.stopPropagation(),e.preventDefault();var n=(e.clipboardData||window.clipboardData).getData("Text");t(n)})),this.inputElement.addEventListener("blur",(function(){t(e.inputElement.value)})),this.inputElement},e.prototype.render=function(){this.containerElement=document.createElement("div"),this.containerElement.className="EmailsInput EmailsInput__content",this.containerElement.appendChild(this.renderInputElement()),this.rootElement.appendChild(this.containerElement)},e}();t.default=function(e,t){return new l(e,t)}},223:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var i=n(74);n(235),e.exports=i.default},235:function(e,t,n){n.r(t)}},t={};function n(i){if(t[i])return t[i].exports;var l=t[i]={exports:{}};return e[i](l,l.exports,n),l.exports}return n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(223)}();
//# sourceMappingURL=emails-input.js.map