  <div>
    <div class="breadcrumb"></div>
    <div class="ml-15 mr-15">
    <table width="100%">
          <tr>
              <td width=""><div class="titleArea">今日下单量</div></td>
              <td></td>
          </tr>
          <tr>
              <td id="date"><span id="time"></span></td>
              <td><div class="fn-right">任务成功数量：<span id="count"></span></div></td>
          </tr>
    </table>
    </div>
    
	 <div method="post" action="#" class="cmxform" >
           <form method="get" action=""  class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch" >
              <div class="record-search-cate">
                    <table class="search_table" cellpadding="0" cellspacing="0" border="0" width="100%">
                        
                            <tr>
                              <td width="80"><label class="description">员工工号</label></td>

                                  <td width="120">
                               <select class="inputWidth  element text" id="STAFF_ID" name="STAFF_ID" >
                                    
                                    </select>
                                </td>
                                <td width="120">
                                     <div class="normalBtnArea w82">
                                  <a class="searchBtn" href="javascript:;" id="Query"  mo="998"><i></i>查询</a>
                                     </div>
                                </td> 
                             </tr>  
                      </table>        
               </div>
                  <div class="seeMoreFilter"><a href="#" class="down"></a></div>
              </form>
          </div>

     <div class="tablewidth mg_t_10">
					<table class="ui-record-table table_radius table-bordered table-striped" >
						<thead>
							<tr>
								
								<th width="">员工工号</th>
								<th width="">员工姓名</th>
								<th width="">拨打电话次数</th>
                                <th width="">完成配给数量</th>
                                <th width="">成单率</th>
                                <th width="">排名</th>
                                
							</tr>
                         </thead>
                         <tbody id="J_tabletpl">
                  
                         
						</tbody>
					</table>
    </div>

    <!--翻页及功能按钮区域开始-->
    <DIV class="amount-bottom">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
          <tr>
           <!--  <td width="60">
                <input type="checkbox" class="selectAll" id="selectAll" /> <label for="selectAll">全选</label> 
            </td> -->
            <!-- <td width="100">剩余配给量:0</td> -->
            <td width=100"">
                <DIV class="normalBtnArea">
                    <!-- <A class="normalBtn BGgray" href="javascript:;">重新分配</A> -->
                </DIV>
            </td>
            <td>
                <DIV class="fn-clear action-other  action-other-show " style="width:410px">
                        <DIV id=Pagination class="page pagination fn-right"> </DIV>
                        <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
                </DIV></td>
          </tr>
        </table>
    </DIV>
  </div>