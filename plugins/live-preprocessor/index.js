var live = require('LiveScript');

var createLivePreprocessor = function(logger, basePath) {
  var log = logger.create('preprocessor.ls');

  return function(content, file, done) {
    var processed = null;

    log.debug('Processing "%s".', file.originalPath);
    file.path = file.originalPath + '-compiled.js';

    try {
      processed = live.compile(content, {bare: true});
    } catch (e) {
      log.error('%s\n  at %s', e.message, file.originalPath);
    }

    done(processed);
  };
};

createLivePreprocessor.$inject = ['logger', 'config.basePath'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:live': ['factory', createLivePreprocessor]
};
