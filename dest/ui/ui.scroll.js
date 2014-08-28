define([],function(){function a(a){if(this.wrapper="string"==typeof a.wrapper?$(a.wrapper):a.wrapper,this.scroller="string"==typeof a.scroller?$(a.scroller):a.scroller,!a.wrapper[0]||!a.scroller[0])throw"param error";this.swrapper=this.wrapper,this.wrapper=this.wrapper[0],this.scroller=this.scroller[0],this.scrollerStyle=this.scroller.style,this.options={step:!1,scrollbars:!0,startY:0,scrollOffset:0,scrollType:"y",bounceTime:400,bounceEasing:d.ease.circular,bounce:!0,momentum:!0,bindToWrapper:!0,resizePolling:60,startX:0,startY:0};for(var b in a)this.options[b]=a[b];this.translateZ=" translateZ(0)",this.x=0,this.y=0,this._events={},this.dir="forward",this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}function b(a){var b=document.createElement("div"),c=document.createElement("div");return b.style.cssText="position:absolute;z-index:9999",c.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px","y"==a?(b.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",c.style.height="100%"):(b.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",c.style.width="100%"),b.style.cssText+=";overflow:hidden",b.appendChild(c),b}function c(a,b){this.wrapper="string"==typeof b.el?document.querySelector(b.el):b.el,this.indicator=this.wrapper.children[0],this.scrollType=b.scrollType,this.wrapperStyle=this.wrapper.style,this.indicatorStyle=this.indicator.style,this.scroller=a,this.sizeRatioX=1,this.sizeRatioY=1,this.maxPosX=0,this.maxPosY=0,this.wrapperStyle[d.style.transform]=this.scroller.translateZ,this.wrapperStyle[d.style.transitionDuration]="0ms",this.wrapperStyle.opacity="0"}var d=function(){function a(a){return d===!1?!1:""===d?a:d+a.charAt(0).toUpperCase()+a.substr(1)}var b={},c=document.createElement("div").style,d=function(){for(var a,b=["t","webkitT","MozT","msT","OT"],d=0,e=b.length;e>d;d++)if(a=b[d]+"ransform",a in c)return b[d].substr(0,b[d].length-1);return!1}();return b.getTime=Date.now||function(){return(new Date).getTime()},b.addEvent=function(a,b,c,d){a[0]&&a!=window.top&&(a=a[0]),a.addEventListener(b,c,!!d)},b.removeEvent=function(a,b,c,d){a[0]&&a!=window.top&&(a=a[0]),a.removeEventListener(b,c,!!d)},b.momentum=function(a,b,c,d,e){var f,g,h=a-b,i=Math.abs(h)/c,j=6e-4;return f=a+i*i/(2*j)*(0>h?-1:1),g=i/j,d>f?(f=e?d-e/2.5*(i/8):d,h=Math.abs(f-a),g=h/i):f>0&&(f=e?e/2.5*(i/8):0,h=Math.abs(a)+f,g=h/i),{destination:Math.round(f),duration:g}},$.extend(b,{hasTouch:"ontouchstart"in window}),$.extend(b.style={},{transform:a("transform"),transitionTimingFunction:a("transitionTimingFunction"),transitionDuration:a("transitionDuration"),transitionDelay:a("transitionDelay"),transformOrigin:a("transformOrigin")}),$.extend(b.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2}),$.extend(b.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(a){return a*(2-a)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(a){return Math.sqrt(1- --a*a)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(a){var b=4;return(a-=1)*a*((b+1)*a+b)+1}},bounce:{style:"",fn:function(a){return(a/=1)<1/2.75?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}},elastic:{style:"",fn:function(a){var b=.22,c=.4;return 0===a?0:1==a?1:c*Math.pow(2,-10*a)*Math.sin(2*(a-b/4)*Math.PI/b)+1}}}),b}();return a.prototype={_init:function(){this._initEvents(),this.options.scrollbars&&this._initIndicator()},refresh:function(){this.wrapper.offsetHeight;if(this.wrapperWidth=this.wrapper.clientWidth,this.scrollerWidth=this.scroller.offsetWidth,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.maxScrollX=this.maxScrollX-this.options.scrollOffset,this.maxScrollY=this.maxScrollY-this.options.scrollOffset,this.options.step){if(this.maxScrollX%this.options.step!=0){this.maxScrollX=Math.round(this.maxScrollX/this.options.step)*this.options.step}this.maxScrollY%this.options.step!=0&&(this.maxScrollY=Math.round(this.maxScrollY/this.options.step)*this.options.step)}"y"==this.options.scrollType?this.maxScrollX=0:this.maxScrollY=0,this.endTime=0,this._execEvent("refresh"),this.resetPosition()},_initEvents:function(a){var b=a?d.removeEvent:d.addEvent,c=this.options.bindToWrapper?this.wrapper:window;b(window,"orientationchange",this),b(window,"resize",this),d.hasTouch?(b(this.wrapper,"touchstart",this),b(c,"touchmove",this),b(c,"touchcancel",this),b(c,"touchend",this)):(b(this.wrapper,"mousedown",this),b(c,"mousemove",this),b(c,"mousecancel",this),b(c,"mouseup",this)),b(this.scroller,"transitionend",this),b(this.scroller,"webkitTransitionEnd",this),b(this.scroller,"oTransitionEnd",this),b(this.scroller,"MSTransitionEnd",this)},_start:function(a){if(this.enabled&&(!this.initiated||d.eventType[a.type]===this.initiated)){var b,c=a.touches?a.touches[0]:a;if(this.initiated=d.eventType[a.type],this.moved=!1,this.distY=0,this._transitionTime(),this.startTime=d.getTime(),this.isInTransition){this.isInTransition=!1,b=this.getComputedPosition();var e=Math.round(b.x),f=Math.round(b.y);this._translate(e,f),this._execEvent("scrollEnd")}this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=c.pageX,this.pointY=c.pageY,this._execEvent("beforeScrollStart"),a.preventDefault()}},_move:function(a){if(this.enabled&&d.eventType[a.type]===this.initiated){a.preventDefault();var b,c,e,f,g=a.touches?a.touches[0]:a,h=g.pageX-this.pointX,i=g.pageY-this.pointY,j=d.getTime();if(this.pointX=g.pageX,this.pointY=g.pageY,this.distX+=h,this.distY+=i,e=Math.abs(this.distX),f=Math.abs(this.distY),!(j-this.endTime>300&&10>e&&10>f)){"y"==this.options.scrollType?h=0:i=0,b=this.x+h,c=this.y+i,(b>this.options.scrollOffset||b<this.maxScrollX)&&(b=this.options.bounce?this.x+h/3:b>this.options.scrollOffset?this.options.scrollOffset:this.maxScrollX),(c>this.options.scrollOffset||c<this.maxScrollY)&&(c=this.options.bounce?this.y+i/3:c>this.options.scrollOffset?this.options.scrollOffset:this.maxScrollY),this.moved||this._execEvent("scrollStart"),this.moved=!0;var k=document.activeElement;if("input"==k.nodeName.toLowerCase())return k.blur(),this.disable(),void setTimeout($.proxy(function(){this.enable()},this),250);this.dir=b>this.x||c>this.y?"forward":"back",this._translate(b,c,!0)}}},_end:function(a){if(this.enabled&&d.eventType[a.type]===this.initiated){var b,c,e=(a.changedTouches?a.changedTouches[0]:a,d.getTime()-this.startTime),f=Math.round(this.x),g=Math.round(this.y),h=(Math.abs(f-this.startX),Math.abs(g-this.startY),Math.abs(f-this.startX)),i=Math.abs(g-this.startY),j=0,k="";if(this.isInTransition=0,this.initiated=0,this.endTime=d.getTime(),!this.resetPosition(this.options.bounceTime)){if(this.scrollTo(f,g),!this.moved)return void this._execEvent("scrollCancel");if(this.options.momentum&&300>e&&(b=d.momentum(this.x,this.startX,e,this.maxScrollX,this.options.bounce?this.wrapperWidth:0),c=d.momentum(this.y,this.startY,e,this.maxScrollY,this.options.bounce?this.wrapperHeight:0),f=b.destination,g=c.destination,j="y"==this.options.scrollType?Math.max(0,c.duration):Math.max(b.duration,0),this.isInTransition=1),h=Math.abs(f-this.startX),i=Math.abs(g-this.startY),this.options.step){var l=f,m=g,n=Math.abs(l),o=Math.abs(m),p=l>0?1:-1,q=m>0?1:-1,r=this.options.step-h%this.options.step,s=this.options.step-i%this.options.step;"forward"==this.dir?(l=l>0?n+r:n-r,m=m>0?o+s:o-s):(l=l>0?n-r:n+r,m=m>0?o-s:o+s),l%this.options.step!=0&&(l=Math.round(l/this.options.step)*this.options.step),m%this.options.step!=0&&(m=Math.round(m/this.options.step)*this.options.step),l*=p,m*=q,j=this.options.stepTime||200,f=l,g=m,k=this.options.bounceEasing}return f!=this.x||g!=this.y?((f>this.options.scrollOffset||f<this.maxScrollX||g>this.options.scrollOffset||g<this.maxScrollY)&&(k=d.ease.quadratic),0==j&&(j=1),void this.scrollTo(f,g,j,k)):void this._execEvent("scrollEnd")}}},_resize:function(){var a=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){a.refresh()},this.options.resizePolling)},_transitionTimingFunction:function(a){this.scrollerStyle[d.style.transitionTimingFunction]=a,this.indicator&&this.indicator.transitionTimingFunction(a)},_transitionTime:function(a){a=a||0,this.scrollerStyle[d.style.transitionDuration]=a+"ms",this.indicator&&this.indicator.transitionTime(a)},getComputedPosition:function(){var a,b,c=window.getComputedStyle(this.scroller,null);return c=c[d.style.transform].split(")")[0].split(", "),a=+(c[12]||c[4]),b=+(c[13]||c[5]),{x:a,y:b}},_initIndicator:function(){var a=b("y"==this.options.scrollType?"x":"y");this.wrapper.appendChild(a),this.indicator=new c(this,{el:a,scrollType:this.options.scrollType}),this.on("scrollEnd",function(){this.indicator.fade()});var d=this;this.on("scrollCancel",function(){d.indicator.fade()}),this.on("scrollStart",function(){d.indicator.fade(1)}),this.on("beforeScrollStart",function(){d.indicator.fade(1,!0)}),this.on("refresh",function(){d.indicator.refresh()})},_translate:function(a,b){"y"==this.options.scrollType?a=0:b=0,this.scrollerStyle[d.style.transform]="translate("+a+"px,"+b+"px)"+this.translateZ,this.x=a,this.y=b,this.options.scrollbars&&this.indicator.updatePosition()},resetPosition:function(a){var b=this.x,c=this.y;return a=a||0,"x"==this.options.scrollType?(this.x>this.options.scrollOffset&&(b=this.options.scrollOffset),this.x<this.maxScrollX&&(b=this.maxScrollX)):(this.y>this.options.scrollOffset&&(c=this.options.scrollOffset),this.y<this.maxScrollY&&(c=this.maxScrollY)),"x"==this.options.scrollType&&b==this.x||"y"==this.options.scrollType&&c==this.y?!1:(this.scrollTo(b,c,a,this.options.bounceEasing),!0)},scrollTo:function(a,b,c,e){e=e||d.ease.circular,this.isInTransition=c>0,(!c||e.style)&&(this._transitionTimingFunction(e.style),this._transitionTime(c),this._translate(a,b))},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},on:function(a,b){this._events[a]||(this._events[a]=[]),this._events[a].push(b)},_execEvent:function(a){if(this._events[a]){var b=0,c=this._events[a].length;if(c)for(;c>b;b++)this._events[a][b].call(this)}},destroy:function(){this.TIMERRES&&clearInterval(this.TIMERRES),this._initEvents(!0),this._execEvent("destroy"),this.indicator&&this.indicator.destroy()},_transitionEnd:function(a){a.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this._execEvent("animatEnd"),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},handleEvent:function(a){switch(a.type){case"touchstart":case"mousedown":this._start(a);break;case"touchmove":case"mousemove":this._move(a);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(a);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(a)}}},c.prototype={transitionTime:function(a){a=a||0,this.indicatorStyle[d.style.transitionDuration]=a+"ms"},transitionTimingFunction:function(a){this.indicatorStyle[d.style.transitionTimingFunction]=a},refresh:function(){this.transitionTime();this.wrapper.offsetHeight;"y"==this.scrollType?(this.wrapperHeight=this.wrapper.clientHeight,this.indicatorHeight=Math.max(Math.round(this.wrapperHeight*this.wrapperHeight/(this.scroller.scrollerHeight||this.wrapperHeight||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px",this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.sizeRatioY=this.scroller.maxScrollY&&this.maxPosY/this.scroller.maxScrollY):(this.wrapperWidth=this.wrapper.clientWidth,this.indicatorWidth=Math.max(Math.round(this.wrapperWidth*this.wrapperWidth/(this.scroller.scrollerWidth||this.wrapperWidth||1)),8),this.indicatorStyle.width=this.indicatorWidth+"px",this.maxPosX=this.wrapperWidth-this.indicatorWidth,this.sizeRatioX=this.scroller.maxScrollX&&this.maxPosX/this.scroller.maxScrollX),this.updatePosition()},destroy:function(){this.wrapper.remove()},updatePosition:function(){var a="x"==this.scrollType&&Math.round(this.sizeRatioX*this.scroller.x)||0,b="y"==this.scrollType&&Math.round(this.sizeRatioY*this.scroller.y)||0;this.x=a,this.y=b,this.indicatorStyle[d.style.transform]="translate("+a+"px,"+b+"px)"+this.scroller.translateZ},fade:function(a,b){if(!b||this.visible){var c=this;clearTimeout(this.fadeTimeout),this.fadeTimeout=null;var e=a?250:500,f=a?0:300;a=a?"1":"0",this.wrapperStyle[d.style.transitionDuration]=e+"ms",this.fadeTimeout=setTimeout(function(a){c.wrapperStyle.opacity=a,c.visible=+a}(a),f)}}},a.utils=d,a});