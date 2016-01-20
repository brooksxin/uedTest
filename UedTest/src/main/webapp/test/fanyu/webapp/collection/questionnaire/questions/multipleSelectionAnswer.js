define(['backbone', 'model/questionnaire/questions/multipleSelectionAnswer'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


