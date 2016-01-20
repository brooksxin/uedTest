/**
 * 通过 HTTP 请求加载远程数据，底层依赖jQuery的AJAX实现。当前接口实现了对jQuery AJAX接口的进一步封装。
 */
define(['jquery',''], function($){
	var ajax = {
		/**
		 * 请求状态码
		 * 
		 * @type {Object}
		 */
		reqCode : {
			/**
			 * 成功返回码 0000
			 * 
			 * @type {Number} 1
			 * @property SUCC
			 */
			SUCC : 0
		},
		/**
		 * 请求的数据类型
		 * 
		 * @type {Object}
		 * @class reqDataType
		 */
		dataType : {
			/**
			 * 返回html类型
			 * 
			 * @type {String}
			 * @property HTML
			 */
			HTML : "html",
			/**
			 * 返回json类型
			 * 
			 * @type {Object}
			 * @property JSON
			 */
			JSON : "json",
			/**
			 * 返回text字符串类型
			 * 
			 * @type {String}
			 * @property TEXT
			 */
			TEXT : "text"
		},
		/**
		 * 超时,默认超时30000ms
		 * 
		 * @type {Number} 10000ms
		 * @property TIME_OUT
		 */
		TIME_OUT : 60000,
		/**
		 * 显示请求成功信息
		 * 
		 * @type {Boolean} false
		 * @property SHOW_SUCC_INFO
		 */
		SHOW_SUCC_INFO : false,
		/**
		 * 显示请求失败信息
		 * 
		 * @type {Boolean} false
		 * @property SHOW_ERROR_INFO
		 */
		SHOW_ERROR_INFO : false,
		/**
		 * GetJson是对Util.ajax的封装,为创建 "GET" 请求方式返回 "JSON"(text) 数据类型
		 * @param {String}
		 *            url HTTP(GET)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] GET请求成功回调函数
		 */
		getJson : function(url, cmd, callback) {
			if (arguments.length !== 3)
				callback = cmd, cmd = '';
			dataType = this.dataType.TEXT;
			// var _this = this;
			// setTimeout( function(){_this.ajax(url, 'GET', cmd, dataType,
			// callback)},1000);
			this.ajax(url, 'GET', cmd, dataType, callback);
		},
		/**
		 * PostJsonAsync是对Util.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型,
		 * 采用同步阻塞的方式调用ajax
		 * @param {String}
		 *            url HTTP(POST)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] POST请求成功回调函数
		 */
		postJsonSync : function(url, cmd, callback) {
			dataType = this.dataType.TEXT;
			this.ajax(url, 'POST', cmd, dataType, callback, true);
		},
		/**
		 * PostJson是对Util.ajax的封装,为创建 "POST" 请求方式返回 "JSON"(text) 数据类型
		 * @param {String}
		 *            url HTTP(POST)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] POST请求成功回调函数
		 */
		postJson : function(url, cmd, callback,flag) {
	        // if(!flag){Util.loading.showLoading();}
			dataType = this.dataType.TEXT;
			// var _this = this;
			// setTimeout( function(){_this.ajax(url, 'POST', cmd, dataType,
			// callback)},1000);
			this.ajax(url, 'POST', cmd, dataType, callback,'',flag);
		},
		/**
		 * loadHtml是对Ajax load的封装,为载入远程 HTML 文件代码并插入至 DOM 中
		 * @param {Object}
		 *            obj Dom对象
		 * @param {String}
		 *            url HTML 网页网址
		 * @param {Function}
		 *            callback [optional,default=undefined] 载入成功时回调函数
		 */
		loadHtml : function(obj, url, data, callback) {
			$(obj).load(url, data, function(response, status, xhr) {
				callback = callback ? callback : function() {
				};
				status == "success" ? callback(true) : callback(false);
			});
		},
		/**
		 * loadTemp是对handlebars 的封装,请求模版加载数据
		 * @param {Object}
		 *            obj Dom对象
		 * @param {Object}
		 *            temp 模版
		 * @param {Object}
		 *            data 数据
		 */
		loadTemp : function(obj, temp, data) {
			var template = Handlebars.compile((temp instanceof jQuery)?temp.html():temp);
			obj = (obj instanceof jQuery)?obj:$(obj);
			obj.html(template(data));
		},
		/**
		 * GetHtml是对Util.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
		 * @param {String}
		 *            url HTTP(GET)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] GET请求成功回调函数
		 */
		getHtml : function(url, cmd, callback) {
			if (arguments.length !== 3)
				callback = cmd, cmd = '';
			dataType = this.dataType.HTML;
			this.ajax(url, 'GET', cmd, dataType, callback);
		},
		/**
		 * GetHtmlSync是对Util.ajax的封装,为创建 "GET" 请求方式返回 "hmtl" 数据类型
		 * 采用同步阻塞的方式调用ajax
		 * @param {String}
		 *            url HTTP(GET)请求地址
		 * @param {Object}
		 *            cmd json对象参数
		 * @param {Function}
		 *            callback [optional,default=undefined] GET请求成功回调函数
		 */
		getHtmlSync : function(url, cmd, callback) {
			if (arguments.length !== 3)
				callback = cmd, cmd = '';
			dataType = this.dataType.HTML;
			this.ajax(url, 'GET', cmd, dataType, callback,true);
		},
		/**
		 * 基于jQuery ajax的封装，可配置化
		 * 
		 * @method ajax
		 * @param {String}
		 *            url HTTP(POST/GET)请求地址
		 * @param {String}
		 *            type POST/GET
		 * @param {Object}
		 *            cmd json参数命令和数据
		 * @param {String}
		 *            dataType 返回的数据类型
		 * @param {Function}
		 *            callback [optional,default=undefined] 请求成功回调函数,返回数据data和isSuc
		 */
		ajax : function(url, type, cmd, dataType, callback, sync,flag) {
			var param = "";
			/*if (typeof (cmd) == "object"){
				param = JSON.stringify(cmd);
			}else if(typeof(cmd)=="string"){
				param = cmd;
			}*/
			//cmd = this.jsonToUrl(cmd);
			async = sync ? false : true;
			var thiz = Util.ajax;
			var cache = (dataType == "html") ? true : false;
			$.ajax({
				url : url,
				type : type,
				data : cmd,
				// data : encodeURI(cmd),
				/*processData: false,  	// 告诉jQuery不要去处理发送的数据
				contentType: false,		// 告诉jQuery不要去设置Content-Type请求头*/
				cache : cache,
				dataType : dataType,
				async : async,
				timeout : thiz.TIME_OUT,
				beforeSend : function(xhr) {
					xhr.overrideMimeType("text/plain; charset=utf-8");
				},
				success : function(data) {
					if (!data) {
						return;
					}
					if (dataType == "html") {
						callback(data, true);
						return;
					}
					try {
						data = eval('(' + data + ')');
						if (data.returnCode=='BUSIOPER=RELOGIN') {
							if (top) {
				                top.document.location.href = '../../login.html';
				            }else{
				                window.location.href = '../../login.html';
				            }
							return;
						}
					} catch (e) {
						alert("JSON Format Error:" + e.toString());
					}
					var isSuc = thiz.printReqInfo(data);
					if (callback && data) {
						callback(data || {}, isSuc);
					}
				},
				error : function() {
				    var retErr ={};
				    retErr['returnCode']="404";
				    retErr['returnMessage']="网络异常或超时，请稍候再试！"; 
					callback(retErr, false);
				},
	            complete:function(){
	                //if(!flag){Util.loading.hideLoading();}
	            }
			});
		},
		/**
		 * 打开请求返回代码和信息
		 * 
		 * @method printRegInfo
		 * @param {Object}
		 *            data 请求返回JSON数据
		 * @return {Boolean} true-成功; false-失败
		 */
		printReqInfo : function(data) {
			if (!data)
				return false;
			var code = data.returnCode, msg = data.returnMessage, succ = this.reqCode.SUCC;
			if (code == succ) {
				if (this.SHOW_SUCC_INFO) {
					// Util.msg.infoCorrect([ msg, ' [', code, ']' ].join(''));
					Util.msg.infoCorrect(msg);
				}
			} else {
				// Util.msg.infoAlert([ msg, ' [', code, ']' ].join(''));
				if (this.SHOW_ERROR_INFO) {
					Util.dialog.tips(msg);
				}
			}
			return !!(code == succ);
		},
		/**
		 * JSON对象转换URL参数
		 * 
		 * @method printRegInfo
		 * @param {Object}
		 *            json 需要转换的json数据
		 * @return {String} url参数字符串
		 */
		jsonToUrl : function(json) {
			var temp = [];
			for ( var key in json) {
				if (json.hasOwnProperty(key)) {
					var _key = json[key] + "";
					_key = _key.replace(/\+/g, "%2B");
					_key = _key.replace(/\&/g, "%26");
					temp.push(key + '=' + _key);
				}
			}
			return temp.join("&");
		},
		msg : {
			"suc" : function(obj, text) {
				var _text = text || "数据提交成功！";
				$(obj).html(
						'<div class="msg-hint">' + '<h3 title=' + _text
								+ '><i class="hint-icon hint-suc-s"></i>' + _text
								+ '</h3>' + '</div>').show();
			},
			"war" : function(obj, text) {
				var _text = text || "数据异常，请稍后尝试!";
				$(obj).html(
						'<div class="msg-hint">' + '<h3 title=' + _text
								+ '><i class="hint-icon hint-war-s"></i>' + _text
								+ '</h3>' + '</div>').show();
			},
			"err" : function(obj, text) {
				var _text = text || "数据提交失败!";
				$(obj).html(
						'<div class="msg-hint">' + '<h3 title=' + _text
								+ '><i class="hint-icon hint-err-s"></i>' + _text
								+ '</h3>' + '</div>').show();
			},
			"load" : function(obj, text) {
				var _text = text || "正在加载中，请稍候...";
				$(obj).html(
						'<div class="msg-hint">' + '<h3 title=' + _text
								+ '><i class="hint-loader"></i>' + _text + '</h3>'
								+ '</div>').show();
			},
			"inf" : function(obj, text) {
				var _text = text || "数据提交中，请稍等...";
				$(obj).html(
						'<div class="msg-hint">' + '<h3 title=' + _text
								+ '><i class="hint-icon hint-inf-s"></i>' + _text
								+ '</h3>' + '</div>').show();
			},
			"errorInfo" : function(obj, text) {
				var _text = text || "数据提交失败!";
				$(obj).html('<div class="ui-tiptext-container ui-tiptext-container-message"><p class="ui-tiptext ui-tiptext-message">'
						+ '<i class="ui-tiptext-icon icon-message" title="阻止"></i>'
						+ _text + '</p>' + '</div>').show();
			}
		}
	};

	return ajax;
});