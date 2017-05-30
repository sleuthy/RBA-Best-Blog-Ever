module.exports = function(grunt){

//configuration
 grunt.initConfig({
    browserify: {
        '../dist/app.js' : ['../js/main.js'],
        options: {
            transform: ["hbsfy"],
            browserifyOptions: {
                debug: true,
                paths: [
                "./node_modules"
                ]
            }
        }
    },
    //task name
      jshint: {
            options: {
                predef: ["document", "console", "$" ], //allows for predefined things not found in js
                esnext: true, //allows for ES6
                globalstrict: true,
                globals: {"$":true}, //name value pairs, allows to define global vars used in many files.
                browserify : true
            },
            files :['../js/**/*.js']
    },
    //plugin name
    concat: {
        js:{
            //for concat - sources need to be in an array. Can use *.js to grab all the files that end in .js in the javascripts folder
            src:'../js/*.js',
            //dest is where that newly concatinated file will go
            dest: 'build/scripts.js'
        },
        //task name
        css:{
            //however - to run them in order, we can list them in the order we want them to concat
            src:['css/*bootstrap.css', 'css/styles.css'],
            //this is where that newly concatenated file will go.
            dest: 'build/style.css'
        }
    },
    //plugin name
    sass: {
        //task name
        dist: {
            files: {
                '../css/main.css' : '../sass/main.scss'
            }
        }
    },
    watch: {
        js: {
            files: ['../js/**/*.js'],
            tasks: ['jshint', 'browserify']
        },
        sass: {
            files: ['../sass/**/*.scss'],
            tasks: ['sass']
        },
        browserify: {
            files: ['../js/*.js'],
            tasks: ['browserify']
        }
    }
 });

require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
grunt.registerTask('default', ['browserify','jshint', 'sass', 'watch']);


//register tasks

// grunt.registerTask('concat-javascripts', ['concat:javascripts']);
// grunt.registerTask('concat-css', ['concat:css']);
// grunt.registerTask('jshint', ['jshint']);

};