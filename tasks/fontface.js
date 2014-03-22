/*
 * grunt-fontface
 * https://github.com/nsmith7989/grunt-fontface
 *
 * Copyright (c) 2014 Nathanael Smith
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks


	grunt.registerMultiTask('fontface', 'Generate CSS/SCSS from all font files within a font directory', function () {
		// Merge task-specific and/or target-specific options with these defaults.


		var options = this.options({
				fontDir: 'fonts',
				outputFile: 'sass/_fonts.scss'
			}),
			fontFiles = [];



		var _ = require('underscore'),
			fontFiles = [],
			uniqFontFiles = [],
			contents = '';


		grunt.file.recurse(options.fontDir, function(abspath, rootdir, subdir, filename) {
			var processFile = filename.substring(0, filename.lastIndexOf('.'));
			fontFiles.push(processFile);
		});

		//reduce the array
		uniqFontFiles = _.uniq(fontFiles).filter(function(elem) {
			if (elem) {
				return elem;
			}
		});

		//build contents
		uniqFontFiles.forEach(function(elem) {

			_.templateSettings = {
				interpolate: /\{\{(.+?)\}\}/g
			};

			var template = _.template(options.template);

			contents += template({font: elem}) + grunt.util.linefeed;

		});

		grunt.file.write(options.outputFile, contents);


	});

};
