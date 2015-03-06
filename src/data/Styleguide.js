angular.module('sc5.styleguide.data', [
  'sc5.styleguide.socket',
  'rt.debounce'
]).service('Styleguide', function($http, $rootScope, Socket, debounce) {

  'use strict';

  var _this = this;

  this.jsonUrl = 'styleguide.json';
  this.sections = {};
  this.config = {};
  this.variables = {};
  this.status = {
    hasError: false,
    error: {},
    errType: ''
  };

  this.currentReference = {
    section: {
    }
  };

  this.get = function() {
    return $http({
      method: 'GET',
      url: _this.jsonUrl
    }).success(function(response) {
      _this.config.data = response.config;
      _this.variables.data = response.variables;
      _this.sections.data = response.sections;

      if (!Socket.isConnected()) {
        Socket.connect();
      }
    });
  };

  this.refresh = debounce(800, function() {
    _this.get();
  });

  Socket.on('styleguide compile error', function(err) {
    _this.status.hasError = true;
    _this.status.error = err;
    _this.status.errType = 'compile';
  });

  Socket.on('styleguide validation error', function(err) {
    _this.status.hasError = true;
    _this.status.error = err;
    _this.status.errType = 'validation';
  });

  Socket.on('styleguide compile success', function() {
    _this.status.hasError = false;
  });

  $rootScope.$on('styles changed', function() {
    _this.refresh();
  });

  $rootScope.$on('progress end', function() {
    _this.refresh();
  });

});
