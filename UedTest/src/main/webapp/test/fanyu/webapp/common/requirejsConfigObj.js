
var require = {
    // /ecp/
    // http://221.176.67.103:30000/ecp/
    //http://221.176.67.103:8765/resource/ecp/ 
    baseUrl: '/ecp/',
    paths: {
        'market.common':'common/market/common', 
        text:'lib/requirejs/text', 
        style:'lib/requirejs/css.min', 
        json:'lib/requirejs/json', 
        domReady:'lib/requirejs/domReady', 
        handlebars:'lib/handlebars/1.3.0/handlebars', 
        'handlebars.helpers':'lib/handlebars/1.3.0/helpers', 
        dialog:'lib/dialog/6.0.4/dialog-plus', 
        jquery:'lib/jquery/1.8.1/jquery', 
        jqueryui:'lib/jqueryui/1.9.2/jquery-ui-1.9.2.min',

        underscore:'lib/underscore/1.8.3/m',
        backbone:'lib/backbone/1.2.1/m',
        'jquery.validate':'lib/validate/1.13.1/jquery.validate.min', 
        'jquery.blockUI':'lib/blockUI/2.64/jquery.blockUI', 
        'jquery.sortable':'lib/jqueryPlugin/jquery-ui-1.11.4.sortable/jquery-ui', 
        'jquery.pagination':'lib/pagination/1.2.1/jquery.pagination', 
        'jquery.countdown':'lib/jqueryPlugin/jquery.countdown/2.0.2/m',
        'jquery.jsPlumb':'lib/jqueryPlugin/jquery.jsPlumb/jquery.jsPlumb-1.7.5-min',
        'swfupload':'lib/swfupload/1.0.0/2.5/swfupload'
    },
    shim: {
        //The jquery script dependency should be loaded before loading artDialog.js
        
        'handlebars.helpers':{
            deps:['handlebars']
        }, 
        'jquery.blockUI':{
            deps: ['jquery']
        }, 
        'jquery.sortable':{
            deps: ['jquery']
        }, 
        'jquery.pagination':{
            deps: ['jquery']
        }, 
        'jquery.countdown':{
            deps: ['jquery']
        }, 
        'underscore':{
            exports: '_'
        }, 
        'dialog':{
            deps: ['jquery'],
            exports: 'dialog'
        }, 
        'handlebars':{
            exports:'Handlebars'
        }, 
        'jquery':{
            exports:'jQuery'
        }
    }
};

