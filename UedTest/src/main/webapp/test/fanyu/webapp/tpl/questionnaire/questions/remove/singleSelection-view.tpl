<div class="showContent">
    <div class="qTitle"><i class="listIndex">{{add questionIndex 1 }}.</i>{{qu_nm}}</div>
    <div class="qAnswerList">
        <ul class="fn-clear">
        	{{#each beans}}
            <li><input type="radio" name="myradio{{../qu_id}}" />{{alphabet @index }}.{{aswr_cntt}}</li>
            {{/each}}
        </ul>
    </div>
</div>