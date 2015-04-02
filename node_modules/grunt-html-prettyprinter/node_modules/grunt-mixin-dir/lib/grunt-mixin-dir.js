var path = require('path'),
    defaultRouter = path.basename;
module.exports = function (grunt) {
  /**
   * Add directory and routing functionality to grunt task
   * @param {Function} task Function to call with grunt options
   * @param {Object} this Same context as one would expect from grunt
   * @param {Object} this.file Container for src and dest
   * @param {String|String[]} this.file.src File or list of files to use as input
   * @param {String} this.file.dest Directory to send all output to
   * @param {Object} this.data Container for additional input
   * @param {Function} [this.data.router] Routing function for determining names of files to output
   * @return {Object} Contains {srcFiles, router, destFiles}; the expanded filenames passed into `task`
   */
  function gruntMixinDir(task) {
    // Localize information
    var file = this.file,
        data = this.data,
        router = data.router || defaultRouter,
        src = file.src,
        destDir = file.dest,
        srcFiles = grunt.file.expand(src);

    // Iterate over files and pretty print each one
    var destFiles = srcFiles.map(function prettyprintDirFile (srcFile) {
      // Determine the end path for the file
      var destFile = router(srcFile),
          destPath = path.join(destDir, destFile);

      // Run the task with our options
      task.call({
        file: {src: srcFile, dest: destPath},
        data: data
      });

      // Return the destination
      return destPath;
    });

    // Return information about what happened
    var retObj = {
      srcFiles: srcFiles,
      router: router,
      destFiles: destFiles
    };
    return retObj;
  }
  return gruntMixinDir;
};