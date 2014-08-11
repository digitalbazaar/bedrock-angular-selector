/*!
 * Base Selector.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory($filter) {
  return {
    transclude: true,
    scope: {
      fixed: '@',
      items: '=',
      itemType: '@',
      modalTitle: '@',
      selected: '=',
      invalid: '=',
      addItem: '&',
      custom: '=customDisplay',
      selecting: '=',
      columns: '@'
    },
    templateUrl: '/app/components/selector/selector.html',
    link: Link
  };

  function Link(scope, element, attrs) {
    scope.model = {};
    scope.$watch('selected', function(value) {
      if(value === undefined) {
        scope.selected = scope.items[0] || null;
      }
    });
    attrs.$observe('fixed', function(value) {
      scope.fixed = value;
    });
    scope.$watch('showSelectorModal', function(value) {
      if(attrs.selecting) {
        scope.selecting = value;
      }
    });

    // builds an item grid for selectors w/grid layouts
    function buildGrid(columns) {
      var row = null;
      scope.grid = [];
      var sorted = $filter('orderBy')(scope.items, 'label');
      angular.forEach(sorted, function(item) {
        if(!row) {
          row = [];
        }
        row.push(item);
        if(row.length === columns) {
          scope.grid.push(row);
          row = null;
        }
      });
      if(row) {
        scope.grid.push(row);
      }
    }

    // keep item grid up-to-date
    scope.grid = [];
    scope.$watch('items', function() {
      if(scope.columns !== undefined) {
        buildGrid(Math.max(1, parseInt(scope.columns, 10)));
      }
    }, true);
    scope.$watch('columns', function(value) {
      if(value !== undefined) {
        buildGrid(Math.max(1, parseInt(value, 10)));
      }
    });

    // called when an item is selected in the selector modal
    scope.select = function(selected) {
      scope.selected = selected;
      scope.showSelectorModal = false;
    };
  }
}

return {selector: factory};

});
