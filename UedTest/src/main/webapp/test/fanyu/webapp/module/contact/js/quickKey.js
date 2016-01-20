/*
 * 页面引入这个文件,才可以屏蔽浏览器的快捷键
 * 
*/

var window_quickKey = true; 
function _addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {  
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function _addListenerFn(element,e,fn){
     if(element.addEventListener){
          element.addEventListener(e,fn,false);
     } else {
          element.attachEvent("on" + e,fn);
     }
}
function _preventf8Event(event){
	var e = window.event||event;
	var srcElement = e.srcElement ? e.srcElement : e.target;
	//F6
	if(e.keyCode ==117)
	{
		AiCtFBH.dialOut();//打开拨号页面
		e.keyCode = 0;
        e.returnValue = false;
		return ;
	}
	//F8 
	if(e.keyCode == 119){
		//try{top.AiCtFBH.releaseCall();} catch (e) {}
		e.keyCode = 0;
        e.returnValue = false;
		return ;
	}
	 //屏蔽 Alt+ 方向键 ← 
	if (e.altKey && e.keyCode == 37){
		event.returnValue = false;
		return ;
    }
	//屏蔽 Alt+ 方向键 →
	if (e.altKey && e.keyCode == 39){
		event.returnValue = false;
		return ;
    }
	
	//屏蔽退格删除键  
	if((e.keyCode == 8 && srcElement.tagName != "INPUT"&&srcElement.tagName != "TEXTAREA")  ){
			e.keyCode = 0;
			e.returnValue = false;
			return ;
	}else if(e.keyCode == 8 && srcElement.tagName == "INPUT" && srcElement.getAttribute("readonly")  ){
		e.keyCode = 0;
		e.returnValue = false;
		return ;
	}else if(e.keyCode == 8 && srcElement.tagName == "TEXTAREA" && srcElement.getAttribute("readonly")  ){
		e.keyCode = 0;
		e.returnValue = false;
		return ;
	}
	//屏蔽 F5 刷新键 
	if(e.keyCode == 116){
		e.keyCode = 0;
        e.returnValue = false;
		return ;
	}
	//屏蔽 Ctrl+W
	if (e.ctrlKey && e.keyCode == 87){
          e.returnValue = false; 
          return ;
    }
	//屏蔽 Ctrl+n
    if (e.ctrlKey && e.keyCode == 78){
		e.returnValue = false; 
		return ;
	}
	//Ctrl + R 
	if(e.ctrlKey && e.keyCode == 82){
		e.keyCode = 0;
        e.returnValue = false;
		return ;
	}
	//屏蔽 shift+F10 
    if (e.shiftKey && e.keyCode == 121) {
		e.returnValue = false;
		return ;
	}
    if (e.shiftKey &&e.srcElement.tagName == "A"){
		//这个不管用
		 e.returnValue = false; //屏蔽 shift 加鼠标左键新开一网页 
		 return ;
	}
	//alert(e.altKey+" "+e.keyCode);
	//屏蔽Alt+F4 
    if ((e.altKey) && (e.keyCode == 115)){
        window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");
		return ;
    }
    //	//屏蔽F11 
    //  if (e.keyCode == 122) {
    //      e.keyCode = 0;
    //      e.returnValue = false;
    //		return ;
    //  }	
}

function _preventcontextmenu(){
	var e1 = window.event||event;
	var srcElement1 = e1.srcElement ? e1.srcElement : e1.target;
	if( srcElement1.tagName == "TD" && srcElement1.id == "CallerNo" ){
		e1.returnValue=true;
	}else if( srcElement1.tagName != "INPUT" && srcElement1.tagName != "TEXTAREA" ){
		e1.returnValue=false;
	}
}
function _quickkeyword(){
	if(window_quickKey){
		_addListenerFn(document,"keydown",_preventf8Event);
		_addListenerFn(document,"contextmenu",_preventcontextmenu);//屏蔽鼠标右键 
		//屏蔽F1帮助
		window.onhelp = function(){
			return false
		} 
	}
}

document.onload = _quickkeyword();