define(['handlebars'
	, 'text!tpl/questionnaire/questions/articleEndItem.tpl'
	, 'backbone', 'jquery', 'underscore']
	, function(Handlebars, tpl
		, Backbone, $, _){

	var obj = Backbone.View.extend({
        tagName: "div",
		className: "qBox",
		template:Handlebars.compile(tpl), 
		events: {
			"mouseover":          "boxOver",
			"mouseout":          "boxOut",
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .qEditIcon .qDel": 				"deleteItem",
			
		},
		initialize: function(options) {
			this.options = options;
			this.listenTo(this.model, 'remove', this.destroy);
			srvMap.add('questionnaire-articleEndItemUpdate', 'questionnaire/questions/articleEndItemUpdate.json'
				, 'front/sh/question!index?uid=jsy002');
			srvMap.add('questionnaire-articleEndItemDelete', 'questionnaire/questions/articleEndItemDelete.json'
				, 'front/sh/question!index?uid=jsy003');
			if (this.model.get('edit')){
				this.edit();
			}
			/*this.items = new ArticleEndItemCollection(options.beans);
			this.listenTo(this.items, 'reset', this.addAll);
			this.listenTo(this.items, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				this.items.trigger('reset');
			}, this), 100);*/
		},
		render: function() {
			//var json = _.extend(this.model.toJSON(), { index:this.options.index });
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
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
		destroy:function(e){
			this.$el.remove();
		},
		deleteItem:function(e){
			//_.pick(this.options, ['questionnaireID', 'questionnairePageID'])
			var param = { "QU_ID": this.model.get('QU_ID'), "QNR_ID":this.options.questionnaireID, "QNR_PAGE_ID":this.options.questionnairePageID };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-articleEndItemDelete'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("结束语删除失败");
				}else{
					this.model.trigger('destroy', this.model);
				}
			}, this));
		},
		saveEdit:function(){
			var QU_NM = $('.qDecorationTxt .box', this.el).val();
			//this.model.save({ "qu_nm": qu_nm, "qu_desc":qu_desc });
			
			
			var param = { "QU_ID": this.model.get('QU_ID'), "QU_NM":QU_NM };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-articleEndItemUpdate'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("结束语保存失败");
				}else{
					this.model.set(param);
					this.render();
					this.$el.removeClass('edit');
				}
			}, this));

			
		},	
		
	});

	return obj;
});