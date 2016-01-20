<div class="ui-onlin_borB">基本信息</div>
<div class="formItem" id="J_userinfo"></div>
<div class="ui-onlin_borB ui-topQuDashed mt-10">班组信息</div>
<div class="formItem">
    <div class="subFormItem">
        <table width="100%" class="form_table">
            <tr>
                <td width="15%">所在班组：</td>
                <td id="J_dept"></td>
            </tr>
            <tr>
                <td>班组长：</td>
                <td id="J_group"></td>
            </tr>
            <tr>
                <td valign="top">班组成员：</td>
                <td>
                    <table class="ui-record-table table_radius table-bordered table-striped" >
                        <thead>
                            <tr>
                               <th width="30">序号</th>
                               <th width="100">姓名</th>
                               <th>工号</th>
                               <th>联系方式</th>
                            </tr>
                        </thead>
                        <tbody id="J_userlist"></tbody>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</div>


<script id="T_userinfo" type="text/x-handlebars-template">
    <div class="gray_text mt-10" id="title">
        <table width="100%" class="form_table">
            <tr>
                <td width="15%" class="gray_text">姓名：</td>
                <td width="85%">
                    <span class="ui-poptip-white">{{bean.PTY_NM}}</span>
                    <span class="fn-right">
                        <a href="javascript:;" id="J_updatePwd" class="ui-colorAB">修改登录密码</a>
                    </span>
                </td>
            </tr>
        </table>
    </div>
    <form id="J_password" style="display: none">
        <div class="ui-olineBcolor" >
            <table width="100%">
                <tbody>
                    <tr>
                        <input name="uid" class="FormInputText" type="hidden" value="u001"/>
                        <td width="15%" class="gray_text">姓名：</td>
                        <td width="20%">{{bean.PTY_NM}}</td>
                    </tr>
                    <tr>
                        <td class="gray_text">当前登录密码：</td>
                        <td>
                            <input class="FormInputText" name="curPassword" type="password" />
                        </td>
                    </tr>
                    <tr>
                        <td class="gray_text">请输入新密码：</td>
                        <td>
                            <input class="FormInputText" name="newPassword" type="password" />
                        </td>
                        <td><div class="gray_text">密码由6-20位数字或字母组成</div></td>
                    </tr>
                    <tr>
                        <td class="gray_text">确认新密码：</td>
                        <td>
                            <input class="FormInputText" name="confirmPassword" type="password" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div class="normalBtnArea">
                                <a class="normalBtn BGblue" href="javascript:;" id="J_saveP">保存</a>
                                <a class="normalBtn BGgray" href="javascript:;" id="J_cancelP">取消</a>    
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
    <table width="100%" class="form_table">
        <tbody>
            <tr>
                <td width="15%" class="gray_text">工号：</td>
                <td width="85%">{{bean.PTY_NO}}</td></tr>
            <tr>
                <td class="gray_text">入职时间：</td>
                <td>{{bean.ENTRY_DATE}}</td>
            </tr>
            <tr >
                <td class="gray_text">手机号：</td>
                <td>{{bean.TELNUM}}</td>
            </tr>
            <tr id="updateZym">
                <td class="gray_text">座右铭：</td>
                <td>
                    <span class="fn-right">
                        <a href="javascript:;" id="J_updateInfo" class="ui-colorAB">修改座右铭</a>
                    </span>
                    <div style="margin-right:70px;">{{bean.PRSN_ENCRG_CNTT}}</div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="ui-olineBcolor fn-clear mb-30" id="zym" style="display: none">
        <div class="gray_text mb-20">
            座右铭:<span class="fn-right">已输入<span class="ui-poptip-white" id="wordCheck">0</span>/80</span>
        </div>
        <textarea id="zymTextArea" class="FormTextarea_zcH104">{{bean.PRSN_ENCRG_CNTT}}</textarea>
        <div class="normalBtnArea mt-20">
            <a class="normalBtn BGblue" href="javascript:;" id="J_saveZym">保存</a>
            <a class="normalBtn BGgray" href="javascript:;" id="J_cancelZym" >取消</a>
        </div>  
    </div>
</script>


<script id="T_userlist" type="text/x-handlebars-template">
    {{#if beans.length}}
        {{#each beans}}
            <tr>
                <td class="fn-center">{{index @index}}</td>
                <td class="fn-center">{{PTY_NM}}</td>
                <td class="fn-center">{{PTY_NO}}</td>
                <td class="fn-center">{{TELNUM}}</td>
            </tr>
        {{/each}}
    {{else}}
        <tr>
            <td colspan="4">
                <div class="ui-tips-box tipsBox">
                    <div class="ui-icon-noData"></div>
                    <div class="ui-tips-text">没有班组成员！</div>
                </div>
            </td>
        </tr>
    {{/if}}
</script>