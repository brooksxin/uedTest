{{#if beans}}
    {{#each beans}}
                           <tr>
								<td>{{DEPT_NM}}</td>
								<td>{{STAFF_NM}}</td>
								<td>{{DIAL_TELNUM_QTY}}{{ifCheck TSK_ALCT_QTY TSK_ALCT_MODE_CD}}</td>
                                <td>{{TSK_SUCC_QTY}}</td>
                                <td class="_progress">{{process}}</td>
								<td class="cm_num">{{rank}}/{{totalRank}}</td>
                            </tr>
    {{/each}}
{{else}}
     	<tr>
		<td colspan="7">
			<div class="ui-tips-box tipsBox">
				<div class="ui-icon-noData"></div>
				<div class="ui-tips-text">暂无数据记录！</div>
			</div>
		</td>
	</tr>
{{/if}}