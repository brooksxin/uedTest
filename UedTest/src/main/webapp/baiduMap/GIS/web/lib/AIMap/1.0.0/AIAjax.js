/**
 * Created by Fei on 6/16/2014.
 */
function AIMap_loadScript() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=1.2&callback=AIMap_encapsulateBMap&ak=lOjVsxTb5PQd7Czl3Ybm0u5r";
    document.body.appendChild(script);
}
function AIMap_encapsulateBMap() {
    AIMap = BMap;
    AIMap_modules();
    AIMap_init();
}


function AIMap_modules() {
    // TODO 封装检索服务 @wangtl
    AIMap.service = {
        search: function(param){
            alert(param)
        },
        searchInBounds: function(param){
        },
        searchInCircle: function(param){
        },
        searchInPolygon: function(param){
        }
    };

    // TODO 绘制覆盖物  @liuliang
    AIMap.draw = {
        // 封装绘制Markers、Bounds、Polygon等覆盖物的方法
    }

    // TODO ajax封装 及一些通用性的js组件 @zhouwei
    AIMap.ajax = {
    }

}
