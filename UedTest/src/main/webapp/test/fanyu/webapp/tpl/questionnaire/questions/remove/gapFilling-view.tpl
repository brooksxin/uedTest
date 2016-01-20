
<div class="showContent">
    <!--展示内容-->
    <div class="qTitle">
    	<i class="listIndex">{{add questionIndex 1 }}.</i>
    	{{#each beans}}
    	   {{qu_nm}}<input type="text" class="FormInputText w100" value="{{alphabet @index }}" />
        {{/each}}
    	<!--
    	您一周购物购次<input type="text" class="FormInputText w100" value="A" />
    	，平均每次消费<input type="text" class="FormInputText w100" value="B" />
    	元。
    	-->
    </div>
</div>

