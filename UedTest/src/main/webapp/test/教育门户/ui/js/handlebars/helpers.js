/**
 * 带序号的循环
 * {{index}}为序号。
 * eg ：
 * {{#each_with_index array}}
 * 		{{index}}
 * {{/each_with_index}}
 */
Handlebars.registerHelper("each_with_index", function(array, options) {
	var buffer = "";
	for (var i = 0, j = array.length; i < j; i++) {
		var item = array[i];
	
		// stick an index property onto the item, starting with 1, may make configurable later
		item.index = i+1;
	
		// show the inside of the block
		buffer += options.fn(item);
	}
	// return the finished buffer
	return buffer;
});

Handlebars.registerHelper('divide100', function(value){
	return value/100;
});
Handlebars.registerHelper('add', function(value, addition){
	return value + addition;
});
Handlebars.registerHelper('subtract', function(value, substraction){
	return value - substraction;
});
Handlebars.registerHelper('divide', function(value, divisor){
	return value / divisor
});
Handlebars.registerHelper('multiply', function(value, multiplier){
	return value * multiplier
});
Handlebars.registerHelper('floor', function(value){
	return Math.floor(value);
});
Handlebars.registerHelper('ceil', function(value){
	return Math.ceil(value);
});
Handlebars.registerHelper('round', function(value){
	return Math.round(value);
});
/**
 * If Equals
 * if_eq this compare=that
 */
Handlebars.registerHelper('if_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Equals
 * unless_eq this compare=that
 */
Handlebars.registerHelper('unless_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than
 * unless_gt this compare=that
 */
Handlebars.registerHelper('unless_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than
 * unless_lt this compare=that
 */
Handlebars.registerHelper('unless_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than or Equal To
 * if_gteq this compare=that
 */
Handlebars.registerHelper('if_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than or Equal To
 * unless_gteq this compare=that
 */
Handlebars.registerHelper('unless_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than or Equal To
 * if_lteq this compare=that
 */
Handlebars.registerHelper('if_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than or Equal To
 * unless_lteq this compare=that
 */
Handlebars.registerHelper('unless_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});

/**
 * Convert new line (\n\r) to <br>
 * from http://phpjs.org/functions/nl2br:480
 */
Handlebars.registerHelper('nl2br', function(text) {
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  return new Handlebars.SafeString(nl2br);
});

/*
 *字符串过长的时候切除字符串
*/
Handlebars.registerHelper("subStrIfTL", function(strIn,num) {
	if(!num)num=25;
	var str=strIn||"";
	if(strIn && strIn.length>num){
		if(!window.showTLInfo){
			window.showTLInfo=function(obj){
				art.dialog({
					  title: "详细信息",
					  content: '<p style="font-size:14px;min-width:200px;max-width:500px;*width:500px;word-wrap:break-word;word-break: break-all;color:#808080;">'+$(obj).attr("title")+'</p>',
					  drag:false,
					  cancel: false,
					  lock:true,
					  opacity:0,
					  button :[
					      {
					          name: '确定',
					          callback: function () {
					          	this.close();
					            return false;
					          },
					          focus: true
					      }
					  ]
				});
			}
		}
		str=strIn.substring(0,num);
		str+='<a href="javascript:void(0)" title="'+strIn.replace(/'/g, '&#x2019;').replace(/"/g, '&#x201d;')+'" onclick="showTLInfo(this);return false;">...</a>';
	}
 	return new Handlebars.SafeString(str);
});

//json转换str
Handlebars.registerHelper('retJson2Str', function(json, options) {
	return JSON.stringify(json);
});
