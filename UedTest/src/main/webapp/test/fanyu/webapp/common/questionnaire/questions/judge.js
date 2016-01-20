define(['handlebars'
	, 'text!tpl/questionnaire/questions/judge.tpl', 'common/questionnaire/questions/question'
	, 'model/questionnaire/questions/judge'
	, 'model/questionnaire/questions/judgeAnswer'
	
	, 'collection/questionnaire/questions/judgeAnswer'
	
	, 'common/questionnaire/questions/judgeAnswer'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl, QuestionBase
	, JudgeModel, JudgeAnswerModel
	, AnswerCollection
	, JudgeAnswer
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
			this.$el.addClass('judge');
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
			this.$el.attr('questionnaireID', this.model.get('QU_ID'));
			if (options.view) {
				this.$el.addClass('viewMode');
			}
			this.answers = new AnswerCollection(this.model.get('ASWR_BEANS'));
			this.listenTo(this.answers, 'reset', this.addAll);
			this.listenTo(this.answers, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				this.answers.trigger('reset');
				if (this.model.get('initAnswer')){
					this.answerNum = 0;
					this.initAnswer();

				}
			}, this), 100);
		},
		addOne:function(model, i){
			//var index = typeof(i) == 'object' ? i.length-1 : i ;
			var answer = new JudgeAnswer(_.extend(_.pick(this.options, ['questionnairePageID', 'questionnaireID']), { model:model }));
			$('.qAnswerList ul', this.el).append(answer.render().el);
			answer.on('moveDown', function($el){
				var $nextEl = $el.next();
				if ($nextEl) { 
					$el.insertAfter($nextEl);
				}
			}).on('moveUp', function($el){
				var $prevEl = $el.prev();
				if ($prevEl) { 
					$el.insertBefore($prevEl);
				}
			});
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
		}, 
		cancelEdit:function(){
			this.model.set('edit', 0);
			this.$el.removeClass('edit');
			if ($('.titleBox>input', this.el).val() == '新建判断题'){
				this.deleteItem();
			}
		},
		addAnswer:function(){
			//var model = new JudgeModel();
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				, "QU_ID":this.model.get('QU_ID'), "QU_ASWR_SEQNO":$('.qAnswerList>ul>li', this.el).length, "ASWR_CNTT":"新答案" };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("判断题答案添加失败");
				}else{
					var model = new JudgeAnswerModel();
					model.set(_.extend(param, {edit:1, ASWR_ID:json.bean.ASWR_ID }));
					this.answers.add(model);
				}
			}, this));
		},
		answerNum:0, 
		judgeAnswer:{ '0':'是', '1':'否' }, 
		initAnswer:function(){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				, "QU_ID":this.model.get('QU_ID'), "QU_ASWR_SEQNO":$('.qAnswerList>ul>li', this.el).length, "ASWR_CNTT":this.judgeAnswer[this.answerNum] };
			if (this.answerNum < 2){
				var model = new JudgeAnswerModel();
				//model.set(_.extend(param, {ASWR_ID:json.bean.ASWR_ID }));
				model.set(param);
				this.answers.add(model);
				this.answerNum++;
				this.initAnswer();
				
			}
			

		}, 
		destroy:function(e){
			this.$el.remove();
		},
		deleteItem:function(e){
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QU_ID":this.model.get('QU_ID'), "QNR_ID": this.options.questionnaireID }
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("判断题删除失败");
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
				, "QU_NM":qu_nm, "QU_SHARE_TYPE_CD":addLib, "QU_DESC":qu_desc, "QU_TYPE_CD":"40", "QU_ASWR_SEQNO":this.model.get('indexNumber') };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("判断题保存失败");
				}else{
					this.model.set(param);
					this.updateUI();
					this.$el.removeClass('edit');
				}
			}, this));
			
		},	
		
	});

	return obj;
});
