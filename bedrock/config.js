/*
 * Bedrock Configuration.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var path = require('path');

module.exports = function(bedrock) {
  if(bedrock.config.protractor) {
    var config = bedrock.config.protractor.config;
    config.params.config.onPrepare.push(
      path.join(__dirname, './selector'));
  }
};
