angular.module('sc5.styleguide.markup.setModifierClass', []).filter('setModifierClass', function() {

  'use strict';

  // Replaces modifier markup's {$modifiers} with modifier's modifierClass
  return function(items, modifierClass) {
    items = items.replace(/\{\$modifiers\}/g, modifierClass);
    return items;
  };
});
