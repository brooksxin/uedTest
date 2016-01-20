define(['handlebars'
	, 'text!tpl/questionnaire/questions/multipleSelection.tpl'
	, 'collection/questionnaire/questions/multipleSelectionAnswer'
	, 'common/questionnaire/questions/multipleSelectionAnswer'
	, 'common/questionnaire/questions/question'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl
	, AnswerCollection, MultipleSelectionAnswer, Question
	, Backbone, $, _, common){

	var SingleSelection = Question.extend({
		
		template:Handlebars.compile(tpl), 
		events: _.extend(Question.prototype.events, { }),
		initialize: function(options) {
			this.options = options;
			this.answers = new AnswerCollection(this.model.get('answers'));
			this.listenTo(this.answers, 'reset', this.addAll);
			this.listenTo(this.answers, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				this.answers.trigger('reset');
			}, this), 100);
		},
		addOne:function(model, i){
			var index = typeof(i) == 'object' ? i.length-1 : i ;
			var answer = new MultipleSelectionAnswer({ model:model, index:index });
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
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
			
		
	});

	return SingleSelection;
});

/*
//

tagName: "div",
		//className: "qBox",

			//"mouseover":          "boxOver",
			//"mouseout":          "boxOut",
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .addAnswer": 					"addAnswer",
			"click .qEditIcon .qDel": 				"delete",

boxOver:function(e){ $(e.currentTarget).addClass('qBoxHover') },
		boxOut:function(e){ $(e.currentTarget).removeClass('qBoxHover') },
		edit:function(){
			this.$el.addClass('edit');
		}, 
		cancelEdit:function(){
			this.model.set('edit', 0);
			this.$el.removeClass('edit');
		},
		addAnswer:function(){
			this.answers.create({"aswr_cntt":"新答案", "editStatus":1 });
		},
		destroy:function(e){
			this.$el.remove();
		},
		delete:function(e){
			this.model.destroy();
		},
		saveEdit:function(){
			var qu_nm = $('.qDecorationTxt .titleBox>input', this.el).val();
			var qu_desc = $('.qDecorationTxt .descriptionBox', this.el).val();
			this.model.save({ "qu_nm": qu_nm, "qu_desc":qu_desc });
			this.$el.removeClass('edit');
		},*/