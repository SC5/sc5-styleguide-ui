describe('controller: sc5.styleguide.main.StyleGuideController', function() {

  'use strict';
  
  var ctrl,
    scope,
    localStorage,
    variablesService,
    styleguideData = {
      get: sinon.spy(),
      sections: {
        data: [
          {
            header: 'Section header text',
            reference: '1'
          },
          {
            header: 'Sub section header text',
            parentReference: '1',
            reference: '1.1'
          }
        ]
      },
      config: {
        data: {
          title: 'Page Title'
        }
      }
    };

  function initController() {
    inject(function($controller) {
      ctrl = $controller('StyleGuideController', {
        $scope: scope,
        Variables: variablesService
      });
    });
  }

  // Load the controller's module
  beforeEach(module('sc5.styleguide.main.controller'));

  beforeEach(function() {
    module(function($provide) {
      $provide.value('Styleguide', styleguideData);
      $provide.value('Variables', {
        init: function() {}
      });
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, Variables, localStorageService) {
    localStorage = localStorageService;
    variablesService = Variables;
    scope = $rootScope.$new();
    initController();
    localStorageService.clearAll();
  }));

  it('should be defined', function() {
    expect(ctrl).not.to.equal(null);
  });

  it('sets Styleguide.jsonUrl from $scope', function() {
    scope.jsonUrl = 'foobar.json';
    initController();
    expect(styleguideData.jsonUrl).to.eql('foobar.json');
  });

  it('calls Styleguide.get()', function() {
    expect(styleguideData.get).to.have.been.called;
  });

  it('search parameter should be cleared after search', function() {
    scope.search = 'test';
    scope.clearSearch();
    expect(scope.search).to.be.empty;
  });

  it('should get section data from styleguide data', function() {
    expect(scope.sections).to.eql(styleguideData.sections);
  });

  it('should have markup shown by default', function() {
    expect(scope.markupSection.isVisible).to.eql(true);
  });

  it('should change markup visibility when toggling state', function() {
    scope.toggleMarkup();
    expect(scope.markupSection.isVisible).to.eql(false);
  });

  it('should persist new state when toggling state', function() {
    scope.toggleMarkup();
    scope.$digest();
    expect(localStorage.get('markupSection').isVisible).to.eql(false);
  });

  it('should hide designer tool by default', function() {
    expect(scope.designerTool.isVisible).to.eql(false);
  });

  it('should persist new state when designer tool visibility is changed', function() {
    scope.designerTool.isVisible = true;
    scope.$digest();
    expect(localStorage.get('designerTool').isVisible).to.eql(true);
  });

  describe('main section filtering', function() {
    it('should return true for main sections', function() {
      expect(scope.filterMainSections({reference: '1'})).to.eql(true);
    });

    it('should return false for sub sections', function() {
      expect(scope.filterMainSections({reference: '1.2'})).to.eql(false);
      expect(scope.filterMainSections({reference: '1.1.2'})).to.eql(false);
    });

    it('should return false for undefined reference', function() {
      expect(scope.filterMainSections({})).to.eql(false);
    });
  });
});
