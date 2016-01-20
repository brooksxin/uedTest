define(['handlebars'
	, 'text!tpl/questionnaire/questions/catalog.tpl', 'model/questionnaire/questions/catalog'
	, 'backbone', 'jquery', 'underscore', 'market.common', 'handlebars.helpers']
	, function(Handlebars, tpl
	,CatalogModel
	, Backbone, $, _, common){

	var obj = Backbone.View.extend({
		tagName: "li",
		//className: "qBox",
		template:Handlebars.compile(tpl), 
		events: {
			/*"mouseover":          "boxOver",
			"mouseout":          "boxOut",
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .addAnswer": 					"addAnswer",
			*/
			"click a": 				"triggerClick",
			
		},
		initialize: function(options) {
			this.options = options;
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			var json = this.model.toJSON();
			this.$el.html(this.template(_.extend(json, this.options)));
			var $prev = this.$el.prev();
			var $next = this.$el.next();
			if ($prev.length>0){
				$prev.find('.current').removeClass('current');
			}
			if ($next.length>0){
				$next.find('.current').removeClass('current');
			}
			return this;
		}, 
		triggerClick:function(){
			this.trigger('click', this.model, this.$el);
			return false;
		}
		
	});

	return obj;
});