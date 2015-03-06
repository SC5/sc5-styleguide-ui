describe('sc5.styleguide.routes', function() {

  'use strict';

  var state;

  beforeEach(function() {
    module('sc5.styleguide.routes');
    inject(function($state) {
      state = $state;
    });
  });

  it('"styleguide" maps to "/styleguide"', function() {
    expect(state.href('styleguide')).to.eql('/styleguide');
  });

  it('"styleguide.overview" maps to "/styleguide/overview:section"', function() {
    expect(state.href('styleguide.overview')).to.eql('/styleguide/overview');
  });

  it('"styleguide.section" maps to "/styleguide/section/:section"', function() {
    expect(state.href('styleguide.section', { section: 123 })).to.eql('/styleguide/section/123');
  });

  it('"styleguide.variable" maps to "/styleguide/variable/:variableName"', function() {
    expect(state.href('styleguide.variable', { variableName: 'foobar' })).to.eql('/styleguide/variable/foobar');
  });

  it('"styleguide.fullscreen" maps to "/styleguide/element/:section/fullscreen"', function() {
    expect(state.href('styleguide.fullscreen', { section: 123 })).to.eql('/styleguide/element/123/fullscreen');
  });

});
