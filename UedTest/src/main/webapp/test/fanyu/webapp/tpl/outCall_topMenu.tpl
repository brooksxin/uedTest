         <div class="menu outCallMenu fn-clear">
            <div class="menuArea">
                 <ul>
                <li><span class="stateTime">当前状态：<br/><em id="agentStatus">签出</em> <em id="agentStatusTime">00:00:00</em> </span></li>
                 <li id="btnCtAfterCallStatus" class="icon_outcall"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.setAfterCallStatus()" >
                 	<span class="icon icon1"></span>
                 	<span>整理</span>
                 </a></li>
                 
                 <li id="btnCtLogin" class="icon_outcall"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.sign()">
                 <span class="icon icon2"></span>
                 <span>签出</span>
                 </a></li>

                 <li id="btnCtCallOut" class="icon_outcall"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.dialOut()" >
                 	<span class="icon icon3"></span>
                 	<span>呼出</span>
                 </a></li>

                 <li id="btnCtRelease" class="icon_outcall"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.releaseCall()" >
                 	<span  class="icon icon4"></span>
                 	<span>挂机</span>
                 </a></li>

                 <li id="btnCtHold" class="icon_outcall widthAdd"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.holdProxy()" >
                 	<span class="icon icon5"></span>
                 	<span>保持通话</span>
                 </a></li>
                
                 <li id="btnCtFree" class="icon_outcall widthAdd"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.sayFree()" >
                  	<span class="icon icon6"></span>
                  	<span>请求来话</span>
                 </a></li>
                 
                  <li id="btnCtACW" class="icon_outcall widthAdd"><a class="disabled" onclick="openCustomMenuAction(this)" func="AiCtFBH.sayACW()" >
                  	<span class="icon icon7"></span>
                 	<span>进整理态</span>
                 </a></li>
                </ul>
            </div>
            <div  class="callProcess" style="width:280px">
	           	<div class="callTips">
	           		<span id ="QueueWaitNum" style="height:23px; float:left; text-align:right;"></span> 
	           	</div>
	           	<div id="J_calling_show" >
		           	<div class="callProcess" style="width:120px">
	                <a href="javascript:;" class="selected"><h3><span id="J_calling_show_num"></span></h3><div class="callStates3"><span id="J_calling_show_status">通话中</span></div></a>
	            	</div>
            	</div>
           	</div>
        </div>