describe('filter: sc5.styleguide.variable.filterRelated', function() {

  'use strict';

  var filterRelated;

  beforeEach(module('sc5.styleguide.variable.filterRelated'));

  beforeEach(inject(function($filter) {
    filterRelated = $filter('filterRelated');
  }));

});
