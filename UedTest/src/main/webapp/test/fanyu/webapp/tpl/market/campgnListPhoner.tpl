<div>


  <div class="breadcrumb"></div>

				<div class="formItem">
					<div class="titleArea">
						<h2>外呼任务</h2>
					</div>
				</div>
  
      <div method="post" action="#" class="cmxform" >
         <form method="get" action=""  class="record-search-form record-search-min record-search-form-border" id="J_formSearch" name="J_formSearch" >
            <div class="record-search-cate">
                  <table class="search_table" cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tbody>
                                      <tr>
                                          <td width="80"><label class="description">项目类型</label></td>
                        <td width="100">
                         <select class="inputWidth inputSelect" name="CMPGN_TYPE_CD1" id="CMPGN_TYPE_CD1" >
                            <option value="">全部</option>
                            <option value="01">营销类</option>
                            <option value="02">调研类</option>
                         </select>
                        </td>
                        <td width="80"><label class="description">项目编号</label></td>
                       <td width="120">
                            <input name="CMPGN_ID" id="CMPGN_ID" class="inputWidth inputText" type="text" maxlength="255" value="" />
                        </td>
                        <td width="80"><label class="description">项目名称</label></td>
                        <td width="120">
                            <input name="CMPGN_NM" id="CMPGN_NM" class="inputWidth inputText" type="text" maxlength="255" value="" />
                        </td>
                        <td width="60"><label class="description">状态</label></td>
                        <td>
                         <select class="inputWidth inputSelect" name="CMPGN_STS_CD" id="CMPGN_STS_CD">
                            <option value="">全部</option>
                            <option value="1">发布</option>
                            <option value="2">暂停</option>
                            <option value="3">废止</option>
                            <option value="7">已结束</option>
                            <option value="6">再次分配暂停</option>
                         </select>
                        </td>
                                          <td width="120">
                                          <div class="normalBtnArea w82">
							                  	<a class="searchBtn" href="javascript:;" id="Query" ><i></i>查询</a>
                                          </div>
                                          </td>
                                          
                                      </tr>
                                  </tbody>
                  </table>
              </div>
              <div class="seeMoreFilter"><a href="#" class="down"></a></div>
          </form>
      </div>
                   
                   
                   
          <div class="tablewidth mg_t_10">
              <table class="ui-record-table table_radius table-bordered table-striped"  >
                  <thead>
                      <tr>
                          
                          <th width="">项目编号</th>
                          <th width="" style="display:none">问卷编号</th>
                          <th width="80">项目类型</th>
                          <th width="80">项目名称</th>
                          <th width="60">省公司</th>
                          <th width="80">开始时间</th>
                          <th width="80">结束时间</th>
                          <th width="80">状态</th>
                          <th width="80">完成数量</th>
                          <th width="80">操作</th>
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
              
              <td>
                  <DIV class="fn-clear action-other  action-other-show" style="width:410px">
                          <DIV id=Pagination class="page pagination fn-right"> </DIV>
                          <DIV class="fn-right fn-pt5 fn-pr10"></DIV>
                  </DIV></td>
            </tr>
          </table>
      </DIV>	
      
</div>