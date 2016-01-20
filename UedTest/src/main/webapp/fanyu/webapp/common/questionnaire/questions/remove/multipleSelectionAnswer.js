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
			"click .delIcon":          "delete",
			"click .cancelIcon":        "cancelEdit",
			"click .saveIcon":          "save",
			"click .downIcon": 			"moveDown",
			"click .upIcon": 			"moveUp",
			
		},
		initialize: function(options) {
			this.options = options;
			this.listenTo(this.model, 'remove', this.destroy);
			if (this.model.get('editStatus')){
				this.edit();
			}
		},
		render: function() {
			var json = this.model.toJSON();
			_.extend(json, { alphabet:this.alphabetGet() })
			this.$el.html(this.template(json));
			return this;
		}, 

		save:function(){
			//保存代码
			this.model.save();
			this.$el.removeClass('answerEdit');
		},
		cancelEdit:function(){
			this.$el.removeClass('answerEdit');
			this.model.set('editStatus', 0);
		},
		edit:function(){
			this.$el.addClass('answerEdit');
		},
		delete:function(){
			this.model.destroy();
		},
		destroy:function(){
			this.$el.remove();
		},
		alphabetGet:function(){
			return { 0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J' }[this.options.index];
		}, 
		moveDown:function(e){
			this.trigger('moveDown', this.$el);
		},
		moveUp:function(e){
			this.trigger('moveUp', this.$el);
		},
	});

	return view;
});