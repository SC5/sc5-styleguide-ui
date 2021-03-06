angular.module('sc5.styleguide.section.controller', [])
.controller('SectionController', function($scope, $stateParams, $location, $rootScope, Styleguide) {

  'use strict';

  if ($stateParams.section) {
    $scope.currentSection = $stateParams.section;
  } else {
    $location.url('overview');
  }
  
  $rootScope.$watch(function() {
    return Styleguide.sections.data;
  }, function() {
    setPageTitle($scope.currentSection);
  });

  $rootScope.$watch(function() {
    return Styleguide.config.data;
  }, function() {
    setPageTitle($scope.currentSection);
  });

  function setPageTitle(section) {
    if (!Styleguide.config.data || !Styleguide.sections.data) {
      return;
    }
    if (section === 'all') {
      $rootScope.pageTitle = 'All sections - ' + Styleguide.config.data.title;
    } else {
      var result = Styleguide.sections.data.filter(function(item) {
        return item.reference === section;
      });
      if (result.length > 0) {
        var element = result[0];
        $rootScope.pageTitle = element.reference + ' ' + element.header + ' - ' + Styleguide.config.data.title;
      }
    }
  }

  $scope.isEmptyMainSection = function(section) {
    return section.reference.indexOf('.') === -1 && !section.wrappedMarkup && (!section.modifiers || section.modifiers.length === 0);
  };

  $scope.isActive = function(section) {
    return section.reference === Styleguide.currentReference.section.reference ? 'active' : '';
  };

  $scope.filterSections = function(section) {
    if ($scope.currentSection === 'all') {
      return true;
    }
    return new RegExp('^' + $scope.currentSection + '(\\D|$)').test(section.reference);
  };
});
