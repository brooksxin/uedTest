{{#if beans}}
    {{#each beans}}

    <tr>
					<td>{{DEPT_NM}}</td>
					<td>{{STAFF_NM}}</td>
					<td>{{DIAL_TELNUM_QTY}}</td>
					<td class="_progress"><div class="rateBar_Large fn-clear">
							<div class="rateBarText">{{process}}</div>
							<div class="rateBarArea">
								<div class="rateBar">
									<div class="rateBg"></div>
									<div class="rateProcess" style="width: {{process}};"></div>
								</div>
							</div>
						</div></td>
					<td class="cm_num">{{DIAL_TELNUM_QTY}}/{{TSK_ALCT_QTY}}</td>
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