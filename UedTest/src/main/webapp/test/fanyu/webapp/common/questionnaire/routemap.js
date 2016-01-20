define(
    ['handlebars', 'text!tpl/questionnaire/routemap.tpl', 'backbone',
        'jquery', 'jqueryui', 'jquery.jsPlumb', 'handlebars.helpers','style!css/questionnaire/routemap.css'],
    function (Handlebars, tpl, Backbone, $) {
        srvMap.add('routemap', '', 'front/sh/questionaire!index');// 查看路由图
        var obj = Backbone.View
            .extend({
                tagName: 'div',
                template: Handlebars.compile(tpl),
                $container: null,
                jsondata:{},
                QNR_ID: '',
                events: {},
                initialize: function (pram) {
                    this.QNR_ID = pram;
                    var paraRouter = {
                        'uid': 'qoro022',
                        'QNR_ID': this.QNR_ID
                    };
                    var that = this;
                    Util.ajax.postJson(srvMap.get("routemap"), paraRouter, function (json, flag) {
                        if (flag) {
                            this.jsondata = json.object;
                            that.display();
                        }
                    });
                },
                render:function(){
                    this.$el.html(this.template({}));
                    return this;
                },
//获取node和line数据
                getdata: function (npsjson) {
                	console.log(npsjson)
                    var prolusion = npsjson.prolusion[0].bean;
                    var questions = npsjson.questions;
                    var closing = npsjson.closing;
                    var map = {}; //存放节点和连线基础数据
                    map.nodelist = [];//存放节点数组
                    map.linelist = [];//存放连线数组
                    var pnode = {}; //节点数据
                    var pline = {};   //线数据
                    pnode.qu_id = prolusion.QNR_ISTNC_ID;
                    pnode.qu_type_nm = prolusion.QU_TYPE_CD_NAME;
                    pnode.qu_type_cd = prolusion.QU_TYPE_CD;
                    pnode.qu_nm = prolusion.QU_NM;
                    pnode.next = prolusion.TGT_ROUTE_ID;
                    map.nodelist.push(pnode);
                    pline.qu_id = prolusion.QNR_ISTNC_ID;
                    pline.name = "";
                    pline.next = prolusion.TGT_ROUTE_ID;
                    map.linelist.push(pline);
                    for (var i = 0; i < questions.length; i++) {
                        var qnode = {};
                        qnode.qu_id = questions[i].bean.QNR_ISTNC_ID;
                        qnode.qu_type_nm = questions[i].bean.QU_TYPE_CD_NAME;
                        qnode.qu_type_cd = questions[i].bean.QU_TYPE_CD;
                        qnode.qu_nm = questions[i].bean.QU_NM;
                        qnode.next = questions[i].bean.TGT_ROUTE_ID;
                        map.nodelist.push(qnode);
                        if (questions[i].bean.TGT_ROUTE_ID && questions[i].bean.TGT_ROUTE_ID != "") {
                            var qline = {};
                            qline.qu_id = questions[i].bean.QNR_ISTNC_ID;
                            qline.name = "";
                            qline.next = questions[i].bean.TGT_ROUTE_ID;
                            map.linelist.push(qline);
                        }
                        else {
                            if (questions[i].QU_TYPE_CD_NAME == "选择题") {
                                var options = questions[i].beans;
                                for (var j = 0; j < options.length; j++) {
                                    if (options[j].TGT_ROUTE_ID && options[j].TGT_ROUTE_ID != "") {
                                        var sline = {};
                                        sline.qu_id = questions[i].bean.QNR_ISTNC_ID;
                                        sline.name = this.i2c(options[j].QU_ASWR_SEQNO);
                                        sline.next = options[j].TGT_ROUTE_ID;
                                        map.linelist.push(sline);
                                    }
                                }
                            }
                            if (questions[i].QU_TYPE_CD_NAME == "判断题") {
                                var options = questions[i].beans;
                                for (var j = 0; j < options.length; j++) {
                                    if (options[j].TGT_ROUTE_ID && options[j].TGT_ROUTE_ID != "") {
                                        var jline = {};
                                        jline.qu_id = questions[i].bean.QNR_ISTNC_ID;
                                        jline.name = options[j].aswr_cntt == "是" ? "Y" : "N";
                                        jline.next = options[j].TGT_ROUTE_ID;
                                        map.linelist.push(jline);
                                    }
                                }
                            }
                        }
                    }
                    for (var c = 0; c < closing.length; c++) {
                        var cnode = {};
                        cnode.qu_id = closing[c].bean.QNR_ISTNC_ID;
                        cnode.qu_type_nm = closing[c].bean.QU_TYPE_CD_NAME;
                        cnode.qu_type_cd = closing[c].bean.QU_TYPE_CD;
                        cnode.qu_nm = closing[c].bean.QU_NM;
                        cnode.next = "";
                        map.nodelist.push(cnode);

                    }
                    return map;
                },

//数字转字母
                i2c: function (k) {

                    if (k >= 0 && k <= 25) {
                        return String.fromCharCode(65 + parseInt(k))
                    }
                    else {
                        return "";
                    }
                },


//创建节点
                createnodes: function (rootPosition, nodeSize, Offset, evOffset, nodeList) {
//创建div
                    this.creatediv(nodeSize, nodeList);
//节点大小
                    var nodeW = nodeSize[0];
                    var nodeH = nodeSize[1];
//偏移量
                    var vOffset = (nodeH + Offset[0]) / 2;
                    var lOffset = nodeW + Offset[1];
                    //节点分组
                    var pNodes = []; //根
                    var qNodes = []; //问题
                    var cNodes = []; //尾
                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].qu_type_cd == "0B") {
                            pNodes.push(nodeList[i]);
                        }
                        else if (nodeList[i].qu_type_cd == "0E") {
                            cNodes.push(nodeList[i]);
                        }
                        else {
                            qNodes.push(nodeList[i]);
                        }
                    }
                    //创建根节点
                    $('#' + pNodes[0].qu_id, this.$el).css('top', rootPosition[0] + 'px');
                    $('#' + pNodes[0].qu_id, this.$el).css('left', rootPosition[1] + 'px');
                    //创建问题节点
                    var qCount = 0;
                    var qTop = rootPosition[0];
                    var qLeft = rootPosition[1];
                    for (var i = 0; i < qNodes.length; i++) {
                        qCount++;
                        // 设置节点位置
                        if (qCount % 2 == 1) {
                            qTop = rootPosition[0] - vOffset;
                            qLeft += lOffset;
                        }
                        else {
                            qTop = rootPosition[0] + vOffset;
                        }
                        $('#' + qNodes[i].qu_id, this.$el).css('top', qTop + 'px');
                        $('#' + qNodes[i].qu_id, this.$el).css('left', qLeft + 'px');

                    }
                    //创建结束语节点
                    qLeft += lOffset;
                    var nOffset = nodeH + evOffset;
                    if (cNodes.length % 2 == 1) {
                        var up1 = rootPosition[0];
                        var down1 = rootPosition[0];
                        for (var i = 0; i < cNodes.length; i++) {
                            if (i == 0) {
                                $('#' + cNodes[0].qu_id, this.$el).css('top', rootPosition[0] + 'px');
                                $('#' + cNodes[0].qu_id, this.$el).css('left', qLeft + 'px');
                            }
                            else {
                                if (i % 2 == 1) {
                                    up1 -= nOffset;
                                    $('#' + cNodes[i].qu_id, this.$el).css('top', up1 + 'px');
                                    $('#' + cNodes[i].qu_id, this.$el).css('left', qLeft + 'px');
                                }
                                else {
                                    down1 += nOffset;
                                    $('#' + cNodes[i].qu_id, this.$el).css('top', down1 + 'px');
                                    $('#' + cNodes[i].qu_id, this.$el).css('left', qLeft + 'px');
                                }
                            }
                        }
                    }
                    else {
                        var up2 = rootPosition[0] - (nodeH + evOffset) / 2;
                        var down2 = rootPosition[0] + (nodeH + evOffset) / 2;

                        var icount = 0;
                        for (var i = 0; i < cNodes.length; i++) {
                            icount++;
                            if (icount % 2 == 1) {
                                $('#' + cNodes[i].qu_id, this.$el).css('top', up2 + 'px');
                                $('#' + cNodes[i].qu_id, this.$el).css('left', qLeft + 'px');
                                up2 -= nOffset;
                            }

                            else {
                                $('#' + cNodes[i].qu_id, this.$el).css('top', down2 + 'px');
                                $('#' + cNodes[i].qu_id, this.$el).css('left', qLeft + 'px');
                                down2 += nOffset;
                            }
                        }

                    }
                },
//创建div
                creatediv: function (nodeSize, nodesList) {
                    var divnodes = "";
                    var qcount = 1;
                    var ccount = 1;
                    for (var i = 0; i < nodesList.length; i++) {
                        if (nodesList[i].qu_type_cd == "0B") {
                            divnodes += '<div class="node" id="' + nodesList[i].qu_id + '" style="width: ' + nodeSize[0] + 'px; height: ' + nodeSize[1] + 'px;"><em><strong>' + nodesList[i].qu_type_nm + '</strong></em></br>' + nodesList[i].qu_nm + '</div>';
                        }
                        else if (nodesList[i].qu_type_cd == "0E") {

                            divnodes += '<div class="node" id="' + nodesList[i].qu_id + '" style="width: ' + nodeSize[0] + 'px; height: ' + nodeSize[1] + 'px;"><em><strong>' + qcount + "." + nodesList[i].qu_type_nm + '</strong></em></br>' + nodesList[i].qu_nm + '</div>';
                            qcount++;
                        }
                        else {
                            divnodes += '<div class="node" id="' + nodesList[i].qu_id + '" style="width: ' + nodeSize[0] + 'px; height: ' + nodeSize[1] + 'px;"><em><strong>' + ccount + "." + nodesList[i].qu_type_nm + '</strong></em></br>' + nodesList[i].qu_nm + '</div>';
                            ccount++;
                        }
                    }

                    $("#flowchart-demo", this.$el).append(divnodes);
                },

//绘制连线
                display: function(){
                    var that = this;
                    jsPlumb.ready(function () {
                        jsPlumb.setContainer($("body"));

                        //创建节点
                    var map = that.getdata(this.jsondata);
                    that.createnodes([200, 50], [100, 60], [120, 120], 20, map.nodelist);

                    // 初始化实例
                    var instance = jsPlumb.getInstance({
                        // default drag options
                        DragOptions: {cursor: 'pointer', zIndex: 2000},
                        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
                        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
                        ConnectionOverlays: [
                            ["Arrow", {location: 1}],
                            ["Label", {
                                location: 0.3,
                                id: "label",
                                cssClass: "aLabel"
                            }]
                        ],
                        Container: "flowchart-demo"
                    });

                    var basicType = {
                        connector: "StateMachine",
                        paintStyle: {strokeStyle: "red", lineWidth: 2},
                        hoverPaintStyle: {strokeStyle: "blue"},
                        overlays: [
                            "Arrow"
                        ]
                    };
                    instance.registerConnectionType("basic", basicType);

                    // this is the paint style for the connecting lines..
                    var connectorPaintStyle = {
                            lineWidth: 2,
                            strokeStyle: "#61B7CF",
                            joinstyle: "round",
                            // outlineColor: "white",
                            //  outlineWidth: 2
                        },
                    // .. and this is the hover style.
                        connectorHoverStyle = {
                            lineWidth: 2,
                            strokeStyle: "#216477",
                            // outlineWidth: 2,
                            // outlineColor: "white"
                        },
                        endpointHoverStyle = {
                            fillStyle: "#216477",
                            strokeStyle: "#216477"
                        },
                    // the definition of source endpoints (the small blue ones)
                        sourceEndpoint = {
                            endpoint: "Dot",
                            paintStyle: {
                                strokeStyle: "#7AB02C",
                                fillStyle: "transparent",
                                radius: 1,
                                lineWidth: 1
                            },
                            isSource: true,
                            isTarget: true,
                            maxConnections: -1,
                            connector: ["Straight", {stub: [0, 0], gap: 1, cornerRadius: 0, alwaysRespectStubs: false}],
                            connectorStyle: connectorPaintStyle,
                            hoverPaintStyle: endpointHoverStyle,
                            connectorHoverStyle: connectorHoverStyle,
                            dragOptions: {},
                            overlays: [
                                ["Label", {
                                    location: [0.5, 1.5],
                                    label: "",
                                    cssClass: "endpointSourceLabel"
                                }]
                            ]
                        },
                    // the definition of target endpoints (will appear when the user drags a connection)
                        targetEndpoint = {
                            endpoint: "Dot",
                            paintStyle: {fillStyle: "#7AB02C", radius: 1},
                            hoverPaintStyle: endpointHoverStyle,
                            dropOptions: {hoverClass: "hover", activeClass: "active"},
                            isSource: true,
                            isTarget: true,
                            maxConnections: -1,
                            overlays: [
                                ["Label", {location: [0.5, -0.5], label: "", cssClass: "endpointTargetLabel"}]
                            ]
                        },
                        init = function (connection, value) {
                            connection.getOverlay("label").setLabel(value);
                        };

                    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
                        for (var i = 0; i < sourceAnchors.length; i++) {
                            var sourceUUID = toId + sourceAnchors[i];
                            instance.addEndpoint(toId, sourceEndpoint, {
                                anchor: sourceAnchors[i], uuid: sourceUUID
                            });
                        }
                        for (var j = 0; j < targetAnchors.length; j++) {
                            var targetUUID = toId + targetAnchors[j];
                            instance.addEndpoint(toId, targetEndpoint, {anchor: targetAnchors[j], uuid: targetUUID});
                        }
                    };

                    // suspend drawing and initialise.
                    instance.batch(function () {
                        for (var i = 0; i < map.nodelist.length; i++) {
                            _addEndpoints(map.nodelist[i].qu_id, ["RightMiddle", "BottomCenter"], ["TopCenter", "LeftMiddle"]);
                        }

                        // listen for new connections; initialise them the same way we initialise the connections at startup.
                        instance.bind("connection", function (connInfo, originalEvent) {
                            init(connInfo.connection, map.linelist[i].name);
                        });

                        // make all the window divs draggable
                        instance.draggable(jsPlumb.getSelector(".flowchart-demo .node"), {grid: [20, 20]});
                        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
                        // method, or document.querySelectorAll:
                        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

                        // connect a few up
                        for (var i = 0; i < map.linelist.length; i++) {
                            instance.connect({
                                uuids: [map.linelist[i].qu_id + "RightMiddle", map.linelist[i].next + "LeftMiddle"],
                                editable: true
                            });
                        }

                        //
                        // listen for clicks on connections, and offer to delete connections on click.
                        //
                        instance.bind("click", function (conn, originalEvent) {
                            // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                            //   instance.detach(conn);
                            conn.toggleType("basic");
                        });

                        instance.bind("connectionDrag", function (connection) {
                            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
                        });

                        instance.bind("connectionDragStop", function (connection) {
                            console.log("connection " + connection.id + " was dragged");
                        });

                        instance.bind("connectionMoved", function (params) {
                            console.log("connection " + params.connection.id + " was moved");
                        });
                    });

                    jsPlumb.fire("jsPlumbDemoLoaded", instance);

                })}
            });
        return obj;
    });