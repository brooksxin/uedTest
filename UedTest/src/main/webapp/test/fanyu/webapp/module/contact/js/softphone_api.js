srvMap.add("userFavorites", "userFavorites.json", "front/sh/contact!execute?uid=u012"); // 用户关注的产品
var CtiUtils ={
	
	
}
CtiUtils.API = {
	//外呼
	dialOut : function(phoneNum,data)
	{
		try{
			return AiCtFBH.makeCall(phoneNum);
		}catch(e){
			alert("未安装CTI控件，请签入系统后再进行外呼");
		}
	},
	// 获取接触ID
	getCurContactId : function()
	{
		return AiCtFrame.BusinessTracks.contactObj.cntmngId;
	},
	//获取呼叫类型 0 呼入 2 呼出
	getCurCallType : function()
	{
		return AiCtFrame.callType;
	},
	//客户ID
	getCurCustId : function()
	{
		return AiCtConst.CURCUSTID;
	},
	//设置客户ID，为非通话状态下 给客户下单使用
	setCurCustId : function(phoneNum)
	{
		AiCtFrame.BusinessTracks.callingObj.callingNum = phoneNum;
		return AiSoftPhone.saveCustInfoFromWeb(phoneNum);
	},
	//客户Name
	getCurCustNm : function()
	{
		if(AiCtFrame.BusinessTracks.callingObj.cmccCustNm !=null && AiCtFrame.BusinessTracks.callingObj.cmccCustNm!="undefined" &&AiCtFrame.BusinessTracks.callingObj.cmccCustNm!="")
		{
			return AiCtFrame.BusinessTracks.callingObj.cmccCustNm;
		}else{
			return "未知";
		}
	},
	//当前客户手机号码
	getCurPhoneMobile : function()
	{
		return AiCtFrame.BusinessTracks.callingObj.callingNum;
	},
	//来话做业务
	openBusiOnRing: function(phoneNum)
	{
		 var str = "telnum="+phoneNum;
		//振铃事件 查询 关注信息
		 Util.ajax.postJson(srvMap.get("userFavorites"), str, function(json, status) {
             if (status) {
                 $("#nFav").text(json.beans.length);
             }else{
            	 $("#nFav").text("0");
             }
       });
	},
	transferToIvr : function(ivrCode ,data)
	{
		try{
			return AiCtFBH.transToIVR(ivrCode ,data);
		}catch(e){}
	},
	//下单成功，预约成功更新 挂机状态 1：正常挂机 2：下单挂机 3：预约挂机 4:外呼拒绝5：未接通
	setHangupPageType : function(hangupType,orderId){
		AiCtFrame.hangUpPageType.hangUpPageCODE = hangupType;
		AiCtFrame.hangUpPageType.hangUpOrderId = orderId;
	},//转接到和包支付IVR data json格式 {"preNo":3456}
	transferToAndIvr : function(data)
	{
		try{
			return AiCtFBH.transToIVR("000001555555005000" ,data);
		}catch(e){
			alert("当前未通话!");
		}
	},//0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	judgeAgentTalking : function(){
		try{
			return AiSoftPhone.getAgentCurStatus();
		}catch(e){
			return "0";
		}
	},
	refreshUserHasActivity : function(phone_number){
		return AiSoftPhone.refreshUserHasActivity(phone_number);
	}
	
}