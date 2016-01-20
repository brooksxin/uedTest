{{#each bean.questions}}
	{{#if_eq this.qu_type_cd compare=20 }}
	<!-- 单选类题 -->
    <div class="qBox">
        <!--锚点需要与问题索引号对应-->
        <a name="go1"></a>
        <div class="qBoxTitle">
            <div class="qDecoration"><a href="#">问题描述</a></div>
        </div>
		{{#if qu_desc}}
        <div class="qDecorationTxt">
        	<span>{{qu_desc}}</span>
            <!--单选题描述显示在这里-->
            <!--编辑时变为textarea-->
            <textarea name=""  class="qDecorationTxtEdit fn-hide">{{qu_desc}} <!--单选题描述显示在这里--></textarea>
        </div>
		{{/if}}
        <div class="qContent">

            <!--展示内容 fn-hide-->
            <div class="showContent">
                <div class="qTitle"><i class="listIndex">{{@index}}.</i>{{qu_nm}}</div>
                <div class="qAnswerList">
                    <ul class="fn-clear">
                        <li><input type="radio" name="myradio" />A.是</li>
                        <li><input type="radio" name="myradio" />B.否</li>
                        <li><input type="radio" name="myradio" />C.不清楚</li>
                    </ul>
                </div>
            </div>
            
            <!--编辑时展示内容-->
            
            <!--aswr_id aswr_seqno aswr_cntt-->
            <div class="editContent">
                <div class="qTitle"><i class="listIndex">{{add @index 1}}.</i><input type="text" class="FormInputText" value="{{qu_nm}}" /></div>
                {{#if_gt beans.length compare=0}}
                <div class="qAnswerEdit">
                    <ul class="fn-clear">
                    	{{#each beans}}
                        <li><i class="listIndex">{{alphabet @index }}.</i><input type="radio" name="myradio" /><input type="text" class="FormInputText" value="{{aswr_cntt}}" /><a href="#" class="upIcon"></a><a href="#" class="downIcon"></a><a href="#" class="delIcon"></a></li>
                        {{/each}}
                    </ul>
                </div>
                {{/if_gt}}
                <a href="#" class="addAnswer">添加一项</a>
            </div>
            
            
        </div>

        <!--hover展示编辑按钮-->
        <div class="qEditIcon fn-hide"><a class="qEdit" href="#" title="编辑问题"></a><a class="qClone" href="#"  title="复制问题"></a><a class="qMove" href="#" title="移动问题位置"></a><a class="qDel" href="#" title="删除问题"></a></div>

        <!--编辑问题时展示完成按钮-->
        <div class="qDecorationEdit "><input type="checkbox" id="addLib1" /><label for="addLib1">添加到问题库</label><a class="qSave" href="#">完成</a></div>
    </div>
    {{/if_eq}}
{{/each}}