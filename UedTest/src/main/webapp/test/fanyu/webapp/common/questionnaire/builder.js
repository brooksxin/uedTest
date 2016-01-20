
/*
问卷编辑

事件
	cancel 			取消编辑，模块隐藏，并自动隐藏，[点击取消编辑或点击左上角返回时触发]
方法
	initialize		构造函数
		参数 options 如{ questionnaireID:'问卷id' }
	hide 			隐藏模块
	show			显示模块
*/
define(['common/util/frameContainer', 'common/questionnaire/basic', 'common/questionnaire/questions', 'handlebars'
	, 'text!tpl/questionnaire/builder.tpl', 'backbone'
	, 'jquery', 'underscore', 'market.common', 'style!css/tablepay.css']
	, function(frameContainer, Basic, questions, Handlebars, tpl, Backbone, $, _, common){

	var	publishFlag = true;
	var obj = Backbone.View.extend({
		tagName:'div', 
		//className:'question', 
		template:Handlebars.compile(tpl), 
		
		steps:[], stepIndex:0, $container:null, 
		events: {
			"click .formBtnArea #Next":       	"nextStep",
			"click .formBtnArea #Return":       	"previousStep",
			"click .formBtnArea .formLink":       	"cancelEdit",
			"click .formBtnArea #Save":       	"saveData",
			"click .formBtnArea #Publish":       	"publish",
			"click .formItem .return":       	"cancelEdit",
		},
		initialize:function(options){
			this.options = options || {};
			//this.$el = $(tpl);
			//$el = $(tpl);
			//_options = options;
			this.steps = [];
			this.stepIndex = 0;
			setTimeout($.proxy(function(){
				this.$container = this.$el.find('.container');
				this.steps[0] = new Basic(_.pick(options, ['questionnaireID']));
				this.steps[0].on('saveSuccess', $.proxy(this.loadModule, this));
				this.$container.html('').append(this.steps[0].render().el);
				//$container.html('').append(new questions().render().el);
				this.buttonStatusControl();
			}, this), 100);
			
		}, 
		render:function(){
			this.$el.html(this.template({}));
			return this;
		}, 
		buttonStatusControl:function(){
			$('.formBtnArea .largeBtn:not(#Publish)', this.el).removeClass('disable');
			if (this.stepIndex == 0){
				$('.formBtnArea #Return', this.el).addClass('disable');
			}else if (this.stepIndex == 2) {
				$('.formBtnArea #Next', this.el).addClass('disable');
			}
			$('.flowSteps ul, .formBtnArea .normalBtnArea', this.el).removeClass('current_1 current_2 current_3').addClass('current_' + (Number(this.stepIndex)+1));
		}, 
		hideAllModules:function(){
			_.each(this.steps, function(module, i){
				if (module && $(module.el).is(":visible")) {
					module.hide();
				}
			});
		}, 
		cancelEdit:function(){
			this.trigger('cancel');
			this.$el.hide();
			return false;
		},
		publish:function(e){
			publishFlag = false;
			if ($(e.currentTarget).attr('class').indexOf('disable') >= 0){
				publishFlag = true;
				return false;
			}
			
			var module = this.steps[this.stepIndex];
			if (module && module.save){
				module.save();
			}
			
			srvMap.add('questionnaire-publish', 'questionnaire/basicAppend.json'
					, 'front/sh/questionaire!index?uid=qnrwq007');
			var param = { QNR_ID:this.options.questionnaireID, OP_TYPE:'publish' }
			Util.ajax.postJson(srvMap.get("questionnaire-publish"), param, $.proxy(function(json, status) {
				if (status){
					Util.dialog.tips("问卷发布成功");
					this.trigger('success');
					this.$el.hide();
				} else {
					Util.dialog.tips("问卷发布失败");
				}
				publishFlag = true;
			}, this));
		},
		saveData:function(){
			var module = this.steps[this.stepIndex];
			if (module && module.save){
				module.save();
			}
		},
		//stepIndexEnums:{ BASIC:0, QUESTIONS:1, ROUTER:2 },
		moduleConfigs:[, 'common/questionnaire/questions', 'common/questionnaire/router'], 
		loadModule:function(results){
			//if (results.status){
				this.hideAllModules();
				this.stepIndex++;
				if (!this.steps[this.stepIndex] || this.stepIndex == 2){
					require([this.moduleConfigs[this.stepIndex]], $.proxy(function(module){
						var data =  { questionnaireID:this.options.questionnaireID || results.QNR_ID
							, questionnairePageID:this.options.questionnairePageID || results.QNR_PAGE_ID };
						if (this.stepIndex == 1) {
							_.extend(data, { questionnairePageID:results.QNR_PAGE_ID });
							if (results){
								if (results.QNR_ID) {
									this.options.questionnaireID = results.QNR_ID;
								}
								if (results.QNR_PAGE_ID){
									this.options.questionnairePageID = results.QNR_PAGE_ID;
								}
							}
						}

						var moduleInstance = this.steps[this.stepIndex] = new module(data);
						if (this.stepIndex == 0 || this.stepIndex == 1){
							moduleInstance.on('saveSuccess', $.proxy(this.loadModule, this));
						}else if (this.stepIndex == 2){
							moduleInstance.on('validate', $.proxy(function(){
								$('#Publish', this.el).removeClass('disable');
							}, this));
							moduleInstance.on('startValidate', $.proxy(function(){
								$('#Publish', this.el).addClass('disable');
							}, this));
							moduleInstance.on('saveSuccess', $.proxy(function(){
								//Util.dialog.tips("路由保存成功");
							}, this));
						}
						if (moduleInstance.render){
							this.$container.append(moduleInstance.render().el);
						}else{
							this.$container.append(moduleInstance.el);
						}
						//module.init();
						
						//$container.append(module.getTpl());
					}, this));
					
				}else{
					this.steps[this.stepIndex].show();
				}
			//}
		},
		
		nextStep:function(e){
			if ($(e.currentTarget).attr('class').indexOf('disable') >= 0){
				return false;
			}
			var module = this.steps[this.stepIndex];
			if (this.stepIndex == 1){
				if (module.questions.models.length <= 0){
					Util.dialog.tips("问题列表不能为空");
					return false;
				}else if (module.articleStart.model.get('QU_CNTT').trim() == '尚未添加开篇词'){
					Util.dialog.tips("开篇词不能为空");
					return false;
				}else if (module.articleEnd.items.length <= 0){
					Util.dialog.tips("结束语不能为空");
					return false;
				}
				module.save();
			}else if (this.stepIndex == 2){
				module.save();
//				srvMap.add('questionnaire-defaultReouter', 'temp.json','front/sh/questionaire!index?uid=qoro019');
//				var cmd = { "QNR_ID":this.options.questionnaireID }
//				Util.ajax.postJson(srvMap.get("questionnaire-defaultReouter"), cmd, $.proxy(function(json, status) {
//					//Util.dialog.tips("默认路由初始化成功");
//					//this.steps[this.stepIndex].save();
//					//return false;
//					if (!status){
//						Util.dialog.tips("默认路由初始化失败");
//					}else{
//						this.steps[this.stepIndex].save();
//					}
//					
//					/*else{
//						Util.dialog.tips("问卷保存成功");
//						this.trigger('success');
//						this.$el.hide();
//					}*/
//
//				}, this));
			}else{
				if (this.stepIndex<3){
					this.steps[this.stepIndex].save();
				}
			}
			
			this.buttonStatusControl();
			
		}, 
		previousStep:function(){
			if (this.stepIndex > 0){
				this.hideAllModules();
				this.stepIndex--;
				this.steps[this.stepIndex].show();

			}
			this.buttonStatusControl();
		}
	});

	return obj;

});