module.exports = function (grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= pkg.license %> */\n',
		uglify: {
			options: {
				banner: '<%= banner %>',
				sourceMap: true,
				sourceMapIncludeSources: true,
				preserveComments: false
			},
			app: {
				src: 'prod/assets/js/app.min.js',
				dest: 'prod/assets/js/app.min.js'
			},
			templates: {
				src: 'prod/assets/js/templates.min.js',
				dest: 'prod/assets/js/templates.min.js'
			}
		},
		jshint: {
			options: {
				node: true,
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			gruntfile: {
				src: 'gruntfile.js'
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			scripts: {
				files: ['src/**'],
				tasks: ['dev'],
				options: {
					spawn: false
				}
			}
		},
		less: {
			dev: {
				options: {
					paths: ["src/assets/css"]
				},
				files: {
					"dev/assets/css/style.css": "src/assets/less/style.less"
				}
			},
			prod: {
				options: {
					paths: ["src/assets/css"],
					cleancss: true
				},
				files: {
					"prod/assets/css/style.min.css": "src/assets/less/style.less"
				}
			}
		},
		jade2js: {
			options: {
				namespace: 'Rychlost.Templates'
			},
			dev: {
				files: {
					'dev/assets/js/templates.js': 'src/views/templates/*.jade'
				}
			},
			prod: {
				files: {
					'prod/assets/js/templates.min.js': 'src/views/templates/*.jade'
				}
			}
		},
		jade: {
			dev: {
				options: {
					pretty: true,
					data: {
						version: '<%= pkg.version %>',
						servers: grunt.file.readJSON('data/servers.json'),
						debug: true
					}
				},
				files: [
					{expand: true, cwd: 'src/', src: ['*.jade'], dest: 'dev/', ext: '.html'},
					{expand: true, cwd: 'src/views/', src: ['*.jade'], dest: 'dev/views/', ext: '.html'},
					{expand: true, cwd: 'src/views/partials/', src: ['*.jade'], dest: 'dev/views/', ext: '.html'},
				]
			},
			prod: {
				options: {
					data: {
						version: '<%= pkg.version %>',
						debug: false
					}
				},
				files: [
					{expand: true, cwd: 'src/', src: ['*.jade'], dest: 'dev/', ext: '.html'},
					{expand: true, cwd: 'src/views/', src: ['*.jade'], dest: 'prod/views/', ext: '.html'},
					{expand: true, cwd: 'src/views/partials/', src: ['*.jade'], dest: 'prod/views/', ext: '.html'},
				]
			}
		},
		csso: {
			dev: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'dev/assets/css/style.css': [
						'dev/assets/css/vendor.css',
						'dev/assets/css/style.css'
					]
				}
			},
			prod: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'prod/assets/css/style.min.css': [
						'prod/assets/css/vendor.min.css',
						'prod/assets/css/style.min.css'
					]
				}
			}
		},
		prettify: {
			options: {
				indent: 1,
				condense: true,
				padcomments: true,
				indent_char: '	',
				brace_style: 'collapse'

			},
			html: {
				src: 'dev/index.html',
				dest: 'dev/index.html'
			},
			css: {
				src: 'dev/assets/css/style.css',
				dest: 'dev/assets/css/style.css'
			}
		},
		copy: {
			dev: {
				files: [
					{expand: true, cwd: 'src/', src: ['*.js'], dest: 'dev/', ext: '.js'},
					{expand: true, cwd: 'src/components/', src: ['**'], dest: 'dev/components/'},
					{expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'dev/assets/img/'},
				]
			},
			prod: {
				files: [
					{expand: true, cwd: 'src/', src: ['*.js'], dest: 'prod/', ext: '.min.js'},
					{expand: true, cwd: 'src/components/', src: ['**'], dest: 'prod/components/'},
					{expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'prod/assets/img/'},
				]
			}
		},
		clean: {
			dev: ["dev/"],
			prod: ["prod/"]
		},
		remove: {
			options: {
				trace: true
			},
			dev: {
				fileList: ['dev/assets/css/vendor.css']
			},
			prod: {
				fileList: ['prod/assets/css/vendor.min.css']
			}
		},
		includereplace: {
			dev: {
				options: {
					// Task-specific options go here.
				},
				files: [
					{src: '*.js', dest: 'dev/', expand: true, cwd: 'src/'}
				]
			},
			prod: {
				options: {
					// Task-specific options go here.
				},
				files: [
					{src: '*.js', dest: 'prod/', expand: true, cwd: 'src/'}
				]
			}
		},
		bowerInstall: {
			target: {
				src: [
					'src/**/*.jade',
					'src/**/*.less',
					'src/**/*.css',
				],
				cwd: '',
				exclude: []
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-install');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-jade-plugin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-remove');
	grunt.loadNpmTasks('grunt-include-replace');

	grunt.registerTask('bower',['bowerInstall']);

	grunt.registerTask(
		'dev',
		[
			'clean:dev',
			'jshint',
			'copy:dev',
			'less:dev',
			'jade:dev',
			'jade2js:dev',
			'csso:dev',
			'prettify',
			'remove:dev',
			'includereplace:dev'
		]
	);

	grunt.registerTask(
		'prod',
		[
			'clean:prod',
			'jshint',
			'copy:prod',
			'less:prod',
			'jade:prod',
			'jade2js:prod',
			'includereplace:prod',
			'csso:prod',
			'uglify',
			'remove:prod'
		]
	);

	grunt.registerTask('default', ['dev']);

};