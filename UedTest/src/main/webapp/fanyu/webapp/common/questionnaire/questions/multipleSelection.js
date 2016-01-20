define(['handlebars'
	, 'text!tpl/questionnaire/questions/multipleSelection.tpl', 'common/questionnaire/questions/question'
	, 'model/questionnaire/questions/multipleSelection'
	, 'collection/questionnaire/questions/multipleSelectionAnswer'
	, 'common/questionnaire/questions/multipleSelectionAnswer'
	, 'model/questionnaire/questions/multipleSelectionAnswer'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl, QuestionBase
	, MultipleSelectionModel
	, AnswerCollection, MultipleSelectionAnswer, MultipleSelectionAnswerModel
	, Backbone, $, _, common){

	var obj = QuestionBase.extend({
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
			//问题
			srvMap.add('questionnaire-singleSelectionAppend', 'questionnaire/questions/singleSelectionAppend.json'
				, 'front/sh/question!index?uid=mys0088');
			srvMap.add('questionnaire-singleSelectionUpdate', 'questionnaire/questions/singleSelectionUpdate.json'
				, 'front/sh/question!index?uid=mys0045');
			srvMap.add('questionnaire-singleSelectionDelete', 'questionnaire/questions/singleSelectionDelete.json'
				, 'front/sh/question!index?uid=mys0057');
			//答案
			srvMap.add('questionnaire-singleSelectionAnswerAppend', 'questionnaire/questions/singleSelectionAnswerAppend.json'
				, 'front/sh/question!index?uid=mys0089');
			srvMap.add('questionnaire-singleSelectionAnswerSort', 'questionnaire/questions/singleSelectionAnswerSort.json'
				, 'front/sh/question!index?uid=mys0061');
			this.$el.attr('questionnaireID', this.model.get('QU_ID'));
			if (options.view) {
				this.$el.addClass('viewMode');
			}
			this.answers = new AnswerCollection(this.model.get('ASWR_BEANS'));
			this.listenTo(this.answers, 'reset', this.addAll);
			this.listenTo(this.answers, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				if (this.model.get('addAnswer')){
					_.each(this.answers.models, $.proxy(function(model, i){
						this.addAnswer(model.toJSON(), i);	
					}, this));
				}else{
					this.answers.trigger('reset');
				}
			}, this), 100);
		},
		addOne:function(model, i){
			//var index = typeof(i) == 'object' ? i.length-1 : i ;
			var answer = new MultipleSelectionAnswer(_.extend(_.pick(this.options, ['questionnairePageID', 'questionnaireID']), { model:model }));
			$('.qAnswerList ul', this.el).append(answer.render().el);
			answer.on('moveDown', $.proxy(this.moveDown, this))
				.on('moveUp', $.proxy(this.moveUp, this));
		},
		addAll:function(){
			this.answers.each(this.addOne, this);
		}, 
		render: function() {
			//var json = _.extend(this.model.toJSON(), { index:this.options.index });
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
		updateUI:function(){
			//descriptionLabel descriptionBox
			$('.descriptionLabel', this.el).html(this.model.get('QU_DESC'));
			$('.descriptionBox', this.el).val(this.model.get('QU_DESC'));
			$('.titleLabel', this.el).html(this.model.get('QU_NM'));
			$('.titleBox', this.el).val(this.model.get('QU_NM'));

		},
		boxOver:function(e){ $(e.currentTarget).addClass('qBoxHover') },
		boxOut:function(e){ $(e.currentTarget).removeClass('qBoxHover') },
		edit:function(){
			this.$el.addClass('edit');
			_.each(this.answers.models, $.proxy(function(item, i){
				item.set('edit', Math.random()+1);
			},this));
		}, 
		cancelEdit:function(){
			this.model.set('edit', 0);
			this.$el.removeClass('edit');
			if ($('.titleBox>input', this.el).val() == '新建多选题'){
				this.deleteItem();
			}else{
				_.each(this.answers.models, $.proxy(function(item, i){
					item.set('edit', 0);
				},this));
			}
		},
		addAnswer:function(val){
			//var model = new MultipleSelectionModel();
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				, "QU_ID":this.model.get('QU_ID'), "QU_ASWR_SEQNO":$('.qAnswerList>ul>li', this.el).length, "ASWR_CNTT":"新答案" };
			if (val && val.ASWR_CNTT){
				_.extend(param, { ASWR_CNTT:val.ASWR_CNTT, QU_ASWR_SEQNO:val.QU_ASWR_SEQNO });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题答案添加失败");
				}else{
					//param.QU_ID = json.bean.QU_ID;
					var model = new MultipleSelectionAnswerModel();
					if (this.model.get('edit')){
						_.extend(param, {edit:1 });
					}
					model.set(_.extend(param, { ASWR_ID:json.bean.ASWR_ID }));
					this.answers.add(model);
				}
			}, this));

			//this.answers.create({"aswr_cntt":"新答案", "editStatus":1 });
		},
		destroy:function(e){
			this.$el.remove();
		},
		deleteItem:function(e){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QU_ID":this.model.get('QU_ID'), "QNR_ID": this.options.questionnaireID }
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题删除失败");
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
				, "QU_NM":qu_nm, "QU_SHARE_TYPE_CD":addLib, "QU_DESC":qu_desc, "QU_TYPE_CD":"30", "QU_ASWR_SEQNO":this.model.get('indexNumber') };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题保存失败");
				}else{
					//_.extend(param, { QU_ID:json.bean.QU_ID });
					this.model.set(param);
					this.updateUI();
					//this.render();
					this.$el.removeClass('edit');
					_.each(this.answers.models, $.proxy(function(item, i){
						item.set('save', Math.random());
					},this));
				}
			}, this));
			
		},	
		
	});

	return obj;
});