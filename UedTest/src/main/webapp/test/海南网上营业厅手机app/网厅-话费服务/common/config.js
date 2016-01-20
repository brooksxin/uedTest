(function(){
    /*
    * 数据配置数组的配置参数
    * 0为本地数据，1为远程数据
    */
	var conf = 1;
    var srcPref = [ "../../data/" , "../../../../front/sh/" ];
    //var srcPref = [ "../../data/" , "http://211.137.34.226/gbh/front/sh/" ];
    //var srcPref = [ "../../data/" , "http://10.67.10.163:18080/gbh/front/sh/" ];
    //192.168.137.1
    var dataArray = [
        {
            "login":srcPref[conf]+"business/userInfo.json?1=1"/*登陆*/,
            "logOff":srcPref[conf]+"business/userInfo.json?1=1"/*注销*/,
            "userInfo":srcPref[conf]+"userInfo.json?1=1"/*用户信息*/,
            "myRank":srcPref[conf]+"myRank.json?1=1"/*我的排名*/,
            "officeRank":srcPref[conf]+"officeRank.json?1=1"/*厅排名*/,
            "officeRankList":srcPref[conf]+"officeRankList.json?1=1"/*厅排名列表*/,
            "incomeY":srcPref[conf]+"in/income.json?1=1"/*收入昨日列表视图数据*/,
            "incomepieY":srcPref[conf]+"in/incomepie.json?1=1"/*收入昨日饼图数据*/,
            "incomepieYLD":srcPref[conf]+"in/tingjingli-pie.json?1=1"/*收入昨日饼图数据 厅经理*/,
            "incomeAreaY":srcPref[conf]+"in/incomeArea.json?1=1"/*收入昨日区域图数据*/,
            "incomeAreaYLD":srcPref[conf]+"in/tingjingli-area.json?1=1"/*收入昨日区域图数据 厅经理*/,
            "incomeTotal":srcPref[conf]+"in/incomepie.json?1=1"/*收入累计列表数据*/,
            "incomepieTotal":srcPref[conf]+"in/incomepie.json?1=1"/*收入累计饼图数据*/,
            "incomepieTotalLD":srcPref[conf]+"in/tingjingli-pie.json?1=1"/*收入累计饼图数据 厅经理*/,
            "incomeAreaTotal":srcPref[conf]+"in/incomeArea.json?1=1"/*收入累计区域图数据*/,
            "incomeAreaTotalLD":srcPref[conf]+"in/tingjingli-area.json?1=1"/*收入累计区域图数据 厅经理*/,
            "incomeRa":srcPref[conf]+"in/huanbiliebiao.json?1=1"/*收入环比列表数据*/,
            "incomeBarRa":srcPref[conf]+"in/incomeBarRa.json?1=1"/*收入环比柱状图数据*/,
            "myRankDtl":srcPref[conf]+"rankDtl.json?1=1"/*我的排名详情*/,
            "yesterdayIncome":srcPref[conf]+"myIncome.json?1=1"/*昨日收入*/,
            "monthIncome":srcPref[conf]+"total.json?1=1"/*累计收入*/,
            "circle":srcPref[conf]+"circle.json?1=1"/*环比*/,
            "cusInfo":srcPref[conf]+"business/cusInfo.json?1=1"/*客户资料*/,
            "bulist":srcPref[conf]+"business/bulist.json?1=1"/*已订购列表*/,
            "consume":srcPref[conf]+"business/consume.json?1=1"/*消费柱状图*/
        },
        {
            "login":srcPref[conf]+"login!operUserLogin?uid=x0021"/*登陆*/,
            "logOff":srcPref[conf]+"login!operLogout?uid=n003"/*注销*/,
            "userInfo":srcPref[conf]+"login!getOperUserLogin?uid=x0021"/*用户信息*/,
            "myRank":srcPref[conf]+"common!execute?uid=s004"/*我的排名*/,
            "officeRank":srcPref[conf]+"common!execute?uid=s007"/*厅排名*/,
            "officeRankList":srcPref[conf]+"common!execute?uid=s008"/*厅排名列表*/,
            "incomeY":srcPref[conf]+"common!execute?uid=s002"/*收入昨日列表视图数据*/,
            "incomepieY":srcPref[conf]+"common!execute?uid=s001"/*收入昨日饼图数据*/,
            "incomepieYLD":srcPref[conf]+"common!execute?uid=s0011"/*收入昨日饼图数据 厅经理*/,
            "incomeAreaY":srcPref[conf]+"common!execute?uid=s003"/*收入昨日区域图数据*/,
            "incomeAreaYLD":srcPref[conf]+"common!execute?uid=s0012"/*收入昨日区域图数据 厅经理*/,
            "incomeTotal":srcPref[conf]+"common!execute?uid=s006"/*收入累计列表数据*/,
            "incomepieTotal":srcPref[conf]+"common!execute?uid=s004"/*收入累计饼图数据*/,
            "incomepieTotalLD":srcPref[conf]+"common!execute?uid=s0011"/*收入累计饼图数据 厅经理*/,
            "incomeAreaTotal":srcPref[conf]+"common!execute?uid=s003"/*收入累计区域图数据*/,
            "incomeAreaTotalLD":srcPref[conf]+"common!execute?uid=s0012"/*收入累计区域图数据 厅经理*/,
            "incomeRa":srcPref[conf]+"common!execute?uid=s006"/*收入环比列表数据*/,
            "incomeBarRa":srcPref[conf]+"common!execute?uid=s0010"/*收入环比柱状图数据*/,
            "myRankDtl":srcPref[conf]+"common!execute?uid=s005"/*我的排名详情*/,
            "yesterdayIncome":srcPref[conf]+"common!execute?uid=s001"/*昨日收入*/,
            "monthIncome":srcPref[conf]+"common!execute?uid=s004"/*累计收入*/,
            "circle":srcPref[conf]+"common!execute?uid=s004"/*环比*/,
            "incomepieTotal":srcPref[conf]+"common!execute?uid=s004"/*收入累计饼图数据*/,
            "incomeRa":srcPref[conf]+"common!execute?uid=s006"/*收入环比列表数据*/,
            "incomeBarRa":srcPref[conf]+"common!execute?uid=s0010"/*收入环比柱状图数据*/,
            "cusInfo":srcPref[conf]+"login!userLogin?uid=c0010"/*客户资料*/,
            "bulist":srcPref[conf]+"common!execute?uid=queryAffer"/*已订购列表*/,
            "consume":srcPref[conf]+"login!getUserPlanDtl?uid=c0011"/*消费柱状图*/
        }
    ];
    window.dataArray = dataArray[conf];
    /*离线存储配置*/
    var cacheCfg={
        //客户信息
        "cusInfo":{
            "key":"cusInfo",
            "url":window.dataArray.cusInfo
        }
    }
    window.cacheCfg=cacheCfg;
    /*
    * 提示语配置,用于国际化
    * 0为国语，1为英语
    */
    var confLang = 0; 
    var langArray = [
        {
            "noDatalang": "内容加载失败,请重试!"
        },
        {
            "noDatalang": "No data."
        }
    ];
    window.langArray = langArray[confLang];
})();

