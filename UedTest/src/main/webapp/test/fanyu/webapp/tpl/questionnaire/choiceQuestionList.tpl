    {{#if beans}}
        {{#each beans}}
            <tr>
            	<td>
            		<div class="table_select">
            		<input type="checkbox" name="" value="{{QU_ID}}" QU_TYPE_CD="{{QU_TYPE_CD}}" />
            		</div>
            	</td>
                <td>{{QU_NM}}</td>
                <td>{{QU_TYPE_CD}}</td>
                <td>{{MODF_TIME}}</td>
                <td>{{PTY_NO}}</td>
                <td>{{QU_STS_CD}}</td>
                <td>
                    <div class="gridRowBtn" data='{{dataToJSON this}}'>
                       {{isInto QU_STS_CD QU_ID}}
                    </div>
                </td>
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