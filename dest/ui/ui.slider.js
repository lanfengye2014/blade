define(["UIView",getAppUITemplatePath("ui.slider"),"UIScroll"],function(a,b,c){return _.inherit(a,{propertys:function($super){$super(),this.template=b,this.datamodel={className:"",curClass:"current",data:[],index:0},this.itemNum=0,this.displayNum=5,this.animatTime=100,this.momentum=!1,this.itemWidth=0,this.itemHeight=0,this.scrollWidth=0,this.scrollOffset=0,this.scroll=null,this.events={"click li":"itemClickAction"},this.changed=function(a){0},this.itemClick=function(a){0}},itemClickAction:function(a){var b=$(a.currentTarget),c=b.attr("data-index");this.setIndex(c),this.itemClick.call(this,this.getSelected())},initialize:function($super,a){$super(a)},resetPropery:function(){this._resetNum(),this._resetIndex()},_resetIndex:function(){if(this.datamodel.id)for(var a=0,b=this.datamodel.data.length;b>a;a++)if(this.datamodel.id==this.datamodel.data[a].id){this.datamodel.index=a;break}},_resetNum:function(){this.itemNum=this.datamodel.data.length},initElement:function(){this.swrapper=this.$el,this.scroller=this.$(".ul-list")},initSize:function(){var a=this.scroller.find("li").eq(0),b=(a.offset(),this.$el.parent()),c=b.height();this.wrapeWidth=this.swrapper.width(),this.itemWidth=parseInt(this.wrapeWidth/this.displayNum),this.scroller.find("li").width(this.itemWidth),this.scroller.width(this.itemWidth*this.itemNum),this.itemHeight=this.scroller.height(),c>this.itemHeight&&(this.itemHeight=c),this.scroller.find("li").height(this.itemHeight),this.swrapper.css({height:this.itemHeight+"px"}),this.scrollOffset=(this.displayNum-1)/2*this.itemWidth},reload:function(a){_.extend(this.datamodel,a),this.scroll&&(this.scroll.destroy(),this.scroll=null),this.refresh()},_initScroll:function(){this.scroll&&this.scroll.destroy(),this.scroll=new c({scrollbars:!1,scrollOffset:this.scrollOffset,scrollType:"x",step:this.itemWidth,wrapper:this.swrapper,bounceTime:200,momentum:this.momentum,scroller:this.scroller}),this.scroll.on("scrollEnd",$.proxy(function(){this.setIndex(this.getIndexByPosition(),!0)},this)),this.scroll.on("scrollCancel",$.proxy(function(){this.setIndex(this.getIndexByPosition(),!1)},this)),$(window).off(".silder"+this.id),$(window).on("resize.silder"+this.id,$.proxy(function(){this.refresh()},this))},adjustPosition:function(a){if(this.scroll){var b,c=this.datamodel.index,d=0;b=this.itemWidth*c*-1+this.scrollOffset,a&&(d=this.animatTime),this.scroll.scrollTo(b,0,d)}},resetCss:function(){this.$("li").removeClass("current"),this.$('li[data-index="'+this.datamodel.index+'"]').addClass("current")},resetIndex:function(){this.setIndex(this.datamodel.index,!0,!0)},getIndexByPosition:function(){var a=this.scroll.x-this.scrollOffset,b=Math.abs(a)/this.itemWidth;return Math.round(b)},getIndex:function(){return this.datamodel.index},setIndex:function(a,b,c){"undefined"==typeof b&&a==this.datamodel.index&&(b=!0);var d=this.datamodel.index!=a;this.datamodel.index=a,b||this.adjustPosition(!0),this.resetCss(),c!==!0&&d&&this.changed&&this.changed.call(this,this.getSelected())},setId:function(a){if(a){var b,c,d=-1;for(b=0,c=this.datamodel.data.length;c>b;b++)if(this.datamodel.data[b].id==a){d=b;break}-1!=d&&this.setIndex(d,!1)}},getId:function(){return this.getSelected().id},getSelected:function(){return this.datamodel.data[this.datamodel.index]},addEvent:function($super){$super(),this.on("onCreate",function(){this.$el.addClass("cui-roller-bd"),this.$el.addClass("cui-roller")}),this.on("onShow",function(){this.initSize(),this._initScroll(),this.adjustPosition(),this.resetCss(),this.resetIndex()},1),this.on("onHide",function(){this.scroll&&(this.scroll.destroy(),this.scroll=null,$(window).off(".silder"+this.id))})}})});