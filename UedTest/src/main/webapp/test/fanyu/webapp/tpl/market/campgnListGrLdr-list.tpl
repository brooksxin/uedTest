   {{#if beans}}
            {{#each beans}}
                   <tr>
                         <!--<td><div class="table_select"><input type="checkbox" /></div></td> -->
                               <td>{{CMPGN_ID}}</td>
                    			 <td>{{CMPGN_TYPE_CD}}</td>
                               <td data='{{dataToJSON this}}'><a class="detail" href="javascript:;">{{CMPGN_NM}}</a></td>
                               <td>{{POST_NAME}}</td>
               			
                               <td>{{CMPGN_EFF_DATE}}</td>
                               <td>{{CMPGN_INVLD_DATE}}</td>
                               
                                   <!--CMPGN_STS_CD  未开始  已结束  进行中 暂停 废止 "item-text"-->
                               <td>{{CMPGN_STS_CD}}</td>
                               <td width="90">
                                    <div class="gridRowBtn" data='{{dataToJSON this}}'>
                                      <!-- 
      onclick="distributeData('{{CMPGN_ID}}','{{CMPGN_NM}}','{{CMPGN_EFF_DATE}}','{{CMPGN_INVLD_DATE}}','{{co}}','{{CMPGN_STS}}')"
      onclick="watchProcess('{{CMPGN_ID}}','{{CMPGN_NM}}','{{CMPGN_EFF_DATE}}','{{CMPGN_INVLD_DATE}}','{{CMPGN_STS}}','{{co}}')"
                                    -->
                                       <a class="{{isDis CMPGN_STS Distribution TSK_ALCT_MODE_CD}} distribute" href="javascript:;">分配</a>
                                       <a class="{{isWatch CMPGN_STS co TSK_ALCT_MODE_CD}} schedule"  href="javascript:;">查看进度</a>
                                   </div>
                               </td>
                   </tr>
             {{/each}}
   {{else}}
	<tr>
		<td colspan="9">
			<div class="ui-tips-box tipsBox">
				<div class="ui-icon-noData"></div>
				<div class="ui-tips-text">暂无数据记录！</div>
			</div>
		</td>
	</tr>

   {{/if}}