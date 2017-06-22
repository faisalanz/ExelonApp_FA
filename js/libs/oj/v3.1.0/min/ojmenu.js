/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","hammerjs","ojs/ojjquery-hammer","promise","ojs/ojcomponentcore","ojs/ojpopupcore"],function(a,g,c){(function(){a.ab("oj.ojMenu",g.oj.baseComponent,{defaultElement:"\x3cul\x3e",delay:300,role:"menu",widgetEventPrefix:"oj",options:{menuSelector:"ul",openOptions:{display:"auto",initialFocus:"menu",launcher:null,position:{my:"start top",at:"start bottom",collision:"flipfit"}},submenuOpenOptions:{position:{my:"start top",at:"end top",collision:"flipfit"}},beforeOpen:null,
close:null,open:null,select:null},_ComponentCreate:function(){this._super();var a=this;this._focusForTesting=this.Ni;this._nextForTesting=this.tha;this._selectForTesting=this.So;this.Vy=this.element;this.K4=!1;if(h&&"ul"!==this.element[0].tagName.toLowerCase())throw Error("Cancel item supported for \x3cul\x3e menus only.");this.JMa();this.element.uniqueId().addClass("oj-menu oj-component").hide().attr({role:this.role,tabIndex:"0"});this._on(!0,{"mousedown .oj-menu-item":function(a){this.options.disabled&&
a.preventDefault()},click:function(a){this.options.disabled&&a.preventDefault()},keydown:function(a){!this.options.disabled||a.keyCode!==g.ui.keyCode.ESCAPE&&a.keyCode!==g.ui.keyCode.TAB||(a.keyCode===g.ui.keyCode.TAB&&a.preventDefault(),this.Je&&this.WF(a))}});this.options.disabled&&this.element.addClass("oj-disabled").attr("aria-disabled","true");var b=function(a){if(!this.f3){this.f3=!0;var b=g(a.currentTarget);try{this.Gca=!0,this.Ni(a,b)}finally{this.Gca=!1}}}.bind(this),c=function(a){a&&a.target&&
!g(a.target).is(":visible")||this.Xl(a,"eventSubtree")}.bind(this);this._on({"mousedown .oj-menu-item \x3e a":function(a){a.preventDefault()},"click .oj-disabled \x3e a":function(a){a.preventDefault()},click:function(){this.K4=!1},touchstart:function(){this.f3=!1},mouseover:function(){this.f3=!1},"click .oj-menu-item:has(a)":function(a){var b=g(a.target).closest(".oj-menu-item");!this.K4&&b.not(".oj-disabled").length&&(this.K4=!0,a.preventDefault(),this.pb&&this.pb.closest(b).length&&this.pb.get(0)!=
b.get(0)||(b.has(".oj-menu").length?this.rf(a):(this.So(a),this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.pb&&1===this.pb.parents(".oj-menu").length&&clearTimeout(this.Cf)))))},"mouseenter .oj-menu-item":b,"touchstart .oj-menu-item":b,mouseleave:c,"mouseleave .oj-menu":c,focus:function(a,b){if(!b){var c=this.pb||this.element.children(".oj-menu-item").eq(0);this.Ni(a,c)}},keydown:this.Tu,keyup:function(a){if(a.keyCode==g.ui.keyCode.ENTER||a.keyCode==g.ui.keyCode.SPACE)this.ML=
!1}});this._focusable({applyHighlight:!e,recentPointer:function(){return a.Gca},setupHandlers:function(b,c){a.oB=b;a.Hx=c}});this.pla=g.proxy(this.mI,this);this.hb()},NA:function(a){if(arguments.length)d=a;else return d},vW:function(a){if(("focus"===a.type||"mousedown"===a.type||"touchstart"===a.type||93==a.which||121==a.which&&a.shiftKey||93==a.keyCode)&&("mousedown"!==a.type||!d)){var c=b.slice(0,b.length);g.each(c,function(b,c){!g(a.target).closest(c.element).length&&("keydown"===a.type||"mousedown"===
a.type&&3===a.which||!g(a.target).closest(c.Je).length||c.THa&&("mousedown"===a.type&&3!==a.which||"touchstart"===a.type))&&(c.Xl(a,"eventSubtree"),c.Je&&c.px(a))})}},_setOption:function(a,b){this._superApply(arguments);switch(a){case "translations.labelCancel":case "translations":this.oaa&&this.oaa.text(this.options.translations.labelCancel)}},_destroy:function(){this.element.is(":visible")&&this.px();clearTimeout(this.Cf);delete this.Cf;this.element.removeAttr("aria-activedescendant").removeClass("oj-component").find(".oj-menu").addBack().removeClass("oj-menu oj-menu-submenu oj-menu-icons oj-menu-text-only").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
this.element.find(".oj-menu-item").removeClass("oj-menu-item").removeAttr("role").children("a").removeAttr("aria-disabled").removeUniqueId().removeClass("oj-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var a=g(this);a.data("oj-ojMenu-submenu-icon")&&a.remove()});this.element.find("a").removeAttr("aria-expanded");this.element.find(".oj-menu-divider").removeClass("oj-menu-divider").removeAttr("role");0<=b.indexOf(this)&&b.splice(b.indexOf(this),
1);delete this.Qo;delete this.pla;var a=this.nu;isNaN(a)||(delete this.nu,window.clearTimeout(a));this.gM&&this.gM.remove();this.element.wi("destroy");this._super()},Tu:function(a){function b(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$\x26")}var c,d,e,f,h=!0;switch(a.keyCode){case g.ui.keyCode.HOME:this.CO("first","first",a);break;case g.ui.keyCode.END:this.CO("last","last",a);break;case g.ui.keyCode.UP:this.xJa(a);break;case g.ui.keyCode.DOWN:this.tha(a);break;case g.ui.keyCode.LEFT:case g.ui.keyCode.RIGHT:a.keyCode===
g.ui.keyCode.RIGHT^this.um?this.pb&&!this.pb.is(".oj-disabled")&&this.rf(a):this.Xl(a,"active");break;case g.ui.keyCode.ENTER:case g.ui.keyCode.SPACE:this.vEa(a);this.ML=!0;var k=this;setTimeout(function(){k.ML=!1},100);break;case g.ui.keyCode.TAB:a.preventDefault();this.Je&&this.WF(a);break;case g.ui.keyCode.ESCAPE:this.Je?(d=this.element.attr("aria-activedescendant"),e="#"+this.element.attr("id")+"\x3e*\x3ea",d&&!g("#"+d).is(e)?this.Xl(a,"active"):this.WF(a)):this.Xl(a,"active");break;default:h=
!1,c=this.aS||"",d=String.fromCharCode(a.keyCode),e=!1,clearTimeout(this.ZPa),d===c?e=!0:d=c+d,f=new RegExp("^"+b(d),"i"),c=this.Vy.children(".oj-menu-item").filter(function(){return f.test(g(this).children("a").text())}),c=e&&-1!==c.index(this.pb.next())?this.pb.nextAll(".oj-menu-item"):c,c.length||(d=String.fromCharCode(a.keyCode),f=new RegExp("^"+b(d),"i"),c=this.Vy.children(".oj-menu-item").filter(function(){return f.test(g(this).children("a").text())})),c.length?(this.Ni(a,c),1<c.length?(this.aS=
d,this.ZPa=this._delay(function(){delete this.aS},1E3)):delete this.aS):delete this.aS}h&&a.preventDefault()},vEa:function(a){this.pb&&!this.pb.is(".oj-disabled")&&(this.pb.children("a[aria-haspopup\x3d'true']").length?this.rf(a):this.So(a))},refresh:function(){this._super();this.hb();var a=this.element;if(a.is(":visible")){var b=a.data("oj-menu-position");b&&(b.of instanceof g.Event||b.of instanceof Window||g(b.of).is(":visible"))&&(a.position(b),a.find(".oj-menu").each(function(){var a=g(this);
a.is(":visible")&&(b=a.data("oj-menu-position"))&&a.position(b)}))}},hb:function(){this.um="rtl"===this.sd();var a=this,b=this.element.find(this.options.menuSelector),c=b.add(this.element),d=c.children();this.dGa=!!b.length;d.filter(".oj-menu-divider").has("a").removeClass("oj-menu-divider oj-menu-item").removeAttr("role");var e=d.filter(":not(.oj-menu-item):has(a)"),f=e.children("a");this.Rfa(e);this.Gfa(f);e=d.filter(function(a,b){var c=g(b);return c.is(":not(.oj-menu-item)")&&!/[^\-\u2014\u2013\s]/.test(c.text())});
this.Nfa(e);this.wGa(d,e);d.filter(".oj-disabled").children("a").attr("aria-disabled","true");d.filter(":not(.oj-disabled)").children("a").removeAttr("aria-disabled");b.filter(":not(.oj-menu)").addClass("oj-menu oj-menu-submenu oj-menu-dropdown").hide().attr({role:this.role,"aria-hidden":"true"}).each(function(){var b=g(this),c=a.NY(b),d=g("\x3cspan\x3e");d.addClass("oj-menu-submenu-icon oj-component-icon").data("oj-ojMenu-submenu-icon",!0);c.attr("aria-haspopup","true").attr("aria-expanded","false").append(d);
c=c.attr("id");b.attr("aria-labelledby",c)});c.each(function(){var a=g(this),b=a.children().children().children(".oj-menu-item-icon:not(.oj-menu-cancel-icon)").length;a.toggleClass("oj-menu-icons",!!b).toggleClass("oj-menu-text-only",!b)});this.pb&&!g.contains(this.element[0],this.pb[0])&&this.PV()},Rfa:function(a){a.addClass("oj-menu-item").attr("role","presentation")},Gfa:function(a){a.uniqueId().attr({tabIndex:"-1",role:"menuitem"})},Nfa:function(a){a.addClass("oj-menu-divider").attr("role","separator")},
wGa:function(a,b){a.removeClass("oj-menu-item-before-divider oj-menu-item-after-divider");b.prev().addClass("oj-menu-item-before-divider");b.next().addClass("oj-menu-item-after-divider")},NY:function(a){return a.prev("a")},qWa:function(){return"menuitem"},ZM:function(a,b){var c=a.prev(".oj-menu-divider").add(a.next(".oj-menu-divider"));b&&(c=c.add(a));return c},Ni:function(a,b){a&&"focus"===a.type||clearTimeout(this.Cf);b=b.first();this.bha(b,a);var c=b.parent(),d=c.closest(".oj-menu-item");c.find(".oj-focus-ancestor").removeClass("oj-focus-ancestor");
this.ZM(d,!0).addClass("oj-focus-ancestor");a&&"keydown"===a.type?this.bs():this.Cf=this._delay(function(){delete this.Cf;this.bs()},this.delay);c=b.children(".oj-menu");c.length&&a&&/^mouse/.test(a.type)&&!this.pb.hasClass("oj-disabled")&&this.XMa(c);this.Vy=b.parent()},bha:function(a,b){if(!a.is(this.pb)){var c=this.pb?this.pb:g(),d=a.children("a");this.pb=a;this.element.attr("aria-activedescendant",d.attr("id"));this.Hx(c);this.oB(a);this.ZM(c).removeClass("oj-focus");this.ZM(a).addClass("oj-focus");
this._trigger("_activeItem",b,{previousItem:c,item:a,privateNotice:"The _activeItem event is private.  Do not use."})}},lKa:function(a){if(this.pb){var b=this.pb;this.pb=null;this.element.removeAttr("aria-activedescendant");this.Hx(b);this.ZM(b).removeClass("oj-focus");this._trigger("_activeItem",a,{previousItem:b,item:g(),privateNotice:"The _activeItem event is private.  Do not use."})}},PV:function(a){clearTimeout(this.Cf);this.lKa(a)},WF:function(a,b){this.Je.focus();this.px(a,b)},px:function(b,
c){if(!this.Ru("close","__dismiss",[b,c])){var d=this.element.is(":visible");this.Cq("close");var e={};e[a.Y.Ma.Be]=this.element;e[a.Y.Ma.Vz]={event:b,selectUi:c,isOpen:d};a.Y.lc().close(e)}},nF:function(b){var c=b[a.Y.Ma.Be];if((b=(a.vc.Hd("oj-menu-option-defaults")||{}).animation)&&b.close)return a.ga.Sn(c,"close",b.close).then(function(){c.hide()});c.hide()},Xr:function(c){var d=c[a.Y.Ma.Vz];c=d.event;var e=d.selectUi,d=d.isOpen;this.element.removeData("oj-menu-position");this.Je=void 0;this.bka=
!1;e&&(c=this.O1("select",c,e).event);d&&this._trigger("close",c,{});this.uu=null;0<=b.indexOf(this)&&b.splice(b.indexOf(this),1)},getCurrentOpenOptions:function(){return g.extend(!0,{},this.uu||this.options.openOptions)},open:function(c,d,e){if(!this.Ru("open","open",[c,d,e])){d=g.extend({},this.options.openOptions,d);d.position=g.extend({},d.position);e=g.extend({},this.options.submenuOpenOptions,e);var f=this.uu;this.uu=d;a.Ga.PIa(c);this.THa=this.KL;var h=this.O1("beforeOpen",c,{openOptions:d});
if(h.proceed)if(this.element.is(":visible")&&(this.uu=f,this.px(h.event),this.uu=d),f=d.launcher,(f="string"===g.type(f)?g(f):f)&&f.length){h=this.hHa(d.display);this.vNa(h);var k,n;if(h){if(this.element.addClass("oj-menu-dropdown").removeClass("oj-menu-sheet"),n=l,k=a.Ga.rp(d.position,this.um),k.of=a.Ga.YSa(k.of,f,c),null==k.of){a.C.warn("position.of passed to Menu.open() is 'event', but the event is null.  Ignoring the call.");this.uu=null;return}}else this.element.addClass("oj-menu-sheet").removeClass("oj-menu-dropdown"),
n=m,k={my:"bottom",at:p,of:window,collision:"flipfit"};var s=this.element[0],t=b.slice(0,b.length);g.each(t,function(a,b){b.element[0]!==s&&(b.Xl(c,"eventSubtree"),b.Je&&b.px(c))});this.bNa=a.Ga.rp(e.position,this.um);e=this.pla;g.isFunction(k.using)&&k.using!==e&&(k.origUsing=k.using);k.using=e;this.element.data("oj-menu-position",k);this.Cq("open");e={};e[a.Y.Ma.Be]=this.element;e[a.Y.Ma.eA]=f;e[a.Y.Ma.Fr]=k;e[a.Y.Ma.Ar]=this.xB();e[a.Y.Ma.Pt]="oj-menu-layer";e[a.Y.Ma.Bl]=n;e[a.Y.Ma.Vz]={event:c,
initialFocus:d.initialFocus,launcher:f,isDropDown:h};a.Y.lc().open(e)}else a.C.warn("When calling Menu.open(), must specify openOptions.launcher via the component option, method param, or beforeOpen listener.  Ignoring the call."),this.uu=null;else this.uu=f}},oF:function(b){var c=b[a.Y.Ma.Be];b=b[a.Y.Ma.Fr];c.show();c.position(b);if((b=(a.vc.Hd("oj-menu-option-defaults")||{}).animation)&&b.open)return a.ga.Sn(c,"open",b.open)},eF:function(c){var d=c[a.Y.Ma.Vz];c=d.event;var e=d.initialFocus,f=d.launcher,
d=d.isDropDown,g="firstItem"===e;(g||"menu"===e)&&this.element.focus();g?this.Ni(c,this.element.children().first()):this.PV(c);this.Je=f;this.bka=!d;b.push(this);this._trigger("open",c,{})},XMa:function(a){clearTimeout(this.Cf);"true"===a.attr("aria-hidden")&&(this.Cf&&clearTimeout(this.Cf),this.Cf=this._delay(function(){delete this.Cf;this.bs();this.Eha(a)},this.delay))},Eha:function(a){var c=g.extend({of:this.pb},this.bNa);clearTimeout(this.Cf);this.element.find(".oj-menu").not(a.parents(".oj-menu")).hide().attr("aria-hidden",
"true").removeData("oj-menu-position");a.show().removeAttr("aria-hidden").position(c).data("oj-menu-position",c);this.NY(a).attr("aria-expanded","true");!this.Je&&0>b.indexOf(this)&&b.push(this)},JL:function(a,b,c){function d(){delete e.Cf;var c=b?e.element:g(a&&a.target).closest(e.element.find(".oj-menu"));c.length||(c=e.element);e.bs(c);e.PV(a);e.Vy=c}clearTimeout(this.Cf);var e=this;c?this.Cf=this._delay(d,c):d()},bs:function(a){a||(a=this.pb?this.pb.parent():this.element);var c=a.find(".oj-menu");
c.hide().attr("aria-hidden","true").removeData("oj-menu-position");this.NY(c).attr("aria-expanded","false");a.find(".oj-focus-ancestor").removeClass("oj-focus-ancestor");this.Je||0<=b.indexOf(this)&&a===this.element&&b.splice(b.indexOf(this),1)},Xl:function(b,c){if(null==c||"active"===c){var d=this.Vy&&this.Vy.closest(".oj-menu-item",this.element);d&&d.length&&(this.bs(),this.Ni(b,d))}else"all"===c||"eventSubtree"===c?this.JL(b,"all"===c,this.delay):a.C.warn("Invalid param "+c+" passed to Menu._collapse().  Ignoring the call.")},
rf:function(a){var b=this.pb&&this.pb.children(".oj-menu ").children(".oj-menu-item").first();b&&b.length&&(this.Eha(b.parent()),this.Cf&&clearTimeout(this.Cf),this.Cf=this._delay(function(){delete this.Cf;this.Ni(a,b)}))},tha:function(a){this.CO("next","first",a)},xJa:function(a){this.CO("prev","last",a)},mWa:function(){return this.pb&&!this.pb.prevAll(".oj-menu-item").length},nWa:function(){return this.pb&&!this.pb.nextAll(".oj-menu-item").length},CO:function(a,b,c){var d;this.pb&&(d="first"===
a||"last"===a?this.pb["first"===a?"prevAll":"nextAll"](".oj-menu-item").eq(-1):this.pb[a+"All"](".oj-menu-item").eq(0));d&&d.length&&this.pb||(d=this.Vy.children(".oj-menu-item")[b]());this.Ni(c,d)},So:function(b){if(!this.pb&&b&&b.target){var c=g(b.target).closest(".oj-menu-item");c.closest(this.element).length&&this.bha(c,b)}this.pb?this.pb.has(".oj-menu").length||this.pb.is(".oj-disabled")?a.C.warn("Selecting a disabled menu item or parent menu item is not allowed."):(c=this.pb.is(this.hM)?void 0:
{item:this.pb},this.JL(b,!0),this.Je&&this.WF(b,c)):a.C.warn("Menu._select() called when no menu item is focused and no menu item can be inferred from event param.")},Ny:function(){this.element.remove()},xB:function(){if(!this.Qo){var b=this.Qo={};b[a.Y.jc.gA]=this.Haa.bind(this);b[a.Y.jc.hA]=this.Ny.bind(this);b[a.Y.jc.Er]=this.refresh.bind(this);b[a.Y.jc.fA]=this.vW.bind(this);b[a.Y.jc.uK]=this.oF.bind(this);b[a.Y.jc.sK]=this.eF.bind(this);b[a.Y.jc.tK]=this.nF.bind(this);b[a.Y.jc.rK]=this.Xr.bind(this)}return this.Qo},
Haa:function(){this.bs(this.element);this.px(null)},mI:function(b,c){var d=c.element.element;d.css(b);(d=d.data("oj-menu-position"))&&(d=d.origUsing)&&d(b,c);a.Ga.W3(c)&&(this.nu=this._delay(g.proxy(this.Haa,this),1))},getNodeBySubId:function(a){switch(a&&a.subId){case n:return this.iW?this.hM[0]:null;default:return this._super(a)}},getSubIdByNode:function(a){return this.hM&&this.hM.is(a)?n:this._super(a)},hHa:function(a){if(this.dGa)return!0;switch(a){case "dropDown":return!0;case "sheet":return!1;
case "auto":return s.matches;default:throw Error("Invalid value for Menu openOptions.display: "+a);}},vNa:function(a){h&&(a?this.iW&&(this.Qca().detach().eq(0).prev().removeClass("oj-menu-item-before-divider"),this.iW=!1):(this.Qca().appendTo(this.element).eq(0).prev().addClass("oj-menu-item-before-divider"),this.iW=!0))},Qca:function(){if(!this.gM){var a=g("\x3cli\x3e\x3c/li\x3e",this.document[0]),b=g("\x3ca href\x3d'#'\x3e\x3c/a\x3e",this.document[0]).text(this.options.translations.labelCancel);
g("\x3cspan class\x3d'oj-menu-item-icon oj-component-icon oj-menu-cancel-icon'\x3e\x3c/span\x3e",this.document[0]).prependTo(b);var c=g("\x3cli\x3e\x3c/li\x3e",this.document[0]).addClass("oj-menu-item-cancel oj-menu-item-after-divider").append(b);this.Nfa(a);this.Gfa(b);this.Rfa(c);this.oaa=b;this.hM=c;this.gM=g([a[0],c[0]])}return this.gM},JMa:function(){k&&(this.element.wi(t),this._on({swipedown:function(a){this.bka&&"touch"===a.gesture.pointerType&&(this.JL(a,!0),this.WF(a))}}))},Cq:function(b){var c=
this.Yo;c&&(c.destroy(),delete this.Yo);0>["open","close"].indexOf(b)||(this.Yo=new a.El(this.element,b,"ojMenu",this.ei()))},Ru:function(a,b,c){var d=this.Yo;return d?d.c4(this,a,b,c):!1}});var b=[],d=!1,e=-1<navigator.userAgent.indexOf("Macintosh")&&-1<navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome"),f=a.vc.Hd("oj-menu-config")||{},h="menuItem"===f.sheetCancelAffordance,k="dismiss"===f.sheetSwipeDownBehavior,l=f.dropDownModality||"modeless",m=f.sheetModality||"modal",
p="bottom-"+(f.sheetMarginBottom||0),t=k&&{recognizers:[[c.Swipe,{direction:c.DIRECTION_DOWN}]]},s=function(){var a=f.dropDownThresholdWidth;null==a&&(a="768px");return window.matchMedia("(min-width: "+a+")")}(),n="oj-menu-cancel-command"})();a.U.qb("oj-menu","baseComponent",{properties:{disabled:{type:"boolean"},menuSelector:{type:"string"},openOptions:{type:"Object"},submenuOpenOptions:{type:"Object"}},methods:{destroy:{},getCurrentOpenOptions:{},getSubIdByNode:{},open:{},refresh:{},widget:{}},
extension:{Rg:"ul",nb:"ojMenu"}});a.U.register("oj-menu",{metadata:a.U.getMetadata("oj-menu")})});