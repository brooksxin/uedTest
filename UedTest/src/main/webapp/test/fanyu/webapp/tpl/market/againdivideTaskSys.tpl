<table width="100%">
	<tr>
		<td width="120"><div class="market_tableTxtColor">任务名称：</div></td>
		<td><span id="CMPGN_NM">{{CMPGN_NM}}</span></td>
		<td width="120"><div class="market_tableTxtColor">距任务结束：</div></td>
		<td><div class="fn-red" id="clock">加载中...</div></td>
	</tr>
	<tr>
		<td><div class="market_tableTxtColor">结束时间：</div></td>
		<td><span id="CMPGN_INVLD_DATE">{{CMPGN_INVLD_DATE}}</span></td>
		<td><div class="market_tableTxtColor">剩余任务量：</div></td>
		<td><span id="plusCount"></span>/<span id="total"></span></td>
	</tr>
</table>


<form id="divideTask">
	<div class="tablewidth mg_t_10">
		<table
			class="ui-record-table table_radius table-bordered table-striped">
			<thead>
				<tr>
					<th width="50"></th>
					<th width="">班组名称</th>
					<th width="">班组长</th>
					<th width="">班组人数</th>
					<th width="">配给数量</th>
				</tr>
			</thead>
			<tbody id="J_tabletpl">
				
			</tbody>
		</table>
	</div>
	<input type="hidden" name="uid" value="mt006">
	 <input type="hidden" name="type" value="0">
	<input type="hidden" name="CMPGN_ID" class="CMPGN_ID" value="{{CMPGN_ID}}" />
	<input type="hidden" name="VALID_END_DATE" class="VALID_END_DATE" value="{{CMPGN_INVLD_DATE}}" />
	<input type="hidden" name="VALID_BGN_DATE" class="VALID_BGN_DATE" value="{{CMPGN_EFF_DATE}}" />
</form>



<!--翻页及功能按钮区域开始-->
<DIV class="amount-bottom">
	<table width="100%" border="0" cellspacing="0" cellpadding="0"
		class="gridBottom">
		<tr>
			<td width="60"><input type="checkbox" class="selectAll" checked="checked"
				id="selectAll" /> <label for="selectAll">全选</label></td>
			<td width="100">剩余配给量:<span class="surplus">0</span></td>
			<td width="100">
				<DIV class="normalBtnArea">
					<A class="normalBtn BGgray" id="J_distr_again" href="javascript:;">重新分配</A>
				</DIV>
			</td>
			<td>
				<DIV class="fn-clear action-other  action-other-show " style="width:410px">
					<DIV id=Pagination class="page pagination fn-right"></DIV>
					<DIV class="fn-right fn-pt5 fn-pr10"></DIV>
				</DIV>
			</td>
		</tr>
	</table>
</DIV>

<div class="formBtnArea">
  <table width="100%">
    <tr>
      <td>
        <div class="normalBtnArea fn-center">
           <a class="normalBtn BGblue largeBtn" href="javascript:;"
		id="J_search">确定</a> <a class="normalBtn BGgray largeBtn"
		href="javascript:;" id="J_Cancel">取消</a>
        </div>
      </td>
    </tr>
  </table>
</div>