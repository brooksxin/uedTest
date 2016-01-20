{{#if beans}}
    {{#each beans}}
        <tr>
								<td><div class="table_select">
									<!-- onchange="checkStaff(this)"-->
							<input type="checkbox" checked="checked"/>
						</div></td>
					<td>{{BM}}
                       <input type="hidden" name="STAFF_ID" class="hideBox" value="{{leaderId}}">
                       <input type="hidden" name="DEPT_ID"  value="{{DEPT_ID}}">
                    </td>
                     
					<td>{{ZG}}</td>
                    <td>{{num}}</td> 
								<td align="center">
				                  <div style="line-height:0px">
					                 <a herf="#" class="order_productDiva decrease">-</a>
					                 <input type="text" name="TSK_ALCT_QTY" class="ui-count-ipt order_productinput fn-mtl-5" lastVal="" onchange="changeTaskIpt(this)" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')"  />
					                 <a herf="#" class="order_productDiva fn-mtl-5 increase">+</a>
				                  </div>
			                   </td>

							</tr>
    {{/each}}
{{else}}
	<tr>
		<td colspan="5">
			<div class="ui-tips-box tipsBox">
				<div class="ui-icon-noData"></div>
				<div class="ui-tips-text">暂无数据记录！</div>
			</div>
		</td>
	</tr>

{{/if}}