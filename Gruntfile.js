// JavaScript Document
module.exports = function(grunt) {

var livereloadport = true
  // Project configuration.
  grunt.initConfig({
      

    pkg: grunt.file.readJSON('package.json'),
	watch: {
		index: {
			files:['./app/www/index.html'],
			tasks:[],
			 options: {
				  livereload:livereloadport
			  }
		},
		scripts: {
			 files: ['app/www/js/*.js', 'app/www/pages/*.html', 'app/www/css/*.css', 'app/www/sass/*.scss'],
			 tasks:[],
			 options: {
				  livereload:livereloadport
			  }
		},
        css: {
            files: ['app/www/sass/*.scss'],
            tasks: ['sass'],
            options: {livereload:livereloadport}
        }
    },
	connect: {
		server: {
			options:{
				port: 4510,
                base: 'app/www',
//				livereload: livereloadport
			}	
		}
	},
	open: {
			index: {
				path: 'http://localhost:4510/',
				app: 'chrome'
			}
		},
sass: {                              // Task
    dist: {                            // Target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {                         // Dictionary of files
        'app/www/css/main.css': 'app/www/sass/main.scss'
      }
    }
  },
  compress: {
      main: {
        options: {
          archive: 'app.zip'
        },
        files: [
          {src: ['package.json', 'app/www/index.html', 'app/www/css/*', 'app/www/img/*', 'app/www/js/*', 'app/www/pages/*'], dest: './'} // includes files in path
        ]
      }
    },
      nodewebkit: {
        options: {
        platforms: ['win'],
        buildDir: './webkitbuilds' // Where the build version of my node-webkit app is saved 
    },
    src: ['app/www/index.html'] // Your node-webkit app 
  }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'open','watch', 'compress', 'sass']);
  

};