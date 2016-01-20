define(['backbone', 'model/questionnaire/questions/judgeAnswer'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


