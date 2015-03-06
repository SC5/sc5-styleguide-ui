describe('filter: sc5.styleguide.markup.setModifierClass', function() {

  'use strict';

  var setModifierClass;

  beforeEach(module('sc5.styleguide.markup.setModifierClass'));

  beforeEach(inject(function($filter) {
    setModifierClass = $filter('setModifierClass');
  }));

  it('should replace modifier placeholder properly', function() {
    var input = 'test {$modifiers} test',
      modifierClass = 'modifierClass',
      result = 'test modifierClass test';
    expect(setModifierClass(input, modifierClass)).to.eql(result);
  });

  it('should replace multiple modifiers properly', function() {
    var input = 'test {$modifiers} test {$modifiers}',
      modifierClass = 'modifierClass',
      result = 'test modifierClass test modifierClass';
    expect(setModifierClass(input, modifierClass)).to.eql(result);
  });

});
