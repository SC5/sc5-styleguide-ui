angular.module('sc5.styleguide.variable.filterRelated', []).filter('filterRelated', function() {
  return function(variables, sectionVariableNames) {
    var filtered = [];
    angular.forEach(variables, function(variable) {
      if (sectionVariableNames && sectionVariableNames.indexOf(variable.name) > -1) {
        filtered.push(variable);
      }
    });
    return filtered;
  };
});
