# grunt-html-prettyprinter

Task that beautifies your HTML

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-html-prettyprinter`

Then add this line to your project's `grunt.js` gruntfile:

```js
grunt.loadNpmTasks('grunt-html-prettyprinter');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
```js
grunt.initConfig({
  // Beautify single file
  'html-prettyprinter': {
    single: {
      // HTML file to beauty
      src: 'dirty/index.html',

      // Destination of HTML file
      dest: 'clean/index.html'
    },

    // Multiple files are accepted and concatenated in order by a line feed
    multi: {
      src: ['dirty/index.html', 'dirty/main.html'],
      dest: 'clean/index.html'
    },

    // We support the grunt compact format (dest: src)
    'clean/index.html': 'dirty/index.html',

    // Options can be specified via the `options` key (e.g. tabs)
    // Full list of options can be found at:
    //   https://github.com/maxogden/commonjs-html-prettyprinter/blob/61f7fad73b6dd49503f703730eb2410812312118/lib/html.js#L19-L26
    custom: {
      src: 'dirty/index.html',
      dest: 'clean/index-with-tabs.html',
      options: {
        indent_size: 2,
        indent_char: '\t'
      }
    }
  },
  // Beautify multiple files in a directory
  'html-prettyprinter-dir': {
    multi: {
      // Files to beautify
      src: ['dirty/index.html', 'dirty/main.html'],

      // Directory to output beautified files to
      dest: 'clean/'
    },

    // Minimatch expansion is supported
    expansion: {
      // Expands to ['dirty/index.html', 'dirty/main.html']
      src: ['dirty/*.html'],
      dest: 'clean/'
    },

    // Custom routing is supported
    routing: {
      src: ['dirty/index.html', 'dirty/main.html'],
      dest: 'clean/',
      // Rename all files to .pretty.html
      router: function (file) {
        var filename = path.basename(file);
        return filename.replace('.html', '.pretty.html');
      }
    },

    // We support the grunt compact format (dest: src)
    'clean/': ['dirty/index.html', 'dirty/main.html'],

    // Options can be specified via the `options` key (e.g. tabs)
    // Full list of options can be found at:
    //   https://github.com/maxogden/commonjs-html-prettyprinter/blob/61f7fad73b6dd49503f703730eb2410812312118/lib/html.js#L19-L26
    custom: {
      src: ['dirty/index.html'],
      dest: 'clean-with-tabs/',
      options: {
        indent_size: 2,
        indent_char: '\t'
      }
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## License
Copyright (c) 2012-2014 Todd Wolfson
Licensed under the MIT license.
