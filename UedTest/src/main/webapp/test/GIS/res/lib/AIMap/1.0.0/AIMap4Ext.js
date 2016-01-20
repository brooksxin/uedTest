/**
 * Created by ZW on 07/16/2014.
 */
function AIMap_loadScript(type) {
    var script = document.createElement("script");
    if(type&&type=='1'){
        script.src = "http://webapi.amap.com/maps?v=1.3&key=271faa75310a696c6e2fa22935d8490a&callback=AIMap_encapsulateBMap";
        AIMap_conf = 1;
    }else{
        script.src = "http://api.map.baidu.com/api?v=2.0&callback=AIMap_encapsulateBMap&ak=sGZOkeDdDDh55kIiuYC2qUg1";
        AIMap_conf = 0;//0表示默认百度方法，1表示高德
    }
    document.body.appendChild(script);
}

function AIMap_loadTools(){
    if(AIMap_conf&&AIMap_conf==1){
        AIMap = AMap;
    }else{
        AIMap = BMap;
    }
    AIMap_modules();
    AIMap_init();
}


function AIMap_modules() {
    // TODO 封装检索服务 @wangtl
    AIMap.service = [
        {
            /**
			 *标点前台
			 *鼠标点击地图生成marker并返回坐标
			 *map：地图对象
			 *flag：是否只在地图上显示一个marker点
			 *callback：返回点坐标
            **/
            getPoint: function(map,flag,callback){
                var marker = "";
                map.addEventListener("click", function(e){
                    if(flag){
                        map.clearOverlays();
                    }
                    marker = new AIMap.Marker(new AIMap.Point(e.point.lng, e.point.lat));
                    map.addOverlay(marker);
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
            /**
             *type:1 点与多边形
             *type:2 点与矩形
             *type:3 点与圆
             *type:4 点与折线
             *true表示在区域内！false表示在区域外
             *目前需求只有type 1一种
            **/
            ptInPolygon:function(type,point,polygon){
                switch (type){
                    case 1:
                        return(BMapLib.GeoUtils.isPointInPolygon(point, polygon));
                        break;
                    case 2:
                        return(BMapLib.GeoUtils.isPointInRect(point, polygon));
                        break;
                    case 3:
                        return(BMapLib.GeoUtils.isPointInCircle(point, polygon));
                        break;
                    case 4:
                        return(BMapLib.GeoUtils.isPointOnPolyline(point, polygon));
                        break;
                	default:
                		return false;
                		break;
                }
            },
            /**
             *返回两点之间的距离
             *map：地图对象
             *start_point：起点坐标  end_point：终点坐标
            **/
            getDistance:function(map,start_point,end_point){
                return map.getDistance(start_point,end_point);
            },
            /**
             *驾车导航
            **/
            drivingNavigate:function(driving,start,end){
                driving.search(start, end);
            },
            /**
             *步行导航
            **/
            walkingNavigate:function(walking,start,end){
                walking.search(start,end);
            },
            /**
             *三种驾车策略：最少时间，最短距离，避开高速
            **/
            multiNavigate:function(map,start,end,routeNum){
                var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
                var transit = new BMap.DrivingRoute(map, {
                    renderOptions: {map: map,panel:""}, 
                    policy: routePolicy[routeNum]
                });
                transit.search(start,end);
            },
            /**
             *公交路线查询
            **/
            transitNavigate:function(map,start,end){
                var transit = new BMap.TransitRoute(map, {
                  renderOptions: {map: map}
                });
                transit.search(start, end);
            },
            /**
             *多种策略的公交导航
             *从左到右依次是不乘地铁  ，最少时间，最少换乘，最少步行
            **/
            multiTransitNavigate:function(map,start,end,routeNum){
                var routePolicy = [BMAP_TRANSIT_POLICY_AVOID_SUBWAYS,BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING];
                var transit = new BMap.TransitRoute(map, {
                  renderOptions: {map: map},
                  policy:routePolicy[routeNum]
                });
                transit.search(start, end);
            },
            /**
             * 区域关键字搜索
             */
            search: function(param){
                //获取搜索的关键字
                var keyword = param.keyword;

                //将要传递的参数封装成data对象
                var data;
                
                var map = param.map;
                
                var overlayjson = '';
                overlayjson = '{';

                if(param.circle){
                    //获取圆对象
                    var circle = param.circle;
                   
                    //获取圆形的圆心
                    var circle_center = circle.getCenter();
                    
                    //获取圆形的半径
                    var radius = circle.getRadius();

                    overlayjson +=  '"flag" : ' + '"circle"';
                    overlayjson += ', "keyword" : "' + keyword;
                    overlayjson += '", "lng" : ' + circle_center.lng + ', "lat" : ' + circle_center.lat;
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

                    overlayjson +=  '"flag" : ' + '"bounds"';
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

                    overlayjson +=  '"flag" : ' + '"polygon"';
                    overlayjson += ', "keyword" : "' + keyword;
                    overlayjson += '", "points" : [' ;
                    for (var i = 0; i < point_array.length; i++) {
                        overlayjson += '{ "lng" : ' + point_array[i].lng + ', "lat" : ' + point_array[i].lat + '}';
                        if(i != point_array.length - 1){
                            overlayjson += ',' ;
                        }
                    };
                    overlayjson += ']}' ;

                }
                else{
                    overlayjson +=  '"flag" : ' + '"none"';
                    overlayjson += ', "keyword" : "' + keyword;
                    overlayjson += '"}' ;
                }
                var json=encodeBase64(encodeURIComponent(overlayjson));
                //AIMap.ajax.AjaxJson("res/data/dhtml.json?1=1","data="+json,function(state,json){
                AIMap.ajax.AjaxJson("hz/sdkaction/common.action?uid=getMarkPointBySearch","data="+json+"&appId=7",function(state,json){

                    if(state=='success'){
                        if(json&&json.returnCode=='1'){
                          if(param.onSearchComplete){
                                param.onSearchComplete(json);
                            }
                            AIMap.draw.createMarker(map, json, "","");
                        }
                    }else{
                        alert("错误");
                    }
                })
            },
            /**
             *周边搜索
             */
            searchNearby:function(map,callback){
                var geolocation = new AIMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new AIMap.Marker(r.point);
                        map.centerAndZoom(r.point,16);
                        map.addOverlay(mk);
                        var circle = new AIMap.Circle(r.point,1000);
                        var data = {
                            "keyword":"",
                            "circle":circle,
                            "map":map
                        }
                        AIMap.service.search(data);
                    }
                });
            },
            clearAll:function(map) {
                map.clearOverlays();
            }
        },{
            //高德
        }
    ];

    // TODO 绘制覆盖物  @liuliang
    AIMap.draw = [
        {
            /**
			 *创建标记点
			 *map：地图对象
			 *json：点数组
			 *renderOptions：点信息展示格式
			 *callback：返回标记点覆盖物数组
            **/
        	createMarker: function(map, json, renderOptions, callback){
        	    var json = json ||{"point":{}};
        	    var markers = [];
        	    var points = [];
        	    var renderOptions = renderOptions||{
					"flag": false,
					"params":{
                        strokeColor:"blue",    //边线颜色。
                        fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                        strokeWeight: 3,       //边线的宽度，以像素为单位。
                        strokeOpacity: .8,    //边线透明度，取值范围0 - 1。
                        fillOpacity: .3,      //填充的透明度，取值范围0 - 1。
                        strokeStyle: 'solid' //边线的样式，solid或dashed。
                    }
				};

        	    for (i in json.points) {
                    var point = json.points[i];

                    var zhtml = '<div style="margin:0 0 -4px 0;;line-height:20px;padding:2px;">' +
                                '<img src="res/theme/default/images/infoWindow/iconfont-yidong.png" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>';
                    for(var j=0,length=point.staticData.length; j<length; j++){
                        zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;'>"+point.staticData[j].name+ ":" + point.staticData[j].value + "</p>";
                    }
                    zhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;'>地址:" + point.address + "</p>";

                    var marker = AIMap.draw.addMarker(map, point.lng, point.lat, point.title ? point.title :'', zhtml, point.icon, point.pointId?point.pointId:null,point.businessId);
                    points[i] = marker.getPosition();
                    map.addOverlay(marker);
                    markers[i] = marker;
                };
        	    if (renderOptions && renderOptions.isDrawLine == true) {
        	        AIMap.draw.drawLine(points, renderOptions.params, function(line){
        	            map.addOverlay(line);
        	        });
        	    };
        	    if(typeof callback == "function"){
        	        callback(markers);    
        	    }
        	},
        	addMarker: function(map, lng, lat, title, shtml, icon, pointId, businessId){
        	    var myIcon,url,_marker;
        	    var icon = parseInt(icon, 10);
        	    if (icon) {
        	        switch (icon){
        	            case 1: 
        	                url = "res/lib/AIMap/1.0.0/icon/yingyeting.png";
        	                break;
        	            case 2: 
        	                url = "res/lib/AIMap/1.0.0/icon/shehuiqudao.png";
        	                break;
        	            case 3: 
        	                url = "res/lib/AIMap/1.0.0/icon/jituankehu.png";
        	                break;
        	            default:
        	                url = "http://api0.map.bdimg.com/images/marker_red_sprite.png";
        	                break;
        	        }
        	        myIcon = new BMap.Icon(url, new BMap.Size(20, 25), {  
        	            anchor: new BMap.Size(10, 25), // 指定定位位置  
        	            infoWindowAnchor: new BMap.Size(10, 0)
        	        });  
        	        myShadow = new BMap.Icon(url, new BMap.Size(20, 25), {  
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
        	            map.closeInfoWindow();
        	            
        	            // 新建窗口
                        shtml += '</div>';
                        var searchInfoWindow = new BMapLib.SearchInfoWindow(map, shtml, {
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
        	            AIMap.ajax.AjaxJson("hz/sdkaction/common.action?uid=getDynamicValueByMarkId",'&pointId='+pointId+'&bussId='+businessId,function(state,json){
        	                if(state=='success'){
        	                    if(json&&json.returnCode=='1'){
        	                        for (var i=0,length=json.rows.length; i<length; i++) {
                                        dhtml += "<p style='display:block;word-break: break-all;word-wrap: break-word;width:175px;margin: 2px 0;line-height: 20px;'>"+json.rows[i].propLabel+ ":" + json.rows[i].propValue + "</p>";
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
                        var searchInfoWindow = new BMapLib.SearchInfoWindow(map, shtml, {
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
            /**
             *根据两点画线
             *points代表点数组
             *params表示渲染参数
             *callback返回线对象
            **/
            drawLine:function(points,params,callback){
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
            drawShape:function(map,json,flag,callback){
                var shape;
                if(!json.params){
                    json.params = {
                        strokeColor:"blue",    //边线颜色。
                        fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                        strokeWeight: 3,       //边线的宽度，以像素为单位。
                        strokeOpacity: .8,    //边线透明度，取值范围0 - 1。
                        fillOpacity: .3,      //填充的透明度，取值范围0 - 1。
                        strokeStyle: 'solid' //边线的样式，solid或dashed。
                    }
                }
                if(json.drawingModes == "polygon"){
                    var points = [];
                    for (var i=0,length=json.points.length; i<length; i++) {
                        points[i] = new AIMap.Point(json.points[i].lng, json.points[i].lat);
                    };
                    shape = new AIMap.Polygon(points, json.params);
                }
                if(flag){
                    shape.disableMassClear();//禁止覆盖物在map.clearOverlays方法中被清除。
                }
                map.addOverlay(shape);
                if (typeof callback == 'function') {
                    callback(shape);
                }
                return shape;
            },
            /**
			 *区域绘制工具初始化
			 *map：地图对象
			 *params：图形渲染方式
            **/
            createDrawingManager: function(map,params){
                if(!params){
                	params = {
                	    strokeColor:"blue",    //边线颜色。
                	    fillColor:"white",      //填充颜色。当参数为空时，圆形将没有填充效果。
                	    strokeWeight: 3,       //边线的宽度，以像素为单位。
                	    strokeOpacity: 0.3,    //边线透明度，取值范围0 - 1。
                	    fillOpacity: 0.1,      //填充的透明度，取值范围0 - 1。
                	    strokeStyle: 'solid' //边线的样式，solid或dashed。
                	}
                }
                var drawingManager = new BMapLib.DrawingManager(map, {
                    isOpen: false,
                    enableDrawingTool: true,
                    drawingToolOptions: {
                        anchor: BMAP_ANCHOR_TOP_RIGHT,
                        offset: new AIMap.Size(5, 5),
                        scale: 0.8,
                        drawingModes : [
                            BMAP_DRAWING_MARKER
                        ]
                    },
                    polygonOptions: params
                });
                return drawingManager;
            },
            /**
			 *区域开始绘制
			 *map：地图对象
			 *drawingManager：绘制工具对象
			 *overlays：当前页面覆盖物
			 *flag：是否开启绘制工具
			 *type：是否需要校验超出父区域
			 *parentArea：父区域
            **/
            drawAreaMarker:function(map,drawingManager,overlays,flag,type,parentArea,callback){
                var json={},tempIndex = -1;
                map.clearOverlays();
                drawingManager.close();
                if(flag){
                    drawingManager.open();
                }
                json.drawingModes = "polygon";
                json.points = overlays;
                AIMap.draw.drawShape(map,json,false,function(shape){
                    for(var i=0,length=json.points.length; i<length; i++){
                        var point = new AIMap.Point(json.points[i].lng, json.points[i].lat);
                        marker = new AIMap.Marker(point);
                        marker.setTitle(i);
                        map.addOverlay(marker);
                        marker.enableDragging();

                        //右键删除
                        marker.addEventListener("rightclick", function(e){   
                            var ztempIndex = parseInt(e.target.getTitle(),10);
                            overlays.splice(ztempIndex,1);
                            AIMap.draw.drawAreaMarker(map,drawingManager,overlays,false,type,parentArea,function(data){
                                callback(data);
                            });

                        });

                        //拖拽开始，获取位置
                        marker.addEventListener("dragstart", function(e){   
                            tempIndex = parseInt(e.target.getTitle(),10);
                        });

                        //拖拽结束，重新绘制区域
                        marker.addEventListener("dragend", function(e){
                            var zflag = true;
                            if(type){
                                zflag = AIMap.service.ptInPolygon(type,new AIMap.Point(e.point.lng, e.point.lat), parentArea);
                            }
                            if(tempIndex!=-1&&zflag){
                                //更换json.points中被拖动了的点
                                overlays[tempIndex].lng = e.target.getPosition().lng;
                                overlays[tempIndex].lat = e.target.getPosition().lat;
                            }else{
                                alert("标点超出父区域范围！");
                            }

                            AIMap.draw.drawAreaMarker(map,drawingManager,overlays,false,type,parentArea,function(data){
                                callback(data);
                            });
                        });
                    }
                    //覆盖物添加双击事件
                    shape.addEventListener("dblclick",function(e){
                        var value = prompt('请输入始末标记点的索引（相邻标记点），以逗号分隔', '0,1');
                        if(value){
                            var _start = parseInt(value.split(",")[0], 10);
                            var _end = parseInt(value.split(",")[1], 10);
                            if(_end-_start == 1){
                                var _point = {};
                                _point.lng =  (overlays[_start].lng+overlays[_end].lng)/2;
                                _point.lat =  (overlays[_start].lat+overlays[_end].lat)/2;
                                overlays.splice(_end,0,_point);

                                AIMap.draw.drawAreaMarker(map,drawingManager,overlays,false,type,parentArea,function(data){
                                    callback(data);
                                });
                            }else if(_start==0 && _end==overlays.length-1){
                                var _point = {};
                                _point.lng =  (overlays[_start].lng+overlays[_end].lng)/2;
                                _point.lat =  (overlays[_start].lat+overlays[_end].lat)/2;
                                overlays.push(_point);

                                AIMap.draw.drawAreaMarker(map,drawingManager,overlays,false,type,parentArea,function(data){
                                    callback(data);
                                });
                            }
                        }
                    });
                });
                callback(json);
            },
            /**
             *obj：包裹树的div对象
             *json：ztree的数据源
            **/
            drawZtree:function(obj, json, callback){
                var setting = {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: 0
                        }
                    },
                    callback:{
                        onClick:function(event, treeId, treeNode){
                            // if(treeNode.isParent){
                            //     return;
                            // }
                            callback(event, treeId, treeNode);
                        }
                    }
                };
                var initData = [];
                var arr= json.rows;
                if(arr != null){
                    for(var i=0;i<arr.length;i++){
                        var o={};
                        o.id=arr[i].id;
                        o.pId=arr[i].pId;
                        o.name=arr[i].name;
                        o.isParent=arr[i].isParent;
                        initData.push(o);
                    }
                }
                $.fn.zTree.init(obj, setting, initData);
            },
            /**
             *自定义信息窗口
             *map：地图对象
             *point：标记点坐标
             *html：信息展示内容
             *回调方法返回该标记点和信息窗口
            **/
            createInfoWindow: function(map, point, html, callback){
                var infoWindow = new AIMap.InfoWindow(html);  // 创建信息窗口对象
                var icon = parseInt(point.icon, 10);
                switch (icon){
                    case 1: 
                        url = "res/lib/AIMap/1.0.0/icon/yingyeting.png";
                        break;
                    case 2: 
                        url = "res/lib/AIMap/1.0.0/icon/shehuiqudao.png";
                        break;
                    case 3: 
                        url = "res/lib/AIMap/1.0.0/icon/jituankehu.png";
                        break;
                    default:
                        url = "http://api0.map.bdimg.com/images/marker_red_sprite.png";
                        break;
                }
                var myIcon = new BMap.Icon(url, new BMap.Size(20, 25), {
                    anchor: new BMap.Size(10, 25), // 指定定位位置  
                    infoWindowAnchor: new BMap.Size(10, 0)
                });  
                var myShadow = new BMap.Icon(url, new BMap.Size(20, 25), {
                    anchor: new BMap.Size(10, 25), // 指定定位位置
                    imageOffset: new BMap.Size(-20, 0) // 设置图片偏移
                });
                var marker = new AIMap.Marker(new AIMap.Point(point.lng, point.lat),{"icon":myIcon, "shadow":myShadow});
                map.addOverlay(marker);
                marker.addEventListener("click", function(e){
                    if(typeof callback == "function"){
                        callback(marker, infoWindow);
                    }else{
                        this.openInfoWindow(infoWindow);
                    }
                });
            }
        },{
            //高德
        }
    ];

    // TODO ajax封装 及一些通用性的js组件 @zhouwei
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
            var url = url+"?"+datas+"&_=" + (new Date()).getTime();
            // 创建script标签，设置其属性
            var script = document.createElement('script');
            script.setAttribute('src', url);
            // 把script标签加入head，此时调用开始
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }

    AIMap.service = AIMap.service[AIMap_conf];
    AIMap.draw = AIMap.draw[AIMap_conf];
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
        if(AIMap_judgeSame(array[i],val)){
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