
    <!-- 填空题展示 -->
    <a name="go{{indexNumber}}"></a>
    
    <div class="qBoxTitle">
        <div class="qDecoration"><a href="#">填空问题描述</a></div>
    </div>
    <div class="qDecorationTxt">
        <span class="descriptionLabel">{{QU_NM}}</span>
        <textarea name="" class="qDecorationTxtEdit fn-hide descriptionBox">{{QU_NM}}</textarea>
        <!--<div class="qTitle titleLabel">{{QU_NM}}</div>
        <div class="qTitle titleBox"><input type="text" class="FormInputText" value="{{QU_NM}}" /></div>-->

        <!--<span>{{qu_desc}}</span>
        <textarea name="" class="qDecorationTxtEdit fn-hide">填空题描述显示在这里</textarea>-->

    </div>

    <div class="qContent">
        <div class="showContent">
            
            <div class="qAnswerList gapFilling">
                <ul class="fn-clear"></ul>
            </div>
            <a href="#" class="addAnswer">添加一项</a>
        </div>
    </div>

    <!--hover展示编辑按钮-->
    <div class="qEditIcon"><a class="qEdit" href="#" title="编辑问题"></a><a class="qClone" href="#"  title="复制问题"></a><a class="qMove" href="#" title="移动问题位置"></a><a class="qDel" href="#" title="删除问题"></a></div>

    <!--编辑问题时展示完成按钮-->
    <div class="qDecorationEdit">
        <input type="checkbox" id="addLib1" />
        <label for="addLib1">添加到问题库</label>
        <a class="qSave" href="#">完成</a>
        <a class="qCancel" href="#">取消</a>
    </div>
