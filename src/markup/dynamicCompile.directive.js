angular.module('sc5.styleguide.markup.dynamicCompile', []).directive('dynamicCompile', function($compile, $parse) {

  'use strict';

  return {
    link: function(scope, element, attrs) {
      var parsed = $parse(attrs.ngBindHtml);

      function getStringValue() {
        return (parsed(scope) || '').toString();
      }

      // Recompile if the template changes
      scope.$watch(getStringValue, function() {
        $compile(element, null, 0)(scope);
      });
    }
  };
});
