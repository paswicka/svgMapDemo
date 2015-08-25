var module = angular.module('MainCtrl', ['prospectServices']);

module.controller('MainCtrl', ['$scope', 'ProspectList', 'ProspectDetails', function($scope, ProspectList, ProspectDetails){
		var states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL",
            "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
            "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
            "WA", "WV", "WI", "WY"];
        
		var prospectList = ProspectList.query();
		

		prospectList.$promise.then(function (result) {
		    $scope.prospects = result;
			$scope.prospectOrder = "State";
			$scope.targetProspect = $scope.prospects[0];
			$scope.prospectSelect();
		});
		
		$scope.prospectSelect = function() {

			var prospectDetailsCall = ProspectDetails.get({id: $scope.targetProspect.ProspectID});
			
			prospectDetailsCall.$promise.then(function (result){
				var temp = {};
				angular.forEach(states, function (state, key){
					angular.forEach(result, function (resource, key) {
						if (resource.State == state) {
							temp[state] = resource;
						};
					})
				})
				$scope.prospectDetails = temp;
			});
		};
	}
]);