<div class="detail_wrap">
	<table class="detail_table" cellpadding="0" cellspacing="0" border="0" width="100%">
		<tbody id="J_YBGD_detail">
			
		</tbody>
	</table>

	<div class="suggestion-wrap">
		<h4>审核意见</h4>
		<ul class="zui_check_list fn-clear">
			<li>
				<i class="zui_check check checked" data-id="1"></i>
				<span>黑白照片（1）</span>
			<iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></li>
			<li>
				<i class="zui_check check" data-id="2"></i>
				<span>手机、电脑拍照（2）</span>
			</li>
			<li>
				<i class="zui_check check" data-id="3"></i>
				<span>PS图（3）</span>
			</li>
			<li>
				<i class="zui_check check" data-id="4"></i>
				<span>反面一致（4）</span>
			</li>
			<li>
				<i class="zui_check check" data-id="5"></i>
				<span>其他（5）</span>
			</li>
		</ul>
		<textarea class="J_suggestion ui-textarea fn-hide" id="J_suggestion"></textarea>
	</div>

	<div class="tool-bar fn-clear">
		<a class="ui-button ui-button-green fn-mr-20" href="javascript:;" hidefocus="true" id="J_pass">
			<span>通过（Y）</span>
		</a>
		<a class="ui-button ui-button-red fn-mr-20" href="javascript:;" hidefocus="true" id="J_unpass">
			<span>不通过（N）</span>
		</a>
		<a class="ui-button ui-button-gray fn-mr-20" href="javascript:;" hidefocus="true" id="J_wait">
			<span>待定（T）</span>
		</a>
		<a class="ui-button ui-button-blue" href="javascript:;" hidefocus="true" id="J_cancel">
			<span>取消（C）</span>
		</a>
	</div>
</div>

<textarea class="fn-hide" id="T_D_YBGD">
	<tr>
		<td width="15%" class="des">
			<label>流水号：</label>
		</td>
		<td width="18%">{{ABILITY_CODE}}</td>
		<td width="15%" class="des">
			<label>审核人：</label>
		</td>
		<td width="18%">{{ABILITY_NAME}}</td>
		<td width="15%" class="des">
			<label>业务类型：</label>
		</td>
		<td>{{ABILITY_STATUS}}</td>
	</tr>
	<tr>
		<td class="des">
			<label>流水号：</label>
		</td>
		<td>{{ABILITY_CODE}}</td>
		<td class="des">
			<label>审核人：</label>
		</td>
		<td>{{ABILITY_NAME}}</td>
		<td class="des">
			<label>业务类型：</label>
		</td>
		<td>{{ABILITY_STATUS}}</td>
	</tr>
	<tr>
		<td class="des fn-va-top">
			<label>身份证照片：</label>
		</td>
		<td colspan="5">
			<a href="ui/theme/img/wang1.bmp" title="正面" class="zpicbox">
			    <img src="ui/theme/img/wang1.bmp" alt="正面" width="175" height="100">
			</a>
			<a href="ui/theme/img/wang2.bmp" title="反面" class="zpicbox">
			    <img src="ui/theme/img/wang2.bmp" alt="正面" width="175" height="100">
			</a>
		</td>
	</tr>
</textarea>