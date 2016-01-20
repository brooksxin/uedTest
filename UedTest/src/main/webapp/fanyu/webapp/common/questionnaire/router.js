/*
 编辑问题

 事件
 cancel 	上一步，取消编辑，模块隐藏，并自动隐藏，[点击取消编辑或点击左上角返回时触发]
 方法
 init		构造函数
 参数 questions json 如{}
 hide 			隐藏模块
 show			显示模块
 validate 验证节点
 view 预览
 save 保存
 */
define(
    ['handlebars', 'text!tpl/questionnaire/router.tpl', 'backbone',
        'jquery', 'handlebars.helpers'],
    function (Handlebars, tpl, Backbone, $) {
        srvMap.add('router', ' router.json', 'front/sh/questionaire!index');// 编辑问卷
        var obj = Backbone.View
            .extend({
                tagName: 'div',
                template: Handlebars.compile(tpl),
                steps: [],
                stepIndex: 1,
                $container: null,
                questions: {},
                closing: {},
                prolusion: {},
                QNR_ID: '',
                events: {},
                praDate: [],
                initialize: function (pram) {
                    this.QNR_ID = pram.questionnaireID||pram.QNR_ID||pram;
                    var paraRouter = {
                        'uid': 'qoro022',
                        'QNR_ID': this.QNR_ID
                    };
                    var that = this;
                    Util.ajax.postJson(srvMap.get("router"),paraRouter,function (json, flag) {
                            if (flag) {
                                that.jsonDate = json.object;
                                that.questions = that.jsonDate.questions;
                                that.prolusion = that.jsonDate.prolusion;
                                that.closing = that.jsonDate.closing;
                                that.render();
                            }
                        });
                },
                getOptions: function (index) {
                    var tmp = "";
                    for (var i = 0; i < this.questions.length; i++) {
                        if (index == i) {
                            continue;
                        }
                        var node = this.questions[i].bean;
                        tmp += "<option value='" + node.QNR_ISTNC_ID
                            + "'>第" + (i + 1) + "题</option>";
                    }
                    for (var i = 0; i < this.closing.length; i++) {
                        if (this.closing[i]) {
                            var node = this.closing[i].bean;
                            tmp += "<option value='" + node.QNR_ISTNC_ID
                                + "'>结束语" + (i + 1) + "</option>";
                        };
                    }
                    return tmp;
                },
                render: function () {
                    this.$el.html(this.template(this.jsonDate));
                    $("select", this.el).empty();
                    if (this.prolusion.length > 0) {
                        $("#" + this.prolusion[0].bean.QNR_ISTNC_ID + " select", this.el).append(this.getOptions(-1));
                    }
                    for (var i = 0; i < this.questions.length; i++) {
                        var node = this.questions[i].bean;
                        var nodes = this.questions[i].beans;
                        if (node.QU_TYPE_CD_NAME == '判断题'
                            || node.QU_TYPE_CD_NAME == '单选题') {
                            for (var j = 0; j < nodes.length; j++) {
                                $("#" + nodes[j].QNR_ISTNC_ID, this.el)
                                    .append(this.getOptions(i));
                                if(nodes[j].TGT_ROUTE_ID)
                                	{
                                	
                                	 $("#" + nodes[j].QNR_ISTNC_ID, this.el).val(nodes[j].TGT_ROUTE_ID);                                	
                             	
                                	}
                                else{
                                	if(i<this.questions.length-1)
                                	{
                                		$("#" + nodes[j].QNR_ISTNC_ID, this.el).val(this.questions[i+1].bean.QNR_ISTNC_ID); 
                                		console.log(this.questions[i+1].QNR_ISTNC_ID);
                                	}
                                	else
                                		{
                                		$("#" + nodes[j].QNR_ISTNC_ID, this.el).val(this.closing[0].bean.QNR_ISTNC_ID); 
                                		}
                                }
                                
                               
                            }
                        } else {
                            $("#" + node.QNR_ISTNC_ID + " select",
                                this.el).append(this.getOptions(i));
                            if(node.TGT_ROUTE_ID)
                            	{
                            $("#" + node.QNR_ISTNC_ID+" select", this.el).val(node.TGT_ROUTE_ID);
                            	}
                            else
                            	{
                            	
                            	if(i<this.questions.length-1)
                            		{
                            		 $("#" + node.QNR_ISTNC_ID+" select", this.el).val(this.questions[i+1].bean.QNR_ISTNC_ID);
                            		}
                            	else
                            	{
                            		$("#" + node.QNR_ISTNC_ID+" select", this.el).val(this.closing[0].bean.QNR_ISTNC_ID);
                            	}
                            	}
                        }
                    }
                    var that = this;
                    $("select", this.el)
                        .change(
                        function () {
                           if(b){
                               that.trigger('startValidate');
                           }
                            var nodeIndex = $(this)
                                .closest('tr[index]')
                                .attr("index");
                            if (nodeIndex < 0 || !nodeIndex) {
                                nodeIndex = $(this)
                                    .closest('tr')
                                    .prevAll(
                                    'tr[index]')
                                    .eq(0)
                                    .attr("index");
                            }
                            if (nodeIndex < 0 || !nodeIndex) {
                                var node = that.prolusion[0].bean;
                                node.TGT_INSTANCE_ID = $(
                                    this).val();
                                return;
                            }
                            var node = that.questions.length?that.questions[nodeIndex].bean:null;
                            if (!node) {
                                return;
                            }
                            var options = that.questions[nodeIndex].beans;
                            if (node.QU_TYPE_CD_NAME == '判断题'
                                || node.QU_TYPE_CD_NAME == '单选题') {
                                var option;
                                for (var i = 0; i < options.length; i++) {
                                    if (this.id == options[i].QNR_ISTNC_ID) {
                                        option = options[i];
                                        break;
                                    }
                                }
                                option.TGT_INSTANCE_ID = $(
                                    this).val();
                            } else {
                                node.TGT_INSTANCE_ID = $(
                                    this).val();
                            }
                        });
                    var b=false;
                    $("select", this.el).change();
                   b=true;
                    $(".BtnCtb a:eq(0)", this.el).click(function () {
                        that.validate();
                    });
                    $(".BtnCtb a:eq(1)", this.el).click(function () {
                        if (that.validate()) {
                            that.save(showrmap);

                        }
                    });
                    var showrmap=function() {
                    	var url; //转向网页的地址;
                    	var name; //网页名称，可为空;
                    	var iWidth; //弹出窗口的宽度;
                    	var iHeight; //弹出窗口的高度;
                    	url="/ecp/module/questionaire/routemap.html?uid=qoro022&QNR_ID="+that.QNR_ID;
                    	name="查看路由图";
                    	iWidth=900;
                    	iHeight=600;
                    	//window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
                    	var iTop = (window.screen.height-30-iHeight)/2; //获得窗口的垂直位置;
                    	var iLeft = (window.screen.width-10-iWidth)/2; //获得窗口的水平位置;
                    	window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
                    	                	
                    }
                    $(".BtnCtb a:eq(2)", this.el)
                        .click(
                        function () {
                            if (that.validate()) {
                                that.save(start);
                            }
                        });
                    
                    var start=function() {
                        require(['common/questionnaire/ques_start'],function (fn) {
                                var obj = new fn.init(that.QNR_ID);
                                obj.startManage = function(options){
                                    require(['common/questionnaire/questionnaire'],function(fn){
                                        fn.init(options.tempVal,true);
                                        var tpl = fn.getTpl;
                                        $('#J_que_start').html(tpl);
                                    })
                                }
                                if ($('#J_que_start').length) {
                                    $('#J_que_start').remove();
                                };
                                var pramDialog = {
                                    id: that.QNR_ID,
                                    width: '755',
                                    title: '模拟问卷',
                                    content: obj.$el
                                };
                                Util.dialog.openDiv(pramDialog);
                            });
                    }
                    return this;
                },
                save: function (fname) {
                    if (!this.validate()) {
                        return;
                    }
                    var paraSave = {
                        'uid': 'qoro019',
                        'QNR_ID': this.QNR_ID,
                        'prams': JSON.stringify(this.praDate)
                    };
                    Util.ajax.postJson(srvMap.get("router"), paraSave,
                        $.proxy(function (json, flag) {
                            if (flag) {                                                           
                                if (fname) {
                                    fname();
                                }else{
                                	 Util.dialog.tips("保存成功");    
                                	this.trigger('saveSuccess');
                                }
                            } else {
                                Util.dialog.tips("保存失败");
                            }
                        }, this));
                },
                cancel: function () {
                    this.hide();
                },
                hide: function () {
                    $(this.el).hide();
                },
                show: function () {
                    $(this.el).show();
                },
                validate: function () {
                    var b = true;
                    var array = new Object();
                    array.length = 0;
                    this.praDate = new Array();
                    if (this.prolusion.length > 0) {
                        this.praDate[this.praDate.length] = {
                            'BASE_ROUTE_ID': this.prolusion[0].bean.QNR_ISTNC_ID,
                            'TGT_ROUTE_ID': this.prolusion[0].bean.TGT_INSTANCE_ID
                        };
                        array[this.prolusion[0].bean.TGT_INSTANCE_ID] = this.prolusion[0].bean.TGT_INSTANCE_ID;
                        array.length++;
                    }
                    for (var i = 0; i < this.questions.length; i++) {
                        var nodes = this.questions[i].beans;
                        var node = this.questions[i].bean;
                        var tmpId = node.TGT_INSTANCE_ID;
                        if (node.QU_TYPE_CD_NAME == '判断题'
                            || node.QU_TYPE_CD_NAME == '单选题') {
                            for (var j = 0; j < nodes.length; j++) {
                                var tmp = nodes[j];
                                if (!tmp.TGT_INSTANCE_ID) {
                                    Util.dialog.tips('有题目没有选择下一题!');
                                    return false;
                                } else {
                                    this.praDate[this.praDate.length] = {
                                        'BASE_ROUTE_ID': tmp.QNR_ISTNC_ID,
                                        'TGT_ROUTE_ID': tmp.TGT_INSTANCE_ID
                                    };
                                    if (!array[tmp.TGT_INSTANCE_ID]) {
                                        array[tmp.TGT_INSTANCE_ID] = tmp.TGT_INSTANCE_ID;
                                        array.length++;
                                    }
                                }
                            }
                        } else {
                            if (!tmpId) {
                                Util.dialog.tips('有题目没有选择下一题!');
                                return false;
                            } else {
                                this.praDate[this.praDate.length] = {
                                    'BASE_ROUTE_ID': this.questions[i].bean.QNR_ISTNC_ID,
                                    'TGT_ROUTE_ID': tmpId
                                };
                                if (!array[tmpId]) {
                                    array[tmpId] = tmpId;
                                    array.length++;
                                }
                            }
                        }
                    }
                    for (var i = 1; i < this.questions.length; i++) {
                        if (this.questions[i] && this.questions[i].bean && !array[this.questions[i].bean.QNR_ISTNC_ID]) {
                            Util.dialog.tips('有题目没有被选择!');
                            return false;
                        }
                    }

                    for (var i = 0; i < this.closing.length; i++) {
                        if (this.closing[i] && this.closing[i].bean && !array[this.closing[i].bean.QNR_ISTNC_ID]){
                            Util.dialog.tips('有结束语没有被选择!');
                            return false;
                        }
                    }
                    Util.dialog.tips('验证通过!');
                    this.trigger('validate');
                    return b;
                },
                view: function () {

                }
            });

        return obj;
    });
