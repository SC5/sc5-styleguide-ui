angular.module('sc5.styleguide.variable.controller', []).controller('VariablesController', function($rootScope, $scope, $stateParams, $location, Styleguide) {

  'use strict';

  $scope.clearSearch();

  if ($stateParams.variableName) {
    $scope.currentVariable = $stateParams.variableName;
  } else {
    $location.url('overview');
  }

  $scope.getLevel = function() {
    return 'sub';
  };

  findSectionsUsingVariable();

  $rootScope.$on('styles changed', findSectionsUsingVariable);

  function findSectionsUsingVariable() {
    var sections = Styleguide.sections;
    if (sections && sections.data) {
      $scope.relatedSections = sections.data.filter(function(section) {
        return section.variables && section.variables.indexOf($scope.currentVariable) >= 0;
      });
    } else {
      $scope.relatedSections = [];
    }
  }

});
