var fs = require('fs');
var path = require('path');

Cli = (function() {

  var CliObject = function(params) {
    this.args = params.args;
  };

  CliObject.prototype.parseCommandLineArgs = function() {
    var filename = this.args[0];
    var templateName = filename.toString().split(path.sep + 'javascripts' + path.sep).reverse()[0].replace('.handlebars', '').replace('.hbs', '').replace('.js.hjs', '');

    templateName = templateName.replace(/\//g, '_').replace('/-/g', '_');
    var template = fs.readFileSync(filename.toString(), 'utf8');
    return {'name': templateName, 'content': template};
  };

  return CliObject;

})();
