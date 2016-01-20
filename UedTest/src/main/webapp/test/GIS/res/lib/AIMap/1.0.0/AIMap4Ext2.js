/**
 * Created by ZW on 07/29/2014.
*/
function AIMap_loadScript(zAIMap_PARAMS) {
    AIMap_PARAMS = zAIMap_PARAMS;
    AIMap_APPID = AIMap_PARAMS.APPID;//应用id
    AIMap_MAPID = AIMap_PARAMS.MAPID;//地图容器
    gis_url = AIMap_PARAMS.GIS_URL;//GIS路径

    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&callback=AIMap_encapsulateBMap&ak=sGZOkeDdDDh55kIiuYC2qUg1";
    document.body.appendChild(script);
}
function AIMap_encapsulateBMap(){
    AIMap = BMap;
    //使用百度地图绘制功能、使用api自带标记点信息弹窗样式
    AIMap_loadStyles("http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css");
    AIMap_loadStyles("http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css");
    AIMap_asysScript("http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager.js",loadInfoWin);
}
function loadInfoWin(){
    AMapLib = BMapLib;
    AIMap_asysScript("http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js",loadTextIcon);
}
function loadTextIcon(){
    AIMap_asysScript("http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js",loadMarkerClust);
}
function loadMarkerClust(){
    AIMap_asysScript("http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js",AIMap_loadTools);
}
function AIMap_loadTools(){
    AIMap_modules();
    AIMap_initMap();
}

function AIMap_modules() {
    AIMap.init = {
        /**
         *标点前台
         *鼠标点击地图生成marker并返回坐标
         *flag：是否只在地图上显示一个marker点
         *callback：返回点坐标
        **/
        getPoint: function(flag,callback){
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var marker = "";
            AIMap_map.addEventListener("click", function(e){
                if(flag){
                    AIMap_map.clearOverlays();
                }
                marker = new AIMap.Marker(new AIMap.Point(e.point.lng, e.point.lat));
                AIMap_map.addOverlay(marker);
                marker.enableDragging();
                marker.addEventListener("dragend", function(e){   
                    if (typeof callback == 'function') {
                        callback(e);
                    }
                });
                if (typeof callback == 'function') {
                    callback(e);
                }
            });
        },
        createMarker: function(json, unclear, juhe, callback){
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var json = json ||{"points":{}};
            var tempPoint = [],tempMarkers=[];
            var renderOptions = {
                "params":{
                    strokeColor:"blue",    //边线颜色。
                    fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: .8,    //边线透明度，取值范围0 - 1。
                    fillOpacity: .3,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
            };

            for (var i=0,length=json.point_list.length; i<length; i++) {
                var point = json.point_list[i];
                tempPoint.push(point);

                var zhtml = '<div style="margin:0 0 -4px 0;;line-height:20px;padding:2px;">' +
                            '<img src="http://gis.yw.zj.chinamobile.com/gis/res/theme/default/images/infoWindow/iconfont-yidong.png" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>';
                for(var j=0,dlength=point.static_data.length; j<dlength; j++){
                    if(point.static_data[j].prop_label != "")
                        zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;'>"+point.static_data[j].prop_label+ ":" + point.static_data[j].prop_value + "</p>";
                }
                zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;'>地址:" + point.point_address + "</p>";

                var marker = AIMap.init.addMarker(point.longitude, point.latitude, point.point_name ? point.point_name :'', zhtml, point.point_icon, point.point_id?point.point_id:null,point.point_busi_id,point.point_type);
                tempMarkers.push(marker);
                if(unclear){
                    marker.disableMassClear();
                }
                
                if(AIMap_Juhe._markers.length){
                    AIMap.init.clearJuhe();//清除点聚合
                }
                if(!juhe){
                    AIMap_map.addOverlay(marker);
                }
            }
            if(typeof callback=='function'){
                callback(tempPoint,tempMarkers);
            }
        },
        addMarker: function(lng, lat, title, shtml, icon, pointId, businessId, pointType){
            var myIcon,_marker,zoffsetx,zoffsety,zoffsets,zoffseta,
            url = 'http://webmap1.map.bdimg.com/newmap/static/common/images/us_cursor_4c00be8.gif';
            var icon = parseInt(icon, 10);
            if (icon) {
                switch (icon){
                    case 101: 
                        // url = "res/lib/AIMap/1.0.0/icon/yingyeting.png";
                        zoffsetx = 0;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 102: 
                        // url = "res/lib/AIMap/1.0.0/icon/jituankehu.png";
                        zoffsetx = -23;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 103: 
                        // url = "res/lib/AIMap/1.0.0/icon/shehuiqudao.png";
                        zoffsetx = -46;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 104:
                        zoffsetx = -69;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 105:
                        zoffsetx = -92;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 106:
                        zoffsetx = -115;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                    case 201:
                        zoffsetx = 0;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    case 202: 
                        zoffsetx = -23;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    case 203: 
                        zoffsetx = -46;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    case 204:
                        zoffsetx = -69;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    case 205:
                        zoffsetx = -92;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    case 206:
                        zoffsetx = -115;
                        zoffsety = -46;
                        zoffsets = 20;
                        zoffseta = 5;
                        break;
                    default:
                        // url = "http://api0.map.bdimg.com/images/marker_red_sprite.png";
                        zoffsetx = 0;
                        zoffsety = -21;
                        zoffsets = 25;
                        zoffseta = 15;
                        break;
                }
                myIcon = new BMap.Icon(url, new BMap.Size(20, zoffsets), {  
                    anchor: new BMap.Size(zoffseta, 25), // 指定定位位置
                    imageOffset: new BMap.Size(zoffsetx, zoffsety),
                    infoWindowAnchor: new BMap.Size(10, 0)
                });
                myShadow = new BMap.Icon(url, new BMap.Size(20, -25), {  
                    anchor: new BMap.Size(10, 25), // 指定定位位置  
                    imageOffset: new BMap.Size(-20, 0) // 设置图片偏移  
                });
                _marker = new BMap.Marker(new BMap.Point(lng, lat),{"title": title, "icon":myIcon, "shadow":myShadow});      
            } else{
                _marker = new BMap.Marker(new BMap.Point(lng, lat),{"title": title});  
            };

            //加载动态属性
            if (pointId) {
                _marker.addEventListener("click", function(e) {  
                    // 关闭其他窗口
                    AIMap_map.closeInfoWindow();
                    
                    // 新建窗口
                    shtml += '</div>';
                    var searchInfoWindow = new BMapLib.SearchInfoWindow(AIMap_map, shtml, {
                        title  : title,      //标题
                        width  : 290,             //宽度
                        panel  : "panel",         //检索结果面板
                        enableAutoPan : true,     //自动平移
                        enableSendToPhone : false, //是否启动发送到手机功能
                        searchTypes   :[
                            BMAPLIB_TAB_SEARCH,   //周边检索
                            BMAPLIB_TAB_TO_HERE,  //到这里去
                            BMAPLIB_TAB_FROM_HERE //从这里出发
                        ]
                    });
                    searchInfoWindow.open(_marker);
                    
                    var dhtml = "";
                    AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00004",'pointId='+pointId+'&bussId='+businessId+'&pointType='+pointType,function(state,json){
                        if(state=='success'){
                            if(json&&json.returncode=='1'){
                                for (var i=0,length=json.prop_list.length; i<length; i++) {
                                    if(json.prop_list[i].prop_label!="")
                                        dhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;line-height: 20px;'>"+json.prop_list[i].prop_label+ ":" + json.prop_list[i].prop_value + "</p>";
                                };
                                searchInfoWindow.setContent(shtml+dhtml);
                            }
                        }
                    });
                }); 
            } else {
                if(BMapLib&&BMapLib.EventWrapper){
                    BMapLib.EventWrapper.addListener(_marker, 'click', function(e){
                        this.openInfoWindow(new BMap.InfoWindow(shtml,{enableMessage: false}));
                    });
                }else{
                    shtml += '</div>';
                    var searchInfoWindow = new BMapLib.SearchInfoWindow(AIMap_map, shtml, {
                        title  : title,      //标题
                        width  : 290,             //宽度
                        panel  : "panel",         //检索结果面板
                        enableAutoPan : true,     //自动平移
                        enableSendToPhone : false, //是否启动发送到手机功能
                        searchTypes   :[
                            BMAPLIB_TAB_SEARCH,   //周边检索
                            BMAPLIB_TAB_TO_HERE,  //到这里去
                            BMAPLIB_TAB_FROM_HERE //从这里出发
                        ]
                    });
                    _marker.addEventListener("click", function(e) {  
                        searchInfoWindow.open(_marker);
                    });
                }
            };     
            return _marker; 
        },
        drawZtree:function(obj, json, callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var setting = {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pid",
                        rootPId: 0
                    }
                },
                callback:{
                    onClick:function(event, treeId, treeNode){
                        if(treeNode.pid==0){
                            return;
                        }
                        callback(event, treeId, treeNode);
                    }
                }
            };
            var initData = [];
            var arr= json.node_list;
            if(arr != null){
                for(var i=0;i<arr.length;i++){
                    var o={};
                    o.id=arr[i].node_id;
                    o.pid=arr[i].node_pid;
                    o.name=arr[i].node_name;
                    o.isparent=arr[i].isparent;
                    initData.push(o);
                }
            }
            $.fn.zTree.init(obj, setting, initData);
        },
        clearMarker:function(marker) {
            AIMap_map.removeOverlay(marker);
        },
        clearAll:function() {
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            AIMap_map.clearOverlays();
        },
        clearJuhe: function(){
            AIMap_Juhe.clearMarkers();//清除点聚合
        },
        /**
         *根据两点画线
         *points代表点数组
         *params表示渲染参数
         *callback返回线对象
        **/
        drawLine:function(points,params,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            params = params||{};
            var line = new AIMap.Polyline(points, params);
            callback(line);
        },
        /**
         *多边形区域展示
         *json：表示区域
         *flag：表示是否允许被清除
         *callback返回多边形覆盖物对象
        **/
        drawShape:function(json,flag,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var n_json = json.area_info;
            var shape;
            if(!n_json.param){
                n_json.param = {
                    strokeColor:"blue",    //边线颜色。
                    fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 3,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.5,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
            }else{
                n_json.param = {
                    strokeColor:n_json.param.stroke_color,    //边线颜色。
                    fillColor:n_json.param.fill_color,  //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: n_json.param.stroke_weight,       //边线的宽度，以像素为单位。
                    strokeOpacity: n_json.param.stroke_opacity,    //边线透明度，取值范围0 - 1。
                    fillOpacity: n_json.param.fill_opacity,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: n_json.param.stroke_style //边线的样式，solid或dashed。
                }
            }

            if(n_json.drawing_modes == "polygon"){
                var points = [];
                for (var i=0,length=n_json.point_list.length; i<length; i++) {
                    points[i] = new AIMap.Point(n_json.point_list[i].longitude, n_json.point_list[i].latitude);
                };
                shape = new AIMap.Polygon(points, n_json.param);
            }
            if(flag){
                shape.disableMassClear();//禁止覆盖物在map.clearOverlays方法中被清除。
            }
            if(json.center){
                var center_point = new AIMap.Point(json.center.longitude,json.center.latitude);
                AIMap_map.panTo(center_point);
            }
            AIMap_map.addOverlay(shape);
            if (typeof callback == 'function') {
                callback(shape);
            }
            return shape;
        },
        /**
         *自定义信息窗口
         *map：地图对象
         *point：标记点坐标
         *html：信息展示内容
         *回调方法返回该标记点和信息窗口
        **/
        createInfoWindow: function(point, callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var icon = parseInt(point.icon, 10);
            var myIcon,zoffsetx,zoffsety,zoffsets,zoffseta,
            url = 'http://webmap1.map.bdimg.com/newmap/static/common/images/us_cursor_4c00be8.gif';
            switch (icon){
                case 101: 
                    // url = "res/lib/AIMap/1.0.0/icon/yingyeting.png";
                    zoffsetx = 0;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 102: 
                    // url = "res/lib/AIMap/1.0.0/icon/jituankehu.png";
                    zoffsetx = -23;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 103: 
                    // url = "res/lib/AIMap/1.0.0/icon/shehuiqudao.png";
                    zoffsetx = -46;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 104:
                    zoffsetx = -69;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 105:
                    zoffsetx = -92;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 106:
                    zoffsetx = -115;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
                case 201:
                    zoffsetx = 0;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                case 202: 
                    zoffsetx = -23;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                case 203: 
                    zoffsetx = -46;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                case 204:
                    zoffsetx = -69;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                case 205:
                    zoffsetx = -92;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                case 206:
                    zoffsetx = -115;
                    zoffsety = -46;
                    zoffsets = 20;
                    zoffseta = 5;
                    break;
                default:
                    // url = "http://api0.map.bdimg.com/images/marker_red_sprite.png";
                    zoffsetx = 0;
                    zoffsety = -21;
                    zoffsets = 25;
                    zoffseta = 15;
                    break;
            }
            myIcon = new BMap.Icon(url, new BMap.Size(20, zoffsets), {  
                anchor: new BMap.Size(zoffseta, 25), // 指定定位位置
                imageOffset: new BMap.Size(zoffsetx, zoffsety),
                infoWindowAnchor: new BMap.Size(10, 0)
            });
            var myShadow = new BMap.Icon(url, new BMap.Size(20, -25), {  
                anchor: new BMap.Size(10, 25), // 指定定位位置  
                imageOffset: new BMap.Size(-20, 0) // 设置图片偏移  
            });
            var marker = new AIMap.Marker(new AIMap.Point(point.lng, point.lat),{"icon":myIcon, "shadow":myShadow});
            AIMap_map.addOverlay(marker);
            marker.addEventListener("click", function(e){
                if(typeof callback == "function"){
                    callback(point,marker);
                }
            });
        },
        search: function(param){
            
            //获取搜索的关键字
            var keyword = param.keyword;
            var nopoint=param.nopoint;
            //将要传递的参数封装成data对象
            var data;
            
            var map = AIMap_map;
            var zUrl = param.zUrl||"";
            var zmarkerClusterer = param.markerClusterer||"";
            
            var overlayjson = '';
            overlayjson = '{';

            if(param.circle){
                //获取圆对象
                var circle = param.circle;
               
                //获取圆形的圆心
                var circle_center = circle.getCenter();
                
                //获取圆形的半径
                var radius = circle.getRadius();

                //overlayjson +=  '"drawing_modes" : ' + '"circle"';
                overlayjson += '"keyword" : "' + keyword;
                overlayjson += '", "longitude" : ' + circle_center.lng + ', "latitude" : ' + circle_center.lat;
                overlayjson += ', "radius": ' + radius;
                overlayjson +='}';

            }
            else if(param.bounds){
                //获取矩形区域对象
                var bounds = param.bounds;
                
                //获取矩形区域的西南角
                var southWest = bounds.getSouthWest();

                //获取矩形区域的东北角
                var northEast = bounds.getNorthEast();

                overlayjson +=  '"drawing_modes" : ' + '"bounds"';
                overlayjson += ', "keyword" : "' + keyword;
                overlayjson += '", "minX" : ' + southWest.lng;
                overlayjson += ', "minY" : ' + southWest.lat;
                overlayjson += ', "maxX" : ' + northEast.lng;
                overlayjson += ', "maxY" : ' + northEast.lat;
                overlayjson +='}';
            }
            else if(param.polygon){
                //获取多边形对象
                var polygon = param.polygon;

                //获取多边形的点数组
                var point_array = polygon.getPath();

                //overlayjson +=  '"drawing_modes" : ' + '"polygon"';
                overlayjson += '"keyword" : "' + keyword;
                overlayjson += '", "points" : [' ;
                for (var i = 0; i < point_array.length; i++) {
                    overlayjson += '{ "longitude" : ' + point_array[i].lng + ', "latitude" : ' + point_array[i].lat + '}';
                    if(i != point_array.length - 1){
                        overlayjson += ',' ;
                    }
                };
                overlayjson += ']}' ;

            }
            else{
                //overlayjson +=  '"drawing_modes" : ' + '"none"';
                overlayjson += '"keyword" : "' + keyword;
                overlayjson += '"}' ;
            }
            
            var json=encodeBase64(encodeURIComponent(overlayjson));
            AIMap.ajax.AjaxJson(zUrl,"data="+json+"&appId="+AIMap_APPID,function(state,json){
                if(state=='success'){
                    if(json&&json.returncode=='1'&&json.point_list.length>0){
                        AIMap.init.createMarker(json,false,true,function(point,markers){
                            AIMap_Juhe.addMarkers(markers);//生成点聚合
                        });

                        if(param.onSearchComplete){
                            param.onSearchComplete(json);
                        }
                    }else{
                        //alert(json.returnmessage||"未在区域内找到合适的标记点！");
                    	//var nopoint = toolbar.NOPOINTMSG;
                        if(typeof nopoint == 'function'){
                        	nopoint();
                        }else{
                        	alert("未在区域内找到合适的标记点！");
                        }
                    }
                }
            });
        },
        /**
         *公交路线查询
        **/
        transitNavigate:function(start,end,callback){
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var transit = new BMap.TransitRoute(AIMap_map,{
              renderOptions: {map: AIMap_map}
            });
            transit.search(start, end);
            transit.setSearchCompleteCallback(function(results){
                if(typeof callback=='function'){
                    callback(transit,results);
                }
            });
        },
        /**
         *驾车导航
        **/
        drivingNavigate:function(start,end,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var driving = new AIMap.DrivingRoute(AIMap_map,{renderOptions:{map: AIMap_map, autoViewport: true}});
            driving.search(start, end);
            driving.setSearchCompleteCallback(function(results){
                if(typeof callback=='function'){
                    callback(driving,results);
                }
            });
        },
        /**
         *步行导航
        **/
        walkingNavigate:function(start,end,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var walking = new AIMap.WalkingRoute(AIMap_map,{renderOptions:{map: AIMap_map, autoViewport: true}});
            walking.search(start,end);
            walking.setSearchCompleteCallback(function(results){
                if(typeof callback=='function'){
                    callback(walking,results);
                }
            });
        },
        /**
         *三种驾车策略：最少时间，最短距离，避开高速
        **/
        multiNavigate:function(start,end,routeNum,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
            var transit = new BMap.DrivingRoute(AIMap_map, {
                renderOptions: {map: AIMap_map,panel:""}, 
                policy: routePolicy[routeNum]
            });
            transit.search(start,end);
            transit.setSearchCompleteCallback(function(results){
                if(typeof callback=='function'){
                    callback(transit,results);
                }
            });
        },
        /**
         *多种策略的公交导航
         *从左到右依次是不乘地铁  ，最少时间，最少换乘，最少步行
        **/
        multiTransitNavigate:function(start,end,routeNum,callback){
            
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS,BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING];
            var transit = new BMap.TransitRoute(AIMap_map, {
              renderOptions: {map: AIMap_map},
              policy:routePolicy[routeNum]
            });
            transit.search(start, end);
            transit.setSearchCompleteCallback(function(results){
                if(typeof callback=='function'){
                    callback(transit,results);
                }
            });
        },
        /**
         *其他坐标转百度坐标
         *from:
         *1：GPS设备获取的角度坐标;2：GPS获取的米制坐标、sogou地图所用坐标;3：google地图、soso地图、aliyun地图、mapabc地图和amap地图所用坐标4：3中列表地图坐标对应的米制坐标5：百度地图采用的经纬度坐标6：百度地图采用的米制坐标7：mapbar地图坐标;8：51地图坐标
         *to:
         *有两种可供选择：5、6。5：bd09ll(百度经纬度坐标),6：bd09mc(百度米制经纬度坐标);
        **/
        geoconv: function(points,from,to,callback){
            var url = "http://api.map.baidu.com/geoconv/v1/?coords="+points+"&from="+from+"&to="+to+"&ak=fOgGo46uu0z1KA96BSy55ZcV&callback=AIMap_dealResult";
            AIMap.ajax.AjaxJsonp(url,"");
            window.AIMap_dealResult = function(data){
                callback(data);
            }
        },
        /**
         *地址编码与反编码
         *1表示地址转坐标
         *2表示坐标转地址
        **/
        geocoder: function(type, arr, addr, callback){
            var myGeo = new AIMap.Geocoder();
            var tempJson = [];
            var tempIndex = 0;
            if(type=='1'){
                for(var i=0,length=arr.length; i<length; i++){
                    myGeo.getPoint(arr[i], function(point){
                        if (point) {
                            tempJson.push(point);
                            if(tempJson.length==arr.length){
                                callback(tempJson);
                            }
                        }
                    }, addr);
                }
            }else if(type=='2'){
                for(var i=0,length=arr.length; i<length; i++){
                    myGeo.getLocation(arr[i], function(res){
                        if (res) {
                            tempJson.push(res);
                            if(tempJson.length==arr.length){
                                callback(tempJson);
                            }
                        }
                    });
                }
            }
        },
        areaColor: function(num){
            if(typeof num == 'number'){
                var colorArr = [
                    "#7e9925",
                    "#e50756",
                    "#490ceb",
                    "#5756c6",
                    "#047e83",
                    "#8307d1",
                    "#695246",
                    "#e613fa"
                ];
                return colorArr[num];
            }else{
                return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
            }
        },
        /**
         *业务场景1：客户信息展示
        **/
        markershow:function(dataP){
            var points = dataP.POINTS;
            var unclear = dataP.UNCLEAR;
            var custom = dataP.CUSTOM||"";
            var callback = dataP.CALLBACK||"";
            var datap = JSON.stringify(points);
            var viewfollow=dataP.VIEWFOLLOW;
//            point='{"param_list":'+JSON.stringify(points)+'}';
            datap=encodeBase64(encodeURIComponent(datap));
            AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00010","appId="+AIMap_APPID+"&data="+datap,function(state,json){
                if(state=='success'){
                    if(json&&json.returncode=='1'&&json.point_list.length>0){
                        AIMap.init.createMarker(json,unclear,true,function(zpoints,markers){
                        	if(viewfollow)
                        		AIMap_map.panTo(new AIMap.Point(zpoints[0].longitude,zpoints[0].latitude));
                            AIMap_Juhe.addMarkers(markers);//生成点聚合
                            //AIMap_map.setViewport(zpoints);
                        });
                    }else{
                        //alert("未查找到用户标记点！");
                    	var nopoint = dataP.NOPOINTMSG;
                        if(typeof nopoint == 'function'){
                        	nopoint();
                        }else{
                        	alert("未查找到用户标记点！");
                        }
                    }
                }
            });
        },
        /**
         *业务场景2：片区管理的功能
        **/
        treeArea: function(dataP){
            var rootid = dataP.TREEID;
            var treeContain =dataP.TREECONTAINER;
            var markerflag =dataP.MARKERFLAG;
            var areaflag =dataP.AREAFLAG;
            
            AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00006","appId="+AIMap_APPID+"&nodeId="+rootid,function(state,json){

                if(state=='success'){
                    if(json&&json.returncode=='1'){
                        AIMap.init.drawZtree($("#"+treeContain), json, function(e, treeId, treeNode){
                            
                            AIMap.init.clearAll(AIMap_map); 
                            if(areaflag){
                                //显示树节点下绑定的区域
                                AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00007","appId="+AIMap_APPID+"&nodeId="+treeNode.id,function(state,json){
                                    if(state=="success"){
                                        if(json&&json.returncode=="1"){
                                            if(json.node_area_info.area_info){//获取自己区域
                                                var zply = AIMap.init.drawShape(json.node_area_info,false);
                                                AIMap_map.setViewport(zply.getPath());//地图视野转到该区域
                                            }else{
                                                alert("暂未绑定区域！");
                                            }
                                        }else{
                                            alert(json.returnmessage||"获取区域失败！");
                                        }
                                    }else{
                                        alert("系统错误！");
                                    }
                                }); 
                            }


                            if(markerflag){
                                //显示树节点下绑定的标记点
                                AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00001","appId="+AIMap_APPID+"&treeNodeId="+treeNode.id,function(state,json){
                                    if(state=='success'){
                                        if(json&&json.returncode=='1'&&json.point_list.length>0){
                                            setTimeout(function(){
                                                AIMap.init.createMarker(json,true,false,function(point,markers){
                                                AIMap_Juhe.addMarkers(markers);//生成点聚合
                                                });
                                            },200);
                                        }else{
                                            alert(json.returnmessage||"暂未绑定节点！");
                                        }
                                    }
                                });
                            }
                            
                        } ); 
                    }
                }
            })
        },
        /**
         *业务场景3：签到点回调
         *点击签到点，回调第三方方法。
        **/
        signMarker: function(dataP){
            if(AIMap_Juhe._markers.length){
                AIMap.init.clearJuhe();//清除点聚合
            }
            AIMap.init.clearAll();
            var draw = dataP.DRAW;
            var callback = dataP.CALLBACK;
            var points = dataP.POINTS;
            var search = dataP.SEARCH;
            if(draw){//保存签到点
                AIMap_map.setViewport(points);
                var marker = new AIMap.Marker(new AIMap.Point(points[0].lng, points[0].lat));
                var infoWindow = new AIMap.InfoWindow("");
                AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00008","latlngFlat=1&businessId=10093&pointLng="+points[0].lng+"&pointLat="+points[0].lat+"&treeNodeId=J571",function(state,json){
                    if(state=='success'){
                        if(json&&json.returncode=='1'){
                            alert("success");
                        }
                    }

                });
                marker.addEventListener("click", function(){
                    if(typeof callback=='function'){
                        callback(marker,infoWindow);
                    }else{
                        alert("未传入正确的回调方法！");
                    }
                });
                AIMap_map.addOverlay(marker);
            }else if(search){
                var datap = JSON.stringify(points);
                var G_Points = [];
                AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00009","latlngFlat=1&businessId="+datap,function(state,json){
                    if(state=='success'){
                        if(json&&json.returncode=='1'){
                            for(var i=0,length=json.point_list.length; length>0&&i<length; i++){
                                if(json.point_list[i].register_id!=""){
                                    var zPoint = new AIMap.Point(json.point_list[i].pointlng, json.point_list[i].pointlat);
                                    G_Points.push(zPoint);
                                    var marker = new AIMap.Marker(zPoint);
                                    var infoWindow = new AIMap.InfoWindow("");
                                    marker.setTitle(i);
                                    marker.addEventListener("click", function(){
                                        if(typeof callback=='function'){
                                            callback(this,infoWindow);
                                        }else{
                                            alert("未传入正确的方法！");
                                        }
                                    });
                                    AIMap_map.addOverlay(marker);
                                    if(i==length-1){
                                        var line = new AIMap.Polyline(G_Points);
                                        AIMap_map.addOverlay(line);
                                    }
                                }
                                
                            }
                            AIMap_map.setViewport(G_Points);
                        }
                    }
                });
            }
        },
        /**
         * 业务场景5：显示多个区域
        **/
        showMultiArea: function(dataP){
            var draw = dataP.DRAW;
            var callback = dataP.CALLBACK;
            var areas = dataP.AREAS;
            var search = dataP.SEARCH;
            var viewfollow=dataP.VIEWFOLLOW;
            var datap = JSON.stringify(areas);
            datap=encodeBase64(encodeURIComponent(datap));
            var G_Points = [];
            AIMap.ajax.AjaxJson(gis_url+"?interfaceId=GIS00011","latlngFlat=1&areas="+datap,function(state,json){
//            AIMap.ajax.AjaxJson("res/data4Ext/multiArea.json","",function(state,json){
                if(state=='success'){
                    if(json&&json.returncode=='1'){
                        var areaJson = json.area_list;
                        var tempPoint = [];
                        for(var i=0,length=areaJson.length; i<length; i++){//获取相邻同级区域
                            if(length>10){
                                var tempColor = AIMap.init.areaColor();
                            }else{
                                var tempColor = AIMap.init.areaColor(i);
                            }
                            for(var j=0, zlength=areaJson[i].area_info.point_list.length; j<zlength; j++){
                                var point = new AIMap.Point(areaJson[i].area_info.point_list[j].longitude,areaJson[i].area_info.point_list[j].latitude);
                                tempPoint.push(point);
                            }
                            areaJson[i].area_info.param.fill_color = tempColor;
                            areaJson[i].area_info.param.stroke_color = tempColor;
                            AIMap.init.drawShape(areaJson[i],false,function(shape){
                            	
                                //给多边形绑定点击事件
                                shape.addEventListener("click",function(e){
                                    var temp_arr = e.target.getPath(),
                                    temp_arr2 = [],
                                    target_area_node_id,
                                    target_point = new AIMap.Point(e.point.lng, e.point.lat);
                                    AIMap_map.addOverlay(target_point);
                                    for(var l=0,llength=temp_arr.length; l<llength; l++){
                                        var _o = {};
                                        _o.latitude = temp_arr[l].lat.toFixed(6);
                                        _o.longitude = temp_arr[l].lng.toFixed(6);
                                        temp_arr2.push(_o);
                                    }
                                    var temp_arr_str = JSON.stringify(temp_arr2);
                                    for(var k=0; k<length; k++){
                                        var temp_arr_str2 = JSON.stringify(areaJson[k].area_info.point_list);
                                        if(temp_arr_str == temp_arr_str2){
                                            target_area_node_id = areaJson[k].node.node_id;
                                            var infoWindow = new BMap.InfoWindow("");
                                            callback(infoWindow,target_point,target_area_node_id)
                                        }
                                    }

                                })

                                if(i==length-1&&viewfollow){
                                    AIMap_map.setViewport(tempPoint);
                                }
                            });
                        }
                    }else{
                        alert(json.returnmessage||"查询失败！");
                    }
                }
            })
        }
    };

    AIMap.ajax = {
        /*
        * 原生ajax非跨域请求
        */
        AjaxJson: function(url, datas, callback){
            var AIMap_xmlhttp;
            if (window.XMLHttpRequest){
                AIMap_xmlhttp = new XMLHttpRequest();
            }else if(window.ActiveXObject){
                AIMap_xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }else{
                alert("您的浏览器不支持ajax，请更换浏览器！");
                return false;
            }
            AIMap_xmlhttp.open("POST",url);
            AIMap_xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            AIMap_xmlhttp.send(datas + "&_=" + (new Date()).getTime());
            AIMap_xmlhttp.onreadystatechange = function(){
                if(AIMap_xmlhttp.readyState==4 && AIMap_xmlhttp.status==200){
                    callback("success", eval("("+AIMap_xmlhttp.responseText+")"));
                }
            }
        },
        /*
        * ajax跨域请求
        * datas中包含回调方法，缺省为AIMap_jsonp
        */
        AjaxJsonp: function(url, datas){
            // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
            var url = url+datas+"&_=" + (new Date()).getTime();
            // 创建script标签，设置其属性
            var script = document.createElement('script');
            script.setAttribute('src', url);
            // 把script标签加入head，此时调用开始
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };
}

function AIMap_initMap(){
    AIMap_map = new AIMap.Map(AIMap_MAPID);

    AIMap_map.enableScrollWheelZoom();//添加滚轮缩放
    AIMap_map.addControl(new AIMap.NavigationControl());  //添加默认缩放平移控件
    AIMap_map.addControl(new AIMap.ScaleControl());  //添加比例尺控件

    AIMap_Juhe = new AMapLib.MarkerClusterer(AIMap_map,{minClusterSize:20,maxZoom: 16});//点聚合，多于20个点聚合，缩放级别大于16不聚合。建议：第三方应用自己使用分页功能，不使用聚合。

    //定位
    if(AIMap_PARAMS.LOCATION.LNGLAT&&AIMap_PARAMS.LOCATION.LNGLAT.FLAG){//根据百度经纬度定位
        var marker = AIMap_PARAMS.LOCATION.LNGLAT;
        var grade = marker.GRADE||"13";
        AIMap_map.centerAndZoom(new AIMap.Point(marker.POINTS[0].lng,marker.POINTS[0].lat),grade);
    }else if(AIMap_PARAMS.LOCATION.GPS&&AIMap_PARAMS.LOCATION.GPS.FLAG){//gps定位
        var gps = AIMap_PARAMS.LOCATION.GPS;
        var grade = gps.GRADE||"13";
        var points = gps.POINTS[0].lng+","+gps.POINTS[0].lat;
        //gps转换百度坐标
        AIMap.init.geoconv(points,1,5,function(data){
            AIMap_map.centerAndZoom(new AIMap.Point(data.result[0].x,data.result[0].y),grade);
        });
    }else if(AIMap_PARAMS.LOCATION.ADDRESS&&AIMap_PARAMS.LOCATION.ADDRESS.FLAG){//根据中文名定位
        var address = AIMap_PARAMS.LOCATION.ADDRESS;
        var grade = address.GRADE||"13";
        var addr = address.ADDR;
        AIMap_map.centerAndZoom(addr,grade);
    }

    if(AIMap_PARAMS.TOOLSBAR&&AIMap_PARAMS.TOOLSBAR.FLAG){
        var toolbar = AIMap_PARAMS.TOOLSBAR;
        var BMapLib_hander,//抓手对象
        BMapLib_rectangle,//区域绘制对象
        tempDaoHang,//导航按钮对象
        tempJulijisuan,//距离计算按钮对象
        tempZhoubian,//周边搜索按钮对象
        ztransit;//公交路线覆盖物

        var point1,point2,tempJson1=[],tempJson2=[],marker1,marker2,flag1=0,flag2=0;

        //加载区域绘制工具
        var overlays = [];
        //回调获得覆盖物信息
        var overlaycomplete = function(e){
            overlays.push(e.overlay);
            drawingManager.close();
            AIMap_removeClass(BMapLib_rectangle, "active");
            var z_json = {};
            if (e.drawingMode == BMAP_DRAWING_RECTANGLE) {
                var points = [];
                var pointsView=[];
                for(var i=0,length=e.overlay.getPath().length; i<length; i++){
                    var attrView = {};
                    attrView.lng = e.overlay.getPath()[i].lng;
                    attrView.lat = e.overlay.getPath()[i].lat;
                    pointsView.push(attrView);
                    var attr = {};
                    attr.longitude = e.overlay.getPath()[i].lng;
                    attr.latitude = e.overlay.getPath()[i].lat;
                    points.push(attr);
                }
                z_json.points = points;
                AIMap_map.setViewport(pointsView);//地图视野转到该区域
            }
            //构建用户所画矩形区域
            var NorthEast = new AIMap.Point(e.overlay.getPath()[1].lng,e.overlay.getPath()[1].lat);

            var json=encodeBase64(encodeURIComponent(JSON.stringify(z_json)));
            AIMap.init.clearJuhe();//清除点聚合
            var keyValue = prompt("请输入搜索标记点的名称关键字","营业厅");
            //按区域搜索标记点
            AIMap.ajax.AjaxJson(toolbar.AREADRAWURL,"overlayjson="+json+"&keyword="+keyValue,function(state,json){
                if(state=='success'){
                    if(json&&json.returncode=='1'&&json.point_list.length>0){
                        //杭分系统接入
                        if(toolbar.HANGFEN){
                            var temp_marker_wrap;

                            var count_label = new BMap.Label('', {position: NorthEast,offset: new BMap.Size(1, -2)});
                            AIMap_map.addOverlay(count_label);

                            //勾选checkbox显示不同点
                            var _searchName = document.getElementsByName(toolbar.SEARCHNAME);
                            var temp_arr = [];//装载需要显示的点的类别
                            for(var l=0,llength=_searchName.length; l<llength; l++){
                                if(_searchName[l].checked){
                                    temp_arr.push(_searchName[l].value);
                                }
                                AIMap_addEventHandler(_searchName[l],"click",function(ev){
                                    var ev=ev||window.event; 
                                    var target = ev.target||ev.srcElement; //低版本ie this会指向一个无用的window
                                    if(target.checked){
                                        temp_arr.push(target.value);
                                    }else{
                                        for(var key in temp_arr){
                                            if(target.value==temp_arr[key]){
                                                temp_arr.splice(key,1);
                                            }
                                        }
                                    }

                                    //生成新json
                                    var new_json = [],
                                    new_json_wrap = {};
                                    for(var m=0, mlngth=json.point_list.length; m<mlngth; m++){
                                        for(var n=0, nlength=temp_arr.length; n<nlength; n++){
                                            if(json.point_list[m].point_type == temp_arr[n]){
                                                new_json.push(json.point_list[m]);
                                            }
                                        }
                                    }
                                    new_json_wrap.point_list = new_json;

                                    AIMap_countcheck(count_label,new_json_wrap,NorthEast);

                                    //显示新json里面的点
                                    AIMap.init.clearMarker(temp_marker_wrap);
                                    if(new_json_wrap.point_list.length>200){
                                        if(confirm("当前搜索出标记点有"+new_json_wrap.point_list.length+"个，点击确定显示全部，取消显示前200个。")){
                                            AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                                temp_marker_wrap = markers;
                                                AIMap_Juhe.addMarkers(markers);//生成点聚合
                                            });
                                        }else{
                                            new_json_wrap.point_list.splice(200);
                                            AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                                temp_marker_wrap = markers;
                                                AIMap_Juhe.addMarkers(markers);//生成点聚合
                                            });
                                        }
                                    }else{
                                        AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                            temp_marker_wrap = markers;
                                            AIMap_Juhe.addMarkers(markers);//生成点聚合
                                        });
                                    }
                                    var callback = toolbar.CALLBACK;
                                    if(typeof callback == 'function'){
                                        callback(new_json_wrap);
                                    }

                                })
                            }

                            var new_json2 = [],
                            new_json_wrap2 = {};
                            for(var m2=0, mlngth2=json.point_list.length; m2<mlngth2; m2++){
                                for(var n2=0, nlength2=temp_arr.length; n2<nlength2; n2++){
                                    if(json.point_list[m2].point_type == temp_arr[n2]){
                                        new_json2.push(json.point_list[m2]);
                                    }
                                }
                            }
                            new_json_wrap2.point_list = new_json2;

                            AIMap_countcheck(count_label,new_json_wrap2,NorthEast);

                            if(new_json_wrap2.point_list.length>200){
                                if(confirm("当前搜索出标记点有"+new_json_wrap2.point_list.length+"个，点击确定显示全部，取消显示前200个。")){
                                    AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                        temp_marker_wrap = markers;
                                        AIMap_Juhe.addMarkers(markers);//生成点聚合
                                    });
                                }else{
                                    json.point_list.splice(200);
                                    AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                        temp_marker_wrap = markers;
                                        AIMap_Juhe.addMarkers(markers);//生成点聚合
                                    });
                                }
                            }else{
                                AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                    temp_marker_wrap = markers;
                                    AIMap_Juhe.addMarkers(markers);//生成点聚合
                                });
                            }
                            var callback = toolbar.CALLBACK;
                            if(typeof callback == 'function'){
                                callback(new_json_wrap2);
                            }

                        }else{
                            if(json.point_list.length>200){
                                if(confirm("当前搜索出标记点有"+json.point_list.length+"个，点击确定显示全部，取消显示前200个。")){
                                    AIMap.init.createMarker(json,false,true,function(point,markers){
                                        AIMap_Juhe.addMarkers(markers);//生成点聚合
                                    });
                                }else{
                                    json.point_list.splice(200);
                                    AIMap.init.createMarker(json,false,true,function(point,markers){
                                        AIMap_Juhe.addMarkers(markers);//生成点聚合
                                    });
                                }
                            }else{
                                AIMap.init.createMarker(json,false,true,function(point,markers){
                                    AIMap_Juhe.addMarkers(markers);//生成点聚合
                                });
                            }
                            var callback = toolbar.CALLBACK;
                            if(typeof callback == 'function'){
                                callback(json);
                            }
                        }

                    }else{
                    	var nopoint = toolbar.NOPOINTMSG;
                        if(typeof nopoint == 'function'){
                        	nopoint();
                        }else{
                        	alert("未在区域内找到合适的标记点！");
                        }
                        	
                    }
                }
            });
        };

        var styleOptions = {
            strokeColor:"blue",    //边线颜色。
            fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.5,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        drawingManager = new BMapLib.DrawingManager(AIMap_map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
                scale: 0.8, //工具栏缩放比例
                drawingModes : [
                    BMAP_DRAWING_RECTANGLE
                ]
            },
            rectangleOptions: styleOptions //矩形的样式
        });

        //开启计算功能
        // drawingManager.enableCalculate();
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);

        BMapLib_hander = AIMap_getElementsByClassName(document,"BMapLib_hander")[0];
        BMapLib_hander.style.display='none';
        BMapLib_rectangle = AIMap_getElementsByClassName(document,"BMapLib_rectangle")[0];
        BMapLib_rectangle.setAttribute("title","区域绘制搜索");

        AIMap_addEventHandler(BMapLib_rectangle,"click",function(e){
            if(!AIMap_hasClass(BMapLib_rectangle, "active")){//激活
                //重置工具栏
                if(ztransit){
                    ztransit.clearResults();
                }
                if(tempDaoHang){
                    AIMap_removeClass(tempDaoHang,"active");
                    tempDaoHang.style.backgroundPosition = "-195px 0";
                    AIMap_map.removeEventListener("click",AIMap_GetNaviga);
                    AIMap.init.clearMarker(marker1);
                    AIMap.init.clearMarker(marker2);
                    tempJson1=[];
                }
                if(tempJulijisuan){
                    AIMap_removeClass(tempJulijisuan,"active");
                    tempJulijisuan.style.backgroundPosition = "-64px 0";
                    AIMap_map.removeEventListener("click",AIMap_GetDistance);
                    AIMap.init.clearMarker(marker1);
                    AIMap.init.clearMarker(marker2);
                    tempJson2=[];
                }
                if(tempZhoubian){
                    AIMap_removeClass(tempZhoubian,"active");
                    tempZhoubian.style.backgroundPosition = "-261px 0";
                    AIMap_map.removeEventListener("click",AIMap_GetNearBy);
                }
                setTimeout(function(){
                    AIMap_addClass(BMapLib_rectangle, "active");
                },2);
                AIMap.init.clearAll();
            }else{//关闭
                setTimeout(function(){
                    AIMap_removeClass(BMapLib_rectangle, "active");
                    BMapLib_hander.click();
                },2);
                drawingManager.close();
            }
        })

        //加载导航、距离计算、周边搜索工具
        var childNode=document.createElement("span");
        var AIMap_HtmlBtn =
                '<a class="BMapLib_box BMapLib_polyline" href="javascript:void(0)" title="公交导航" onfocus="this.blur()" onClick="AIMap_GetNav(this,event);return false;"></a>'+
                '<a class="BMapLib_box BMapLib_marker " href="javascript:void(0)" title="距离计算" onfocus="this.blur()" onClick="AIMap_GetDist(this,event);return false;"></a>'+
                '<a class="BMapLib_box BMapLib_polygon " href="javascript:void(0)" title="周边搜索" onfocus="this.blur()" onClick="AIMap_GetNear(this,event);return false;"></a>';
        childNode.innerHTML = AIMap_HtmlBtn;
        var parent = AIMap_getElementsByClassName(document,"BMapLib_Drawing_panel")[0];
        parent.appendChild(childNode);

        if(!toolbar.AREADRAW){
            AIMap_getElementsByClassName(parent,"BMapLib_rectangle")[0].style.display="none";
        }
        if(!toolbar.DAOHANG){
            AIMap_getElementsByClassName(parent,"BMapLib_polyline")[0].style.display="none";
        }
        if(!toolbar.JULI){
            AIMap_getElementsByClassName(parent,"BMapLib_marker")[0].style.display="none";
        }
        if(!toolbar.ZHOUBIAN){
            AIMap_getElementsByClassName(parent,"BMapLib_polygon")[0].style.display="none";
        }

        //点击地图两个点绘制导航
        window.AIMap_GetNav = function(obj,ev){
            AIMap_stopEvent(ev);
            tempDaoHang = obj;
            
            //重置工具栏
            if(ztransit){
                ztransit.clearResults();
            }
            if(BMapLib_rectangle){
                setTimeout(function(){
                    AIMap_removeClass(BMapLib_rectangle, "active");
                    BMapLib_hander.click();
                },2);
            }
            if(BMapLib_hander){
                BMapLib_hander.click();
            }
            if(tempJulijisuan){
                AIMap_removeClass(tempJulijisuan,"active");
                tempJulijisuan.style.backgroundPosition = "-64px 0";
                AIMap_map.removeEventListener("click",AIMap_GetDistance);
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson2=[];
            }
            if(tempZhoubian){
                AIMap_removeClass(tempZhoubian,"active");
                tempZhoubian.style.backgroundPosition = "-261px 0";
                AIMap_map.removeEventListener("click",AIMap_GetNearBy);
            }
            if(!AIMap_hasClass(obj, "active")){
                obj.style.backgroundPosition = "-195px 47px";
                AIMap_addClass(obj, "active");
                AIMap_map.addEventListener("click", AIMap_GetNaviga=function(e){
                	
                    if(tempJson1.length==0){
                        if(e.overlay&&e.overlay.toString()=='[object Marker]'){
                            point1 = new AIMap.Point(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
                        }else{
                            point1 = new AIMap.Point(e.point.lng, e.point.lat);
                        }
                        tempJson1.push(point1);
                        marker1 = new AIMap.Marker(point1);
                        AIMap_map.addOverlay(marker1);
                    }else if(tempJson1.length==1){
                        if(e.overlay&&e.overlay.toString()=='[object Marker]'){
                            point2 = new AIMap.Point(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
                        }else{
                            point2 = new AIMap.Point(e.point.lng, e.point.lat);
                        }
                        tempJson1.push(point2);
                        marker2 = new AIMap.Marker(point2);
                        AIMap_map.addOverlay(marker2);
                        point1 = tempJson1[0];
                        point2 = tempJson1[1];
                        setTimeout(function(){
                            AIMap.init.transitNavigate(point1,point2,function(transit,results){
                                if (transit.getStatus() == BMAP_STATUS_SUCCESS){
                                    if(results.Fn.length){
                                        ztransit = transit;
                                        obj.style.backgroundPosition = "-195px 0";
                                        AIMap_map.removeEventListener("click",AIMap_GetNaviga);
                                        AIMap.init.clearAll();
                                    }else{
                                        alert("未找到合适的公交导航路线");
                                    }
                                }else{
                                    alert("未找到合适的公交导航路线");
                                }
                                AIMap.init.clearMarker(marker1);
                                AIMap.init.clearMarker(marker2);
                                tempJson1=[];
                                AIMap_removeClass(tempDaoHang, "active");
                            });
                        },1);
                    }
                });
            }else{
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson1=[];
                obj.style.backgroundPosition = "-195px 0";
                AIMap_removeClass(tempDaoHang, "active");
                AIMap_map.removeEventListener("click",AIMap_GetNaviga);
            }
        }

        //距离计算
        window.AIMap_DistLength=0;
        window.AIMap_GetDist = function(obj,ev){
            AIMap_stopEvent(ev);
            tempJulijisuan = obj;
            
            //重置工具栏
            if(ztransit){
                ztransit.clearResults();
            }
            if(BMapLib_rectangle){
                setTimeout(function(){
                    AIMap_removeClass(BMapLib_rectangle, "active");
                    BMapLib_hander.click();
                },2);
            }
            if(BMapLib_hander){
                BMapLib_hander.click();
            }
            if(tempDaoHang){
                AIMap_removeClass(tempDaoHang,"active");
                tempDaoHang.style.backgroundPosition = "-195px 0";
                AIMap_map.removeEventListener("click",AIMap_GetNaviga);
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson1=[];
            }
            if(tempZhoubian){
                AIMap_removeClass(tempZhoubian,"active");
                tempZhoubian.style.backgroundPosition = "-261px 0";
                AIMap_map.removeEventListener("click",AIMap_GetNearBy);
            }
            if(!AIMap_hasClass(obj, "active")){
                obj.style.backgroundPosition = "-64px 47px";
                AIMap_addClass(obj, "active");
                AIMap_map.addEventListener("click", AIMap_GetDistance=function(e){
                    if(tempJson2.length==0){
                        if(e.overlay&&e.overlay.toString()=='[object Marker]'){
                            point3 = new AIMap.Point(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
                        }else{
                            point3 = new AIMap.Point(e.point.lng, e.point.lat);
                        }
                        tempJson2.push(point3);
                        marker1 = new AIMap.Marker(point3);
                        AIMap_map.addOverlay(marker1);
                    }else if(tempJson2.length==1){
                        if(e.overlay&&e.overlay.toString()=='[object Marker]'){
                            point4 = new AIMap.Point(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
                        }else{
                            point4 = new AIMap.Point(e.point.lng, e.point.lat);
                        }
                        tempJson2.push(point4);
                        marker2 = new AIMap.Marker(point4);
                        AIMap_map.addOverlay(marker2);

                        point3 = tempJson2[0];
                        point4 = tempJson2[1];
                        setTimeout(function(){
                            AIMap_DistLength = AIMap_map.getDistance(point3,point4);
                            alert("两点之间距离为："+(AIMap_DistLength/1000).toFixed(3)+"公里");
                            AIMap.init.clearMarker(marker1);
                            AIMap.init.clearMarker(marker2);
                            tempJson2=[];
                            AIMap_removeClass(tempJulijisuan, "active");
                            obj.style.backgroundPosition = "-64px 0";
                            AIMap_map.removeEventListener("click",AIMap_GetDistance);
                        },1);
                    }
                });
            }else{
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson2=[];
                obj.style.backgroundPosition = "-64px 0";
                AIMap_removeClass(tempJulijisuan, "active");
                AIMap_map.removeEventListener("click",AIMap_GetDistance);
            }
        }

        //周边搜索
        window.AIMap_GetNear = function(obj,e){
            AIMap_stopEvent(e);
            tempZhoubian = obj;
            
            //重置工具栏
            if(ztransit){
                ztransit.clearResults();
            }
            if(BMapLib_rectangle){
                setTimeout(function(){
                    AIMap_removeClass(BMapLib_rectangle, "active");
                    BMapLib_hander.click();
                },2);
            }
            if(BMapLib_hander){
                BMapLib_hander.click();
            }
            if(tempDaoHang){
                AIMap_removeClass(tempDaoHang,"active");
                tempDaoHang.style.backgroundPosition = "-195px 0";
                AIMap_map.removeEventListener("click",AIMap_GetNaviga);
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson1=[];
            }
            if(tempJulijisuan){
                AIMap_removeClass(tempJulijisuan,"active");
                tempJulijisuan.style.backgroundPosition = "-64px 0";
                AIMap_map.removeEventListener("click",AIMap_GetDistance);
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson2=[];
            }
            if(!AIMap_hasClass(obj, "active")){
                AIMap.init.clearAll();
                obj.style.backgroundPosition = "-260px 47px";
                AIMap_addClass(obj, "active");
                AIMap_map.addEventListener("click", AIMap_GetNearBy=function(e){
                    if(AIMap_Juhe._markers.length){
                        AIMap.init.clearJuhe();//清除点聚合
                    }
                    
                    var zpoint,marker;
                    if(e.overlay){
                        zpoint = new AIMap.Point(e.overlay.getPosition().lng, e.overlay.getPosition().lat);
                    }else{
                        zpoint = new AIMap.Point(e.point.lng, e.point.lat);
                    }
                    marker = new AIMap.Marker(zpoint);
                    AIMap_map.addOverlay(marker);
                    var value = prompt("请输入搜索标记点的名称关键字","营业厅");
                    var cicleOptions = {
                        strokeColor:"blue",    //边线颜色。
                        fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                        strokeWeight: 3,       //边线的宽度，以像素为单位。
                        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
                        fillOpacity: 0.5,      //填充的透明度，取值范围0 - 1。
                        strokeStyle: 'solid' //边线的样式，solid或dashed。
                    }
                    var circle = new AIMap.Circle(zpoint,3000.0,cicleOptions);
                    myMap.addOverlay(circle);
                    AIMap_map.setViewport(circle.getPath());//地图视野转到该区域
                    var data = {
                        "keyword":value,
                        "circle":circle,
                        "zUrl":toolbar.ZHOUBIANURL,
                        "nopoint":toolbar.NOPOINTMSG,
                        "onSearchComplete":function(json){
                            obj.click();
                            if(toolbar.HANGFEN){
                                var NorthEast = new AIMap.Point(circle.getPath()[30].lng,circle.getPath()[30].lat);
                                var count_label = new BMap.Label('', {position: NorthEast,offset:  new BMap.Size(1, -70)});
                                AIMap_map.addOverlay(count_label);

                                var temp_marker_wrap;

                                //勾选checkbox显示不同点
                                var _searchName = document.getElementsByName(toolbar.SEARCHNAME);
                                var temp_arr = [];//装载需要显示的点的类别
                                for(var l=0,llength=_searchName.length; l<llength; l++){
                                    if(_searchName[l].checked){
                                        temp_arr.push(_searchName[l].value);
                                    }
                                    AIMap_addEventHandler(_searchName[l],"click",function(ev){
                                        var ev=ev||window.event; 
                                        var target = ev.target||ev.srcElement; //低版本ie this会指向一个无用的window
                                        if(target.checked){
                                            temp_arr.push(target.value);
                                        }else{
                                            for(var key in temp_arr){
                                                if(target.value==temp_arr[key]){
                                                    temp_arr.splice(key,1);
                                                }
                                            }
                                        }

                                        //生成新json
                                        var new_json = [],
                                        new_json_wrap = {};
                                        for(var m=0, mlngth=json.point_list.length; m<mlngth; m++){
                                            for(var n=0, nlength=temp_arr.length; n<nlength; n++){
                                                if(json.point_list[m].point_type == temp_arr[n]){
                                                    new_json.push(json.point_list[m]);
                                                }
                                            }
                                        }
                                        new_json_wrap.point_list = new_json;

                                        AIMap_countcheck(count_label,new_json_wrap,NorthEast);

                                        //显示新json里面的点
                                        AIMap.init.clearMarker(temp_marker_wrap);
                                        if(new_json_wrap.point_list.length>200){
                                            if(confirm("当前搜索出标记点有"+new_json_wrap.point_list.length+"个，点击确定显示全部，取消显示前200个。")){
                                                AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                                    temp_marker_wrap = markers;
                                                    AIMap_Juhe.addMarkers(markers);//生成点聚合
                                                });
                                            }else{
                                                new_json_wrap.point_list.splice(200);
                                                AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                                    temp_marker_wrap = markers;
                                                    AIMap_Juhe.addMarkers(markers);//生成点聚合
                                                });
                                            }
                                        }else{
                                            AIMap.init.createMarker(new_json_wrap,false,true,function(point,markers){
                                                temp_marker_wrap = markers;
                                                AIMap_Juhe.addMarkers(markers);//生成点聚合
                                            });
                                        }
                                        var callback = toolbar.CALLBACK;
                                        if(typeof callback == 'function'){
                                            callback(new_json_wrap);
                                        }

                                    })
                                }

                                var new_json2 = [],
                                new_json_wrap2 = {};
                                for(var m2=0, mlngth2=json.point_list.length; m2<mlngth2; m2++){
                                    for(var n2=0, nlength2=temp_arr.length; n2<nlength2; n2++){
                                        if(json.point_list[m2].point_type == temp_arr[n2]){
                                            new_json2.push(json.point_list[m2]);
                                        }
                                    }
                                }
                                new_json_wrap2.point_list = new_json2;

                                AIMap_countcheck(count_label,new_json_wrap2,NorthEast);

                                if(new_json_wrap2.point_list.length>200){
                                    if(confirm("当前搜索出标记点有"+new_json_wrap2.point_list.length+"个，点击确定显示全部，取消显示前200个。")){
                                        AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                            temp_marker_wrap = markers;
                                            AIMap_Juhe.addMarkers(markers);//生成点聚合
                                        });
                                    }else{
                                        json.point_list.splice(200);
                                        AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                            temp_marker_wrap = markers;
                                            AIMap_Juhe.addMarkers(markers);//生成点聚合
                                        });
                                    }
                                }else{
                                    AIMap.init.createMarker(new_json_wrap2,false,true,function(point,markers){
                                        temp_marker_wrap = markers;
                                        AIMap_Juhe.addMarkers(markers);//生成点聚合
                                    });
                                }
                            }
                        }
                    }
                    AIMap.init.search(data);
                });
            }else{
                AIMap.init.clearMarker(marker1);
                AIMap.init.clearMarker(marker2);
                tempJson1=[];
                tempJson2=[];
                obj.style.backgroundPosition = "-261px 0";
                AIMap_removeClass(tempZhoubian, "active");
                AIMap_map.removeEventListener("click",AIMap_GetNearBy);
            }
        }
    }

    AIMap_map.addEventListener("tilesloaded",function(){AIMap_init(AIMap_map)});
}

/**
 *异步加载脚本
**/
function AIMap_asysScript(url,callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function() {
            callback();
        };
    }
    script.src = url+"?&_=" + (new Date()).getTime();
    document.body.appendChild(script);
}

/**
 *跨域传参过长分割数组
 *oldArr：要处理的数组
 *maxLength：每次可传输的最大长度限制
**/
function AIMap_splitArray(oldArr, maxLength){
    var oldArr = oldArr.slice(0);
    //每次可传输字符串的最大长度限制 
    var MAX_LENGTH = maxLength||255; 
    // 建议每次传输的数组长度
    var RECOMM_SINGLE_ARRAY_LENGTH = 100;
    // 当建议传输长度仍过长时的递减值
    var RECOMM_STEP_BACK = 5;

    // 拆分后的数组子集，每个子数组stringify后长度不超过指定的限制
    var subArrs = [];

    // if(JSON.stringify(oldArr).length < MAX_LENGTH){//ie6需引入json2.js
    if(oldArr.join("").length < MAX_LENGTH){
        // 小于最大限制时直接发送
        subArrs.push(oldArr);
    } else {
        // 对数组进行拆分
        var remainArr = oldArr;
        while(remainArr.length > 0){
            for(var tryLength = RECOMM_SINGLE_ARRAY_LENGTH; tryLength > 0; tryLength -= RECOMM_STEP_BACK){
                if(tryLength > remainArr.length){
                    tryLength = remainArr.length;
                }
                var subArr = remainArr.slice(0, tryLength);
                if(subArr.join("").length < MAX_LENGTH){
                    remainArr.splice(0,tryLength);
                    subArrs.push(subArr);
                    break;
                }
            }
        }
    }
    return subArrs;
}

/** 
*返回数组索引 
*/ 
function AIMap_getIndex(array, val){
    for(var i=0,leng=array.length; i<leng; i++){
        // if(AIMap_judgeSame(array[i],val)){
        //     return i;
        // }
        if(array[i] == val){
            return i;
        }
    }
    return -1;
}

/**
*判断是否为同一点
*相差500以内---需要测试！
**/
function AIMap_judgeSame(array,array2){
    if(Math.abs(array.lng*1000000-array2.lng*1000000) < 500 && Math.abs(array.lat*1000000-array2.lat*1000000) < 500)
        return true;
    else
        return false;
}

//BASE64编码
function encodeBase64(str){
    try{
        var wordArray = CryptoJS.enc.Utf8.parse(str);
        var base64Json= CryptoJS.enc.Base64.stringify(wordArray);
        return base64Json;
    }catch(e){
        //console.log('CryptoJS is not include.');
    }
    return str;
}

function AIMap_loadStyles(url) { 
    var link = document.createElement("link"); 
    link.rel = "stylesheet"; 
    link.type = "text/css"; 
    link.href = url; 
    var head = document.getElementsByTagName("head")[0]; 
    head.appendChild(link); 
}

function AIMap_getElementsByClassName(node,classname) {
    if (node.getElementsByClassName) { 
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass,node) {
            if ( node == null )
                node = document;
            var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}

function AIMap_addClass(obj, cls){
    var obj_class = obj.className,//获取 class 内容.
    blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}
 
function AIMap_removeClass(obj, cls){
    var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
}
 
function AIMap_hasClass(obj, cls){
    var obj_class = obj.className,//获取 class 内容.
    obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    x = 0;
    for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
        }
    }
    return false;
}

//阻止事件冒泡
function AIMap_stopEvent(e){
    if(e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}

/* 
 * addEventListener:监听Dom元素的事件 
 *   
 *  target：监听对象 
 *  type：监听函数类型，如click,mouseover 
 *  func：监听函数 
 */  
function AIMap_addEventHandler(target,type,func){  
    if(target.addEventListener){  
        //监听IE9，谷歌和火狐  
        target.addEventListener(type, func, false);  
    }else if(target.attachEvent){  
        target.attachEvent("on" + type, func);  
    }else{  
        target["on" + type] = func;  
    }   
}  
/* 
 * removeEventHandler:移除Dom元素的事件 
 *   
 *  target：监听对象 
 *  type：监听函数类型，如click,mouseover 
 *  func：监听函数 
 */  
function AIMap_removeEventHandler(target, type, func) {  
    if (target.removeEventListener){  
        //监听IE9，谷歌和火狐  
        target.removeEventListener(type, func, false);  
    } else if (target.detachEvent){  
        target.detachEvent("on" + type, func);  
    }else {  
        delete target["on" + type];  
    }  
}

function AIMap_countcheck(count_label,json,NorthEast){
    var temp_arr_list = [{"type": "101", "name": "自有渠道", "bg_position": "0 -21px", "img_size_h": "25px", "count": 0 }, {"type": "102", "name": "签约渠道", "bg_position": "-23px -21px", "img_size_h": "25px", "count": 0 }, {"type": "103", "name": "直供渠道", "bg_position": "-46px -21px", "img_size_h": "25px", "count": 0 }, {"type": "104", "name": "联通渠道", "bg_position": "-69px -21px", "img_size_h": "25px", "count": 0 }, {"type": "105", "name": "电信渠道", "bg_position": "-92px -21px", "img_size_h": "25px", "count": 0 }, {"type": "106", "name": "其他竞争对手", "bg_position": "-115px -21px", "img_size_h": "25px", "count": 0 }, {"type": "201", "name": "A+类集团", "bg_position": "0 -46px", "img_size_h": "20px", "count": 0 }, {"type": "202", "name": "A类集团", "bg_position": "-23px -46px", "img_size_h": "20px", "count": 0 }, {"type": "203", "name": "B类集团", "bg_position": "-46px -46px", "img_size_h": "20px", "count": 0 }, {"type": "204", "name": "C类集团", "bg_position": "-69px -46px", "img_size_h": "20px", "count": 0 }, {"type": "205", "name": "D类集团", "bg_position": "-92px -46px", "img_size_h": "20px", "count": 0 }, {"type": "206", "name": "P类集团", "bg_position": "-115px -46px", "img_size_h": "20px", "count": 0 } ];
    var num_type = 0;
    //分隔不同类，统计标记点数量
    for(var i=0,leng=json.point_list.length; i<leng; i++){
        switch (parseInt(json.point_list[i].point_type, 10)) {
            case 101: 
                num_type = 0;
                break;
            case 102: 
                num_type = 1;
                break;
            case 103: 
                num_type = 2;
                break;
            case 104:
                num_type = 3;
                break;
            case 105:
                num_type = 4;
                break;
            case 106:
                num_type = 5;
                break;
            case 201:
                num_type = 6;
                break;
            case 202: 
                num_type = 7;
                break;
            case 203: 
                num_type = 8;
                break;
            case 204:
                num_type = 9;
                break;
            case 205:
                num_type = 10;
                break;
            case 206:
                num_type = 11;
                break;
        }
        temp_arr_list[num_type].count++;
    }

    var temp_h = '';
    for(var j=0,jlength=temp_arr_list.length; j<jlength; j++){
        if(temp_arr_list[j].count){
            temp_h += '<p><span style="background:url(http://webmap1.map.bdimg.com/newmap/static/common/images/us_cursor_4c00be8.gif); height: '+temp_arr_list[j].img_size_h+'; width: 20px; display: inline-block; background-position: '+temp_arr_list[j].bg_position+'"></span><span>'+temp_arr_list[j].name+'</span>：<span>'+temp_arr_list[j].count+'个</span></p>';
        }
    }

    count_label.setContent(temp_h);
}