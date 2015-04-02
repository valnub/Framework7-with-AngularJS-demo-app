module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: ['build/'],
      gfx: ['build/gfx/'],
      lib: ['build/lib/'],
      js: ['build/js/'],
      css: ['build/css/'],
      html: ['build/index.html']
    },
    
    includereplace: {
      dist: {
        options: {},
        src: 'src/index.dev.html',
        dest: 'src/tmp/index.ugly.html'
      }
    },
    
    'html-prettyprinter': {
      single: {
        src: 'src/tmp/index.ugly.html',
        dest: 'build/index.html'
      }
    },
    
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['lib/**', 'gfx/**', 'ws/**'],
            cwd: 'src/',
            dest: 'build/'
          }
        ]
      },
      lib: {
        files: [
          {
            expand: true,
            src: ['lib/**'],
            cwd: 'src/',
            dest: 'build/'
          }
        ]
      },
      gfx: {
        files: [
          {
            expand: true,
            src: ['gfx/**'],
            cwd: 'src/',
            dest: 'build/'
          }
        ]
      }
    },
    
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['*.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },
    
    typescript: {
      base: {
        src: ['src/ts/**/*.ts'],
        dest: 'build/js/',
        options: {
          module: 'amd', //or commonjs 
          target: 'es5', //or es3 
          basePath: 'src/ts/',
          declaration: false,
          sourceMap: false
        }
      }
    },
    
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/index.dev.html', 'src/html/**'],
        tasks: ['clean:html', 'includereplace', 'html-prettyprinter']
      },
      sass: {
        files: ['src/sass/**'],
        tasks: ['clean:css', 'sass']
      },
      lib: {
        files: ['lib/**'],
        tasks: ['clean:lib', 'copy:lib']
      },
      gfx: {
        files: ['src/gfx/**'],
        tasks: ['clean:gfx', 'copy:gfx']
      },
      typescript: {
        files: ['src/ts/**'],
        tasks: ['clean:js', 'typescript']
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-html-prettyprinter');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['clean:all', 'includereplace', 'html-prettyprinter', 'copy', 'sass', 'typescript']);
  // TODO build task bauen für live deployment -> Achtung livereload.js dafür auf index.dev.html entfernen, sonst wie compile

};