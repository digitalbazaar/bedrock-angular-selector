/*!
 * Selector module.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
import angular from 'angular';
import SelectorComponent from './selector-component.js';

var module = angular.module('bedrock.selector', []);

module.component('brSelector', SelectorComponent);
