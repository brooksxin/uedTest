define(['text!tpl/user/userinfo.tpl'],function(tpl){
    var init = function(){
        srvMap.add('session', 'session.json','front/sh/user!session');
        srvMap.add('info', 'userinfo.json','front/sh/user!userinfo');
        srvMap.add('updatePwd', 'pwd.json','front/sh/user!updatePwd');

        var param={'uid':'u001'},
            staffId=userInfo.bean.staffId,
            deptId=userInfo.bean.deptId,
            userName=userInfo.bean.userName;

        Util.dialog.openDiv({
            id:'D_userInfo',
            title:'个人信息',
            content: tpl,
            width: 900,
            height:480,
            modal: true
        });

        $('#J_dept').text(userInfo.bean.deptName);

        var param1={'uid':'u002','STAFF_ID':staffId};
        Util.ajax.postJson(srvMap.get("info"), param1, function(json,flag){
            if(flag){
                Util.ajax.loadTemp('#J_userinfo',$('#T_userinfo'),json);//加载模板
                $("#userId").val(userName);
            }
        });
        var param2={'uid':'u001','DEPT_ID':deptId};
        Util.ajax.postJson(srvMap.get("info"), param2, function(json,flag){
            if(flag){
                $('#J_group').text(json.bean.PTY_NM);
            }
        });
        var param3={'uid':'u005','DEPT_ID':deptId};
        Util.ajax.postJson(srvMap.get("info"), param3, function(json,flag){
            if(flag){
                Util.ajax.loadTemp('#J_userlist',$('#T_userlist'),json);//加载模板
            }
        });

        $('#J_userinfo').on('click','#J_updatePwd',function(){
            $("#title").hide();
            document.getElementById("J_password").reset();
            $("#J_password").show();
        })
        //取消修改密码
        $('#J_userinfo').on('click','#J_cancelP',function(){
            $("#J_password").hide();
            $("#title").show();
        })

        //修改密码
        $('#J_userinfo').on('click','#J_saveP',function(){
            var str=$("#J_password").serialize();
            Util.ajax.postJson(srvMap.get("updatePwd"), str, function(json,flag){
                if(flag){
                    var param1={'uid':'u002','STAFF_ID':staffId};
                    Util.ajax.postJson(srvMap.get("info"), param1, function(json,flag){
                        if(flag){
                            Util.ajax.loadTemp('#J_userinfo',$('#T_userinfo'),json);//加载模板
                        }
                    });
                    $("#J_password").hide();
                    $("#title").show();
                }else{
                    alert(json.returnMessage)
                }
            });
        })
        
        //取消座右铭
        $('#J_userinfo').on('click','#J_updateInfo',function(){
            $("#updateZym").hide();
            $("#zym").show();
            checkWord(document.getElementById("zymTextArea"));
        })

        $('#J_userinfo').on('keyup','#zymTextArea',function(){
            checkWord(document.getElementById("zymTextArea"));
        })

        $('#J_userinfo').on('click','#J_cancelZym',function(){
            $("#updateZym").show();
            $("#zym").hide();
        })

        $('#J_userinfo').on('click','#J_saveZym',function(){
            var zym=$("textarea").val();
            var param={'uid':'u006','STAFF_ID':staffId,"PRSN_ENCRG_CNTT":zym};
            Util.ajax.postJsonSync(srvMap.get("info"), param, function(json){
                var param1={'uid':'u002','STAFF_ID':staffId};
                Util.ajax.postJson(srvMap.get("info"), param1, function(json,flag){
                    if(flag){
                        Util.ajax.loadTemp('#J_userinfo',$('#T_userinfo'),json);//加载模板
                    }
                });
           });
           $("#updateZym").show();
           $("#zym").hide();
        })

        //计算输入座右铭字数
        var maxstrlen = 80;
        function checkWord(c) {
            len = maxstrlen;
            var str = c.value;
            myLen = getStrleng(str);
            var wck = document.getElementById("wordCheck");
            if (myLen > len * 2) {
                c.value = str.substring(0, i + 1);
            }else {
                wck.innerHTML = maxstrlen - Math.floor((len * 2 - myLen) / 2);
            }
        }

        function getStrleng(str) {
            myLen = 0;
            i = 0;
            for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128){
                    myLen++;
                }else{
                    myLen += 2;
                }
            }
            return myLen;
        }
    }
    return init;
})