<div class="formItem">
    <table width="100%" class="questionnaire_table">
        <tr>
            <th width="34%"><h2 class="ft-14b">当用户选择</h2></th>
            <th width="33%"></th>
            <th width="33%"><h2 class="ft-14b">则跳转至题目</h2></th>
        </tr>
         <!--开场白-->
         {{#each prolusion}}
         <tr class="qunnaireDashed" id="{{bean.QNR_ISTNC_ID}}">
                    <td>
                        <span class="qunnaireS_right">开场白</span>
                       {{bean.QU_CNTT}}
                    </td>
                    <td>&nbsp;</td>
                     <td><select name=""></select></td>
        </tr>
        {{/each}}
         <!--问题-->
         {{#if questions}}
        {{#each questions}}
        <tr class="qunnaireDashed qu" id="{{bean.QNR_ISTNC_ID}}" index='{{@index}}'>
            <td>
                <span class="qunnaireS_right">{{bean.QU_TYPE_CD_NAME}}</span>
                {{add  @index 1 }}.{{bean.QU_CNTT}}
            </td>
            {{#if_eqRouter bean.QU_TYPE_CD_NAME}}
                {{#each beans}}
                    {{#if_eq @index compare= 0  }}
                        <td>{{i2c ../../bean.QU_TYPE_CD_NAME QU_ASWR_SEQNO ASWR_CNTT}}.&nbsp;{{ASWR_CNTT}}</td>
                        <td><select name="" id="{{QNR_ISTNC_ID}}"></select></td>
                    {{else}}
                         <tr class="qunnaireDashed">
                             <td></td>
                             <td>{{i2c ../../bean.QU_TYPE_CD_NAME QU_ASWR_SEQNO ASWR_CNTT}}.&nbsp;{{ASWR_CNTT}}</td>
                             <td><select name="" id="{{QNR_ISTNC_ID}}"></select></td>
                         </tr>
                   {{/if_eq}}
                {{/each}}
           {{else}}
              <td>&nbsp;</td>
              <td><select name=""></select></td>
           {{/if_eqRouter}}
        </tr>
        {{/each}}
       {{else}}
                                该问卷没有配置问题。
       {{/if}}
         <!--结束语-->
        {{#each closing}}
         <tr class="qunnaireDashed" id="{{bean.QNR_ISTNC_ID}}">
                <td>
                    <span class="qunnaireS_right">{{bean.QU_TYPE_CD_NAME}}</span>
                   {{bean.QU_CNTT}}
                </td>
                <td></td>
                <td>&nbsp;</td>
        </tr>
        {{/each}}

    </table>
</div>
<div class="BtnCtb">
    <a class="normalBtn BGgray" href="javascript:;">验证</a>
    <a class="normalBtn BGgray" href="javascript:;">查看路由图</a>
    <a class="normalBtn BGgray" href="javascript:;">模拟问卷</a>
</div>
<!--问卷END-->
