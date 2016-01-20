//控制按钮名称、 状态是否可点
AiCtFrame.FrameButtonStyle = {
	//状态按钮对象
	buttonElements:{
		btnCtLogin:null,
		btnCtFree:null,
		btnCtACW:null,
		btnCtCallOut:null,
		btnCtRelease:null,
		btnCtHold:null,
		btnCtPwdVerify:null,
		btnCtIntegrate:null,
		btnCtAfterCallStatus:null
	},
	//名称对象
	captionElements:{
		btnCtLogin:null,
		btnCtHold:null
	},
	
	//按钮是否可点控制，默认给按钮样式 获取 <li><a>d</a></li> 对<a>标签动态写样式
	buttonEnable : function(btnName,btnEnable) {
		//alert(btnName+" "+btnEnable);
		if (!this.buttonElements[btnName]){
			try{
				
				this.buttonElements[btnName]=$("#" + arguments[0] + " a").eq(0);
				
				
			}catch(e)
			{
					alert("buttonEnable="+e.message);
			}
		}
		if (btnEnable){
			this.buttonElements[btnName].removeClass("disabled");
		}else
		{
			
			this.buttonElements[btnName].addClass("disabled");
			
		}
	},
	//批量设置按钮状态
	resetButtonEnable : function(btns, enabled) {
		for (var i = 0; i < btns.length; i++) {
			this.buttonEnable(btns[i], enabled);
		}
	},
	
	//批量设置按钮状态,根据北京新方按钮设置
	resetButtonEnableEvent : function(btns, enabled){
		var bjxfBtnStatus = btns.split('|');
		for (var i = 0; i < bjxfBtnStatus.length; i++) {		
			switch (bjxfBtnStatus[i])
   		{
		   case "0": //后续态
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_ACW, enabled)
		     break
		   case "1"://示忙
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_BUSY, enabled)
		     break
		   case "2"://示闲
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_FREE, enabled)
		     break
		   case "3"://呼出
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_DIALOUT, enabled)
		     break
		   case "4"://保持
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_HOLD, enabled)
		     break
		   case "6"://挂断
		     this.buttonEnable(AiCtFrame.BUTTONS.BTN_RELEASE, enabled)
		     break
			}
		}
	},
	//按钮全部置为灰色
	functionLimited : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS, AiCtFrame.BUTTONS.BTN_HOLD, AiCtFrame.BUTTONS.BTN_RELEASE, AiCtFrame.BUTTONS.BTN_PWDVERIFY, AiCtFrame.BUTTONS.BTN_INTEGETATE, AiCtFrame.BUTTONS.BTN_ACW, AiCtFrame.BUTTONS.BTN_FREE, AiCtFrame.BUTTONS.BTN_LOGIN], false);
	},
	//设置签入、签出标志
	setSignCaption : function(signFlag) {
		try{
			if (this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN]==null){
					this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN]=$("#" + AiCtFrame.BUTTONS.BTN_LOGIN + " span")[1];
			}
			if (signFlag) {
				this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN].innerText=(AiCtFrame.CAPTIONS.CAPTION_LOGOUT);
			} else {
				this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN].innerText=(AiCtFrame.CAPTIONS.CAPTION_LOGIN);
			}
		}catch(e)
		{
			alert("setSignCaption="+e.message);
		}
	},
	//签入按钮控制
	onSignIn : function() {
			try{
			this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_HOLD, AiCtFrame.BUTTONS.BTN_RELEASE], false);
			this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_LOGIN], true);
		}catch(e)
		{
			alert(e.message);
		}
	},
	//整理、空闲 按钮切换
	setAgentCallStatusCaption : function(flag) {
			if (this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS]==null){
				this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS]=$("#" + AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS + " span")[1];
			}
			if (flag) {
				this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS].innerText=(AiCtFrame.CAPTIONS.CAPTION_AFTERCALL_FREE);
			} else {
				this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS].innerText=(AiCtFrame.CAPTIONS.CAPTION_AFTERCALL_ACW);
			}
	},
	//空闲按钮控制
	onSayFree : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_RELEASE,AiCtFrame.BUTTONS.BTN_FREE,AiCtFrame.BUTTONS.BTN_HOLD,AiCtFrame.BUTTONS.BTN_PWDVERIFY], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_ACW], true);
	},
	// 整理态
	onACW : function(flag) {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_RELEASE,AiCtFrame.BUTTONS.BTN_HOLD,AiCtFrame.BUTTONS.BTN_ACW], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_FREE], true);
		
	},
	//签出
	onSignOut : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_FREE,AiCtFrame.BUTTONS.BTN_ACW,AiCtFrame.BUTTONS.BTN_DIALOUT, AiCtFrame.BUTTONS.BTN_HOLD, AiCtFrame.BUTTONS.BTN_RELEASE, AiCtFrame.BUTTONS.BTN_PWDVERIFY,AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_ACW], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_INTEGETATE], true);
	},
	//来话
	onBelling:function(){
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_FREE,AiCtFrame.BUTTONS.BTN_ACW,AiCtFrame.BUTTONS.BTN_DIALOUT, AiCtFrame.BUTTONS.BTN_HOLD], false);		
	},
	//应答
	onAnswer : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_ACW,AiCtFrame.BUTTONS.BTN_FREE,AiCtFrame.BUTTONS.BTN_LOGIN], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_HOLD, AiCtFrame.BUTTONS.BTN_RELEASE], true);
	},
	//挂机
	onRelease : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_HOLD,AiCtFrame.BUTTONS.BTN_RELEASE], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_LOGIN], true);
		//重新设置保持按钮
		AiCtFrame.FrameButtonStyle.setHoldCaption(false);
	},
	
	onHold : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT,AiCtFrame.BUTTONS.BTN_RELEASE, AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_ACW,AiCtFrame.BUTTONS.BTN_FREE], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_HOLD], true);
	},
		// 保持状态下挂机重置标题为保持
	getHoldCaption : function() {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD]==null){
				this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD]=$("#" + AiCtFrame.BUTTONS.BTN_HOLD + " span")[1];
		}
		return this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD].innerText;
	},
	//设置保持名称
	setHoldCaption : function(holdFlag) {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD]==null){
				this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD]=$("#" + AiCtFrame.BUTTONS.BTN_HOLD + " span")[1];
		}
		if (holdFlag) {
			this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD].innerText=(AiCtFrame.CAPTIONS.CAPTION_GETHOLD);
		} else {
			this.captionElements[AiCtFrame.BUTTONS.BTN_HOLD].innerText=(AiCtFrame.CAPTIONS.CAPTION_HOLD);
		}
	},
	// 重置签入签出状态
	getSignCaption : function() {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN]==null){
				this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN]=$("#" + AiCtFrame.BUTTONS.BTN_LOGIN + " span")[1];
		}
		return this.captionElements[AiCtFrame.BUTTONS.BTN_LOGIN].innerText;
	},
	
	



	onHoldTalk : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_DIALOUT, AiCtFrame.BUTTONS.BTN_HOLD], false);
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_MUTE, AiCtFrame.BUTTONS.BTN_RELEASE, AiCtFrame.BUTTONS.BTN_PWDVERIFY], true);
		this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_ANSWER, AiCtFrame.CT_MENUS.MENU_HOLD_END, AiCtFrame.CT_MENUS.MENU_MUTE_END, AiCtFrame.CT_MENUS.MENU_DIAL_OUT, AiCtFrame.CT_MENUS.MENU_HOLD], false);
		this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_RELEASE, AiCtFrame.CT_MENUS.MENU_MUTE, AiCtFrame.CT_MENUS.MENU_DTMF, AiCtFrame.CT_MENUS.MENU_TRANS_OUT, AiCtFrame.CT_MENUS.MENU_VERIFY_PWD, AiCtFrame.CT_MENUS.MENU_INTEGRATE, AiCtFrame.CT_MENUS.MENU_HELP_OUT, AiCtFrame.CT_MENUS.MENU_THREE_CONF], true);
	},
	onDialing : function() {
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS,AiCtFrame.BUTTONS.BTN_LOGIN,AiCtFrame.BUTTONS.BTN_FREE,AiCtFrame.BUTTONS.BTN_ACW,AiCtFrame.BUTTONS.BTN_DIALOUT, AiCtFrame.BUTTONS.BTN_HOLD], false);		
		this.resetButtonEnable([AiCtFrame.BUTTONS.BTN_RELEASE], true);
	},

	// 休息
	onRest : function(flag) {
		if (flag) {
			this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_REST], false);
			this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_REST_END], true);
		} else {
			this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_REST_END], false);
			this.resetMenuEnable([AiCtFrame.CT_MENUS.MENU_REST], true);
		}
	},



	// 主框架上有铃无铃标题变更
	getBellCaption : function() {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_BELL]==null){
			this.captionElements[AiCtFrame.BUTTONS.BTN_BELL]=document.getElementById(AiCtFrame.BUTTONS.BTN_BELL);
		}
		return this.captionElements[AiCtFrame.BUTTONS.BTN_BELL].innerText;
	},
	setBellCaption : function(flag) {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_BELL]==null){
			this.captionElements[AiCtFrame.BUTTONS.BTN_BELL]=document.getElementById(AiCtFrame.BUTTONS.BTN_BELL);
		}
		if (flag) {
			this.captionElements[AiCtFrame.BUTTONS.BTN_BELL].innerText=(AiCtFrame.CAPTIONS.CAPTION_BELL_TRUE);
		} else {
			this.captionElements[AiCtFrame.BUTTONS.BTN_BELL].innerText=(AiCtFrame.CAPTIONS.CAPTION_BELL_FALSE);
		}
	},
	// 主框架上示闲和整理态标题变更
	getAfterCallStatusCaption : function() {
		if (this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS]==null){
			this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS]=$("#" + AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS + " span")[1];
		}
		return this.captionElements[AiCtFrame.BUTTONS.BTN_AFTERCALL_STATUS].innerText;
	},
	
	setVolume : function(volume) {
		try {
			$("#" + AiCtFrame.BUTTONS.BTN_VOLUME).text("音量(" + volume + ")");
		} catch (err) {
		}
	},

	// 保持MENU的状态
	menu_status : null,
	// 开始菜单检查接续菜单是否可用
	isMenuDisabled : function(menu_id, menu_title) {
		// ctlogger("isMenuDisabled
		// menu_id="+menu_id+",menu_title="+menu_title);
		if (menu_id == AiCtFrame.CT_MENUS.MENU_BELL_TRUE) {
			return AiCtFBH.haveBell();
		}
		if (menu_id == AiCtFrame.CT_MENUS.MENU_BELL_FALSE) {
			return !AiCtFBH.haveBell();
		}

		if (this.menu_status == null) {
			this.initMenuEnable();
		}
		if (this.menu_status['M' + menu_id] != undefined) {
			return !this.menu_status['M' + menu_id];
		} else {
			return false;
		}
	},
	initMenuEnable : function() {
		this.menu_status = {};
		for (var m in AiCtFrame.CT_MENUS) {
			this.menu_status['M' + AiCtFrame.CT_MENUS[m]] = false;
		}
	},
	// 保存菜单状态
	resetMenuEnable : function(menus, enabled) {
		if (this.menu_status == null) {
			this.initMenuEnable();
		}
		for (var i = 0; i < menus.length; i++) {
			this.menu_status['M' + menus[i]] = enabled;
		}
	}
}

//客户端日志管理
var LogManager = {
	logPath : "log\\zyzxCnic_{yyyymmdd}_",
	logLever :"error",
	logLeaveDays:"7"
}
//日志管理方法
LogManager.proxyMethod ={
	ctlogger : function(logStr)
	{
		try {
		logStr = "[" + AiSoftPhone.busiAgentObj.userName + "] " + logStr;
		CtHelper.WriteLogFile(logStr);
	} catch (err) {
		//alert("222222222"+err.message);
	}
	},
	ctmessage : function (message, islogger) {
	try {
		CtHelper.AlertMessage(message);
		if (islogger)
			ctlogger(message);
	} catch (err) {
	}
},
	cterror :function (errdesc) {
	try {
		CtHelper.AlertError(errdesc);
	} catch (err) {
	}
}
}
//XML 字符串工具
var XmlHelper ={
	getJsonFromxml : function(xmlData)
	{
		var retStr;
		try{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");  
			xmlDoc.async="false";  
			xmlDoc.loadXML(xmlData);
			var agentInfo =xmlDoc.getElementsByTagName("agent")[0];
			var callCount =  agentInfo.getAttribute("callCount");
			var avCallTime =  agentInfo.getAttribute("avCallTime");
			//alert("callCount"+callCount+"avCallTime"+avCallTime);
			var totalCustNum =0;
			var totalFreeNum = 0;
		    var serviceLen = xmlDoc.getElementsByTagName("service");
		    for(var i=0;i<serviceLen.length;i++)
		    {
		  		totalCustNum = eval(parseInt(totalCustNum) + parseInt(serviceLen[i].getAttribute("queueNum")));
		  	 	totalFreeNum = eval(parseInt(totalFreeNum) + parseInt(serviceLen[i].getAttribute("workNum")));
		    }
		    LogManager.proxyMethod.ctlogger("----xml----"+avCallTime+" callCount="+callCount+" totalCustNum="+totalCustNum+" totalFreeNum="+totalFreeNum);
		    retStr ={"callCount":callCount,"avCallTime":avCallTime,"totalCustNum":totalCustNum,"totalFreeNum":totalFreeNum};
			}catch(e){  
				retStr =null;
				alert(e.message);
			}
			return retStr;
	}
}
var AiCtUtil = {
	syncDate:function(){
		try{
			CtHelper.SyncDate();
		}catch(err){}
	},
	getCurrentTime : function() {
		try {
			return CtHelper.DateNow();
		} catch (err) {
			var date = new Date();
			return this.getFomatTime(date);
		}
	},
	/**
	 * 缓存数据
	 */
	setValue : function(group, key, value) {
		try {
			CtHelper.SetValue(group, key, value);
		} catch (err) {
		}
	},
	getValue : function(group, key) {
		try {
			return CtHelper.GetValue(group, key);
		} catch (err) {
			return ""
		}
	},
	hasValue : function(group, key) {
		try {
			return CtHelper.HasValue(group, key);
		} catch (err) {
			return false;
		}
	},
	getPcName : function() {
		try {
			return CtHelper.PcName;
		} catch (err) {
		}
	},
	getIpAddress : function() {
		try {
			return CtHelper.IpAddress(";", true);
		} catch (err) {
		}
	}
}
function outCallShowDom(domTag){
	if($(domTag).hasClass("fn-hide")){
		$(domTag).removeClass("fn-hide");
		$("#J_contact_left").css("height","120px");
	}else{
		$(domTag).addClass("fn-hide");
		$("#J_contact_left").css("height","");
	}
}