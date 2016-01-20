define(['handlebars'
	, 'text!tpl/questionnaire/questions/articleEnd.tpl'
	, 'common/questionnaire/questions/articleEndItem'
	, 'collection/questionnaire/questions/articleEndItem'
	, 'model/questionnaire/questions/articleEndItem'
	, 'backbone', 'jquery', 'underscore']
	, function(Handlebars, tpl
		, ArticleEndItem, ArticleEndItemCollection, ArticleEndItemModel
		, Backbone, $, _){

	var obj = Backbone.View.extend({
        //el:'.questionRight>.articleEndContainer', 
		template:Handlebars.compile(tpl), 
		events: {
			/*"click .qEditIcon .qEdit":          	"edit",
			"click .qDecorationEdit .qCancel": 		"cancelEdit",
			"click .qDecorationEdit .qSave":        "saveEdit",
			"click .qEditIcon .qDel": 				"delete",
			*/
			"click .addAnswer": 					"addItem",
			
		},
		initialize: function(options) {
			//this.$el = $('.questionRight>.articleEndContainer');
			srvMap.add('questionnaire-articleEndItemAppend', 'questionnaire/questions/articleEndItemAppend.json'
				, 'front/sh/question!index?uid=jsy001');
			this.options = options;
			this.items = new ArticleEndItemCollection(options.json.beans);
			this.listenTo(this.items, 'reset', this.addAll);
			this.listenTo(this.items, 'add', this.addOne);
			this.listenTo(this.model, 'remove', this.destroy);
			setTimeout($.proxy(function(){
				this.items.trigger('reset');
			}, this), 100);
		},
		addOne:function(model, i){
			//var index = typeof(i) == 'object' ? i.length-1 : i ;
			var data = _.pick(this.options, ['questionnaireID', 'questionnairePageID']);
			_.extend(data, { model:model })
			var answer = new ArticleEndItem(data);
			$('.list', this.el).append(answer.render().el);
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
			this.items.each(this.addOne, this);
			if (this.items.length<=0){
				this.addRealItem('答题结束，谢谢您的参与');
			}
		}, 
		render: function() {
			//var json = _.extend(this.model.toJSON(), { index:this.options.index });
			//var json = this.model.toJSON();
			this.$el.html(this.template({}));
			return this;
		}, 
		addRealItem:function(questionnaireName){
			var index = Number($('.articleEndContainer>.list>.qBox').length) + 1000;
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID
				, "QU_NM":questionnaireName, "QU_ASWR_SEQNO":index };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-articleEndItemAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("结束语添加失败");
				}else{
					_.extend(param, { edit:1, QU_ID:json.bean.QU_ID });
					var model = new ArticleEndItemModel(param);
					this.items.add(model);
					//this.model.set(param);
				}
			}, this));
		},
		addItem:function(){
			this.addRealItem('');
		}
	});

	return obj;
});