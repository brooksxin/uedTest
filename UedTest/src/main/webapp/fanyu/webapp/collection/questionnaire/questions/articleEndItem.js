define(['backbone', 'model/questionnaire/questions/articleEndItem'] , function(Backbone, Model){
	var collection = Backbone.Collection.extend({
		model: Model
	});
	return collection;
});


