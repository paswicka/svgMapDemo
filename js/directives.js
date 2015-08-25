var prospectDirectives = angular.module('prospectDirectives', []);

prospectDirectives.directive('prospectMap', ['$compile', function ($compile){
		return {
    		// restrict: 'A',
    		templateNamespace: 'svg',
    		controller: 'MainCtrl',
    		// scope: 'false',
			link: function(scope, element, attr){
                    var regions = element[0].querySelectorAll('.state');
                    angular.forEach(regions, function (path, key) {
                        var regionElement = angular.element(path);
                        regionElement.attr("prospect-state", "");
                        regionElement.attr("prospect-details", "prospectDetails");
                        $compile(regionElement)(scope);
                    });

					scope.$watch('prospectDetails', function(newValue, oldValue) {
		                if (newValue){
		                    updateHeatmap();
		                }
		            });

                    /*scope.$watch('targetState', function(newValue, oldValue) {
                        if (newValue){
                            updateHeatmap();
                        }
                    });*/

                    function updateHeatmap(){
                        var regions = element[0].querySelectorAll('.state');

                        angular.forEach(regions, function (path, key) {
                            var regionElement = angular.element(path)[0];
                            angular.element("#" + path.id).css({"fill": "", "opacity": "1"});

                            console.log(scope.prospectDetails);
                            angular.forEach(scope.prospectDetails, function (resource, key) {
                                if(resource.State == path.id){
                                    var opacity = resource.EmployeeCount * .02;
                                    angular.element("#" + path.id + ".state").css({"fill": "#26E0B3", "opacity":opacity});
                                }
                            });
                        });
                    }
			},
	        templateUrl: 'images/usaLow.svg'
		}
	}
]);

prospectDirectives.directive('prospectState', ['$compile', '$document', function ($compile, $document){
        return {
            scope: {
                prospectDetails : "=",
                targetState : "="
            },
            link: function(scope, element, attr){
                scope.elementId = element.attr("id");
                scope.regionActive = function () {
                    scope.$parent.targetState = scope.elementId;
                    angular.element("#" + scope.elementId).addClass("svgHover");
                };
                scope.regionInactive = function () {
                    scope.$parent.targetState = null;
                };
                scope.mouseFollow = function (event) {
                    var offset = element.offset();

                    var elementResult = document.getElementsByClassName("statePopover")[0];
                    
                    var top = event.clientY - 300;
                    var left = event.clientX - 400;
                    
                    elementResult.style.top = top + "px";
                    elementResult.style.left = left + "px";
                };
                element.attr("ng-mouseover", "regionActive()");
                element.attr("ng-mouseleave", "regionInactive()");
                element.attr("ng-mousemove", "mouseFollow($event)");
                element.removeAttr("prospect-state");
                $compile(element)(scope);
            }
        }
    }
]);

prospectDirectives.directive('prospectPopover', ['$compile', function ($compile){
        return {
            controller: 'MainCtrl',
            templateUrl: 'partials/stateHover.html'
        }
    }
]);

prospectDirectives.directive('prospectTable', function ($compile){
        return {
            templateUrl: 'partials/prospects.html'
        }
    }
);