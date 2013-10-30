(function() {

  require('./cli');

  var createEmberPreprocessor = function(logger, basePath) {
    var compiler = require('ember-template-compiler');
    var log = logger.create('preprocessor.ember');

    return function(content, file, done) {
      var processed = null;

      log.debug('Processing "%s".', file.originalPath);

      try {
        var template = new Cli({args: [file.originalPath]}).parseCommandLineArgs();
        content = template['content'].replace(/\n/g, '\\n').replace(/"/g, '\\"')
        var processed = "Ember.TEMPLATES['" + template['name'] + "'] = Ember.Handlebars.compile('" + content + "');";
      } catch (e) {
        log.error('%s\n  at %s', e.message, file.originalPath);
      }

      done(processed);
    };
  };

  createEmberPreprocessor.$inject = ['logger', 'config.basePath'];

  module.exports = {
    'preprocessor:ember': ['factory', createEmberPreprocessor]
  };

}).call(this);
