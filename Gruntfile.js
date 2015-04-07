module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'spec/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    jasmine: {
      test: {
        src: 'src/*.js',
        options: {
          vendor: 'vendor/*.js',
          specs: 'spec/**/*Spec.js',
          helpers: 'spec/**/*Helper.js',
          template: require('grunt-template-jasmine-requirejs')
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['watch']);

};
