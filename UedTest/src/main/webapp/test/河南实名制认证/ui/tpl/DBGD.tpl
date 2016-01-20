<div class="search_wrap dbgd">
	<form id="J_formSearch" name="J_formSearch" class="formSearch">
		<table class="search_table" cellpadding="0" cellspacing="0" border="0" width="100%">
			<tbody>
				<tr>
					<td width="43%">
						<span class="cur-dbgd">当日待办工单</span>
						<span class="cur-dbgd num">0</span>
						<span>历史待办工单</span>
						<span class="num">0</span>
					</td>
					<td width="45%">
						<label>筛选工单：</label>
						<input type="text" value="" name="J_date_s" id="J_date_s" class="ui-input Wdate" 
						onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'J_date_e\')||\'%y-%M-%d\'}', minDate:'1949-10-01'})" />
						<label>至</label>
						<input type="text" value="" name="J_date_e" id="J_date_e" class="ui-input Wdate" 
						onfocus="WdatePicker({maxDate:'%y-%M-%d', minDate:'#F{$dp.$D(\'J_date_s\')||\'1949-10-01\'}'})" />
					</td>
					<td class="fn-center">
						<a class="ui-button ui-button-green" href="javascript:;" hidefocus="true" id="J_search">
							<i class="iconfont" title="查询/搜索"></i>
							<span>查 询</span>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</form>

	<!--分页table-->
	<div class="data-table" id="dataTable">
		<table class="ui-table" cellpadding="0" cellspacing="0" border="0" width="100%">
			<colgroup>
				<col width="8%" />
				<col width="11%" />
				<col width="18%" />
				<col width="11%" />
				<col width="10%" />
				<col width="16%" />
				<col width="9%" />
				<col width="" />
			</colgroup>
			<thead>
				<tr>
					<th>序号</th>
					<th>流水号</th>
					<th>业务类型</th>
					<th>审核时间</th>
					<th>省份</th>
					<th>渠道代码</th>
					<th>审核状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="dataTbody"></tbody>
		</table>

		<div class="dataTbl-bottom fn-hide fn-clear">
	        <div class="page pagination fn-left" id="Pagination">
	        	<!-- pagination -->
	        </div>
	        <div class="paginationTools fn-right">
	        	<span class="des">跳转到第</span>
	        	<input id="gotoPage" value="" type="text" class="ui-input" />
	        	<span class="des">页</span>
	        	<a class="ui-button ui-button-normal" href="javascript:;" hidefocus="true" id="">
	        		<span>确定</span>
	        	</a>
	        </div>
		</div>
	</div>
</div>

<!--分页数据容器-->
<textarea class="fn-hide" id="dataTbl_tpl">
{{#each rows}}
<tr>
	<td>{{indexAdd @index}}</td>
	<td>{{ABILITY_CODE}}</td>
	<td>{{ABILITY_NAME}}</td>
	<td>{{ABILITY_STATUS}}</td>
	<td>{{ABILITY_URL}}</td>
	<td>{{REMARKS}}</td>
	<td>{{REMARKS}}</td>
	<td>
		<a href="javascript:;" hidefocus="true" class="J_showDetail" data-id="{{ABILITY_ID}}"><span>查看</span></a>
	</td>
</tr>
{{/each}}
</textarea>