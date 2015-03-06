angular.module('sc5.styleguide.section.sgSection', [
  'sc5.styleguide.data'
]).directive('sgSection', function($rootScope, $window, $timeout, Styleguide) {

  'use strict';

  return {
    replace: true,
    restrict: 'A',
    templateUrl: 'section/sgSection.html',
    link: function(scope, element) {
      function updateCurrentReference() {
        var topOffset = element[0].offsetTop,
          bottomOffset = element[0].offsetTop + element[0].offsetHeight,
          buffer = 50;

        if ($window.pageYOffset > topOffset - buffer && $window.pageYOffset < bottomOffset - buffer) {
          if (Styleguide.currentReference.section.reference !== scope.section.reference) {
            // Assign new current section
            Styleguide.currentReference.section = scope.section;
            if (!scope.$$phase) {
              $rootScope.$apply();
            }
          }
        }
      }

      // Init markup visibility based on global setting
      scope.section.showMarkup = scope.markupSection.isVisible;
      // By default do not show CSS markup
      scope.section.showCSS = false;

      // Listen to scroll events and update currentReference if this section is currently focused
      angular.element($window).bind('scroll', function() {
        updateCurrentReference();
      });

      scope.$watch('search.$', function() {
        // Search is not processed completely yet
        // We want to run updateCurrentReference after digest is complete
        $timeout(function() {
          updateCurrentReference();
        });
      });

      // Section location will change still after initialzation
      // We want to run updateCurrentReference after digest is complete
      $timeout(function() {
        updateCurrentReference();
      });
    }
  };
});
