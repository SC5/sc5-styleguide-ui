angular.module('sc5.styleguide.routes', [
  'ui.router',
  'oc.lazyLoad'
]).config(function($ocLazyLoadProvider, $locationProvider, $stateProvider) {

  var lazyLoadResolver = {
    loadLazyModule: function($ocLazyLoad) {
      if (window.filesConfig && window.filesConfig.length) {
        return $ocLazyLoad.load(window.filesConfig[0].name);
      }
    }
  };

  $ocLazyLoadProvider.config({
    events: true,
    debug: true,
    modules: window.filesConfig
  });

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('styleguide', {
      url: '/styleguide',
      views: {
        styleGuide: {
          controller: 'StyleGuideController',
          templateUrl: 'main/styleguide.html'
        }
      }
    })
    .state('styleguide.overview', {
      url: '/overview',
      views: {
        styleGuideContent: {
          templateUrl: 'overview.html',
          controller: function($scope, Styleguide) {
            $scope.currentSection = 'overview';
            // Update current reference to update the designer tool view
            $scope.currentReference.section = {
              header: 'Overview',
              reference: ''
            };

            $scope.$watch(function() {
              return Styleguide.config.data;
            }, function(newVal) {
              if (newVal) {
                $scope.pageTitle = newVal.title;
              }
            });
          }
        }
      }
    })
    .state('styleguide.section', {
      url: '/section/:section',
      //templateUrl: 'section/section.list.html',
      resolve: lazyLoadResolver,
      views: {
        styleGuideContent: {
          controller: 'SectionController',
          templateUrl: 'section/section.list.html'
        }
      }
    })
    .state('styleguide.fullscreen', {
      url:  '/element/:section/fullscreen',
      resolve: lazyLoadResolver,
      views: {
        styleGuide: {
          templateUrl: 'element/element-fullscreen.html',
          controller: 'ElementController'
        }
      }
    })
    .state('styleguide.variable', {
      url: '/variable/:variableName',
      resolve: lazyLoadResolver,
      views: {
        styleGuideContent: {
          controller: 'VariablesController',
          templateUrl: 'variable/variable-sections.list.html'
        }
      }
    })
    .state('styleguide.404', {
      url: '/:all',
      templateUrl: 'views/404.html'
    });

});
