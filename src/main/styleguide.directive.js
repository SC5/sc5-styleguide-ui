angular.module('sc5.styleguide.main.directive', [
  'sc5.styleguide.main.controller'
]).directive('styleguide', function() {

  'use strict';

  return {
    scope: {
      jsonUrl: '@jsonUrl'
    },
    templateUrl: 'main/styleguide.html',
    controller: 'StyleGuideController'
  };

});
