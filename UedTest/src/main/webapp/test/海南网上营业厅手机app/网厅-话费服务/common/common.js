(function($){
    $.extend( $ , {
        /*
        * 扩展jQuery的Ajax方法，用于异步获取数据:
        * post方式提交数据，适用于大数据提交。返回的JSON要符合规范。
        * 引号不能去掉。完整写法：{"key" , "value"}
        */
        PostJson: function(url, datas , callback , flag ) {
            if(!flag){nbhtml5mobi.utils.showLoading();}
        	$.ajax({
                url: url,
                type: "POST",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "json",
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(json) {
                    if(json&&json.returnCode=='0'){
                        callback( "success",json );
                    }else if(json&&json.returnCode=='302'){
                        //会话超时
                    	cordova.exec(function(winParam){
            	    		//alert(winParam);
            	    	},function(err){
            	    		alert(err);
            	    	},"Func","cancellation",[]);
                    }else{
                        //数据返回错误
                        callback( "error",json );
                    }
                },
                error: function(e) {
                    callback( "error", {"returnMessage":"服务器连接出错!"} );
                },
                complete:function(){
                    if(!flag){nbhtml5mobi.utils.hideLoading();}
                }
                
            });
        },
        /*
         * 获取url参数，多个参数
         * //Get object of URL parameters
         * var allVars = $.getUrlVars();
         * //Getting URL var by its name
         * var getName = $.getUrlVar('name');
         */
        getUrlVars: function(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });

    //覆盖alert
    /*
     var proxied = window.alert;
     window.alert = function(msg){
         try{
            //console.log(123);
            return window.Func.showDialog(2,msg);
         }catch(e){
            //console.log(msg);
            return proxied.apply(this, arguments);
         }
     }
    */
    if(window.Func){
        window.alert = function(msg){
            try{
                return window.Func.showDialog(2,msg);
            }catch(e){}
        }
    }
})(jQuery);
/*
    handlebars扩展
    eg:
	$('#content').temp( $('#template'),  { name: "Alan" } );
	$('#content').temp( 'string' ,  { name: "Alan" } );
*/
;(function($){
    var compiled = {};
    $.fn.temp = function(template, data) {
        /*
        if( $.zepto.isZ(template) ){
            template = template.val();
        }
        */
        if(template instanceof jQuery){
            template = template.val();
        }
		compiled[template] = Handlebars.compile(template);
	    this.html(compiled[template](data));
	    return this;
    };
})(jQuery);

//其他工具方法
var nbhtml5mobi = {
    loginInfo : function(){
        var nowDate = new Date(),
            nowHour = nowDate.getHours(),
            str = '';
        if(nowHour < 6){ str = "凌晨好！"; } 
        else if (nowHour < 9){ str = "早上好！"; } 
        else if (nowHour < 12){ str = "上午好！"; } 
        else if (nowHour < 13){ str = "中午好！"; } 
        else if (nowHour < 17){ str = "下午好！"; } 
        else if (nowHour < 19){ str = "傍晚好！"; } 
        else if (nowHour < 22){ str = "晚上好！"; } 
        else { str = "夜里好！"; } 
        return str||"您好";
    }
}
nbhtml5mobi.utils = {
    /*
    localStorage只支持字符串，如果要放json，请先使用JSON.stringify()转换
    读取使用JSON.parse()读取
    */
    setParam: function(name, value) {
        localStorage.setItem(name, value);
    },
    getParam: function(name) {
        return localStorage.getItem(name);
    },
    removeParam:function(name){
    	localStorage.removeItem(name);
    },
    clearParam:function(){
    	//清除所有的存储，谨慎使用
    	localStorage.clear();
    },
    paramSize:function(){
    	return localStorage.length;
    },
    /*
        控制loading.
    */
    showLoading:function(text){
        if(!text)text='正在加载数据...';
        $('#J_loading_ui .nb-ui-loader-verbose').html(text);
        $('#J_loading_ui').removeClass('fn-hide');
    },
    hideLoading:function(){
        $('#J_loading_ui').addClass('fn-hide');
    },
    /*
        离线缓存管理器
    */
    cacheManager:new CacheManager(window.cacheCfg)
}

/*
    离线缓存管理器
*/
function CacheManager(config){
    this.config=config;
}
/*
    从离线缓存中获取数据,当前方法有两个功能：
    1、从后台获取数据，第二个参数是一个回调函数，
    当离线缓存中没有要获取的数据时 或 当请求后台的入参值改变时，
    调用update方法从后台获取新数据，并覆盖旧数据
    2、获取本地插入的数据，第二个参数是一个字符串，
    当离线缓存中没有数据时直接返回空
*/
CacheManager.prototype.get=function(name,callback,param){
    var target=this.config[name];
    var cacheKey=target.key;
    var json=nbhtml5mobi.utils.getParam(cacheKey);
    //当callback是方法时，表示从后台获取数据，需要使用回调处理数据
    if(typeof callback == 'function'&&target['url']){
        //realTime是在config对象中配置，
        //如果realTime配置true,表示每次都从后台取数据
        if(json&&!target.realTime){
            json=JSON.parse(json);
            if(json.param==param){
                callback('success',json);
                return;
            }
        }
        this.update(name,callback,param);
        return;
    }else{
        //callback不是方法的时候，即时返回数据
        return json;
    }
}
CacheManager.prototype.update=function(name,callback,param){
    var target=this.config[name];
    var cacheKey=target.key;
    //当callback是方法时，表示从后台刷新数据
    if(typeof callback == 'function'&&target.url){
        var _self = this;
        $.PostJson(target.url,param,function(state,json){
            if(state=='success'&&json.returnCode=='0'){
                json.param=param;
                nbhtml5mobi.utils.setParam(cacheKey,JSON.stringify(json));
            }else{
                _self.del(name);
            }
            callback(state,json);
        },false);
    }else{
        //此时callback是字符串
        nbhtml5mobi.utils.setParam(cacheKey,callback);
    }
}
CacheManager.prototype.del=function(name){
    var target=this.config[name];
    var cacheKey=target.key;
    nbhtml5mobi.utils.removeParam(cacheKey);
}
CacheManager.prototype.clearAll=function(){
    for(var attr in this.config){
        var target=this.config[attr];
        var cacheKey=target.key;
        nbhtml5mobi.utils.removeParam(cacheKey);
    }
}

/*
 * 通用正则表达式
 * floatNum匹配可精确到小数点后两位或者整数
 */
var regExp={
        "cellphone":new RegExp('^(1[0-9]{10})$','g'),
        "number":new RegExp('^(\\d+$)','g'),
        "floatNum":new RegExp('^\\d+(\\.\\d{1,2})?$','g')
}
window.regExp=regExp;

$(function(){
    $(".ui-head").on('click','.nb-ui-head-icon-return',function(){
        if($(this).attr("href")=="webGoBack"){
            window.history.go(-1);
            return false;
        }
    })    
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});
/* 验证移动手机号  */
function ValidateCallNumber(strCallNumber){ 
    var objRegExp  = new RegExp("(13[4-9]{1}[0-9]{8})|(150[0-9]{8})|(182[0-9]{8})|(151[0-9]{8})|(152[0-9]{8})|(155[0-9]{8})|(157[0-9]{8})|(158[0-9]{8})|(159[0-9]{8})|(188[0-9]{8})|(187[0-9]{8})|(147[0-9]{8})|(183[0-9]{8})|(156[0-9]{8})|(184[0-9]{8})","g");  
    return(objRegExp.test(strCallNumber));
}

function error_info_show(target,func,errinfo){
    var html='<div class="errinfo-wrap fn-relative">'+
        '<div class="errinfo-line errinfo-line-mgt10">'+
            '数据加载失败了!'+
        '</div>'+
        '<div class="errinfo-line errinfo-line-mgt30">'+
            '单击“重试”按钮重新加载!'+
        '</div>'+
        '<img src="../../theme/default/images/noexit.png" class="errinfo-img"/>'+
        '<span class="retry-button">重试</span>'+
        '</div>';
    var count=0;
    var to=null;
    $(target).html(html).find('.retry-button').on('click',function(){
        func();
    });
    $(target).find('img').on('click',function(){
       if(!to){
         count++;
         to=setTimeout(function(){
            to=null;
            count=0;
         },3000);
       }else{
         count++;
         if(count==5){
            clearTimeout(to);
            to=null;
            count=0;
            alert(errinfo);
         }
       }
    });
}

