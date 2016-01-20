<div id="T_editSms" class="fn-hide">
	<div class="formItem">
		<div>
			<div class="divcolor">
				已输入字数：<span id="tail_Info">0</span>
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
{{#if beans.length}}
  	{{#each beans}}
  		<div class="textdiva" style="text-align:right;margin-top:12px;">
  			<a href="javascript:;" class="J_tail_edit" SMS_RS_ID="{{SMS_RS_ID}}" SMS_CNTT="{{SMS_CNTT}}" CMN_CD_VAL_NM="{{CMN_CD_VAL_NM}}">编辑</a>
  		</div>
  		<div class="textdiv" >使用场景:  {{CMN_CD_VAL_NM}}</div>
  		<div class="ml-10 divwidth mb-10" >{{SMS_CNTT}}</div> 
    {{/each}}
{{/if}}