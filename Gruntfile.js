'use strict';

/**
 * First step of the usemin process; it looks in HTML files for specially-crafted HTML
 * comments that indicate that a set of files are candidates for minification. The files
 * given in the 'html' option are the files that are scanned for comments, and the 'dest'
 * option sets the output directory.
 */
var useminPrepareConfig = {
	html: 'app/index.html',
	options: {
		dest: 'dist'
	}
};

/**
 * The usemin task wraps up the build process by removing all the tags in the
 * <!-- build --> block and replacing it with a single reference to the minified file,
 * including any revision information added by the rev task.
 *
 * Options:
 * 		html: The location of the post-minification html file(s) to update.
 * 		css: Same as above, except for CSS
 * 		options.dirs: Where to look for target minififed files.
 */
var useminConfig = {
	html: ['dist/index.html'],
	options: {
		dirs: [
			'dist/js'
		]
	}
};

/*This creates a zip file of the listed files*/
var compressConfig = {
	main: {
		options: {
			archive: 'target/app.zip'
		},
		files: [
			{ src: ['app/**'] }
		]
	}
};

/*Concatenates all files together*/
var concatConfig = {
	options: {},
	'dist/js/styleguideEvents.js': 'app/styleguideEvents.js'
};

/**
 * Uglify is the task that performs minification OR pretty printing. The following options
 * are available:
 * 		mangle: Reduce function and variable names down to one or two characters to save
 * 				space
 * 		compress: Remove all unnecessary whitespace (tabs or spaces used for alignment,
 * 				etc.)
 * 		beautify: Pretty-prints (formats for human reading)
 *
 * Subtasks:
 * 		dev: To be used in development, and on servers during early development; does not
 * 				compress nor mangle, and leaves the code human readible for debugging
 * 		dist: Compresses and mangles for maximum size reduction to speed up downloads
 *
 * Note that both subtasks concatenate the javascript or css files; this means that only
 * one JavaScript or one CSS file will be downloaded per request.
 */
var uglifyConfig = {
	app: {
		options: {
			mangle: true,
			compress: true,
			beautify: false
		},
		files: {
			'dist/js/app.min.js': 'dist/js/app.js',
			'dist/js/styleguideEvents.min.js': 'dist/js/styleguideEvents.js'
		}
	}
};


/*This is used to compile and minify less files */
var lessConfig = {
	dist: {
		options: {
			strictImports: false,
			compress: true
		},
		files: {
			"dist/styles/normalize.min.css": "app/styles/resets/normalize.v.2.1.2.less",
			"dist/styles/bootstrap.min.css": "app/libs/bootstrap/docs/assets/css/bootstrap.css",
			"dist/styles/cc-buildingblocks.min.css": "app/styles/cc-buildingblocks/main.less",
			"dist/styles/app.min.css": "app/styles/app.less"
		}
	}
};

/*This runs a JS lint on the code */
var jshintConfig = {
	options: {
		jshintrc: 'conf/jshintrc'
	},
	main: {
		src: [
			'Gruntfile.js',
			'app/js/**/*.js'
		]
	}
};

/*This runs a HTML validator on the code */
var htmlhintConfig = {
	build: {
		options: {
			'attr-lowercase': true,
			'attr-value-double-quotes': true,
			'head-script-disabled': true,
			'id-unique': true,
			'img-alt-require': true,
			'tag-self-close': true,
			'tag-pair': true,
			'tagname-lowercase': true,
			'spec-char-escape': true,
			'style-disabled': true
		},
		src: [
			'app/index.html',
			'app/js/views/**/*.html'
		]
	}
};

/**
 * htmlmin moves the html files into dist/. htmlmin is a necessary part of updating the
 * <script> tag to point at the minified source.
 *
 * WARNING: DO NOT set removeComments to true, as usemin would never be able to replace
 * unminified JS with the minified version.
 *
 * Options:
 * 		See http://perfectionkills.com/experimenting-with-html-minifier/#options
 *
 * Subtasks:
 * 		dist: Create the HTML structure for the distribution package
 */
//DONT THINK IM GOING TO USE THIS RIGHT NOW...
var htmlminConfig = {
	dist: {
		options: {
			removeComments: true,
			removeCommentsFromCDATA: true,
			collapseWhitespace: true
		},
		files: {
			'dist/index.html': 'app/index.html'
		}
	}
};

/**
 * The copy task takes files that are not moved by any other means (usemin, htmlmin,
 * minification) and simply copies them into the dist/ directory.
 * Options:
 * 		expand: Use expanded options (usually always true)
 * 		dot: Include files that start with a dot ('.'; i.e. hidden files) that also match
 * 				the glob patterns in src
 * 		cwd: Execute from the app directory
 * 		dest: The destination directory, dist/
 * 		src: A list of files to copy, including glob file patterns
 *
 * Subtasks:
 * 		dist: Files for the distrbution build.
 */
var copyConfig = {
	dist: {
		expand: true,
		cwd: 'app',
		dest: 'dist',
		dot: false,
		src: [
			'index.html',
			'libs/**',
			'js/views/**/*.html'
		]
	}
};

var cleanConfig = {
	purge: [
		'dist/**'
	],
	onlyMinified: [
		'dist/*.js', '!dist/*.min.js',
		'dist/js/*.js', '!dist/js/*.min.js'
	]
};

module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		useminPrepare: useminPrepareConfig,
		usemin: useminConfig,
		compress: compressConfig,
		concat: concatConfig,
		uglify: uglifyConfig,
		less: lessConfig,
		jshint: jshintConfig,
		htmlhint: htmlhintConfig,
		htmlmin: htmlminConfig,
		copy: copyConfig,
		clean: cleanConfig
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('test', [
		'jshint',
		'htmlhint'
	]);

	grunt.registerTask('um', [
		'useminPrepare',
		'usemin'
	]);

	grunt.registerTask('build', [
		'clean:purge',
		'concat',
		'uglify:app',
		'clean:onlyMinified',
		'copy:dist'
	]);

	grunt.registerTask('buildMin', [
		'clean:purge',
		'jshint',
		'htmlhint',
		'useminPrepare',
		'concat',
		'copy:dist',
		'usemin',
		'clean:onlyMinified'
	]);

	grunt.registerTask('package', ['compress']);
};