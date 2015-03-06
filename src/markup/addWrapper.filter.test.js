describe('filter: sc5.styleguide.markup.addWrapper', function() {

  'use strict';

  beforeEach(module('sc5.styleguide.markup.addWrapper'));

  var addWrapper,
    Styleguide;

  beforeEach(function() {
    Styleguide = {
      config: {
        data: {}
      }
    };

    module(function($provide) {
      $provide.value('Styleguide', Styleguide);
    });

    inject(function($filter) {
      addWrapper = $filter('addWrapper');
    });
  });

  it('should be defined', function() {
    expect(addWrapper).to.be.a('function');
  });

  it('returns input as-is if Styleguide config does not have commonClass', function() {
    var input = 'unchanged';
    expect(addWrapper(input)).to.eql(input);
  });

  it('returns input as-is if Styleguide config is not yet loaded', function() {
    Styleguide = {};
    var input = 'unchanged';
    expect(addWrapper(input)).to.eql(input);
  });

  it('returns input wrapped inside a <sg-common-class-wrapper> tag with common class if Styleguide config has commonClass', function() {
    Styleguide.config.data.commonClass = 'my-common-class';
    var input = 'wrapped',
      expected = '<sg-common-class-wrapper class="my-common-class">wrapped</sg-common-class-wrapper>';
    expect(addWrapper(input)).to.eql(expected);
  });

});
