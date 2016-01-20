srvMap.add('queryCustAddressInfo', 'billInfo.json','front/sh/order!execute?uid=o006');//查询地址列表
srvMap.add('findAddressInfoByCId', 'billInfo.json','front/sh/order!execute?uid=o016');//查询地址列表通过custId和序列号
srvMap.add('updateCustAddress', 'billInfo.json','front/sh/order!execute?uid=o015');//修改地址信息通过custId和序列号
srvMap.add('delAddr', 'delAddr.json','front/sh/order!execute?uid=o012');//删除地址
srvMap.add('changeDefaultAddr', '','front/sh/order!execute?uid=o013');//更改默认地址
srvMap.add('changeNoDefaultAddr', '','front/sh/order!execute?uid=o014');//重置默认地址
srvMap.add('getUserInfo', '','front/sh/user!session');//取得用户信息
srvMap.add('queryAddressInfo', 'query.json','front/sh/order!execute?uid=o007');//查询地址信息
srvMap.add('queryRegnNameByRegnCode', '','front/sh/order!execute?uid=o017');//根据地址代码查询地址名称
srvMap.add('saveCustAddress', '','front/sh/order!execute?uid=o003');//保存地址
srvMap.add('querySuppertPayMode', '','front/sh/prod!execute?uid=t0001');//根据商品得到所支持的支付方式

srvMap.add('generateOrder', '','front/sh/order!execute?uid=o004');//生成订单
srvMap.add('sms','sms.json','front/sh/common!smsRs');
srvMap.add('saveReservationOrder', '','front/sh/order!saveReservationOrder?uid=ort009');//生成预约订单
srvMap.add('orderSubmitSuccess', '','module/orders/orderSubmitSuccess.html');//生成订单成功页面
srvMap.add('queryZipcd', 'queryZipcd.json', 'front/sh/order!execute?uid=o026');
//包含了弹出框，定义好节点，避免top属性混乱。
var J_secRegin = $("#J_secRegin");
var J_thrdRegin = $("#J_thrdRegin");
var U_secRegin = $("#U_secRegin");
var U_firstRegin = $("#U_firstRegin");
var U_thrdRegin = $("#U_thrdRegin");
var U_scustId = $("#U_scustId");
var U_rvgdAddrSeqno = $("#U_rvgdAddrSeqno");
var U_reciverPhoneNum1 = $("#U_reciverPhoneNum1");
var U_rverNm = $("#U_rverNm");
var U_email = $("#U_email");
var U_zipcd = $("#U_zipcd");
var U_forhLvlAddr = $("#U_forhLvlAddr");
var U_fstLvlAddr = $("#U_fstLvlAddr");
var U_secdLvlAddr = $("#U_secdLvlAddr");
var U_thrdLvlAddr = $("#U_thrdLvlAddr");
var U_reciverPhoneNum2 = $("#U_reciverPhoneNum2");
var J_add = $('#J_add');
var U_update = $('#U_update');
var J_form = $("#J_form");
var U_form = $("#U_form");
var elem1 = document.getElementById('T_updateAddr');
var elem = $('#T_addAddr');
var A_reciverPhoneNum1 = $("#reciverPhoneNum1");
var A_rverNm = $("#rverNm");
var A_email = $("#email");
var A_zipcd = $("#zipcd");
var A_forhLvlAddr = $("#forhLvlAddr");
var A_reciverPhoneNum2 = $("#reciverPhoneNum2");
var J_firstRegin = $("#J_firstRegin");
var J_fstLvlAddr = $('#fstLvlAddr');
var J_secdLvlAddr = $('#secdLvlAddr');
var J_thrdLvlAddr = $('#thrdLvlAddr');
var zipEle = $("#zipcd");
var U_zipEle = $("#U_zipcd");
var validate_add = J_form.validate({
        rules: {
            reciverPhoneNum1: {
                required: true,
                number: true,
                maxlength:11,
                minlength:11
            },
            rverNm:{
                required: true
            },
            email:{
                required: true
            },
            zipcd:{
                required: true,
                number: true,
                maxlength:6,
                minlength:6
            },
            forhLvlAddr: {
                required: true
            },
            reciverPhoneNum2: {
                number: true,
                maxlength:11,
                minlength:11
            }
        },
        messages: {
            reciverPhoneNum1: {
                required: "请输入手机号码",
                number: "手机号码必须为数字",
                maxlength:"手机号码长度为11位",
                minlength:"手机号码长度为11位"
            },
            rverNm: {
                required: "请填写收货人姓名"
            },
            email: {
                required: "请填写电子邮箱"
            },
            zipcd: {
                required: "请填写邮政编码",
                number: "邮政编码必须为数字",
                maxlength:"邮政编码长度为6位",
                minlength:"邮政编码长度为6位"
            },
            forhLvlAddr: {
                required: "请填写详细地址"
            },
            reciverPhoneNum2: {
                number: "手机号码必须为数字",
                maxlength:"手机号码长度为11位",
                minlength:"手机号码长度为11位"
            }
        },
        showErrors:function(){
            this.defaultShowErrors();
        },
        success: function(currentDom){
            $(currentDom).html("<img src='../../css/images/validate-right.png' class='right-img'>");
        }
});

var validate_update = U_form.validate({
        rules: {
            U_reciverPhoneNum1: {
                required: true,
                number: true,
                maxlength:11,
                minlength:11
            },
            U_rverNm:{
                required: true
            },
            U_email:{
                required: true
            },
            U_zipcd:{
                required: true,
                number: true,
                maxlength:6,
                minlength:6
            },
            U_forhLvlAddr: {
                required: true
            },
            U_reciverPhoneNum2: {
                number: true,
                maxlength:11,
                minlength:11
            }
        },
        messages: {
            U_reciverPhoneNum1: {
                required: "请输入手机号码",
                number: "手机号码必须为数字",
                maxlength:"手机号码长度为11位",
                minlength:"手机号码长度为11位"
            },
            U_rverNm: {
                required: "请填写收货人姓名"
            },
            U_email: {
                required: "请填写电子邮箱"
            },
            U_zipcd: {
                required: "请填写邮政编码",
                number: "邮政编码必须为数字",
                maxlength:"邮政编码长度为6位",
                minlength:"邮政编码长度为6位"
            },
            U_forhLvlAddr: {
                required: "请填写详细地址"
            },
            U_reciverPhoneNum2: {
                number: "手机号码必须为数字",
                maxlength:"手机号码长度为11位",
                minlength:"手机号码长度为11位"
            }
        },
        showErrors:function(){
            this.defaultShowErrors();
        },
        success: function(currentDom){
            $(currentDom).html("<img src='../../css/images/validate-right.png' class='right-img'>");
        }
});

$(function(){
	init();
	//动态加载下拉框
    U_FirstSelect();
    //top.AiCtFrame.BusinessTracks.signInOutObj.order_sign=0;
    //添加标签
    //因为J_addBrand结点在模板内定义，所以要模板加载出来之后在绑定事件$('#')
    //
    $('#J_addrInfo').on('click', '#J_addBrand', function(){
        $('#reciverPhoneNum1', elem).val('');
        $('#rverNm', elem).val('');
        $('#email', elem).val('');
        $('#zipcd', elem).val('');
        $('#forhLvlAddr', elem).val('');
        $('#reciverPhoneNum2', elem).val('');
        $('#fstLvlAddr', elem).val(2).trigger('change');
        validate_add.form();

    	var maxLength = 0;
		var arg = {"custId" : $("#real_custId").val()};
		Util.ajax.postJsonSync(srvMap.get('queryCustAddressInfo'),arg,function(json,status){
			if (status) {
				maxLength = json.beans.length;
			}else{
    			Util.dialog.tips(json.returnMessage||'系统繁忙，请重试！');
			}
		})
		if(maxLength >= 5){
			Util.dialog.tips('对不起，您最多只能保留五个地址！');
			return;
		}

        var params = {
            top:top,
            id:'D_addAddr',
            title:'添加收货地址',
            content: elem,
            width: 800,
            modal: true
        }
        Util.dialog.openDiv(params);//弹出框需要在iframe的父页面上弹出，需要添加'top'
        var rvgdAddrSeqno = findMaxRvgdAddrSeqno();
        J_form.find("input[name='rvgdAddrSeqno']").val(rvgdAddrSeqno+1);
    })
    
    $("#J_search").bind("click",function(){
    	if(validateOrderDataAndSetValue()){
    		showPage("confirmPage");
    	}
    });
    $("#backToQtySelect").bind("click",function(){
    	window.location.href ="orderSelectQty.html";
    });
    $("#backModifyOrderInfo").bind("click",function(){
    	showPage("checkPage");
    });
    
    //动态加载下拉框
    $("#J_firstRegin").NiceSelect({
    	  url :srvMap.get('queryAddressInfo'),
          datas:"suprRegnCode=-1&addrLvlCd=1",
          id:"fstLvlAddr",
          name:"fstLvlAddr",
          all:"",
          key:"regnCode",
          value:"regnNm",
          handler:function(){
            var suprRegnCode = $(this).val();
            secondSelect(suprRegnCode);
            zipEle.val("");
          },
          callback :function(){
              var suprRegnCode = $(this).val();
              secondSelect(suprRegnCode);
              zipEle.val("");
         }
    });

   
  	//加载二级下拉框
    function secondSelect(suprRegnCode) {
        J_secRegin.NiceSelect({
        	url :srvMap.get('queryAddressInfo'),
            datas : "suprRegnCode="+suprRegnCode+"&addrLvlCd=2",
            id : "secdLvlAddr",
            name : "secdLvlAddr",
            all:"",
            key:"regnCode",
            value:"regnNm",
            handler:function(){
                var provId = $(this).val();
                thirdSelect(provId);
                var regnCode = $(this).val();
                if(regnCode && "" != regnCode && null != regnCode){
                	Util.ajax.postJson(srvMap.get("queryZipcd"), {regnCode : regnCode}, function(json, flag) {
 						if (flag) {
 						//从ajax中获取该机构的邮政编码,设置到邮编输入框中
 							var zipcode = json.bean.zipcd;
 							if (zipcode != "null") {
 								zipEle.val(zipcode);
 							} else {
 								Util.dialog.tips("查询邮政编码失败，请手动填写！");
 							}
 						}
 					});
                }
              },
            callback :function(){
            	var provId = $(this).val();
            	thirdSelect(provId);
            	var regnCode = $(this).val();
                if(regnCode && "" != regnCode && null != regnCode){
                	Util.ajax.postJson(srvMap.get("queryZipcd"), {regnCode : regnCode}, function(json, flag) {
 						if (flag) {
 						//从ajax中获取该机构的邮政编码,设置到邮编输入框中
 							var zipcode = json.bean.zipcd;
 							if (zipcode != "null") {
 								zipEle.val(zipcode);
 							} else {
 								Util.dialog.tips("查询邮政编码失败，请手动填写！");
 							}
 						}
 					});
                }
            }
        });
    }
    //加载三级下拉框
    function thirdSelect(suprRegnCode) {
    	 J_thrdRegin.NiceSelect({
         	 url :srvMap.get('queryAddressInfo'),
         	 datas : "suprRegnCode="+suprRegnCode+"&addrLvlCd=3",
             id : "thrdLvlAddr",
             name : "thrdLvlAddr",
             all:"",
             key:"regnCode",
             value:"regnNm"
         });
    }
    
    //添加按钮
    J_add.click(function(){

        if(validate_add.form()){

            var str = J_form.serialize();
//debugger;
            Util.ajax.postJson(srvMap.get('saveCustAddress'),str,function(json,status){
                if (status) {
                    Util.dialog.tips('添加成功！');
                    var rvgdAddrSeqno = findMaxRvgdAddrSeqno() + 1;
                    loadAddr();
                    top.Util.dialog.close('D_addAddr');
                }else{
                    Util.dialog.tips(json.returnMessage||'添加失败，请重试！');
                }
            })
        }
    })
    //取消按钮
    $('#J_cancel').click(function(){
        top.Util.dialog.close('D_addAddr');
    })
    
    //修改按钮
    U_update.click(function(){
        if(validate_update.form()){
            var str = U_form.serialize();
            Util.ajax.postJson(srvMap.get('updateCustAddress'),str,function(json,status){
                if (status) {
                    Util.dialog.tips('修改成功！');
                    top.Util.dialog.close('D_updateAddr');
                    loadAddr();
                }else{
                    Util.dialog.tips(json.returnMessage||'修改失败，请重试！');
                }
            })
        }
    })
    //取消按钮
    $('#U_cancel').click(function(){
        top.Util.dialog.close('D_updateAddr');
    })
    
    $("input[name='isNeedInvoice']").bind("change",function(){
    	var v = $(this).val();
    	if($(this).is(":checked")){
    		$(this).parent("span").next("div").show();
    	}else{
    		$(this).parent("span").next("div").hide();
    	}
    	var tinvcObjTypeCd = $("#tinvcObjTypeCd").children('option:selected').val();
    	if(tinvcObjTypeCd == '10'){//个人发票
    		$("#tinvcInvttNm").parent("div").hide();
    	}else{
    		$("#tinvcInvttNm").parent("div").show();
    	}
    });
   // $("input[name='isNeedInvoice']").trigger("change");
    				
    $("#tinvcObjTypeCd").change(function(){
    	var v = $(this).children('option:selected').val()
    	if(v == '10'){//个人发票
    		$("#tinvcInvttNm").parent("div").hide();
    	}else{
    		$("#tinvcInvttNm").parent("div").show();
    	}
    });
    var submitFlag = true;//提交订单开关
    $("#J_generateOrder").bind("click",function(){
        if (submitFlag) {
            submitFlag = false;
            var custId = top.CtiUtils.API.getCurCustId();
        	if(custId==null||custId=="null"||custId=='undefined'){
        		Util.dialog.tips("您只能在通话状态下下单！");
        		submitFlag = true;
        	}else{
        		//cmpgnId为营销活动ID，获取方式为：AiCtFrame.bussinessData.CMPGN_ID
        		Util.ajax.postJson(srvMap.get('generateOrder'),$("#submitForm").serialize()+"&cmpgnId="+top.AiCtFrame.bussinessData.CMPGN_ID,function(json,status){
                    if(status){
                        var payMode = $("input[name='real_payMode']").val();
                        var odrId = json.bean.odrId;
                        var params="?type=2&payMode="+payMode+"&odrId="+odrId;
                        //调用接续服务，增加统计数量
                        var current_agent_state = top.CtiUtils.API.judgeAgentTalking();
						if(current_agent_state=='3'){
							top.AiCtFrame.BusinessTracks.signInOutObj.order_sign=1;
							top.AiCtFrame.BusinessTracks.signInOutObj.hungup_flag==1;
							top.CtiUtils.API.setHangupPageType("2",odrId);
						}
                        window.location.href = srvMap.get('orderSubmitSuccess')+params;
                    }else {
                        Util.dialog.tips(json.returnMessage||'生成订单失败！');
                    }
                    submitFlag = true;
                });
        	}
        }
    });
    
    var appointFlag = true;//预约订单开关
    $("#J_generateYyOrder").bind("click",function(){
        if (appointFlag) {
            appointFlag = false;
            var custId = top.CtiUtils.API.getCurCustId();
        	if(custId==null||custId=="null"||custId=='undefined'){
        		Util.dialog.tips("您只能在通话状态下下单！");
        		submitFlag = true;
        	}else{
	            Util.ajax.postJson(srvMap.get('saveReservationOrder'),$("#submitForm").serialize(),function(json,status){
	                if(status){
	                    window.location.href = srvMap.get('orderSubmitSuccess')+"?type=1";
	                }else {
	                    Util.dialog.tips(json.returnMessage||'生成预约订单失败！');
	                }
	                appointFlag = true;
	            });
        	}
        };
    });
});




function U_FirstSelect() {
    U_firstRegin.NiceSelect({
        url :srvMap.get('queryAddressInfo'),
        datas:"suprRegnCode=-1&addrLvlCd=1",
        id:"U_fstLvlAddr",
        name:"U_fstLvlAddr",
        all:"",
        key:"regnCode",
        value:"regnNm",
        handler:function(){
            var suprRegnCode = $(this).val();
            U_secondSelect(suprRegnCode);
            U_zipEle.val("");
        },
        callback :function(){
            var suprRegnCode = $(this).val();
            U_secondSelect(suprRegnCode);
            U_zipEle.val("");
            console.log('callback')
        }
    });
}

//加载二级下拉框
function U_secondSelect(suprRegnCode) {
    U_secRegin.NiceSelect({
        url :srvMap.get('queryAddressInfo'),
        datas : "suprRegnCode="+suprRegnCode+"&addrLvlCd=2",
        id : "U_secdLvlAddr",
        name : "U_secdLvlAddr",
        all:"",
        key:"regnCode",
        value:"regnNm",
        handler:function(){
            var provId = $(this).val();
            U_thirdSelect(provId);
            var regnCode = $(this).val();
            if(regnCode && "" != regnCode && null != regnCode){
                Util.ajax.postJson(srvMap.get("queryZipcd"), {regnCode : regnCode}, function(json, flag) {
 					if (flag) {
 					//从ajax中获取该机构的邮政编码,设置到邮编输入框中
 						var zipcode = json.bean.zipcd;
 						if (zipcode != "null") {
 							U_zipEle.val(zipcode);
 						} else {
 							Util.dialog.tips("查询邮政编码失败，请手动填写！");
 						}
 					}
 				});
            }
          },
        callback :function(){
            $(this).val(_areaInfo.city);
             var provId = $(this).val();
             //_areaInfo.city
             
             U_thirdSelect(provId);
             var regnCode = $(this).val();
             if(regnCode && "" != regnCode && null != regnCode){
                Util.ajax.postJson(srvMap.get("queryZipcd"), {regnCode : regnCode}, function(json, flag) {
 					if (flag) {
 					//从ajax中获取该机构的邮政编码,设置到邮编输入框中
 						var zipcode = json.bean.zipcd;
 						if (zipcode != "null") {
 							U_zipEle.val(zipcode);
 						} else {
 							Util.dialog.tips("查询邮政编码失败，请手动填写！");
 						}
 					}
 				});
             }
        }
    });
}
//加载三级下拉框
function U_thirdSelect(suprRegnCode) {
     U_thrdRegin.NiceSelect({
         url :srvMap.get('queryAddressInfo'),
         datas : "suprRegnCode="+suprRegnCode+"&addrLvlCd=3",
         id : "U_thrdLvlAddr",
         name : "U_thrdLvlAddr",
         all:"",
         key:"regnCode",
         value:"regnNm", 
         callback:function(){
            $(this).val(_areaInfo.country);
         }
     });
}


//订单提交前的校验
function validateForSubmit(){
	var userId = $("#real_userId").val()||"";
	if(!userId){
		 Util.dialog.tips('您还没有登录,不能生成订单!');
		 return false;
	}
	var real_custId = $("#real_custId").val()||"";
	if(!real_custId){
		Util.dialog.tips("没有下单客户,不能生成订单!");
		return false;
	}
	var real_rvgdAddrSeqno =$("#real_rvgdAddrSeqno").val();
	if(!real_rvgdAddrSeqno){
		Util.dialog.tips("请选择客户收货地址!");
		return false;
	}
	var real_payMode = $("#real_payMode").val();
	if(!real_payMode){
		Util.dialog.tips("请选择支付方式!");
		return false;
	}
	
	var real_isNeedInvoice =$("#real_isNeedInvoice").val();
	var real_tinvcObjTypeCd = $("#real_tinvcObjTypeCd").val();
	var real_tinvcInvttNm = $("#real_tinvcInvttNm").val();
	if(real_isNeedInvoice =='1'){
		if(real_tinvcObjTypeCd =='11'){
			if(!real_tinvcInvttNm){
				Util.dialog.tips("单位发票,请输入 发票抬头!");
				return false;
			}else if(real_tinvcInvttNm.length > 100){
				Util.dialog.tips("发票抬头最多只能输入80个字符!");
				return false;
			}
		}
	}
	
	var real_smsType =$("#real_smsType").val()||"";
	if(!real_smsType){
		Util.dialog.tips("请选择短信类型!");
		return false;
	}
	var real_mcdsUnitId = $("#real_mcdsUnitId").val();
	if(!real_mcdsUnitId){
		Util.dialog.tips("购买商品不在在,请重新选择要购买的商品");
		return false;
	}
	var real_mcdsUnitQty =$("#real_mcdsUnitQty").val();
	if(!real_mcdsUnitQty){
		Util.dialog.tips("请选择购买商品的数量!");
		return false;
	}else if(real_mcdsUnitQty != '1'){
		Util.dialog.tips("只能购买一个商品!");
		return false;
	}
	var real_chnlId = $("#real_chnlId").val();
	var real_cntmngId =$("#real_cntmngId").val();
	if(real_chnlId != 'CHNL_001' || !real_cntmngId){
		Util.dialog.tips("数据错误 !");
		return false;
	}
	return true;
}




function querySuppertPayMode(){
	Util.ajax.postJson(srvMap.get('querySuppertPayMode'),"MCDS_UNIT_ID="+$("input[name='real_mcdsUnitId']").val(),function(json,status){
		var result ="";
		if(status){
			var beans = json.beans;
			var isZyzx = "0";	//判断是否支付中移在线支付，如果支持，则不显示支付宝支付，反则不作任何处理（临时方案，后期支付宝真正下线后，可读表配置，不作任何特殊处理
			for(var i=0;i<beans.length;i++){
				var payModeId = beans[i]['PAYMN_MODE_ID'];
				if(payModeId == "04"){
					isZyzx = "1";
					break;
				}
			}
			for(var i=0;i<beans.length;i++){
				if(isZyzx == "1" && beans[i]['PAYMN_MODE_ID'] == "02"){
					continue;
				}
				result +="<label>";
				result +="<input type='radio' name='payMode' value='"+beans[i]['PAYMN_MODE_ID']+"'/>";
				result +="<span class='pl-10 pr-20'>"+beans[i]['PAYMN_MODE_NM']+"</span>";
				result +="</label>";
			}
			$("#supportPayMode").html(result);
		}else{
			 Util.dialog.tips(json.returnMessage||'加载支付方式失败，请重试！');
		}
	});
}

function showPage(page){
	if(page =='checkPage'){
		$("#J_checkOrder").show();
		$("#J_checkBtnDiv").show();
		$("#J_orderConfirm").hide();
		$("#J_confirmBtn").hide();
	}else if(page="confirmPage"){
		$("#J_checkOrder").hide();
		$("#J_checkBtnDiv").hide();
		$("#J_orderConfirm").show();
		$("#J_confirmBtn").show();
	}
}

function init(){
	var type = top.$("#termlist_param_type").val();
	if(type =='1'){
		$("#J_generateOrder").hide();
		$("#J_generateYyOrder").show();
	}else {
		$("#J_generateOrder").show();
		$("#J_generateYyOrder").hide();
	}
	var custId = top.CtiUtils.API.getCurCustId();
	if(custId==null||custId=="null"||custId=='undefined'){
		custId=$("#real_custId").val();
	}
	$("#real_custId").val(custId);
	$("#scustId").val(custId);
	
	var custNm = top.CtiUtils.API.getCurCustNm()||"未知";
	if(custNm){
		$("#real_custNm").val(custNm);
	}
	
	var cntmngId = top.CtiUtils.API.getCurContactId();
	if(cntmngId==""||cntmngId==null||cntmngId=="null"||cntmngId=='undefined'){
		cntmngId=$("#real_cntmngId").val();
	}
	$("#real_cntmngId").val(cntmngId);
	
	var custResvTelNum =top.CtiUtils.API.getCurPhoneMobile();
	if(custResvTelNum==null||custResvTelNum=="null"||custResvTelNum=='undefined'){
		custResvTelNum=$("#real_custResvTelNum").val();
	}
	$("#real_custResvTelNum").val(custResvTelNum);
	var mcdsUnitId = Util.browser.getParameter("mcdsUnitId");
	if(mcdsUnitId==null||mcdsUnitId=="null"||mcdsUnitId=='undefined'){
		mcdsUnitId=$("#real_mcdsUnitId").val();
	}
	$("input[name='real_mcdsUnitId']").val(mcdsUnitId);
	$("#mcdsUnitIdLabel").text(mcdsUnitId);
	var mcdsUnitNm = decodeURIComponent(Util.browser.getParameter("mcdsUnitNm"));
	if(mcdsUnitNm==null||mcdsUnitNm=="null"||mcdsUnitNm=='undefined'){
		mcdsUnitNm=$("#real_mcdsUnitNm").val();
	}
	$("input[name='real_mcdsUnitNm']").val(mcdsUnitNm);
	$("#mcdsUnitNmLabel").text(mcdsUnitNm);
	var mcdsUnitTypeCd = Util.browser.getParameter("mcdsUnitTypeCd");
	if(mcdsUnitTypeCd==null||mcdsUnitTypeCd=="null"||mcdsUnitTypeCd=='undefined'){
		mcdsUnitTypeCd=$("#real_mcdsUnitTypeCd").val();
	}
	$("input[name='real_mcdsUnitTypeCd']").val(mcdsUnitTypeCd);
	var mcdsUnitQty = Util.browser.getParameter("mcdsUnitQty");
	if(mcdsUnitQty==null||mcdsUnitQty=="null"||mcdsUnitQty=='undefined'){
		mcdsUnitQty=$("#real_mcdsUnitQty").val();
	}
	$("input[name='real_mcdsUnitQty']").val(mcdsUnitQty);
	$("#mcdsUnitQtyLabel").text(mcdsUnitQty);
	var mcdsUnitPrice = Util.browser.getParameter("singlePrice")||"0.00";
	if(mcdsUnitPrice==null||mcdsUnitPrice=="null"||mcdsUnitPrice=='undefined'){
		mcdsUnitPrice=$("#real_mcdsUnitPrice").val()||"0.00";
	}
	$("input[name='real_mcdsUnitPrice']").val(mcdsUnitPrice);
	$("#mcdsUnitPriceLabel").text(mcdsUnitPrice);
	$("#odrAmt").text(Number(mcdsUnitPrice) * mcdsUnitQty);
	
	var userId = userInfo.bean.userId;
	if(userId==null||userId=="null"||userId=='undefined'){
		userId=$("#real_userId").val();
	}
	$("#userId").val(userId);
    $("#real_userId").val(userId);
	$("#suserId").val(userId);
	$("#U_suserId").val(userId);
	/*Util.ajax.postJsonSync(srvMap.get("getUserInfo"),"",function(json,status){
		 if (status) {
	        userId = json.bean.userId;
	        
        }else {
       		alert(json.returnMessage||'查询失败，请重试！');
        }
	});*/
	
	querySuppertPayMode();
	if(custId){
		loadAddr();//初始化页面
	}else{
		Util.dialog.tips("您只能在通话状态下下单！");
	}
	
}

function loadAddr(){
	var arg = {"custId" : $("#real_custId").val()};
	//var arg = {"custId" : 1};
    Util.ajax.postJson(srvMap.get('queryCustAddressInfo'),arg,function(json,status){
        if (status) {
        	/*$.each(json.beans,function(i, obj){
				json.beans[i].rverFstLvlAddr = queryRegnNameByRegnCode(json.beans[i].rverFstLvlAddr);
				obj.rverSecdLvlAddr = queryRegnNameByRegnCode(obj.rverSecdLvlAddr);
        		obj.rverThrdLvlAddr = queryRegnNameByRegnCode(obj.rverThrdLvlAddr);
			});*/
            Util.ajax.loadTemp('#J_addrInfo',$('#T_addrInfo_new'),json);//加载模板
			$.each(json.beans,function(i, obj){
				$("#selected" + obj.rvgdAddrSeqno).click(function(){
					$("#comfirm_custNm").html(obj.rverNm);
					$("#comfirm_reciverPhoneNum1").html(obj.rverMobnum);
        			$("#comfirm_fstLvlAddr").html(obj.rverFstLvlAddrName);
        			$("#comfirm_secdLvlAddr").html(obj.rverSecdLvlAddrName);
        			$("#comfirm_thrdLvlAddr").html(obj.rverThrdLvlAddrName);
        			$("#comfirm_forhLvlAddr").html(obj.rverFothLvlAddr);
					changeSelected(obj.rvgdAddrSeqno);
				});
				/*if(obj.CUSE_ADDR_FLAG == "Y"){
					changeSelected(obj.RVGD_ADDR_SEQNO);
				}*/
			});
            
        }else{
            Util.dialog.tips(json.returnMessage||'查询失败，请重试！');
        }
    })
}

function findMaxRvgdAddrSeqno(){
	var maxRvgdAddrSeqno = 0
	$.each($("input.rvgdAddrSeqno_flag"),function(index,ele){
		var rvgdAddrSeqno = $(this).val();
		if(Number(rvgdAddrSeqno) > maxRvgdAddrSeqno){
			maxRvgdAddrSeqno = Number(rvgdAddrSeqno);
		}
	});
	return maxRvgdAddrSeqno;
}

//修改地址
var _areaInfo = { province:0, city:0, county:0 };
function updateAddr(rvgdAddrSeqno){
	 var custId = $("#real_custId").val();
	 var arg = {"custId" : $("#real_custId").val(),"rvgdAddrSeqno" : rvgdAddrSeqno};
	 Util.ajax.postJsonSync(srvMap.get('findAddressInfoByCId'),arg,function(json,status){
        if (status && json.beans.length>0) {
            var obj = json.beans[0];
            _areaInfo = { province:obj.RVER_FST_LVL_ADDR, city:obj.RVER_SECD_LVL_ADDR, country:obj.RVER_THRD_LVL_ADDR };
        	U_scustId.val(custId);
        	U_rvgdAddrSeqno.val(rvgdAddrSeqno);
        	U_reciverPhoneNum1.val(obj.RVER_MOBNUM);
        	U_rverNm.val(obj.RVER_NM);
        	U_email.val(obj.EMAIL_ADDR);
        	U_zipcd.val(obj.ZIPCD);
        	U_forhLvlAddr.val(obj.RVER_FOTH_LVL_ADDR);
        	U_reciverPhoneNum2.val(obj.RVER_FST_SPARE_TELNUM);
            $('#U_fstLvlAddr', elem1).val(obj.RVER_FST_LVL_ADDR).trigger('change');
        }else{
            Util.dialog.tips(json.returnMessage||'修改失败，请重试！');
        }
    })
     var params = {
            top: top,
            id:'D_updateAddr',
            title:'修改收货地址',
            content: elem1,
            width: 800,
            modal: true
        }
     Util.dialog.openDiv(params);
}
//删除地址
function delAddr(obj,custId,rvgdAddrSeqno){
    Util.dialog.confirm({
        top: top,
        content:'确认删除？',
        okCallback:function(){
    		var arg = {"custId" : custId,"rvgdAddrSeqno" : rvgdAddrSeqno};
            Util.ajax.postJson(srvMap.get('delAddr'),arg,function(json,status){
                if (status) {
                    Util.dialog.tips('删除成功！');
                    $(obj).parents('.ui-Address_labelA').remove();
                    loadAddr();
                }else{
                    Util.dialog.tips(json.returnMessage||'查询失败，请重试！');
                }
            })
        }
    });
}
//验证表单数据
function validateOrderDataAndSetValue(){
	// 收货地址选择验证
	var rvgdAddrSeqno = $("#real_rvgdAddrSeqno").val()||"";
	var userId = $("#real_userId").val()||"";
	if(!rvgdAddrSeqno || !userId){
		alert("请选择收货地址!,如果没有收货地址请先保存收货地址");
		return false;
	}
	var payMode = $("input[name='payMode']:checked").val();
	if(payMode){
		$("input[name='real_payMode']").val(payMode);
		$("#confirm_payModeNm").text($("input[name='payMode']:checked").next("span").text());
	} else {
		alert("请选择支付方式");
		return false;
	}
	
	//$("input[name='real_payMode']").val("01");
	//$("#confirm_payModeNm").text("和包支付");
	//发票相关验证
	var $isNeedInvoice = $("input[name='isNeedInvoice']");
	var invoiceInfo = "";
	if($isNeedInvoice.is(":checked")){
		$("input[name='real_isNeedInvoice']").val("1");
		var tinvcObjTypeCd = $("select[name='tinvcObjTypeCd'] option:selected").val();
		var tinvcObjTypeCdNm = $("select[name='tinvcObjTypeCd'] option:selected").text();
		var tinvcInvttNm = $("input[name='tinvcInvttNm']").val()||"";
		if(tinvcObjTypeCd == '11'){//单位要写抬头
			if(!tinvcInvttNm){
				alert("请输入发票抬头!");
				return false;
			}
		}
		$("input[name='real_tinvcObjTypeCd']").val(tinvcObjTypeCd);

		if($("input[name='tinvcInvttNm']").is(":visible")){
			$("input[name='real_tinvcInvttNm']").val(tinvcInvttNm);
			$("#confirm_invoice").text(tinvcObjTypeCdNm +"-"+tinvcInvttNm);
		}else{
			$("#confirm_invoice").text(tinvcObjTypeCdNm);
			$("input[name='real_tinvcInvttNm']").val("");
		}
	}else{
		$("input[name='real_isNeedInvoice']").val("0");
		$("input[name='real_tinvcObjTypeCd']").val("");
		$("input[name='real_tinvcInvttNm']").val("");
		$("#confirm_invoice").text("不开具发票");
	}
	//短信模板
	var smsType =  $("input[name='smsType']:checked").val();
	if(smsType){
		$("input[name='real_smsType']").val(smsType);
		$("#confir_smsType").text($("input[name='smsType']:checked").siblings("span").text());
	}else{
		alert("请选择短信类型!");
		return false;
	}
	//订单备注
	var odrRmk = $("#odrRmk").val()||"";
	$("#confir_odrRmk").text(odrRmk);
	$("#real_odrRmk").val(odrRmk);
	return true;
}

function changeSelected(rvgdAddrSeqno){
	$("[name='selectedDIV']").attr("class","ui-Address_labelA");
	$("#selected" + rvgdAddrSeqno).attr("class","ui-Address_labelA ui-selected");
	$("#real_rvgdAddrSeqno").val(rvgdAddrSeqno);
}
function setDefaultAddr(rvgdAddrSeqno){
	var custId = $("#real_custId").val();
	var arg = {"custId" : custId,"rvgdAddrSeqno" : rvgdAddrSeqno};
	Util.ajax.postJson(srvMap.get('changeNoDefaultAddr'),arg,function(json,status){
        if (status) {
            Util.ajax.postJson(srvMap.get('changeDefaultAddr'),arg,function(newJson,newStatus){
        		if (newStatus) {
            		Util.dialog.tips('自动修改为默认地址！');
            		loadAddr();
        		}else{
           			Util.dialog.tips(json.returnMessage||'修改默认地址失败，请重试！');
        		}
    		})
        }else{
            Util.dialog.tips(json.returnMessage||'修改默认地址失败，请重试！');
        }
    })
}

function queryRegnNameByRegnCode(regnCode){
	var regnName = "";
	Util.ajax.postJsonSync(srvMap.get('queryRegnNameByRegnCode'),{"regnCode":regnCode},function(json,status){
        if (status) {
            regnName = json.bean.regnName;	
        }else{
            Util.dialog.tips(json.returnMessage||'查询失败，请重试！');
        }
    })
    return regnName;
}
