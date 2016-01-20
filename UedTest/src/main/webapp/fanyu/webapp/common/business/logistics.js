
define(['text!tpl/business/logistics.tpl', 'style!css/business/logistics.css'], function(source) {
        var fun = function(orderID, callback){
            var template = Handlebars.compile(source);
            Util.ajax.postJson(srvMap.get('logistics'),{ orderNum:orderID },function(json,status){
              if (status) {
                var d = top.dialog({
                  width:550, height:200,cancel: false, skin: 'logistics-panel',
                  title: '查看物流信息',
                  content: template((json && json.object && json.object.logisticsJson) || {}), 
                  button: [{
                    value: '关闭窗口',
                    callback: function () {
                      d.close().remove();
                      return false;
                    },
                    autofocus: true
                  }]
                });
                d.showModal();
                callback();
              }else{
                var d = dialog({
                    content: (json && json.returnMessage) || '未知错误'
                });
                d.show();
                callback();
                setTimeout(function(){
                  d.remove();

                }, 3000)
              }
            });
        }
        return fun;
    }
);