    <!-- 单选类题 -->
    <!--锚点需要与问题索引号对应-->
    <a name="go{{indexNumber}}"></a>

    <div class="qBoxTitle">
        <div class="qDecoration"><a href="#">日期类型题描述</a></div>
    </div>
    <div class="qDecorationTxt">
    	<span class="descriptionLabel">{{QU_DESC}}</span>
        <textarea name="" class="qDecorationTxtEdit fn-hide descriptionBox"  placeholder="问题描述">{{QU_DESC}}</textarea>
        <div class="qTitle titleLabel"><!--<i class="listIndex">{{add index 1 }}.</i>-->{{QU_NM}}</div>
        <div class="qTitle titleBox"><!--<i class="listIndex">{{add index 1 }}.</i>--><input type="text" class="FormInputText" value="{{QU_NM}}" /></div>
    </div>
    <!--
    <div class="qContent" id="J_hideORshow" >
        <input type="input" class="inputWidth element text Wdate disable" />
    </div>
    -->

    <div class="qEditIcon">
        <a class="qEdit" href="#" title="编辑问题">
        </a><a class="qClone" href="#"  title="复制问题"></a>
        <a class="qMove" href="#" title="移动问题位置"></a>
        <a class="qDel" href="#" title="删除问题"></a>
    </div>

    <div class="qDecorationEdit">
        
        <input type="checkbox" class="addLib" id="addLib1" {{#if_eq QU_SHARE_TYPE_CD compare='02'}}checked=checked{{/if_eq}}/>
        <label for="addLib1">添加到问题库</label>
        <a class="qSave" href="#">完成</a>
        <a class="qCancel" href="#">取消</a>
    </div>
