
    <div class="questionListContent">
        <div method="post" action="#" class="cmxform" >
        <form method="get" action=""  class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch" >
              <div class="record-search-cate">
                    <table class="search_table" width="100%">
                            <tr>
                                <td width="80"><label class="description">问题名称</label></td>
                                <td>
                                    <input id="QU_NM" name="QU_NM"  class="inputWidthDataPoint inputText" type="text"  />
                                </td>
                                <td width="80"><label class="description">问题类型</label></td>
                                <td>
                                 <select id="QU_TYPE_CD" name="QU_TYPE_CD"  class="inputWidthDataPoint inputSelect">
                                    <option value="">全部</option>
                                    <option value="10">填空题</option>
                                    <option value="20">单项选择题</option>
                                    <option value="30">多项选择题</option>
                                    <option value="40">判断题</option>
                                    <option value="50">问答题</option>
                                    <option value="60">日期类型</option>
                                    <option value="0B">开场白</option>
                                    <option value="0E">结束语</option>         
                                 </select>
                                </td> 
                                <td width="80"><label class="description">发布工号</label></td>
                                <td>
                                     <select class="inputWidthDataPoint inputSelect"  id="USER_ID" name="USER_ID" >
                                     </select>
                                </td>  
                                <td width="100">
              				                <div class="normalBtnArea w82">
                                          <a class="searchBtn" href="javascript:;" id="J_search" ><i></i>查询</a>
                                      </div>
              				          </td>
                            </tr>
                        
                            <tr>
                                <td width="80"><label class="description">开始时间</label></td>
                                <td><input id="BGN_DATE" name="BGN_DATE" class="inputWidthDataPoint element text Wdate" type="text" value="" onclick="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true})" /></td>
                                <td width="80"><label class="description">结束时间</label></td>
                                <td><input id="END_DATE" name="END_DATE" class="inputWidthDataPoint element text Wdate" type="text" value="" onclick="WdatePicker({startDate:'%y-%M-01 00:00:00',dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
                                </td>   
                                <td></td>  
              				          <td></td>                 
                                <td></td>
                            </tr>

                    </table>
              </div>
        </form>
        </div>


        <div class="tablewidth mg_t_10">
            <table class="ui-record-table table_radius table-bordered table-striped"  >
                <thead>
                    <tr>
                        <th width="25"></th>
                        <th>问题名称</th>
                        <th width="80">问题类型</th>
                        <th width="120">发布时间</th>
                        <th width="80">发布来源</th>
                        <th width="80">问题状态</th>
                        <th width="50">操作</th>
                    </tr>
                 </thead>
                 <tbody class="J_tabletpl">
                </tbody>
            </table>
        </div>
                  
                  
         <!--翻页及功能按钮区域开始-->
        <DIV class="amount-bottom">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gridBottom">
              <tr>
                <td>
                    <DIV class="fn-clear action-other  action-other-show ">
                            <DIV id=Pagination class="page pagination fn-right"> </DIV>
                            <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
                    </DIV></td>
              </tr>
            </table>
        </DIV>

    <!--预览展示 -->
    <div id="T_title" class="fn-hide">
    	<div class="qBox_preview">
    	    <div class="qBoxTitle">
    	        <div class="qDecoration">问题描述</div>
    	    </div>
    	    <div class="qDecorationTxt">
    	        <span id="gggtitle"></span>
    	    </div>
    	    <div class="qContent">
    	        <!--编辑时展示内容-->
    	         <div class="editContent">
    	             <div class="qDecoration">问题内容</div>
    	             <div class="qTitle"><span id="ftitle"></span></div>
    	             <div class="qAnswerEdit">
    	                 <ul id="J_qAnswerEdit" class="fn-clear">
    	                 	
    	                 </ul>
    	             </div>
    	         </div>
    	    </div>
    	</div>
    </div>	


    </div>


