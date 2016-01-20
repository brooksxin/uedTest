define(['backbone'] , function(Backbone){
	//front/sh/questionaire!index?qnrwq006
	srvMap.add('questionnaire-basicGet', 'questionnaire/basicGet.json', 'front/sh/questionaire!index?uid=qnrwq017');
	var model = Backbone.Model.extend({ 
		urlRoot:srvMap.get('questionnaire-basicGet'), 
		parse: function(response) {
			return response.bean;
		}

	});
	return model;
});


