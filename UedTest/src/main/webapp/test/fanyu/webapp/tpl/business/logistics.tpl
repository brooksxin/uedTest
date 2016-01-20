 <div>
  <label>订单编号：</label><span class="orderID">{{orderID}}</span>
  <label>运单号：</label><span class="wayBillNo">{{wayBillNo}}</span>
  <label>物流公司：</label><span class="companyName">{{companyName}}</span>
</div>
<ul class="list mt-10" {{#if list}}{{else}}style="border-left:0px solid #ccc"{{/if}}>
  {{#if list}}
    {{#each list}}
    <li>
      <span class="icon {{#if @first}}active{{/if}}"></span>

      <span class="timeStr">{{timeStr}}</span>
      <span class="msg">{{msg}}</span>
    </li>
    {{/each}}
  {{else}}
    <div class="ui-tips-box tipsBox">
      <div class="ui-icon-noData"></div>
      <div class="ui-tips-text">暂无数据记录！</div>
    </div>
  {{/if}}
</ul>