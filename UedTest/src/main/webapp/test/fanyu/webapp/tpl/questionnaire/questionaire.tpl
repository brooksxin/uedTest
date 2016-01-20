<div>
	<div class="breadcrumb"></div>
	<div class="listTopBtn">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td><h1>问卷管理</h1></td>
				<td><div class="normalBtnArea ft-right">
						<a id="Qcreat" class="normalBtn BGblue" href="javascript:;">创建问卷</a>
					</div></td>
			</tr>
		</table>
	</div>

	<div method="post" action="#" class="cmxform">
		<form method="get" action="" class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch">
			<div class="record-search-cate">
				<table class="search_table" cellpadding="0" cellspacing="0" border="0" style="width: 100%">
					<tr>
						<td width="80"><label class="description">问卷名称</label></td>
						<td><input class="inputWidthDataPoint inputText" type="text" id="QNR_NM" name="QNR_NM" /></td>

						<td width="80"><label class="description">问卷类型</label></td>
						<td><select class="inputWidthDataPoint inputSelect" id="QNR_TYPE_CD" name="QNR_TYPE_CD">
								<option value="">请选择</option>
								<option value="04">4G流量营销</option>
								<option value="05">4G套餐营销</option>
								<option value="06">4G终端营销</option>
								<option value="01">通知告知类</option>
								<option value="02">用户调研类</option>
								<option value="03">客户关怀类</option>
						</select></td>

						<td width="80"><label class="description">问卷状态</label></td>
						<td><select class="inputWidthDataPoint inputSelect" id="QNR_STS_CD" name="QNR_STS_CD">
								<option value="">请选择</option>
								<option value="10D">新建</option>
								<option value="10A">发布</option>
								<option value="10X">作废</option>
						</select></td>

						<td width="80">
							<div class="normalBtnArea w82">
								<a class="searchBtn" href="javascript:;" id="J_search"><i></i>查询</a>
							</div>
						</td>
					</tr>
					<tbody id="J_searchMore" class="searchMore">
						<tr>
						<td width="80"><label class="description">发布工号</label></td>
						<td><select class="inputWidthDataPoint inputSelect" id="CRT_USER_ID" name="CRT_USER_ID">

						</select></td>

						<td width="80"><label class="description">一级渠道</label></td>
						<td><select class="inputWidthDataPoint inputSelect" id="firest_RNG_ID" name="SUIT_RNG_ID">

						</select></td>

						<td width="80"><label class="description">二级渠道</label></td>
						<td><select class="inputWidthDataPoint inputSelect" id="SUIT_RNG_ID" name="SUIT_RNG_ID">

						</select></td>
						</tr>
						<tr>
							<td><label class="description">开始时间</label></td>
							<td><input id="CRT_START_DATE" name="CRT_START_DATE" class="inputWidthDataPoint element text Wdate" type="text"
								onclick="WdatePicker({minDate:'#F{\'2010-01-01 00:00:00\'}',maxDate:'#F{$dp.$D(\'CRT_END_DATE\')}'})" /></td>
							<td><label class="description">结束时间</label></td>
							<td><input id="CRT_END_DATE" name="CRT_END_DATE" class="inputWidthDataPoint element text Wdate" type="text"
								onclick="WdatePicker({minDate:'#F{$dp.$D(\'CRT_START_DATE\')}'})" /></td>
							<td><label class="description">项目归属</label></td>
							<td>
								<select id="QNR_BELG_DEPT_ID" class="inputWidthDataPoint FormInputText selectStyle" name="QNR_BELG_DEPT_ID"></select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="seeMoreFilter">
				<a href="#" class="down"></a>
			</div>
		</form>
	</div>

	<div class="tablewidth mg_t_10">
		<table class="ui-record-table table_radius table-bordered table-striped">
			<thead>
				<tr>
					<th width="100">问卷编号</th>
					<th>问卷名称</th>
					<th width="80">适用渠道</th>
					<th width="50">问卷类型</th>
					<th width="50">项目归属</th>
					<th width="120">发布时间</th>
					<th width="80">发布工号</th>
					<th width="50">问卷状态</th>
					<th width="180">操作</th>
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
				<td>
					<DIV class="fn-clear action-other  action-other-show ">
						<DIV id=Pagination class="page pagination fn-right"></DIV>
						<DIV class="fn-right fn-pt5 fn-pr10"></DIV>
					</DIV>
				</td>
			</tr>
		</table>
	</DIV>
</div>