<div>
<div class="breadcrumb"></div>

		<div class="listTopBtn">
	    	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	          	<tr>
		            <td class="titleColumn"><h1><span id="CMPGN_NM"></span></h1></td>
		            <td><!--<label class="color-red">距任务结束：</label><span id="clock">加载中...<span>--></td>
	          	</tr>
	        </table>
	    </div>
				
	    <div class="listTopTips">
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
			    <tr>
			         <td class="dateColumn"><span id="CMPGN_EFF_DATE"></span>——<span id="CMPGN_INVLD_DATE"></span></td>
			         <td>任务数量：<span id="count"></span></td>
			    </tr>
			</table>
	    </div>
   
		<form id="divideTask">
	     	<div class="tablewidth mg_t_10">
				<table class="ui-record-table table_radius table-bordered table-striped" >
					<thead>
						<tr>
							<th width="50"></th>
							<th width="">员工工号</th>
							<th width="">员工姓名</th>
							<th width="">配给数量</th>
						</tr>
                    </thead>
                    <tbody id="J_tabletpl"></tbody>
				</table>
	    		<input type="hidden" name="uid" value="mt001" />
	    		<input type="hidden" name="type" value="1" />
	    		<input type="hidden" class="VALID_BGN_DATE" name="VALID_BGN_DATE"  />
				<input type="hidden" class="VALID_END_DATE" name="VALID_END_DATE"  />
				<input type="hidden" class="CMPGN_ID" name="CMPGN_ID"  />
			</div>
		</form>


	    <!--翻页及功能按钮区域开始-->
	    <DIV class="amount-bottom">
	        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
	          <tr>
	            <td width="60">
	                <input type="checkbox" class="selectAll" id="selectAll" checked="checked" />
	                <label for="selectAll">全选</label> 
	            </td>
	            <td width="100">剩余配给量:<span class="surplus">0</span></td>
	            <td width="100">
	                <DIV class="normalBtnArea">
	                    <a class="normalBtn BGgray" id="J_distr_again" href="javascript:;">重新分配</a>
	                </DIV>
	            </td>
	            <td>
	                <DIV class="fn-clear action-other  action-other-show " style="width:410px">
                        <DIV id=Pagination class="page pagination fn-right"> </DIV>
                        <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
	                </DIV></td>
	          </tr>
	        </table>
	    </DIV>
	    
	    <div class="normalBtnArea fn-center">
	    	<a class="normalBtn BGblue largeBtn" href="javascript:;" id="J_search" >确定</a>
	    </div>
</div>