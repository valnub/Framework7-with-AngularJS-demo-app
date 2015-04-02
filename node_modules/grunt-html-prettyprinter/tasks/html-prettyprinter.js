/*
 * grunt-html-prettyprinter
 * https://github.com/twolfson/grunt-html-prettyprinter
 *
 * Copyright (c) 2012 Todd Wolfson
 * Licensed under the MIT license.
 */
var htmlPrettyprinter = require('html').prettyPrint,
    gruntRetro = require('grunt-retro'),
    gruntMixinDirFn = require('grunt-mixin-dir');
module.exports = function (grunt) {
  // Bind grunt-retro
  grunt = gruntRetro(grunt);

  // Load in gruntMixinDir
  gruntMixinDir = gruntMixinDirFn(grunt);

  // Manual fallback for 0.4 compatibility ;_;
  // and without introducing bulky/unnecessary dependencies
  // https://github.com/gruntjs/grunt/blob/0.3-stable/tasks/concat.js#L33-L41
  // https://github.com/gruntjs/grunt-lib-legacyhelpers/blob/master/lib/legacyhelpers.js#L16-L24
  grunt.registerHelper('concat', function(files, options) {
    options = grunt.utils._.defaults(options || {}, {
      separator: grunt.utils.linefeed
    });
    return files ? files.map(function(filepath) {
      // return grunt.task.directive(filepath, grunt.file.read);
      return grunt.file.read(filepath);
    }).join(grunt.utils.normalizelf(options.separator)) : '';
  });

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // Common abstraction for single and dir tasks
  // Beautify single file
  grunt.registerMultiTask('html-prettyprinter', 'Prettyprint HTML from src to dest', function () {
    // Run the prettyprint task on our single item
    grunt.helper('html-prettyprinter-file', this);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + this.file.dest + '" created.');
  });

  // Beautify directory of files
  grunt.registerMultiTask('html-prettyprinter-dir', 'Prettyprint HTML directory from src to dest', function () {
    // Run the prettyprint task on our items
    var taskInfo = gruntMixinDir.call(this, function callPrettyprinterFile () {
      grunt.helper('html-prettyprinter-file', this);
    });

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + taskInfo.destFiles.join('", "') + '" created.');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('html-prettyprinter-file',  function prettyprintFile (options) {
    // Collect the filepaths we need
    var file = options.file,
        data = options.data,
        src = file.src,
        srcFiles = grunt.file.expand(src),
        separator = data.separator || '\n',
        dest = file.dest;

    // Read in the srcFiles, join, and beautify it
    var srcBlob = grunt.helper('concat', srcFiles, {separator: separator}),
        beautifiedContent = grunt.helper('html-prettyprinter', srcBlob, data.options);

    // Write out the content
    grunt.file.write(dest, beautifiedContent);
  });

  grunt.registerHelper('html-prettyprinter', function prettyprintContent (content, options) {
    var beautifiedContent = htmlPrettyprinter(content, options || {});
    return beautifiedContent;
  });

};
