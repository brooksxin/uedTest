<div id="T_editSms" class="fn-hide">
	<div class="formItem">
		<div class="SMStitle">
			<div class="divcolor">
				已输入字数：<span id="sale">0</span>
			</div>
			<div class="thedivcolor">
				使用场景：<span id="cj"></span>
			</div>
		</div>
		<div class="mt-20 mb-20">
			<textarea rows="7" cols="140" id="smsCntt" name="smsCntt" class="width_all" onKeyUp="javascript:checkWord(this,'sale');" onMouseDown="javascript:checkWord(this,'sale');"></textarea>
		</div>
	</div>
</div>

<div class="listTopBtn" id="J_title"></div>

<div class="cmxform">
	<form class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch">
		<div class="record-search-cate">
			<table class="search_table" cellpadding="0" cellspacing="0"
				border="0" width="100%">
				<tbody>
					<tr>
						<td width="100">
							<input type="hidden" name="uid" value="c001" />
							<input type="hidden" name="flag" value="sales" />
							<label class="description">商家名称</label>
						</td>
						<td width="150">
							<select id="J_coop" name="coopId"></select>
						</td>
						<td>
							<div class="normalBtnArea w82">
					            <a class="searchBtn" href="javascript:;" id="J_search"><i></i>查询</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>
</div>

<!--内容-->
<div class="tablewidth mg_t_10">
	<table
		class="ui-record-table table_radius table-bordered table-striped">
		<thead>
			<tr>
				<th width="100">商家名称</th>
				<th>售后处理短信</th>
				<th width="90">操作</th>
			</tr>
		</thead>
		<tbody id="J_tableTpl">
		</tbody>
	</table>
</div>
<DIV class="amount-bottom">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
      <tr>
        <td>
            <DIV class="fn-clear action-other  action-other-show">
                <DIV id="Pagination" class="page pagination fn-right"> </DIV>
                <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
            </DIV></td>
      </tr>
    </table>
</DIV>