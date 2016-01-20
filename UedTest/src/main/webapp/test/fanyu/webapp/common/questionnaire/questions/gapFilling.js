define(['handlebars'
	, 'text!tpl/questionnaire/questions/gapFilling.tpl', 'common/questionnaire/questions/question'
	, 'model/questionnaire/questions/gapFilling', 'model/questionnaire/questions/gapFillingChild'
	, 'collection/questionnaire/questions/gapFillingChild'
	, 'common/questionnaire/questions/gapFillingChild'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl, QuestionBase
	, GapFillingModel, GapFillingChildModel
	, ChildCollection
	, GapFillingChild
	, Backbone, $, _, common){

	var SingleSelection = QuestionBase.extend({
		tagName: "div",
		className: "qBox",
		template:Handlebars.compile(tpl), 
		events: _.extend(QuestionBase.prototype.events, {
			"mouseover":          "boxOver",
			"mouseout":          "boxOut",
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .addAnswer": 					"addAnswer",
			"click .qEditIcon .qDel": 				"deleteItem",
			
		}),
		initialize: function(options) {
			this.options = options;
			this.$el.addClass('gapFilling');
			//问题
			srvMap.add('questionnaire-gapFillingAppend', 'questionnaire/questions/gapFillingAppend.json'
				, 'front/sh/question!index?uid=ptkt001');
			srvMap.add('questionnaire-gapFillingUpdate', 'questionnaire/questions/gapFillingUpdate.json'
				, 'front/sh/question!index?uid=ptkt002');
			srvMap.add('questionnaire-gapFillingDelete', 'questionnaire/questions/gapFillingDelete.json'
				, 'front/sh/question!index?uid=ptkt003');
			//答案
			srvMap.add('questionnaire-gapFillingChildAppend', 'questionnaire/questions/gapFillingChildAppend.json'
				, 'front/sh/question!index?uid=ctkt001');
			this.$el.attr('questionnaireID', this.model.get('QU_ID'));
			if (options.view) {
				this.$el.addClass('viewMode');
			}
			this.childs = new ChildCollection(this.model.get('SUB_QU_BEANS'));
			this.listenTo(this.childs, 'reset', this.addAll);
			this.listenTo(this.childs, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				//this.childs.trigger('reset');
				if (this.model.get('addAnswer')){
					_.each(this.childs.models, $.proxy(function(model, i){
						this.addAnswer(model.toJSON(), i);	
					}, this));
				}else{
					this.childs.trigger('reset');
				}
			}, this), 100);
		},
		addOne:function(model, i){
			//var index = typeof(i) == 'object' ? i.length-1 : i ;
			var answer = new GapFillingChild(_.extend(_.pick(this.options, ['questionnairePageID', 'questionnaireID']), { model:model }));
			$('.qAnswerList ul', this.el).append(answer.render().el);
		},
		addAll:function(){
			this.childs.each(this.addOne, this);
		}, 
		render: function() {
			//var json = _.extend(this.model.toJSON(), { index:this.options.index });
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
		updateUI:function(){
			//descriptionLabel descriptionBox
			$('.descriptionLabel', this.el).html(this.model.get('QU_NM'));
			$('.descriptionBox', this.el).val(this.model.get('QU_NM'));
			//$('.titleLabel', this.el).html(this.model.get('QU_NM'));
			//$('.titleBox', this.el).val(this.model.get('QU_NM'));

		},
		boxOver:function(e){ $(e.currentTarget).addClass('qBoxHover') },
		boxOut:function(e){ $(e.currentTarget).removeClass('qBoxHover') },
		edit:function(){
			this.$el.addClass('edit');
			_.each(this.childs.models, $.proxy(function(item, i){
				item.set('edit', Math.random()+1);
			},this));
		}, 
		cancelEdit:function(){
			this.model.set('edit', 0);
			this.$el.removeClass('edit');
			if ($('.titleBox>input', this.el).val() == '新建填空题'){
				this.deleteItem();
			}else{
				_.each(this.childs.models, $.proxy(function(item, i){
					item.set('edit', 0);
				},this));
			}
		},
		addAnswer:function(val){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				, "QU_ID":this.model.get('QU_ID'), "QU_ASWR_SEQNO":$('.qAnswerList>ul>li', this.el).length
				, "QU_NM":"新建子问题", "QU_SHOW_MODE_CD":"1" };
			if (val && val.QU_NM){
				//, QU_ASWR_SEQNO:val.QU_ASWR_SEQNO
				_.extend(param, { QU_NM:val.QU_NM });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-gapFillingChildAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("填空题子问题添加失败");
				}else{
					var model = new GapFillingChildModel();
					if (this.model.get('edit')){
						_.extend(param, {edit:1 });
					}
					model.set(_.extend(param, { QU_ID:json.bean.QU_ID }));
					this.childs.add(model);
				}
			}, this));

		},
		destroy:function(e){
			this.$el.remove();
		},
		deleteItem:function(e){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QU_ID":this.model.get('QU_ID'), "QNR_ID": this.options.questionnaireID }
			Util.ajax.postJsonSync(srvMap.get('questionnaire-gapFillingDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("填空题删除失败");
				}else{
					this.model.trigger('destroy', this.model);
				}
			}, this));
		},
		saveEdit:function(){
			if (!this.validate()){
				return false;
			}
			var qu_nm = $('.qDecorationTxt .descriptionBox', this.el).val();
			var addLib = $('.qDecorationEdit>.addLib', this.el).is(':checked')?'02':'01';
			var param = { "QU_ID":this.model.get('QU_ID'), "QNR_ID": this.options.questionnaireID, "QNR_PAGE_ID": this.options.questionnairePageID
				, "QU_SHARE_TYPE_CD":addLib, "QU_NM":qu_nm, "QU_TYPE_CD":"10" };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-gapFillingUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("填空题保存失败");
				}else{
					this.model.set(param);
					this.updateUI();
					this.$el.removeClass('edit');
					_.each(this.childs.models, $.proxy(function(item, i){
						item.set('save', Math.random());
					},this));
				}
			}, this));
			
		},	
		
	});

	return SingleSelection;
});