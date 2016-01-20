define(['backbone', 'jquery', 'underscore']
	, function(Backbone, $, _){

	var obj = Backbone.View.extend({
		tagName: "div",
		className: "qBox",
		events: {
			"drop":"drop"
		},
		drop:function(event, index){
			this.trigger('update-sort', this.model, index);
		},
		moveDown:function($el){
			var $nextEl = $el.next();
			if (!$nextEl || $nextEl.length <= 0){
				return false;
			}
			var param = { "QU_ID":this.model.get('QU_ID'), "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID, 
				QU_ASW_ID:$el.attr('answerid'), DIRECTION:1 };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerSort'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("答案下移失败");
				}else{
					
					if ($nextEl && $nextEl.length) { 
						$el.insertAfter($nextEl);
					}
				}
			}, this));

		},		
		moveUp:function($el){
			var $prevEl = $el.prev();
			if (!$prevEl || $prevEl.length <= 0){
				return false;
			}
			var param = { "QU_ID":this.model.get('QU_ID'), "QNR_PAGE_ID":this.options.questionnairePageID, "QNR_ID": this.options.questionnaireID, 
				QU_ASW_ID:$el.attr('answerid'), DIRECTION:0 };
			Util.ajax.postJsonSync(srvMap.get('questionnaire-singleSelectionAnswerSort'), param, $.proxy(function(json, status) {
				if (!status) {
					Util.dialog.tips("答案上移失败");
				}else{
					var $prevEl = $el.prev();
					if ($prevEl && $prevEl.length) { 
						$el.insertBefore($prevEl);
					}
				}
			}, this));

		},
		validate:function(){
			var $titleBox = this.$el.find('.titleBox>input');
			var $emptyAnswerEl = _.find(this.$el.find('.qAnswerList>ul>li>.answerBox'), function(box, i){
				return $(box).val() == '';
			});
			if ($titleBox.length && $titleBox.val().trim() == ''){
				Util.dialog.tips("问题标题不能为空");
				$titleBox.focus();
				return false;
			}
			if ($emptyAnswerEl != null){
				Util.dialog.tips("答案不能为空");
				$emptyAnswerEl.focus();
				return false;
			}
			return true;
		}
	});

	return obj;
});

/*events: {
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
		},	*/

