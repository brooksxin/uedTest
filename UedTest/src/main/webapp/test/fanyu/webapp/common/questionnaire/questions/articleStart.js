define(['handlebars'
	, 'text!tpl/questionnaire/questions/articleStart.tpl'
	, 'model/questionnaire/questions/articleStart'
	, 'backbone', 'jquery', 'underscore']
	, function(Handlebars, tpl
		, ArticleStartModel
		, Backbone, $, _){

	var obj = Backbone.View.extend({
        //el:'.questionRight>.articleStart', 
		template:Handlebars.compile(tpl), 
		events: {
			"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			//"click .qEditIcon .qDel": 				"delete",
			
			
		},
		initialize: function(options) {
			srvMap.add('questionnaire-articleStartSave', 'questionnaire/questions/articleStartSave.json'
				, 'front/sh/question!index?uid=kpc001');
			this.options = options;
			this.model = new ArticleStartModel(options.json.bean);

			/*setTimeout($.proxy(function(){
				this.items.trigger('reset');
			}, this), 100);*/
		},
		render: function() {
			//var json = _.extend(this.model.toJSON(), { index:this.options.index });
			var json = this.model.toJSON();
			this.$el.html(this.template(json));
			return this;
		}, 
		edit:function(e){
			if (this.model.get('QU_CNTT').trim() == '尚未添加开篇词'){
				$('.box', this.$el).val('');
			}
			this.$el.addClass('articleStartEdit');
		}, 
		cancelEdit:function(){
			this.$el.removeClass('articleStartEdit');
		},
		saveEdit:function(){
			var QU_CNTT = $('.qDecorationTxt .box', this.el).val();
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				,"QU_ID": this.model.get('QU_ID'), "QU_CNTT":QU_CNTT };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-articleStartSave'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("开篇词保存失败");
				}else{
					this.model.set(param);
					this.render();
					this.$el.removeClass('articleStartEdit');
				}
			}, this));

			
		},	
	});

	return obj;
});