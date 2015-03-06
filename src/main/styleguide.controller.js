angular.module('sc5.styleguide.main.controller', [
  'sc5.styleguide.data',
  'sc5.styleguide.socket',
  'sc5.styleguide.variable.service',
  'LocalStorageModule',
  'ui.router'
]).controller('StyleGuideController', function($scope, $location, $state, Styleguide, Variables,
                                               localStorageService, Socket) {

  // Scroll top when page is changed
  $scope.$on('$viewContentLoaded', function() {
    window.scrollTo(0, 0);
  });

  $scope.isNavCollapsed = false;
  $scope.markupSection = {isVisible: true};
  $scope.designerTool = {isVisible: false};

  Styleguide.jsonUrl = $scope.jsonUrl;
  Styleguide.get();

  localStorageService.bind($scope, 'markupSection', {isVisible: true});
  localStorageService.bind($scope, 'designerTool', {isVisible: false});

  // Bind scope variables to service updates
  $scope.sections = Styleguide.sections;
  $scope.config = Styleguide.config;
  $scope.status = Styleguide.status;
  $scope.variables = Variables.variables;

  // Bind variable to scope to wait for data to be resolved
  $scope.socketService = Socket;

  // Check if section is a main section
  $scope.filterMainSections = function(section) {
    return /^[0-9]+$/.test(section.reference);
  };

  // Toggle all markup boxes visible/hidden state
  $scope.toggleMarkup = function() {
    $scope.markupSection.isVisible = !$scope.markupSection.isVisible;
    for (var i = 0; i < $scope.sections.data.length; i++) {
      $scope.sections.data[i].showMarkup = $scope.markupSection.isVisible;
    }
  };

  // Change route to /all when searching
  $scope.$watch('search.$', function(newVal) {
    if (newVal && newVal.length > 0) {
      $state.go('styleguide.section', {section: 'all'});
    }
  });

  // Clear search
  $scope.clearSearch = function() {
    if ($scope.search) {
      $scope.search = {};
    }
  };

});
