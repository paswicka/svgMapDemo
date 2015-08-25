var prospectDirectives = angular.module('prospectDirectives', []);

prospectDirectives.directive('prospectMap', ['$compile', function ($compile){
		return {
    		templateNamespace: 'svg',
    		controller: 'MainCtrl',
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

                            //Update Heatmap
		                    var regions = element[0].querySelectorAll('.state');

                            angular.forEach(regions, function (path, key) {
                                var regionElement = angular.element(path)[0];
                                angular.element("#" + path.id).css({"fill": "", "opacity": "1"});

                                angular.forEach(scope.prospectDetails, function (resource, key) {
                                    if(resource.State == path.id){
                                        var opacity = resource.EmployeeCount * .02;

                                        if (resource.EmployeeCount < 20) {
                                            opacity = .1;
                                        }else if(resource.EmployeeCount > 20 && resource.EmployeeCount < 40){
                                            opacity = .3;
                                        }else if(resource.EmployeeCount > 40 && resource.EmployeeCount < 60){
                                            opacity = .5;
                                        }else if(resource.EmployeeCount > 60 && resource.EmployeeCount < 80){
                                            opacity = .7;
                                        }else if(resource.EmployeeCount > 80 && resource.EmployeeCount < 100){
                                            opacity = .9;
                                        }else{
                                            opacity = 1;
                                        };
                                        angular.element("#" + path.id).css({"fill": "rgba(38, 224, 179, " + opacity + ")"});
                                    }
                                });
                            });
		                }
		            });

                    angular.forEach(angular.element(".key span"), function (element, key) {
                        var opacity = ((key + 1) * .2) - .1;
                        angular.element(element).css("background-color", "rgba(38, 224, 179, " + opacity + ")");
                    });
			},
	        templateUrl: 'images/usaLow.svg'
		}
	}
]);

prospectDirectives.directive('prospectState', ['$compile', '$window', function ($compile, $window){
        return {
            scope: {
                prospectDetails : "="
            },
            link: function(scope, element, attr){
                var elementId = element.attr("id");
                scope.regionActive = function () {
                    scope.$parent.targetState = elementId;
                    angular.element("#" + elementId + " path").css({"fill": "#ED5163"});
                };
                scope.regionInactive = function () {
                    scope.$parent.targetState = null;
                    angular.element("#" + elementId + " path").css({"fill":""});
                };
                scope.mouseFollow = function (event) {
                    var offset = angular.element(event.target).parent().parent().offset();

                    var elementResult = angular.element(".statePopover");
                    
                    var top = event.pageY - offset.top - 110;
                    var left = event.pageX - offset.left + 30;

                    if (event.pageX + elementResult.width() + 50 > $window.innerWidth) {
                        left -= (elementResult.width() + 50);
                    };

                    elementResult.css({"top": top + "px", "left": left + "px"});
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