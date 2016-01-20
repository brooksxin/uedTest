
            

<div class="qBox">
    <!-- 日期类题 -->
    <a name="go4"></a>
    <div class="qBoxTitle">
        <div class="qDecoration"><a href="#">问题描述</a></div>
    </div>

    <div class="qDecorationTxt">
        日期类题描述内容

        <!--编辑时变为textarea-->
        <textarea name="" class="qDecorationTxtEdit fn-hide">日期题描述显示在这里</textarea>

    </div>

    <div class="qContent">

        <!--展示内容-->
        <div class="showContent">
            <div class="qTitle"><i class="listIndex">4.</i>您的生日是？</div>
            <div class="qAnswerList">
                <ul class="fn-clear">
                    <li><input id="endDate" name="endDate" class="inputWidth element text Wdate" type="text" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startDate\',{d:1})||\'1930-01-01 23:59:59\'}'})"></li>
                </ul>
            </div>
        </div>


        <!--编辑内容-->
        <div class="editContent fn-hide">
            <div class="qTitle"><i class="listIndex">4.</i><input type="text" class="FormInputText" value="请办理入问题标题" /></div>
            <div class="qAnswerEdit">
                <ul class="fn-clear">
                    <li><input  name="endDate" class="inputWidth element text Wdate" type="text" onclick="WdatePicker()"></li>
                </ul>
            </div>
        </div>

    </div>

    <!--hover展示编辑按钮-->
    <div class="qEditIcon"><a class="qEdit" href="#" title="编辑问题"></a><a class="qClone" href="#"  title="复制问题"></a><a class="qMove" href="#" title="移动问题位置"></a><a class="qDel" href="#" title="删除问题"></a></div>

    <!--编辑问题时展示完成按钮-->
    <div class="qDecorationEdit fn-hide"><input type="checkbox" id="addLib1" /><label for="addLib1">添加到问题库</label><a class="qSave" href="#">完成</a></div>
</div>