
    {{#if beans}}
        {{#each beans}}
            <tr>
                <td>{{QNR_ID}}</td>
                <td>{{QNR_NM}}</td>
                <td>{{transferred SUIT_RNG_ID}}</td>
				<td><div class="fn-center">{{QNR_TYPE_CD}}</div></td>
				<td>{{QNR_BELG_DEPT_ID}}</td>
                <td>{{CRT_TIME}}</td>
                <td>{{CRT_USER_ID}}</td>
				<td><div class="fn-center">{{QNR_STS_PARSE QNR_STS_CD}}</div></td>

				<td>
                    <div class="gridRowBtn">
						{{{choictBtn QNR_STS_CD}}}
						<input type="hidden" id="{{QNR_ID}}" QNR_STS_CD="{{QNR_STS_CD}}" />
                   </div>
                </td>
            </tr>
         {{/each}}
    {{else}}
	<tr>
		<td colspan="8">
			<div class="ui-tips-box tipsBox">
				<div class="ui-icon-noData"></div>
				<div class="ui-tips-text">暂无数据记录！</div>
			</div>
		</td>
	</tr>
    {{/if}}
