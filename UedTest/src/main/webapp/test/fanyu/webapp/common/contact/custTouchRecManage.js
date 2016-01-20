define(['text!tpl/contact/custTouchRecManage.tpl', 'jquery.blockUI', 'jquery.pagination'],function(tpl){
    var init = function(){
        srvMap.add('queryTouchRec', 'touchrec.json','front/sh/contact!execute?uid=mainLeft001');//查询服务
        var _el = null;
        Util.dialog.openDiv({
            id:'D_custTouch',
            title:'通话记录查询',
            content: tpl,
            width: 900,
            height:480,
            modal: true
        });

        var G_params = {
            url : srvMap.get('queryTouchRec'),
            items_per_page : 5 ,   // 每页数     @param : limit
            page_index : 0 , //当前页  @param : start
            pagination : "Pagination_touch" , //分页id
            searchformId : "J_formSearch", //搜索表单的id
            tabletpl : "T_tabletpl", //表格模板
            tablewrap : "J_tabletpl_touch" //表格容器
        };

        $('#J_search','#J_formSearch').bind('click',function(){
            var str = $("#"+G_params.searchformId).serialize(); //把form序列化
            Util.pagination(G_params.page_index, true, G_params, str);
        }).trigger("click");
        
        //播放录音记录 player
        $('#J_tabletpl_touch').on('click','.gridRowBtn a',function(){
            var _this = $(this),
                url = _this.attr('url'),
                path = _this.attr('path'),
                filename = _this.attr('filename');
            if(url==null || url=="undefined" || url=="" ||path==null || path=="undefined" || path=="" ||path==null || path=="undefined" || path==""){
                alert("录音文件不存在，无法播放!");
                return;
            }
            var box = document.getElementById('J_player');
            var filePath = url + path+"/"+filename;
            var str = '<embed id="player" hidden="false" ShowStatusBar="true" type="application/x-mplayer3" EnableContextMenu="false" autostart="true" ShowTracker="true" ShowPositionControls="false" loop="false" width="90%" height="70"  src="'+filePath+'"></embed>';
            box.innerHTML = str;

            var elem = document.getElementById('T_playReocrdPage');
            var params = {
              id:'D_playReocrdPage',
              title:'录音播放',
              content: elem,
              width: 500,
              height:150,
              modal: true,
              closeCallback: stopPlay,
              cancelVal:'关闭',
              cancelCallback:stopPlay
            }
            Util.dialog.openDiv(params);
        })

        function stopPlay(){
            try{
                player.Stop();
                Util.dialog.close("D_playReocrdPage");
            }catch(e){}
        }

        Handlebars.registerHelper("contactType", function(str,fn){
            var buffer = "";
            if(str == '0'){
               buffer = '呼入';
            }else{
                buffer = '呼出';
            }
            return buffer;
        }); 
        Handlebars.registerHelper("isHangupType", function(str,fn){
            var buffer = "";
            if(str == '0'){
               buffer = '客户';
            }else{
                buffer = '座席';
            }
            return buffer;
        }); 
    }
    return init;
})