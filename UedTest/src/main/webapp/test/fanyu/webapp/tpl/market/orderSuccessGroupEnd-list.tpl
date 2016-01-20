{{#if beans}}
        {{#each beans}}
               <tr>
                           <td>{{PTY_NO}}</td>
                           <td>{{STAFF_NM}}</td>
                           <td>{{DIAL_TELNUM_QTY}}</td>
                           <td>{{PROGRESS}}</td>
                           <td>{{SUCC_RATE}}</td>
                           <td>{{RANK}}</td>
               </tr>
         {{/each}}
{{else}}
 	<tr>
<td colspan="6">
	<div class="ui-tips-box tipsBox">
		<div class="ui-icon-noData"></div>
		<div class="ui-tips-text">暂无数据记录！</div>
	</div>
</td>
</tr>
{{/if}}