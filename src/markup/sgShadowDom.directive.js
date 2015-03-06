angular.module('sc5.styleguide.markup.sgShadowDom', []).directive('sgShadowDom', function($templateCache) {

  'use strict';

  var USER_STYLES_TEMPLATE = 'userStyles.html';

  return {
    restrict: 'E',
    transclude: true,
    link: function(scope, element, attrs, controller, transclude) {
      if (typeof element[0].createShadowRoot === 'function') {
        var root = angular.element(element[0].createShadowRoot());
        root.append($templateCache.get(USER_STYLES_TEMPLATE));
        transclude(function(clone) {
          root.append(clone);
        });
      } else {
        transclude(function(clone) {
          element.append(clone);
        });
      }
    }
  };
});
