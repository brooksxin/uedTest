
<!--编辑时展示内容-->
<div class="editContent fn-hide">
    <div class="qTitle"><i class="listIndex">{{add @index 1}}.</i>{{qu_nm}}</div>
    {{#if_gt beans.length compare=0}}
    <div class="qAnswerEdit">
        <ul class="fn-clear">
            {{#each beans}}
            <li><i class="listIndex">{{alphabet @index }}.</i><input type="text" class="FormInputText" value="{{aswr_cntt}}" /></li>
            {{/each}}
            <!--<li><i class="listIndex">B.</i><input type="text" class="FormInputText" value="每次购物消费多少元？" /></li>-->
        </ul>
    </div>
    {{/if_gt}}
    <a href="#" class="addAnswer">添加一项</a>
</div>

