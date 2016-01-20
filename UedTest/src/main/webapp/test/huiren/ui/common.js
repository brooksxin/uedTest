var conf = 0; //控制服务
var srvMap = (function(){
    var srcPref = ["ui/json/","http://www.ha.10086.cn/edu/"];
    var dataArray = [
         {

         },
         {

         }
    ];
    
    return {
        add: function(uid, mockSrc, srvSrc) {
            dataArray[0][uid] = srcPref[conf] + mockSrc;
            dataArray[1][uid] = srcPref[conf] + 'hn/action/' + srvSrc;         
        },
        get: function(uid) {
            return dataArray[conf][uid];
        },
        dataArrays:function(){
            return dataArray[conf];
        },
        getBaseUrl: function() {
            return srcPref[conf];
        }
    };
})();
window.dataArray = srvMap.dataArrays();

$.PostJson = function(url, datas , callback) {
    $.ajax({
        url: url,
        type: "POST",
        data : datas +"&_=" + (new Date()).getTime(),
        cache: false,
        dataType: "json",
        timeout: 60000,
        beforeSend: function (xhr) {
            xhr.overrideMimeType("text/plain; charset=utf-8");
        },
        success: function(json) {
            if(window.conf == 0){
                setTimeout(function(){
                    callback("success", json);
                }, 1000)
            }else{
                callback("success", json);
            }
        },
        error: function(e) {
            if(e.statusText == 'timeout'){
                callback("error", {"rtnCode": "-100", "rtnMsg": "连接超时！"});
            }else{
                callback("error", null);
            }
        }
    });
}
$.getUrlVars = function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
}
$.getUrlVar = function(name){
    return $.getUrlVars()[name];
}
$.fn.handleTemp = function(template, data){
    var compiled = {};
    compiled[template] = Handlebars.compile(template);
    this.html(compiled[template](data));
    return this;
}
$.fn.handleTempAppend = function(template, data){
    var compiled = {};
    compiled[template] = Handlebars.compile(template);
    this.append(compiled[template](data));
    return this;
}
window.Util = {};
Util.lStorage = {
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
        离线缓存管理器
    */
    cacheManager:new CacheManager(window.cacheCfg)
}

Util.sStorage = {
    /*
    sessionStorage只支持字符串，如果要放json，请先使用JSON.stringify()转换
    读取使用JSON.parse()读取
    */
    setParam: function(name, value) {
        sessionStorage.setItem(name, value);
    },
    getParam: function(name) {
        return sessionStorage.getItem(name);
    },
    removeParam:function(name){
        sessionStorage.removeItem(name);
    },
    clearParam:function(){
        //清除所有的存储，谨慎使用
        sessionStorage.clear();
    },
    paramSize:function(){
        return sessionStorage.length;
    }
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
    var json=Util.lStorage.getParam(cacheKey);
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
                Util.lStorage.setParam(cacheKey,JSON.stringify(json));
            }else{
                _self.del(name);
            }
            callback(state,json);
        },true);
    }else{
        //此时callback是字符串
        Util.lStorage.setParam(cacheKey,callback);
    }
}
CacheManager.prototype.del=function(name){
    var target=this.config[name];
    var cacheKey=target.key;
    Util.lStorage.removeParam(cacheKey);
}
CacheManager.prototype.clearAll=function(){
    for(var attr in this.config){
        var target=this.config[attr];
        var cacheKey=target.key;
        Util.lStorage.removeParam(cacheKey);
    }
}

//阻止事件冒泡
function stopEvent(e){
    if(e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}
function createLoading(txt){
    var _txt = txt || '正在努力加载数据...';
    if(!$(".zui-loading").length){
        $("body").append('<div class="zui-loading fn-loading">'+_txt+'</div>');
    }
}

function unblockLoading(){
    if($(".zui-loading").length)
        $(".zui-loading").css({"display": "none"});
}

$(function(){
    //返回按钮
    $(".mui-action-back").on("tap", function(){
        window.history.back();
    })

    //滑块
    $(".mui-switch").each(function(){
        var $this = $(this);
        $this.on("tap", function(){
            $this.toggleClass("mui-active");
        })
    })

    //展开
    $(".zui-collapse").each(function(){
        var $this = $(this);
        $this.on("tap", function(e){
            stopEvent(e);
            if(e.target.parentNode.className.indexOf("zui-collapse") != '-1')
                $this.toggleClass("mui-active");
        }).css({"backgroundColor": "#fff"}).find(".mui-table-view.mui-table-view-chevron").css({"marginBottom": "-15px"});
    })

})
