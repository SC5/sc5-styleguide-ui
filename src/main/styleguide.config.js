angular.module('sc5.styleguide.main.config', [
  'LocalStorageModule'
]).config(function(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('sgLs');
});
