var tmp = {
    "returnCode": "0", "": " 0成功，其它失败",
    "returnMessage": "无法获取详情", "": "成功的消息提示或具体的失败原因",
    "bean": {
        "prolusion": {
            "qu_id": "1001",
            "qu_instance_id": "p1",
            "qu_type_name": "开篇词",
            "next": "q1",
            "qu_type_cd": "0B", "": "问题类型 0B开场白,0E结束语",
            "qu_nm": "开场白Test", "": "标题",
            "qu_have_aswr_flag": "0", "": "是否有答案 0没有1有",
            "qu_desc": "这是开场白描述", "": "主要内容"
        },
        "questions": [
            {
                "qu_id": "1000",
                "qu_type_name": "选择题",
                "qu_instance_id": "q1",
                "qu_type_cd": "20",
                "qu_nm": "选择题标题",
                "qu_desc": "",
                "next": "",
                "qu_have_aswr_flag": "1",
                "beans": [
                    {
                        "aswr_id": "101",
                        "QU_ASWR_SEQNO": "0",
                        "next": "q2",
                        "aswr_cntt": "A选项",
                    },
                    {
                        "aswr_id": "102",
                        "QU_ASWR_SEQNO": "1",
                        "next": "q3",
                        "aswr_cntt": "B选项"
                    },
                    {
                        "aswr_id": "103",
                        "QU_ASWR_SEQNO": "2",
                        "next": "c1",
                        "aswr_cntt": "C选项"
                    }
                ]
            },
            {
                "qu_id": "1003",
                "qu_type_cd": "10",
                "qu_type_name": "填空题",
                "qu_instance_id": "q2",
                "qu_nm": "多项填空默认问题名多项填空默认问题名多项填空默认问题名多项填空默认问题名",
                "qu_desc": "这里是多项填空的描述",
                "qu_have_aswr_flag": "1",
                "next": "q3",
                "beans": [
                    {
                        "aswr_id": "10031", "": "填空子问题标识列",
                        "qu_type_cd": "10", "": "问题类型",
                        "qu_nm": "您经常在线购物的网站是？", "": "",
                        "qu_desc": "多项填空的描述", "": "",
                        "next": "",
                        "qu_have_aswr_flag": "0", "": ""
                    },
                    {
                        "aswr_id": "10032",
                        "qu_type_cd": "10",
                        "qu_nm": "印相最深的是？",
                        "qu_desc": "多项填空的描述",
                        "next": "",
                        "qu_have_aswr_flag": "0",
                    },
                    {
                        "aswr_id": "10033",
                        "qu_type_cd": "10",
                        "qu_nm": "还有哪些？",
                        "qu_desc": "多项填空的描述",
                        "next": "",
                        "qu_have_aswr_flag": "0",
                    }
                ]
            },
            {
                "qu_id": "1002",
                "qu_type_cd": "40",
                "qu_type_name": "判断题",
                "qu_instance_id": "q3",
                "qu_nm": "您是否正在使用4g手机？",
                "qu_desc": "问题的描述",
                "next": "",
                "qu_have_aswr_flag": "1",
                "beans": [
                    {
                        "aswr_id": "1021", "": "标识列",
                        "next": "c1",
                        "QU_ASWR_SEQNO": "0",
                        "aswr_cntt": "是", "": "答案值"
                    },
                    {
                        "aswr_id": "1022",
                        "next": "c2",
                        "QU_ASWR_SEQNO": "1",
                        "aswr_cntt": "否"
                    }
                ]
            }
        ],
        "closing": [
            {
                "qu_id": "1004",
                "qu_type_cd": "0E",
                "qu_type_name": "结束语",
                "qu_instance_id": "c1",
                "qu_nm": "这是结束语1",
                "qu_have_aswr_flag": "0",
                "qu_desc": "这是结束语",
            },
            {
                "qu_id": "1004",
                "qu_type_cd": "0E",
                "qu_type_name": "结束语",
                "qu_instance_id": "c2",
                "qu_nm": "这是结束语2",
                "qu_have_aswr_flag": "0",
                "qu_desc": "这是结束语",
            }
        ]
    }
};

//获取node和line数据
var data = function (npsjson) {
    var prolusion = npsjson.bean.prolusion;
    var questions = npsjson.bean.questions;
    var closing = npsjson.bean.closing;
    var map = {}; //存放节点和连线基础数据
    map.nodelist = [];//存放节点数组
    map.linelist = [];//存放连线数组
    var pnode = {}; //节点数据
    var pline = {};   //线数据
    pnode.qu_id = prolusion.qu_instance_id;
    pnode.qu_type_nm = prolusion.qu_type_name;
    pnode.qu_type_cd = prolusion.qu_type_cd;
    pnode.qu_nm = prolusion.qu_nm;
    pnode.next = prolusion.next;
    map.nodelist.push(pnode);
    pline.qu_id = prolusion.qu_instance_id;
    pline.name = "";
    pline.next = prolusion.next;
    map.linelist.push(pline);
    for (var i = 0; i < questions.length; i++) {
        var qnode = {};
        qnode.qu_id = questions[i].qu_instance_id;
        qnode.qu_type_nm = questions[i].qu_type_name;
        qnode.qu_type_cd = questions[i].qu_type_cd;
        qnode.qu_nm = questions[i].qu_nm;
        qnode.next = questions[i].next;
        map.nodelist.push(qnode);
        if (questions[i].next && questions[i].next != "") {
            var qline = {};
            qline.qu_id = questions[i].qu_instance_id;
            qline.name = "";
            qline.next = questions[i].next;
            map.linelist.push(qline);
        }
        else {
            if (questions[i].qu_type_name == "选择题") {
                var options = questions[i].beans;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].next && options[j].next != "") {
                        var sline = {};
                        sline.qu_id = questions[i].qu_instance_id;
                        sline.name = i2c(options[j].QU_ASWR_SEQNO);
                        sline.next = options[j].next;
                        map.linelist.push(sline);
                    }
                }
            }
            if (questions[i].qu_type_name == "判断题") {
                var options = questions[i].beans;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].next && options[j].next != "") {
                        var jline = {};
                        jline.qu_id = questions[i].qu_instance_id;
                        jline.name = options[j].aswr_cntt == "是" ? "Y" : "N";
                        jline.next = options[j].next;
                        map.linelist.push(jline);
                    }
                }
            }
        }
    }
    for (var c = 0; c < closing.length; c++) {
        var cnode = {};
        cnode.qu_id = closing[c].qu_instance_id;
        cnode.qu_type_nm = closing[c].qu_type_name;
        cnode.qu_type_cd = closing[c].qu_type_cd;
        cnode.qu_nm = closing[c].qu_nm;
        cnode.next = "";
        map.nodelist.push(cnode);

    }
    return map;
}

//数字转字母
var i2c = function (k) {

    if (k >= 0 && k <= 25) {
        return String.fromCharCode(65 + parseInt(k))
    }
    else {
        return "";
    }
}


//创建节点
var createNodes = function (rootPosition, nodeSize, Offset, evOffset, nodeList) {
//创建div
    createDiv(nodeSize, nodeList);
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
    $('#' + pNodes[0].qu_id).css('top', rootPosition[0] + 'px');
    $('#' + pNodes[0].qu_id).css('left', rootPosition[1] + 'px');
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
        $('#' + qNodes[i].qu_id).css('top', qTop + 'px');
        $('#' + qNodes[i].qu_id).css('left', qLeft + 'px');

    }
    //创建结束语节点
    qLeft += lOffset;
    var nOffset = nodeH + evOffset;
    if (cNodes.length % 2 == 1) {
        var up1 = rootPosition[0];
        var down1 = rootPosition[0];
        for (var i = 0; i < cNodes.length; i++) {
            if (i == 0) {
                $('#' + cNodes[0].qu_id).css('top', rootPosition[0] + 'px');
                $('#' + cNodes[0].qu_id).css('left', qLeft + 'px');
            }
            else {
                if (i % 2 == 1) {
                    up1 -= nOffset;
                    $('#' + cNodes[i].qu_id).css('top', up1 + 'px');
                    $('#' + cNodes[i].qu_id).css('left', qLeft + 'px');
                }
                else {
                    down1 += nOffset;
                    $('#' + cNodes[i].qu_id).css('top', down1 + 'px');
                    $('#' + cNodes[i].qu_id).css('left', qLeft + 'px');
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
                $('#' + cNodes[i].qu_id).css('top', up2 + 'px');
                $('#' + cNodes[i].qu_id).css('left', qLeft + 'px');
                up2 -= nOffset;
            }

            else {
                $('#' + cNodes[i].qu_id).css('top', down2 + 'px');
                $('#' + cNodes[i].qu_id).css('left', qLeft + 'px');
                down2 += nOffset;
            }
        }

    }
}
//创建div
var createDiv = function (nodeSize, nodesList) {
    var divnodes = "";
    for (var i = 0; i < nodesList.length; i++) {
        divnodes += '<div class="node" id="' + nodesList[i].qu_id + '" style="width: ' + nodeSize[0] + 'px; height: ' + nodeSize[1] + 'px;">' + i + nodesList[i].qu_type_nm + '</br>' + nodesList[i].qu_nm + '</div>';
    }
    $("#flowchart-demo").append(divnodes);
}

//绘制连线
jsPlumb.ready(function () {

    //创建节点
    var map = data(tmp);
    createNodes([200, 50], [100, 60], [120, 120], 20, map.nodelist);

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
        init = function (connection,value) {
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
        for(var i=0;i<map.nodelist.length;i++)
        {
            _addEndpoints(map.nodelist[i].qu_id, ["RightMiddle", "BottomCenter"], ["TopCenter", "LeftMiddle"]);
        }

        // listen for new connections; initialise them the same way we initialise the connections at startup.
        instance.bind("connection", function (connInfo, originalEvent) {
            init(connInfo.connection,map.linelist[i].name);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .node"), {grid: [20, 20]});
        // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        // method, or document.querySelectorAll:
        //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });

        // connect a few up
       for(var i=0;i<map.linelist.length;i++)
        {
            instance.connect({uuids: [map.linelist[i].qu_id+"RightMiddle", map.linelist[i].next+"LeftMiddle"], editable: true});
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

});