module.exports = function (grunt) {
  grunt.initConfig({
    react: {
      dist: {
        options: {
          harmony: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: ['*.js'],
            dest: 'dist/js',
            ext: '.js'
          }
        ]
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: [
            'last 3 versions',
            'ie 8',
            'ie 9',
            'ie 10',
            'ie 11'
          ],
          remove: true
        },
        files: [
          {'dist/css/style.css':'src/css/style.css'},
          {'dist/css/normalize.css': 'src/lib/normalize.css/normalize.css'},
          {'dist/css/gumby.css': 'src/lib/gumby/css/gumby.css'}
        ]
      }
    },
    watch: {
      configFiles: {
        options: {
          debounceDelay: 25
        },
        files: ['Gruntfile.js']
      },
      jsx: {
        options: {
          debounceDelay: 0,
          spawn: true
        },
        files: ['src/js/*.js'],
        tasks: ['react:dist']
      },
      css: {
        options: {
          debounceDelay: 0,
          spawn: true
        },
        files: [
          'src/css/style.css',
          'src/lib/normalize.css/normalize.css',
          'src/lib/gumby/css/gumby.css'
        ],
        tasks: ['autoprefixer:dist']
      }
    }
  });
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['react:dist', 'autoprefixer:dist']);
};
