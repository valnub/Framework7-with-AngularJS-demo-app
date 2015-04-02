var grunt = require('grunt');

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

exports['html-prettyprinter'] = {
  'single': function(test) {
    // Set up
    test.expect(1);

    // Assert content is the same
    var expectedContent = grunt.file.read('expected/file.html'),
        actualContent = grunt.file.read('actual/file.html');
    test.equal(actualContent, expectedContent, 'should match the beautified content.');

    // Return
    test.done();
  },
  'dir': function(test) {
    // Set up
    test.expect(2);

    // Assertions
    var expectedContent1 = grunt.file.read('expected/dir/file1.html'),
        actualContent1 = grunt.file.read('actual/dir/file1.html');
    test.equal(actualContent1, expectedContent1, 'should match the first beautified content.');

    var expectedContent2 = grunt.file.read('expected/dir/file2.html'),
        actualContent2 = grunt.file.read('actual/dir/file2.html');
    test.equal(actualContent2, expectedContent2, 'should match the second beautified content.');

    // Callback
    test.done();
  },
  'tabs': function(test) {
    // Set up
    test.expect(1);

    // Assert content is the same
    var expectedContent = grunt.file.read('expected/file-tabs.html'),
        actualContent = grunt.file.read('actual/file-tabs.html');
    test.equal(actualContent, expectedContent, 'should match the beautified content.');

    // Return
    test.done();
  }
};
