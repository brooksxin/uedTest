define(['handlebars', 'text!tpl/questionnaire/questions.tpl', 'text!tpl/questionnaire/questions-catalog.tpl'
	, 'common/questionnaire/questions/singleSelection'
	, 'common/questionnaire/questions/gapFilling'
	, 'common/questionnaire/questions/multipleSelection'
	, 'common/questionnaire/questions/judge'
	, 'common/questionnaire/questions/gapFilling'
	, 'common/questionnaire/questions/questionAnswer'
	, 'common/questionnaire/questions/dateQuestion'
	, 'common/questionnaire/questions/catalog'

	, 'collection/questionnaire/questions'
	, 'common/key'
	, 'common/questionnaire/questions/articleStart'
	, 'common/questionnaire/questions/articleEnd'
	
	
	, 'model/questionnaire/questions/singleSelection'
	, 'model/questionnaire/questions/multipleSelection'
	, 'model/questionnaire/basic'
	, 'model/questionnaire/questions/judge'
	, 'model/questionnaire/questions/gapFilling'
	, 'model/questionnaire/questions/questionAnswer'
	, 'model/questionnaire/questions/dateQuestion'

	, 'jquery', 'underscore', 'market.common', 'handlebars.helpers'
	, 'style!css/questionnaire/questions.css', 'jquery.sortable', 'handlebars.helpers']
	, function(Handlebars, tpl, catalogTpl
	, SingleSelection, GapFilling, MultipleSelection, Judge, GapFilling, QuestionAnswer, DateQuestion, Catalog
	, QuestionCollection, Key, ArticleStart, ArticleEnd
	, SingleSelectionModel, MultipleSelectionModel, BasicModel, JudgeModel, GapFillingModel, QuestionAnswerModel, DateQuestionModel
	, $, _, common){

	var obj = Backbone.View.extend({
		tagName:'div', 
		className:'question', 
		questions:null, 
		template:Handlebars.compile(tpl), 
		events: {
			//"mouseover #J_questionRender>.qBox":       	"boxHover",
			//"mouseout #J_questionRender>.qBox":       	"boxOut",
			//"mouseover .questionRight>.qBox":       	"boxHover",
			//"mouseout .questionRight>.qBox":       	"boxOut",
			"click .questionRight>.articleStart .qEdit":       	"articleStartEdit",
			"click .questionRight>.articleStart .qCancel":       "articleStartCancel",
			"click .questionRight>.articleStart .qSave":       "articleStartSave",
			
			"click .QuersionChoicBtn>.singleSelection":       	"addSingleSelection",
			"click .QuersionChoicBtn>.multipleSelection":       	"addMultipleSelection",
			"click .QuersionChoicBtn>.judge":       	"addJudge",
			"click .QuersionChoicBtn>.gapFilling":       	"addGapFilling",
			"click .QuersionChoicBtn>.questionAnswer":       	"addQuestionAnswer",
			"click .QuersionChoicBtn>.dateQuestion":       	"addDateQuestion",
			"click .QuersionChoicBtn>.library":       	"openQuestionSelector",

			//"scroll"		:"layerScroll",
		},
		initialize:function(options){
			srvMap.add('questionnaire-articleStartGet', 'questionnaire/questions/articleStartGet.json'
				, 'front/sh/question!index?uid=kpc004');
			srvMap.add('questionnaire-singleSelectionAppend', 'questionnaire/questions/singleSelectionAppend.json'
				, 'front/sh/question!index?uid=mys0088');
			srvMap.add('questionnaire-gapFillingAppend', 'questionnaire/questions/gapFillingAppend.json'
				, 'front/sh/question!index?uid=ptkt001');
			srvMap.add('questionnaire-questionSort', 'questionnaire/questions/questionSort.json'
				, 'front/sh/question!index?uid=mys0060');
			//questionnaire-questionSort
			this.options = options;
			var data = { QNR_ID:options.questionnaireID, OP_TYPE:'preview' };	// _.pick(options, ['questionnaireID']);
			this.questions = new QuestionCollection([]);
			this.listenTo(this.questions, 'reset', this.addAll);
			this.listenTo(this.questions, 'reset', this.catalogAddAll);
			this.listenTo(this.questions, 'add', this.addOne);
			this.listenTo(this.questions, 'add', this.catalogAddOne);
			this.listenTo(this.questions, 'remove', $.proxy(function(model){
				this.questions.each(function (model, index) {
		            model.set('indexNumber', index+1);
		        });
				this.catalogAddAll();
			},this));

			this.questions.fetch({ reset:true, dataType: "json", data:data, error:function(p0, p1, p2){
				console.log('error')
			} });
			setTimeout($.proxy(function(){
				this.articleStartInit();
			},this), 100);
			$('#mainRight').on('scroll', $.proxy(this.layerScroll, this));
			this.updateFunctions = { '10':$.proxy(this.addGapFilling, this), '20':$.proxy(this.addSingleSelection, this)
				, '30':$.proxy(this.addMultipleSelection, this), '40':$.proxy(this.addJudge, this)
				, '50':$.proxy(this.addQuestionAnswer, this), '60':$.proxy(this.addDateQuestion, this) }
		}, 
		render:function(){
			this.$el.html(this.template({}));
			return this;
		},
		questionModels:{ '10':GapFillingModel, '20':SingleSelectionModel, '30':MultipleSelectionModel
			, '40':JudgeModel, '50':QuestionAnswerModel, '60':DateQuestionModel }, 
		appendSelectQuestion:function(questionnaireIDStr){
			srvMap.add('questionnaire-questionsGetFromIDStr', 'questionnaire/questionsGetFromIDStr.json'
			    		, 'front/sh/question!index?uid=mys0059');
			Util.ajax.postJsonSync(srvMap.get('questionnaire-questionsGetFromIDStr'), { QU_ID:questionnaireIDStr }, $.proxy(function(json, status) {
	    		if (status) {
	    			_.each(json.object, $.proxy(function(item, i){
	    				var updateFunction = this.updateFunctions[item.QU_TYPE_CD];
	    				if (updateFunction){
	    					updateFunction(item);
	    				}
	    			}, this));
				}
			}, this));
		},
		openQuestionSelector:function(){
			require(['common/questionnaire/questions/questionSelector'], $.proxy(function(QuestionSelector){
			    var selector = new QuestionSelector();
			    selector.on('select', $.proxy(this.appendSelectQuestion, this));
			}, this));
		},
		layerScroll:function(e, options){
			if ($(e.currentTarget).scrollTop() >= 120){
				var $catalog = $('.question>.questionLeft .querstionCatlog');
				if ($catalog.attr('class').indexOf('fixed') < 0){
					$catalog.addClass('fixed');
				}
			}else{
				$('.question>.questionLeft  .querstionCatlog').removeClass('fixed');
			}
		},
		articleStartInit:function(){
			var param = { QNR_ID:this.options.questionnaireID };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-articleStartGet'), param, $.proxy(function(json, status) {
				if (status) {
					var data = _.pick(this.options, ['questionnaireID', 'questionnairePageID']);
					_.extend(data, { json:json });
					this.articleStart = new ArticleStart(_.extend(data, { el:$('.questionRight>.articleStart', this.el)[0] })).render();
					this.articleEnd = new ArticleEnd(_.extend(data, { el:$('.questionRight>.articleEndContainer', this.el)[0] })).render();
				}else{ 
					Util.dialog.tips("开篇词和结束语初始化失败");
				}
			}, this));
		},
		addOne:function(model, i){
			var $container = $('#J_questionRender', this.el);
			var indexNumber = typeof(i) === 'object'? i.length : ++i;
			if (!model.get('indexNumber')) {
				model.set('indexNumber', indexNumber);
			}
			var questions = { '10':GapFilling, '20':SingleSelection, '30':MultipleSelection, '40':Judge, '50':QuestionAnswer, '60':DateQuestion  }
			if (model.get('QU_TYPE_CD') == Key.QuestionType.SingleSelection 
				|| model.get('QU_TYPE_CD') == Key.QuestionType.MultipleSelection
				|| model.get('QU_TYPE_CD') == Key.QuestionType.Judge
				|| model.get('QU_TYPE_CD') == Key.QuestionType.GapFilling
				|| model.get('QU_TYPE_CD') == Key.QuestionType.QuestionAnswer
				|| model.get('QU_TYPE_CD') == Key.QuestionType.DateQuestion
				){
				var data = _.extend(_.pick(this.options, ['questionnaireID', 'questionnairePageID']), { model:model, indexNumber:indexNumber });
				var obj = new questions[model.get('QU_TYPE_CD')](data);
				obj.render && $container.append(obj.render().el);
				if (model.get('edit')){
					obj.edit();
				}
				obj.on('update-sort', $.proxy(function(model, position){
					this.questions.remove(model, { silent: true });
					this.questions.each(function (model, index) {
		            	var ordinal = index+1;
			            if (index >= position) {
			                ordinal += 1;
			            }
			            model.set('indexNumber', ordinal);
			        });       
			        model.set('indexNumber', position+1);
			        this.questions.add(model, {at: position, silent: true });

				}, this));
			}

			

		},
		addAll:function(result, options){
			_.each(result.models, $.proxy(this.addOne, this));
			this.$list = $('#J_questionRender', this.el);
			this.$list.sortable({
				stop:$.proxy(this.sort, this)
			});
		},
		catalogAddOne:function(model, i){
			var $catalogContainer = $('.questionLeft>.querstionCatlog ul', this.el);
			if (model.get('QU_TYPE_CD') != null){
				$catalogContainer.append(new Catalog({ model:model }).render().el);
			}
		},
		catalogAddAll:function(){
			var $catalogContainer = $('.questionLeft>.querstionCatlog ul', this.el);
			$catalogContainer.html('');
			_.each(this.questions.models, $.proxy(this.catalogAddOne, this));
		},
		sort:function(event, ui){
			var $item = $(ui.item);
			var $prev = $item.prev();
			var param = _.extend(_.pick(this.getParam(), ['QNR_PAGE_ID', 'QNR_ID']), { QU_ID:$item.attr('questionnaireid') });
			ui.item.trigger('drop', ui.item.index());
			if ($prev != null && $prev.length>0){
				_.extend(param, { QU_DEST_ID:$prev.attr('questionnaireid') });
			}else{
				_.extend(param, { QU_DEST_ID:this.articleStart.model.get('QU_ID') });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-questionSort'), param, $.proxy(function(json, status) {
				if (!status) {
					this.$list.sortable('cancel');
					Util.dialog.tips("问题排序失败");
				}else{
					this.catalogAddAll();
				}
			}, this));
		},
		addSingleSelection:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建单选题", "QU_TYPE_CD":"20"});
			if (val && val.QU_NM){
				_.extend(param, { "QU_NM":val.QU_NM, "ASWR_BEANS":val.ASWR_BEANS, "addAnswer":1 });
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("单选题添加失败");
				}else{
					var model = new SingleSelectionModel();
					model.set(_.extend(param, { QU_ID:json.bean.QU_ID }));
					this.questions.add(model);
				}
			}, this));
		},
		addMultipleSelection:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建多选题", "QU_TYPE_CD":"30"});
			if (val && val.QU_NM){
				_.extend(param, { "QU_NM":val.QU_NM, "ASWR_BEANS":val.ASWR_BEANS, "addAnswer":1 });
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("多选题添加失败");
				}else{
					var model = new MultipleSelectionModel();
					model.set(_.extend(param, {QU_ID:json.bean.QU_ID }));
					this.questions.add(model);
				}
			}, this));
		},
		addJudge:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建判断题", "QU_TYPE_CD":"40"});
			if (val && val.QU_NM){
				//, "ASWR_BEANS":val.ASWR_BEANS, "addAnswer":1
				_.extend(param, { "QU_NM":val.QU_NM });
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("判断题添加失败");
				}else{
					var model = new JudgeModel();
					model.set(_.extend(param, { QU_ID:json.bean.QU_ID, initAnswer:1 }));
					this.questions.add(model);
				}
			}, this));
		},
		addGapFilling:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建填空题", "QU_TYPE_CD":"10" , "HAVE_CHILD_QU_FLAG":"1" });
			if (val && val.QU_NM){
				_.extend(param, { "QU_NM":val.QU_NM, "SUB_QU_BEANS":val.SUB_QU_BEANS, "addAnswer":1 });
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-gapFillingAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("填空题添加失败");
				}else{
					var model = new GapFillingModel();
					model.set(_.extend(param, {QU_ID:json.bean.QU_ID }));
					this.questions.add(model);
				}
			}, this));
		}, 
		addQuestionAnswer:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建问答题", "QU_TYPE_CD":"50"});
			if (val && val.QU_NM){
				_.extend(param, { "QU_NM":val.QU_NM, })
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("问答题添加失败");
				}else{
					var model = new QuestionAnswerModel();
					model.set(_.extend(param, { QU_ID:json.bean.QU_ID }));
					this.questions.add(model);
				}
			}, this));
		},
		addDateQuestion:function(val){
			var param = _.extend(this.getParam(), { "QU_NM":"新建日期题", "QU_TYPE_CD":"60"});
			if (val && val.QU_NM){
				_.extend(param, { "QU_NM":val.QU_NM, })
			}else{
				_.extend(param, { "edit":1 });
			}
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAppend'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("日期题添加失败");
				}else{
					var model = new DateQuestionModel();
					model.set(_.extend(param, { QU_ID:json.bean.QU_ID }));
					this.questions.add(model);
				}
			}, this));
		},
		articleStartEdit:function(e){
			$(e.currentTarget).parent().parent().addClass('articleStartEdit');
		},
		articleStartCancel:function(e){
			$(e.currentTarget).parent().parent().removeClass('articleStartEdit');
		},
		getParam:function () {
			var index = $('#J_questionRender .qBox', this.el).length + 1;
			var param = { "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID 
				, "QU_ASWR_SEQNO":index, "QU_SHARE_TYPE_CD":"01", "QU_DESC":"", "indexNumber":index
			}
			return param;
		}, 
		save:function(){
			this.trigger('saveSuccess', { status:true });
		}, 
		hide:function(){
			this.$el.hide();
		}, 
		show:function(){
			this.$el.show();
		}
	});
	return obj;

});