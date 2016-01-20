
/*
 适用渠道 下拉框
 一级渠道接口：front/sh/user!getChnl?uid=u002
 二级渠道接口：front/sh/user!getChnl?uid=u003，参数是一级渠道的chnId
*/
define(['handlebars', 'underscore', 'backbone', 'jquery', 'text!tpl/business/useForChannel.tpl', 'text!tpl/business/useForChannelItem.tpl']
	, function(Handlebars, _, backbone, $, tpl, tplItem){

	var obj = Backbone.View.extend({
		tagName:'div', 
		className:'useForChannel', 
		template:Handlebars.compile(tpl),
		templateItem:Handlebars.compile(tplItem), 
		events:{
			"change		.levelOne":       	"levelTwoInit",
		}, 
		initialize:function(options){
			srvMap.add('business-useForChannel', 'business/useForChannel.json', 'front/sh/user!getChnl?uid=u003');
			this.options = options;
			$('.levelTwo', this.$el).attr({ name:options.name });
			setTimeout($.proxy(function(){
				//$.proxy(this.defaultValueInit, this)
				this.levelOneInit();
			}, this), 100);
			
		}, 
		setValue:function(val){
			//var val = this.defaultVal;
			if (this.judgeLevel(val) == 1){
				$('.levelOne', this.$el).val(val);
			}else{
				this.data = this.getItemFromLevelTwo(val);
				if (this.data && this.data.CHNL_ID){
					$('.levelOne', this.$el).val(this.data.CHNL_ID).trigger('change');
				} 
			}
		},
		getValue:function(){
			var levelTwoValue = $('.levelTwo', this.$el).val();
			//debugger;
			if (!levelTwoValue || levelTwoValue == 0){
				return $('.levelOne', this.$el).val();
			}else{
				return levelTwoValue;
			}
		},
		/*setValue:function(val){
			this.defaultVal = val;
			this.defaultValueInit();
		},*/
		getItemFromLevelTwo:function(val){
			for (var i=0; i<this.json.object.length; i++){
				var levelOneItem = this.json.object[i];
				if (levelOneItem.subList){
					for (var j=0; j<levelOneItem.subList.length; j++){
						var levelTwoItem = levelOneItem.subList[j];
						if (levelTwoItem.CHNL_ID == val){
							return { "CHNL_ID":levelOneItem.CHNL_ID, "SUB_CHNL_ID":levelTwoItem.CHNL_ID };
						}
					}
				}
				
			}
			return null;
		},
		judgeLevel:function(CHNL_ID){
			var result = _.find(this.json.object, function(item, i){
				return item.CHNL_ID == CHNL_ID;
			});
			return result?1:2;
		},
		levelTwoInit:function(){
			var levelOneVal = $('.levelOne', this.el).find(':selected').text();
			var levelOneJSON = _.find(this.json.object, function(item, i){
				return item.PTY_NM == levelOneVal;
			});
			var $levelTwo = $('.levelTwo', this.el).html('');
			if (levelOneJSON && levelOneJSON.subList){
				_.each(levelOneJSON.subList, $.proxy(function(item, i){
					$levelTwo.append(this.templateItem(item));
				}, this));
				if (this.data && this.data.SUB_CHNL_ID) { 
					$('.levelTwo', this.$el).val(this.data.SUB_CHNL_ID);
				}
				$levelTwo.show();
			}else{
				$levelTwo.html('');
				//$levelTwo.append(this.templateItem({ "PTY_NM":"没有子渠道", "CHNL_ID":"0" }));
				$levelTwo.hide();
			}
		}, 
		//callback
		levelOneInit:function(){
			Util.ajax.postJsonSync(srvMap.get('business-useForChannel'), {}, $.proxy(function(json, status) {
				this.json = json;
				if (status) {
					var $levelOne = $('.levelOne', this.el);
					_.each(json.object, $.proxy(function(item, i){
						$levelOne.append(this.templateItem(item));
					}, this));
					this.setValue(this.options.defaultValue);
					$levelOne.trigger('change');
					//callback();
					//$elOne.html(Handlebars.compile(tpl)(json));
				}else{ 
					this.$el.html('数据加载失败...');
				}
			}, this));
		}, 
		render:function(){
			this.$el.html(this.template({}));
			return this;
		},
	});
	return obj;

});