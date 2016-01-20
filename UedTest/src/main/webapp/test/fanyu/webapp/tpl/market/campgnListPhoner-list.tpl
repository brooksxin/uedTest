{{#if beans}}
            {{#each beans}}
                   <tr>
                         <td>{{CMPGN_ID}}</td>
                          <td style="display:none">{{QNR_ID}}</td>
                    			 <td>{{CMPGN_TYPE_CD}}</td>
                             <td data='{{dataToJSON this}}'><a class="detail" href="javascript:;">{{CMPGN_NM}}</a></td>
                               <td>{{POST_NAME}}</td>
               					
                               <td>{{CMPGN_EFF_DATE}}</td>
                             <td>{{CMPGN_INVLD_DATE}}</td>
                               <td>{{CMPGN_STS_CD}}</td>
                               <td>{{next_cmpgn2}}{{ifCheck next_cmpgn1}}</td>
                               <td width="90">
                                    <div class="gridRowBtn">
                                      <!-- onclick="goTo(this,'{{CMPGN_ID}}','{{next_cmpgn}}','{{CMPGN_STS_CD}}')"-->
                                       <a class="{{isInto next_cmpgn1 next_cmpgn2 inCount CMPGN_STS }}" data='{"CMPGN_ID":"{{CMPGN_ID}}","next_cmpgn1":"{{next_cmpgn1}}","next_cmpgn2":"{{next_cmpgn2}}","CMPGN_STS":"{{CMPGN_STS}}","QNR_ID":"{{QNR_ID}}"}' href="javascript:;">进入页面</a>
                                   </div>
                         </td>
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