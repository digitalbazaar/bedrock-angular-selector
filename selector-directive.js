/*!
 * Base Selector Directive.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['module'], function(module) {

'use strict';

var modulePath = module.uri.substr(0, module.uri.lastIndexOf('/')) + '/';

/* @ngInject */
function factory() {
  function Controller() {
    var self = this;
    self.selected = null;

    self.select = function(item) {
      self.selected = item;
      self.showChoices = false;
      if(self.selectedCallback) {
        self.selectedCallback({selected: item});
      }
    };
  }

  return {
    restrict: 'E',
    scope: {
      selectedCallback: '&?brSelected'
    },
    transclude: true,
    templateUrl: modulePath + 'selector.html',
    controller: Controller,
    controllerAs: 'model',
    bindToController: true
  };
}

return {brSelector: factory};

});
