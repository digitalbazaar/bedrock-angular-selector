/*!
 * Selector module.
 *
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([
  'angular',
  './selector-component'
], function(angular) {

'use strict';

var module = angular.module('bedrock.selector', []);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

});
