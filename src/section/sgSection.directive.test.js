describe('directive: sc5.styleguide.section.sgSection', function() {

  'use strict';

  var $scope, elem, result,
      html = '<sg-section></sg-section>';

  beforeEach(module('sc5.styleguide.section.sgSection'));

  function render() {
    inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      elem = angular.element(html);
      result = $compile(elem)($scope);
      $scope.$apply();
    });
  }

});
