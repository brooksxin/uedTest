/* cordova.js 提供方法 */
var cordovaJS = {};
cordovaJS.utils = {
    changeTab: function(item){
        try{
            cordova.exec(function(winParam){
              //alert(winParam);
            },function(err){
              alert(err);
            },"Func","changeTab",[item]);

        }catch(e){
            var linkurl = "";
            switch(item) {
              case 0: 
              linkurl = "../in/myincome.html";
              break; 
              case 1: 
              linkurl = "myMzone.html";
              break; 
              case 2: 
              linkurl = "myMzone.html";
              break; 
              case 3: 
              linkurl = "question.html";
              break; 
              default: 
              //code
            }
            window.location=linkurl;
        }
    },
    exit: function(){
        cordova.exec(function(winParam){
          //alert(winParam);
        },function(err){
          alert(err);
        },"Func","exit",[]);
    },
    login: function(){
        cordova.exec(function(winParam){
          //alert(winParam);
        },function(err){
          alert(err);
        },"Func","login",[]);
    }
}