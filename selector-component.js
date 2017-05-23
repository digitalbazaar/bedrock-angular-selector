/*!
 * Base Selector Component.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
export default {
  bindings: {
    itemType: '<?brItemType',
    items: '<brItems',
    selected: '<brSelected',
    onSelect: '&brOnSelect',
    onAddItem: '&?brOnAddItem',
    fixed: '<?brFixed',
    choiceModalTitle: '@?brChoiceModalTitle',
    showChoices: '<?brShowChoices',
    allowSelectNone: '<?brAllowSelectNone'
  },
  transclude: {
    'br-selector-selected': 'brSelectorSelected',
    'br-selector-choices': 'brSelectorChoices'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-angular-selector/selector-component.html'
};

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
