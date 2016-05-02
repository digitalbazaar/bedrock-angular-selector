/*!
 * Base Selector Component.
 *
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brSelector', {
    bindings: {
      itemType: '<?brItemType',
      items: '<brItems',
      selected: '<brSelected',
      onSelect: '&brOnSelect',
      onAddItem: '&?brOnAddItem',
      fixed: '<?brFixed',
      choiceModalTitle: '@?brChoiceModalTitle',
      showChoices: '<?brShowChoices'
    },
    transclude: {
      'br-selector-selected': 'brSelectorSelected',
      'br-selector-choices': 'brSelectorChoices'
    },
    controller: Ctrl,
    templateUrl:
      requirejs.toUrl('bedrock-angular-selector/selector-component.html')
  });
}

/* @ngInject */
function Ctrl() {
  var self = this;

  self.$onChanges = function(changes) {
    if(changes.selected) {
      self.showChoices = false;
      self.onSelect({selected: changes.selected.currentValue});
    }
  };
}

return register;

});
