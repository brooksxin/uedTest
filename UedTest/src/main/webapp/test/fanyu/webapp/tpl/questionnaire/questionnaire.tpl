<div>

    <div class="formItem bd-bottom">
        <div class="titleArea">
            <h2>用户满意度调查</h2>
        </div>
    </div>

    <!--问卷start-->
    <div class="question fn-clear">
        <!--问卷提纲START-->
        <div class="questionLeft" style="border-right: 1px solid #ddd;">
            <div class="querstionCatlog_answer">
                <h2>问卷纲要</h2>
                <ul id="J_ques_items"></ul>
            </div>
        </div>
        <!--问卷提纲END-->
        <!--问卷右侧内容START-->
        <div class="questionRight" style="border:0;">
            <div id="J_questionRender">
                <div class="ui-loading" style="margin:60px auto;"><h1><img src="../../css/images/loading.gif" alt="loading">正在加载，请稍等 ...</h1></div>
            </div>
        </div>
        <!--问卷右侧内容END-->
    </div>
    <!--问卷END-->

    <div class="formBtnArea bd-top">
        <table width="100%">
            <tr>
                <td>
                    <div class="normalBtnArea norBtnAleft">
                        <a class="normalBtn BGgray disable largeBtn" href="javascript:;" id="J_before">上一题</a>
                        <a class="normalBtn BGblue largeBtn" href="javascript:;" id="J_next">下一题</a>
                    </div>
                </td>
                <td>
                    <div class="normalBtnArea fn-right">
                        <a href="javascript:;" class="formLink" id="J_again_que">
                            <span>重新答题</span>
                        </a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javascript:;" class="formLink" id="J_finish_que">
                            <span>结束答题</span>
                        </a>
                    </div>
                </td>
            </tr>
        </table>
    </div>


    <!-- 单选  判断  类题 -->
    <script id="T_ques_choice_single" type="text/x-handlebars-template">
        <div class="qBox cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" QNR_REC_ID="{{QNR_REC_ID}}">
            <div class="qContent">
                <div class="showContent">
                    <div class="qTitle">
                        <i class="listIndex"><span class="J_que_index"></span>、</i>{{QU_NM}}
                    </div>
                    <div class="qAnswerList">
                        <ul class="fn-clear">
                            {{#each beans}}
                                <li>
                                    <input type="radio" name="{{../QU_ID}}" id="a_{{QNR_ISTNC_ID}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" TGT_QU_ID="{{TGT_QU_ID}}" value="{{ASWR_SEQNO}}" />
                                    <label for="a_{{QNR_ISTNC_ID}}">{{capIndex @index}}.{{ASWR_CNTT}}</label>
                                </li>
                            {{/each}}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </script>

    <!-- 多选类题 -->
    <script id="T_ques_choice_multi" type="text/x-handlebars-template">
        <div class="qBox cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" QNR_REC_ID="{{QNR_REC_ID}}" TGT_QU_ID="{{TGT_QU_ID}}">
            <div class="qContent">
                <div class="showContent">
                    <div class="qTitle">
                        <i class="listIndex"><span class="J_que_index"></span>、</i>{{QU_NM}}
                    </div>
                    <div class="qAnswerList">
                        <ul class="fn-clear">
                            {{#each beans}}
                                <li>
                                    <input type="checkbox" name="{{../QU_ID}}" id="a_{{QNR_ISTNC_ID}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" value="{{ASWR_SEQNO}}" />
                                    <label for="a_{{QNR_ISTNC_ID}}">{{capIndex @index}}.{{ASWR_CNTT}}</label>
                                </li>
                            {{/each}}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </script>

    <!-- 填空题展示 -->
    <script id="T_ques_blanks" type="text/x-handlebars-template">
        <div class="qBox cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" QNR_REC_ID="{{QNR_REC_ID}}" TGT_QU_ID="{{TGT_QU_ID}}">
            <div class="qContent">
                <div class="showContent">
                    <div class="qTitle">
                        <i class="listIndex"><span class="J_que_index"></span>、</i>
                        {{#each beans}}
                            <span class="J_queTxt">{{QU_NM}}</span>
                            {{#if_eq QU_SHOW_MODE_CD  compare="1"}}
                                <input type="text" class="FormInputText w100" id="{{QNR_ISTNC_ID}}" />
                            {{/if_eq}}
                        {{/each}}
                    </div>
                </div>
            </div>
        </div>
    </script>

    <!-- 日期类题 -->
    <script id="T_ques_date" type="text/x-handlebars-template">
        <div class="qBox cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" QNR_REC_ID="{{QNR_REC_ID}}" TGT_QU_ID="{{TGT_QU_ID}}">
            <div class="qContent">
                <div class="showContent">
                    <div class="qTitle">
                        <i class="listIndex"><span class="J_que_index"></span>、</i>{{QU_NM}}
                    </div>
                    <div class="qAnswerList">
                        <ul class="fn-clear">
                            <li><input type="text" id="endDate" name="endDate" class="inputWidth element text Wdate" onClick="WdatePicker()"></li>
                        </ul>
                    </div>
                </div>
           </div>
        </div>
    </script>

    <!-- 问答类题 -->
    <script id="T_ques_essay" type="text/x-handlebars-template">
        <div class="qBox cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}" QNR_ISTNC_ID="{{QNR_ISTNC_ID}}" QNR_REC_ID="{{QNR_REC_ID}}" TGT_QU_ID="{{TGT_QU_ID}}">
            <div class="qContent">
                <div class="showContent">
                    <div class="qTitle">
                        <i class="listIndex"><span class="J_que_index"></span>、</i>{{QU_NM}}
                    </div>
                    <div class="qAnswerList">
                        <ul class="fn-clear">
                            <li><textarea></textarea></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </script>

    <!-- 问卷纲要 -->
    <script id="T_ques_cata" type="text/x-handlebars-template">
        <li class="cur" queId="{{QU_ID}}" queType="{{QU_TYPE_CD}}">
            <a href="javascript:;">
                <div class="qTxt"><i class="listIndex">
                    <span class="J_que_index"></span>、</i>{{QU_NM}}
                </div>
                <div class="okIcon fn-hide"></div>
                <div class="anserTxt"></div>
            </a>
        </li>
    </script>


    <!-- 问卷结束 -->
    <script id="T_ques_end" type="text/x-handlebars-template">
        <div class="ques_end">
            <div class="formItem bd-bottom">
                <div class="titleArea fn-posr">
                    <h2>用户满意度问卷调查</h2>
                </div>
            </div>
            <div class="answerOverTips fn-clear">
                <div class="tiptxtCenter">
                    <i></i>
                    <span>问题回答完毕</span>
                </div>
            </div>
            <div class="answerStart">
                <div class="startIcon"></div>

                <div class="startText">
                  <h2>结束语</h2>
                  <p>{{QU_NM}}</p>
                </div>
            </div>
        </div>
    </script>
</div>