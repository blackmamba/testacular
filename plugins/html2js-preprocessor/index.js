var util = require('util');


var template = 'angular.module(\'%s\', []).run(function($templateCache) {\n' +
    '  $templateCache.put(\'%s\',\n    \'%s\');\n' +
    '});\n';

var escapeContent = function(content) {
  return content.replace(/'/g, '\\\'').replace(/\n/g, '\\n\' +\n    \'');
};

var createHtml2JsPreprocessor = function(logger, basePath) {
  var log = logger.create('preprocessor.html2js');

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var htmlPath = file.originalPath.replace(basePath + '/', '');

    file.path = file.path + '.js';
    done(util.format(template, htmlPath, htmlPath, escapeContent(content)));
  };
};

createHtml2JsPreprocessor.$inject = ['logger', 'config.basePath'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:html2js': ['factory', createHtml2JsPreprocessor]
};
