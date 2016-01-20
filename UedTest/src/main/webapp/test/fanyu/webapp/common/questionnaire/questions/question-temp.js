define(['backbone', 'jquery', 'underscore']
	, function(Backbone, $, _){

	var obj = Backbone.View.extend({
		tagName: "div",
		className: "qBox",
		events: {
			"mouseover":          "boxOver",
			"mouseout":          "boxOut",
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .addAnswer": 					"addAnswer",
			"click .qEditIcon .qDel": 				"delete",
			
		},
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
		},	
		
	});

	return obj;
});

