define(['backbone', 'model/questionnaire/questions/singleSelectionAnswer'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


