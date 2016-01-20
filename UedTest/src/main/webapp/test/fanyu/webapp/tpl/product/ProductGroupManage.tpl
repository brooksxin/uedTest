<div>
	<div class="breadcrumb"></div>
	<div class="listTopBtn">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td><h1>商品组列表</h1></td>
				<td>
					<div class="normalBtnArea ft-right">
						<a id="J_addProdGroup" class="normalBtn BGblue" href="javascript:;">添加商品组</a>
					</div>
				</td>
			</tr>
		</table>
	</div>
	<div class="cmxform mb-30" >
		<form class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch">
			<div class="record-search-cate">
				<table class="search_table" cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="100"><label class="description">商品组名称</label></td>
							<td width="150"><input class="inputText" type="text"  id="catgUnitNm" name="name" maxlength="255" value=""/>
							<td>
								<div class="normalBtnArea w82">
								<a class="searchBtn" href="javascript:;" id="J_search" ><i></i>查询</a> </div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</form>
	</div>

	<div class="tablewidth mg_t_10">
		<table class="ui-record-table table_radius table-bordered table-striped" >
			<thead>
				<tr>
					<th>商品组名称</th>
					<th>添加时间</th>
					<th width="45">操作</th>
				</tr>
			</thead>
			<tbody id="J_tabletpl">
			</tbody>
		</table>
	</div>

	<!--翻页及功能按钮区域开始-->
	<DIV class="amount-bottom">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
			<tr>
	<!-- 			<td width="60"><input type="checkbox" class="selectAll" id="selectAll" /> -->
	<!-- 				<label for="selectAll">全选</label></td> -->
	<!-- 			<td><DIV class="normalBtnArea"> <A class="normalBtn BGgray" href="#">删除</A> </DIV></td> -->
				<td width="50%"><DIV class="fn-clear action-other  action-other-show ">
					<DIV id=Pagination class="page pagination fn-right"> </DIV>
					<DIV class="fn-right fn-pt5 fn-pr10"></DIV>
					</DIV>
				</td>
			</tr>
		</table>
	</DIV>

	<!-- <div id="T_addBrand" class="fn-hide"> -->
	<div id="T_importProd" class="fn-hide tablewidth">
		<form id="J_add_form" name="J_add_form">
			<div class="titleArea fn-center">商品组管理</div>
			<hr />
			<div class="mt-50  bodydiv"> 商品组名称：<input id="name" name="name" class="bodydivinput" type="text" maxlength="255" value="" />
			</div>
			<div class="bodydivthree bodydiv">
				<input id="id" type="hidden" value="" />
				<input id="filename" name="filename" type="hidden">
				<input id="fileurl" name="fileurl" type="hidden">
			</div>
			<div class="ui-topQuDashed fn-clear">
				<div class="ui-titleTextjv" style="width:67px;float:left;">商品组图片</div>
				<div class="ui-zt_pictureText fn-clear fn-left" style="position: relative;margin:10px;margin-left:5px;">
					<img id="J_upload_img" class="fn-left" src="../../css/images/shangchuantupian.gif" width="150" height="270" />
						<span id="J_img_wrap" class="fn-left">
							<a href="javascript:;" id="uptrigger" class="ui-bjpicture"></a>
						</span>
				</div>
			</div>
			<div class="ui-textcolorml ">支持JPEG、PNG，图片尺寸：宽600px高1080px</div>
		</form>
	</div>

	<script id="T_tabletpl" type="text/x-handlebars-template">
	{{#if beans}}
	    {{#each beans}}
	        <tr>
				<!--
	            <td><div class="table_select"><input type="checkbox" value={{id}}/></div></td>
				-->
	            <td>{{name}}</td>
	            <td>{{createTime}}</td>
				<td>
	                <div class="gridRowBtn">
	                    <a class="item-text J_editProdGroup" href="javascript:;" data-id='{{id}}'>编辑</a>
	                </div>
	            </td>
	        </tr>
	    {{/each}}
	{{else}}
		<tr>
			<td colspan="4">
				<div class="ui-tips-box tipsBox">
					<div class="ui-icon-noData"></div>
					<div class="ui-tips-text">暂无数据记录！</div>
				</div>
			</td>
		</tr>
	{{/if}}
	</script>
</div>