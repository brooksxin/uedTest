
require.config({
    baseUrl: '/ecp/',
    paths: {
        text:'lib/requirejs/text', 
        json:'lib/requirejs/json', 
        domReady:'lib/requirejs/domReady', 
        handlebars:'lib/handlebars/1.3.0/handlebars', 
        dialog:'lib/dialog/6.0.4/dialog-plus', 
        jquery:'lib/jquery/1.8.1/jquery',
        underscore:'lib/underscore/1.8.3/m',
        'jquery.blockUI':'lib/blockUI/2.64/jquery.blockUI', 
        'jquery.countdown':'lib/jqueryPlugin/jquery.countdown/2.0.2/m'
    },
    shim: {
        //The jquery script dependency should be loaded before loading artDialog.js
        'jquery.countdown':{
            deps: ['jquery']
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
});

