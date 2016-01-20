define(['backbone', 'model/questionnaire/questions/gapFillingChild'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


