<!-- 顶部菜单的handlebars模板 -->
<script id="T_topMenu" type="text/x-handlebars-template">
<ul class="sysMenu">
	{{#each beans}}
	    <li><a href="javascript:;" url="{{url}}" menuId="{{menuId}}">{{menuName}}</a></li>
	{{/each}}
</ul>
</script>

<!-- 左侧菜单的handlebars模板 -->
<script id="T_leftMenu" type="text/x-handlebars-template">
    <div class="leftMenu">
        {{#each object}}
        <h2 menuId="{{menuId}}">{{menuName}}</h2>
        <ul>
            {{#each tMenu}}
            <li><a href="javascript:;" url="{{url}}" menuId="{{menuId}}">{{menuName}}</a></li>
            {{/each}}
        </ul>
        {{/each}}
    </div>
</script>

<!-- 菜单面包屑 -->
<script id="T_menuCrumbs" type="text/x-handlebars-template">
{{#if beans.length}}
您的当前位置：
{{#each beans}}<a href="{{url}}" menuId="{{menuId}}" title="{{title}}">{{title}}</a>&nbsp;>&nbsp{{/each}}
{{/if}}
</script>
<script src="../../lib/jquery/1.8.1/jquery.js"></script>
<script src="../../lib/jqueryui/jquery-ui.min.js"></script>
<script src="../../lib/validate/1.13.1/jquery.validate.min.js"></script>
<script src="../../lib/qtip/jquery.qtip.js"></script>
<script src="../../lib/json2/1.0.0/json2.js"></script>
<script src="../../lib/handlebars/1.3.0/handlebars.js"></script>
<script src="../../lib/handlebars/1.3.0/helpers.js"></script>
<script src="../../lib/pagination/1.2.1/jquery.pagination.js"></script>
<script src="../../lib/datepicker/4.8.b2/WdatePicker.js"></script>
<script src="../../lib/blockUI/2.64/jquery.blockUI.js"></script>
<script src="../../common/frameInit.js"></script>
<script src="../../lib/dialog/6.0.4/dialog-plus.js"></script>
<script src="../../lib/prefixfree/1.0.7.js"></script>
<script src="../../common/requirejsConfigObj.js"></script>
<script src="../../lib/requirejs/2.1.17.js"></script>
<script src="../../common/config.js"></script>
<script src="../../common/common.js"></script>

<!-- <script src="../../dest/lib.min.js"></script>
<script src="../../common/requirejsConfigObj.js"></script>
<script src="../../lib/requirejs/2.1.17.js"></script>
<script src="../../lib/datepicker/4.8.b2/WdatePicker.js"></script>
<script src="../../dest/common.min.js"></script> -->