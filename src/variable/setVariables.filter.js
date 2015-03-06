angular.module('sc5.styleguide.variable.setVariables', []).filter('setVariables', function() {
  // Replace $variables with values found in variables object
  return function(str, variables) {
    if (!str) {
      return '';
    }
    angular.forEach(variables, function(variable) {
      str = str.replace(new RegExp('\\$' + variable.name, 'g'), variable.value);
    });
    return str;
  };
});
