require.config({
	paths: {
		"jquery": "jquery/1.8.3/jquery"
	}
});

require(['jquery'], function ($){
	alert($().jquery);
});