
var AiCtConst = {
	DEFAULT_QUEUE_WAIT_TIMER : 5, // 查询等待数时间间隔(秒)
	// 系统支持的接入码
	ACCESS_CODE : ['10085'],
	//签入签出状态
	SIGNINOUT :{"IN":"1","OUT":"2"},
	//签入签出状态
	CALLMODETYPE :{"INBOUND":"0","OUTBOUND":"2"},
	RECORD_URL : "http://211.138.30.226:9999/media/555555/",
	APPSYSID : "1001",
	CURCUSTID :"",//用户ID
	
	/**
	 * 接触渠道
	 */
	CONTACT_CHANNEL : {
		DS10085 : {ID : 1001,NAME : '10085',ACCESSCODE : "10085"}
	},
	/**
	 * 座席工作状态类型
	 */
	AGENT_STATUS : {
		NONE : -1,
		SINGOUT : 0, // 签出
		FREE : 1, // 空闲
		BUSY : 2, // 示忙
		ACW : 3, // 事后整理
		REST : 4, // 休息
		TALK : 5, // 通话
		HOLD : 6, // 保持
		HOLDDIALING : 7, // 保持中拨号
		CONSULT : 8, // 咨询
		CONSULTDIALING : 9, // 咨询拨号
		CONF : 10, // 会议
		CONFDIALING : 11, // 会议拨号
		DIALINGOUT : 12, // 外拨
		TRANSDIALING : 13, // 转接
		CONSULTTRANSDIALING : 14, // 咨询中转接拨号
		CHECKID : 15, // 身份验证
		MUTE : 16, // 静音
		BELLING : 17, // 振铃
		STUDY : 18, // 学习
		HOLDTALK : 19, // 求助
		LISTEN : 20, 	// 监听
		INSERT : 21, 	// 插入
		PLAYFILE : 22, 	// 播放录音文件
		ADJUST : 23		// 调整态
	},
	AGENT_CUR_STATUS : 0,
	AGENT_CUR_OPERATOR : 0, //1、转IVR挂机 2、转队列挂机 3、转工号挂机
	/**
	 * 华为接续控件座席状态值
	 */
	AGENT_OP_STATUS : ['座席签出', '座席签入', '空闲', '示忙', '通话态', '等待应答', '等待连接成功的消息', '话务员拆线', '请求释放', '呼出时等被叫振铃', '三方通话', '座席通道坏或座席死机', '座席通道或座席已恢复', '人工转自动', '被监听或插入', '停止被监听或插入', '被录音', '停止被录音', '被监视', '停止被监视', '监听或插入', '停止监听或插入', '放音', '停止放音', '监视', '停止监视', '座席休假(休息)', '座席工作态', '监听,插入呼叫', '放音', '停止放音', '强制签出', '强制示闲',
			'强制示忙'],
	MAKECALLSTATUS:{
		CALLOUTINIT:0,
		CALLOUTSELF:1,
		CALLOUTDIAL:2,
		CALLOUTRING:3,
		CALLOUTCONN:4,
		CALLOUTFAIL:5
	}
}

var AiCtFrame = {
	ELS : {
		STATUS_TEXT : 'agentStatus',
		STATUS_TIMER : 'agentStatusTime',
		CALLINFO_TALKING_TIMER : 'CallDuration',
		CALLINFO_ACW_TIMER : 'WorkDuration',
		QUEUE_WAIT_NUM : "QueueWaitNum",
		CUST_LEVEL : '#ci_input_CustomerGrade',
		CUST_BRAND : '#ci_input_CustomerBrand'
	},
	CAPTIONS : {
		CAPTION_HOLD : '保持通话',
		CAPTION_GETHOLD : '取保持',
		CAPTION_AFTERCALL_ACW : '整理',
		CAPTION_AFTERCALL_FREE : '空闲',
		CAPTION_LOGIN : '签入',
		CAPTION_LOGOUT : '签出',
		CAPTION_AUTOANSWER_TRUE : '自答',
		CAPTION_AUTOANSWER_FALSE : '人工',
		CAPTION_BELL_TRUE : '有铃',
		CAPTION_BELL_FALSE : '无铃'
	},

	BUTTONS : {
		BTN_LOGIN : 'btnCtLogin',
		BTN_LOGOUT : 'btnCtLogout',
		BTN_FREE : 'btnCtFree',
		BTN_BUSY : 'btnCtBusy',
		BTN_ACW : 'btnCtACW',
		BTN_DIALOUT : 'btnCtCallOut',
		BTN_RELEASE : 'btnCtRelease',
		BTN_HOLD : 'btnCtHold',
		BTN_MUTE : 'btnCtMute',
		BTN_PWDVERIFY : 'btnCtPwdVerify',
		BTN_INTEGETATE : 'btnCtIntegrate',
		BTN_AFTERCALL_STATUS : 'btnCtAfterCallStatus',
		BTN_BELL : 'btnCtBell',
		BTN_VOLUME : 'changvolume'
	},
	callType :"", //呼入 0 呼出2 咨询5
	hangUpPageType :{
		hangUpPageCODE : '1',
		hangUpPageURL : '',
		hangUpOrderId : ''
	},
	curMakeCALLRet : 0,
	bussinessData :{
		CMPGN_ID:'',
		phoneId:'',
		BGN_CNTMNG_TIME:'',
		END_CNTMNG_TIME:'',
		CNVST_RSLT_CD:'',
		CNTMNG_TYPE_CD:'',
		BEGIN_SALE_TIME:''
	},
	ivrTransferData :{
		contactid:2233,
		ivrtrace:123 ,
		preNo:3456
	}
}
/**
 * AiCtFrame.AgentStatusTimer 用于处理状态时长的显示和超时控制
 */
AiCtFrame.AgentStatusTimer = {
	arrayAgentStatusType : [{
		index : 0,
		name : "签出",
		color : "white"
	}, {
		index : 1,
		name : "空闲",
		color : "white"
	}, {
		index : 2,
		name : "示忙",
		color : "white"
	}, {
		index : 3,
		name : "整理",
		color : "white"
	}, {
		index : 4,
		name : "休息",
		color : "white"
	}, {
		index : 5,
		name : "通话",
		color : "white"
	}, {
		index : 6,
		name : "存在保持呼叫,请处理",
		color : "white"
	}, {
		index : 7,
		name : "保持中拨号",
		color : "white"
	}, {
		index : 8,
		name : "咨询",
		color : "white"
	}, {
		index : 9,
		name : "咨询拨号",
		color : "white"
	}, {
		index : 10,
		name : "会议",
		color : "white"
	}, {
		index : 11,
		name : "会议拨号",
		color : "white"
	}, {
		index : 12,
		name : "呼出",
		color : "white"
	}, {
		index : 13,
		name : "转接",
		color : "white"
	}, {
		index : 14,
		name : "咨询中转接拨号",
		color : "white"
	}, {
		index : 15,
		name : "身份验证",
		color : "white"
	}, {
		index : 16,
		name : "静音",
		color : "white"
	}, {
		index : 17,
		name : "等待应答",
		color : "white"
	}, {
		index : 18,
		name : "学习态",
		color : "white"
	}, {
		index : 19,
		name : "求助",
		color : "white"
	}, {
		index : 20,
		name : "监听",
		color : "white"
	}, {
		index : 21,
		name : "插入",
		color : "white"
	}, {
		index : 22,
		name : "播放录音文件",
		color : "white"
	}, {
		index : 23,
		name : "调整态",
		color : "white"
	}],
	elements:{
		STATUS_COLOR:null,
		STATUS_TEXT:null,
		STATUS_TIMER:null,
		TALK_TIMER:null,
		ACW_TIMER:null,
		QUEUE_WAIT_NUM:null
	},
	
	hInterval : 0, // 计时器句柄
	msgInterval : 0,//向软电话定时发送消息
	iTimer : null, // 状态时长计时

	iTalkingTimer : {
		isTalking : false,
		talkDate : null
	}, // 通话时长计时器
	iACWTimer : {
		isACW : false,
		acwDate : null
	}, 
	curStatusIndex : -1,// 当前状态
	curStatusTimeLimit : -1,// 当前状态时长限制
	
	// 查询排队数的时间
	iQueueWaitTimer : -1,

	/**
	 * 显示工作状态的变更，开始计时 statusIndex: 状态编号 statusTimeLimit: 状态保持时长
	 */
	setTimer : function(statusIndex, statusTimeLimit) {
		this.curStatusIndex = statusIndex;
		this.curStatusTimeLimit = statusTimeLimit;
		this.setStatusText(this.statusName(statusIndex));
		this.setStatusColor(this.statusColor(statusIndex));
		this.setStatusTime("00:00:00");
		this.iTimer = new Date();
		if (this.hInterval == 0) {
			this.hInterval = window.setInterval("AiCtFrame.AgentStatusTimer.onTimer()", 1000);
		}
	},
	setStatusColor:function(color){
		if (this.elements.STATUS_COLOR==null){
			this.elements.STATUS_TEXT=document.getElementById(AiCtFrame.ELS.STATUS_TEXT);
			this.elements.STATUS_COLOR=this.elements.STATUS_TEXT.parentNode;
		}
		this.elements.STATUS_COLOR.style["color"]=color;
	},
	setStatusText : function(text) {
		if (this.elements.STATUS_TEXT==null){
			this.elements.STATUS_TEXT=document.getElementById(AiCtFrame.ELS.STATUS_TEXT);
			this.elements.STATUS_COLOR=this.elements.STATUS_TEXT.parentNode;
		}
		this.elements.STATUS_TEXT.innerText=text;
	},
	//设置状态 时间更新
	setStatusTime:function(text){
		if (this.elements.STATUS_TIMER==null){
			this.elements.STATUS_TIMER=document.getElementById(AiCtFrame.ELS.STATUS_TIMER);
		}
		this.elements.STATUS_TIMER.innerText=text;
	},
	//定时调用 1秒一次
	onTimer : function() {
		//当前状态时长计算
		this.setStatusTime(this.secsToHMS(this.diffSecs(this.iTimer)));	
		//通话时长时间显示
		//this.onTimerForAgentTalkTime();
		//更改座席状态
		this.onTimerForUpdateAgentStatus();
		
		
	},clearTimer : function() {
		window.clearInterval(this.hInterval);
	},statusName : function(statusIndex) {
		 return this.arrayAgentStatusType[statusIndex].name;
	},
	statusColor : function(statusIndex) {
		return this.arrayAgentStatusType[statusIndex].color;
	},
	secsToHMS : function(secs) {
		var h = parseInt(secs / 3600);
		var m = parseInt((secs % 3600) / 60);
		var s = parseInt(secs % 60);
		return (((h < 10) ? "0" : "") + h + ":" + ((m < 10) ? "0" : "") + m + ":" + ((s < 10) ? "0" : "") + s);
	},
	diffSecs : function(d) {
		return parseInt((new Date() - d) / 1000);
	},
	onTimerForAgentTalkTime : function() {
		try {
			if (this.iTalkingTimer.isTalking) {
				var tmp = this.diffSecs(this.iTalkingTimer.talkDate);
				if (this.elements.TALK_TIMER==null){
					this.elements.TALK_TIMER=document.getElementById(AiCtFrame.ELS.CALLINFO_TALKING_TIMER);
				}
				this.elements.TALK_TIMER.innerText=this.secsToHMS(tmp);
			}
		} catch (err) {
			alert("ontimer_talktime err:" + err.message);
		}
	},	
	setTalkTimer : function(flag) {
		if (flag) {
			this.iTalkingTimer.isTalking = true;
			this.iTalkingTimer.talkDate = new Date();
		} else {
			this.iTalkingTimer.isTalking = false;
		}
	},
	onTimerForQueryQueueWait : function() {
		// 查询队列排队人数
		try {
			if (this.iQueueWaitTimer < AiCtConst.DEFAULT_QUEUE_WAIT_TIMER) {
				this.iQueueWaitTimer++;
			} else {
				this.iQueueWaitTimer = 0;
				var skillInfo = objCinVccBar.GetActiveService(); //格式：人工服务号|0$人工服务号|1
				LogManager.proxyMethod.ctlogger("----conf----onTimerForQueryQueueWait() "+skillInfo);
				skillInfo = this.splitQueueInfo(skillInfo);
				LogManager.proxyMethod.ctlogger("----conf----onTimerForQueryQueueWait() "+skillInfo);
				var retInt = objCinVccBar.CallQueueQuery(skillInfo); 
			}
		} catch (err) {
			alert("ontimer_QueueWaitNum err:" + err.message); 
		}
	},
	//定时更新座席状态
	onTimerForUpdateAgentStatus : function()
	{
		var curStatus = AiSoftPhone.getAgentCurStatus(); ////0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
		if(AiCtConst.AGENT_CUR_STATUS != curStatus)
		{
			LogManager.proxyMethod.ctlogger("----conf----onTimerForUpdateAgentStatus() 座席状态变更，前一状态 "+AiCtConst.AGENT_CUR_STATUS+" 当前状态："+curStatus);
			AiCtConst.AGENT_CUR_STATUS = curStatus;
			AiCtFrame.BusinessTracks.agentCurStatus.seatStsCd=curStatus;
			//执行状态更新
			AiSoftPhone.updateAgentCurStatus();
		}
	},
	setQueueWaitCount : function(v_num){
			if (this.elements.QUEUE_WAIT_NUM==null){
						this.elements.QUEUE_WAIT_NUM=document.getElementById(AiCtFrame.ELS.QUEUE_WAIT_NUM);
			}
			this.elements.QUEUE_WAIT_NUM.innerText=v_num;
	},
	splitQueueInfo : function(queueInfo){
		var retQueues = new Array();
		if(queueInfo!=null && queueInfo !='undefined' && queueInfo.length>0)
		{
			var queues = queueInfo.split("$");
			for(var i=0;i<queues.length;i++)
			{
				 var queue = queues[i].split("|");
				 if(queue[1]=="0")
				 {
				 			retQueues.push(queue[0]);
				 }
			}
			return retQueues.toString();
		}else
			{
				return "";
			}
	}
}

AiCtFrame.BusinessTracks = {
	signInOutObj : {
		"sginSgoutId":"",
		"crtUserId":"",
		"crtTime":"",
		"crtAppSysId":"",
		"modfUserId":"",
		"modfTime":"",
		"modfAppSysId":"",
		"staffId":"",
		"seatTrmnIpAddr":"",
		"callPltfStaffNum":"",
		"ctiAddr":"",
		"opTypeCd":"",
		"opTime":"",
		"hungup_flag":"0",
		"order_sign":"",
		"CMPGN_TYPE_CD":"",
		"CMPGN_INVLD_DATE":"",
		"RSVT_ODR_MCDS_UNIT_ID":"",
		"forespeak_flag":"0",
		"forespeak_flag_86":"0"
	},
	contactObj : {
		"cntmngId":"",
		"crtUserId":"",
		"crtAppSysId":"",
		"modfUserId":"",
		"modfAppSysId":"",
		"chnlId":"",
		"cntmngTypeCd":"",
		"staffId":"",
		"custId":"",
		"touchId":"",
		"cmccolCustFlag":""
		},
	callingObj :{
		"touchId":"接续ID",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"staffId":"员工ID",
		"touchChnlId":"接续渠道ID",
		"touchModeCd":"接续方式代码",
		"touchBgnTime":"接续开始时间",
		"touchFinishTime":"接续结束时间",
		"touchRmk":"接续备注",
		"skilId":"技能ID",
		"skilNm":"技能名称",
		"callSeatMarkCntt":"呼叫座席标记内容",
		"callMarkCntt":"呼叫标记内容",
		"callingNum":"13837109879",
		"calledNum":"被叫号码",
		"origCallingNum":"原主叫号码",
		"origCalledNum":"原被叫号码",
		"lnupTmlenSecCnt":"排队时长秒数",
		"ringTmlenSecCnt":"振铃时长秒数",
		"cnvstTmlenSecCnt":"通话时长秒数",
		"onhookTypeCd":"挂机类型代码",
		"callTraceCntt":"呼叫轨迹内容",
		"custMobnum":"客户移动电话号码",
		"cmccCustNm":"CMCC客户名称",
		"cmccCustBelgPlcNm":"CMCC客户所属地名称",
		"cmccCustBelgCityCode":"CMCC客户所属城市编码",
		"cmccCustBelgProvCode":"CMCC客户所属省份编码",
		"cmccCallingBrandNm":"CMCC主叫品牌名称",
		"cmccCustConcAddr":"CMCC客户联系地址",
		"cmccCustLvlNm":"CMCC客户等级名称"
		},
	recordObj : {
		"touchId":"接续ID",
		"rcdSeqno":"录音序号",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"callSeatMarkCntt":"呼叫座席标记内容",
		"callMarkCntt":"呼叫标记内容",
		"rcdCrtTime":"录音创建时间",
		"rcdFileNm":"录音文件名称",
		"rcdFileSavePath":"录音文件保存路径",
		"rcdFileSvrUrlPath":"录音文件服务器URL路径",
		"rcdBgnTime":"录音开始时间",
		"rcdFinishTime":"录音结束时间",
		"rcdTmlenSecCnt":"录音时长秒数"
	},
	tranferIVRObj : {
		"ivrTrstchId":"IVR转接ID",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"touchId":"接续ID",
		"callSeatMarkCntt":"呼叫座席标记内容",
		"trstchNum":"转接号码",
		"ivrSeqprcId":"IVR流程ID",
		"trstchModeCd":"转接方式代码",
		"trstchRmk":"转接备注",
		"trstchTime":"转接时间",
		"trstchRsltFlag":"转接结果标志"
	},
	transferQueueObj : {
		"skilQueueTrstchId":"技能队列转接ID",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"touchId":"接续ID",
		"skilQueueId":"技能队列ID",
		"trstchModeCd":"转接方式代码",
		"trstchTime":"转接时间",
		"trstchRsltFlag":"转接结果标志",
		"trstchRmk":"转接备注"
	},
	transferAgentObj : {
		"innerCnslId":"内部咨询ID",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"touchId":"接续ID",
		"byCnslStaffId":"被咨询员工ID",
		"calledCallPltfStaffNum":"被叫呼叫平台员工号码",
		"cnslTime":"咨询时间",
		"trstchFlag":"转接标志",
		"trstchTime":"转接时间",
		"trstchRsltFlag":"转接结果标志"
	},
	agentCurStatus :{
		"staffId":"员工ID",
		"crtUserId":"创建用户ID",
		"crtTime":"创建时间",
		"crtAppSysId":"创建应用系统ID",
		"modfUserId":"修改用户ID",
		"modfTime":"修改时间",
		"modfAppSysId":"修改应用系统ID",
		"seatStsCd":"座席状态代码",
		"lastOneTmsSginTime":"最后一次签入时间",
		"qutyExamFlag":"质量检查标志",
		"callPltfStaffNum":"呼叫平台员工号码"			
	},
	hangupTags :{
		"telnum":"",
    	"lblId":"",
   		"lblTime":"",
    	"crtUserId" :"",
   		"crtTime" :"",
   		"crtAppSysId" :"",
    	"modfUserId" :"",
    	"modfTime" :"",
   		"modfAppSysId" :"",
    	"staffId" :"",
   		"cntmngId" :""
	},
	custInfoRing :{
		"crtUserId":"",
		"crtAppSysId":"",
		"crtAppSysId":"",
		"ptyNm":"",
		"ptyEnNm":"",
		"genCd":"",
		"birthDate":"",
		"lnslclndTypeCd":"",
		"mrgFlag":"",
		"mrgSvnrDate":"",
		"edubgCd":"",
		"fmlyPrsnCnt":"",
		"sonCnt":"",
		"daughtCnt":"",
		"careerCd":"",
		"jobttCd":"",
		"yearRvnuAmt":"",
		"haveVeFlag":"",
		"residTypeCd":"",
		"monAvgCommAmt":"",
		"ptyNo":"",
		"custDesc":"",
		"endValidTime":"",
		"bgnValidTime":"",
		"markNum":""
	}
}
AiCtFrame.BusinessTracks.util ={
   clearData : function(jsonObj){
   		if(jsonObj == null || jsonObj=="undefined")
   		{
   			return false;
   		}
   		for(var txt in jsonObj )
   		{
   			jsonObj[txt] = "";
   		}
   },
   setData : function(sourceData,desData){
   		for(var txt in desData)
   		{
   			//alert(txt);
   			//alert("==="+sourceData[txt]);
   			if(sourceData[txt] !=null && sourceData[txt]!="undefined")
   			{
   				desData[txt] = sourceData[txt];
   				//alert("txt="+txt +"desData[txt]="+desData[txt]+" sourceData[txt]="+sourceData[txt]);
   			}
   		}
   },//呼入时设置IVR数据
   setIvrData :function(sourceData,desData){
   	try{
   		var tempData =sourceData;
		var queues = tempData.split(",");
		for(var i=0;i<queues.length;i++)
		{
			 var queue = queues[i].split(":");
			// alert(queue[0]+"   "+queue[1]);
			 desData[queue[0]] = queue[1];
		}
   	}catch(e){alert(e.message);}
   		
   }

}
