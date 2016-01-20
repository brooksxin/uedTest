<div>
<div class="listTopBtn">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td><h1><span class="CMPGN_NM"></span></h1></td>
							<!-- <td><div class="normalBtnArea ft-right">
									<a class="normalBtn BGblue" href="#">上一个任务</a><a
										class="normalBtn BGblue" href="#">下一个任务</a>
								</div></td> -->
						</tr>
					</table>
				</div>

				<div class="listTopTips">
					<table cellpadding="0" cellspacing="0" border="0" width="100%">
						<tr>
							<td><span class="CMPGN_EFF_DATE"></span>——<span class="CMPGN_INVLD_DATE"></span></td>
							<td id="tskCountShow"><div class="ft-right">
									任务数量：<span id="count"></span>/
									<span id="total"></span>
							    </div>
							</td>
						</tr>
					</table>
				</div>
				<form id="J_formCount">
					<input type="hidden" name="uid" value="mc001" /> <input
						type="hidden" name="CMPGN_ID" value="1430365031076" /> <input
						type="hidden" name="STAFF_ID" value="6" /> <input type="hidden"
						name="type" value="1" />
				</form>
				<form id="stafflist">
					<input type="hidden" name="uid" value="u005" />
					<div id="get_dept"></div>

				</form>
				<form id="staffcount">
					<input type="hidden" name="uid" value="mc002" /> <input
						type="hidden" name="CMPGN_ID" value="1430365031076" /> <input
						type="hidden" name="STAFF_ID" value="1" /> <input type="hidden"
						name="type" value="1" />
				</form>

				<div class="tablewidth mg_t_10">
					<table
						class="ui-record-table table_radius table-bordered table-striped">
						<thead>
							<tr>
								<th width="120">员工工号</th>
								<th width="120">员工姓名</th>
								<th width="120">拨打电话次数</th>
								<th width="120">完成进度</th>
								<th width="120">成单数量</th>
							</tr>
						</thead>
						<tbody id="J_tabletpl">


						</tbody>
					</table>
				</div>



				<!--翻页及功能按钮区域开始-->
				<DIV class="amount-bottom">
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						class="gridBottom">
						<tr>
							
							<td width="50%">
								<DIV class="fn-clear action-other  action-other-show ">
									<DIV id=Pagination class="page pagination fn-right"></DIV>
									<DIV class="fn-right fn-pt5 fn-pr10"></DIV>
								</DIV>
							</td>
						</tr>
					</table>
				</DIV>
</div>