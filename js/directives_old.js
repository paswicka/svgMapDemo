var prospectDirectives = angular.module('prospectDirectives', []);

prospectDirectives.directive('mapObj', ['$compile', function ($compile){
		return {
    		restrict: 'A',
    		templateNamespace: 'svg',
    		controller: 'prospectController',
    		scope: 'false',
			link: function(scope, element, attr){
					var regions = element[0].querySelectorAll('.state');
					angular.forEach(regions, function (path, key) {
						var regionElement = angular.element(path);
						regionElement.attr("region", "");
						regionElement.attr("prospect-details", "prospectDetails");
						$compile(regionElement)(scope);
					});

					scope.$watch('prospectDetails', function(newValue, oldValue) {
		                if (newValue){
		                    // updateHeatmap();
		                    console.log(scope)
		                }
		            });
			},
	        templateUrl: 'images/usaLow.svg'
		}
	}
]);

prospectDirectives.directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            prospectDetails: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionActive = function () {
                scope.targetState = scope.elementId;
                console.log(scope.targetState);
            };
            element.attr("ng-mouseover", "regionActive()");
            element.removeAttr("region");

            element.html("<div class='panel panel-default'><div class='panel-heading'><div><h5>Title</h5></div></div></div>");

            $compile(element)(scope);
        }
    }
}]);