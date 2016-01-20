define(['backbone', 'model/questionnaire/questions/gapFillingAnswer'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


