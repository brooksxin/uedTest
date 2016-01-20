<div id="J_contact_left" class="phone_contact_left">
        <div class="outCallLeft">
        <!--左侧来电号码-->
        <div class="custNumber">
            <div class="phoneNumberArea fn-clear">
                <a  class="phoneNumber_curren fn-text-overflow out-phone" id="out-phone1"></a>
                <a id="out-phone2" class="phoneNumber_small  fn-text-overflow out-phone" style="display: none;" ></a>
                <img src="../../css/images/guanbi.png"  class="phoneNumber_close fn-hide" id="phoneNumver_close"/>
            </div>
            <a class="seeOtherNumber" onclick="outCallShowDom('.OtherNumber');$(this).toggleClass('seeOtherNumberSelected')" id="J_searchOtherNum">查找其它号码</a>
            <div class="OtherNumber fn-hide" id="J_othernumWrapper">
                <div class="keyTips fn-hide">您输入的电话号码不正确，请重新输入...</div>
                <div class="otherPhone"><input id="J_otherPhoneInput" type="text" class="otherPhoneInput" maxlength="11" /><a class="normalBtn BGblue" id="phoneNum_search">查询</a></div>
            </div>
        </div>
    </div>
</div>

<div class="ui-loading"><h1><img src="../../css/images/hn10085/outcallForLoad.gif" alt="loading"><br />正在等待客户接入</h1></div>


<div id="J_contact_list_1" class="J_outcall_contact_list" style="overflow:auto;">
 	<div class="custTags"></div>
 	<div class="custAreaDiv"></div>
    <div class="custInfo"></div>
    <div class="J_contact_left_custInfo"></div>
    <div class="J_contact_left_histOrder"></div>
    <div class="J_contact_left_history"></div>
    <div class="J_contact_left_prehistory"></div>
     <!--转接按钮-->
	<div class="changeBtn" style=" z-index: 140">
	    <div class="normalBtnArea fn-center">
	        <a id="J_openTransferPage" href="javascript:;" class="normalBtn BGgray">转接</a>
	    </div>
	</div>
</div>

<div id="J_contact_list_2" class="J_outcall_contact_list" style="overflow:auto;">
	<div class="custTags"></div>
	<div class="custAreaDiv"></div>
    <div class="custInfo"></div>
    <div class="J_contact_left_custInfo"></div>
    <div class="J_contact_left_histOrder"></div>
    <div class="J_contact_left_history"></div>
    <div class="J_contact_left_prehistory"></div>
</div>
<script id="T_contact_areaInfo" type="text/x-handlebars-template">
   	<!--来电归属地-->
   	{{#if custArea}}
      <div>
        <div  class="attribution">
            归属地：<span id="userPlaceName"  class="attributionValue">{{custArea.bean.regnDesc}}  {{custArea.bean.regnNm}} {{isChinaMobile custArea.bean.mtopFctyNo}}</span>
      	</div>
    </div>
    {{/if}}
</script>
<script id="T_contact_tags" type="text/x-handlebars-template">
    <!-- 顾客标签 -->
    <div class="custTag">
     {{#if custTags.beans.length}}
           {{#each custTags.beans}}
                    <span>{{LBL_NM}}</span>
           {{/each}}
     {{/if}}
    </div>
</script>

<script id="T_contact_left" type="text/x-handlebars-template">
    {{#if mkt.beans.length}}
        <div class="promotion">
            <p>顾客可参加营销活动</p>
            <ul class="promotionList">
            {{#each mkt.beans}}
                <li><a href="#" onclick="openTabsItem(this)">{{CMPGN_NM}}<div>{{CMPGN_INVLD_DATE}}-{{CMPGN_EFF_DATE}}</div><input type="hidden" value="{{CMPGN_ID}}" /></a></li>
            {{/each}}
            </ul>
        </div>
    {{/if}}
</script>

<script id="T_contact_left_custInfo"type="text/x-handlebars-template">
    {{#if custInfo}}
                <div class="custDetail">
                    <h1>{{custInfo.custFamilyName}}</h1>
                    	<div class="custDetailReal">实名认证 </div>
                    <div class="custDetailArea">
                        <label>客户级别：</label><span>{{custInfo.custLevelName}}</span>
                        <label>当前套餐：</label><span>{{custInfo.basicFeeName}}</span>
                        <label>入网时间：</label><span>{{custInfo.entDt}}</span>
                        <label>当前手机：</label><span>{{custInfo.termEqpmtId}}</span>
                        <label>月均流量：</label><span>{{custInfo.meanDataAmt}}</span>
                        <label>月均话费：</label><span>{{custInfo.meanTotalCost}}元</span>
                    </div>
                    <div class="custDetailMore"><a href="javascript:;" data-phonenum="{{custInfo.phonenum}}" onclick="getMoreCustDetail(this)">更多信息</a></div>
                </div>
       {{else}}
     		   <div class="custDetail">
                    <h1>未知</h1>
                    	<div class="custDetailReal" style="display:none">实名认证 </div>
                    <div class="custDetailArea">
                        <label>客户级别：</label><span>未知</span>
                        <label>当前套餐：</label><span>未知</span>
                        <label>入网时间：</label><span>未知</span>
                        <label>当前手机：</label><span>未知</span>
                        <label>月均流量：</label><span>未知</span>
                        <label>月均话费：</label><span>未知</span>
                    </div>
                </div>
     {{/if}}
</script>

<script id="T_contact_left_histOrder" type="text/x-handlebars-template">
        <!--订单历史-->
        {{#if billHis.beans.length}}
            <div class="historyList" style="z-index: 170">
            <div class="outCallBox">
                <h1>订单历史</h1>
                <ul class="listArea">
                    {{#each billHis.beans}}
                        <li><a href="javascript:;">[{{CRT_TIME}}]&nbsp;{{ODR_ORIG_AMT}}&nbsp;{{EHS_STS_CD}}</a></li>
                    {{/each}}
                </ul>
                {{#if billHis.bean.amount}}
                <div class="historyListMore">
                    <a href="javascript:;" onclick ="AiSoftPhone.openOrderInfoPage({{billHis.bean.phonenum}});">还有{{billHis.bean.amount}}条<span class="iconMore">&#62;</span></a>
                </div>
                {{/if}}
            </div>
            </div>
        {{/if}}
</script>

<script id="T_contact_left_history" type="text/x-handlebars-template">
    <!--接触历史-->
        {{#if contactHisRec.beans.length}}
            <div class="historyList" style="z-index: 160">
            <div class="outCallBox">
                <h1>接触历史</h1>
                <ul class="listArea">
                    {{#each contactHisRec.beans}}
                        <li><a href="javascript:;">[{{BGN_CNTMNG_DATE}}]  {{PTY_NM}} 通话{{BETWEEN_TIME}}秒</a></li>
                    {{/each}}
                </ul>
             {{#if contactHisRec.bean.amount}}
                <div class="historyListMore">
                    <a href="javascript:;" onclick ="AiSoftPhone.openContactInfoPage({{contactHisRec.bean.phonenum}});">还有{{contactHisRec.bean.amount}}条<span class="iconMore">&#62;</span></a>
                </div>
           {{/if}}
           	</div>
            </div>
        {{/if}}
</script>

<script id="T_contact_left_prehistory" type="text/x-handlebars-template">
    <!--预约历史-->
        {{#if appoint.beans.length}}
            <div class="historyList" style=" z-index: 150">
            <div class="outCallBox">
                <h1>预约历史</h1>
                <ul class="listArea">
                    {{#each appoint.beans}}
                        <li><a href="javascript:;">[{{RSVT_DATE}}]{{RSVT_INPUT_MCDS_NM}}{{MCDS_RSVT_PRC}}元</a></li>
                    {{/each}}
                </ul>
                {{#if appoint.bean.amount}}
                <div class="historyListMore">
                    <a href="javascript:;" onclick ="AiSoftPhone.openAppointInfoPage({{appoint.bean.phonenum}});">还有{{appoint.bean.amount}}条<span class="iconMore">&#62;</span></a>
                </div>
               {{/if}}
           	</div>
            </div>
        {{/if}}
</script>
