<div>
	<div class="listTopBtn">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td><h1>今日下单量</h1></td>
				<td><div class="normalBtnArea ft-right">
						<a class="normalBtn BGblue settingBtn" href="#">任务数量设置</a>
					</div></td>
			</tr>
		</table>
	</div>
	<form id="divideTask">
		<input name="uid" value="mt004" type="hidden" />
		<div class="listTopTips">
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
				<tr>
					<td><span id="date">{{date}}</span> </td>
					<td><div class="ft-right">
							任务完成量：<span id="count">{{count}}</span>
							<input type="hidden" id="TSK_QTY" name="TSK_QTY"/>
						</div></td>
				</tr>
			</table>
		</div>
		<div class="tablewidth mg_t_20">
			<table
				class="ui-record-table table_radius table-bordered table-striped">
				<thead>
					<tr>
						<th width="50"></th>
						<th width="120">员工工号</th>
						<th width="120">员工姓名</th>
						<th width="120">配给数量</th>
					</tr>
				</thead>
				<tbody id="J_tabletpl">

				</tbody>
			</table>
		</div>

	</form>

	<!--翻页及功能按钮区域开始-->
	<DIV class="amount-bottom">
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="gridBottom">
			<tr>
				<td width="60"><input type="checkbox" class="selectAll"
					id="selectAll" checked="checked" /> <label for="selectAll">全选</label>
				</td>
				<td width="100">剩余配给量:<span class="surplus">0</span></td>
				<td width="100">
					<DIV class="normalBtnArea">
						<a class="normalBtn BGgray disable" id="J_distr_again"
							href="javascript:;">重新分配</a>
					</DIV>
				</td>
				<td>
					<DIV class="fn-clear action-other  action-other-show " style="width:410px">
						<DIV id="Pagination" class="page pagination fn-right"></DIV>
						<DIV class="fn-right fn-pt5 fn-pr10"></DIV>
					</DIV>
				</td>
			</tr>
		</table>
	</DIV>
	
	<div class="normalBtnArea fn-center BtnAreaHeight">
		<a class="normalBtn BGblue largeBtn" href="javascript:;" id="J_search">确定</a>
	</div>
</div>