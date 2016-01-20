$(function(){
	//调用计算主框架的高度
	setWindow();

	//窗口变化时重新执行计算
	$(window).resize(function(){
		setWindow();
	});

	//调用点击折叠
	toggleLeft();

	//changeStyle();	
});
	

//计算主框架的高度
function setWindow(){
	var headerHeight=$(".header").height();
	var footerHeight=$(".footer").height();
	var menuHeight=$(".menu").height();
	var windowHeight=$(window).height();
	var centerHeight=windowHeight-headerHeight-menuHeight-footerHeight;
	$(".left").height(centerHeight);
	$(".right").height(centerHeight);
	$(".leftInner").height(centerHeight);
	$(".middle").height(centerHeight);
	//$(".wrapper").height(windowHeight-headerHeight);
	var liNum=$("#mainLeft ul li").length;
	var liHeight=$("#mainLeft ul li p b").height();
	var leftContentHeight=$("#mainLeft").height()-liNum*liHeight;
	$(".leftContent").height(leftContentHeight);
}

//点击折叠
function toggleLeft(){	
	$(".middle").click(function(){
		$(".left").toggleClass("leftClose");
		$(".right").toggleClass("rightOpen");
	});
}

//样式切换
function changeStyle(){
	//点击导航进行切换显示
	var menuTop=$(".menuTop");
	var meunBtm=$(".menuBottom");
	
	menuTop.find("li").each(function(i){
		var liThis=$(this);
		liThis.live("click",function(){
			$(this).addClass("current").siblings().removeClass("current");
			meunBtm.eq(i).css({"display":"block"}).siblings(".menuBottom").css({"display":"none"});
			
		});
	});

	//点击追加当前样式
	var menu=$(".menu");
	menu.children(".menuBottom").children("ul").children("li").removeClass("current");
	menu.children(".menuBottom").children("ul").children("li").click(function(){
		$(this).addClass("current").siblings("li").removeClass("current");
		$(this).parents(".menuBottom").siblings(".menuBottom").children("ul").children("li").removeClass("current");
	});
}

//点击滚动文字信息	
function scrollWord(obj){
	//ul可见区域的宽度
	var ulTrue=obj.width()-obj.find(".arrow").width();
	//所有li的总宽度
	var liWidth=0;
	var len=obj.children("ul").children("li").length;
	for(var i=0;i<len;i++){
		liWidth+=obj.children("ul").children("li").eq(i).outerWidth(true);
	}
	//li的默认隐藏宽度
	var selfWidth=liWidth-ulTrue;
	//li的索引值
	var index=0;
	//向左偏移的li的值
	var leftValue=0;
	//向左偏移的总值
	var leftValueSort=0;

	if(liWidth<ulTrue){
		obj.find(".al").css({"visibility":"hidden"});
		obj.find(".ar").css({"visibility":"hidden"});
	}else{
		obj.find(".al").css({"visibility":"hidden"});
		obj.find(".ar").css({"visibility":"visible"});
	}
	//点击按钮向右移动
	obj.find(".ar").bind("click",function(){
		obj.find(".al").css({"visibility":"visible"});
		if(leftValueSort>=selfWidth){
			leftValueSort=selfWidth;
			obj.find(".ar").css({"visibility":"hidden"});
		}else{
			leftValue=obj.children("ul").children("li").eq(index).outerWidth(true);
			leftValueSort+=leftValue;
			if(!obj.children("ul").is(":animated")){
				obj.children("ul").animate({"left":"-="+leftValue},100);
			}
			index++;
		}
	});

	//点击按钮向左移动
	obj.find(".al").bind("click",function(){		

		if(leftValueSort<=0){
			leftValueSort=0;
			obj.find(".ar").css({"visibility":"visible"});
			obj.find(".al").css({"visibility":"hidden"});
		}else{
			leftValue=obj.children("ul").children("li").eq(index-1).outerWidth(true);
			leftValueSort-=leftValue;
			if(!obj.children("ul").is(":animated")){
				obj.children("ul").animate({"left":"+="+leftValue},100);
			}
			index--;
		}
	});

	//处理三级菜单显示
	var liObj=obj.children("ul").children("li");
	liObj.each(function(){
		$(this).hover(function(){
			//alert($(this).get(0).nodeName);
			if($(this).children("ul.menuLev3").children("li").length>0){
				$(this).children("ul.menuLev3").slideDown("fast");
				$(this).children("iframe").css({"display":"block"});
			}else{
				$(this).children("ul.menuLev3").css({"display":"none"});
			}
			
		},function(){
			$(this).children("ul.menuLev3").slideUp("fast");
			$(this).children("iframe").css({"display":"none"});
		});
	});

}