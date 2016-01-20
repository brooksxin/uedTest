
define(['handlebars'
	, 'text!tpl/questionnaire/questions/questionAnswer.tpl', 'common/questionnaire/questions/question'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl, QuestionBase
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
			this.$el.addClass('questionAnswer');
			//问题
			srvMap.add('questionnaire-questionAnswerAppend', 'questionnaire/questions/questionAnswerAppend.json'
				, 'front/sh/question!index?uid=mys0088');
			srvMap.add('questionnaire-questionAnswerUpdate', 'questionnaire/questions/questionAnswerUpdate.json'
				, 'front/sh/question!index?uid=mys0045');
			srvMap.add('questionnaire-questionAnswerDelete', 'questionnaire/questions/questionAnswerDelete.json'
				, 'front/sh/question!index?uid=mys0057');
			this.$el.attr('questionnaireID', this.model.get('QU_ID'));
			if (options.view) {
				this.$el.addClass('viewMode');
			}
			this.listenTo(this.model, 'remove', this.destroy);
		},
		render: function() {
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
		/*updateUI:function(){
			$('.descriptionLabel', this.el).html(this.model.get('QU_DESC'));
			$('.descriptionBox', this.el).val(this.model.get('QU_DESC'));
			$('.titleLabel', this.el).html(this.model.get('QU_NM'));
			$('.titleBox', this.el).val(this.model.get('QU_NM'));
		},*/
		boxOver:function(e){ $(e.currentTarget).addClass('qBoxHover') },
		boxOut:function(e){ $(e.currentTarget).removeClass('qBoxHover') },
		edit:function(){
			this.$el.addClass('edit');
		}, 
		cancelEdit:function(){
			this.model.set('edit', 0);
			this.$el.removeClass('edit');
			if ($('.titleBox>input', this.el).val() == '新建问答题'){
				this.deleteItem();
			}
		},
		destroy:function(e){
			this.$el.remove();
		},
		deleteItem:function(e){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID, "QU_ID":this.model.get("QU_ID") }
			Util.ajax.postJsonSync(srvMap.get('questionnaire-questionAnswerDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("问答题删除失败");
				}else{
					this.model.trigger('destroy', this.model);
				}
			}, this));
		},
		saveEdit:function(){
			if (!this.validate()){
				return false;
			}
			var qu_nm = $('.qDecorationTxt .titleBox>input', this.el).val();
			var qu_desc = $('.qDecorationTxt .descriptionBox', this.el).val();
			var addLib = $('.qDecorationEdit>.addLib', this.el).is(':checked')?'02':'01';
			var param = { "QU_ID":this.model.get('QU_ID'), "QNR_ID": this.options.questionnaireID, "QNR_PAGE_ID": this.options.questionnairePageID
				, "QU_NM":qu_nm, "QU_SHARE_TYPE_CD":addLib, "QU_DESC":qu_desc, "QU_TYPE_CD":"50", "QU_ASWR_SEQNO":this.model.get('indexNumber') };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-questionAnswerUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("问答题保存失败");
				}else{
					this.model.set(param);
					this.render();
					this.$el.removeClass('edit');
				}
			}, this));
			
		},	
		
	});

	return SingleSelection;
});