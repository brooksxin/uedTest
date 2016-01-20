define(['handlebars'
	, 'text!tpl/questionnaire/questions/multipleSelectionAnswer.tpl'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl
	, Backbone, $, _, common){

	var view = Backbone.View.extend({
		tagName: "li",
		template:Handlebars.compile(tpl), 
		events: {
			"click .editIcon":          "edit",
			"click .delIcon":          "deleteItem",
			"click .cancelIcon":        "cancelEdit",
			"click .saveIcon":          "save",
			"click .downIcon": 			"moveDown",
			"click .upIcon": 			"moveUp",
			
		},
		initialize: function(options) {
			this.options = options;
			//questionnaire-singleSelectionAnswerUpdate
			srvMap.add('questionnaire-singleSelectionAnswerUpdate', 'questionnaire/questions/singleSelectionAnswerUpdate.json'
				, 'front/sh/question!index?uid=mys0046');
			srvMap.add('questionnaire-singleSelectionAnswerDelete', 'questionnaire/questions/singleSelectionAnswerDelete.json'
				, 'front/sh/question!index?uid=mys0057');
			this.listenTo(this.model, 'remove', this.destroy);
			this.listenTo(this.model, 'change:save', this.save);
			this.listenTo(this.model, 'change:edit', this.editJudge);
			this.$el.attr('answerid', this.model.get('ASWR_ID'));
			if (this.model.get('edit')){
				this.edit();
			}
		},
		render: function() {
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
		editJudge:function(){
			if (this.model.get('edit')){
				this.edit();
			}else{
				this.cancelEdit();
			}
		},
		save:function(){
			var answer =  $('.answerBox', this.el).val();
			var param = { "QU_ID":this.model.get('QU_ID'), "ASWR_ID":this.model.get('ASWR_ID'), "QU_ASWR_SEQNO":this.model.get('QU_ASWR_SEQNO')
				, "QNR_ID": this.options.questionnaireID || this.model.get('QNR_ID'), "QNR_PAGE_ID": this.options.questionnairePageID || this.model.get('QNR_PAGE_ID')
				, "ASWR_CNTT":answer };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题答案保存失败");
				}else{
					this.model.set(param);
					this.render();
					this.$el.removeClass('answerEdit');
				}
			}, this));
		},
		cancelEdit:function(){
			this.$el.removeClass('answerEdit');
			this.model.set('editStatus', 0);
		},
		edit:function(){
			this.$el.addClass('answerEdit');
		},
		deleteItem:function(){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID || this.model.get('QNR_PAGE_ID'), "QU_ID":this.model.get('QU_ID')
				, "QNR_ID": this.options.questionnaireID || this.model.get('QNR_ID'), "ASWR_ID": this.model.get('ASWR_ID') };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题答案删除失败");
				}else{
					this.model.trigger('destroy', this.model);
				}
			}, this));
		},
		destroy:function(){
			this.$el.remove();
		},
		/*alphabetGet:function(){
			return { 0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J' }[this.options.index];
		},*/ 
		moveDown:function(e){
			this.trigger('moveDown', this.$el);
		},
		moveUp:function(e){
			this.trigger('moveUp', this.$el);
		},
	});

	return view;
});