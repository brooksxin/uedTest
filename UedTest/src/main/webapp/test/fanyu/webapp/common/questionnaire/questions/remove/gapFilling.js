define(['handlebars'
	, 'text!tpl/questionnaire/questions/gapFilling.tpl'
	, 'collection/questionnaire/questions/gapFillingAnswer'
	, 'common/questionnaire/questions/gapFillingAnswer'
	, 'common/questionnaire/questions/question'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl
	, AnswerCollection, GapFillingAnswer, Question
	, Backbone, $, _, common){

	var obj = Question.extend({
		template:Handlebars.compile(tpl), 
		//events: _.extend(Question.prototype.events, { }), 
		initialize: function(options) {
			this.options = options;
			this.answers = new AnswerCollection(this.model.get('answers'));
			this.listenTo(this.answers, 'reset', this.addAll);
			this.listenTo(this.answers, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				this.answers.trigger('reset');
				/*
				if (this.model.get('add')){
					this.answers.create({"aswr_cntt":"是" });
					this.answers.create({"aswr_cntt":"否" });
					this.answers.create({"aswr_cntt":"不作答" });
				}
				*/
			}, this), 100);
			this.$el.addClass('gapFilling')
		},
		addOne:function(model, i){
			var index = typeof(i) == 'object' ? i.length-1 : i ;
			var answer = new GapFillingAnswer({ model:model, index:index });
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
		addAnswer:function(){
			this.answers.create({"aswr_cntt":"新答案", "editStatus":1 });
		},
		
	});

	return obj;
});


