<div id="T_title" class="fn-hide">
	<input type="text" id="title" />
</div>
<div id="T_editSms" class="fn-hide">
	<div class="formItem">
		<div>
			<div class="divcolor">
				已输入字数：<span id="appoint">0</span>
			</div>
			<div class="thedivcolor">
				使用场景：<span id="cj"></span>
			</div>
		</div>
		<div class="mt-20 mb-20">
			<textarea rows="7" cols="140" id="smsCntt" name="smsCntt" class="width_all"></textarea>
		</div>
	</div>
</div>
<!--内容-->

<!-- <div class="tableborderdiv fn-clear" id="J_info" >
	<div class="ui-loading"><h1><img src="../../css/images/loading.gif" alt="loading">正在加载，请稍等 ...</h1></div>
</div> -->
{{#each object}}
	<div class="div_bgcolor mt-20">
	     <div class="thead_diva mr-20" style="width: 110px"><a href="javascript:void(0);" CMN_CD="{{CMN_CD}}" CMN_CD_VAL_NM="{{CMN_CD_VAL_NM}}" CD_VAL="{{CD_VAL}}">修改标题</a></div>
	     <div class="ft-16 ml-10">{{CMN_CD_VAL_NM}}</div>
	</div>
	{{#each banBens}}
		{{#each types}}
        <div class="textdiv">使用场景：{{CMN_CD_VAL_NM}}</div>
	 	<table  cellpadding="1" cellspacing="1" align="center" width="100%" >
    	<tr>
      	<td class="txtIndent10">{{SMS_CNTT}}</td>
      	<td align="center" width="50"><a href="javascript:void(0);" class="J_content_edit" SMS_RS_ID="{{SMS_RS_ID}}" SMS_CNTT="{{SMS_CNTT}}" CMN_CD_VAL_NM="{{CMN_CD_VAL_NM}}">编辑</a></td>
    	</tr>
  		</table>
		{{/each}}
	{{/each}}
{{/each}}
