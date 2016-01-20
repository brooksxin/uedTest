
<span class="answerLabel">{{QU_NM}}</span>
<input type="text" class="FormInputText w100 answerBox" value="{{QU_NM}}" />
<span class="borderLabel">{{#if_eq QU_SHOW_MODE_CD compare='1'}}带文本框{{else}}不带文本框{{/if_eq}}</span>
<input type="checkbox" class="borderBox" {{#if_eq QU_SHOW_MODE_CD compare='1'}}checked{{/if_eq}} />

<!--
您一周购物<input type="text" class="FormInputText w100" value="A" />
次，平均每次消费<input type="text" class="FormInputText w100" value="B" />
元。

<input type="checkbox" name="myradio">{{alphabet}}.
<span class="answerLabel">{{aswr_cntt}}</span>
<input type="text" class="answerBox" value="{{aswr_cntt}}" />
<a href="#" class="upIcon"></a>
<a href="#" class="downIcon"></a>-->
<a href="#" class="editIcon" title="edit"></a>
<a href="#" class="saveIcon" title="save"></a>
<a href="#" class="cancelIcon" title="cancel"><a href="#" class="delIcon"></a>