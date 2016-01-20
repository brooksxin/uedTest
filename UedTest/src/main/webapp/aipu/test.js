require.config({
	paths: {
		"jquery": "ui/js/jquery/1.8.3/jquery"
	}
});

require(['jquery'], function ($){
	window.$ = $;
	
});

function log(text){
	window.console && console.log(text);
}

function getLog(){
	log($().jquery)
}