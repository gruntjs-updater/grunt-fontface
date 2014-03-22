/*
 * grunt-fontface
 * https://github.com/nsmith7989/grunt-fontface
 *
 * Copyright (c) 2014 Nathanael Smith
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

    // Configuration to be run (and then tested).
    fontface: {

		dev: {
			options: {
				template: "@font-face {" +
				"font-family: 'MyFontFamily';" +
				"src: url('{{font}}.eot?#iefix') format('embedded-opentype')," +
				"url('{{font}}.woff') format('woff')," +
				"url('{{font}}.ttf')  format('truetype')," +
				"url('{{font}}.svg#{{font}}') format('svg');" +
				"}"
			}
		}

	},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'fontface', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('font', 'My "default" task description.', function() {

	});

};
