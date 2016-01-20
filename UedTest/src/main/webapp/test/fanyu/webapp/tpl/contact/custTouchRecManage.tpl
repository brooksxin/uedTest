<div class="breadcrumb"></div>
<div class="cmxform" >
   <form class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch">
      <div class="record-search-cate">
			<table class="search_table" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td width="120">
                        <label  class="description">开始时间</label>
                    </td>
                    <td width="100">
                    	<input id="TOUCH_BGN_TIME" name="TOUCH_BGN_TIME" class="text Wdate" type="text" onclick="WdatePicker({realDateFmt:'yyyy-MM-dd 00:00:00',dateFmt:'yyyy-MM-dd 00:00:00',minDate:'#F{\'2010-01-01 00:00:00\'}',maxDate:'#F{$dp.$D(\'TOUCH_FINISH_TIME\')}',vel:'TOUCH_BGN_TIME'})"/>
                    </td>
                    <td width="120">
                        <label class="description">结束时间</label>
                    </td>
                    <td width="120">
                    	<input id="TOUCH_FINISH_TIME" name="TOUCH_FINISH_TIME" class="text Wdate" type="text" onclick="WdatePicker({realDateFmt:'yyyy-MM-dd 23:59:59',dateFmt:'yyyy-MM-dd 23:59:59',minDate:'#F{$dp.$D(\'TOUCH_BGN_TIME\')||\'2010-01-01 23:59:59\'}',vel:'TOUCH_FINISH_TIME'})"/>
                    </td>
                    <td width="100">
                        <label class="description">主叫号码</label>
                    </td>
                    <td>
                        <input id="CALLING_NUM" name="CALLING_NUM" class="inputWidth inputText" type="text" maxlength="11"  />
                    </td>
                    <td width="120">
                        <div class="normalBtnArea w82">
					        <a class="searchBtn" href="javascript:;" id="J_search"><i></i>查询</a>
                        </div>
                    </td>
                </tr>
                <tbody id="J_searchMore" class="searchMore">
                    <tr>
                        <td>
                            <label class="description">接触流水号</label>
                        </td>
                        <td>
                            <input id="TOUCH_ID" name="TOUCH_ID" class="inputWidth inputText" type="text" maxlength="255" />
                        </td>
                        <td>
                            <label class="description">录音ID</label>
                        </td>
                        <td>
							<div>
                         		<input id="CALL_MARK_CNTT" name="CALL_MARK_CNTT" class="inputWidth  inputText" type="text" maxlength="255" />
                            </div>
                        </td>
                        <td>
                            <label class="description" id="paymnType">接触类型</label>
                        </td>
                        <td colspan="3">
                        	<div id="J_TOUCH_MODE_CD">
                            	<select class="inputWidth inputSelect" id="TOUCH_MODE_CD" name="TOUCH_MODE_CD">
                                    <option value="">全部</option>
                                    <option value="0">呼 入</option>
                                    <option value="2">呼 出</option>
                            	</select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label class="description">录音时长</label>
                        </td>
                        <td colspan="7">
                            <input id="RCD_TMLEN_SEC_CNT" name="RCD_TMLEN_SEC_CNT" type="text" maxlength="255" class="inputWidth"/>
                        </td>
                    </tr>
                </tbody>
			</table>
        </div>
    </form>
</div>
<div class="tablewidth mg_t_10">
	<table class="ui-record-table table_radius table-bordered table-striped">
		<thead>
			<tr>
				<th width="80">接续流水号</th>
				<th width="60">手机号码</th>
				<th width="70">客户名称</th>
				<th width="60">呼叫类型</th>
				<th width="80">开始时间</th>
				<th width="80">结束时间</th>
				<th width="40">挂机方</th>
				<th width="60">通话时长(秒)</th>
				<th width="60">原始被叫</th>
				<th width="90">客户地址</th>
				<th width="90">客户级别</th>
                <th width="100">操作</th>
			</tr>
         </thead>
         <tbody id="J_tabletpl_touch"></tbody>
	</table>
</div>
<!--翻页及功能按钮区域开始-->
<DIV class="amount-bottom">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
        <tr>
            <td width="60"></td>
            <td></td>
            <td width="50%">
                <DIV class="fn-clear action-other  action-other-show ">
                    <DIV id="Pagination_touch" class="page pagination fn-right"></DIV>
                    <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
                </DIV>
            </td>
        </tr>
    </table>
</DIV>
<!-- right stop -->
<div id="T_playReocrdPage" class="fn-hide">
    <div class="formArea-B nobottomborder">
        <table width="100%">
            <tbody>
                <tr>
                    <td id="J_player" colspan="8"></td>
                  </tr>
            </tbody>
        </table>
    </div>
</div>
<script id="T_tabletpl" type="text/x-handlebars-template">
    {{#if beans}}
        {{#each beans}}
            <tr>
                <td>{{TOUCH_ID}}</td>
                <td>{{CALLING_NUM}}</td>
                <td>{{CMCC_CUST_NM}}</td>
                <td><div class="fn-center">{{contactType TOUCH_MODE_CD}}</div></td>
                <td>{{TOUCH_BGN_TIME}}</td>
                <td>{{TOUCH_FINISH_TIME}}</td>
                <td><div class="fn-center">{{isHangupType ONHOOK_TYPE_CD}}</div></td>
 				<td><div class="fn-center">{{RCD_TMLEN_SEC_CNT}}</div></td> 
 				<td>{{ORIG_CALLED_NUM}}</td>
 				<td>{{CMCC_CUST_BELG_PLC_NM}}</td>
 				<td>{{CMCC_CUST_LVL_NM}}</td>
                <td width="80">
                    <div class="gridRowBtn">
                        <a class="item-text" href="javascript:;" url="{{RCD_FILE_SVR_URL_PATH}}" path="{{RCD_FILE_SAVE_PATH}}" filename="{{RCD_FILE_NM}}">播放录音</a>
                    </div>
                </td>
            </tr>
        {{/each}}
    {{else}}
    	<tr>
    		<td colspan="12">
    			<div class="ui-tips-box tipsBox">
    				<div class="ui-icon-noData"></div>
    				<div class="ui-tips-text">暂无数据记录！</div>
    			</div>
    		</td>
    	</tr>
    {{/if}}
</script>