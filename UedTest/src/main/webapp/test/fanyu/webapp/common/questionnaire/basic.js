define(['backbone', 'handlebars', 'text!tpl/questionnaire/basic.tpl'
	, 'jquery', 'underscore', 'market.common', 'jquery.validate'
	, 'common/business/useForChannel', 'common/business/questionnaireType', 'common/business/projectBelong'
	, 'model/questionnaire/basic']
	, function(Backbone, Handlebars, tpl, $, _
	, common, jqueryValidate, UseForChannel, questionnaireType, projectBelong, BasicModel){

	var obj = Backbone.View.extend({
		tagName:'form', 
		//className:'question', 
		//questions:null, 
		validateForm:null, formInited:false, 
		template:Handlebars.compile(tpl), 
		events: {
			//"mouseover #J_questionRender>.qBox":       	"boxHover",		备用
		},
		initialize:function(options){
			//questionnaireID
			this.options = options;
			this.$el.attr('id', 'J_form_activity');
			srvMap.add('questionnaire-basicAppend', 'questionnaire/basicAppend.json', 'front/sh/questionaire!index?uid=qnrwq001');
			srvMap.add('questionnaire-basicUpdate', 'questionnaire/basicUpdate.json', 'front/sh/questionaire!index?uid=qnrwq003');
			this.model = new BasicModel();
			//this.listenTo(this.model, 'change', this.formInit);	备用
			if (this.options.questionnaireID){
				this.listenTo(this.model, 'change', this.formInit);
				this.model.fetch({ data: { QNR_ID:this.options.questionnaireID} });
				this.listenTo(this.model, 'error', $.proxy(function(){
					Util.dialog.tips("问卷信息初始化失败");
				}, this));
			}else{
				setTimeout($.proxy(this.formInit, this), 100);
			}
		}, 
		render:function(){
			this.$el.html(this.template({}));
			return this;
		},
		/*formLoad:function(){	2015/7/04 后可删除
			this.useForChannel.setValue(this.model.get('SUIT_RNG_ID'));
			$('select[name=QNR_TYPE_CD]', this.el).val(this.model.get('QNR_TYPE_CD'));
			$('select[name=QNR_BELG_DEPT_ID]', this.el).val(this.model.get('QNR_BELG_DEPT_ID'));
			$('input[name=QNR_NM]', this.el).val(this.model.get('QNR_NM'));
		},*/
		formInit:function(){
			if (this.formInited){
				return false;
			}
			this.formInited = true;
			var json = this.model.toJSON();
			this.useForChannel = new UseForChannel({ name:'SUIT_RNG_ID', defaultValue:json.SUIT_RNG_ID || '' });
			$('.useForChannel', this.$el).append(this.useForChannel.render().el);
			
			questionnaireType.init({ name:'QNR_TYPE_CD', defaultValue:json.QNR_TYPE_CD || ''});
			projectBelong.init({ name:'QNR_BELG_DEPT_ID', defaultValue:json.QNR_BELG_DEPT_ID || ''});
			$('.questionnaireType', this.$el).append(questionnaireType.getTpl());
			$('.projectBelong', this.$el).append(projectBelong.getTpl());
			$('.QNR_NM', this.$el).val(json.QNR_NM || '');

			this.validateForm = this.$el.validate({
		        rules: {
		            "QNR_NM": {
	                    required: true,
	                    maxlength:50,
	                }

		        },
		        messages: {
		            "QNR_NM": {
	                    required: "亲，名称必须要有噢@",
	                    maxlength:"亲，名称太长了，最多50个字，精简一下吧",
	                }
		        },
		        showErrors: function () {
		            this.defaultShowErrors();
		        },
		        success: function (currentDom) {
		        	//console.log('success')
		        }
		    });

		}, 
		save:function(successCallback){
			if (this.validateForm.form()){
				var param = _.object(_.map(this.$el.serializeArray(), _.values));
				_.extend(param, { SUIT_RNG_ID:this.useForChannel.getValue()  });
				if (!this.model.get('QNR_ID')){
					Util.ajax.postJsonSync(srvMap.get('questionnaire-basicAppend'), param, $.proxy(function(json, status) {
						if (status) {
							this.trigger('saveSuccess', _.extend(json.bean, { status:status }));
							_.extend(param, { QNR_ID:json.bean.QNR_ID, QNR_PAGE_ID:json.bean.QNR_PAGE_ID });
							this.model.set(param);
						}else{ 
							Util.dialog.tips("问卷信息添加失败");
						}
					}, this));
				}else{
					param = _.extend(this.model.toJSON(), param);
					Util.ajax.postJsonSync(srvMap.get('questionnaire-basicUpdate'), param, $.proxy(function(json, status) {
						if (status) {
							this.trigger('saveSuccess', { status:status, QNR_ID:json.bean.QNR_ID, QNR_PAGE_ID:json.bean.QNR_PAGE_ID });
							_.extend(param, { QNR_ID:json.bean.QNR_ID, QNR_PAGE_ID:json.bean.QNR_PAGE_ID });
							this.model.set(param);
						}else{ 
							Util.dialog.tips("问卷信息保存失败");
						}
					}, this));
				}
				
				
			}
			
		}, 
		hide:function(){
			this.$el.hide();
		}, 
		show:function(){
			this.$el.show();
		}
	});

	return obj;

});

