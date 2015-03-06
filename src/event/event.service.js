angular.module('sc5.styleguide.event', [
  'ngProgress'
]).service('EventService', function($rootScope, ngProgress) {

  'use strict';

  //TODO: replace $rootScope with something else

  $rootScope.$on('progress start', function() {
    ngProgress.start();
  });

  $rootScope.$on('progress end', function() {
    ngProgress.complete();
  });

  // Reload styles when server notifies about the changes
  // Add cache buster to every stylesheet on the page forcing them to reload
  $rootScope.$on('styles changed', function() {
    var links = Array.prototype.slice.call(document.getElementsByTagName('link'));
    links.forEach(function(link) {
      if (typeof link === 'object' && link.getAttribute('type') === 'text/css' && link.getAttribute('data-noreload') === null) {
        link.href = link.href.split('?')[0] + '?id=' + new Date().getTime();
      }
    });
  });

  $rootScope.$on('socket connected', function() {
    console.log('Socket connection established');
  });

  $rootScope.$on('socket disconnected', function() {
    console.error('Socket connection dropped');
    ngProgress.reset();
  });

  $rootScope.$on('socket error', function(err) {
    console.error('Socket error:', err);
  });

});
