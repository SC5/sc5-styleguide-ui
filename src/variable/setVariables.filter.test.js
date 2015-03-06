describe('filter: sc5.styleguide.variable.setVariables', function() {

  'use strict';

  var setVariables;

  beforeEach(module('sc5.styleguide.variable.setVariables'));

  beforeEach(inject(function($filter) {
    setVariables = $filter('setVariables');
  }));

  it('should set a single variable correctly', function() {
    var input = 'background: $color;',
      variables = [
        { name: 'color', value: '#FF0000' }
      ],
      result = 'background: #FF0000;';
    expect(setVariables(input, variables)).to.eql(result);
  });

  it('should set multiple variables correctly', function() {
    var input = 'background: $bgColor; color: $textColor;',
      variables = [
        { name: 'bgColor', value: '#FF0000' },
        { name: 'textColor', value: '#00FF00' }
      ],
      result = 'background: #FF0000; color: #00FF00;';
    expect(setVariables(input, variables)).to.eql(result);
  });

  it('should be case sensitive', function() {
    var input = 'background: $test;',
      variables = [
        { name: 'Test', value: '#FF0000' }
      ],
      result = 'background: $test;';
    expect(setVariables(input, variables)).to.eql(result);
  });

  it('should return empty string if string is not defined', function() {
    expect(setVariables(null, {})).to.eql('');
  });

  it('should return unmodified string if variables is not defined', function() {
    expect(setVariables('test string', null)).to.eql('test string');
  });

});
