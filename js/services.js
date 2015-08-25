var prospectServices = angular.module('prospectServices', ['ngResource']);

prospectServices.factory('ProspectList', ['$resource',
	function($resource){
		return $resource('http://api.hixme.com/v1/modeling/prospects', null, {
			'query': {method:'GET', isArray:true}
		});
	}
]);

prospectServices.factory('ProspectDetails', ['$resource',
	function($resource){
		return $resource('http://api.hixme.com/v1/modeling/prospectlist/:id', null, {
			"get": {method:'GET', params:{id:'@id'}, isArray:true}
		});
	}
]);