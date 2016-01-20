
define(['text!tpl/questionnaire/questionView.tpl'
	, 'collection/questionnaire/questions', 'common/questionnaire/questions/catalog', 'common/key'

	, 'common/questionnaire/questions/singleSelection'
	, 'common/questionnaire/questions/multipleSelection'
	, 'common/questionnaire/questions/judge'
	, 'common/questionnaire/questions/gapFilling'
	, 'common/questionnaire/questions/questionAnswer'
	, 'common/questionnaire/questions/dateQuestion'

	, 'handlebars', 'backbone', 'jquery', 'underscore', 'dialog'
	, 'style!css/questionnaire/questions.css']
	, function(tpl
		, QuestionCollection, Catalog, Key
		, SingleSelection, MultipleSelection, Judge, GapFilling, QuestionAnswer, DateQuestion
		, Handlebars, Backbone, $, _, ArtDialog){

	var obj = Backbone.View.extend({
		//tagName:'div', 
		//className:'question', 
		template:Handlebars.compile(tpl), 
		questionsNameMap:{ '10':GapFilling, '20':SingleSelection, '30':MultipleSelection, '40':Judge
			, '50':QuestionAnswer, '60':DateQuestion  }, 
		index:0, 
		events: {
			//"click .formBtnArea #Next":       	"nextStep",
			//"click .formBtnArea #Return":       	"previousStep",
		},
		initialize:function(options){
			this.options = options || {};
			this.questions = new QuestionCollection([]);
			this.listenTo(this.questions, 'reset', this.addAll);
			var data = { QNR_ID:options.questionnaireID, OP_TYPE:'preview' };
			
			
			this.dialogCreate();
			this.$el.addClass('questionView');
			setTimeout($.proxy(function(){
				this.questions.fetch({ reset:true, dataType: "json", data:data, error:function(p0, p1, p2){
					console.log('error')
				} });

				//var $catalogContainer = $('.catalog>.container', this.el);
				//$catalogContainer.append(new Catalog({ model:model }).render().el);

			}, this));
		}, 
		render:function(){
			//this.$el.find('.ui-dialog-body').html(this.template({}));
			this.dialog.content(this.template({}));
			return this;
		}, 
		addAll:function(result, options){
			_.each(result.models, $.proxy(this.addOne, this));
			if (result.models.length<=0){
				$('.querstionCatlog>ul', this.$el).append('<li>没有任何信息</li>');
			}
			//this.questionsNameMap
			this.questionInit(0);

		},
		addOne:function(model, i){
			var $ul = $('.querstionCatlog>ul', this.$el);
			var indexNumber = typeof(i) === 'object'? i.length : ++i;
			if (!model.get('indexNumber')) {
				model.set('indexNumber', indexNumber);
			}
			//var questions = { '10':GapFilling, '20':SingleSelection, '30':MultipleSelection, '40':Judge, '50':QuestionAnswer, '60':DateQuestion  }
			var catalog = new Catalog({ model:model });
			$ul.append(catalog.render().el);
			catalog.on('click', $.proxy(function(model, $el){
				this.index = $el.index();
				this.questionInit(this.index);
			}, this));

		},
		questionInit:function(index){
			if (this.questions.models.length>0){
				var model = this.questions.models[index];
				var questions = { '10':GapFilling, '20':SingleSelection, '30':MultipleSelection, '40':Judge, '50':QuestionAnswer, '60':DateQuestion  }
				_.each(this.questions.models, $.proxy(function(model, i){
					model.set('focus', 0);
				}, this));
				if (model.get('QU_TYPE_CD') == Key.QuestionType.SingleSelection 
					|| model.get('QU_TYPE_CD') == Key.QuestionType.MultipleSelection
					|| model.get('QU_TYPE_CD') == Key.QuestionType.Judge
					|| model.get('QU_TYPE_CD') == Key.QuestionType.GapFilling
					|| model.get('QU_TYPE_CD') == Key.QuestionType.QuestionAnswer
					|| model.get('QU_TYPE_CD') == Key.QuestionType.DateQuestion
					){
					model.set('focus', 1);
					var data = _.extend(_.pick(this.options, ['questionnaireID']), { model:model, view:1 });
					var obj = new questions[model.get('QU_TYPE_CD')](data);
					$('#J_questionRender', this.$el).html('').append(obj.render().el);

				}
			}
		},
		prev:function(){
			if (this.index>0){
				this.questionInit(--this.index);
			}
			return false;
		},
		next:function(){
			if (this.index < this.questions.models.length-1){
				this.questionInit(++this.index);
			}
			return false;
		},
		
		dialogCreate:function(){
			
			this.dialog = ArtDialog({
			    title: '问卷预览',
			    button: [
					{
					    value: '上一题',
					    callback: $.proxy(this.prev, this)
					},
					{
					    value: '下一题',
					    callback: $.proxy(this.next, this)
					}
				]
			});
			this.dialog.show();
			this.$el = $(this.dialog.node);
		}
	});

	return obj;

});

