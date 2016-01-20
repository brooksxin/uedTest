define(['text!tpl/questionnaire/ques_start.tpl'],function(tpl){
    srvMap.add('quesStart','ques_start.json','front/sh/questionaire!index?uid=qoro020');//加载问卷id和题目数量
    var $el = null;
    
    var init = {
        init : function(QNR_ID){
            $el = $(tpl);
            this.$el = $el;
            var temp = null;
            /*
            * QNR_ID:问卷id
            */
            Util.ajax.postJson(srvMap.get('quesStart'),"QNR_ID="+QNR_ID,function(json,status){
                if (status) {
                    $('#J_quesDesc',$el).text(json.bean.QU_CNTT);
                    $('#J_quesTotal',$el).text(json.bean.total);
                    temp = json.bean;
                }else{
                }
            })

            $('#J_btn_start',$el).unbind('click').on('click',$.proxy(function(){
                this.startManage({tempVal:temp });
            }, this));
        }
    };
    init.prototype = {
        startManage:null
    }
    return {init:init.init,getTpl:tpl};
})