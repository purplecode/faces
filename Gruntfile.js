module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    project: grunt.file.readJSON('package.json'),
    jshint: {
      backend: ['Gruntfile.js', 'src/**/*.js'],
      frontend: ['public/js/**/*.js']
    },
    complexity: {
      frontend: {
        src: '<%= jshint.frontend %>',
        options: {
          cyclomatic: 5,
          halstead: 14,
          maintainability: 80
        }
      },
      backend: {
        src: '<%= jshint.backend %>',
        options: '<%= complexity.frontend.options %>'
      }
    }
  });

  // JS code complexity
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Build
  grunt.registerTask('default', ['jshint:*', 'complexity']);

};