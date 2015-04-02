var path = require('path'),
    grunt = require('grunt'),
    gruntMixinDir = require('../lib/grunt-mixin-dir.js')(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var outline = {
  'A router-less set of options': {
    'processed via grunt-mixin-dir': {
      'outputs content in the dest directory': true
    }
  },
  'A router-ful set of options': {
    'processed via grunt-mixin-dir': {
      'outputs content in the dest directory with routing adjustments': true
    }
  }
};

// Relocate to test directory for proper routing
process.chdir(__dirname);
exports['grunt-mixin-dir'] = {
  'routerless': function (test) {
    // Set up
    test.expect(1);
    var that = {
          file: {
            src: ['test_files/*.js'],
            dest: 'tmp/'
          },
          data: {}
        };

    // Run gruntMixinDir and save everything
    // DEV: This is being a bit risky since we don't care about ordering
    var files = [],
        info = gruntMixinDir.call(that, function () {
          // Append options onto dest file
          files.push(this);
        });

    // Run our assertions and return
    var expectedFiles = [
      {file: {src: 'test_files/b.js', dest: 'tmp/b.js'}, data: {}},
      {file: {src: 'test_files/a.js', dest: 'tmp/a.js'}, data: {}}
    ];
    test.deepEqual(files, expectedFiles);
    test.done();
  },
  'routerful': function (test) {
    // Set up
    test.expect(1);
    var that = {
          file: {
            src: ['test_files/*.js'],
            dest: 'tmp/'
          },
          data: {
            router: function (file) {
              // Redirect all .js to .txt
              var filename = path.basename(file);
              return filename.replace('js', 'txt');
            }
          }
        };

    // Run gruntMixinDir and save everything
    // DEV: This is being a bit risky since we don't care about ordering
    var files = [],
        info = gruntMixinDir.call(that, function () {
          // Append options onto dest file
          files.push(this);
        });

    // Run our assertions and return
    var expectedFiles = [
      {file: {src: 'test_files/b.js', dest: 'tmp/b.txt'}, data: that.data},
      {file: {src: 'test_files/a.js', dest: 'tmp/a.txt'}, data: that.data}
    ];
    test.deepEqual(files, expectedFiles);
    test.done();
  }
};
