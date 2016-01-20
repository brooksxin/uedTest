{{#if beans}}
    {{#each beans}}
        <tr>
                <td>
        <div class="table_select">
          <input type="checkbox" checked="checked" />
        </div>
      </td>
            <input type="hidden" name="STAFF_ID" class="hideBox" value={{STAFF_ID}}>
      <td align="center">{{PTY_NO}}</td>
      <td align="center">{{PTY_NM}}</td>
                <td align="center">
                  <div style="line-height:0px">
                   <a herf="#" class="order_productDiva decrease" >-</a>
                   <!--onchange="changeTaskIpt(this)" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')"  -->
                   <input type="text" name="TSK_ALCT_QTY" class="ui-count-ipt order_productinput fn-mtl-5" lastVal="" />
                   <a herf="#" class="order_productDiva fn-mtl-5 increase">+</a>
                  </div>
                 </td>

              </tr>
    {{/each}}
{{else}}
  <tr>
    <td colspan="4">
      <div class="ui-tips-box tipsBox">
        <div class="ui-icon-noData"></div>
        <div class="ui-tips-text">暂无数据记录！</div>
      </div>
    </td>
  </tr>

{{/if}}