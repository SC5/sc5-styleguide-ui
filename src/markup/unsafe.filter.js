angular.module('sc5.styleguide.markup.unsafe', [])
.filter('unsafe', ['$sce', function($sce) {

  'use strict';
  // Trust modifier markup to be safe html
  return function(val) {
    return $sce.trustAsHtml(val);
  };

}]);
