angular.module('sc5.styleguide.markup.addWrapper', [])
.filter('addWrapper', ['Styleguide', function(Styleguide) {

  'use strict';

  return function(html) {
    if (Styleguide.config && Styleguide.config.data && Styleguide.config.data.commonClass) {
      return '<sg-common-class-wrapper class="' +
        Styleguide.config.data.commonClass + '">' +
        html + '</sg-common-class-wrapper>';
    }
    return html;
  };
}]);
