define(['backbone', 'model/questionnaire/questions'] , function(Backbone, Model){

	srvMap.add('questionnaire-questions', 'questionnaire/questionsGet.json'
		, 'front/sh/questionaire!index?uid=qoro024');
	var collection = Backbone.Collection.extend({
		model:Model,
		url:srvMap.get('questionnaire-questions'), 
		//initialize:function(){}, 
		parse: function(response) {
			return response.object;
		}, 

	});
	return collection;
});
