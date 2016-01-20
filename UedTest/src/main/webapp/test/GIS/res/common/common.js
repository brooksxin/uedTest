$(function(){
	function doResize(){  
		var h = $(window).height();
		h = ( h > 600 ) ? h : 600 ;
		// h = h - 86 ;
		$("#wrapContent").css({
			height:h+"px"
		});
	}
	doResize();

	$("#J_cancel").click(function(){
		closeDialog();
	});

	//获取菜单
	$.PostJson("res/data/menu.json?1=1","",function(state,json){
		if(state=='success'){
			if(json&&json.returnCode=='1'){
				var html = "";
				var zHref = window.location.href;
				for(var i=0,length=json.rows.length; i<length; i++){
					var keywords = json.rows[i].url;
					if(zHref.indexOf(keywords) > -1){
						html += '<li class="cur"><a href="'+json.rows[i].url+'">'+json.rows[i].name+'</a></li>';
					}else{
						html += '<li class=""><a href="'+json.rows[i].url+'">'+json.rows[i].name+'</a></li>';
					}
				}
				$(".aside .titlist").html(html).find("li a").css({"cursor":"pointer"});
			}
		}
	})

	$("#busi_form").find("input,textarea").each(function(){
	    $(this).bind("blur",function(e){
	        var _self = $(this);
	        var newVal = _self.val().replace(/[!<>@^*"#$'|\\~%]/g,'');
	        _self.val(newVal);
	    });
	})
});

(function($){
	//统一配置ajax请求URL
	//数据配置数组的配置参数，0为本地数据，1为远程数据
	var conf = 1 ;
	var srcPref = ["res/data/","hz/action/"];
	var requestURLs = [{
		//分页查询节点类型---标点类型配置
		"markerType_pageQuery":srcPref[conf]+"markerTypedata.json?1=1",
		//查询所有节点类型
		"markerType_getAll":srcPref[conf]+"markerInfoTpl.json?1=1",
		//新增节点类型---标点类型配置
		"markerType_addTemplate":srcPref[conf]+"markerTypedata.json?1=1",
		//修改节点类型---标点类型配置
		"markerType_updTemplate":srcPref[conf]+"markerTypedata.json?1=1",
		//删除节点类型---标点类型配置
		"markerType_delTemplate":srcPref[conf]+"markerTypedata.json?1=1",
		//模板分页查询---标点类型模板配置
		"markerTypeTpl_pageQuery":srcPref[conf]+"markerTypeTpl.json?1=1",
		//删除模板---标点类型模板配置
		"markerTypeTpl_delQuery":srcPref[conf]+"markerTypeTpl.json?1=1",
		//获取模板类型---标点类型模板配置
		"markerTypeTpl_typeQuery":srcPref[conf]+"markerTypeTpl.json?1=1",
		//获取动态属性url---标点类型模板配置
		"markerTypeTpl_urlQuery":srcPref[conf]+"markerTypeTpl.json?1=1",
		//新增保存---标点类型模板配置
		"markerTypeTpl_addTemplate":srcPref[conf]+"markerTypeTpl.json?1=1",
		//根据id查询模板属性---标点类型模板配置修改
		"markerTypeTpl_searchTemplate":srcPref[conf]+"markerTypeTplMod.json?1=1",
		//标记点信息搜索
		"markerInfodata":srcPref[conf]+"markerInfo.json?1=1",
		//获取模板类型---标记点新增
		"markerType_getAll":srcPref[conf]+"markerInfoTpl.json?1=1",
		//获取模板属性---标记点新增
		"markerInfoAddQuery":srcPref[conf]+"markerInfoTplAttr.json?1=1",
		//标记点信息保存---标记点新增
		"markerInfoAdd":srcPref[conf]+"markerInfoTplMod1.json?1=1",
		//修改保存---标记点信息配置
		"markerInfoMod":srcPref[conf]+"markerInfoTplMod1.json?1=1",
		//删除标记点---标记点信息配置
		"markerInfoDel":srcPref[conf]+"markerInfoTplMod1.json?1=1",
		//应用搜索---应用配置
		"appConfig_pageQuery":srcPref[conf]+"appConfig.json?1=1",
		//获取树---应用配置新增
		"tree_getAllRoot":srcPref[conf]+"appConfigTreeAdd.json?1=1",
		//获取树下的节点---应用配置新增
		"markerType_getAll":srcPref[conf]+"appConfigNodeAdd.json?1=1",
		//保存应用---应用配置新增
		"appConfig_addTemplate":srcPref[conf]+"appConfigMod.json?1=1",
		//修改保存---应用配置修改
		"appConfig_updTemplate":srcPref[conf]+"appConfigMod.json?1=1",
		//删除应用---应用配置
		"appConfig_delTemplate":srcPref[conf]+"appConfigMod.json?1=1",
		//树搜索---树配置
		"tree_getTreeRootByPage":srcPref[conf]+"treeConfig.json?1=1",
		//树新增保存---树新增配置
		"tree_addTreeNodes":srcPref[conf]+"treeConfig.json?1=1",
		//树修改查询---树修改配置
		"tree_upTreeNodesquery":srcPref[conf]+"treeConfigMod.json?1=1",
		//树修改保存---树修改配置
		"tree_updTreeNodes":srcPref[conf]+"treeConfigModSave.json?1=1",
		//删除树---树配置
		"tree_delRootTree":srcPref[conf]+"treeConfigModSave.json?1=1",
		//获取树节点区域---区域配置
		"tree_getTreeNodeArea":srcPref[conf]+"areaConfigMod2.json?1=1",
		
		//节点绑定区域保存---区域配置
		"tree_bindTreeNodeArea":srcPref[conf]+"areaConfigSave.json?1=1",
		//动态属性查询---动态属性配置
		"dynamicInfo_pageQuery":srcPref[conf]+"dynamicInfoSearch.json?1=1",
		//动态属性保存---动态属性新增配置
		"dynamicInfo_addTemplate":srcPref[conf]+"areaConfigSave.json?1=1",
		//动态属性修改保存---动态属性修改配置
		"dynamicInfo_updTemplate":srcPref[conf]+"areaConfigSave.json?1=1",
		//动态属性删除---动态属性配置
		"dynamicInfo_delTemplate":srcPref[conf]+"areaConfigSave.json?1=1",
	    //修改保存---标点类型模板配置
		"markerTypeTpl_modTemplate":srcPref[conf]+"markerTypeTpl.json?1=1",
		//按组织id分页查找已经绑定的标点信息
		"getBindPointByNodeId":srcPref[conf]+"markerBind.json?1=1",
		//获取已使用的icon
		"iconType":srcPref[conf]+"icon.json?1=1"

	},{
		//模板分页查询
		"markerTypeTpl_pageQuery":srcPref[conf]+"common.action?uid=templateQuery",
		//模板属性查询
		"markerTypeTpl_searchTemplate":srcPref[conf]+"common.action?uid=templatePropsQuery",
		//添加模板
		"markerTypeTpl_addTemplate":srcPref[conf]+"common.action?uid=addTemplate",
		//删除模板
		"markerTypeTpl_delQuery":srcPref[conf]+"common.action?uid=delTemplate",
		//获取模板类型---标点类型模板配置
		"markerTypeTpl_typeQuery":srcPref[conf]+"common.action?uid=getSignTypeAll",
		//获取动态属性url
		"markerTypeTpl_urlQuery":srcPref[conf]+"common.action?uid=getDynamicinfoAll",
		//修改模板
		"markerTypeTpl_modTemplate":srcPref[conf]+"common.action?uid=updTemplate",
		//模板导出
		"markerTypeTpl_exportTemplate":srcPref[conf]+"common-export.action?uid=exportTemplateProps",
		//分页查询节点类型
		"markerType_pageQuery":srcPref[conf]+"common.action?uid=getSigntypeByPage",
		//按照id获取节点类型
		"getMarkerTypeById":srcPref[conf]+"common.action?uid=getSigntypeById",
		//查询所有节点类型
		"markerType_getAll":srcPref[conf]+"common.action?uid=getSignTypeAll",
		//新增节点类型
		"markerType_addTemplate":srcPref[conf]+"common.action?uid=saveSigntype",
		//修改节点类型
		"markerType_updTemplate":srcPref[conf]+"common.action?uid=updateSigntype",
		//删除节点类型
		"markerType_delTemplate":srcPref[conf]+"common.action?uid=deleteSigntypeById",
		//分页查询动态属性
		"dynamicInfo_pageQuery":srcPref[conf]+"common.action?uid=getDynamicinfoByPage",
		//查询所有动态属性
		"dynamicInfo_getAll":srcPref[conf]+"common.action?uid=getDynamicinfoAll",
		//新增动态属性
		"dynamicInfo_addTemplate":srcPref[conf]+"common.action?uid=saveDynamicinfo",
		//修改动态属性
		"dynamicInfo_updTemplate":srcPref[conf]+"common.action?uid=updateDynamicinfo",
		//删除动态属性

		"dynamicInfo_delTemplate":srcPref[conf]+"common.action?uid=deleteDynamicinfoById",
		//分页查询应用信息
		"appConfig_pageQuery":srcPref[conf]+"common.action?uid=getApplicationByPage",
		//删除应用信息
		"appConfig_delTemplate":srcPref[conf]+"common.action?uid=deleteApplicationById",
		//添加应用信息
		"appConfig_addTemplate":srcPref[conf]+"common.action?uid=saveApplication",
		//查询所有树的根节点
		"tree_getAllRoot":srcPref[conf]+"common.action?uid=getAllTreeRootNode",
		"tree_getTreeRootByPage":srcPref[conf]+"common.action?uid=getTreeRootNodeByPage",
		"tree_addTreeNodes":srcPref[conf]+"common.action?uid=addTreeNodes",
		"tree_upTreeNodesquery":srcPref[conf]+"common.action?uid=queryForUpdTreeNodes",
		"tree_updTreeNodes":srcPref[conf]+"common.action?uid=updTreeNodes",
		"tree_delRootTree":srcPref[conf]+"common.action?uid=delRootTree",
		"tree_bindTreeNodeArea":srcPref[conf]+"common.action?uid=bindTreeNodeArea",
		"tree_getTreeNodeArea":srcPref[conf]+"common.action?uid=getTreeNodeArea",
		"tree_delTreeNodeArea":srcPref[conf]+"common.action?uid=delNodeArea",
		
		//按照id查找
		"appConfig_getAppById":srcPref[conf]+"common.action?uid=getApplicationById",
		//修改应用信息
		"appConfig_updTemplate":srcPref[conf]+"common.action?uid=updateApplication",

		"dynamicInfo_delTemplate":srcPref[conf]+"common.action?uid=deleteDynamicinfoById",
		//标记点搜索
		"markerInfodata":srcPref[conf]+"common.action?uid=queryMkpoint",
		//标记点添加查询
		"markerInfoAddQuery":srcPref[conf]+"common.action?uid=querypointAdd",
		"markerInfoAdd":srcPref[conf]+"common.action?uid=markerInfoAdd",
		"markerInfoimportMkPoint":srcPref[conf]+"common-import?uid=importMkPoint",
		"kmlimport":srcPref[conf]+"common-kmlimport?uid=kmlimport",
		"markerInfoDel":srcPref[conf]+"common.action?uid=deletePointByIds",
		"markerInfoMod":srcPref[conf]+"common.action?uid=querypointUpdate",
		
		//根据应用id查找角色信息
		"getRolesByAppId":srcPref[conf]+"common.action?uid=getRolesByAppId",
		//根据应用id和角色id查询应用所使用的模板，并且判断哪些属性已经被选择 
		"getTemplateByAppId":srcPref[conf]+"common.action?uid=getTemplateByAppId",
		//保存前台提交的属性权限配置
		"saveAppRoleConfig":srcPref[conf]+"common.action?uid=saveAppRoleConfig",
		//分页查询gis内部角色
		"getGisRoleByPage":srcPref[conf]+"common.action?uid=getGisRoleByPage",
		//删除gis内部角色
		"deleteGisRoleById":srcPref[conf]+"common.action?uid=deleteGisRoleById",
		//根据gis内部角色id查看绑定的模板属性
		"getAllTemplateByGisRoleId":srcPref[conf]+"common.action?uid=getAllTemplateByGisRoleId",
		//保存新增的gis内部角色
		"saveGisRole":srcPref[conf]+"common.action?uid=saveGisRole",
		//修改gis内部角色属性权限配置
		"updateGisRole":srcPref[conf]+"common.action?uid=updateGisRole",
		//得到所有的gis内部橘色
		"getAllGisRoleByAppIdRoleId":srcPref[conf]+"common.action?uid=getAllGisRoleByAppIdRoleId",
		//按组织id分页查找已经绑定的标点信息
		"getBindPointByNodeId":srcPref[conf]+"common.action?uid=getBindPointByNodeId",
		//按条件分页查找标记点用来绑定
		"getPointToBind":srcPref[conf]+"common.action?uid=getPointToBind",
		//按照节点绑定的区域查找区域内未绑定的标记点
		"getPointByNodeIdArea":srcPref[conf]+"common.action?uid=getPointByNodeIdArea",
		//保存标点绑定
		"bindPoint":srcPref[conf]+"common.action?uid=bindPoint",
		//分页查询同步属性
		"getSynPropsByPage":srcPref[conf]+"common.action?uid=getSynPropsByPage",
		//删除同步属性
		"deleteSynPropsById":srcPref[conf]+"common.action?uid=deleteSynPropsById",
		//新增同步属性
		"saveSynProps":srcPref[conf]+"common.action?uid=saveSynProps",
		//修改同步属性
		"updateSynProps":srcPref[conf]+"common.action?uid=updateSynProps",
		//获取所有的同步属性
		"getSynPropsAll":srcPref[conf]+"common.action?uid=getSynPropsAll",
		//获取已使用的icon
		"getUsedIconType":srcPref[conf]+"common.action?uid=getUsedIconType",
		
		
		//根据业务的id获取模板中的属性信息
		"getPropByBusinessId":srcPref[conf]+"common.action?uid=getPropByBusinessId",
		//新增业务信息
		"saveBusinessInfo":srcPref[conf]+"common.action?uid=saveBusinessInfo",
		//修改业务信息
		"updateBusinessInfo":srcPref[conf]+"common.action?uid=updateBusinessInfo",
		//根据业务的id删除业务信息
		"deleteBusinessInfoById":srcPref[conf]+"common.action?uid=deleteBusinessInfoById",
		//分页查询业务信息
		"getBusinessInfoByPage":srcPref[conf]+"common.action?uid=getBusinessInfoByPage",
		//按id查找业务信息
		"getBusinessInfoById":srcPref[conf]+"common.action?uid=getBusinessInfoById",
		//kml转换坐标
		"kmlconvert":srcPref[conf]+"common-kmlconvert?uid=kmlconvert"
		
		
	}];
	
	window.REQURLS = requestURLs[conf];
	
    $.extend({
    	/*
    	* 基本的ajax，返回html 
    	*/
      AjaxHtml: function(url, datas , callback) {
          $.ajax({
              url: url ,
              type: "GET",
              data : datas +"&_=" + (new Date()).getTime(),
              cache: false,
              dataType: "html",
							beforeSend: function (xhr) {
							    xhr.overrideMimeType("text/plain; charset=utf-8");
							},
              success: function(html) {
                  callback("success", html);
              },
              error: function() {
                  callback("error", null);
              }
          });
      },
      /*
      * post方式提交数据，适用于大数据提交。返回的JSON要符合规范。
      * 引号不能去掉。完整写法：{"key" , "value"}
      */
      PostJson: function(url, datas , callback) {
      	$.ajax({
      	    url: url,
      	    type: "POST",
      	    data : datas +"&_=" + (new Date()).getTime(),
      	    cache: false,
      	    dataType:'json',
      	    beforeSend: function (xhr) {
      	        xhr.overrideMimeType("text/plain; charset=utf-8");
      	    },
      	    success: function(json) {
      	        callback("success", json);
      	    },
      	    error: function(e) {
      	        callback("error", null);
      	    }
      	});
      }
  });
})(jQuery);

//阻止事件冒泡
function stopEvent(e){
    if(e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
	}
}
//打开窗口
function openWindow(title,url,width,height){
	//art.dialog.data('tel',GLOBE_tel);//传递参数
	art.dialog.open( url , 
		{
		title: title,
		lock: true,
		width: width+'px',
		height: height+'px',
		dblclick_enable: true,
    opacity:.4
	},
	false);
}	
//关闭窗口	
function closeDialog(id){
	if(id){
    	art.dialog.list[id].close();
    }else{art.dialog.close();} 
}
//关闭所有窗口
function closeDialogDD(){
    //关闭所有
    var list = art.dialog.list;
    for (var i in list) {
        list[i].close();
    };
}
//刷新表格
function gridReload(id){
	var id = id||"grid";
  if($('#'+id).length){
  	$('#'+id).omGrid('reload');
  }
}
//BASE64编码
function encodeBase64(str){
	try{
		var wordArray = CryptoJS.enc.Utf8.parse(str);
		var base64Json= CryptoJS.enc.Base64.stringify(wordArray);
		return base64Json;
	}catch(e){
		//console.log('CryptoJS is not include.');
	}
	return str;
}

/*
    handlebars扩展
    eg:
	$('#content').temp( $('#template'),  { name: "Alan" } );
	$('#content').temp( 'string' ,  { name: "Alan" } );
*/
;(function($){
    var compiled = {};
    $.fn.temp = function(template, data) {
        if(template instanceof jQuery){
            template = template.val();
        }
	    compiled[template] = Handlebars.compile(template);
	    this.html(compiled[template](data));
	    return this;
    };
})(jQuery);

/*
 * 按钮状态控制
 * */
function toggleButtonStyle(obj , istyle , txt ){
	if(istyle){
		$(obj).html('<em><img class="icon_loading" title="正在提交中..." src="res/theme/default/images/loading.gif">正在提交中...</em>');
	}else{
		$(obj).html('<em>'+(txt||"保存")+'</em>');
	}
}

/*
等待，成功，失败，警告等提示方法
state：-1代表loading ， 0代表失败，1代表成功，2代表警告，3代表问题。 
msg：提示信息。
*/
function result_prompt(state,msg,zflag){
	var stateMsg = msg ;
	if(state==-1){
		return art.dialog({
			content: msg? "<div class='artLoading'>"+stateMsg+"</div>" : "<div class='artLoading'>请稍候，正在保存数据...</div>",
			drag:false,
			cancel: false,
			id: 'loadingBusiId'
		});
	}
	var stateIcon = 'succeed';
	if(state==0){  
		stateIcon = 'error';
	}else if(state==2){
		stateIcon = 'warning';
	}else if(state==3){
		stateIcon = 'question';
	}
	return art.dialog({
		// icon对应skins/icons/目录下相应名称的图片
		icon: stateIcon,
		content: '<p style="font-size:14px;width:200px;">'+stateMsg+'</p>',
		drag:false,
		cancel: false,
		lock:true,
		opacity:0,
		button :[
			{
				name: '确定',
				callback: function () {
					this.close();
					if(state!=2&&state!=3&&state!=0){
						closeDialog();   //关闭其他窗口
					}
					if(zflag){
						closeDialog();   //关闭其他窗口
					}
					return false;
				},
				focus: true
			}
		]
	});
}
/*
 * 弹出确定框，第一个参数为提示信息，第二个参数为确定之后调用的函数，第二个参数为取消按钮调用的函数，不需要使用回调函数的时候可以不传
 * result_comfirm('测试',function(){alert(1);},function(){alert(2)});
 * */
function result_comfirm(msg,cbSure,cbRefuse){
	var stateMsg = msg ;
	stateIcon = 'warning';
	return art.dialog({
		// icon对应skins/icons/目录下相应名称的图片
		icon: stateIcon,
		content: '<p style="font-size:14px;width:180px;">'+stateMsg+'</p>',
		drag:false,
		cancel: false,
		lock:true,
		opacity:0,
		button :[
			{
				name: '确定',
				callback: function () {
					this.close();
					if(cbSure)
					cbSure();
					return false;
				},
				focus: true
			},
			{
				name: '取消',
				callback: function () {
					this.close();
					if(cbRefuse)
						cbRefuse();
					return false;
				}
			}
		]
	});
}

function placeholder(dom,text,flag){
	var value = $(dom).val();
	if(value == "")
		$(dom).val(text).css("color","#A9A9A9");
	var resHtml = '<span><em style="color:red;">*</em></span><span class="right" style="display:none;">&nbsp;<img src="res/theme/default/images/right.png" /></span>';
	if(!flag){
		$(dom).after(resHtml);
	}
	$(dom).on("focus",function(){
		if($(this).val() == text){
			$(this).val("").css("color","black");
		}
		$(this).next().show().siblings("span").hide();
	}).on("blur",function(){
		if($(this).val() == "" || $(this).val() == text){
			$(this).val(text).css("color","#A9A9A9");
			$(this).next().show().siblings("span").hide();
		}
		if($(this).val() != "" && $(this).val() != text){
			$(this).next().hide().siblings("span").show();
		}
	})
}


function placeholderByReg(dom,text,reg){
	var value = $(dom).val();
	if(value == "")
	$(dom).val(text).css("color","#A9A9A9");
	$(dom).on("focus",function(){
		    if($(this).val() == text)
		    $(this).val("").css("color","black");
			$(this).next().show().siblings("span").hide();
		}).on("blur",function(){
		    if($(this).val() == ""){
		      $(this).val(text).css("color","#A9A9A9");
		      
		    }
		    if(reg.test($(this).val()) && $(this).val() != text){
				if($(this).val() != text){
         			$(this).next().hide().siblings("span").show();
        		}
			}
			reg.lastIndex = 0;
		})
}

function textareaLimit(){
	$("textarea[maxlength]").keyup(function(){ 
		var area=$(this); 
		var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值 
		if(max>0){ 
			if(area.val().length>max){ //textarea的文本长度大于maxlength 
				area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值 
			} 
		} 
	}); 
}

/*
 * MAP对象，实现MAP功能
 *
 * 接口：
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value) 
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 *
 * 例子：
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *
 */
function Map() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };

    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };

    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };

    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    };

    //删除指定KEY的元素，成功返回True，失败返回False
    this.removeByKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValue = function(_value) {//removeByValueAndKey
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValueAndKey = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value && this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    };

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //判断MAP中是否含有指定VALUE的元素
    this.containsObj = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value && this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    
    //获取MAP中所有VALUE的数组（ARRAY）
    this.valuesByKey = function(_key) {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key == _key) {
                arr.push(this.elements[i].value);
            }
        }
        return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
    
    //获取key通过value
    this.keysByValue = function(_value) {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            if(_value == this.elements[i].value){
                arr.push(this.elements[i].key);
            }
        }
        return arr;
    };
    
    //获取MAP中所有KEY的数组（ARRAY）
    this.keysRemoveDuplicate = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            var flag = true;
            for(var j=0;j<arr.length;j++){
                if(arr[j] == this.elements[i].key){
                    flag = false;
                    break;
                } 
            }
            if(flag){
                arr.push(this.elements[i].key);
            }
        }
        return arr;
    };
}

var map = new Map();
map.put("101", "自有渠道");
map.put("102", "签约渠道");
map.put("103", "直供渠道");
map.put("104", "联通渠道");
map.put("105", "电信渠道");
map.put("106", "其他竞争对手渠道");
map.put("201", "A+类集团客户");
map.put("202", "A类集团客户");
map.put("203", "B类集团客户");
map.put("204", "C类集团客户");
map.put("205", "D类集团客户");
map.put("206", "P类集团客户");

function getImgType(key){
	return map.get(key);
}